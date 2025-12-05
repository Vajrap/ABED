(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "restHandler",
    ()=>restHandler
]);
class RestHandler {
    API_BASE_URL = "http://localhost:7890";
    DEFAULT_TIMEOUT = 10000;
    async makeRequest(endpoint, reqBody, requireAuth = false, method = "POST") {
        const timeout = this.DEFAULT_TIMEOUT;
        const url = `${this.API_BASE_URL}${endpoint}`;
        console.log(`[RestHandler] Making ${method} request to: ${url}`, {
            reqBody,
            requireAuth
        });
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), timeout);
        // Prepare headers
        const headers = {
            "Content-Type": "application/json"
        };
        // Add auth token if required
        if (requireAuth) {
            const token = localStorage.getItem("sessionToken");
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }
        try {
            const response = await fetch(url, {
                method: method,
                headers,
                signal: controller.signal,
                body: method !== "GET" && reqBody ? JSON.stringify(reqBody) : undefined
            });
            clearTimeout(timeoutId);
            console.log(`[RestHandler] Response status: ${response.status} for ${url}`);
            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch  {
                    errorData = {
                        message: errorText
                    };
                }
                console.error(`[RestHandler] Error response for ${url}:`, errorData);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const jsonResponse = await response.json();
            console.log(`[RestHandler] Success response from ${url}:`, jsonResponse);
            return jsonResponse;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.error(`[RestHandler] Request timeout for ${url}`);
                throw new Error('Request timeout');
            }
            // Improve error message for network errors
            if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                console.error(`[RestHandler] Network error connecting to ${url}:`, error);
                throw new Error(`Cannot connect to server at ${this.API_BASE_URL}. Please ensure the backend is running and accessible. Error: ${error.message}`);
            }
            console.error(`[RestHandler] Error for ${url}:`, error);
            throw error;
        }
    }
    // Convenience methods for common HTTP verbs
    async get(endpoint, requireAuth = false) {
        return this.makeRequest(endpoint, null, requireAuth, "GET");
    }
    async post(endpoint, reqBody, requireAuth = false) {
        return this.makeRequest(endpoint, reqBody, requireAuth, "POST");
    }
    async put(endpoint, reqBody, requireAuth = false) {
        return this.makeRequest(endpoint, reqBody, requireAuth, "PUT");
    }
    async delete(endpoint, requireAuth = false) {
        return this.makeRequest(endpoint, null, requireAuth, "DELETE");
    }
    // Health check method
    async healthCheck() {
        console.log("Health check");
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/network-test`, {
                method: "GET",
                signal: AbortSignal.timeout(5000)
            });
            console.log("Health check response:", response);
            return response.ok;
        } catch (error) {
            console.log("Health check error:", error);
            return false;
        }
    }
}
const restHandler = new RestHandler();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/services/characterService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// CharacterService.ts - Service for character-related API calls
__turbopack_context__.s([
    "characterService",
    ()=>characterService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-client] (ecmascript)");
;
class CharacterService {
    async createCharacter(characterData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/create", characterData, true);
            return response;
        } catch (error) {
            console.error("Character creation error:", error);
            return {
                success: false,
                messageKey: "character.creationFailed"
            };
        }
    }
    async getUserCharacter() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/getUserCharacter", null, true);
        return response;
    }
    async checkCharacterName(name) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/checkName", {
                name
            });
            return response;
        } catch (error) {
            console.error("Character name check error:", error);
            return {
                success: false,
                messageKey: "character.nameCheckFailed",
                message: error instanceof Error ? error.message : "Failed to check character name"
            };
        }
    }
    async setActiveCharacter(characterId) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/setActive", {
                characterId
            }, true);
            return response;
        } catch (error) {
            console.error("Set active character error:", error);
            return {
                success: false,
                messageKey: "character.setActiveFailed",
                message: error instanceof Error ? error.message : "Failed to set active character"
            };
        }
    }
    async getMetadata() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].get("/api/character/metadata", false);
            return response;
        } catch (error) {
            console.error("Character metadata error:", error);
            return {
                success: false,
                messageKey: "character.metadataFailed"
            };
        }
    }
    async previewStats(race, classValue, background) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restHandler"].get(`/api/character/preview?race=${encodeURIComponent(race)}&class=${encodeURIComponent(classValue)}&background=${encodeURIComponent(background)}`, false);
            return response;
        } catch (error) {
            console.error("Failed to fetch character stats preview:", error);
            return {
                success: false,
                messageKey: "character.previewFailed"
            };
        }
    }
}
const characterService = new CharacterService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/characterStatsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Character stats data - duplicated from backend for client-side calculation
// This matches the new backend structure from Server/src/API/characterCreation/
// Tier system: three=11, two=10, one=9, others=8
// Stat modifier function (matching backend logic)
__turbopack_context__.s([
    "BACKGROUND_STATS",
    ()=>BACKGROUND_STATS,
    "CLASS_STATS",
    ()=>CLASS_STATS,
    "RACE_STATS",
    ()=>RACE_STATS,
    "calculateCharacterStats",
    ()=>calculateCharacterStats
]);
function statMod(value) {
    const boundaries = [
        {
            upperBound: 1,
            modifier: -5
        },
        {
            upperBound: 3,
            modifier: -4
        },
        {
            upperBound: 5,
            modifier: -3
        },
        {
            upperBound: 7,
            modifier: -2
        },
        {
            upperBound: 9,
            modifier: -1
        },
        {
            upperBound: 11,
            modifier: 0
        },
        {
            upperBound: 13,
            modifier: 1
        },
        {
            upperBound: 15,
            modifier: 2
        },
        {
            upperBound: 17,
            modifier: 3
        },
        {
            upperBound: 19,
            modifier: 4
        },
        {
            upperBound: 21,
            modifier: 5
        },
        {
            upperBound: 23,
            modifier: 6
        },
        {
            upperBound: 25,
            modifier: 7
        },
        {
            upperBound: 27,
            modifier: 8
        },
        {
            upperBound: 29,
            modifier: 9
        },
        {
            upperBound: 30,
            modifier: 10
        }
    ];
    for (const bound of boundaries){
        if (value <= bound.upperBound) {
            return bound.modifier;
        }
    }
    return 0;
}
// Convert tier-based proficiencies to numeric values
function proficienciesFromTiers(tiers) {
    const proficiencies = {
        sword: 8,
        axe: 8,
        hammer: 8,
        spear: 8,
        shield: 8,
        bareHand: 8,
        bow: 8,
        dagger: 8,
        blade: 8,
        wand: 8,
        staff: 8,
        book: 8,
        orb: 8
    };
    if (tiers.three) proficiencies[tiers.three] = 11;
    if (tiers.two) proficiencies[tiers.two] = 10;
    if (tiers.one) proficiencies[tiers.one] = 9;
    return proficiencies;
}
// Convert tier-based attributes to numeric values
function attributesFromTiers(baseAttributes, tiers) {
    const attributes = {
        ...baseAttributes
    };
    if (tiers.three) attributes[tiers.three] = (attributes[tiers.three] || 8) + 3;
    if (tiers.two) attributes[tiers.two] = (attributes[tiers.two] || 8) + 2;
    if (tiers.one) attributes[tiers.one] = (attributes[tiers.one] || 8) + 1;
    return attributes;
}
// Convert tier-based artisans to numeric values
function artisansFromTiers(tiers) {
    const artisans = {
        agriculture: 8,
        mining: 8,
        smithing: 8,
        woodCutting: 8,
        carpentry: 8,
        foraging: 8,
        weaving: 8,
        skinning: 8,
        tanning: 8,
        jewelry: 8,
        cooking: 8,
        alchemy: 8,
        enchanting: 8,
        fishing: 8,
        masonry: 8,
        brewing: 8,
        tinkering: 8,
        electrics: 8,
        performance: 8,
        tailoring: 8
    };
    if (tiers.three) artisans[tiers.three] = 11;
    if (tiers.two) artisans[tiers.two] = 10;
    if (tiers.one) artisans[tiers.one] = 9;
    return artisans;
}
// Base attributes (all races start with base 8)
const BASE_ATTRIBUTES = {
    charisma: 8,
    luck: 8,
    intelligence: 8,
    leadership: 8,
    vitality: 8,
    willpower: 8,
    planar: 8,
    control: 8,
    dexterity: 8,
    agility: 8,
    strength: 8,
    endurance: 8
};
const RACE_STATS = {
    Human: {
        planarAptitude: 50,
        baseHP: 15,
        baseSP: 15,
        baseMP: 15,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "leadership",
            two: "willpower",
            one: "control"
        })
    },
    human: {
        planarAptitude: 50,
        baseHP: 15,
        baseSP: 15,
        baseMP: 15,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "leadership",
            two: "willpower",
            one: "control"
        })
    },
    Elven: {
        planarAptitude: 70,
        baseHP: 15,
        baseSP: 10,
        baseMP: 20,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "planar",
            two: "intelligence",
            one: "charisma"
        })
    },
    elven: {
        planarAptitude: 70,
        baseHP: 15,
        baseSP: 10,
        baseMP: 20,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "planar",
            two: "intelligence",
            one: "charisma"
        })
    },
    Orc: {
        planarAptitude: 35,
        baseHP: 20,
        baseSP: 20,
        baseMP: 5,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "strength",
            two: "vitality",
            one: "endurance"
        })
    },
    orc: {
        planarAptitude: 35,
        baseHP: 20,
        baseSP: 20,
        baseMP: 5,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "strength",
            two: "vitality",
            one: "endurance"
        })
    },
    Dwarf: {
        planarAptitude: 35,
        baseHP: 15,
        baseSP: 20,
        baseMP: 10,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "endurance",
            two: "intelligence",
            one: "willpower"
        })
    },
    dwarf: {
        planarAptitude: 35,
        baseHP: 15,
        baseSP: 20,
        baseMP: 10,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "endurance",
            two: "intelligence",
            one: "willpower"
        })
    },
    Halfling: {
        planarAptitude: 50,
        baseHP: 15,
        baseSP: 15,
        baseMP: 15,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "dexterity",
            two: "agility",
            one: "luck"
        })
    },
    halfling: {
        planarAptitude: 50,
        baseHP: 15,
        baseSP: 15,
        baseMP: 15,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "dexterity",
            two: "agility",
            one: "luck"
        })
    },
    Vulpine: {
        planarAptitude: 70,
        baseHP: 13,
        baseSP: 13,
        baseMP: 18,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "intelligence",
            two: "agility",
            one: "planar"
        })
    },
    vulpine: {
        planarAptitude: 70,
        baseHP: 13,
        baseSP: 13,
        baseMP: 18,
        attributes: attributesFromTiers(BASE_ATTRIBUTES, {
            three: "intelligence",
            two: "agility",
            one: "planar"
        })
    }
};
const CLASS_STATS = {
    Cleric: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "hammer",
            one: "shield"
        }),
        startingSkills: [
            "Radiance",
            "Heal"
        ],
        startingEquipments: {
            body: "Robe",
            rightHand: "QuarterStaff",
            leftHand: null
        }
    },
    cleric: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "hammer",
            one: "shield"
        }),
        startingSkills: [
            "Radiance",
            "Heal"
        ],
        startingEquipments: {
            body: "Robe",
            rightHand: "QuarterStaff",
            leftHand: null
        }
    },
    Seer: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "dagger",
            one: "book"
        }),
        startingSkills: [
            "ThreadSnip",
            "PlanarEcho"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    seer: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "dagger",
            one: "book"
        }),
        startingSkills: [
            "ThreadSnip",
            "PlanarEcho"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    Mage: {
        proficiencies: proficienciesFromTiers({
            three: "wand",
            two: "staff",
            one: "book"
        }),
        startingSkills: [
            "ArcaneShield",
            "ArcaneBolt"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Wand",
            leftHand: null
        }
    },
    mage: {
        proficiencies: proficienciesFromTiers({
            three: "wand",
            two: "staff",
            one: "book"
        }),
        startingSkills: [
            "ArcaneShield",
            "ArcaneBolt"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Wand",
            leftHand: null
        }
    },
    Mystic: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "bareHand",
            one: "wand"
        }),
        startingSkills: [
            "InnerVeil",
            "MistStep"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    mystic: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "bareHand",
            one: "wand"
        }),
        startingSkills: [
            "InnerVeil",
            "MistStep"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    Rogue: {
        proficiencies: proficienciesFromTiers({
            three: "dagger",
            two: "bow",
            one: "blade"
        }),
        startingSkills: [
            "BleedingCut",
            "ThrowingKnives"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Knife",
            leftHand: null
        }
    },
    rogue: {
        proficiencies: proficienciesFromTiers({
            three: "dagger",
            two: "bow",
            one: "blade"
        }),
        startingSkills: [
            "BleedingCut",
            "ThrowingKnives"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Knife",
            leftHand: null
        }
    },
    SpellBlade: {
        proficiencies: proficienciesFromTiers({
            three: "sword",
            two: "blade",
            one: "wand"
        }),
        startingSkills: [
            "WindSlash",
            "PlanarEdge"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortSword",
            leftHand: null
        }
    },
    spellBlade: {
        proficiencies: proficienciesFromTiers({
            three: "sword",
            two: "blade",
            one: "wand"
        }),
        startingSkills: [
            "WindSlash",
            "PlanarEdge"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortSword",
            leftHand: null
        }
    },
    Shaman: {
        proficiencies: proficienciesFromTiers({
            three: "staff",
            two: "spear",
            one: "axe"
        }),
        startingSkills: [
            "HexOfRot",
            "MendSpirit"
        ],
        startingEquipments: {
            body: "Robe",
            rightHand: "QuarterStaff",
            leftHand: null
        }
    },
    shaman: {
        proficiencies: proficienciesFromTiers({
            three: "staff",
            two: "spear",
            one: "axe"
        }),
        startingSkills: [
            "HexOfRot",
            "MendSpirit"
        ],
        startingEquipments: {
            body: "Robe",
            rightHand: "QuarterStaff",
            leftHand: null
        }
    },
    Barbarian: {
        proficiencies: proficienciesFromTiers({
            three: "axe",
            two: "hammer",
            one: "bareHand"
        }),
        startingSkills: [
            "RecklessSwing",
            "Rage"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Axe",
            leftHand: null
        }
    },
    barbarian: {
        proficiencies: proficienciesFromTiers({
            three: "axe",
            two: "hammer",
            one: "bareHand"
        }),
        startingSkills: [
            "RecklessSwing",
            "Rage"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Axe",
            leftHand: null
        }
    },
    Warrior: {
        proficiencies: proficienciesFromTiers({
            three: "blade",
            two: "sword",
            one: "spear"
        }),
        startingSkills: [
            "WarCry",
            "PowerStrike"
        ],
        startingEquipments: {
            body: "PaddedArmor",
            rightHand: "Scimitar",
            leftHand: null
        }
    },
    warrior: {
        proficiencies: proficienciesFromTiers({
            three: "blade",
            two: "sword",
            one: "spear"
        }),
        startingSkills: [
            "WarCry",
            "PowerStrike"
        ],
        startingEquipments: {
            body: "PaddedArmor",
            rightHand: "Scimitar",
            leftHand: null
        }
    },
    Knight: {
        proficiencies: proficienciesFromTiers({
            three: "spear",
            two: "shield",
            one: "sword"
        }),
        startingSkills: [
            "PrecisionThrust"
        ],
        startingEquipments: {
            body: "ChainShirt",
            rightHand: "Dory",
            leftHand: "Buckler"
        }
    },
    knight: {
        proficiencies: proficienciesFromTiers({
            three: "spear",
            two: "shield",
            one: "sword"
        }),
        startingSkills: [
            "PrecisionThrust"
        ],
        startingEquipments: {
            body: "ChainShirt",
            rightHand: "Dory",
            leftHand: "Buckler"
        }
    },
    Guardian: {
        proficiencies: proficienciesFromTiers({
            three: "shield",
            two: "hammer",
            one: "axe"
        }),
        startingSkills: [
            "ShieldUp",
            "Taunt"
        ],
        startingEquipments: {
            body: "ChainShirt",
            rightHand: "Hammer",
            leftHand: "Buckler"
        }
    },
    guardian: {
        proficiencies: proficienciesFromTiers({
            three: "shield",
            two: "hammer",
            one: "axe"
        }),
        startingSkills: [
            "ShieldUp",
            "Taunt"
        ],
        startingEquipments: {
            body: "ChainShirt",
            rightHand: "Hammer",
            leftHand: "Buckler"
        }
    },
    Paladin: {
        proficiencies: proficienciesFromTiers({
            three: "hammer",
            two: "shield",
            one: "sword"
        }),
        startingSkills: [
            "DivineStrike"
        ],
        startingEquipments: {
            body: "StuddedLeatherArmor",
            rightHand: "Hammer",
            leftHand: "Buckler"
        }
    },
    paladin: {
        proficiencies: proficienciesFromTiers({
            three: "hammer",
            two: "shield",
            one: "sword"
        }),
        startingSkills: [
            "DivineStrike"
        ],
        startingEquipments: {
            body: "StuddedLeatherArmor",
            rightHand: "Hammer",
            leftHand: "Buckler"
        }
    },
    Druid: {
        proficiencies: proficienciesFromTiers({
            three: "staff",
            two: "spear",
            one: "bow"
        }),
        startingSkills: [
            "ThrowSpear",
            "VineWhip"
        ],
        startingEquipments: {
            body: "HideArmor",
            rightHand: "Javelin",
            leftHand: null
        }
    },
    druid: {
        proficiencies: proficienciesFromTiers({
            three: "staff",
            two: "spear",
            one: "bow"
        }),
        startingSkills: [
            "ThrowSpear",
            "VineWhip"
        ],
        startingEquipments: {
            body: "HideArmor",
            rightHand: "Javelin",
            leftHand: null
        }
    },
    Monk: {
        proficiencies: proficienciesFromTiers({
            three: "bareHand",
            two: "staff",
            one: "blade"
        }),
        startingSkills: [
            "FlurryOfBlows",
            "PalmStrike",
            "Meditation"
        ],
        startingEquipments: {
            body: "Tunic",
            rightHand: null,
            leftHand: null
        }
    },
    monk: {
        proficiencies: proficienciesFromTiers({
            three: "bareHand",
            two: "staff",
            one: "blade"
        }),
        startingSkills: [
            "FlurryOfBlows",
            "PalmStrike",
            "Meditation"
        ],
        startingEquipments: {
            body: "Tunic",
            rightHand: null,
            leftHand: null
        }
    },
    Warlock: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "axe",
            one: "bow"
        }),
        startingSkills: [
            "Corruption",
            "ChaosBolt"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    warlock: {
        proficiencies: proficienciesFromTiers({
            three: "orb",
            two: "axe",
            one: "bow"
        }),
        startingSkills: [
            "Corruption",
            "ChaosBolt"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Orb",
            leftHand: null
        }
    },
    Duelist: {
        proficiencies: proficienciesFromTiers({
            three: "sword",
            two: "shield",
            one: "bow"
        }),
        startingSkills: [
            "DuelingStance"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortSword",
            leftHand: "Buckler"
        }
    },
    duelist: {
        proficiencies: proficienciesFromTiers({
            three: "sword",
            two: "shield",
            one: "bow"
        }),
        startingSkills: [
            "DuelingStance"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortSword",
            leftHand: "Buckler"
        }
    },
    Witch: {
        proficiencies: proficienciesFromTiers({
            three: "wand",
            two: "book",
            one: "dagger"
        }),
        startingSkills: [
            "PoisonDart",
            "ChaosBinding"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Wand",
            leftHand: null
        }
    },
    witch: {
        proficiencies: proficienciesFromTiers({
            three: "wand",
            two: "book",
            one: "dagger"
        }),
        startingSkills: [
            "PoisonDart",
            "ChaosBinding"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Wand",
            leftHand: null
        }
    },
    Inquisitor: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "bow",
            one: "wand"
        }),
        startingSkills: [
            "ExposeWeakness",
            "RadiantSmite"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Bible",
            leftHand: null
        }
    },
    inquisitor: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "bow",
            one: "wand"
        }),
        startingSkills: [
            "ExposeWeakness",
            "RadiantSmite"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Bible",
            leftHand: null
        }
    },
    Scholar: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "sword",
            one: "dagger"
        }),
        startingSkills: [
            "CognitiveOverload",
            "DisruptPattern"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Codex",
            leftHand: null
        }
    },
    scholar: {
        proficiencies: proficienciesFromTiers({
            three: "book",
            two: "sword",
            one: "dagger"
        }),
        startingSkills: [
            "CognitiveOverload",
            "DisruptPattern"
        ],
        startingEquipments: {
            body: "MageRobe",
            rightHand: "Codex",
            leftHand: null
        }
    },
    Engineer: {
        proficiencies: proficienciesFromTiers({
            three: "bow",
            two: "hammer",
            one: "bareHand"
        }),
        startingSkills: [
            "ExplosiveBolt",
            "BearTrap"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortBow",
            leftHand: null
        }
    },
    engineer: {
        proficiencies: proficienciesFromTiers({
            three: "bow",
            two: "hammer",
            one: "bareHand"
        }),
        startingSkills: [
            "ExplosiveBolt",
            "BearTrap"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "ShortBow",
            leftHand: null
        }
    },
    Nomad: {
        proficiencies: proficienciesFromTiers({
            three: "blade",
            two: "bow",
            one: "dagger"
        }),
        startingSkills: [
            "TacticalSlash",
            "AdaptiveStrike"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Scimitar",
            leftHand: null
        }
    },
    nomad: {
        proficiencies: proficienciesFromTiers({
            three: "blade",
            two: "bow",
            one: "dagger"
        }),
        startingSkills: [
            "TacticalSlash",
            "AdaptiveStrike"
        ],
        startingEquipments: {
            body: "LeatherArmor",
            rightHand: "Scimitar",
            leftHand: null
        }
    }
};
const BACKGROUND_STATS = {
    Retainer: {
        artisanBonuses: artisansFromTiers({
            three: "carpentry",
            two: "smithing",
            one: "cooking"
        }),
        startingItems: []
    },
    retainor: {
        artisanBonuses: artisansFromTiers({
            three: "carpentry",
            two: "smithing",
            one: "cooking"
        }),
        startingItems: []
    },
    Peasant: {
        artisanBonuses: artisansFromTiers({
            three: "agriculture",
            two: "foraging",
            one: "woodCutting"
        }),
        startingItems: []
    },
    peasant: {
        artisanBonuses: artisansFromTiers({
            three: "agriculture",
            two: "foraging",
            one: "woodCutting"
        }),
        startingItems: []
    },
    Noble: {
        artisanBonuses: artisansFromTiers({
            three: "performance",
            two: "jewelry",
            one: "weaving"
        }),
        startingItems: []
    },
    noble: {
        artisanBonuses: artisansFromTiers({
            three: "performance",
            two: "jewelry",
            one: "weaving"
        }),
        startingItems: []
    },
    Merchant: {
        artisanBonuses: artisansFromTiers({
            three: "tinkering",
            two: "jewelry",
            one: "alchemy"
        }),
        startingItems: []
    },
    merchant: {
        artisanBonuses: artisansFromTiers({
            three: "tinkering",
            two: "jewelry",
            one: "alchemy"
        }),
        startingItems: []
    },
    Adventurer: {
        artisanBonuses: artisansFromTiers({
            three: "foraging",
            two: "smithing",
            one: "skinning"
        }),
        startingItems: []
    },
    adventurer: {
        artisanBonuses: artisansFromTiers({
            three: "foraging",
            two: "smithing",
            one: "skinning"
        }),
        startingItems: []
    },
    Criminal: {
        artisanBonuses: artisansFromTiers({
            three: "tinkering",
            two: "alchemy",
            one: "skinning"
        }),
        startingItems: []
    },
    criminal: {
        artisanBonuses: artisansFromTiers({
            three: "tinkering",
            two: "alchemy",
            one: "skinning"
        }),
        startingItems: []
    },
    Hermit: {
        artisanBonuses: artisansFromTiers({
            three: "foraging",
            two: "brewing",
            one: "skinning"
        }),
        startingItems: []
    },
    hermit: {
        artisanBonuses: artisansFromTiers({
            three: "foraging",
            two: "brewing",
            one: "skinning"
        }),
        startingItems: []
    },
    FolkHero: {
        artisanBonuses: artisansFromTiers({
            three: "woodCutting",
            two: "masonry",
            one: "smithing"
        }),
        startingItems: []
    },
    folkHero: {
        artisanBonuses: artisansFromTiers({
            three: "woodCutting",
            two: "masonry",
            one: "smithing"
        }),
        startingItems: []
    },
    CityGuard: {
        artisanBonuses: artisansFromTiers({
            three: "smithing",
            two: "tanning",
            one: "alchemy"
        }),
        startingItems: []
    },
    cityGuard: {
        artisanBonuses: artisansFromTiers({
            three: "smithing",
            two: "tanning",
            one: "alchemy"
        }),
        startingItems: []
    }
};
function calculateCharacterStats(race, classValue, background) {
    // Try both original case and lowercase
    const raceData = RACE_STATS[race] || RACE_STATS[race.toLowerCase()];
    const classData = CLASS_STATS[classValue] || CLASS_STATS[classValue.toLowerCase()] || CLASS_STATS[classValue.charAt(0).toUpperCase() + classValue.slice(1).toLowerCase()];
    const backgroundKey = background.charAt(0).toUpperCase() + background.slice(1).toLowerCase();
    const backgroundData = BACKGROUND_STATS[background] || BACKGROUND_STATS[background.toLowerCase()] || BACKGROUND_STATS[backgroundKey];
    if (!raceData) {
        console.warn(`Race data not found for: ${race}`);
        return null;
    }
    if (!classData) {
        console.warn(`Class data not found for: ${classValue}, using defaults`);
        const defaultClass = {
            proficiencies: proficienciesFromTiers({}),
            startingSkills: [],
            startingEquipments: {}
        };
        return calculateStatsWithData(raceData, defaultClass, backgroundData || {
            artisanBonuses: artisansFromTiers({}),
            startingItems: []
        });
    }
    if (!backgroundData) {
        console.warn(`Background data not found for: ${background}, using defaults`);
        const defaultBackground = {
            artisanBonuses: artisansFromTiers({}),
            startingItems: []
        };
        return calculateStatsWithData(raceData, classData, defaultBackground);
    }
    return calculateStatsWithData(raceData, classData, backgroundData);
}
function calculateStatsWithData(raceData, classData, backgroundData) {
    // Calculate attributes (from race only)
    const attributes = {};
    for (const [key, value] of Object.entries(raceData.attributes)){
        attributes[key] = {
            base: value,
            bonus: 0
        };
    }
    // Calculate vitals: base from race + modifier from attributes
    const vitality = raceData.attributes.vitality || 8;
    const planar = raceData.attributes.planar || 8;
    const endurance = raceData.attributes.endurance || 8;
    const hpMod = statMod(vitality);
    const mpMod = statMod(planar);
    const spMod = statMod(endurance);
    const maxHP = Math.max(1, raceData.baseHP + Math.max(1, hpMod));
    const maxMP = Math.max(1, raceData.baseMP + Math.max(1, mpMod));
    const maxSP = Math.max(1, raceData.baseSP + Math.max(1, spMod));
    // Calculate proficiencies (from class only)
    const proficiencies = {};
    for (const [key, value] of Object.entries(classData.proficiencies)){
        proficiencies[key] = {
            base: value,
            bonus: 0
        };
    }
    // Calculate artisan skills (from background only)
    const artisans = {};
    for (const [key, value] of Object.entries(backgroundData.artisanBonuses)){
        artisans[key] = {
            base: value,
            bonus: 0
        };
    }
    // Convert startingEquipments object to array
    const startingEquipments = Object.entries(classData.startingEquipments).filter(([_, item])=>item !== null).map(([slot, item])=>({
            slot,
            item: item
        }));
    return {
        attributes,
        proficiencies,
        artisans,
        vitals: {
            maxHP,
            maxSP,
            maxMP,
            planarAptitude: raceData.planarAptitude
        },
        startingSkills: [
            ...classData.startingSkills
        ],
        startingEquipments
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/useCharacterCreationLogic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCharacterCreationLogic",
    ()=>useCharacterCreationLogic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/characterService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$characterStatsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/character-creation/characterStatsData.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Available portraits based on race and gender
const getPortraits = (race, gender)=>{
    const prefix = gender === "MALE" ? "m" : "f";
    const raceKey = race.toLowerCase();
    // Generate portrait IDs based on race and gender
    // This is a simplified version - you may want to fetch actual portraits from backend
    return [
        `${prefix}_${raceKey}01`,
        `${prefix}_${raceKey}02`,
        `${prefix}_${raceKey}03`
    ];
};
function useCharacterCreationLogic() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isLoading: false,
        isFetchingMetadata: true,
        error: null,
        nameCheckMessage: null,
        metadata: null,
        stats: null,
        formData: {
            name: "",
            gender: "MALE",
            race: "",
            portrait: "",
            class: "",
            background: ""
        },
        portraitIndex: 0
    });
    // Fetch metadata on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCharacterCreationLogic.useEffect": ()=>{
            fetchMetadata();
        }
    }["useCharacterCreationLogic.useEffect"], []);
    // Update portrait when race or gender changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCharacterCreationLogic.useEffect": ()=>{
            if (state.formData.race) {
                const portraits = getPortraits(state.formData.race, state.formData.gender);
                if (portraits.length > 0) {
                    setState({
                        "useCharacterCreationLogic.useEffect": (prev)=>({
                                ...prev,
                                formData: {
                                    ...prev.formData,
                                    portrait: portraits[prev.portraitIndex % portraits.length]
                                }
                            })
                    }["useCharacterCreationLogic.useEffect"]);
                }
            }
        }
    }["useCharacterCreationLogic.useEffect"], [
        state.formData.race,
        state.formData.gender,
        state.portraitIndex
    ]);
    // Calculate stats locally when race, class, or background changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCharacterCreationLogic.useEffect": ()=>{
            if (state.formData.race && state.formData.class && state.formData.background) {
                const calculatedStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$characterStatsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCharacterStats"])(state.formData.race, state.formData.class, state.formData.background);
                setState({
                    "useCharacterCreationLogic.useEffect": (prev)=>({
                            ...prev,
                            stats: calculatedStats
                        })
                }["useCharacterCreationLogic.useEffect"]);
            } else {
                setState({
                    "useCharacterCreationLogic.useEffect": (prev)=>({
                            ...prev,
                            stats: null
                        })
                }["useCharacterCreationLogic.useEffect"]);
            }
        }
    }["useCharacterCreationLogic.useEffect"], [
        state.formData.race,
        state.formData.class,
        state.formData.background
    ]);
    // Fetch available races, classes, and backgrounds
    const fetchMetadata = async ()=>{
        setState((prev)=>({
                ...prev,
                isFetchingMetadata: true
            }));
        try {
            // Fetch metadata from backend API using characterService
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterService"].getMetadata();
            if (!data.success || !data.races || !data.classes || !data.backgrounds) {
                throw new Error("Invalid metadata response");
            }
            const metadata = {
                races: data.races,
                classes: data.classes,
                backgrounds: data.backgrounds
            };
            setState((prev)=>({
                    ...prev,
                    metadata,
                    isFetchingMetadata: false,
                    // Set defaults once metadata is loaded
                    formData: prev.formData.race ? prev.formData : {
                        ...prev.formData,
                        race: metadata.races[0]?.id || "",
                        class: metadata.classes[0]?.id || "",
                        background: metadata.backgrounds[0]?.id || "",
                        portrait: getPortraits(metadata.races[0]?.id || "", prev.formData.gender)[0] || ""
                    }
                }));
        } catch (error) {
            console.error("Failed to fetch character metadata:", error);
            setState((prev)=>({
                    ...prev,
                    isFetchingMetadata: false,
                    error: "Failed to load character creation options"
                }));
        }
    };
    // Update form field
    const updateField = (field, value)=>{
        setState((prev)=>({
                ...prev,
                formData: {
                    ...prev.formData,
                    [field]: value
                },
                // Clear errors when user modifies form
                error: null,
                nameCheckMessage: null
            }));
    };
    // Update portrait index
    const updatePortraitIndex = (direction)=>{
        setState((prev)=>{
            if (!prev.formData.race) return prev;
            const portraits = getPortraits(prev.formData.race, prev.formData.gender);
            if (portraits.length === 0) return prev;
            let newIndex;
            if (direction === "prev") {
                newIndex = prev.portraitIndex > 0 ? prev.portraitIndex - 1 : portraits.length - 1;
            } else {
                newIndex = prev.portraitIndex < portraits.length - 1 ? prev.portraitIndex + 1 : 0;
            }
            return {
                ...prev,
                portraitIndex: newIndex,
                formData: {
                    ...prev.formData,
                    portrait: portraits[newIndex]
                }
            };
        });
    };
    // Validate form
    const validateForm = ()=>{
        const { name, race, class: classValue, background } = state.formData;
        if (!name.trim()) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameRequired
                }));
            return false;
        }
        if (!/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(name)) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameInvalidFormat
                }));
            return false;
        }
        if (name.length > 20) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMaxLength
                }));
            return false;
        }
        if (name.trim().length < 3) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMinLength
                }));
            return false;
        }
        if (!race || !classValue || !background) {
            setState((prev)=>({
                    ...prev,
                    error: "Please select race, class, and background"
                }));
            return false;
        }
        return true;
    };
    // Create character
    const createCharacter = async ()=>{
        if (!validateForm()) {
            return false;
        }
        setState((prev)=>({
                ...prev,
                isLoading: true,
                error: null,
                nameCheckMessage: null
            }));
        try {
            const requestData = {
                name: state.formData.name.trim(),
                gender: state.formData.gender,
                race: state.formData.race,
                portrait: state.formData.portrait,
                background: state.formData.background,
                startingClass: state.formData.class
            };
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterService"].createCharacter(requestData);
            if (response.success) {
                return true;
            } else {
                // Check if it's a name-related error
                if (response.messageKey === "character.nameTaken" || response.message?.toLowerCase().includes("name") || response.message?.toLowerCase().includes("taken")) {
                    setState((prev)=>({
                            ...prev,
                            nameCheckMessage: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTaken,
                            isLoading: false
                        }));
                } else {
                    setState((prev)=>({
                            ...prev,
                            error: response.message || __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creationFailed,
                            isLoading: false
                        }));
                }
                return false;
            }
        } catch (error) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creationFailed,
                    isLoading: false
                }));
            return false;
        }
    };
    // Check if form is valid
    const isFormValid = ()=>{
        const { name, race, class: classValue, background } = state.formData;
        return name.trim().length >= 3 && name.trim().length <= 20 && /^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(name) && !!race && !!classValue && !!background;
    };
    // Get available portraits for current race/gender
    const getAvailablePortraits = ()=>{
        if (!state.formData.race) return [];
        return getPortraits(state.formData.race, state.formData.gender);
    };
    return {
        ...state,
        updateField,
        updatePortraitIndex,
        createCharacter,
        isFormValid,
        getAvailablePortraits
    };
}
_s(useCharacterCreationLogic, "NV8Ot3ACkiSr5/1LyuCvniA1AIU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarbarianSkillId",
    ()=>BarbarianSkillId,
    "BasicSkillId",
    ()=>BasicSkillId,
    "ClericSkillId",
    ()=>ClericSkillId,
    "DruidSkillId",
    ()=>DruidSkillId,
    "DuelistSkillId",
    ()=>DuelistSkillId,
    "EngineerSkillId",
    ()=>EngineerSkillId,
    "GuardianSkillId",
    ()=>GuardianSkillId,
    "InquisitorSkillId",
    ()=>InquisitorSkillId,
    "KnightSkillId",
    ()=>KnightSkillId,
    "MageSkillId",
    ()=>MageSkillId,
    "MobSkillId",
    ()=>MobSkillId,
    "MonkSkillId",
    ()=>MonkSkillId,
    "MysticSkillId",
    ()=>MysticSkillId,
    "NomadSkillId",
    ()=>NomadSkillId,
    "PaladinSkillId",
    ()=>PaladinSkillId,
    "RogueSkillId",
    ()=>RogueSkillId,
    "ScholarSkillId",
    ()=>ScholarSkillId,
    "SeerSkillId",
    ()=>SeerSkillId,
    "ShamanSkillId",
    ()=>ShamanSkillId,
    "SpellBladeSkillId",
    ()=>SpellBladeSkillId,
    "WarlockSkillId",
    ()=>WarlockSkillId,
    "WarriorSkillId",
    ()=>WarriorSkillId,
    "WitchSkillId",
    ()=>WitchSkillId
]);
var BasicSkillId = /*#__PURE__*/ function(BasicSkillId) {
    BasicSkillId["Basic"] = "Basic";
    return BasicSkillId;
}({});
var MobSkillId = /*#__PURE__*/ function(MobSkillId) {
    MobSkillId["WorksYouMaggots"] = "WorksYouMaggots";
    MobSkillId["CommanderScream"] = "CommanderScream";
    MobSkillId["Whip"] = "Whip";
    MobSkillId["ThrowPebble"] = "ThrowPebble";
    MobSkillId["PanicSlash"] = "PanicSlash";
    MobSkillId["Shriek"] = "Shriek";
    return MobSkillId;
}({});
var ClericSkillId = /*#__PURE__*/ function(ClericSkillId) {
    ClericSkillId["Heal"] = "Heal";
    ClericSkillId["MassHeal"] = "MassHeal";
    // Revive = "Revive", // Bring fallen ally back with 25% HP
    ClericSkillId["Radiance"] = "Radiance";
    ClericSkillId["Bless"] = "Bless";
    ClericSkillId["TurnUndead"] = "TurnUndead";
    return ClericSkillId;
}({});
var SeerSkillId = /*#__PURE__*/ function(SeerSkillId) {
    SeerSkillId["Precognition"] = "Precognition";
    // Rare
    SeerSkillId["ThreadSnip"] = "ThreadSnip";
    SeerSkillId["PlanarEcho"] = "PlanarEcho";
    // Epic
    SeerSkillId["FateBind"] = "FateBind";
    // Legendary
    SeerSkillId["PrescientStrike"] = "PrescientStrike";
    // Unique
    SeerSkillId["TemporalShift"] = "TemporalShift";
    return SeerSkillId;
}({});
var ScholarSkillId = /*#__PURE__*/ function(ScholarSkillId) {
    ScholarSkillId["CognitiveOverload"] = "CognitiveOverload";
    ScholarSkillId["DisruptPattern"] = "DisruptPattern";
    return ScholarSkillId;
}({});
var MageSkillId = /*#__PURE__*/ function(MageSkillId) {
    MageSkillId["ArcaneShield"] = "ArcaneShield";
    MageSkillId["ArcaneBolt"] = "ArcaneBolt";
    MageSkillId["MagicMissile"] = "MagicMissile";
    MageSkillId["Fireball"] = "Fireball";
    MageSkillId["IceBolt"] = "IceBolt";
    MageSkillId["LightningBolt"] = "LightningBolt";
    return MageSkillId;
}({});
var MysticSkillId = /*#__PURE__*/ function(MysticSkillId) {
    MysticSkillId["InnerVeil"] = "InnerVeil";
    MysticSkillId["MistStep"] = "MistStep";
    MysticSkillId["ShadowCloak"] = "ShadowCloak";
    MysticSkillId["MindTrick"] = "MindTrick";
    return MysticSkillId;
}({});
var RogueSkillId = /*#__PURE__*/ function(RogueSkillId) {
    RogueSkillId["BleedingCut"] = "BleedingCut";
    RogueSkillId["ThrowingKnives"] = "ThrowingKnives";
    RogueSkillId["Backstab"] = "Backstab";
    RogueSkillId["PoisonDart"] = "PoisonDart";
    return RogueSkillId;
}({});
var SpellBladeSkillId = /*#__PURE__*/ function(SpellBladeSkillId) {
    SpellBladeSkillId["WindSlash"] = "WindSlash";
    SpellBladeSkillId["PlanarEdge"] = "PlanarEdge";
    SpellBladeSkillId["ArcaneSlash"] = "ArcaneSlash";
    return SpellBladeSkillId;
}({});
var ShamanSkillId = /*#__PURE__*/ function(ShamanSkillId) {
    ShamanSkillId["HexOfRot"] = "HexOfRot";
    ShamanSkillId["MendSpirit"] = "MendSpirit";
    ShamanSkillId["HolyRattle"] = "HolyRattle";
    ShamanSkillId["SpiritBolt"] = "SpiritBolt";
    return ShamanSkillId;
}({});
var BarbarianSkillId = /*#__PURE__*/ function(BarbarianSkillId) {
    BarbarianSkillId["Earthshatter"] = "Earthshatter";
    BarbarianSkillId["Rage"] = "Rage";
    BarbarianSkillId["RecklessSwing"] = "RecklessSwing";
    BarbarianSkillId["Cleave"] = "Cleave";
    return BarbarianSkillId;
}({});
var WarriorSkillId = /*#__PURE__*/ function(WarriorSkillId) {
    WarriorSkillId["WarCry"] = "WarCry";
    WarriorSkillId["PowerStrike"] = "PowerStrike";
    WarriorSkillId["Charge"] = "Charge";
    return WarriorSkillId;
}({});
var KnightSkillId = /*#__PURE__*/ function(KnightSkillId) {
    KnightSkillId["PrecisionThrust"] = "PrecisionThrust";
    KnightSkillId["ShieldBash"] = "ShieldBash";
    return KnightSkillId;
}({});
var GuardianSkillId = /*#__PURE__*/ function(GuardianSkillId) {
    GuardianSkillId["ShieldUp"] = "ShieldUp";
    GuardianSkillId["Taunt"] = "Taunt";
    return GuardianSkillId;
}({});
var PaladinSkillId = /*#__PURE__*/ function(PaladinSkillId) {
    PaladinSkillId["DivineStrike"] = "DivineStrike";
    PaladinSkillId["Smite"] = "Smite";
    return PaladinSkillId;
}({});
var DruidSkillId = /*#__PURE__*/ function(DruidSkillId) {
    DruidSkillId["RejuvenatingMist"] = "RejuvenatingMist";
    DruidSkillId["ThrowSpear"] = "ThrowSpear";
    DruidSkillId["VineWhip"] = "VineWhip";
    DruidSkillId["WildShape"] = "WildShape";
    return DruidSkillId;
}({});
var MonkSkillId = /*#__PURE__*/ function(MonkSkillId) {
    MonkSkillId["FlurryOfBlows"] = "FlurryOfBlows";
    MonkSkillId["PalmStrike"] = "PalmStrike";
    MonkSkillId["Meditation"] = "Meditation";
    return MonkSkillId;
}({});
var WarlockSkillId = /*#__PURE__*/ function(WarlockSkillId) {
    WarlockSkillId["Corruption"] = "Corruption";
    WarlockSkillId["ChaosBolt"] = "ChaosBolt";
    WarlockSkillId["DarkBolt"] = "DarkBolt";
    return WarlockSkillId;
}({});
var DuelistSkillId = /*#__PURE__*/ function(DuelistSkillId) {
    DuelistSkillId["DuelingStance"] = "DuelingStance";
    DuelistSkillId["PrecisionStrike"] = "PrecisionStrike";
    return DuelistSkillId;
}({});
var WitchSkillId = /*#__PURE__*/ function(WitchSkillId) {
    WitchSkillId["PoisonDart"] = "PoisonDart";
    WitchSkillId["ChaosBinding"] = "ChaosBinding";
    WitchSkillId["Bewitch"] = "Bewitch";
    return WitchSkillId;
}({});
var InquisitorSkillId = /*#__PURE__*/ function(InquisitorSkillId) {
    InquisitorSkillId["ExposeWeakness"] = "ExposeWeakness";
    InquisitorSkillId["RadiantSmite"] = "RadiantSmite";
    return InquisitorSkillId;
}({});
var EngineerSkillId = /*#__PURE__*/ function(EngineerSkillId) {
    EngineerSkillId["ExplosiveBolt"] = "ExplosiveBolt";
    EngineerSkillId["BearTrap"] = "BearTrap";
    return EngineerSkillId;
}({});
var NomadSkillId = /*#__PURE__*/ function(NomadSkillId) {
    NomadSkillId["TacticalSlash"] = "TacticalSlash";
    NomadSkillId["AdaptiveStrike"] = "AdaptiveStrike";
    return NomadSkillId;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/L10N/skills.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auto-generated file - do not edit manually
// Generated by: bun run scripts/extract-l10n.ts
__turbopack_context__.s([
    "skillsL10N",
    ()=>skillsL10N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-client] (ecmascript)");
;
const skillsL10N = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarbarianSkillId"].Earthshatter]: {
        name: {
            en: "Earthshatter",
            th: "สั่นสะเทือนพิภพ"
        },
        description: {
            en: "Slam the ground with your weapon, sending a shock wave to the enemy line dealing damage all enemy in a line. \nDeals <FORMULA> blunt damage to each target. \nEach target [r]rolls DC8 ENDsave or becomes <DebuffDazed> for 1 turn.[/r]",
            th: "กระแทกพื้นด้วยอาวุธอย่างรุนแรง ส่งคลื่นสั่นสะเทือนใส่ศัตรูแถวหน้า \nสร้างความเสียหาย <FORMULA> ให้ศัตรูแถวหน้าทุกคน \nเป้าหมายแต่ละคนทอย [r]DC8 ENDsave ไม่ผ่านจะติด <DebuffDazed> 1 เทิร์น[/r]"
        },
        formula: "({5}'1d10':'1d8'{/} + <STRmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarbarianSkillId"].Rage]: {
        name: {
            en: "Rage",
            th: "บ้าคลั่ง"
        },
        description: {
            en: "Roar fiercefully and enter the <BuffRage> state for {5}'4':'3'{/} turns.",
            th: "เข้าสู่สถานะ <BuffRage> เป็นเวลา {5}'4':'3'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarbarianSkillId"].RecklessSwing]: {
        name: {
            en: "Reckless Swing",
            th: "ฟาดไม่ยั้ง"
        },
        description: {
            en: "Swing your weapon recklessly attacking targeted enemy {5}'three':'two'{/} times, \neach dealing <FORMULA>. {5}\n :Hit roll suffer [r]-2[/r] penalty.{/}",
            th: "เหวี่ยงอาวุธฟาดไม่ยั้งใส่เป้าหมาย โจมตีต่อเนื่อง {5}'3':'2'{/} ครั้ง \nแต่ละครั้งสร้างความเสียหาย <FORMULA> ความแม่นยำในการโจมตีลดลง [r]2[/r]"
        },
        formula: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasicSkillId"].Basic]: {
        name: {
            en: "Basic Attack",
            th: "โจมตีปกติ"
        },
        description: {
            en: "A basic attack, dealing damage equal to weapon's damage (+ modifier)",
            th: "การโจมตีปกติ สร้างความเสียหายเท่ากับความเสียหายจากอาวุธ (+ modifier)"
        },
        formula: "(Weapon damage + attribute modifier) × (1.0 + 0.1 per 2 character levels, max 1.5 at level 10)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClericSkillId"].Bless]: {
        name: {
            en: "Bless",
            th: "อวยพร"
        },
        description: {
            en: "Ask for the Blessing from Laoh, <BuffBlessing> all ally for 2 turns. \n{5}\nThe user [b]throw DC10 + <WILmod>, if success, gain +1 order.[/b]{/}",
            th: "อธิษฐานขอการอวยพรจากลาโอห์ เพื่อนร่วมทีมทั้งหมดได้รับสถานะ '<BuffBlessing>' 2 เทิร์น \n{5}\nหลังจากใช้ ทอย [b]DC10 + <WILmod>[/b] หากผ่านจะได้รับ +1 order{/}"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClericSkillId"].Heal]: {
        name: {
            en: "Heal",
            th: "รักษา"
        },
        description: {
            en: "Cast a healing spell, restore HP to an ally with least HP percentage. \nHeals for <FORMULA>. \n{3}\nThen [b]removes one random debuff[/b] from the target.{/}",
            th: "ร่ายเวทย์มนต์รักษา ฟื้นฟู HP ให้กับพันธมิตร \nรักษา <FORMULA> \n{3}\nจากนั้น[b]ลบหนึ่งดีบัฟแบบสุ่ม[/b]จากเป้าหมายด้วย{/}"
        },
        formula: "1d6 + <WILmod> + skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClericSkillId"].MassHeal]: {
        name: {
            en: "Mass Heal",
            th: "รักษาหมู่"
        },
        description: {
            en: "Cast a mass healing spell, restore all living allies. \nHeals for <FORMULA>. \n{4}\nThen [b]removes one random debuff[/b] from each healed ally.{/}",
            th: "ร่ายเวทย์มนต์รักษาหมู่ ฟื้นฟูเพื่อนร่วมทีมทุกคนที่ยังมีชีวิต \nรักษา <FORMULA> \n{4}\nจากนั้น[b]ลบหนึ่งดีบัฟแบบสุ่ม[/b]จากพันธมิตรที่ได้รับการรักษาแต่ละคน{/}"
        },
        formula: "1d6 + (<WILmod> + <CHAmod>) / 2 + skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClericSkillId"].Radiance]: {
        name: {
            en: "Radiance",
            th: "รัศมีศักดิ์สิทธิ์"
        },
        description: {
            en: "Unleash a flash of consecrated light dealing <FORMULA>. \nDeal additional [b]{5}'1d4 + 2':'1d4'{/}[/b] if the target is undead or fiend.",
            th: "ปล่อยแสงศักดิ์สิทธิ์ สร้างความเสียหาย <FORMULA> \nสร้างความเสียหายเพิ่มเติม [b]{5}'1d4 + 2':'1d4'{/}[/b] หากเป้าหมายเป็น undead หรือ fiend"
        },
        formula: "(1d6 + <WILmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClericSkillId"].TurnUndead]: {
        name: {
            en: "Turn Undead",
            th: "ขับไล่ผี"
        },
        description: {
            en: "Cast a holy spell to destroy undead. \nDeal <FORMULA> true holy damage to non-undead targets. \nAgainst undead, target makes a [r](DC {5}'12':'10'{/}) WILsave roll[/r]. \nIf it failed to save, take 9999 true damage (instant kill). \nElse take [b]1d12 + <WILmod>[/b] holy damage.",
            th: "ร่ายเวทย์มนต์ศักดิ์สิทธิ์เพื่อทำลาย undead \nสร้างความเสียหายจริง <FORMULA> ต่อเป้าหมายที่ไม่ใช่ undead \nหากเป้าหมายเป็น undead เป้าหมายจะต้องทอย [r](DC {5}'12':'10'{/}) WILsave[/r] \nหากล้มเหลว สร้างความเสียหายจริง 9999 (ฆ่าทันที) \nหากสำเร็จ สร้างความเสียหายศักดิ์สิทธิ์ [b]1d12 + <WILmod>[/b]"
        },
        formula: "1d4 + <WILmod>"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CharacterCreationView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Divider/Divider.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/ArrowBack.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateBefore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NavigateBefore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateNext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NavigateNext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PersonAdd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$useCharacterCreationLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/character-creation/useCharacterCreationLogic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skills$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skills.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
// Helper function to get skill L10N by mapping skill name + class to enum value
function getSkillL10N(skillId, classValue, language = "en") {
    try {
        // Map class name to enum type
        const classEnumMap = {
            Cleric: "ClericSkillId",
            Seer: "SeerSkillId",
            Mage: "MageSkillId",
            Mystic: "MysticSkillId",
            Rogue: "RogueSkillId",
            SpellBlade: "SpellBladeSkillId",
            Shaman: "ShamanSkillId",
            Barbarian: "BarbarianSkillId",
            Warrior: "WarriorSkillId",
            Knight: "KnightSkillId",
            Guardian: "GuardianSkillId",
            Paladin: "PaladinSkillId",
            Druid: "DruidSkillId",
            Monk: "MonkSkillId",
            Warlock: "WarlockSkillId",
            Duelist: "DuelistSkillId",
            Witch: "WitchSkillId",
            Inquisitor: "InquisitorSkillId",
            Scholar: "ScholarSkillId",
            Engineer: "EngineerSkillId",
            Nomad: "NomadSkillId"
        };
        const normalizedClass = classValue.charAt(0).toUpperCase() + classValue.slice(1);
        const enumTypeName = classEnumMap[classValue] || classEnumMap[normalizedClass];
        if (!enumTypeName) {
            return null;
        }
        // Get the enum type object (e.g., ClericSkillId enum)
        const enumType = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[enumTypeName];
        if (!enumType) {
            return null;
        }
        // Get the enum value (e.g., ClericSkillId.Radiance = "Radiance")
        const enumValue = enumType[skillId];
        if (!enumValue) {
            return null;
        }
        // Access skillsL10N using the enum value as key
        // The Record uses enum values as keys, which are strings at runtime
        const skillData = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skills$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skillsL10N"][enumValue];
        if (!skillData) {
            return null;
        }
        return {
            name: skillData.name?.[language] || skillData.name?.en || skillId,
            description: skillData.description?.[language] || skillData.description?.en || "",
            formula: skillData.formula
        };
    } catch (error) {
        // L10N files not available yet or import failed
        return null;
    }
}
const CharacterCreationContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        minHeight: "100vh",
        background: `var(--gradient-mystical)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    }));
