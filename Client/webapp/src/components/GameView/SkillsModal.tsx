"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  alpha,
  useTheme,
  Divider,
  Paper,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CharacterInterface } from "@/types/api";
import { skillsL10N } from "@/L10N/skills";
import type { SkillId } from "@/L10N/skillEnums";
// @ts-ignore - Case sensitivity issue with textRenderer.ts vs TextRenderer.tsx
import { TextRenderer } from "@/utils/TextRenderer";
import type { SkillConsume, SkillProduce, CharacterSkillInterface } from "@/types/api";

export interface SkillsModalProps {
  open: boolean;
  onClose: () => void;
  character: CharacterInterface | null;
}

// Draggable Skill Chip Component
interface DraggableSkillChipProps {
  skill: SkillData;
  skillName: string;
  source: 'learned' | 'active' | 'conditional';
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  theme: any;
}

const DraggableSkillChip: React.FC<DraggableSkillChipProps> = ({
  skill,
  skillName,
  source,
  index,
  isSelected,
  onSelect,
  theme,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${source}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Chip
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      label={`${skillName}: ${skill.level}`}
      onClick={onSelect}
      sx={{
        fontFamily: "Crimson Text, serif",
        fontSize: "0.85rem",
        height: "auto",
        py: 0.75,
        px: 1.25,
        backgroundColor: isSelected
          ? alpha(theme.palette.secondary.main, 0.3)
          : alpha(theme.palette.secondary.main, 0.1),
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        color: theme.palette.text.primary,
        cursor: isDragging ? 'grabbing' : 'grab',
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.2),
        },
      }}
    />
  );
};

// Drop Zone Component for decks
interface DropZoneProps {
  id: string;
  index: number;
  theme: any;
  isOver?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ id, index, theme, isOver }) => {
  const { setNodeRef, isOver: isDroppableOver } = useDroppable({
    id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: 4,
        minWidth: 4,
        height: 32,
        backgroundColor: (isOver || isDroppableOver)
          ? alpha(theme.palette.primary.main, 0.8)
          : alpha(theme.palette.primary.main, 0.2),
        borderRadius: 1,
        transition: 'all 0.2s',
      }}
    />
  );
};

