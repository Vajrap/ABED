import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  alpha,
  useTheme,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Chip,
  Badge,
} from "@mui/material";
import { ArrowBack, Send, Fullscreen, Minimize } from "@mui/icons-material";
import { ChatMessage, Friend, ChatScope, UserStatus } from "@/types/chat";
import { mockFriends, getChatMessagesByScope } from "@/data/mockChatData";
import { PortraitRenderer } from "@/components/Portrait/PortraitRenderer";
import { locationService } from "@/services/locationService";
import { chatService } from "@/services/chatService";
import { websocketService } from "@/services/websocketService";

export interface ChatPanelProps {
  currentUserId?: string; // Current player's user ID
}

/**
 * Chat Panel Component
 * 2-column layout: Left narrow for chat type selection, Right for chat messages or friends list
 */
export const ChatPanel: React.FC<ChatPanelProps> = ({ currentUserId = "mock-character-001" }) => {
  const theme = useTheme();
  const [selectedChatType, setSelectedChatType] = useState<ChatScope | "social">("location");
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [locationNPCs, setLocationNPCs] = useState<Friend[]>([]);
  const [loadingLocationNPCs, setLoadingLocationNPCs] = useState<boolean>(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]); // Local message cache (includes history + new messages)
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Track unread message counts per channel
  // Keys: "location", "party", "social:{characterId}"
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  // Get messages based on selected chat type
  const getDisplayMessages = (): ChatMessage[] => {
    // Social tab: show private chat if friend selected, otherwise no messages
    if (selectedChatType === "social") {
      if (selectedFriendId) {
        // Filter private messages with selected friend
        return localMessages.filter((msg) => {
          return (
            msg.scope === "private" &&
            (msg.senderId === selectedFriendId || msg.recipientId === selectedFriendId)
          );
        }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      }
      return [];
    }
    
    // Filter local messages by current scope
    const filteredLocal = localMessages.filter((msg) => {
      return msg.scope === selectedChatType;
    });

    // Sort by timestamp (history + new messages)
    return filteredLocal.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const messages = getDisplayMessages();

  // Format timestamp for display
  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  // Get status color for friends
  const getStatusColor = (status?: UserStatus): string => {
    switch (status) {
      case "online":
        return theme.palette.success.main;
      case "away":
        return theme.palette.warning.main;
      case "busy":
        return theme.palette.error.main;
      default:
        return theme.palette.text.disabled;
    }
  };

  // Handle chat type selection
  const handleChatTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ChatScope | "social";
    setSelectedChatType(value);
    setSelectedFriendId(null); // Reset friend selection when changing chat type
    
    // Reset unread count for the selected channel
    if (value === "location" || value === "party") {
      setUnreadCounts((prev) => {
        const updated = { ...prev };
        delete updated[value];
        return updated;
      });
    }
  };

  // Handle friend click (for Social tab)
  const handleFriendClick = (friendId: string) => {
    setSelectedFriendId(friendId);
    
    // Reset unread count for this friend's private chat
    setUnreadCounts((prev) => {
      const updated = { ...prev };
      delete updated[`social:${friendId}`];
      return updated;
    });
  };


  // WebSocket message handler
  useEffect(() => {
    // Connect WebSocket when component mounts (if not already connected)
    if (!websocketService.isConnected()) {
      websocketService.connect();
    }

    // Register handler for CHAT_MESSAGE type
    const unsubscribe = websocketService.onMessage("CHAT_MESSAGE", (message) => {
      const chatData = message.data;
      
      // Convert timestamp string to Date
      const chatMessage: ChatMessage = {
        ...chatData,
        timestamp: new Date(chatData.timestamp),
      };

      // Determine which channel this message belongs to
      let messageChannel: string | null = null;
      if (chatMessage.scope === "location") {
        messageChannel = "location";
      } else if (chatMessage.scope === "party") {
        messageChannel = "party";
      } else if (chatMessage.scope === "private") {
        // For private messages, determine the other participant
        const otherId = chatMessage.senderId === currentUserId 
          ? chatMessage.recipientId 
          : chatMessage.senderId;
        if (otherId) {
          messageChannel = `social:${otherId}`;
        }
      }

      // Only add message if it matches current chat view
      const shouldAdd = (() => {
        if (selectedChatType === "social" && selectedFriendId) {
          // Private chat: check if message is from/to the selected friend
          return (
            chatMessage.scope === "private" &&
            (chatMessage.senderId === selectedFriendId || chatMessage.recipientId === selectedFriendId)
          );
        } else if (selectedChatType === "social" && !selectedFriendId) {
          // Social tab but no friend selected - don't show messages
          return false;
        }
        // Public chats: check if scope matches
        return chatMessage.scope === selectedChatType;
      })();

      // Update unread count if message is not in the currently active channel
      if (messageChannel && !shouldAdd) {
        setUnreadCounts((prev) => ({
          ...prev,
          [messageChannel!]: (prev[messageChannel!] || 0) + 1,
        }));
      }

      if (shouldAdd) {
        setLocalMessages((prev) => {
          // Check if message already exists (avoid duplicates)
          const exists = prev.some((m) => m.id === chatMessage.id);
          if (exists) {
            return prev;
          }
          return [...prev, chatMessage];
        });
        // Auto-scroll will happen via messagesEndRef effect
      }
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      // Note: We don't disconnect WebSocket here as it might be used by other components
      // WebSocket will be disconnected when user logs out or leaves game view
    };
  }, [selectedChatType, selectedFriendId]);

  // Handle sending a chat message
  const handleSendMessage = async () => {
    if (!chatInput.trim() || sendingMessage) return;

    const content = chatInput.trim();
    const scope = selectedChatType === "social" && selectedFriendId ? "private" : (selectedChatType as ChatScope);
    const recipientId = selectedChatType === "social" && selectedFriendId ? selectedFriendId : undefined;

    // Don't allow sending if social tab without friend selected
    if (selectedChatType === "social" && !selectedFriendId) {
      return;
    }

    // Clear input immediately for better UX
    setChatInput("");
    setSendingMessage(true);

    try {
      // Send message to backend
      const response = await chatService.sendMessage({
        scope,
        recipientId,
        content,
      });

      if (response.success && response.message) {
        // Add message to local state immediately (optimistic update)
        // Note: For NPCs, response.isNPC will be true and actual response may come via WebSocket
        const message = {
          ...response.message,
          timestamp: response.message.timestamp instanceof Date 
            ? response.message.timestamp 
            : new Date(response.message.timestamp),
        };
        setLocalMessages((prev) => [...prev, message]);
        console.log("Message sent successfully", {
          message,
          isNPC: response.isNPC,
          note: response.isNPC ? "NPC response may come via WebSocket" : "Message sent",
        });
      } else {
        // Error handling
        console.error("Failed to send message:", response.messageKey);
        // TODO: Show error toast/notification
        // Restore input on error
        setChatInput(content);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // TODO: Show error toast/notification
      // Restore input on error
      setChatInput(content);
    } finally {
      setSendingMessage(false);
    }
  };

  // Check if chat input should be shown
  const shouldShowChatInput = () => {
    // Don't show input when viewing character list in Social tab
    if (selectedChatType === "social" && !selectedFriendId) {
      return false;
    }
    // Show input for location, party, and private chats (when friend selected in social)
    return true;
  };

  // Fetch chat history when chat type or friend selection changes
  useEffect(() => {
    // Clear previous messages when switching chat types (will be replaced by history)
    setLocalMessages([]);
    setLoadingHistory(true);

    const fetchHistory = async () => {
      try {
        let response;
        if (selectedChatType === "location") {
          response = await chatService.getLocationHistory(20);
        } else if (selectedChatType === "party") {
          response = await chatService.getPartyHistory(20);
        } else if (selectedChatType === "social" && selectedFriendId) {
          response = await chatService.getPrivateHistory(selectedFriendId, 20);
        } else {
          // Social tab without friend selected - no history
          setLoadingHistory(false);
          return;
        }

        if (response.success && response.messages) {
          // Convert timestamp strings to Date objects
          const messagesWithDates: ChatMessage[] = response.messages.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp),
          }));
          setLocalMessages(messagesWithDates);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
    
    // Reset unread count when switching to a channel
    if (selectedChatType === "location" || selectedChatType === "party") {
      setUnreadCounts((prev) => {
        const updated = { ...prev };
        delete updated[selectedChatType];
        return updated;
      });
    } else if (selectedChatType === "social" && selectedFriendId) {
      setUnreadCounts((prev) => {
        const updated = { ...prev };
        delete updated[`social:${selectedFriendId}`];
        return updated;
      });
    }
  }, [selectedChatType, selectedFriendId]);

  // Fetch location characters when location or social tab is selected
  useEffect(() => {
    if (selectedChatType === "location" || selectedChatType === "social") {
      setLoadingLocationNPCs(true);
      locationService
        .getLocationCharacters()
        .then((response) => {
          if (response.success && response.characters) {
            // Convert characters to Friend format
            const characterFriends: Friend[] = response.characters.map((char) => ({
              id: char.id,
              name: char.name,
              portrait: char.portrait,
              isPlayer: char.isPlayer,
              status: char.isPlayer 
                ? (char.isOnline ? "online" : "offline" as UserStatus)
                : undefined, // NPCs don't have status
            }));
            setLocationNPCs(characterFriends);
          } else {
            setLocationNPCs([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching location characters:", error);
          setLocationNPCs([]);
        })
        .finally(() => {
          setLoadingLocationNPCs(false);
        });
    } else {
      // Clear location characters when switching away from location tab
      setLocationNPCs([]);
    }
  }, [selectedChatType]);

  // Handle WebSocket events for location characters
  useEffect(() => {
    // Only subscribe if we're viewing the location or social tab
    if (selectedChatType !== "location" && selectedChatType !== "social") {
      return;
    }

    // Handle character connected (became online)
    const unsubscribeConnected = websocketService.onMessage("LOCATION_CHARACTER_CONNECTED", (message) => {
      const data = message.data;
      setLocationNPCs((prev) => {
        // Check if character already exists
        const existingIndex = prev.findIndex((f) => f.id === data.characterId);
        if (existingIndex >= 0) {
          // Update existing character's online status
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: "online" as UserStatus,
          };
          return updated;
        } else {
          // Add new character
          return [
            ...prev,
            {
              id: data.characterId,
              name: data.name,
              portrait: data.portrait,
              isPlayer: true,
              status: "online" as UserStatus,
            },
          ];
        }
      });
    });

    // Handle character disconnected (became offline)
    const unsubscribeDisconnected = websocketService.onMessage("LOCATION_CHARACTER_DISCONNECTED", (message) => {
      const data = message.data;
      setLocationNPCs((prev) => {
        const existingIndex = prev.findIndex((f) => f.id === data.characterId);
        if (existingIndex >= 0) {
          // Update to offline status
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: "offline" as UserStatus,
          };
          return updated;
        }
        return prev;
      });
    });

    // Handle character arrived at location
    const unsubscribeArrived = websocketService.onMessage("LOCATION_CHARACTER_ARRIVED", (message) => {
      const data = message.data;
      setLocationNPCs((prev) => {
        // Check if character already exists
        const existingIndex = prev.findIndex((f) => f.id === data.characterId);
        if (existingIndex >= 0) {
          // Update existing character
          const updated = [...prev];
          updated[existingIndex] = {
            id: data.characterId,
            name: data.name,
            portrait: data.portrait,
            isPlayer: data.isPlayer,
            status: data.isPlayer && data.isOnline !== undefined 
              ? (data.isOnline ? "online" : "offline" as UserStatus)
              : undefined,
          };
          return updated;
        } else {
          // Add new character
          return [
            ...prev,
            {
              id: data.characterId,
              name: data.name,
              portrait: data.portrait,
              isPlayer: data.isPlayer,
              status: data.isPlayer && data.isOnline !== undefined 
                ? (data.isOnline ? "online" : "offline" as UserStatus)
                : undefined,
            },
          ];
        }
      });
    });

    // Handle character left location
    const unsubscribeLeft = websocketService.onMessage("LOCATION_CHARACTER_LEFT", (message) => {
      const data = message.data;
      setLocationNPCs((prev) => prev.filter((f) => f.id !== data.characterId));
    });

    // Cleanup: unsubscribe when component unmounts or tab changes
    return () => {
      unsubscribeConnected();
      unsubscribeDisconnected();
      unsubscribeArrived();
      unsubscribeLeft();
    };
  }, [selectedChatType]);

  // For Social tab, show location characters (same as Location chat)
  const locationCharacters = locationNPCs;

  // Auto-scroll to bottom when messages change, chat type changes, or friend selection changes
  useEffect(() => {
    // Only scroll if we're viewing messages (not social tab character list)
    // Allow scrolling when viewing private chat in Social tab (selectedFriendId is set)
    if (selectedChatType !== "social" || selectedFriendId) {
      // Small delay to ensure DOM is updated after history loads
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages, selectedChatType, selectedFriendId, loadingHistory]);

  const chatContent = (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        borderRadius: isFullscreen ? 0 : 1,
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        overflow: "hidden",
        transition: "all 0.3s ease-in-out", // Smooth transitions
      }}
    >
      {/* Left Column - Chat Type Selection */}
      <Box
        sx={{
          width: 120,
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
            textAlign: "center",
          }}
        >
          Chat
        </Typography>

        <RadioGroup
          value={selectedChatType}
          onChange={handleChatTypeChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <FormControlLabel
            value="location"
            control={<Radio size="small" />}
            label={
              <Badge
                badgeContent={unreadCounts.location || 0}
                color="error"
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 4px",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.85rem",
                  }}
                >
                  Location
                </Typography>
              </Badge>
            }
            sx={{
              margin: 0,
            }}
          />
          <FormControlLabel
            value="party"
            control={<Radio size="small" />}
            label={
              <Badge
                badgeContent={unreadCounts.party || 0}
                color="error"
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 4px",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.85rem",
                  }}
                >
                  Party
                </Typography>
              </Badge>
            }
            sx={{
              margin: 0,
            }}
          />
          <FormControlLabel
            value="social"
            control={<Radio size="small" />}
            label={
              <Badge
                badgeContent={
                  Object.keys(unreadCounts)
                    .filter((key) => key.startsWith("social:"))
                    .reduce((sum, key) => sum + (unreadCounts[key] || 0), 0) || 0
                }
                color="error"
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 4px",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.85rem",
                  }}
                >
                  Social
                </Typography>
              </Badge>
            }
            sx={{
              margin: 0,
            }}
          />
        </RadioGroup>
      </Box>

      {/* Right Column - Chat Messages or Friends List */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {selectedChatType === "social" && !selectedFriendId ? (
          // Social tab - shows Location characters (same as Location chat)
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Characters List */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: alpha(theme.palette.background.default, 0.3),
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.5),
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                  },
                },
              }}
            >
              {loadingLocationNPCs ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <CircularProgress size={24} />
                  <Typography
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "0.9rem",
                      color: theme.palette.text.secondary,
                      ml: 2,
                    }}
                  >
                    Loading characters...
                  </Typography>
                </Box>
              ) : locationCharacters.length === 0 ? (
                <Typography
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    mt: 4,
                  }}
                >
                  No characters found at this location
                </Typography>
              ) : (
                locationCharacters.map((friend) => {
                  return (
                    <Box
                      key={friend.id}
                      onClick={() => handleFriendClick(friend.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: 1.5,
                        borderRadius: 1,
                        mb: 1,
                        cursor: "pointer",
                        backgroundColor: alpha(theme.palette.background.paper, 0.3),
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        },
                      }}
                    >
                      {/* Portrait/Avatar */}
                      <Box sx={{ position: "relative" }}>
                        {friend.portrait ? (
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              // borderRadius: "50%",
                              overflow: "hidden",
                              border: `2px solid ${theme.palette.secondary.main}`,
                            }}
                          >
                            <PortraitRenderer
                              portrait={friend.portrait}
                              size="100px"
                              alt={friend.name}
                              portraitScale={1}
                            />
                          </Box>
                        ) : (
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            border: `2px solid ${theme.palette.secondary.main}`,
                          }}
                        >
                          {friend.name.charAt(0)}
                        </Avatar>
                        )}
                        {/* Status dot for players */}
                        {friend.isPlayer && friend.status && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: getStatusColor(friend.status),
                              border: `2px solid ${theme.palette.background.paper}`,
                              boxShadow: `0 0 4px ${alpha(getStatusColor(friend.status), 0.6)}`,
                            }}
                          />
                        )}
                      </Box>

                      {/* Friend Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                          <Badge
                            badgeContent={unreadCounts[`social:${friend.id}`] || 0}
                            color="error"
                            max={9}
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "0.65rem",
                                minWidth: "18px",
                                height: "18px",
                                padding: "0 4px",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Cinzel, serif",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                              }}
                            >
                              {friend.name}
                            </Typography>
                          </Badge>
                          {!friend.isPlayer && (
                            <Chip
                              label="NPC"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                fontFamily: "Crimson Text, serif",
                                fontWeight: 500,
                                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                                color: theme.palette.secondary.main,
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                                "& .MuiChip-label": {
                                  padding: "0 6px",
                                },
                              }}
                            />
                          )}
                          {friend.isPlayer && friend.status && (
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                color: theme.palette.text.secondary,
                                fontStyle: "italic",
                              }}
                            >
                              ({friend.status})
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        ) : (
          // Chat Messages View
          <>
            {(() => {
              // No lover chat styling needed (private chat removed for now)
              const isLoverChat = false;

              return (
                <>
            <Box
              onClick={() => setIsFullscreen(true)}
              sx={{
                padding: 1,
                borderBottom: `1px solid ${
                  isLoverChat
                    ? alpha("#ff69b4", 0.3)
                    : alpha(theme.palette.divider, 0.2)
                }`,
                backgroundColor: isLoverChat
                  ? alpha("#ff69b4", 0.1)
                  : alpha(theme.palette.background.paper, 0.5),
                display: "flex",
                alignItems: "center",
                gap: 1,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isLoverChat
                    ? alpha("#ff69b4", 0.15)
                    : alpha(theme.palette.background.paper, 0.7),
                },
                "&::before": isLoverChat
                  ? {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.2), transparent)",
                      animation: "sparkle 3s infinite",
                      "@keyframes sparkle": {
                        "0%": { left: "-100%" },
                        "100%": { left: "100%" },
                      },
                    }
                  : {},
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  textTransform: "capitalize",
                  flex: 1,
                }}
              >
                {selectedChatType === "social"
                  ? "Characters at Location"
                  : `${selectedChatType} Chat`}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                }}
                title="Expand to fullscreen"
              >
                <Fullscreen sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 1.5,
                backgroundColor: isLoverChat
                  ? alpha("#ff69b4", 0.05)
                  : "transparent",
                backgroundImage: isLoverChat
                  ? `radial-gradient(circle at 20% 50%, ${alpha("#ff69b4", 0.1)} 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${alpha("#ffb6c1", 0.1)} 0%, transparent 50%),
                     radial-gradient(circle at 40% 20%, ${alpha("#ffc0cb", 0.08)} 0%, transparent 50%)`
                  : "none",
                position: "relative",
                "&::before": isLoverChat
                  ? {
                      content: '"✨"',
                      position: "absolute",
                      top: "10%",
                      left: "5%",
                      fontSize: "1.5rem",
                      opacity: 0.6,
                      animation: "sparkleFloat 4s ease-in-out infinite",
                      "@keyframes sparkleFloat": {
                        "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: 0.6 },
                        "50%": { transform: "translateY(-10px) rotate(180deg)", opacity: 1 },
                      },
                    }
                  : {},
                "&::after": isLoverChat
                  ? {
                      content: '"✨"',
                      position: "absolute",
                      top: "60%",
                      right: "8%",
                      fontSize: "1.2rem",
                      opacity: 0.5,
                      animation: "sparkleFloat 5s ease-in-out infinite 1s",
                      "@keyframes sparkleFloat": {
                        "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: 0.5 },
                        "50%": { transform: "translateY(-8px) rotate(-180deg)", opacity: 0.9 },
                      },
                    }
                  : {},
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: isLoverChat
                    ? alpha("#ff69b4", 0.1)
                    : alpha(theme.palette.background.default, 0.3),
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: isLoverChat
                    ? alpha("#ff69b4", 0.6)
                    : alpha(theme.palette.secondary.main, 0.5),
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: isLoverChat
                      ? alpha("#ff69b4", 0.8)
                      : alpha(theme.palette.secondary.main, 0.7),
                  },
                },
              }}
            >
              {messages.length === 0 ? (
                <Typography
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    mt: 4,
                  }}
                >
                  No messages yet
                </Typography>
              ) : (
                messages.map((message) => {
                  const isCurrentUser = message.senderId === currentUserId;
                  
                  // Pink/lover styling for messages when chatting with lover
                  // const messageBgColor = isLoverChat
                  //   ? isCurrentUser
                  //     ? alpha("#ff69b4", 0.25)
                  //     : alpha("#ffb6c1", 0.2)
                  //   : isCurrentUser
                  //   ? alpha(theme.palette.primary.main, 0.2)
                  //   : alpha(theme.palette.background.paper, 0.5);
                  
                    const messageBgColor = isCurrentUser
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.background.paper, 0.5);
                  
                  const messageBorderColor = isLoverChat
                    ? isCurrentUser
                      ? alpha("#ff69b4", 0.5)
                      : alpha("#ffb6c1", 0.4)
                    : isCurrentUser
                    ? alpha(theme.palette.primary.main, 0.4)
                    : alpha(theme.palette.divider, 0.2);

                  return (
                    <Box
                      key={message.id}
                      sx={{
                        mb: 0.75,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isCurrentUser ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 0.75,
                          backgroundColor: messageBgColor,
                          borderRadius: 1,
                          border: `1px solid ${messageBorderColor}`,
                          boxShadow: isLoverChat
                            ? `0 2px 8px ${alpha("#ff69b4", 0.2)}`
                            : "none",
                        }}
                      >
                        {!isCurrentUser && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                              mb: 0.25,
                            }}
                          >
                            {message.senderPortrait ? (
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  border: `1px solid ${theme.palette.secondary.main}`,
                                }}
                              >
                                <PortraitRenderer
                                  portrait={message.senderPortrait}
                                  size="100%"
                                  alt="Sender"
                                />
                              </Box>
                            ) : (
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  border: `1px solid ${theme.palette.secondary.main}`,
                                  fontSize: "0.75rem",
                                }}
                              >
                                {message.senderName.charAt(0)}
                              </Avatar>
                            )}
                            <Typography
                              sx={{
                                fontFamily: "Cinzel, serif",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                lineHeight: 1.2,
                              }}
                            >
                              {message.senderName}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.7rem",
                                color: theme.palette.text.disabled,
                                lineHeight: 1.2,
                              }}
                            >
                              {formatTime(message.timestamp)}
                            </Typography>
                          </Box>
                        )}
                        {isCurrentUser && (
                          <Typography
                            sx={{
                              fontFamily: "Crimson Text, serif",
                              fontSize: "0.7rem",
                              color: theme.palette.text.disabled,
                              mb: 0.25,
                              textAlign: "right",
                              lineHeight: 1.2,
                            }}
                          >
                            {formatTime(message.timestamp)}
                          </Typography>
                        )}
                        <Typography
                          sx={{
                            fontFamily: "Crimson Text, serif",
                            fontSize: "0.85rem",
                            color: isCurrentUser
                              ? theme.palette.text.primary
                              : theme.palette.text.primary,
                            ml: !isCurrentUser && message.senderPortrait ? 3.5 : 0,
                            textAlign: isCurrentUser ? "right" : "left",
                            lineHeight: 1.3,
                          }}
                        >
                          {message.content}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </Box>

            {/* Chat Input - Show for location and party chats only */}
            {(() => {
              const isLoverChat = false;
              
              if (!shouldShowChatInput()) return null;

              return (
                <Box
                  sx={{
                    padding: 1.5,
                    borderTop: `1px solid ${
                      isLoverChat
                        ? alpha("#ff69b4", 0.3)
                        : alpha(theme.palette.divider, 0.2)
                    }`,
                    backgroundColor: isLoverChat
                      ? alpha("#ff69b4", 0.05)
                      : alpha(theme.palette.background.paper, 0.5),
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder={`Type a message in ${selectedChatType} chat...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    multiline
                    maxRows={3}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.9rem",
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        "& fieldset": {
                          borderColor: isLoverChat
                            ? alpha("#ff69b4", 0.3)
                            : alpha(theme.palette.divider, 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: isLoverChat
                            ? alpha("#ff69b4", 0.5)
                            : alpha(theme.palette.secondary.main, 0.5),
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: isLoverChat
                            ? alpha("#ff69b4", 0.7)
                            : theme.palette.secondary.main,
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleSendMessage}
                            disabled={!chatInput.trim() || sendingMessage}
                            sx={{
                              color: isLoverChat
                                ? "#ff69b4"
                                : theme.palette.secondary.main,
                              "&:hover": {
                                backgroundColor: isLoverChat
                                  ? alpha("#ff69b4", 0.1)
                                  : alpha(theme.palette.secondary.main, 0.1),
                              },
                              "&:disabled": {
                                color: theme.palette.text.disabled,
                              },
                            }}
                          >
                            {sendingMessage ? (
                              <CircularProgress size={20} />
                            ) : (
                              <Send />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              );
            })()}
                </>
              );
            })()}
          </>
        )}
      </Box>
    </Box>
  );

  // If fullscreen, wrap in a modal/overlay
  if (isFullscreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Fullscreen Header with Minimize Button */}
        <Box
          sx={{
            padding: 1.5,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: theme.palette.text.primary,
              textTransform: "capitalize",
              flex: 1,
            }}
          >
            {selectedChatType === "social"
              ? "Characters at Location"
              : `${selectedChatType} Chat`}
          </Typography>
          <IconButton
            onClick={() => setIsFullscreen(false)}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              },
            }}
            title="Minimize"
          >
            <Minimize sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>

        {/* Fullscreen Chat Content */}
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          {chatContent}
        </Box>
      </Box>
    );
  }

  return chatContent;
};

