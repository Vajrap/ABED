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
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, Send, Fullscreen, Minimize } from "@mui/icons-material";
import { ChatMessage, Friend, ChatScope, UserStatus } from "@/types/chat";
import { mockFriends, getChatMessagesByScope } from "@/data/mockChatData";
import { PortraitRenderer } from "@/components/Portrait/PortraitRenderer";
import { locationService } from "@/services/locationService";
import { chatService } from "@/services/chatService";
import { websocketService } from "@/services/websocketService";

type FriendFilterTab = "lovers" | "closeFriends" | "friends" | "npcs" | "location" | "all";

export interface ChatPanelProps {
  currentUserId?: string; // Current player's user ID
}

/**
 * Chat Panel Component
 * 2-column layout: Left narrow for chat type selection, Right for chat messages or friends list
 */
export const ChatPanel: React.FC<ChatPanelProps> = ({ currentUserId = "mock-character-001" }) => {
  const theme = useTheme();
  const [selectedChatType, setSelectedChatType] = useState<ChatScope | "social">("global");
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [friendFilterTab, setFriendFilterTab] = useState<FriendFilterTab>("all");
  const [chatInput, setChatInput] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [locationNPCs, setLocationNPCs] = useState<Friend[]>([]);
  const [loadingLocationNPCs, setLoadingLocationNPCs] = useState<boolean>(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]); // Local message cache
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get messages based on selected chat type
  const getDisplayMessages = (): ChatMessage[] => {
    // Combine local messages (from API) with any mock data (for now)
    const mockMessages = getChatMessagesByScope(
      selectedChatType === "social" ? "private" : selectedChatType,
      selectedChatType === "social" ? (selectedFriendId || undefined) : undefined,
      currentUserId
    );
    
    // Filter local messages by current scope
    const filteredLocal = localMessages.filter((msg) => {
      if (selectedChatType === "social" && selectedFriendId) {
        return (
          msg.scope === "private" &&
          (msg.senderId === selectedFriendId || msg.recipientId === selectedFriendId)
        );
      }
      return msg.scope === selectedChatType;
    });

    // Combine and sort by timestamp
    const allMessages = [...mockMessages, ...filteredLocal];
    return allMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
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
  };

  // Handle friend click (for Social tab)
  const handleFriendClick = (friendId: string) => {
    setSelectedFriendId(friendId);
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

      // Only add message if it matches current chat view
      const shouldAdd = (() => {
        if (selectedChatType === "social" && selectedFriendId) {
          // Private chat: check if message is from/to the selected friend
          return (
            chatMessage.scope === "private" &&
            (chatMessage.senderId === selectedFriendId || chatMessage.recipientId === selectedFriendId)
          );
        }
        // Public chats: check if scope matches
        return chatMessage.scope === selectedChatType;
      })();

      if (shouldAdd) {
        setLocalMessages((prev) => [...prev, chatMessage]);
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
    const scope = selectedChatType === "social" ? "private" : selectedChatType;
    const recipientId = selectedChatType === "social" ? selectedFriendId || undefined : undefined;

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
    // Show input for all chat types except when viewing friends list in Social tab
    if (selectedChatType === "social" && !selectedFriendId) {
      return false; // Don't show input on friends list
    }
    // Show input for: global, region, location, party, and private chats (social with selected friend)
    return true;
  };

  // Fetch location NPCs when location tab is selected
  useEffect(() => {
    if (friendFilterTab === "location") {
      setLoadingLocationNPCs(true);
      locationService
        .getLocationNPCs()
        .then((response) => {
          if (response.success && response.npcs) {
            // Convert NPCs to Friend format
            const npcFriends: Friend[] = response.npcs.map((npc) => ({
              id: npc.id,
              name: npc.name,
              portrait: npc.portrait,
              isPlayer: false, // NPCs are not players
              // No status for NPCs
            }));
            setLocationNPCs(npcFriends);
          } else {
            setLocationNPCs([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching location NPCs:", error);
          setLocationNPCs([]);
        })
        .finally(() => {
          setLoadingLocationNPCs(false);
        });
    } else {
      // Clear location NPCs when switching away from location tab
      setLocationNPCs([]);
    }
  }, [friendFilterTab]);

  // Filter friends based on selected tab
  const getFilteredFriends = (): Friend[] => {
    // If location tab, return location NPCs
    if (friendFilterTab === "location") {
      return locationNPCs;
    }

    let filtered = mockFriends;

    switch (friendFilterTab) {
      case "lovers":
        filtered = mockFriends.filter((f) => f.relation?.title === "lover");
        break;
      case "closeFriends":
        filtered = mockFriends.filter((f) => f.relation?.title === "closeFriend");
        break;
      case "friends":
        filtered = mockFriends.filter(
          (f) => f.isPlayer && (f.relation?.title === "friend" || !f.relation)
        );
        break;
      case "npcs":
        filtered = mockFriends.filter((f) => !f.isPlayer);
        break;
      case "all":
      default:
        // Show all friends
        break;
    }

    return filtered;
  };

  const filteredFriends = getFilteredFriends();

  // Auto-scroll to bottom when messages change or chat type changes
  useEffect(() => {
    // Only scroll if we're viewing messages (not friends list)
    if (selectedChatType !== "social" || selectedFriendId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChatType, selectedFriendId]);

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
            value="global"
            control={<Radio size="small" />}
            label="Global"
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              },
            }}
          />
          <FormControlLabel
            value="region"
            control={<Radio size="small" />}
            label="Region"
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              },
            }}
          />
          <FormControlLabel
            value="location"
            control={<Radio size="small" />}
            label="Location"
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              },
            }}
          />
          <FormControlLabel
            value="party"
            control={<Radio size="small" />}
            label="Party"
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              },
            }}
          />
          <FormControlLabel
            value="social"
            control={<Radio size="small" />}
            label="Social"
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              },
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
          // Friends List View
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Filter Tabs */}
            <Box
              sx={{
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
              }}
            >
              <Tabs
                value={friendFilterTab}
                onChange={(_, newValue) => setFriendFilterTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: 48,
                  "& .MuiTab-root": {
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "none",
                    minHeight: 48,
                    padding: "0 16px",
                  },
                  "& .Mui-selected": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <Tab label="All" value="all" />
                <Tab label="Lovers" value="lovers" />
                <Tab label="Close Friends" value="closeFriends" />
                <Tab label="Friends" value="friends" />
                <Tab label="NPCs" value="npcs" />
                <Tab label="Location" value="location" />
              </Tabs>
            </Box>

            {/* Friends List */}
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
                    Loading NPCs...
                  </Typography>
                </Box>
              ) : filteredFriends.length === 0 ? (
                <Typography
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    mt: 4,
                  }}
                >
                  {friendFilterTab === "location"
                    ? "No NPCs found at this location"
                    : `No ${friendFilterTab === "all" ? "friends" : friendFilterTab} found`}
                </Typography>
              ) : (
                filteredFriends.map((friend) => {
                  // Pink background for lovers
                  const isLover = friend.relation?.title === "lover";
                  const backgroundColor = isLover
                    ? alpha("#ff69b4", 0.15) // Pink tint for lovers
                    : alpha(theme.palette.background.paper, 0.3);
                  const hoverBackgroundColor = isLover
                    ? alpha("#ff69b4", 0.25) // Darker pink on hover
                    : alpha(theme.palette.secondary.main, 0.1);
                  const borderColor = isLover
                    ? alpha("#ff69b4", 0.4) // Pink border for lovers
                    : alpha(theme.palette.divider, 0.2);

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
                        cursor: "pointer",
                        mb: 1,
                        backgroundColor,
                        border: `1px solid ${borderColor}`,
                        "&:hover": {
                          backgroundColor: hoverBackgroundColor,
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
                        <Typography
                          sx={{
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 0.5,
                          }}
                        >
                          {friend.name}
                          {friend.isPlayer && friend.status && (
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                color: theme.palette.text.secondary,
                                ml: 1,
                                fontStyle: "italic",
                              }}
                            >
                              ({friend.status})
                            </Typography>
                          )}
                        </Typography>
                        {friend.lastMessage && (
                          <Typography
                            sx={{
                              fontFamily: "Crimson Text, serif",
                              fontSize: "0.8rem",
                              color: theme.palette.text.secondary,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {friend.lastMessage}
                          </Typography>
                        )}
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
              // Check if chatting with a lover
              const selectedFriend = selectedChatType === "social" && selectedFriendId
                ? mockFriends.find((f) => f.id === selectedFriendId)
                : null;
              const isLoverChat = selectedFriend?.relation?.title === "lover";

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
              {selectedChatType === "social" && selectedFriendId && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFriendId(null);
                  }}
                  size="small"
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
              )}
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
                {selectedFriendId
                  ? mockFriends.find((f) => f.id === selectedFriendId)?.name ||
                    "Chat"
                  : selectedChatType === "social"
                  ? "Friends"
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

            {/* Chat Input - Show for all chat types except friends list */}
            {(() => {
              const selectedFriend = selectedChatType === "social" && selectedFriendId
                ? mockFriends.find((f) => f.id === selectedFriendId)
                : null;
              const isLoverChat = selectedFriend?.relation?.title === "lover";
              
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
                    placeholder={
                      selectedChatType === "social" && selectedFriendId
                        ? "Type a private message..."
                        : `Type a message in ${selectedChatType} chat...`
                    }
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
          {selectedChatType === "social" && selectedFriendId && (
            <IconButton
              onClick={() => setSelectedFriendId(null)}
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
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
            {selectedFriendId
              ? mockFriends.find((f) => f.id === selectedFriendId)?.name ||
                "Chat"
              : selectedChatType === "social"
              ? "Friends"
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