// Deck Drop Zone
const DeckDropZone: React.FC<{ children: React.ReactNode; deckSource: string; theme: any; isFull?: boolean }> = ({ children, deckSource, theme, isFull = false }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${deckSource}-drop`,
    disabled: isFull,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        minHeight: 40,
        backgroundColor: isFull 
          ? alpha(theme.palette.warning.main, 0.05)
          : isOver 
            ? alpha(theme.palette.primary.main, 0.1) 
            : 'transparent',
        border: isFull ? `1px dashed ${alpha(theme.palette.warning.main, 0.3)}` : 'none',
        borderRadius: 1,
        transition: 'background-color 0.2s',
        opacity: isFull ? 0.7 : 1,
      }}
    >
      {children}
    </Box>
  );
};

// Learned Skills Drop Zone
const LearnedSkillsDropZone: React.FC<{ children: React.ReactNode; theme: any }> = ({ children, theme }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'learned-drop',
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        minHeight: 0,
        backgroundColor: isOver ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
        borderRadius: 1,
        transition: 'background-color 0.2s',
      }}
    >
      {children}
    </Box>
  );
};

/**
 * Skills Modal - Displays character skills
 * Layout:
 * - Left side: Two buttons (Active Deck, Conditional Deck)
 * - Right side: Two panels (top panel name follows active button, lower panel shows Learned Skills)
 */
type SkillData = {
  id: SkillId;
  level: number;
  exp: number;
  consume?: SkillConsume;
  produce?: SkillProduce;
};

const MAX_DECK_SIZE = 7;

export const SkillsModal: React.FC<SkillsModalProps> = ({
  open,
  onClose,
  character,
}) => {
  const theme = useTheme();
  const [activeDeck, setActiveDeck] = useState<"active" | "conditional">("active");
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  
  // Local state for deck management (allows editing without modifying character prop)
  const [activeDeckSkills, setActiveDeckSkills] = useState<SkillData[]>([]);
  const [conditionalDeckSkills, setConditionalDeckSkills] = useState<SkillData[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Initialize deck states from character when modal opens or character changes
  useEffect(() => {
    if (open && character) {
      const active = (character.activeSkills || [])
        .slice(0, MAX_DECK_SIZE)
        .map(skill => ({
          id: skill.id as SkillId,
          level: skill.level || 1,
          exp: skill.exp || 0,
          consume: skill.consume,
          produce: skill.produce,
        }));
      const conditional = (character.conditionalSkills || [])
        .slice(0, MAX_DECK_SIZE)
        .map(skill => ({
          id: skill.id as SkillId,
          level: skill.level || 1,
          exp: skill.exp || 0,
          consume: skill.consume,
          produce: skill.produce,
        }));
      setActiveDeckSkills(active);
      setConditionalDeckSkills(conditional);
      setHasUnsavedChanges(false);
    }
  }, [open, character]);

  // Sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Get skill name from L10N
  const getSkillName = (skillId: SkillId): string => {
    const skillData = skillsL10N[skillId];
    if (skillData && skillData.name) {
      return skillData.name.en || skillId;
    }
    return skillId;
  };

  // Get skill description from L10N
  const getSkillDescription = (skillId: SkillId): string => {
    const skillData = skillsL10N[skillId];
    if (skillData && skillData.description) {
      return skillData.description.en || "";
    }
    return "";
  };

  // Get skill formula from L10N
  const getSkillFormula = (skillId: SkillId): string | null => {
    const skillData = skillsL10N[skillId];
    if (skillData && skillData.formula) {
      return skillData.formula;
    }
    return null;
  };


  // Get element color
  const getElementColor = (element: string): string => {
    const elementColors: Record<string, string> = {
      neutral: theme.palette.grey?.[600] || "#757575",
      order: theme.palette.info?.main || "#1976d2",
      chaos: theme.palette.error?.main || "#d32f2f",
      fire: "#ff5722",
      earth: "#795548",
      water: "#2196f3",
      wind: "#4caf50",
    };
    return elementColors[element.toLowerCase()] || theme.palette.text.secondary;
  };

  // Format consume data for display
  const formatConsumeData = (consume: SkillConsume | null): React.ReactNode => {
    if (!consume || (consume.hp === 0 && consume.mp === 0 && consume.sp === 0 && (!consume.elements || consume.elements.length === 0))) {
      return <Typography variant="body2" sx={{ fontSize: "0.85rem", fontStyle: "italic", color: theme.palette.text.disabled }}>None</Typography>;
    }

    const parts: React.ReactNode[] = [];
    if (consume.hp > 0) parts.push(<Typography key="hp-c" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{consume.hp} HP</Typography>);
    if (consume.mp > 0) parts.push(<Typography key="mp-c" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{consume.mp} MP</Typography>);
    if (consume.sp > 0) parts.push(<Typography key="sp-c" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{consume.sp} SP</Typography>);
    if (consume.elements && consume.elements.length > 0) {
      consume.elements.forEach((e, index) => {
        parts.push(
          <Chip
            key={`element-c-${index}`}
            label={`${e.value} ${e.element}`}
            size="small"
            sx={{
              backgroundColor: alpha(getElementColor(e.element), 0.2),
              color: getElementColor(e.element),
              fontSize: "0.7rem",
              height: "auto",
              px: 0.8,
              py: 0.2,
              mr: 0.5,
              mb: 0.5,
            }}
          />
        );
      });
    }
    return <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>{parts}</Box>;
  };

  // Format produce data for display
  const formatProduceData = (produce: SkillProduce | null): React.ReactNode => {
    if (!produce || (produce.hp === 0 && produce.mp === 0 && produce.sp === 0 && (!produce.elements || produce.elements.length === 0))) {
      return <Typography variant="body2" sx={{ fontSize: "0.85rem", fontStyle: "italic", color: theme.palette.text.disabled }}>None</Typography>;
    }

    const parts: React.ReactNode[] = [];
    if (produce.hp > 0) parts.push(<Typography key="hp-p" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{produce.hp} HP</Typography>);
    if (produce.mp > 0) parts.push(<Typography key="mp-p" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{produce.mp} MP</Typography>);
    if (produce.sp > 0) parts.push(<Typography key="sp-p" variant="caption" sx={{ fontSize: "0.75rem", mr: 0.5 }}>{produce.sp} SP</Typography>);
    if (produce.elements && produce.elements.length > 0) {
      produce.elements.forEach((e, index) => {
        parts.push(
          <Chip
            key={`element-p-${index}`}
            label={e.min === e.max ? `${e.min} ${e.element}` : `${e.min}-${e.max} ${e.element}`}
            size="small"
            sx={{
              backgroundColor: alpha(getElementColor(e.element), 0.2),
              color: getElementColor(e.element),
              fontSize: "0.7rem",
              height: "auto",
              px: 0.8,
              py: 0.2,
              mr: 0.5,
              mb: 0.5,
            }}
          />
        );
      });
    }
    return <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>{parts}</Box>;
  };

  // Get all learned skills from character, excluding those in decks
  const learnedSkills = useMemo((): SkillData[] => {
    if (!character) return [];

    const skills: SkillData[] = [];
    const skillSet = new Set<string>();
    
    // Track skills that are in decks (should be excluded from learned skills)
    const deckSkillIds = new Set<string>();
    activeDeckSkills.forEach(skill => deckSkillIds.add(skill.id));
    conditionalDeckSkills.forEach(skill => deckSkillIds.add(skill.id));

    // Check if skills is a Record/Map or an object
    if (character.skills) {
      if (typeof character.skills === 'object' && !Array.isArray(character.skills)) {
        try {
          Object.entries(character.skills as Record<string, any>).forEach(([skillId, skillData]) => {
            // Skip if skill is in a deck
            if (deckSkillIds.has(skillId)) return;
            
            if (!skillSet.has(skillId)) {
              skillSet.add(skillId);
              const level = typeof skillData === 'object' && skillData !== null && 'level' in skillData 
                ? (skillData as any).level 
                : 1;
              const exp = typeof skillData === 'object' && skillData !== null && 'exp' in skillData 
                ? (skillData as any).exp 
                : 0;
              skills.push({ 
                id: skillId as SkillId, 
                level, 
                exp,
                consume: skillData?.consume,
                produce: skillData?.produce,
              });
            }
          });
        } catch (error) {
          console.warn("Could not parse character.skills:", error);
        }
      }
    }

    return skills.sort((a, b) => {
      const nameA = getSkillName(a.id);
      const nameB = getSkillName(b.id);
      return nameA.localeCompare(nameB);
    });
  }, [character, activeDeckSkills, conditionalDeckSkills]);

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Parse drag source and destination
    const activeParts = activeId.split('-');
    const overParts = overId.split('-');
    const activeSource = activeParts[0]; // 'learned', 'active', or 'conditional'
    const activeIndex = parseInt(activeParts[1] || '0');
    const overSource = overParts[0];
    let overIndex = parseInt(overParts[1] || '0');

    // Handle drop zone indices (they represent positions between items)
    if (overParts.length > 2 && overParts[2] === 'end') {
      // Dropping at the end
      if (overSource === 'active') {
        overIndex = activeDeckSkills.length;
      } else if (overSource === 'conditional') {
        overIndex = conditionalDeckSkills.length;
      }
    }

    // Handle drag within same deck (reordering)
    if (activeSource === 'active' && overSource === 'active') {
      // If dropping on a drop zone, adjust index
      if (overParts.length > 2) {
        // Dropping between items or at end
        if (overIndex <= activeIndex) {
          // Moving left, don't adjust
        } else {
          // Moving right, adjust for removed item
          overIndex = overIndex - 1;
        }
      }
      const newSkills = arrayMove(activeDeckSkills, activeIndex, overIndex);
      setActiveDeckSkills(newSkills);
      setHasUnsavedChanges(true);
      return;
    }
    if (activeSource === 'conditional' && overSource === 'conditional') {
      if (overParts.length > 2) {
        if (overIndex <= activeIndex) {
          // Moving left
        } else {
          overIndex = overIndex - 1;
        }
      }
      const newSkills = arrayMove(conditionalDeckSkills, activeIndex, overIndex);
      setConditionalDeckSkills(newSkills);
      setHasUnsavedChanges(true);
      return;
    }

    // Handle drag from Learned Skills to a deck
    if (activeSource === 'learned') {
      const skill = learnedSkills[activeIndex];
      if (!skill) return;

      if (overSource === 'active') {
        // Check if deck is full
        if (activeDeckSkills.length >= MAX_DECK_SIZE) {
          return; // Don't allow drop if deck is full
        }
        // Insert at position (clamp to valid range)
        const insertIndex = Math.min(overIndex, activeDeckSkills.length);
        const newSkills = [...activeDeckSkills];
        newSkills.splice(insertIndex, 0, skill);
        // Ensure we don't exceed max size
        const trimmedSkills = newSkills.slice(0, MAX_DECK_SIZE);
        setActiveDeckSkills(trimmedSkills);
        setHasUnsavedChanges(true);
      } else if (overSource === 'conditional') {
        // Check if deck is full
        if (conditionalDeckSkills.length >= MAX_DECK_SIZE) {
          return; // Don't allow drop if deck is full
        }
        // Insert at position (clamp to valid range)
        const insertIndex = Math.min(overIndex, conditionalDeckSkills.length);
        const newSkills = [...conditionalDeckSkills];
        newSkills.splice(insertIndex, 0, skill);
        // Ensure we don't exceed max size
        const trimmedSkills = newSkills.slice(0, MAX_DECK_SIZE);
        setConditionalDeckSkills(trimmedSkills);
        setHasUnsavedChanges(true);
      }
      return;
    }

    // Handle drag from deck to Learned Skills (remove from deck)
    if ((activeSource === 'active' || activeSource === 'conditional') && overSource === 'learned') {
      if (activeSource === 'active') {
        const newSkills = activeDeckSkills.filter((_, index) => index !== activeIndex);
        setActiveDeckSkills(newSkills);
        setHasUnsavedChanges(true);
      } else if (activeSource === 'conditional') {
        const newSkills = conditionalDeckSkills.filter((_, index) => index !== activeIndex);
        setConditionalDeckSkills(newSkills);
        setHasUnsavedChanges(true);
      }
      return;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Visual feedback handled by drop zones
  };

  // Save and Cancel handlers
  const handleSave = () => {
    // TODO: Implement save to backend
    console.log("Save clicked - Active:", activeDeckSkills, "Conditional:", conditionalDeckSkills);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      // Reset to original values
      if (character) {
        const active = (character.activeSkills || []).map(skill => ({
          id: skill.id as SkillId,
          level: skill.level || 1,
          exp: skill.exp || 0,
          consume: skill.consume,
          produce: skill.produce,
        }));
        const conditional = (character.conditionalSkills || []).map(skill => ({
          id: skill.id as SkillId,
          level: skill.level || 1,
          exp: skill.exp || 0,
          consume: skill.consume,
          produce: skill.produce,
        }));
        setActiveDeckSkills(active);
        setConditionalDeckSkills(conditional);
        setHasUnsavedChanges(false);
      }
    }
    onClose();
  };

  const currentDeckSkills = activeDeck === "active" ? activeDeckSkills : conditionalDeckSkills;
  const currentDeckSource = activeDeck === "active" ? "active" : "conditional";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Dialog
        open={open}
        onClose={handleCancel}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "95vw",
            minHeight: "80vh",
            maxHeight: "90vh",
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
            border: `2px solid ${theme.palette.secondary.main}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            pb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Cinzel, serif",
              fontWeight: 700,
              color: theme.palette.secondary.main,
            }}
          >
            Skills
            {hasUnsavedChanges && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  ml: 1,
                  color: theme.palette.warning.main,
                  fontSize: "0.75rem",
                }}
              >
                (Unsaved changes)
              </Typography>
            )}
          </Typography>
          <Button
            onClick={handleCancel}
            sx={{
              minWidth: "auto",
              padding: 0.5,
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.text.primary,
              },
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ p: 3, display: "flex", gap: 2, height: "100%", overflow: "hidden" }}>
        {/* Left Side: Deck Selection Buttons */}
        <Box
          sx={{
            width: 180,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Button
            variant={activeDeck === "active" ? "contained" : "outlined"}
            onClick={() => setActiveDeck("active")}
            sx={{
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Active Deck
          </Button>
          <Button
            variant={activeDeck === "conditional" ? "contained" : "outlined"}
            onClick={() => setActiveDeck("conditional")}
            sx={{
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Conditional Deck
          </Button>
        </Box>

        {/* Center: Content Panels */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* Top Panel: Active/Conditional Deck */}
          <Box
            sx={{
              minHeight: 150,
              maxHeight: 200,
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                {activeDeck === "active" ? "Active Deck" : "Conditional Deck"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "Crimson Text, serif",
                  color: currentDeckSkills.length >= MAX_DECK_SIZE 
                    ? theme.palette.warning.main 
                    : theme.palette.text.secondary,
                  fontWeight: currentDeckSkills.length >= MAX_DECK_SIZE ? 600 : 400,
                }}
              >
                {currentDeckSkills.length} / {MAX_DECK_SIZE}
              </Typography>
            </Box>
            <DeckDropZone deckSource={currentDeckSource} theme={theme} isFull={currentDeckSkills.length >= MAX_DECK_SIZE}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  gap: 0.5,
                  overflowX: "auto",
                  overflowY: "hidden",
                  minHeight: 40,
                  py: 0.5,
                }}
              >
              {currentDeckSkills.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Drag skills here from Learned Skills
                </Typography>
              ) : (
                <SortableContext
                  items={currentDeckSkills.map((_, index) => `${currentDeckSource}-${index}`)}
                  strategy={horizontalListSortingStrategy}
                >
                  {currentDeckSkills.map((skill, index) => {
                    const skillName = getSkillName(skill.id);
                    return (
                      <React.Fragment key={`${currentDeckSource}-${index}`}>
                        <DropZone
                          id={`${currentDeckSource}-drop-${index}`}
                          index={index}
                          theme={theme}
                        />
                        <DraggableSkillChip
                          skill={skill}
                          skillName={skillName}
                          source={currentDeckSource}
                          index={index}
                          isSelected={selectedSkill?.id === skill.id}
                          onSelect={() => setSelectedSkill(skill)}
                          theme={theme}
                        />
                      </React.Fragment>
                    );
                  })}
                  {currentDeckSkills.length < MAX_DECK_SIZE && (
                    <DropZone
                      id={`${currentDeckSource}-drop-${currentDeckSkills.length}-end`}
                      index={currentDeckSkills.length}
                      theme={theme}
                    />
                  )}
                </SortableContext>
              )}
              </Box>
            </DeckDropZone>
          </Box>

          {/* Lower Panel: Learned Skills */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Cinzel, serif",
                fontWeight: 600,
                mb: 1.5,
                color: theme.palette.text.primary,
              }}
            >
              Learned Skills
            </Typography>
            <LearnedSkillsDropZone theme={theme}>
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignContent: "flex-start",
                }}
              >
              {learnedSkills.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                  }}
                >
                  No skills learned yet
                </Typography>
              ) : (
                <SortableContext
                  items={learnedSkills.map((_, index) => `learned-${index}`)}
                  strategy={horizontalListSortingStrategy}
                >
                  {learnedSkills.map((skill, index) => {
                    const skillName = getSkillName(skill.id);
                    return (
                      <DraggableSkillChip
                        key={skill.id}
                        skill={skill}
                        skillName={skillName}
                        source="learned"
                        index={index}
                        isSelected={selectedSkill?.id === skill.id}
                        onSelect={() => setSelectedSkill(skill)}
                        theme={theme}
                      />
                    );
                  })}
                </SortableContext>
              )}
              </Box>
            </LearnedSkillsDropZone>
          </Box>
        </Box>

        {/* Right Side: Skill Card (always visible) */}
        <Box
          sx={{
            width: 450,
            minWidth: 400,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              height: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: 2,
            }}
          >
            {selectedSkill ? (
              <>
              {/* Header with skill name, Exp/Level, and close button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                  pb: 1.5,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 700,
                      color: theme.palette.secondary.main,
                      fontSize: "1.1rem",
                    }}
                  >
                    {getSkillName(selectedSkill.id)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      color: theme.palette.text.secondary,
                      fontSize: "0.85rem",
                    }}
                  >
                    Exp: {selectedSkill.exp} | Level: {selectedSkill.level}
                  </Typography>
                </Box>
                <Button
                  onClick={() => setSelectedSkill(null)}
                  size="small"
                  sx={{
                    minWidth: "auto",
                    padding: 0.5,
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Button>
              </Box>

              {/* Row 2: Image Placeholder */}
              <Box
                sx={{
                  width: "100%",
                  height: 150,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                  }}
                >
                  Skill Image Placeholder
                </Typography>
              </Box>

              {/* Row 3: Description Box */}
              <Box
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.background.default, 0.3),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  flex: 1,
                  minHeight: 200,
                  maxHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  flexShrink: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 1,
                    color: theme.palette.text.primary,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  Description
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                  }}
                >
                  {getSkillDescription(selectedSkill.id) ? (
                    <TextRenderer
                      text={getSkillDescription(selectedSkill.id)}
                      options={{
                        skillLevel: selectedSkill.level,
                        formula: getSkillFormula(selectedSkill.id),
                        counter: 0,
                        isSkill: true,
                        character: null, // Could pass character data if needed for stat modifiers
                        l10nData: null, // Could pass L10N data if needed for buff/debuff tooltips
                        currentLanguage: "en",
                        renderBuffDebuffTooltip: null,
                        useFormulaCapsule: true, // Use styled formula capsules
                      }}
                      variant="body2"
                      component="div"
                      sx={{
                        fontFamily: "Crimson Text, serif",
                        color: theme.palette.text.secondary,
                        whiteSpace: "pre-wrap",
                        fontSize: "0.85rem",
                        "& .formula-capsule": {
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Crimson Text, serif",
                        color: theme.palette.text.disabled,
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                      }}
                    >
                      No description available
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Row 4: Consume Box */}
              <Box
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.error.main,
                    fontSize: "0.9rem",
                  }}
                >
                  Consume
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  {formatConsumeData(selectedSkill?.consume || null)}
                </Typography>
              </Box>

              {/* Row 5: Produce Box */}
              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.success.main,
                    fontSize: "0.9rem",
                  }}
                >
                  Produce
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  {formatProduceData(selectedSkill?.produce || null)}
                </Typography>
              </Box>
              </>
            ) : (
              <>
              {/* Placeholder header (same structure as actual content) */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                  pb: 1.5,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 700,
                      color: theme.palette.text.disabled,
                      fontSize: "1.1rem",
                    }}
                  >
                    No Skill Selected
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      color: theme.palette.text.disabled,
                      fontSize: "0.85rem",
                    }}
                  >
                    Click on a skill to view details
                  </Typography>
                </Box>
              </Box>

              {/* Placeholder image (same height as actual) */}
              <Box
                sx={{
                  width: "100%",
                  height: 150,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                  }}
                >
                  Skill Image Placeholder
                </Typography>
              </Box>

              {/* Placeholder description box (same height as actual) */}
              <Box
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.background.default, 0.3),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  flex: 1,
                  minHeight: 200,
                  maxHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  flexShrink: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 1,
                    color: theme.palette.text.disabled,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  Description
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      color: theme.palette.text.disabled,
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      textAlign: "center",
                    }}
                  >
                    Select a skill to see its description
                  </Typography>
                </Box>
              </Box>

              {/* Placeholder consume box */}
              <Box
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.error.main, 0.05),
                  borderRadius: 1,
                  border: `1px dashed ${alpha(theme.palette.error.main, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.text.disabled,
                    fontSize: "0.9rem",
                  }}
                >
                  Consume
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    color: theme.palette.text.disabled,
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  -
                </Typography>
              </Box>

              {/* Placeholder produce box */}
              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  borderRadius: 1,
                  border: `1px dashed ${alpha(theme.palette.success.main, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.text.disabled,
                    fontSize: "0.9rem",
                  }}
                >
                  Produce
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    color: theme.palette.text.disabled,
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  -
                </Typography>
              </Box>
              </>
            )}
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontFamily: "Cinzel, serif",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!hasUnsavedChanges}
          sx={{
            textTransform: "none",
            fontFamily: "Cinzel, serif",
          }}
        >
          Save
        </Button>
      </DialogActions>
      </Dialog>
      <DragOverlay>
        {activeId ? (() => {
          const parts = activeId.split('-');
          const source = parts[0];
          const index = parseInt(parts[1] || '0');
          let skill: SkillData | null = null;
          
          if (source === 'learned') {
            skill = learnedSkills[index];
          } else if (source === 'active') {
            skill = activeDeckSkills[index];
          } else if (source === 'conditional') {
            skill = conditionalDeckSkills[index];
          }
          
          if (!skill) return null;
          const skillName = getSkillName(skill.id);
          
          return (
            <Chip
              label={`${skillName}: ${skill.level}`}
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
                height: "auto",
                py: 0.75,
                px: 1.25,
                backgroundColor: alpha(theme.palette.secondary.main, 0.8),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
                color: theme.palette.text.primary,
                cursor: 'grabbing',
                transform: 'rotate(5deg)',
              }}
            />
          );
        })() : null}
      </DragOverlay>
    </DndContext>
  );
};

