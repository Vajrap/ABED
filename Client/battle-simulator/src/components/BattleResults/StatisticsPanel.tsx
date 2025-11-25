import type { ReactNode } from 'react';
import { Box, Typography, Paper, Chip, Grid, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {
  StructuredBattleStatistics,
  CharacterStructuredStats,
  EquipmentModifierSnapshot,
  EquipmentArmorStats,
  EquipmentWeaponStats,
  StatDetail,
} from '../../services/types';

interface StatisticsPanelProps {
  statistics: {
    characters: any[];
    summary: string;
    structured: StructuredBattleStatistics;
  };
}

export default function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const { structured } = statistics;

  const formatLabel = (key: string) =>
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderNumberRecordChips = (
    label: string,
    record?: Record<string, number>,
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' = 'default'
  ) => {
    if (!record || Object.keys(record).length === 0) return null;
    return (
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          {label}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
          {Object.entries(record).map(([key, value]) => (
            <Chip
              key={`${label}-${key}`}
              label={`${formatLabel(key)} ${value >= 0 ? '+' : ''}${value}`}
              size="small"
              color={color}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    );
  };

  const renderEquipmentModifiers = (modifiers?: EquipmentModifierSnapshot) => {
    if (!modifiers) {
      return null;
    }

    const sections: ReactNode[] = [];
    const pushSection = (node: ReactNode | null) => {
      if (node) {
        sections.push(node);
      }
    };

    pushSection(renderNumberRecordChips('Attributes', modifiers.attributes, 'primary'));
    pushSection(renderNumberRecordChips('Proficiencies', modifiers.proficiencies, 'info'));
    pushSection(renderNumberRecordChips('Battle Stats', modifiers.battleStatus, 'warning'));
    pushSection(renderNumberRecordChips('Artisans', modifiers.artisans, 'secondary'));
    pushSection(renderNumberRecordChips('Saves', modifiers.saves, 'success'));
    pushSection(renderNumberRecordChips('Vitals', modifiers.vitals, 'error'));

    if (modifiers.traits && modifiers.traits.length > 0) {
      sections.push(
        <Box key="traits">
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            Traits
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {modifiers.traits.map((trait) => (
              <Chip key={trait} label={formatLabel(trait)} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      );
    }

    if (modifiers.buffsAndDebuffs && modifiers.buffsAndDebuffs.length > 0) {
      sections.push(
        <Box key="buffs">
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            Buffs / Debuffs
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {modifiers.buffsAndDebuffs.map((entry) => (
              <Chip
                key={`${entry.id}-${entry.value}`}
                label={`${formatLabel(entry.id)} ${entry.value >= 0 ? '+' : ''}${entry.value}`}
                size="small"
                color={entry.value >= 0 ? 'success' : 'error'}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      );
    }

    if (sections.length === 0) {
      return null;
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {sections.map((section, index) => (
          <Box key={index}>{section}</Box>
        ))}
      </Box>
    );
  };

  const renderArmorStatsBox = (armor?: EquipmentArmorStats) => {
    if (!armor) return null;
    const hasPhysical = !!(armor.physicalDefense && Object.values(armor.physicalDefense).some(val => typeof val === 'number'));
    const hasMagical = !!(armor.magicalDefense && Object.values(armor.magicalDefense).some(val => typeof val === 'number'));
    const hasDodge = typeof armor.dodgeBonus === 'number' && armor.dodgeBonus !== 0;
    if (!hasPhysical && !hasMagical && !hasDodge) {
      return null;
    }
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {hasPhysical && armor.physicalDefense && (
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">
              Physical Defense
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {Object.entries(armor.physicalDefense).map(([key, value]) => (
                typeof value === 'number' ? (
                  <Chip key={key} label={`${formatLabel(key)} ${value}`} size="small" color="primary" variant="outlined" />
                ) : null
              ))}
            </Box>
          </Box>
        )}
        {hasMagical && armor.magicalDefense && (
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">
              Elemental Defense
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {Object.entries(armor.magicalDefense).map(([key, value]) => (
                typeof value === 'number' ? (
                  <Chip key={key} label={`${formatLabel(key)} ${value}`} size="small" color="secondary" variant="outlined" />
                ) : null
              ))}
            </Box>
          </Box>
        )}
        {hasDodge && (
          <Chip label={`Dodge +${armor.dodgeBonus}`} size="small" color="info" variant="outlined" />
        )}
      </Box>
    );
  };

  const renderWeaponStatsBox = (weapon?: EquipmentWeaponStats) => {
    if (!weapon) return null;
    const physLine = weapon.physicalDamageDice
      ? `Physical ${weapon.physicalDamageDice}${weapon.physicalDamageType ? ` (${weapon.physicalDamageType})` : ''}`
      : null;
    const magicLine = weapon.magicalDamageDice
      ? `Magical ${weapon.magicalDamageDice}${weapon.magicalDamageType ? ` (${weapon.magicalDamageType})` : ''}`
      : null;

    const hasTagLine = weapon.weaponType || weapon.preferredPosition || weapon.handle;
    if (!physLine && !magicLine && !hasTagLine) {
      return null;
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {(physLine || magicLine) && (
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">
              Damage Dice
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {physLine && (
                <Typography variant="body2" fontWeight="bold">
                  {physLine}
                </Typography>
              )}
              {magicLine && (
                <Typography variant="body2" fontWeight="bold">
                  {magicLine}
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {hasTagLine && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {weapon.weaponType && <Chip label={formatLabel(weapon.weaponType)} size="small" variant="outlined" />}
            {weapon.preferredPosition && <Chip label={formatLabel(weapon.preferredPosition)} size="small" variant="outlined" />}
            {weapon.handle && <Chip label={`${weapon.handle}-handed`} size="small" variant="outlined" />}
          </Box>
        )}
      </Box>
    );
  };

  const renderStatSection = (
    title: string,
    stats?: Record<string, StatDetail>,
    grid: { xs?: number; md?: number } = { xs: 12, md: 6 }
  ) => {
    if (!stats) return null;
    const entries = Object.entries(stats).filter(([, value]) => typeof value?.total === 'number');
    if (entries.length === 0) return null;

    return (
      <Grid item xs={grid.xs} md={grid.md}>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          {title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 0.75,
          }}
        >
          {entries.map(([key, value]) => (
            <Paper
              key={key}
              variant="outlined"
              sx={{
                p: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {formatLabel(key)}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {value.total}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Grid>
    );
  };
  if (!structured || !structured.characters || Object.keys(structured.characters).length === 0) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary">
          No statistics available
        </Typography>
      </Box>
    );
  }

  const characters = Object.values(structured.characters);

  // Sort by overall damage descending
  const sortedCharacters = [...characters].sort((a, b) => b.overallDamage - a.overallDamage);
  const maxDamage = Math.max(...characters.map(c => c.overallDamage), 1);

  return (
    <Box sx={{ p: 2 }}>
      {/* Front-Back Ratio */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          Targeting Analysis
        </Typography>
        <Typography variant="body1">
          Front/Back Row Ratio: <strong>{structured.frontBackRatio.toFixed(2)}:1</strong>
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          {structured.frontBackRatio > 1 ? 'More targeting on front row' : 'More targeting on back row'}
        </Typography>
      </Paper>

      {/* Character Statistics */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
        Character Performance
      </Typography>

      {sortedCharacters.map((char: CharacterStructuredStats) => (
        <Accordion key={char.characterId} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ width: '100%', pr: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {char.characterName} (Pos {char.position})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {char.overallDamage > 0 && (
                    <Chip 
                      label={`${char.overallDamage} dmg`} 
                      color="error" 
                      size="small"
                    />
                  )}
                  {char.overallHealing > 0 && (
                    <Chip 
                      label={`${char.overallHealing} heal`} 
                      color="success" 
                      size="small"
                    />
                  )}
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(char.overallDamage / maxDamage) * 100} 
                sx={{ height: 6, borderRadius: 3 }}
                color="error"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Overall Stats */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Overall Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2">
                    Damage Dealt: <strong>{char.overallDamage}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Healing Done: <strong>{char.overallHealing}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Damage Taken: <strong>{char.damageTaken}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Healing Received: <strong>{char.healingReceived}</strong>
                  </Typography>
                </Box>
              </Grid>

              {/* Targeting */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Targeting
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2">
                    Front Row Hits: <strong>{char.frontRowTargets}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Back Row Hits: <strong>{char.backRowTargets}</strong>
                  </Typography>
                </Box>
              </Grid>

              {renderStatSection('Attributes', char.attributes)}
              {renderStatSection('Proficiencies', char.proficiencies)}

              {/* Battle Stats */}
              {typeof char.battleStats?.dodge?.total === 'number' && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Battle Stats
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    <Chip label={`Dodge ${char.battleStats.dodge.total}`} color="info" variant="outlined" />
                  </Box>
                </Grid>
              )}

              {/* Equipment */}
              {char.equipment && char.equipment.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Equipment & Modifiers
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {char.equipment.map((equip) => {
                      const metaParts = [
                        equip.type ? formatLabel(equip.type) : null,
                        equip.tier ? formatLabel(equip.tier) : null,
                        typeof equip.weight === 'number' ? `${equip.weight} wt` : null,
                        equip.armorStats?.armorClass ? formatLabel(equip.armorStats.armorClass) : null,
                        equip.weaponStats?.weaponType ? formatLabel(equip.weaponStats.weaponType) : null,
                      ].filter(Boolean);
                      const detailSections = [
                        renderArmorStatsBox(equip.armorStats),
                        renderWeaponStatsBox(equip.weaponStats),
                        renderEquipmentModifiers(equip.modifiers),
                      ].filter(Boolean);
                      return (
                        <Paper key={`${equip.slot}-${equip.itemId}`} variant="outlined" sx={{ p: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                {formatLabel(equip.slot)}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {equip.name}
                              </Typography>
                              {metaParts.length > 0 && (
                                <Typography variant="caption" color="text.secondary">
                                  {metaParts.join(' • ')}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          {detailSections.length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {detailSections.map((section, index) => (
                                <Box key={index}>{section}</Box>
                              ))}
                            </Box>
                          )}
                        </Paper>
                      );
                    })}
                  </Box>
                </Grid>
              )}

              {/* Skill Deck */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Skill Deck (in order, position 0 = first checked)
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {char.skillDeck && char.skillDeck.length > 0 ? (
                    char.skillDeck.map((skill, idx) => {
                      const usageCount = char.skillsUsed[skill.skillId] || 0;
                      const usagePercentage = char.turns.length > 0 
                        ? ((usageCount / char.turns.length) * 100).toFixed(1) 
                        : '0.0';
                      
                      return (
                        <Paper 
                          key={idx} 
                          elevation={1} 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: usageCount > 0 ? 'action.selected' : 'action.hover',
                            border: usageCount === 0 ? '1px dashed' : 'none',
                            borderColor: 'warning.main'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Chip 
                              label={`#${skill.position}`}
                              size="small"
                              variant="outlined"
                              sx={{ minWidth: 50 }}
                            />
                            <Typography variant="body2" fontWeight="bold">
                              {skill.skillName} (Lv {skill.level})
                            </Typography>
                            {usageCount > 0 && (
                              <Chip 
                                label={`Used ${usageCount}x (${usagePercentage}%)`}
                                size="small"
                                color="success"
                              />
                            )}
                            {usageCount === 0 && (
                              <Chip 
                                label="Never used"
                                size="small"
                                color="warning"
                                variant="outlined"
                              />
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                            {/* Consume */}
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                Consumes:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.25 }}>
                                {skill.consume.hp > 0 && (
                                  <Chip label={`${skill.consume.hp} HP`} size="small" color="error" variant="outlined" />
                                )}
                                {skill.consume.mp > 0 && (
                                  <Chip label={`${skill.consume.mp} MP`} size="small" color="info" variant="outlined" />
                                )}
                                {skill.consume.sp > 0 && (
                                  <Chip label={`${skill.consume.sp} SP`} size="small" color="warning" variant="outlined" />
                                )}
                                {skill.consume.elements.map((elem, i) => (
                                  <Chip 
                                    key={i}
                                    label={`${elem.value} ${elem.element}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                                {skill.consume.hp === 0 && skill.consume.mp === 0 && skill.consume.sp === 0 && skill.consume.elements.length === 0 && (
                                  <Typography variant="caption" color="text.secondary">None</Typography>
                                )}
                              </Box>
                            </Box>
                            {/* Produce */}
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                Produces:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.25 }}>
                                {skill.produce.hp > 0 && (
                                  <Chip label={`${skill.produce.hp} HP`} size="small" color="success" variant="outlined" />
                                )}
                                {skill.produce.mp > 0 && (
                                  <Chip label={`${skill.produce.mp} MP`} size="small" color="info" variant="outlined" />
                                )}
                                {skill.produce.sp > 0 && (
                                  <Chip label={`${skill.produce.sp} SP`} size="small" color="warning" variant="outlined" />
                                )}
                                {skill.produce.elements.map((elem, i) => (
                                  <Chip 
                                    key={i}
                                    label={`${elem.min === elem.max ? elem.min : `${elem.min}-${elem.max}`} ${elem.element}`}
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                ))}
                                {skill.produce.hp === 0 && skill.produce.mp === 0 && skill.produce.sp === 0 && skill.produce.elements.length === 0 && (
                                  <Typography variant="caption" color="text.secondary">None</Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No skills in deck
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Conditional Skill Deck */}
              {char.conditionalSkillDeck && char.conditionalSkillDeck.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Conditional Skill Deck (used when HP low)
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {char.conditionalSkillDeck.map((skill, idx) => (
                      <Paper key={idx} elevation={1} sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip 
                            label={`#${skill.position}`}
                            size="small"
                            variant="outlined"
                            sx={{ minWidth: 50 }}
                          />
                          <Typography variant="body2" fontWeight="bold">
                            {skill.skillName} (Lv {skill.level})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                              Consumes:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.25 }}>
                              {skill.consume.hp > 0 && (
                                <Chip label={`${skill.consume.hp} HP`} size="small" color="error" variant="outlined" />
                              )}
                              {skill.consume.mp > 0 && (
                                <Chip label={`${skill.consume.mp} MP`} size="small" color="info" variant="outlined" />
                              )}
                              {skill.consume.sp > 0 && (
                                <Chip label={`${skill.consume.sp} SP`} size="small" color="warning" variant="outlined" />
                              )}
                              {skill.consume.elements.map((elem, i) => (
                                <Chip 
                                  key={i}
                                  label={`${elem.value} ${elem.element}`}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                              Produces:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.25 }}>
                              {skill.produce.elements.map((elem, i) => (
                                <Chip 
                                  key={i}
                                  label={`${elem.min === elem.max ? elem.min : `${elem.min}-${elem.max}`} ${elem.element}`}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Skills Used Summary */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Skills Used Summary
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Object.entries(char.skillsUsed).map(([skill, count]) => (
                    <Chip 
                      key={skill}
                      label={`${skill} (${count})`}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                  {Object.keys(char.skillsUsed).length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No skills used
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Turn-by-Turn Actions */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Turn-by-Turn Actions ({char.turns.length} turns)
                </Typography>
                <Box 
                  sx={{ 
                    maxHeight: 300, 
                    overflow: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1
                  }}
                >
                  {char.turns.map((turn, idx) => {
                    // Format the result text explicitly
                    const formatResult = (): string => {
                      if (!turn.targetName) {
                        return '';
                      }
                      
                      // Check for miss: either isHit is false, or damage type with value 0
                      if (turn.isHit === false || (turn.type === 'damage' && turn.value === 0)) {
                        return 'Miss';
                      }
                      
                      // Build result string
                      let result = '';
                      
                      if (turn.type === 'damage' && turn.value > 0) {
                        if (turn.isCrit) {
                          result = `Crit -${turn.value}`;
                        } else {
                          result = `-${turn.value}`;
                        }
                        // TODO: Add damage type (pierce, holy, etc.) when available
                      } else if (turn.type === 'heal' && turn.value > 0) {
                        result = `heal +${turn.value}`;
                      } else {
                        // No result to show
                        return '';
                      }
                      
                      return result;
                    };
                    
                    // Determine skill chip color based on action type
                    const getSkillChipColor = () => {
                      switch (turn.type) {
                        case 'damage': return 'error'; // Red for damage/attack skills
                        case 'heal': return 'success'; // Green for healing/support skills
                        default: return 'default'; // Grey for other skills
                      }
                    };
                    
                    const resultText = formatResult();
                    const targetColor = turn.isAlly === true ? 'success.main' : turn.isAlly === false ? 'error.main' : 'text.secondary';
                    
                    // Only show if we have a target or result
                    if (!turn.targetName && !resultText) {
                      return null;
                    }
                    
                    return (
                      <Box 
                        key={idx}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1, 
                          py: 0.5,
                          borderBottom: idx < char.turns.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider'
                        }}
                      >
                        <Chip 
                          label={`T${turn.turnNumber}`}
                          size="small"
                          variant="outlined"
                          sx={{ minWidth: 45 }}
                        />
                        <Chip 
                          label={turn.skill}
                          size="small"
                          color={getSkillChipColor()}
                          variant="outlined"
                        />
                        <Typography variant="body2" component="span" color="text.secondary">
                          →
                        </Typography>
                        {turn.targetName && (
                          <Typography 
                            variant="body2" 
                            component="span"
                            sx={{ 
                              color: targetColor,
                              fontWeight: 'bold'
                            }}
                          >
                            {turn.targetName}:
                          </Typography>
                        )}
                        {resultText && (
                          <Typography 
                            variant="body2" 
                            component="span"
                            sx={{ fontWeight: 'bold' }}
                            color={turn.type === 'heal' ? 'success.main' : 'text.primary'}
                          >
                            {resultText}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