_c = CharacterCreationContainer;
const CharacterCreationPaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        maxWidth: "800px",
        width: "90vw",
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        boxShadow: `var(--shadow-mystical)`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
    }));
_c1 = CharacterCreationPaper;
const TitleBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        textAlign: "center",
        marginBottom: theme.spacing(4)
    }));
_c2 = TitleBox;
const FormSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        marginBottom: theme.spacing(3)
    }));
_c3 = FormSection;
const SectionTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        marginBottom: theme.spacing(2),
        fontWeight: 600,
        color: theme.palette.primary.main
    }));
_c4 = SectionTitle;
const GenderToggleBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }));
_c5 = GenderToggleBox;
const GenderButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"])(({ theme, active })=>({
        flex: 1,
        padding: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
        color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
        "&:hover": {
            backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200]
        }
    }));
_c6 = GenderButton;
const PortraitBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }));
_c7 = PortraitBox;
const PortraitPlaceholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        width: 120,
        height: 120,
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${theme.palette.grey[300]}`,
        fontSize: "0.875rem",
        color: theme.palette.grey[600]
    }));
_c8 = PortraitPlaceholder;
const DescriptionBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[50],
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(1),
        minHeight: 60,
        display: "flex",
        alignItems: "center"
    }));
_c9 = DescriptionBox;
const ActionButtons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        gap: theme.spacing(2),
        marginTop: theme.spacing(4),
        justifyContent: "space-between"
    }));
_c10 = ActionButtons;
// Helper function to get localized name with fallback
const getLocalizedRaceName = (t, raceId)=>{
    const raceKey = raceId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.races[raceKey]?.name || {
            en: raceId,
            th: raceId
        });
    } catch  {
        return raceId;
    }
};
const getLocalizedRaceDescription = (t, raceId)=>{
    const raceKey = raceId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.races[raceKey]?.description || {
            en: `A ${raceId} character`,
            th: `ตัวละคร${raceId}`
        });
    } catch  {
        return `A ${raceId} character`;
    }
};
const getLocalizedClassName = (t, classId)=>{
    const classKey = classId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.classes[classKey]?.name || {
            en: classId,
            th: classId
        });
    } catch  {
        return classId;
    }
};
const getLocalizedClassDescription = (t, classId)=>{
    const classKey = classId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.classes[classKey]?.description || {
            en: `A ${classId} class`,
            th: `อาชีพ${classId}`
        });
    } catch  {
        return `A ${classId} class`;
    }
};
const getLocalizedBackgroundName = (t, backgroundId)=>{
    // Map "retainor" to "noble" for L10N
    const backgroundKey = backgroundId === "retainor" ? "noble" : backgroundId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.backgrounds[backgroundKey]?.name || {
            en: backgroundId,
            th: backgroundId
        });
    } catch  {
        return backgroundId;
    }
};
const getLocalizedBackgroundDescription = (t, backgroundId)=>{
    const backgroundKey = backgroundId === "retainor" ? "noble" : backgroundId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].character.backgrounds[backgroundKey]?.description || {
            en: `A ${backgroundId} background`,
            th: `ภูมิหลัง${backgroundId}`
        });
    } catch  {
        return `A ${backgroundId} background`;
    }
};
function CharacterCreationView() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalization"])();
    const { isLoading, isFetchingMetadata, error, nameCheckMessage, metadata, stats, formData, portraitIndex, updateField, updatePortraitIndex, createCharacter, isFormValid, getAvailablePortraits } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$useCharacterCreationLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacterCreationLogic"])();
    const handleCreateCharacter = async ()=>{
        const success = await createCharacter();
        if (success) {
            router.push("/game");
        }
    };
    const handleBackToTitle = ()=>{
        router.push("/login");
    };
    const handleKeyPress = (event)=>{
        if (event.key === "Enter" && isFormValid() && !isLoading) {
            handleCreateCharacter();
        }
    };
    // No need for calculateCharacterStats - stats come from the hook now
    if (isFetchingMetadata) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    p: 4,
                    textAlign: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            mt: 2
                        },
                        children: "Loading character creation options..."
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 285,
            columnNumber: 7
        }, this);
    }
    if (!metadata) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    p: 4,
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    severity: "error",
                    children: "Failed to load character creation options. Please refresh the page."
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 298,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 296,
            columnNumber: 7
        }, this);
    }
    const availablePortraits = getAvailablePortraits();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: 'flex',
                gap: 3,
                width: '100%',
                maxWidth: '1400px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationPaper, {
                    elevation: 8,
                    sx: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleBox, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h3",
                                component: "h1",
                                gutterBottom: true,
                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.title)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                                variant: "h6",
                                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.name)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                fullWidth: true,
                                                variant: "outlined",
                                                placeholder: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.namePlaceholder),
                                                value: formData.name,
                                                onChange: (e)=>updateField("name", e.target.value),
                                                onKeyPress: handleKeyPress,
                                                inputProps: {
                                                    maxLength: 20
                                                },
                                                error: formData.name.length > 20 || formData.name.length > 0 && formData.name.length < 3,
                                                helperText: formData.name.length > 20 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTooLong) : formData.name.length > 0 && formData.name.length < 3 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMinLength) : formData.name.length > 0 && !/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(formData.name) ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameInvalidChars) : formData.name.length === 0 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTooShort) : ""
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            nameCheckMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: nameCheckMessage.includes("available") ? "success.main" : "error.main",
                                                sx: {
                                                    mt: 1,
                                                    display: "block"
                                                },
                                                children: nameCheckMessage
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                                variant: "h6",
                                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.portrait)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PortraitBox, {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                        onClick: ()=>updatePortraitIndex("prev"),
                                                        disabled: isLoading || availablePortraits.length === 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateBefore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PortraitPlaceholder, {
                                                        children: formData.portrait || "No portrait"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                        onClick: ()=>updatePortraitIndex("next"),
                                                        disabled: isLoading || availablePortraits.length === 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateNext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.gender)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderToggleBox, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderButton, {
                                            active: formData.gender === "MALE",
                                            onClick: ()=>updateField("gender", "MALE"),
                                            disabled: isLoading,
                                            children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.male)
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 382,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderButton, {
                                            active: formData.gender === "FEMALE",
                                            onClick: ()=>updateField("gender", "FEMALE"),
                                            disabled: isLoading,
                                            children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.female)
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 389,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.race)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.races.map((race)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedRaceName(t, race.id),
                                            onClick: ()=>updateField("race", race.id),
                                            color: formData.race === race.id ? "primary" : "default",
                                            variant: formData.race === race.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, race.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 404,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this),
                                formData.race && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedRaceDescription(t, formData.race)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.class)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.classes.map((classItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedClassName(t, classItem.id),
                                            onClick: ()=>updateField("class", classItem.id),
                                            color: formData.class === classItem.id ? "primary" : "default",
                                            variant: formData.class === classItem.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, classItem.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 428,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                formData.class && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedClassDescription(t, formData.class)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 440,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 439,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 424,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.background)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.backgrounds.map((background)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedBackgroundName(t, background.id),
                                            onClick: ()=>updateField("background", background.id),
                                            color: formData.background === background.id ? "primary" : "default",
                                            variant: formData.background === background.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, background.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 452,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                formData.background && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedBackgroundDescription(t, formData.background)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 464,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            severity: "error",
                            sx: {
                                mb: 2
                            },
                            children: typeof error === "string" ? error : t(error)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 473,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionButtons, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "outlined",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 482,
                                        columnNumber: 26
                                    }, void 0),
                                    onClick: handleBackToTitle,
                                    disabled: isLoading,
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.backToTitle)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 480,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "contained",
                                    size: "large",
                                    onClick: handleCreateCharacter,
                                    disabled: !isFormValid() || isLoading,
                                    startIcon: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                        size: 20,
                                        color: "inherit"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 493,
                                        columnNumber: 38
                                    }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 493,
                                        columnNumber: 87
                                    }, void 0),
                                    children: isLoading ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creating) : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L10N"].characterCreation.createCharacter)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 488,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 479,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                    elevation: 8,
                    sx: {
                        width: '400px',
                        maxHeight: '95vh',
                        overflow: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                gutterBottom: true,
                                sx: {
                                    color: 'primary.main',
                                    fontWeight: 'bold'
                                },
                                children: "Character Stats"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                sx: {
                                    mb: 3
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this),
                            stats && formData.race && formData.class && formData.background ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Vitals"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "HP: ",
                                                            stats.vitals.maxHP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "SP: ",
                                                            stats.vitals.maxSP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "MP: ",
                                                            stats.vitals.maxMP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "Planar Aptitude: ",
                                                            stats.vitals.planarAptitude
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 513,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 511,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 521,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Attributes"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 525,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.attributes).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base,
                                                            value.bonus !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: value.bonus > 0 ? 'green' : 'red'
                                                                },
                                                                children: value.bonus > 0 ? ` +${value.bonus}` : ` ${value.bonus}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 526,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 524,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 540,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Proficiencies"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.proficiencies).filter(([_, value])=>value.base > 8) // Only show proficiencies > 8
                                                .map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 545,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 543,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 556,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Artisan Skills"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 560,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.artisans).filter(([_, value])=>value.base > 8) // Only show artisan skills > 8
                                                .map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 561,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 559,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 572,
                                        columnNumber: 17
                                    }, this),
                                    stats.startingSkills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    mb: 3
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle1",
                                                        sx: {
                                                            fontWeight: 'bold',
                                                            mb: 1
                                                        },
                                                        children: "Starting Skills"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1.5
                                                        },
                                                        children: stats.startingSkills.map((skillId)=>{
                                                            const skillL10N = getSkillL10N(skillId, formData.class, language || "en");
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            fontWeight: 'medium'
                                                                        },
                                                                        children: skillL10N?.name || skillId
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                        lineNumber: 584,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    skillL10N?.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        color: "text.secondary",
                                                                        sx: {
                                                                            fontStyle: 'italic',
                                                                            display: 'block',
                                                                            mt: 0.5,
                                                                            whiteSpace: 'pre-line'
                                                                        },
                                                                        children: skillL10N.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 33
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        color: "text.secondary",
                                                                        sx: {
                                                                            fontStyle: 'italic',
                                                                            display: 'block',
                                                                            mt: 0.5
                                                                        },
                                                                        children: "Skill description not available"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                        lineNumber: 592,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, skillId, true, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 577,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 2
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 601,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    stats.startingEquipments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Starting Equipment"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 608,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1
                                                },
                                                children: stats.startingEquipments.map((equip, index)=>{
                                                    // Format slot name for display
                                                    const slotName = equip.slot.replace(/([A-Z])/g, ' $1').replace(/^./, (str)=>str.toUpperCase()).trim();
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "body2",
                                                                sx: {
                                                                    fontWeight: 'medium'
                                                                },
                                                                children: [
                                                                    slotName,
                                                                    ": ",
                                                                    equip.item
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 618,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                color: "text.secondary",
                                                                sx: {
                                                                    fontStyle: 'italic'
                                                                },
                                                                children: "Equipment description not available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, `${equip.slot}-${index}`, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 609,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 607,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 509,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: "Select race, class, and background to see stats preview."
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 633,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 501,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 308,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(CharacterCreationView, "EuuBdJd+V1uR4qcu0y0frwwv5RM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalization"],
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$useCharacterCreationLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacterCreationLogic"]
    ];
});
_c11 = CharacterCreationView;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "CharacterCreationContainer");
__turbopack_context__.k.register(_c1, "CharacterCreationPaper");
__turbopack_context__.k.register(_c2, "TitleBox");
__turbopack_context__.k.register(_c3, "FormSection");
__turbopack_context__.k.register(_c4, "SectionTitle");
__turbopack_context__.k.register(_c5, "GenderToggleBox");
__turbopack_context__.k.register(_c6, "GenderButton");
__turbopack_context__.k.register(_c7, "PortraitBox");
__turbopack_context__.k.register(_c8, "PortraitPlaceholder");
__turbopack_context__.k.register(_c9, "DescriptionBox");
__turbopack_context__.k.register(_c10, "ActionButtons");
__turbopack_context__.k.register(_c11, "CharacterCreationView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=workspace_MyProject_Client_webapp_1b02be5b._.js.map