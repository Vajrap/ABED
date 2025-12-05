module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/workspace/MyProject/Client/webapp/src/services/characterService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// CharacterService.ts - Service for character-related API calls
__turbopack_context__.s([
    "characterService",
    ()=>characterService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-ssr] (ecmascript)");
;
class CharacterService {
    async createCharacter(characterData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/create", characterData, true);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/getUserCharacter", null, true);
        return response;
    }
    async checkCharacterName(name) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/checkName", {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/character/setActive", {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].get("/api/character/metadata", false);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].get(`/api/character/preview?race=${encodeURIComponent(race)}&class=${encodeURIComponent(classValue)}&background=${encodeURIComponent(background)}`, false);
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
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/characterStatsData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/useCharacterCreationLogic.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCharacterCreationLogic",
    ()=>useCharacterCreationLogic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/characterService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$characterStatsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/character-creation/characterStatsData.ts [app-ssr] (ecmascript)");
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
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchMetadata();
    }, []);
    // Update portrait when race or gender changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (state.formData.race) {
            const portraits = getPortraits(state.formData.race, state.formData.gender);
            if (portraits.length > 0) {
                setState((prev)=>({
                        ...prev,
                        formData: {
                            ...prev.formData,
                            portrait: portraits[prev.portraitIndex % portraits.length]
                        }
                    }));
            }
        }
    }, [
        state.formData.race,
        state.formData.gender,
        state.portraitIndex
    ]);
    // Calculate stats locally when race, class, or background changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (state.formData.race && state.formData.class && state.formData.background) {
            const calculatedStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$characterStatsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateCharacterStats"])(state.formData.race, state.formData.class, state.formData.background);
            setState((prev)=>({
                    ...prev,
                    stats: calculatedStats
                }));
        } else {
            setState((prev)=>({
                    ...prev,
                    stats: null
                }));
        }
    }, [
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
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterService"].getMetadata();
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
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameRequired
                }));
            return false;
        }
        if (!/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(name)) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameInvalidFormat
                }));
            return false;
        }
        if (name.length > 20) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMaxLength
                }));
            return false;
        }
        if (name.trim().length < 3) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMinLength
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterService"].createCharacter(requestData);
            if (response.success) {
                return true;
            } else {
                // Check if it's a name-related error
                if (response.messageKey === "character.nameTaken" || response.message?.toLowerCase().includes("name") || response.message?.toLowerCase().includes("taken")) {
                    setState((prev)=>({
                            ...prev,
                            nameCheckMessage: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTaken,
                            isLoading: false
                        }));
                } else {
                    setState((prev)=>({
                            ...prev,
                            error: response.message || __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creationFailed,
                            isLoading: false
                        }));
                }
                return false;
            }
        } catch (error) {
            setState((prev)=>({
                    ...prev,
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creationFailed,
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
}),
"[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    // Desc: See the future, gain Precognition buff for 1 turn:
    // Procognition: next attacker that target you must roll their LUKsave vs DC10+<your LUKmod>+(skill level - 1) or it will surely miss, remove the buff after checking.
    // At level 5 if the attacker miss, you gain 1 order
    // At level 7 when used, roll a d20 + <LUKmod> if passed, gain 1 more turn of Precognition buff
    SeerSkillId["ThreadSnip"] = "ThreadSnip";
    // Uncommon
    // Desc: Look into the planar thread and pulled it away from an enemy: Deal 1d4 + <CHAmod> to an enemy, roll D14 (-1 per skill level) dice. I passed, randomly steal 1 element from the enemy
    SeerSkillId["PlanarEcho"] = "PlanarEcho";
    return SeerSkillId;
}({});
var MageSkillId = /*#__PURE__*/ function(MageSkillId) {
    MageSkillId["ArcaneBolt"] = "ArcaneBolt";
    MageSkillId["ArcaneShield"] = "ArcaneShield";
    MageSkillId["Backdraft"] = "Backdraft";
    MageSkillId["FireBolt"] = "FireBolt";
    MageSkillId["FireBall"] = "FireBall";
    MageSkillId["BurningHand"] = "BurningHand";
    return MageSkillId;
}({});
var MysticSkillId = /*#__PURE__*/ function(MysticSkillId) {
    MysticSkillId["MistStep"] = "MistStep";
    // “Shift like mist to a safer position. Move to the backline if you are in the front row; if already in the back row, gain evasion instead. Remove Slow or Bind if present. Gain +3 dodge roll for 1 turn (increases to 2 turns at skill level 5).”
    MysticSkillId["PlanarAbsorption"] = "PlanarAbsorption";
    // Gain 'Planar Absorption' buff for 2d3 stacks + intelligence mod + 0.01 times per skill level, If Attacked by a magic spell, absorb damage up to the stacks of planar absoprtion buff,
    // Every 4 damage of each type that is absorbed turned into 1 resource of that element type.
    MysticSkillId["InnerVeil"] = "InnerVeil";
    // Cast a veil on one frontline ally, make them harder to target or hit.
    // (Minor concealment / dodge / accuracy debuff to enemy)
    // Role: soft-support defensive buff.
    MysticSkillId["ReversalPalm"] = "ReversalPalm";
    return MysticSkillId;
}({});
var RogueSkillId = /*#__PURE__*/ function(RogueSkillId) {
    RogueSkillId["RetreatDash"] = "RetreatDash";
    RogueSkillId["Backstab"] = "Backstab";
    RogueSkillId["BleedingCut"] = "BleedingCut";
    // Uncommon
    // require sword dagger or blade
    // Deal weapons damage + Dex mod * (1 + 0.1 * skill level) slash
    // Must be front - front to deal full damage (see skills that have positionMultiplier)
    // target must roll DC10 (DC12 at lvl 5) Endurance save. or get 1d3 bleed stacks (debuff)
    // Bleed: takes 1d3 damage per turn for 3 turns.
    RogueSkillId["ThrowingKnives"] = "ThrowingKnives";
    // Common
    // Any range
    // Throw knives at 2 targets, each deals 1d4 + Dex mod * (1 + 0.1 * skill level) pierce damage.
    // target can be repeat, (so just get random again and again, no thing special here)
    // at level 5, add 2 more knives to the throw
    RogueSkillId["Hiding"] = "Hiding";
    return RogueSkillId;
}({});
var SpellBladeSkillId = /*#__PURE__*/ function(SpellBladeSkillId) {
    SpellBladeSkillId["PlanarEdge"] = "PlanarEdge";
    // Cantrip, auto attack, core idea for spell blade
    // Dealing arcane damage, melee (see positionModifier)
    // must equip sword, blade, dagger or barehand(no weapon)
    // If weapon exist, deal weapon damage + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
    // If no weapon, damage dice based on skill Level, 1d6, 1d6, 1d8, 1d8 and 2d4 (level 1-5) + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
    // and generate "Edge Charge". Buff
    // Edge Charge buff maximum 5 stacks, no limit on duration.
    // produce 1 wind
    SpellBladeSkillId["WindSlash"] = "WindSlash";
    // Uncommon
    // Any range
    // Deal (Planar edge-like damage) * (1 + 0.1 * skill level) arcane damage.
    // consume 1 wind, produce natural
    // Target roll DC7 + (user planar mod) endurance save or get bleed for 1d2 turn.
    // At level 5, if edge charge stacks > 0 deal additional 0.5 damage per stack, round down.
    SpellBladeSkillId["SpellParry"] = "SpellParry";
    // rare
    // Get Spell Parry buff for 1 turn.
    // Spell Parry: reduce next spell’s damage by (5 + Int mod).
    // If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken).
    // At level 5 also produce 1 Edge Charge when used.
    // Comsume 1 wind, produce 1 chaos
    SpellBladeSkillId["EdgeBurst"] = "EdgeBurst";
    return SpellBladeSkillId;
}({});
var ShamanSkillId = /*#__PURE__*/ function(ShamanSkillId) {
    ShamanSkillId["MendSpirit"] = "MendSpirit";
    ShamanSkillId["HexOfRot"] = "HexOfRot";
    ShamanSkillId["HolyRattle"] = "SpiritRattle";
    ShamanSkillId["ChaoticBlessing"] = "ChaoticBlessing";
    return ShamanSkillId;
}({});
var BarbarianSkillId = /*#__PURE__*/ function(BarbarianSkillId) {
    BarbarianSkillId["Rage"] = "Rage";
    // Cantrip,
    // Common
    // Can't have Rage Buff
    // Gain Rage for 3 turns (pAtk + 2, pDef and mDef - 2). At lvl5: 4 turns
    // consume 3 SP, produce 1 fire.
    BarbarianSkillId["RecklessSwing"] = "RecklessSwing";
    // Common
    // Multi-hit melee.
    // must have sword axe blade hammer spear barehand
    // 2 hits (3 hits at lvl5), each (0.7×weapon + STR mod) * (1 + 0.1 * skill level) * (positionModifier) damage = weapon damage type , -3 hit roll.
    // consume 4 SP 1 fire, produce 1 neutral
    BarbarianSkillId["Earthshatter"] = "Earthshatter";
    return BarbarianSkillId;
}({});
var WarriorSkillId = /*#__PURE__*/ function(WarriorSkillId) {
    WarriorSkillId["Cleave"] = "Cleave";
    // common
    // consume 2 neutral, produce 1 wind
    // Deal 1x weapon damage ((at level 5 = 1.2x), + str mod) * (skillScalar) * (positionModifier) attacking enemy to the 'front most row' (so the skill scalar must know which row we're attacking)
    WarriorSkillId["PowerStrike"] = "PowerStrike";
    // Common
    // consume 2 neutral, produce 1 fire
    // ACTIVE — Strong single-target melee attack.
    // Higher may be (1.3 and 1.5 at level 5 + str mod) * (skillScalar) * (posotionModifier)
    // Bread-and-butter offensive skill.
    WarriorSkillId["WarCry"] = "WarCry";
    return WarriorSkillId;
}({});
var KnightSkillId = /*#__PURE__*/ function(KnightSkillId) {
    KnightSkillId["PrecisionThrust"] = "PrecisionThrust";
    // Uncommon
    // Require sword, spear
    // target one frontfirst
    // Thrust the sword or spear right at one enemy dealing ((weapon damage + Str mod) * (1 + 0.1 * skill level)) * (positionModifier) pierce damage. with addtional +3 hit roll
    // If enemy has any debuff, crit change + 2 (4 at level 5).
    // consume 2 fire, produce 1 earth
    KnightSkillId["AdvancingPace"] = "AdvancingPace";
    return KnightSkillId;
}({});
var GuardianSkillId = /*#__PURE__*/ function(GuardianSkillId) {
    GuardianSkillId["Taunt"] = "Taunt";
    GuardianSkillId["HerosPose"] = "HerosPose";
    GuardianSkillId["ShieldUp"] = "ShieldUp";
    GuardianSkillId["Bash"] = "Bash";
    return GuardianSkillId;
}({});
var PaladinSkillId = /*#__PURE__*/ function(PaladinSkillId) {
    PaladinSkillId["DivineStrike"] = "DivineStrike";
    // ACTIVE — A melee attack blessed with holy energy.
    // target one, front first, melee.
    // Must have any weapon but not bow, orb, wand, book,
    // Deal (weapon damage * 1.2 + (str mod) + (will mod)) * (skill level multiplier) * (position modifier) holy damage.
    // If enemy is undead or fiend, deal additional 1d6 holy damage. (1d10 at lvl5)
    // consume 2 order, produce 1 neutral.
    PaladinSkillId["AegisPulse"] = "AegisPulse";
    // Must have Aegis Pulse buff
    // ACTIVE — Emit a wave of holy light.
    // Healing allies for 1d4 + willpower mod * (1 + 0.1 * skill level) HP.
    // Dealing small holy damage to all enemies. for 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage.
    // consume nothing but will remove Aegis Pulse buff.
    PaladinSkillId["AegisShield"] = "AegisShield";
    return PaladinSkillId;
}({});
var DruidSkillId = /*#__PURE__*/ function(DruidSkillId) {
    DruidSkillId["VineWhip"] = "VineWhip";
    // Deal 1d6 + (willpower mod) * (1 + 0.1 * skill level) nature damage.
    // target roll DC7 endurance save or get entangled for 1 turn.
    // Entangled: when take turns, must roll DC10 strength save or skip the turn.
    // produce 1 earth.
    DruidSkillId["ThrowSpear"] = "ThrowSpear";
    // Must equip Spear
    // rare
    // deal damage based on range.
    // if front - front 0.8 + skillLevel
    // if front - back 1.2 + skillLevel
    // if back - back 1.6 + skillLevel
    // Note that this skill don't have level multiplier but add the level into damage directly.
    // at level 5, based range damage added 0.2 times (1.0, 1.4, 1.8)
    // consume 2 neutral, produce 1 earth.
    DruidSkillId["RejuvenatingMist"] = "RejuvenatingMist";
    return DruidSkillId;
}({});
var MonkSkillId = /*#__PURE__*/ function(MonkSkillId) {
    MonkSkillId["PalmStrike"] = "PalmStrike";
    // ACTIVE — A precise melee strike using internal force.
    // target one, front first, melee.
    // Must equip barehand.
    // deal 1d6 + (str | dex mod whichever higher) * (position modifier) blunt damage.
    // Each level ignore 1 point of armor.
    // at level 5 damage dice = 1d8
    // produce 1 wind.
    // If armor is NOT cloth, damageOutput reduce by 70%.
    MonkSkillId["Meditation"] = "Meditation";
    // Restore 1d4 + skillLevel to HP or MP or SP, whichever is lowest (in percent).
    // produce 1 order.
    MonkSkillId["FlurryOfBlows"] = "FlurryOfBlows";
    return MonkSkillId;
}({});
var WarlockSkillId = /*#__PURE__*/ function(WarlockSkillId) {
    WarlockSkillId["ChaosBolt"] = "ShadowBolt";
    // ACTIVE — Launch a bolt of condensed shadow energy.
    // Ranged single-target magic damage with a small chance to weaken the target.
    // Basic Warlock nuke.
    WarlockSkillId["LifeDrain"] = "LifeDrain";
    // ACTIVE — Drain vitality from an enemy.
    // Deals damage and restores a portion of HP to the Warlock.
    // Core sustain tool.
    WarlockSkillId["Corruption"] = "Corruption";
    // ACTIVE — Corrupt the target with dark energy.
    // Deals immediate damage and applies multiple debuffs.
    // DOT/Debuff application tool.
    WarlockSkillId["DarkPact"] = "DarkPact";
    return WarlockSkillId;
}({});
var DuelistSkillId = /*#__PURE__*/ function(DuelistSkillId) {
    DuelistSkillId["PreciseStrike"] = "PreciseStrike";
    // ACTIVE — Execute a precise blade strike with perfect timing.
    // Basic precision attack, generates wind element.
    // Uses CONTROL for precision (expanded attribute).
    DuelistSkillId["ParryRiposte"] = "ParryRiposte";
    // ACTIVE — Assume defensive stance, ready to parry and counter.
    // Defensive counter-attack with reactive mechanics.
    // Uses CONTROL for precision timing (expanded attribute).
    DuelistSkillId["BladeFlurry"] = "BladeFlurry";
    // ACTIVE — Unleash a rapid flurry of blade strikes.
    // Multi-hit combo for fast damage application.
    DuelistSkillId["DuelingStance"] = "DuelingStance";
    return DuelistSkillId;
}({});
var WitchSkillId = /*#__PURE__*/ function(WitchSkillId) {
    WitchSkillId["PoisonDart"] = "CurseBolt";
    // ACTIVE — Launch a bolt of cursed energy at the target.
    // Basic curse attack, generates chaos element.
    // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in curse application).
    WitchSkillId["ChaosBrand"] = "CurseMark";
    // ACTIVE — Place a hex sigil on a target, marking them for increased suffering.
    // Setup skill that amplifies damage from all sources.
    // Uses INTELLIGENCE for strategic advantage (knowledge of weak points).
    // Good idea, but seems like we need a new buff again? can we just use the existing ones?
    WitchSkillId["ChaosBinding"] = "HexDoll";
    // ACTIVE — Bind a target to a small effigy, creating a sympathetic link.
    // Voodoo doll mechanic with damage over time.
    // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in hex application).
    WitchSkillId["Bewitch"] = "Bewitch";
    return WitchSkillId;
}({});
var InquisitorSkillId = /*#__PURE__*/ function(InquisitorSkillId) {
    InquisitorSkillId["RadiantSmite"] = "RadiantSmite";
    // ACTIVE — Launch a focused blast of radiant energy.
    // Basic holy damage nuke, generates order element.
    // Deals 1d6 + (WIL + PLANAR)/2 holy damage. DC8 + control mod willpower save for Exposed.
    // +1d4 bonus damage against undead/fiends. 1d8 at level 5.
    InquisitorSkillId["ExposeWeakness"] = "ExposeWeakness";
    // ACTIVE — Reveal the enemy's wrongdoing or impurity.
    // Setup skill that applies Exposed debuff. Consumes order, produces fire.
    // Marked enemies take +1d3 damage from all sources. -2 crit defense at level 5.
    // Inquisitor gains +WIL mod/2 hit against exposed enemies.
    InquisitorSkillId["PurgeMagic"] = "PurgeMagic";
    // ACTIVE — Attempt to forcibly remove magical buffs from a target.
    // DC10 + control mod willpower save. Failed: remove 1-2 buffs + deal holy damage.
    // Passed: deal half holy damage. Consumes fire, produces order.
    InquisitorSkillId["JudgmentDay"] = "JudgmentDay";
    return InquisitorSkillId;
}({});
var ScholarSkillId = /*#__PURE__*/ function(ScholarSkillId) {
    ScholarSkillId["Analyze"] = "Analyze";
    // Uncommon
    // Mark a vulnerable spot on the enemy. For 2 turns, the marked enemy get Exposed debuff
    // Exposed: takes additional 1d3 damage from all sources.
    // if skill level is 5, the exposed enemy also gain -2 to critical defense
    // We can use the 'perm' value in buff to acheive the -2 to critical defense
    ScholarSkillId["DisruptPattern"] = "DisruptPattern";
    // Cantrip
    // Force DC10 (DC12 at lvl 5) Will save.
    // Fail: target is Dazed 1 turn.
    // Success: reduce target's next initiative by 20 (30 at lvl 5).
    ScholarSkillId["CognitiveOverload"] = "CognitiveOverload";
    return ScholarSkillId;
}({});
var EngineerSkillId = /*#__PURE__*/ function(EngineerSkillId) {
    EngineerSkillId["ExplosiveBolt"] = "ExplosiveBolt";
    EngineerSkillId["BearTrap"] = "BearTrap";
    return EngineerSkillId;
}({});
var NomadSkillId = /*#__PURE__*/ function(NomadSkillId) {
    NomadSkillId["AdaptiveStrike"] = "AdaptiveStrike";
    // Common
    // Deal weapon damage + attribute modifier according to the weapon * (1.0 + 0.1 per 2 character levels, max 1.5 at level 10) (the same as basic attack) and change position, must change from front -> back or back -> front and have avalilable slot in the party, hit - 2 while attacking, this attack don't have range penalty.
    NomadSkillId["TacticalSlash"] = "TacticalSlash";
    // Uncommon
    // Self row based: Adapt your stance to your current position
    // Front row: engulf your weapon with fire and attack, dealing <FORMULA> fire damage. enemy must roll DC10 (DC12 at lvl 5) Endurance save or get burn for 1d3 turn.
    // Back row: get retreat buff for 1 turns
    // formula: (weapon damage + attribute modifier + 1d4) * (skillLevelMultiplier)
    // must equip dagger or blade
    NomadSkillId["TacticalShot"] = "TacticalShot";
    return NomadSkillId;
}({});
}),
"[project]/workspace/MyProject/Client/webapp/src/L10N/skills.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auto-generated file - do not edit manually
// Generated by: bun run scripts/extract-l10n.ts
__turbopack_context__.s([
    "skillsL10N",
    ()=>skillsL10N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-ssr] (ecmascript)");
;
const skillsL10N = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarbarianSkillId"].Earthshatter]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarbarianSkillId"].Rage]: {
        name: {
            en: "Rage",
            th: "บ้าคลั่ง"
        },
        description: {
            en: "Roar fiercefully and enter the <BuffRage> state for {5}'4':'3'{/} turns.",
            th: "เข้าสู่สถานะ <BuffRage> เป็นเวลา {5}'4':'3'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarbarianSkillId"].RecklessSwing]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BasicSkillId"].Basic]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].Bless]: {
        name: {
            en: "Bless",
            th: "อวยพร"
        },
        description: {
            en: "Ask for the Blessing from Laoh, <BuffBlessing> all ally for 2 turns. \n{5}\nThe user [b]throw DC10 + <WILmod>, if success, gain +1 order.[/b]{/}",
            th: "อธิษฐานขอการอวยพรจากลาโอห์ เพื่อนร่วมทีมทั้งหมดได้รับสถานะ '<BuffBlessing>' 2 เทิร์น \n{5}\nหลังจากใช้ ทอย [b]DC10 + <WILmod>[/b] หากผ่านจะได้รับ +1 order{/}"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].Heal]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].MassHeal]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].Radiance]: {
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
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].TurnUndead]: {
        name: {
            en: "Turn Undead",
            th: "ขับไล่ผี"
        },
        description: {
            en: "Cast a holy spell to destroy undead. \nDeal <FORMULA> true holy damage to non-undead targets. \nAgainst undead, target makes a [r](DC {5}'12':'10'{/}) WILsave roll[/r]. \nIf it failed to save, take 9999 true damage (instant kill). \nElse take [b]1d12 + <WILmod>[/b] holy damage.",
            th: "ร่ายเวทย์มนต์ศักดิ์สิทธิ์เพื่อทำลาย undead \nสร้างความเสียหายจริง <FORMULA> ต่อเป้าหมายที่ไม่ใช่ undead \nหากเป้าหมายเป็น undead เป้าหมายจะต้องทอย [r](DC {5}'12':'10'{/}) WILsave[/r] \nหากล้มเหลว สร้างความเสียหายจริง 9999 (ฆ่าทันที) \nหากสำเร็จ สร้างความเสียหายศักดิ์สิทธิ์ [b]1d12 + <WILmod>[/b]"
        },
        formula: "1d4 + <WILmod>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DruidSkillId"].RejuvenatingMist]: {
        name: {
            en: "Rejuvenating Mist",
            th: "หมอกฟื้นฟู"
        },
        description: {
            en: "Release a gentle natural mist around the party. \nAll allies gain <BuffRegen> for {5}'3':'2'{/} turns: restore <FORMULA> HP at the start of their turn.",
            th: "ปล่อยหมอกธรรมชาติรอบทีม \nพันธมิตรทั้งหมดได้รับ <BuffRegen> {5}'3':'2'{/} เทิร์น: ฟื้นฟู <FORMULA> HP ที่เริ่มเทิร์น"
        },
        formula: "1d4 + <WILmod> {7} +2{/}"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DruidSkillId"].ThrowSpear]: {
        name: {
            en: "Throw Spear",
            th: "ขว้างหอก"
        },
        description: {
            en: "Throw your spear at the enemy. \nDealing <FORMULA> pierce damage multiplied by the range: \nfront-front {5}'1.0':'0.8'{/}\nfront-back {5}'1.4':'1.2'{/}\nback-back {5}'1.8':'1.6'{/}",
            th: "ขว้างหอกใส่ศัตรู \nความเสียหายขึ้นกับระยะ: front-front {5}'1.0':'0.8'{/}\nfront-back {5}'1.4':'1.2'{/}\nback-back {5}'1.8':'1.6'{/}"
        },
        formula: "([r]0.8[/r] × <WeaponDamage> + <SkillLevelMultiplier>)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DruidSkillId"].VineWhip]: {
        name: {
            en: "Vine Whip",
            th: "เถาวัลย์"
        },
        description: {
            en: "Lashed a magical vine whip at an enemy.\nDeal <FORMULA> nature damage. \nTarget must [r]roll DC7 + <ControlMod> endurance save[/r] or get <DebuffEntangled> for 1 turn.",
            th: "ฟาดเป้าหมายด้วยเถาวัลย์เวทย์มนต์\nสร้างความเสียหายธรรมชาติ <FORMULA> \nเป้าหมายต้องทอย endurance save [r]DC7 + <ControlMod>[/r] หรือถูก <DebuffEntangled> 1 เทิร์น"
        },
        formula: "(1d6 + <WILmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuelistSkillId"].BladeFlurry]: {
        name: {
            en: "Blade Flurry",
            th: "ชุดการโจมตีดาบ"
        },
        description: {
            en: "Unleash a rapid flurry of blade strikes. \nDeal {5}'3':'2'{/} hits of <FORMULA> slash damage. \nTargets can be the same or different.",
            th: "ปล่อยชุดการโจมตีดาบอย่างรวดเร็ว \nสร้างความเสียหาย {5}'3':'2'{/} ครั้ง แต่ละครั้ง <FORMULA> เป็นความเสียหายตัด \nเป้าหมายสามารถเป็นคนเดียวกันหรือต่างกัน"
        },
        formula: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuelistSkillId"].DuelingStance]: {
        name: {
            en: "Dueling Stance",
            th: "ท่าดวล"
        },
        description: {
            en: "Adopt a focused dueling stance, enhancing your precision. \nGain <BuffDuelingStance> for {5}'3':'2'{/} turns. \n{5}\nGains [g]+2 crit[/g].{/}",
            th: "ใช้ท่าดวลที่มุ่งเน้น เพิ่มความแม่นยำ \nได้รับ <BuffDuelingStance> {5}'3':'2'{/} เทิร์น \n{5}\nได้รับ [g]+2 crit[/g]{/}"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuelistSkillId"].ParryRiposte]: {
        name: {
            en: "Parry & Riposte",
            th: "ปัดป้องและตอบโต้"
        },
        description: {
            en: "Assume a defensive stance, ready to parry and counter. \nGain <BuffParry> for {5}'2':'1'{/} turns. \nWhen attacked, [r]roll DC10 CONsave[/r]. If passed, negate the attack and deal <FORMULA> slash damage back to the attacker.",
            th: "ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้ \nได้รับ <BuffParry> {5}'2':'1'{/} เทิร์น \nเมื่อถูกโจมตี ให้ทอย control save DC10 หากสำเร็จ จะยกเลิกการโจมตีและสร้างความเสียหาย <FORMULA> ต่อผู้โจมตี"
        },
        formula: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuelistSkillId"].PreciseStrike]: {
        name: {
            en: "Precise Strike",
            th: "โจมตีแม่นยำ"
        },
        description: {
            en: "Execute a precise blade strike with perfect timing. \nDeals <FORMULA> slash damage. \n{5}\nGains [g]+2 crit[/g].{/}",
            th: "โจมตีด้วยดาบอย่างแม่นยำด้วยจังหวะที่สมบูรณ์แบบ \nสร้างความเสียหาย <FORMULA> เป็นความเสียหายตัด \n{5}\nได้รับ [g]+2 crit[/g]{/}"
        },
        formula: "((<WeaponDamage> × {5}'1.2':'1.0'{/}) × <SkillLevelMultiplier> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EngineerSkillId"].BearTrap]: {
        name: {
            en: "Bear Trap",
            th: "กับดักหมี"
        },
        description: {
            en: "Set a bear trap on the battlefield. The next time an enemy uses a melee (physical) attack, the trap triggers, dealing <FORMULA> pierce damage and removing the trap.",
            th: "วางกับดักหมีบนสนามรบ. ครั้งถัดไปที่ศัตรูใช้การโจมตีระยะประชิด (กายภาพ), กับดักจะทำงาน สร้างความเสียหายแทง <FORMULA> และลบกับดักออก"
        },
        formula: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EngineerSkillId"].ExplosiveBolt]: {
        name: {
            en: "Explosive Bolt",
            th: "ลูกธนูระเบิด"
        },
        description: {
            en: "Fire an explosive bolt that deals <FORMULA> fire damage to a target. If hit, deals 50% splash damage to adjacent enemies in the same row.",
            th: "ยิงลูกธนูระเบิดที่สร้างความเสียหายไฟ <FORMULA> แก่เป้าหมาย. หากโดน, สร้างความเสียหายสาด 50% แก่ศัตรูที่อยู่ติดกันในแถวเดียวกัน"
        },
        formula: "(1d8 + <DEXmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GuardianSkillId"].Bash]: {
        name: {
            en: "Bash",
            th: "ทุบสุดแรง"
        },
        description: {
            en: "Slam your weapon with overwhelming force, crushing your enemy's defenses.\nDeal <FORMULA> damage.\nTarget must [r]roll DC8 + STRmod ENDsave[/r] or become <DebuffStun> for 1 turn.",
            th: "ฟาดอาวุธด้วยแรงมหาศาล ทำลายการป้องกันของศัตรู\nสร้างความเสียหาย <FORMULA>\nเป้าหมายต้องทอย [r]DC8 + STRmod ENDsave[/r] หรือถูก <DebuffStun> 1 เทิร์น"
        },
        formula: "<WeaponDamage> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GuardianSkillId"].HerosPose]: {
        name: {
            en: "Hero's Pose",
            th: "ท่าเชิงฮีโร่"
        },
        description: {
            en: "Strike a heroic pose, channeling your inner strength.\nRoll DC{5}'10 - skill level':'15 - skill level'{/}. On success, restore <FORMULA> HP.\nThe higher your skill, the easier it becomes to inspire yourself.",
            th: "ใช้ท่าเชิงฮีโร่ ปลุกพลังภายใน\nทอย DC{5}'10 - เลเวลสกิล':'15 - เลเวลสกิล'{/} หากสำเร็จ ฟื้นฟู <FORMULA> HP\nยิ่งเลเวลสกิลสูง ยิ่งง่ายต่อการปลุกแรงใจ"
        },
        formula: "<VITmod> + skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GuardianSkillId"].ShieldUp]: {
        name: {
            en: "Shield Up",
            th: "ยกโล่ขึ้น"
        },
        description: {
            en: "Raise your shield high, forming an impenetrable barrier.\nGain <BuffDefenseUp> for {5}'4':'3'{/} turns",
            th: "ยกโล่ขึ้นสูง สร้างกำแพงป้องกันที่แข็งแกร่ง\nได้รับ <BuffDefenseUp> เป็นเวลา {5}'4':'3'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GuardianSkillId"].Taunt]: {
        name: {
            en: "Taunt",
            th: "ยั่วยุ"
        },
        description: {
            en: "Roar defiantly and draw all enemy attention to yourself.\nGain <BuffTaunt> for <FORMULA> turns",
            th: "คำรามท้าทายและดึงความสนใจของศัตรูทั้งหมดมาที่คุณ\nได้รับ <BuffTaunt> เป็นเวลา <FORMULA> เทิร์น"
        },
        formula: "2 + floor(0.5 × skill level) + floor(<CHAmod> / 2)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InquisitorSkillId"].ExposeWeakness]: {
        name: {
            en: "Expose Weakness",
            th: "เปิดเผยจุดอ่อน"
        },
        description: {
            en: "Point out the enemy's sins and expose their vulnerabilities for all to see.\n{5}\nAlso reduces their [r]critical defense by 2[/r].{/}\n[b]You gain +floor(<WILmod> / 2) hit[/b] against exposed enemies.",
            th: "ชี้ให้เห็นบาปของศัตรูและเปิดเผยจุดอ่อนให้ทุกคนเห็น\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}\n[b]คุณได้รับ +floor(<WILmod> / 2) hit[/b] ต่อเป้าหมายที่ถูกเปิดเผย"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InquisitorSkillId"].JudgmentDay]: {
        name: {
            en: "Judgment Day",
            th: "วันพิพากษา"
        },
        description: {
            en: "Call down divine judgment upon your enemy, a pillar of pure radiance that burns away all impurity.\nDeal <FORMULA> holy damage.\n[r]Deal +50% damage[/r] if target has <DebuffExposed>.\n[r]Deal +1d8 bonus damage[/r] against undead or fiends.",
            th: "เรียกการพิพากษาจากสวรรค์ใส่ศัตรู เสาแสงศักดิ์สิทธิ์ที่เผาผลาญความไม่บริสุทธิ์ทั้งหมด\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +50%[/r] หากเป้าหมายมี <DebuffExposed>\n[r]สร้างความเสียหายเพิ่ม +1d8[/r] ต่อ undead หรือ fiends"
        },
        formula: "{5}'2d8':'2d6'{/} + (<WILmod> + <PlanarMod>) × (1 + 0.15 × skill level)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InquisitorSkillId"].PurgeMagic]: {
        name: {
            en: "Purge Magic",
            th: "ล้างเวทมนตร์"
        },
        description: {
            en: "Unleash purifying flames that strip away all magical enhancements, the stronger the magic, the greater the backlash.\nDeal <FORMULA> [r]true holy damage[/r] that bypasses all defenses.\nRemoves {5}'2':'1'{/} random buff(s) from the target.\n{5}\nDeals [r]+2 additional damage[/r].{/}",
            th: "ปล่อยเปลวไฟชำระล้างที่ลบการเสริมเวทมนตร์ทั้งหมด ยิ่งเวทมนตร์แข็งแกร่ง ยิ่งได้รับผลกระทบมากขึ้น\nสร้างความเสียหายศักดิ์สิทธิ์แท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nลบบัฟแบบสุ่ม {5}'2':'1'{/} ตัวจากเป้าหมาย\n{5}\nสร้างความเสียหาย [r]เพิ่ม +2[/r]{/}"
        },
        formula: "1d4 + target's PlanarMod + number of target's buffs {5} + 2{/}"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InquisitorSkillId"].RadiantSmite]: {
        name: {
            en: "Radiant Smite",
            th: "การลงโทษด้วยแสง"
        },
        description: {
            en: "Channel divine wrath into a searing beam of light that smites the wicked.\nDeal <FORMULA> holy damage.\n[r]Deal +1d4 bonus damage[/r] against undead or fiends.\n[r]Deal +1d4 bonus damage[/r] against evil-aligned targets.",
            th: "รวมพลังพิพากษาจากสวรรค์เป็นลำแสงที่เผาผลาญผู้ชั่วร้าย\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +1d4[/r] ต่อ undead หรือ fiends\n[r]สร้างความเสียหายเพิ่ม +1d4[/r] ต่อเป้าหมายที่มีความชั่วร้าย"
        },
        formula: "(1d6 + (<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KnightSkillId"].AdvancingPace]: {
        name: {
            en: "Advancing Pace",
            th: "ก้าวจังหวะรุก"
        },
        description: {
            en: "Channel planar force into disciplined footwork, moving with unstoppable momentum.\nGain <BuffAdvancingPace> for {5}4:3{/} turns.",
            th: "ถ่ายทอดพลังภายในสู่จังหวะก้าว เคลื่อนไหวด้วยโมเมนตัมที่ไม่อาจหยุดยั้ง\nได้รับ <BuffAdvancingPace> {5}4:3{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KnightSkillId"].PrecisionThrust]: {
        name: {
            en: "Precision Thrust",
            th: "แทงทะลุจุด"
        },
        description: {
            en: "Lunge at a front-line foe with surgical accuracy, finding the perfect opening.\nDeal <FORMULA> damage.with [b]+3 hit[/b].\n[b]Gains bonus crit[/b] if target has any debuff.",
            th: "พุ่งแทงศัตรูแถวหน้าอย่างแม่นยำ หาช่องว่างที่สมบูรณ์แบบ\nสร้างความเสียหาย <FORMULA> พร้อมกับ [b]+3 hit[/b]\n[b]ได้รับ crit เพิ่ม[/b] หากเป้าหมายมีดีบัฟ"
        },
        formula: "<WeaponDamage> × (1 + 0.1 × skill level) × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].ArcaneBolt]: {
        name: {
            en: "Arcane Bolt",
            th: "ลูกเวทมนตร์"
        },
        description: {
            en: "Unleash a focused bolt of raw arcane energy.\nDeal <FORMULA> arcane damage.",
            th: "ปล่อยลูกพลังงานเวทมนตร์ดิบ\nสร้างความเสียหายอาร์เคน <FORMULA>"
        },
        formula: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].ArcaneShield]: {
        name: {
            en: "Arcane Shield",
            th: "โล่เวทมนตร์"
        },
        description: {
            en: "Weave a protective barrier of pure arcane energy that absorbs incoming harm.\nGain <FORMULA> stacks of <BuffArcaneShield>.",
            th: "ถักทอกำแพงป้องกันจากพลังงานอาร์เคนบริสุทธิ์ที่ดูดซับอันตราย\nได้รับ <FORMULA> สแตคของ <BuffArcaneShield>"
        },
        formula: "1d3 + floor(<PlanarMod> / 2) + floor(0.5 × skill level) {5}'+1d3'{/}"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].Backdraft]: {
        name: {
            en: "Backdraft",
            th: "ไฟย้อนกลับ"
        },
        description: {
            en: "Ignite the flames already burning on your enemies, causing them to explode in a violent backdraft.\nTargets all enemies with <DebuffBurn>.\nDeal <FORMULA> fire damage per burn stack, then remove all burn stacks.\n[b]Heal yourself[/b] for total damage × (0.1 × skill level) {5} + 1d2 per stack: + 1 per stack{/}",
            th: "จุดไฟที่กำลังลุกไหม้บนศัตรู ทำให้ระเบิดเป็นไฟย้อนกลับอย่างรุนแรง\nโจมตีศัตรูทั้งหมดที่มี <DebuffBurn>\nสร้างความเสียหายไฟ <FORMULA> ต่อสแตคเผาไหม้ จากนั้นลบสแตคเผาไหม้ทั้งหมด\n[b]ฟื้นฟูตัวเอง[/b] ความเสียหายทั้งหมด × (0.1 × เลเวลสกิล) {5} + 1d2 ต่อสแตค: + 1 ต่อสแตค{/}"
        },
        formula: "total damage × (0.1 × skill level) {5}+ 1d2 per stack:+ 1 per stack{/}"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].BurningHand]: {
        name: {
            en: "Burning Hand",
            th: "มือไฟแผดเผา"
        },
        description: {
            en: "Project waves of searing flame from your hand, engulfing all enemies in the front row.\nDeal <FORMULA> fire damage to each target.\nOn hit, target must [r]roll DC10 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> {5}'2-3':'1-2'{/} stacks.\n{5}\nMay also strike one additional target from another row.{/}",
            th: "ปล่อยคลื่นเปลวไฟจากฝ่ามือ โอบล้อมศัตรูทั้งหมดในแถวหน้า\nสร้างความเสียหายไฟ <FORMULA> ต่อแต่ละเป้าหมาย\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC10 + <PlanarMod>[/r] หรือถูก <DebuffBurn> {5}'2-3':'1-2'{/} สแตค\n{5}\nอาจโจมตีเป้าหมายเพิ่มเติมอีกหนึ่งตัวจากแถวอื่น{/}"
        },
        formula: "({5}'1d8':'1d6'{/} + <PlanarMod>) x <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].FireBall]: {
        name: {
            en: "Fireball",
            th: "ลูกไฟระเบิด"
        },
        description: {
            en: "Unleash a blazing sphere of fire that explodes upon impact, engulfing 1–6 enemies in a devastating inferno.\nDeal <FORMULA> fire damage to each target.\nOn hit, target must [r]roll DC10 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> 1–2 stacks.",
            th: "ปลดปล่อยลูกไฟทรงพลังที่ระเบิดกลางสนาม โอบล้อมศัตรู 1–6 ตัวในไฟนรกที่ทำลายล้าง\nสร้างความเสียหายไฟ <FORMULA> ต่อแต่ละเป้าหมาย\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC10 + <PlanarMod>[/r] หรือถูก <DebuffBurn> 1–2 สแตค"
        },
        formula: "{5}'1d12':'1d10'{/} + <PlanarMod> + 0.5 × skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].FireBolt]: {
        name: {
            en: "Fire Bolt",
            th: "ลูกไฟ"
        },
        description: {
            en: "Unleash a focused bolt of fire that streaks toward your enemy like a shooting star.\nDeal <FORMULA> fire damage.\nOn hit, target must [r]roll DC8 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> 1–2 stacks.",
            th: "ปล่อยลูกไฟที่มุ่งเน้นพุ่งไปยังศัตรูเหมือนดาวตก\nสร้างความเสียหายไฟ <FORMULA>\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC8 + <PlanarMod>[/r] หรือถูก <DebuffBurn> 1–2 สแตค"
        },
        formula: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].CommanderScream]: {
        name: {
            en: "Commander Scream!",
            th: "คำสั่งกรีดร้อง!"
        },
        description: {
            en: "Target all allies, each rolls DC15 willpower; on fail gain Fear 2t and Cowardly Charge 2t: consume 2 chaos, 2 sp: produce 1 earth",
            th: "เลือกพันธมิตรทั้งหมด ทอย DC15 willpower ถ้าล้มเหลวได้ Fear 2 เทิร์น และ Cowardly Charge 2 เทิร์น: ใช้ 2 chaos, 2 sp: สร้าง 1 earth"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].PanicSlash]: {
        name: {
            en: "Panic Slash",
            th: "ฟันแบบตื่นตระหนก"
        },
        description: {
            en: "A reckless melee attack. Deals 1.0× physical damage (+skill Level) with a -4 hit roll penalty, but grants +2 crit roll instead.",
            th: "การโจมตีระยะประชิดแบบไม่คิดหน้าคิดหลัง สร้างความเสียหายกายภาพ 1.0× (+เลเวบของสกิล) โอกาสโจมตีโดนลดลง 4 แต่โอกาสเกิดคริติคอลเพิ่มขึ้น 2"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].Shriek]: {
        name: {
            en: "Shriek",
            th: "กรีดร้อง"
        },
        description: {
            en: "A panicked shriek all enemy must roll DC10 willpower save, if failed gain Minor Fear. the user also have roll D20, if the result is 15+ gain 1 turn of taunt.",
            th: "กรีดร้องด้วยความตื่นตระหนก ศัตรูทั้งหมดต้องทอย DC10 willpower save, ถ้าล้มเหลวจะทำให้เกิด Minor Fear ผู้ใช้ทอย D20, ถ้าผลลัพธ์คือ 15+ จะได้รับสถานะยั่วยุ 1 เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].ThrowPebble]: {
        name: {
            en: "Throw Pebble",
            th: "ขว้างก้อนหิน"
        },
        description: {
            en: "A simple ranged attack with a pebble. Deals 1d6 blunt damage. If hit, target must roll DC10 endurance saves or dazed.",
            th: "การโจมตีระยะไกลด้วยก้อนหิน สร้างความเสียหาย blunt 1d6 หน่วย หากโจมตีถูก เป้าหมายจะต้องทอย DC10 endurance saves หรือติดสถานะสับสน"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].Whip]: {
        name: {
            en: "Whip!",
            th: "แส้!"
        },
        description: {
            en: "Attack one enemy deal 1d6 damage + all (Slave Drive) stacks*2 * (1+(skillLevel*0.1)), after attack, remove slave driver stacks",
            th: "โจมตีศัตรูหนึ่งตัว สร้างความเสียหาย 1d6 + (สแต็ค Slave Driver ทั้งหมด)*2 * (1+(เลเวลสกิล*0.1)), หลังโจมตี ลบสแต็ค Slave Driver ทั้งหมด"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobSkillId"].WorksYouMaggots]: {
        name: {
            en: "Work You Maggots!",
            th: "ทำงานไอ้หนอน!"
        },
        description: {
            en: "Target one ally 'Goblin' deal 1d3 true damage and add a Buff: Slave Driver to self equal to damage dealt; target get abGauge += 5 + skill level: consume 2 sp : produce 1 chaos",
            th: "เลือกพันธมิตร 'ก๊อปลิน' หนึ่งตัว สร้างความเสียหายจริง 1d3 และเพิ่มบัฟ Slave Driver ให้ตัวเองเท่ากับความเสียหายที่ทำได้; เป้าหมายได้รับ abGauge += 5 + เลเวลสกิล: ใช้ 2 sp : สร้าง 1 chaos"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonkSkillId"].FlurryOfBlows]: {
        name: {
            en: "Flurry of Blows",
            th: "ชุดการโจมตี"
        },
        description: {
            en: "Unleash a rapid flurry of strikes, overwhelming your enemy with sheer speed.\nDeal {5}'3':'2'{/} hits of <FORMULA> blunt damage.\n[r]Damage reduced by 70%[/r] if wearing non-cloth armor.",
            th: "ปล่อยชุดการโจมตีอย่างรวดเร็ว ท่วมท้นศัตรูด้วยความเร็ว\nสร้างความเสียหายทื่อ {5}'3':'2'{/} ครั้ง แต่ละครั้ง <FORMULA>\n[r]ความเสียหายลดลง 70%[/r] หากสวมเกราะที่ไม่ใช่ผ้า"
        },
        formula: "Palm Strike damage (if learned), else 1d4 + max(<STRmod>, <DEXmod>) × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonkSkillId"].Meditation]: {
        name: {
            en: "Meditation",
            th: "สมาธิ"
        },
        description: {
            en: "Enter a meditative state, channeling inner peace to restore your depleted resources.\nRestore <FORMULA> to your lowest resource (HP, MP, or SP) as percentage of max.",
            th: "เข้าสู่สถานะสมาธิ ควบคุมความสงบภายในเพื่อฟื้นฟูทรัพยากรที่หมดลง\nฟื้นฟู <FORMULA> ให้กับทรัพยากรที่ต่ำที่สุด (HP, MP, หรือ SP) เป็นเปอร์เซ็นต์ของค่าสูงสุด"
        },
        formula: "(1d4 + skill level + floor(<ControlMod> / 2))% of max"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonkSkillId"].PalmStrike]: {
        name: {
            en: "Palm Strike",
            th: "ตบฝ่ามือ"
        },
        description: {
            en: "Channel internal force through your palm, striking with precision that bypasses armor.\nDeal <FORMULA> blunt damage.\nIgnores armor equal to skill level.\n[r]Damage reduced by 70%[/r] if wearing non-cloth armor.",
            th: "ควบคุมพลังภายในผ่านฝ่ามือ โจมตีด้วยความแม่นยำที่ผ่านเกราะ\nสร้างความเสียหายทื่อ <FORMULA>\nเพิกเฉยต่อเกราะเท่ากับเลเวลสกิล\n[r]ความเสียหายลดลง 70%[/r] หากสวมเกราะที่ไม่ใช่ผ้า"
        },
        formula: "({5}'1d8':'1d6'{/} + max(<STRmod>, <DEXmod>)) × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MysticSkillId"].InnerVeil]: {
        name: {
            en: "Inner Veil",
            th: "ผ้าคลุมภายใน"
        },
        description: {
            en: "Weave a protective veil of planar energy around a frontline ally, obscuring them from enemy sight.\\Give <BuffInnerVeil> for {5}'3':'2'{/} turns.",
            th: "ถักทอผ้าคลุมป้องกันจากพลังงานระนาบรอบพันธมิตรแถวหน้า ทำให้ศัตรูมองไม่เห็น\nได้รับ <BuffInnerVeil> เป็นเวลา {5}'3':'2'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MysticSkillId"].MistStep]: {
        name: {
            en: "Mist Step",
            th: "ก้าวหมอก"
        },
        description: {
            en: "Shift like mist to a safer position, becoming one with the air itself.\nIf in front row: move to backline.\nIf in back row: gain <BuffRetreat> for {5}'2':'1'{/} turns.\nRemoves <DebuffSlow> if present.",
            th: "เคลื่อนไหวเหมือนหมอกไปยังตำแหน่งที่ปลอดภัยกว่า กลายเป็นหนึ่งเดียวกับอากาศ\nหากอยู่ในแถวหน้า: ย้ายไปแถวหลัง\nหากอยู่ในแถวหลัง: ได้รับ <BuffRetreat> เป็นเวลา {5}'2':'1'{/} เทิร์น\nลบ <DebuffSlow> หากมีอยู่"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MysticSkillId"].PlanarAbsorption]: {
        name: {
            en: "Planar Absorption",
            th: "ดูดซับพลัง"
        },
        description: {
            en: "Channel planar energy into a protective barrier that absorbs magical harm.\nGain <FORMULA> stacks of <BuffPlanarAbsorption>.",
            th: "ควบคุมพลังงานแห่งระนาบเป็นกำแพงป้องกันที่ดูดซับอันตรายจากเวทมนตร์\nได้รับ <FORMULA> สแตคของ <BuffPlanarAbsorption>"
        },
        formula: "(2d3 + <INTmod> + floor(<ControlMod> / 2)) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MysticSkillId"].ReversalPalm]: {
        name: {
            en: "Reversal Palm",
            th: "ฝ่ามือพลิก"
        },
        description: {
            en: "Assume a defensive stance that redirects incoming attacks back at your foe.\nGain <BuffReversalPalm> for 1 turn.\nWhen attacked, [r]roll WILsave[/r]. If passed, deal <FORMULA> blunt damage to attacker and negate the attack.",
            th: "ใช้ท่าป้องกันที่สะท้อนการโจมตีที่เข้ามากลับไปที่ศัตรู\nได้รับ <BuffReversalPalm> 1 เทิร์น\nเมื่อถูกโจมตี ทอย [r]WILsave[/r] หากสำเร็จ สร้างความเสียหายทื่อ <FORMULA> ต่อผู้โจมตีและยกเลิกการโจมตี"
        },
        formula: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NomadSkillId"].AdaptiveStrike]: {
        name: {
            en: "Adaptive Strike",
            th: "การโจมตีปรับตัว"
        },
        description: {
            en: "Strike while repositioning. Deal weapon damage and change position from front to back or back to front. This attack has -2 hit penalty but no range penalty.",
            th: "โจมตีพร้อมเปลี่ยนตำแหน่ง. สร้างความเสียหายจากอาวุธและเปลี่ยนตำแหน่งจากหน้าไปหลังหรือหลังไปหน้า. การโจมตีนี้มี -2 hit แต่ไม่มี range penalty"
        },
        formula: "(Weapon damage + attribute modifier) × (1.0 + 0.1 per 2 character levels, max 1.5 at level 10)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NomadSkillId"].TacticalShot]: {
        name: {
            en: "Tactical Shot",
            th: "ยิงเชิงกลยุทธ์"
        },
        description: {
            en: "Adapt your shot to enemy position.\nEnemy in front row: Throw hot sand into enemy eyes, dealing 1d2 true damage. Enemy must roll DC10 (DC12 at level 5) AGI save or get blind for 1 turn.\nEnemy in back row: Launch a powerful shot, dealing <FORMULA> piercing damage. No range penalty.",
            th: "ปรับการยิงตามตำแหน่งศัตรู\nศัตรูในแถวหน้า: โยนทรายร้อนเข้าตาศัตรู สร้างความเสียหายจริง 1d2. ศัตรูต้องทอย DC10 (DC12 ที่ระดับ 5) AGI save หรือถูก blind 1 เทิร์น\nศัตรูในแถวหลัง: ยิงอย่างทรงพลัง สร้างความเสียหายแทง <FORMULA>. ไม่มี range penalty"
        },
        formula: "(Weapon damage + attribute modifier) × (<SkillLevelMultiplier> + 0.3)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NomadSkillId"].TacticalSlash]: {
        name: {
            en: "Tactical Slash",
            th: "ฟันเชิงกลยุทธ์"
        },
        description: {
            en: "Adapt your attack to your position.\nFront row: Engulf your weapon with fire and attack, dealing <FORMULA> fire damage. Enemy must roll DC10 (DC12 at level 5) Endurance save or get burn for 1d3 turns.\nBack row: Gain <BuffRetreat> for 1 turn.",
            th: "ปรับการโจมตีตามตำแหน่งของคุณ\nแถวหน้า: อาบอาวุธด้วยไฟและโจมตี สร้างความเสียหายไฟ <FORMULA>. ศัตรูต้องทอย DC10 (DC12 ที่ระดับ 5) Endurance save หรือถูก burn 1d3 เทิร์น\nแถวหลัง: ได้รับ <BuffRetreat> 1 เทิร์น"
        },
        formula: "(Weapon damage + attribute modifier + 1d4) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaladinSkillId"].AegisPulse]: {
        name: {
            en: "Aegis Pulse",
            th: "คลื่นป้องกันศักดิ์สิทธิ์"
        },
        description: {
            en: "Release the stored holy energy in a devastating pulse that heals allies and smites enemies.\nHeal all allies for <FORMULA> HP.\nDeal <FORMULA> holy damage to all enemies.",
            th: "ปลดปล่อยพลังงานศักดิ์สิทธิ์ที่สะสมไว้เป็นคลื่นที่ทำลายล้าง รักษาพันธมิตรและลงโทษศัตรู\nรักษาพันธมิตรทั้งหมด <FORMULA> HP\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA> ให้ศัตรูทั้งหมด"
        },
        formula: "(1d4 + <WILmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaladinSkillId"].AegisShield]: {
        name: {
            en: "Aegis Shield",
            th: "โล่ป้องกันศักดิ์สิทธิ์"
        },
        description: {
            en: "Summon a divine barrier of pure holy energy that protects you from harm.\nActivate <BuffAegisShield> with {5}'4':'3'{/} stacks.",
            th: "เรียกกำแพงศักดิ์สิทธิ์จากพลังงานศักดิ์สิทธิ์บริสุทธิ์ที่ปกป้องคุณจากอันตราย\nเปิดใช้งาน <BuffAegisShield> {5}'4':'3'{/} สแตค"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaladinSkillId"].DivineStrike]: {
        name: {
            en: "Divine Strike",
            th: "โจมตีศักดิ์สิทธิ์"
        },
        description: {
            en: "Channel divine wrath through your weapon, striking with the fury of the righteous.\nDeal <FORMULA> holy damage.\n[r]Deal +{5}'1d10':'1d6'{/} bonus damage[/r] against undead or fiends.",
            th: "ควบคุมความโกรธศักดิ์สิทธิ์ผ่านอาวุธ โจมตีด้วยความโกรธของคนชอบธรรม\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +{5}'1d10':'1d6'{/}[/r] ต่อ undead หรือ fiends"
        },
        formula: "((<WeaponDamageWithoutAtrMod> × 1.2) + ((<STRmod> + <WILmod>) / 2)) × <SkillLevelMultiplier> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RogueSkillId"].Backstab]: {
        name: {
            en: "Backstab",
            th: "แทงข้างหลัง"
        },
        description: {
            en: "While you're hiding, slip into your enemy's blind spot and drive your blade deep into their vulnerable back.\nDeal <FORMULA> pierce damage.\n[b]Gains +{5}'5':'4'{/} crit[/b] if target has <DebuffFear> or <DebuffDazed>.",
            th: "ในขณะที่ซ่อนตัว ข้ามเข้าไปที่จุดที่ศัตรูมองไม่เห็น และทะลุจุดอ่อนของศัตรูที่หลัง\nสร้างความเสียหายแทง <FORMULA>\n[b]ได้รับ +{5}'5':'4'{/} crit[/b] หากเป้าหมายมี <DebuffFear> หรือ <DebuffDazed>"
        },
        formula: "({5}'1.5':'1.3'{/} × <WeaponDamage>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RogueSkillId"].BleedingCut]: {
        name: {
            en: "Bleeding Cut",
            th: "ตัดเลือดไหล"
        },
        description: {
            en: "Slice your enemy with a precise cut that leaves them bleeding profusely.\nDeal <FORMULA> slash damage.\nTarget must [r]roll DC{5}'12':'10'{/} ENDsave[/r] or get <DebuffBleed> 1d3 stacks.",
            th: "ตัดศัตรูด้วยการตัดที่แม่นยำ ทำให้เลือดไหลไม่หยุด\nสร้างความเสียหายตัด <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC{5}'12':'10'{/}[/r] หรือถูก <DebuffBleed> 1d3 สแตค"
        },
        formula: "<WeaponDamage> × <SkillLevelMultiplier> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RogueSkillId"].Hiding]: {
        name: {
            en: "Hiding",
            th: "ซ่อนตัว"
        },
        description: {
            en: "Melt into the shadows, becoming one with the darkness.\nRoll D20 + <DEXmod> against DC{5}'8':'10'{/} + highest enemy INTmod + {5}'3':'5'{/} if in front row.\nIf passed, gain <BuffHiding> for 2 turns.",
            th: "ละลายเข้ากับเงามืด กลายเป็นหนึ่งเดียวกับความมืด\nทอย D20 + <DEXmod> กับ DC{5}'8':'10'{/} + INTmod สูงสุดของศัตรู + {5}'3':'5'{/} หากอยู่ในแถวหน้า\nหากสำเร็จ ได้รับ <BuffHiding> 2 เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RogueSkillId"].RetreatDash]: {
        name: {
            en: "Retreat Dash",
            th: "วิ่งหนี"
        },
        description: {
            en: "Make a desperate dash to safety, putting distance between you and danger.\nGain <BuffRetreat> for {5}'2':'1'{/} turn.\nAttempts to move to backline.",
            th: "วิ่งหนีอย่างสิ้นหวัง สร้างระยะห่างระหว่างคุณกับอันตราย\nได้รับ <BuffRetreat> {5}'3':'2'{/} เทิร์น\nพยายามย้ายไปแถวหลัง"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RogueSkillId"].ThrowingKnives]: {
        name: {
            en: "Throwing Knives",
            th: "ขว้างมีด"
        },
        description: {
            en: "Hurl a flurry of knives with deadly precision, striking multiple foes.\nThrow {5}'3':'2'{/} daggers at random targets, each dealing <FORMULA> pierce damage.\nTargets can be the same or different.",
            th: "ขว้างมีดหลายเล่มด้วยความแม่นยำที่ร้ายแรง โจมตีศัตรูหลายคน\nขว้าง {5}'3':'2'{/} มีดกระทำศัตรูที่สุ่ม แต่ละคนสร้างความเสียหายแทง <FORMULA>\nเป้าหมายสามารถเป็นคนเดียวกันหรือต่างกัน"
        },
        formula: "(1d4 + <DEXmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScholarSkillId"].Analyze]: {
        name: {
            en: "Analyze",
            th: "วิเคราะห์"
        },
        description: {
            en: "Study your enemy's movements and mark their most vulnerable points.\nMark target with <DebuffExposed> for 2 turns.\n{5}\nAlso reduces their [r]critical defense by <INTmod> but not exceed 3 or below 1[/r].{/}",
            th: "ศึกษาการเคลื่อนไหวของศัตรูและทำเครื่องหมายจุดอ่อนที่สุด\nทำเครื่องหมายเป้าหมายด้วย <DebuffExposed> 2 เทิร์น\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScholarSkillId"].CognitiveOverload]: {
        name: {
            en: "Cognitive Overload",
            th: "ความล้นเกินของความคิด"
        },
        description: {
            en: "Overwhelm your enemy's mind with an overwhelming surge of arcane knowledge.\nDeal <FORMULA> [r]true arcane damage[/r] that bypasses all defenses.\nRefreshes 1 random debuff on the target.\nIf target has ≥3 debuffs, main dice becomes {5}'1d8':'1d6'{/}.",
            th: "ท่วมท้นจิตใจของศัตรูด้วยคลื่นความรู้อาร์เคนที่ล้นเกิน\nสร้างความเสียหายอาร์เคนแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nรีเฟรชดีบัฟแบบสุ่ม 1 ตัวบนเป้าหมาย\nหากเป้าหมายมีดีบัฟ ≥3 ตัว ความเสียหายกลายเป็น {5}'1d8':'1d6'{/}."
        },
        formula: "{5}'1d6':'1d4'{/} + <INTmod> × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScholarSkillId"].DisruptPattern]: {
        name: {
            en: "Disrupt Pattern",
            th: "ทำลายรูปแบบ"
        },
        description: {
            en: "Disrupt your enemy's combat rhythm by identifying and breaking their attack patterns.\nForce target to [r]roll DC{5}'12':'10'{/} WILsave[/r].\nIf failed: target becomes <DebuffDazed> for 1 turn.\nIf passed: [r]reduce target's next initiative by {5}'30':'20'{/}[/r].",
            th: "ทำลายจังหวะการต่อสู้ของศัตรูโดยระบุและทำลายรูปแบบการโจมตี\nบังคับเป้าหมายให้ทอย [r]WILsave DC{5}'12':'10'{/}[/r]\nหากล้มเหลว: เป้าหมายถูก <DebuffDazed> 1 เทิร์น\nหากสำเร็จ: [r]ลด initiative ครั้งถัดไปของเป้าหมาย {5}'30':'20'{/}[/r]"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SeerSkillId"].PlanarEcho]: {
        name: {
            en: "Planar Echo",
            th: "การสะท้อนพลังระนาบ"
        },
        description: {
            en: "Echo the planar energy around, dealing <FORMULA> arcane damage to a target. If hit, the target must roll DC10 LUKsave or decrease AB gauge by 10.",
            th: "คาดการณ์อนาคต, ได้รับพระการันตี Precognition ของ 1 รอบ: การคาดการณ์: ศัตรูต� procon"
        },
        formula: "1d6 + <CHAmod> * (1 + 0.1 * skill level)"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SeerSkillId"].Precognition]: {
        name: {
            en: "Precognition",
            th: "คาดการณ์"
        },
        description: {
            en: "See the future, gain Precognition buff for 1 turn.{5} With special effect, when the attack missed, you gain 1 order.{7} when used, roll a d20 + <LUKmod> if passed, gain 1 more turn of Precognition buff",
            th: "คาดการณ์อนาคต, ได้รับพระการันตี Precognition ของ 1 รอบ: การคาดการณ์: ศัตรูต� procon"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SeerSkillId"].ThreadSnip]: {
        name: {
            en: "Thread Snip",
            th: "ตัดลวดระนาบ"
        },
        description: {
            en: "Look into the planar thread and pulled it away from an enemy: Deal <FORMULA> to an enemy, roll D14 (-1 per skill level) dice. If passed, randomly steal 1 element from the enemy",
            th: "มองไปยังสายใยพลังพลานาบของศัตรู และตัดมันออก: สร้างความเสียหาย <FORMULA> ให้ศัตรู, ทอยลูกเต๋า D14 (-1 ต่อเลเวลสกิล). หากสำเร็จ, สุ่มคัดลอกธาตุหนึ่งจากศัตรู"
        },
        formula: "(1d4 + <CHAmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShamanSkillId"].ChaoticBlessing]: {
        name: {
            en: "Chaotic Blessing",
            th: "พรแห่งความยุ่งเหยิง"
        },
        description: {
            en: "Channel the chaotic forces of the planes, unleashing unpredictable energy.\n50% chance to deal <FORMULA> chaos damage to all enemies, or heal all allies for <FORMULA> HP.\n{5}\nHealed allies [r]roll DC10 WILsave[/r], if passed, [b]gain +1 chaos[/b].\nDamaged enemies [r]roll DC10 WILsave[/r], if failed, [r]lose 1 random resource[/r].{/}",
            th: "ควบคุมพลังแห่งระนาบที่ยุ่งเหยิง ปลดปล่อยพลังงานที่คาดเดาไม่ได้\n50% โอกาสสร้างความเสียหาย chaos <FORMULA> ให้ศัตรูทั้งหมด หรือรักษาพันธมิตรทั้งหมด <FORMULA> HP\n{5}\nพันธมิตรที่ได้รับการรักษา: ทอย [r]WILsave DC10[/r] หากสำเร็จ [b]ได้รับ +1 chaos[/b]\nศัตรูที่ถูกโจมตี: ทอย [r]WILsave DC10[/r] หากล้มเหลว [r]สูญเสียทรัพยากรแบบสุ่ม 1 หน่วย[/r]{/}"
        },
        formula: "{5}'1d8':'1d6'{/} + ((<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShamanSkillId"].HexOfRot]: {
        name: {
            en: "Hex of Rot",
            th: "คำสาปเน่าเปื่อย"
        },
        description: {
            en: "Channel chaos energy to cause visible decay and rot on your enemy.\nDeal <FORMULA> chaos damage.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r] or get <DebuffHexed> for 2 turns.",
            th: "ควบคุมพลังงาน chaos เพื่อทำให้เกิดการเน่าเปื่อยที่มองเห็นได้บนศัตรู\nสร้างความเสียหาย chaos <FORMULA>\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r] หรือถูก <DebuffHexed> เป็นเวลา 2 เทิร์น"
        },
        formula: "1d4 + <PlanarMod> + 0.5 × skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShamanSkillId"].HolyRattle]: {
        name: {
            en: "Holy Rattle",
            th: "กระดิ่งพระพรหม"
        },
        description: {
            en: "Channel order energy through resonance, creating visible healing waves that flow to your allies.\nGrants <FORMULA> random allies <BuffSpiritRattle> for {5}3:2{/} turns.\nCharacters with <BuffSpiritRattle> heal for 1d4 + <WILmod> at the start of their turn.",
            th: "ควบคุมพลังงาน order ผ่านการสั่นพ้อง สร้างคลื่นการรักษาที่มองเห็นได้ที่ไหลไปยังพันธมิตร\nให้ <FORMULA> พันธมิตรแบบสุ่ม <BuffSpiritRattle> เป็นเวลา {5}3:2{/} เทิร์น\nผู้ที่มี <BuffSpiritRattle> จะรักษาตัวเอง 1d4 + <WILmod> ที่เริ่มเทิร์น"
        },
        formula: "2-6 allies based on skill level"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShamanSkillId"].MendSpirit]: {
        name: {
            en: "Mend Spirit",
            th: "ช่อมจิตวิญญาณ"
        },
        description: {
            en: "Mend an ally's wounds with unstable spiritual energy that flows unpredictably.\nHeal a random injured ally for <FORMULA> HP.\nRoll D20: if 11+, [r]heal is halved[/r] and target [b]gains +1 chaos[/b] instead of full healing.",
            th: "ช่อมแผลของพันธมิตรด้วยพลังงานจิตที่ไม่เสถียรที่ไหลอย่างคาดเดาไม่ได้\nรักษาพันธมิตรที่บาดเจ็บแบบสุ่ม <FORMULA> HP\nทอย D20: หาก 11+ [r]การรักษาลดลงครึ่งหนึ่ง[/r] และเป้าหมาย [b]ได้รับ +1 chaos[/b] แทนการรักษาเต็มจำนวน"
        },
        formula: "(1d4 + <WILmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpellBladeSkillId"].EdgeBurst]: {
        name: {
            en: "Edge Burst",
            th: "ระเบิดขอบ"
        },
        description: {
            en: "Unleash all accumulated edge charges in a devastating burst of arcane energy.\nConsume ALL <BuffEdgeCharge> stacks (min 1).\nDeal <FORMULA> arcane damage.\nDamage increases with each edge charge consumed.",
            th: "ปลดปล่อย edge charge ที่สะสมไว้ทั้งหมดในระเบิดพลังงานอาร์เคนที่ทำลายล้าง\nใช้สแตค <BuffEdgeCharge> ทั้งหมด (อย่างน้อย 1)\nสร้างความเสียหายอาร์เคน <FORMULA>\nความเสียหายเพิ่มขึ้นตามจำนวน edge charge ที่ใช้"
        },
        formula: "(<WeaponDamage> or Planar Edge dice if no weapon) + <PlanarMod> + (1d2 per <BuffEdgeCharge> stack) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpellBladeSkillId"].PlanarEdge]: {
        name: {
            en: "Planar Edge",
            th: "ขอบแห่งระนาบ"
        },
        description: {
            en: "Channel planar energy into your weapon's edge, creating a blade of pure arcane power.\nDeal <FORMULA> arcane damage.\n[b]Gain 1 <BuffEdgeCharge>[/b] (max 5 stacks).\nThis skill Damage dice is based on weapon's physical damage dice or if you don't equip any weapon the damage dice will be (1d6, 1d6, 1d8, 1d8 or 2d4) based on skill level.",
            th: "ควบคุมพลังงานระนาบเข้าสู่ขอบอาวุธ สร้างใบมีดจากพลังอาร์เคนบริสุทธิ์\nสร้างความเสียหายอาร์เคน <FORMULA>\n[b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] (สูงสุด 5 สแตค)\nลูกเต๋าความเสียหายของสกิลนี้ขึ้นอยู่กับความเสียหายกายภาพของอาวุธที่ถือ แต่ถ้าหากไม่ได้ถืออาวุธอยู่ ลูกเต๋าความเสียหายจะเป็น (1d6, 1d6, 1d8, 1d8, 2d4) ขึ้นอยู่กับเลเวลของสกิล"
        },
        formula: "(Damage Dice + <PlanarMod> + <BuffEdgeCharge> stacks) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpellBladeSkillId"].SpellParry]: {
        name: {
            en: "Spell Parry",
            th: "ปัดเวท"
        },
        description: {
            en: "Weave a defensive barrier of planar energy that deflects incoming spells.\nGain <BuffSpellParry> for {5}2:1{/} turn.\nReduces next spell's damage by 5 + <INTmod>.\nIf attacked by a spell, [b]gain 1 <BuffEdgeCharge>[/b] (2 if 0 damage taken).\n{5}\n[b]Gain 1 <BuffEdgeCharge>[/b] when used.{/}",
            th: "ถักทอเกราะป้องกันจากพลังงานระนาบที่เบี่ยงเบนเวทมนตร์ที่เข้ามา\nได้รับ <BuffSpellParry> {5}2:1{/} เทิร์น\nลดความเสียหายเวทครั้งถัดไป 5 + <INTmod>\nหากถูกโจมตีด้วยเวท [b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] (2 สแตคหากไม่ได้รับความเสียหาย)\n{5}\n[b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] เมื่อใช้{/}"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpellBladeSkillId"].WindSlash]: {
        name: {
            en: "Wind Slash",
            th: "ฟันลม"
        },
        description: {
            en: "Slice through the air with a blade of wind-infused arcane energy.\nDeal <FORMULA> wind damage.\nTarget must [r]roll DC7 + <PlanarMod> ENDsave[/r] or get <DebuffBleed> for 1d2 turns.\n{5}\nIf <BuffEdgeCharge> stacks > 0, [r]deal +0.5 damage per stack[/r] (rounded down).{/}",
            th: "ฟันผ่านอากาศด้วยใบมีดพลังงานอาร์เคนที่ผสมลม\nสร้างความเสียหายลม <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC7 + <PlanarMod>[/r] หรือถูก <DebuffBleed> 1d2 เทิร์น\n{5}\nหากสแตค <BuffEdgeCharge> > 0 [r]สร้างความเสียหายเพิ่ม +0.5 ต่อสแตค[/r] (ปัดลง){/}"
        },
        formula: "Planar Edge damage × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarlockSkillId"].ChaosBolt]: {
        name: {
            en: "Chaos Bolt",
            th: "ลูกบอลวินาศ"
        },
        description: {
            en: "Hurl a bolt of pure chaotic energy that corrupts everything it touches.\nDeal <FORMULA> chaos damage.\nTarget must [r]roll DC8 + <PlanarMod> WILsave[/r] or get <DebuffHexed> for {5}'3':'2'{/} turns.",
            th: "ขว้างลูกบอลพลังงาน chaos บริสุทธิ์ที่ทำให้ทุกสิ่งที่สัมผัสเสื่อมสลาย\nสร้างความเสียหาย chaos <FORMULA>\nเป้าหมายต้องทอย [r]WILsave DC8 + <PlanarMod>[/r] หรือถูก <DebuffHexed> {5}'3':'2'{/} เทิร์น"
        },
        formula: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarlockSkillId"].Corruption]: {
        name: {
            en: "Corruption",
            th: "การเสื่อมสลาย"
        },
        description: {
            en: "Channel dark energy to corrupt your enemy's very essence.\nDeal <FORMULA> dark damage immediately.\nTarget must [r]roll DC10 + <ControlMod> ENDsave[/r] or get <DebuffCursed> for 3 turns and <DebuffHexed> for 2 turns.\n{5}\nAlso applies [r]2 stacks of <DebuffBurn>[/r].{/}",
            th: "ควบคุมพลังงานมืดเพื่อทำให้แก่นแท้ของศัตรูเสื่อมสลาย\nสร้างความเสียหายมืด <FORMULA> ทันที\nเป้าหมายต้องทอย [r]ENDsave DC10 + <ControlMod>[/r] หรือถูก <DebuffCursed> 3 เทิร์น และ <DebuffHexed> 2 เทิร์น\n{5}\nยังเพิ่ม [r]<DebuffBurn> 2 สแตค[/r] ด้วย{/}"
        },
        formula: "1d4 + <PlanarMod>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarlockSkillId"].DarkPact]: {
        name: {
            en: "Darkness Overcharge",
            th: "วินาศกรรมมืด"
        },
        description: {
            en: "Sacrifice your own vitality to unleash overwhelming dark power.\nSacrifice {7}'8':'10'{/} HP to deal <FORMULA> [r]true dark damage[/r] that bypasses all defenses.",
            th: "เสียสละพลังชีวิตของตัวเองเพื่อปลดปล่อยพลังมืดที่ล้นเกิน\nเสียสละ {7}'8':'10'{/} HP เพื่อสร้างความเสียหายมืดแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]"
        },
        formula: "(2d10 + (2 × <PlanarMod>)) × (1 + 0.15 × skill level) {7}+'1d6' extra damage{/}"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarlockSkillId"].LifeDrain]: {
        name: {
            en: "Life Drain",
            th: "ดูดชีวิต"
        },
        description: {
            en: "Drain the very life force from your enemy, converting their vitality into your own.\nDeal <FORMULA> erosion damage.\n[b]Heal yourself[/b] for {5}'75%':'50%'{/} + <VITmod>/10 of damage dealt.",
            th: "ดูดพลังชีวิตจากศัตรู แปลงพลังชีวิตของพวกเขาเป็นของคุณเอง\nสร้างความเสียหายกัดกร่อน <FORMULA>\n[b]ฟื้นฟูตัวเอง[/b] {5}'75%':'50%'{/} + <VITmod>/10 ของความเสียหายที่สร้าง"
        },
        formula: "{5}'1d10':'1d8'{/} + <PlanarMod> + <WILmod>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarriorSkillId"].Cleave]: {
        name: {
            en: "Cleave",
            th: "ฟันกวาด"
        },
        description: {
            en: "Swing your weapon in a wide arc, cutting through all enemies in the front row.\nDeal <FORMULA> damage to all enemies in the front row.",
            th: "ฟันอาวุธในวงกว้าง ตัดผ่านศัตรูทั้งหมดในแถวหน้า\nสร้างความเสียหาย <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า"
        },
        formula: "({5}'1.2':'1.0'{/} × <WeaponDamage>) × <SkillLevelMultiplier> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarriorSkillId"].PowerStrike]: {
        name: {
            en: "Power Strike",
            th: "โจมตีแรง"
        },
        description: {
            en: "Channel all your strength into a single devastating strike.\nDeal <FORMULA> damage.",
            th: "ควบคุมพลังทั้งหมดของคุณเข้าสู่การโจมตีครั้งเดียวที่ทำลายล้าง\nสร้างความเสียหาย <FORMULA>"
        },
        formula: "({5}'1.5':'1.3'{/} × <WeaponDamage>) × <SkillLevelMultiplier> × <MeleeRangePenalty>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarriorSkillId"].WarCry]: {
        name: {
            en: "War Cry",
            th: "เสียงร้องศึก"
        },
        description: {
            en: "Let out a mighty battle cry that inspires you and your allies to fight harder.\nAffects yourself + <LEADmod> closest allies.\nGain <BuffWarCry> for {5}'3':'2'{/} turns.",
            th: "เปล่งเสียงร้องศึกที่ยิ่งใหญ่ที่ปลุกใจคุณและพันธมิตรให้ต่อสู้อย่างหนักขึ้น\nส่งผลต่อตัวเอง + <LEADmod> พันธมิตรที่ใกล้ที่สุด\nได้รับ <BuffWarCry> {5}'3':'2'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WitchSkillId"].Bewitch]: {
        name: {
            en: "Bewitch",
            th: "สะกดจิต"
        },
        description: {
            en: "Weave a subtle charm that clouds your enemy's judgment and makes them see you as an ally.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r].\nIf failed, target gets <BuffCharm> for {5}'2':'1'{/} turn.",
            th: "ถักทอเสน่ห์ที่ทำให้จิตใจของศัตรูมืดมัวและทำให้พวกเขาเห็นคุณเป็นพันธมิตร\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r]\nหากล้มเหลว เป้าหมายได้รับ <BuffCharm> {5}'2':'1'{/} เทิร์น"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WitchSkillId"].ChaosBinding]: {
        name: {
            en: "Chaos Binding",
            th: "ตุ๊กตาสาป"
        },
        description: {
            en: "Channel chaos energy into your enemy, creating a visible binding that causes ongoing corruption.\nDeal <FORMULA> dark damage immediately.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r] or get <DebuffHexed> for {5}'3':'2'{/} turns.\n{5}\nAlso applies <DebuffCursed> for 2 turns.{/}",
            th: "ควบคุมพลังงาน chaos เข้าสู่ศัตรู สร้างพันธะที่มองเห็นได้ที่ทำให้เกิดการเสื่อมสลายต่อเนื่อง\nสร้างความเสียหายมืด <FORMULA> ทันที\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r] หรือถูก <DebuffHexed> {5}'3':'2'{/} เทิร์น\n{5}\nยังเพิ่ม <DebuffCursed> 2 เทิร์นด้วย{/}"
        },
        formula: "(1d4 + <INTmod>) × <SkillLevelMultiplier>"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WitchSkillId"].ChaosBrand]: {
        name: {
            en: "Chaos Brand",
            th: "ประจุวินาที"
        },
        description: {
            en: "Brand your enemy with visible chaos energy that exposes their weaknesses for all to see.\nTarget gets <DebuffExposed> for {5}'3':'2'{/} turns.\nMarked enemies take [r]+1d3 damage from all sources[/r].\n{5}\nAlso reduces their [r]critical defense by 2[/r].{/}\n[b]You gain +floor(<INTmod> / 2) hit[/b] against marked enemies.",
            th: "ประทับตราพลังงาน chaos ที่มองเห็นได้บนศัตรู เปิดเผยจุดอ่อนของพวกเขาต่อทุกคน\nเป้าหมายได้รับ <DebuffExposed> {5}'3':'2'{/} เทิร์น\nศัตรูที่ถูกประทับตราจะรับ [r]ความเสียหายเพิ่ม +1d3 จากทุกแหล่ง[/r]\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}\n[b]คุณได้รับ +floor(<INTmod> / 2) hit[/b] ต่อศัตรูที่ถูกประทับตรา"
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WitchSkillId"].PoisonDart]: {
        name: {
            en: "Poison Dart",
            th: "ลูกบอลคำสาป"
        },
        description: {
            en: "Launch a small magical dart tipped with potent poison that seeps through all defenses.\nDeal <FORMULA> [r]true poison damage[/r] that bypasses all defenses.\nTarget must [r]roll DC6 + <ControlMod> ENDsave[/r] or get <DebuffPoisoned> for {5}'3':'2'{/} turns.",
            th: "ขว้างลูกดอกเวทมนตร์เล็กๆ ที่มีปลายอาบยาพิษที่ซึมผ่านการป้องกันทั้งหมด\nสร้างความเสียหายพิษแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nเป้าหมายต้องทอย [r]ENDsave DC6 + <ControlMod>[/r] หรือถูก <DebuffPoisoned> {5}'3':'2'{/} เทิร์น"
        },
        formula: "({5}'1d4':'1d3'{/} + <INTmod>) × <SkillLevelMultiplier>"
    }
};
}),
"[project]/workspace/MyProject/Client/webapp/src/utils/textRenderer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Text Renderer for L10N Markup
 * Reusable text parsing logic for rendering L10N text with markup.
 * Extracted from text-visualizer project.
 */ /**
 * Character stats interface
 */ __turbopack_context__.s([
    "escapeHtml",
    ()=>escapeHtml,
    "getStatColor",
    ()=>getStatColor,
    "renderFormula",
    ()=>renderFormula,
    "renderText",
    ()=>renderText
]);
function renderText(text, options = {}) {
    const { skillLevel = 0, formula = null, counter = 0, isSkill = false, character = null, l10nData = null, currentLanguage = 'en', renderBuffDebuffTooltip = null } = options;
    if (!text) return '';
    let rendered = text;
    // IMPORTANT: Process conditionals BEFORE converting \n to <br> and BEFORE color tags
    // This handles cases like {5}\n text{/} and [b]{5}'value':'value'{/}[/b]
    // Format 1: {n}'value_if_n+':'value_if_below'{/} - Ternary conditional
    // Example: {5}'three':'two'{/} shows "three" if level >= 5, "two" otherwise
    rendered = rendered.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot)=>{
        const levelThreshold = parseInt(level);
        if (isSkill && skillLevel >= levelThreshold) {
            return valueIfMet;
        }
        return valueIfNot;
    });
    // Format 2: {n}text{/} - Direct conditional (show if level >= n)
    // Use [\s\S] to match any character including newlines
    rendered = rendered.replace(/\{(\d+)\}([\s\S]*?)\{\/\}/g, (match, level, content)=>{
        const levelThreshold = parseInt(level);
        if (isSkill && skillLevel >= levelThreshold) {
            // Trim leading/trailing whitespace/newlines to avoid empty lines
            return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
        }
        return '';
    });
    // Counter conditionals: {COUNTER>=1}text{/}
    rendered = rendered.replace(/\{COUNTER>=(\d+)\}([\s\S]*?)\{\/\}/g, (match, threshold, content)=>{
        if (counter >= parseInt(threshold)) {
            return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
        }
        return '';
    });
    // Counter conditionals: {COUNTER===1}text{/}
    rendered = rendered.replace(/\{COUNTER===(\d+)\}([\s\S]*?)\{\/\}/g, (match, value, content)=>{
        if (counter === parseInt(value)) {
            return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
        }
        return '';
    });
    // Replace <FORMULA> with actual rendered formula (after conditionals are processed)
    // Options can control whether to use capsule styling or plain text
    const useFormulaCapsule = options.useFormulaCapsule !== false; // Default to true for backwards compatibility
    if (formula) {
        const renderedFormula = renderFormula(formula, {
            counter,
            skillLevel,
            character,
            showValues: true
        });
        if (useFormulaCapsule) {
            rendered = rendered.replace(/<FORMULA>/g, `<span class="formula-capsule">${escapeHtml(renderedFormula)}</span>`);
        } else {
            rendered = rendered.replace(/<FORMULA>/g, escapeHtml(renderedFormula));
        }
    } else {
        // If no formula provided, just remove <FORMULA> tag
        rendered = rendered.replace(/<FORMULA>/g, '');
    }
    // Color tags: [r]text[/r] = red, [g]text[/g] = green, [b]text[/b] = blue
    rendered = rendered.replace(/\[r\](.*?)\[\/r\]/g, '<span style="color: #e74c3c; font-weight: 600;">$1</span>');
    rendered = rendered.replace(/\[g\](.*?)\[\/g\]/g, '<span style="color: #27ae60; font-weight: 600;">$1</span>');
    rendered = rendered.replace(/\[b\](.*?)\[\/b\]/g, '<span style="color: #3498db; font-weight: 600;">$1</span>');
    // Bold: [bold]text[/bold]
    rendered = rendered.replace(/\[bold\](.*?)\[\/bold\]/g, '<span style="font-weight: 700;">$1</span>');
    // Buff tags: <BuffName> - simplified for now (just show name)
    if (l10nData && character && renderBuffDebuffTooltip) {
        rendered = rendered.replace(/<Buff(\w+)>/g, (match, buffName)=>{
            const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
            const buffData = l10nData.buffs?.[buffId];
            if (buffData) {
                const activeBuff = character.buffs?.find((b)=>b.id === buffId);
                const buffCounter = activeBuff ? activeBuff.counter : 0;
                const renderedDescription = renderText(buffData.description[currentLanguage] || '', {
                    skillLevel: 0,
                    formula: null,
                    counter: buffCounter,
                    isSkill: false,
                    character,
                    l10nData,
                    currentLanguage,
                    renderBuffDebuffTooltip
                });
                return renderBuffDebuffTooltip('buff', buffId, buffData.name[currentLanguage] || buffId, renderedDescription);
            }
            return match;
        });
        // Debuff tags: <DebuffName> - simplified for now (just show name)
        rendered = rendered.replace(/<Debuff(\w+)>/g, (match, debuffName)=>{
            const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
            const debuffData = l10nData.debuffs?.[debuffId];
            if (debuffData) {
                const activeDebuff = character.debuffs?.find((d)=>d.id === debuffId);
                const debuffCounter = activeDebuff ? activeDebuff.counter : 0;
                const renderedDescription = renderText(debuffData.description[currentLanguage] || '', {
                    skillLevel: 0,
                    formula: null,
                    counter: debuffCounter,
                    isSkill: false,
                    character,
                    l10nData,
                    currentLanguage,
                    renderBuffDebuffTooltip
                });
                return renderBuffDebuffTooltip('debuff', debuffId, debuffData.name[currentLanguage] || debuffId, renderedDescription);
            }
            return match;
        });
    } else {
        // Simple fallback: just remove the tags and show text
        rendered = rendered.replace(/<Buff(\w+)>/g, (match, buffName)=>{
            const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
            return `<span style="background: #d4edda; color: #155724; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(buffId)}</span>`;
        });
        rendered = rendered.replace(/<Debuff(\w+)>/g, (match, debuffName)=>{
            const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
            return `<span style="background: #f8d7da; color: #721c24; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(debuffId)}</span>`;
        });
    }
    // Stat modifiers: <STRmod>, <DEXmod>, etc. - show number with color
    if (character && character.stats) {
        rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName)=>{
            const stat = statName.toLowerCase();
            const statValue = character.stats?.[stat] || 10;
            const mod = Math.floor((statValue - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            const statColor = getStatColor(stat);
            return `<span style="color: ${statColor}; font-weight: 600;">${modStr}</span>`;
        });
        // Save modifiers: <CONsave>, <STRsave>, etc.
        rendered = rendered.replace(/<(\w+)save>/gi, (match, statName)=>{
            const stat = statName.toLowerCase();
            const statValue = character.stats?.[stat] || 10;
            const mod = Math.floor((statValue - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${statName.toUpperCase()}save (${modStr})</span>`;
        });
        // Weapon damage: <WeaponDamage>
        rendered = rendered.replace(/<WeaponDamage>/g, ()=>{
            return `<span style="font-weight: 600;">${character.weaponDamage || 0}</span>`;
        });
        // Skill level multiplier: <SkillLevelMultiplier>
        rendered = rendered.replace(/<SkillLevelMultiplier>/gi, ()=>{
            if (isSkill && skillLevel > 0) {
                const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
                return `<span style="font-weight: 600;">${multiplier}×</span>`;
            }
            return '<span style="font-weight: 600;">skill level multiplier</span>';
        });
        // Melee range penalty: <MeleeRangePenalty>
        rendered = rendered.replace(/<MeleeRangePenalty>/gi, ()=>{
            return `<span style="font-weight: 600;">RangeModifier</span>`;
        });
        // Control mod: <ControlMod>
        rendered = rendered.replace(/<ControlMod>/gi, ()=>{
            const mod = Math.floor((character.stats?.control || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        // Planar mod: <PlanarMod>
        rendered = rendered.replace(/<PlanarMod>/gi, ()=>{
            const intMod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
            const chaMod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
            const planarMod = Math.max(intMod, chaMod);
            const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        // VITmod, WILmod, etc.
        rendered = rendered.replace(/<VITmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.vitality || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        rendered = rendered.replace(/<WILmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.willpower || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        rendered = rendered.replace(/<CHAmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        rendered = rendered.replace(/<INTmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        rendered = rendered.replace(/<DEXmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.dexterity || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
        rendered = rendered.replace(/<STRmod>/gi, ()=>{
            const mod = Math.floor((character.stats?.strength || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return `<span style="font-weight: 600;">${modStr}</span>`;
        });
    } else {
        // Fallback: just remove the tags if no character stats
        rendered = rendered.replace(/<(\w+)mod>/gi, '+0');
        rendered = rendered.replace(/<(\w+)save>/gi, 'save');
        rendered = rendered.replace(/<WeaponDamage>/g, 'weapon damage');
        rendered = rendered.replace(/<SkillLevelMultiplier>/gi, 'skill multiplier');
        rendered = rendered.replace(/<MeleeRangePenalty>/gi, 'range modifier');
        rendered = rendered.replace(/<ControlMod>/gi, '+0');
        rendered = rendered.replace(/<PlanarMod>/gi, '+0');
    }
    // Counter: <COUNTER> - show actual value
    rendered = rendered.replace(/<COUNTER>/g, counter.toString());
    // Convert newlines to <br> (AFTER all conditionals are processed)
    rendered = rendered.replace(/\n/g, '<br>');
    return rendered;
}
function renderFormula(formula, options = {}) {
    const { counter = 0, skillLevel = 0, character = null, showValues = false } = options;
    if (!formula) return '';
    let rendered = formula;
    // Process conditionals in formula: {n}'value_if_n+':'value_if_below'{/}
    rendered = rendered.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot)=>{
        const levelThreshold = parseInt(level);
        if (skillLevel >= levelThreshold) {
            return valueIfMet;
        }
        return valueIfNot;
    });
    if (showValues && character && character.stats) {
        // Replace placeholders with actual values
        rendered = rendered.replace(/<COUNTER>/g, counter.toString());
        // Stat modifiers
        rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName)=>{
            const stat = statName.toLowerCase();
            const statValue = character.stats?.[stat] || 10;
            const mod = Math.floor((statValue - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return modStr;
        });
        // Weapon damage
        rendered = rendered.replace(/<WeaponDamage>/g, ()=>{
            return String(character.weaponDamage || 0);
        });
        // Skill level multiplier
        rendered = rendered.replace(/<SkillLevelMultiplier>/gi, ()=>{
            if (skillLevel > 0) {
                const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
                return `${multiplier}×`;
            }
            return '1.0×';
        });
        // Control mod
        rendered = rendered.replace(/<ControlMod>/gi, ()=>{
            const mod = Math.floor((character.stats?.control || 10 - 10) / 2);
            const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
            return modStr;
        });
        // Planar mod
        rendered = rendered.replace(/<PlanarMod>/gi, ()=>{
            const intMod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
            const chaMod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
            const planarMod = Math.max(intMod, chaMod);
            const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
            return modStr;
        });
        // Melee range penalty
        rendered = rendered.replace(/<MeleeRangePenalty>/gi, ()=>{
            return 'RangeModifier';
        });
    }
    return rendered;
}
function getStatColor(stat) {
    const statColors = {
        strength: '#e74c3c',
        dexterity: '#3498db',
        willpower: '#9b59b6',
        charisma: '#e67e22',
        intelligence: '#1abc9c',
        control: '#f39c12',
        vitality: '#16a085',
        luck: '#e91e63',
        planar: '#9b59b6',
        leadership: '#e67e22',
        endurance: '#16a085',
        agility: '#3498db'
    };
    return statColors[stat.toLowerCase()] || '#34495e'; // Dark gray default
}
function escapeHtml(text) {
    if (typeof document !== 'undefined') {
        // Client-side: use DOM API
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    // Server-side fallback: manual escaping
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
}),
"[project]/workspace/MyProject/Client/webapp/src/utils/TextRenderer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * React component wrapper for rendering L10N text with markup
 */ __turbopack_context__.s([
    "TextRenderer",
    ()=>TextRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$utils$2f$textRenderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/utils/textRenderer.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const TextRenderer = ({ text, options = {}, variant = "body2", component = "div", sx })=>{
    if (!text) return null;
    const renderedHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$utils$2f$textRenderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderText"])(text, options);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
        variant: variant,
        component: component,
        sx: {
            ...sx,
            "& .formula-capsule": {
                display: "inline-block",
                padding: "2px 8px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "inherit",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.9em",
                margin: "0 2px",
                fontFamily: "monospace"
            }
        },
        dangerouslySetInnerHTML: {
            __html: renderedHtml
        }
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/utils/TextRenderer.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CharacterCreationView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/TextField/TextField.js [app-ssr] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Alert/Alert.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/ArrowBack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateBefore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NavigateBefore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NavigateNext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PersonAdd.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$useCharacterCreationLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/character-creation/useCharacterCreationLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skills$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skills.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$utils$2f$TextRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/utils/TextRenderer.tsx [app-ssr] (ecmascript)");
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
;
;
// Helper function to get skill L10N by mapping skill name + class to enum value
// This function searches across all skill enum types since skills are stored by their enum value (not class prefix)
function getSkillL10N(skillId, classValue, language = "en") {
    try {
        // Map class name to enum type for context (but we'll search all enums)
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
        // First, try to get the enum type for the class
        const normalizedClass = classValue.charAt(0).toUpperCase() + classValue.slice(1);
        const enumTypeName = classEnumMap[classValue] || classEnumMap[normalizedClass];
        // Try to get the skill from the class-specific enum first
        if (enumTypeName) {
            const enumType = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[enumTypeName];
            if (enumType) {
                const enumValue = enumType[skillId];
                if (enumValue) {
                    const skillData = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skills$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skillsL10N"][enumValue];
                    if (skillData) {
                        return {
                            name: skillData.name?.[language] || skillData.name?.en || skillId,
                            description: skillData.description?.[language] || skillData.description?.en || "",
                            formula: skillData.formula
                        };
                    }
                }
            }
        }
        // If not found in class-specific enum, search all skill enums
        // This handles cases where the skill might be in a different enum
        const allEnumNames = [
            "BasicSkillId",
            "MobSkillId",
            "ClericSkillId",
            "SeerSkillId",
            "ScholarSkillId",
            "MageSkillId",
            "MysticSkillId",
            "RogueSkillId",
            "SpellBladeSkillId",
            "ShamanSkillId",
            "BarbarianSkillId",
            "WarriorSkillId",
            "KnightSkillId",
            "GuardianSkillId",
            "PaladinSkillId",
            "DruidSkillId",
            "MonkSkillId",
            "WarlockSkillId",
            "DuelistSkillId",
            "WitchSkillId",
            "InquisitorSkillId",
            "EngineerSkillId",
            "NomadSkillId"
        ];
        for (const enumName of allEnumNames){
            const enumType = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[enumName];
            if (enumType) {
                const enumValue = enumType[skillId];
                if (enumValue) {
                    const skillData = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skills$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skillsL10N"][enumValue];
                    if (skillData) {
                        return {
                            name: skillData.name?.[language] || skillData.name?.en || skillId,
                            description: skillData.description?.[language] || skillData.description?.en || "",
                            formula: skillData.formula
                        };
                    }
                }
            }
        }
        // If still not found, the skill doesn't exist in L10N
        return null;
    } catch (error) {
        // L10N files not available yet or import failed
        console.warn(`Failed to get skill L10N for ${skillId} (${classValue}):`, error);
        return null;
    }
}
const CharacterCreationContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        minHeight: "100vh",
        background: `var(--gradient-mystical)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    }));
const CharacterCreationPaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        maxWidth: "800px",
        width: "90vw",
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        boxShadow: `var(--shadow-mystical)`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
    }));
const TitleBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        textAlign: "center",
        marginBottom: theme.spacing(4)
    }));
const FormSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        marginBottom: theme.spacing(3)
    }));
const SectionTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        marginBottom: theme.spacing(2),
        fontWeight: 600,
        color: theme.palette.primary.main
    }));
const GenderToggleBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }));
const GenderButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"])(({ theme, active })=>({
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
const PortraitBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }));
const PortraitPlaceholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
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
const DescriptionBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[50],
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(1),
        minHeight: 60,
        display: "flex",
        alignItems: "center"
    }));
const ActionButtons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        gap: theme.spacing(2),
        marginTop: theme.spacing(4),
        justifyContent: "space-between"
    }));
// Helper function to get localized name with fallback
const getLocalizedRaceName = (t, raceId)=>{
    const raceKey = raceId.toLowerCase();
    try {
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.races[raceKey]?.name || {
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
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.races[raceKey]?.description || {
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
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.classes[classKey]?.name || {
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
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.classes[classKey]?.description || {
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
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.backgrounds[backgroundKey]?.name || {
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
        return t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].character.backgrounds[backgroundKey]?.description || {
            en: `A ${backgroundId} background`,
            th: `ภูมิหลัง${backgroundId}`
        });
    } catch  {
        return `A ${backgroundId} background`;
    }
};
function CharacterCreationView() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocalization"])();
    const { isLoading, isFetchingMetadata, error, nameCheckMessage, metadata, stats, formData, portraitIndex, updateField, updatePortraitIndex, createCharacter, isFormValid, getAvailablePortraits } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$character$2d$creation$2f$useCharacterCreationLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCharacterCreationLogic"])();
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    p: 4,
                    textAlign: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            mt: 2
                        },
                        children: "Loading character creation options..."
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 307,
            columnNumber: 7
        }, this);
    }
    if (!metadata) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    p: 4,
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    severity: "error",
                    children: "Failed to load character creation options. Please refresh the page."
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 320,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                lineNumber: 319,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 318,
            columnNumber: 7
        }, this);
    }
    const availablePortraits = getAvailablePortraits();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationContainer, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: 'flex',
                gap: 3,
                width: '100%',
                maxWidth: '1400px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCreationPaper, {
                    elevation: 8,
                    sx: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleBox, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h3",
                                component: "h1",
                                gutterBottom: true,
                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.title)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 333,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 332,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                                variant: "h6",
                                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.name)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                fullWidth: true,
                                                variant: "outlined",
                                                placeholder: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.namePlaceholder),
                                                value: formData.name,
                                                onChange: (e)=>updateField("name", e.target.value),
                                                onKeyPress: handleKeyPress,
                                                inputProps: {
                                                    maxLength: 20
                                                },
                                                error: formData.name.length > 20 || formData.name.length > 0 && formData.name.length < 3,
                                                helperText: formData.name.length > 20 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTooLong) : formData.name.length > 0 && formData.name.length < 3 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameMinLength) : formData.name.length > 0 && !/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(formData.name) ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameInvalidChars) : formData.name.length === 0 ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.nameTooShort) : ""
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 344,
                                                columnNumber: 17
                                            }, this),
                                            nameCheckMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: nameCheckMessage.includes("available") ? "success.main" : "error.main",
                                                sx: {
                                                    mt: 1,
                                                    display: "block"
                                                },
                                                children: nameCheckMessage
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 342,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                                variant: "h6",
                                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.portrait)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PortraitBox, {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                        onClick: ()=>updatePortraitIndex("prev"),
                                                        disabled: isLoading || availablePortraits.length === 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateBefore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PortraitPlaceholder, {
                                                        children: formData.portrait || "No portrait"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                        onClick: ()=>updatePortraitIndex("next"),
                                                        disabled: isLoading || availablePortraits.length === 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NavigateNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.gender)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderToggleBox, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderButton, {
                                            active: formData.gender === "MALE",
                                            onClick: ()=>updateField("gender", "MALE"),
                                            disabled: isLoading,
                                            children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.male)
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 404,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GenderButton, {
                                            active: formData.gender === "FEMALE",
                                            onClick: ()=>updateField("gender", "FEMALE"),
                                            disabled: isLoading,
                                            children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.female)
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 411,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.race)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.races.map((race)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedRaceName(t, race.id),
                                            onClick: ()=>updateField("race", race.id),
                                            color: formData.race === race.id ? "primary" : "default",
                                            variant: formData.race === race.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, race.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                formData.race && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedRaceDescription(t, formData.race)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 438,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 437,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.class)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.classes.map((classItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedClassName(t, classItem.id),
                                            onClick: ()=>updateField("class", classItem.id),
                                            color: formData.class === classItem.id ? "primary" : "default",
                                            variant: formData.class === classItem.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, classItem.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 448,
                                    columnNumber: 13
                                }, this),
                                formData.class && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedClassDescription(t, formData.class)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 462,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 461,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 446,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                    variant: "h6",
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.background)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    useFlexGap: true,
                                    children: metadata.backgrounds.map((background)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                            label: getLocalizedBackgroundName(t, background.id),
                                            onClick: ()=>updateField("background", background.id),
                                            color: formData.background === background.id ? "primary" : "default",
                                            variant: formData.background === background.id ? "filled" : "outlined",
                                            sx: {
                                                marginBottom: 1
                                            }
                                        }, background.id, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                            lineNumber: 474,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                formData.background && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DescriptionBox, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        color: "text.secondary",
                                        children: getLocalizedBackgroundDescription(t, formData.background)
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 486,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 485,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            severity: "error",
                            sx: {
                                mb: 2
                            },
                            children: typeof error === "string" ? error : t(error)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionButtons, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "outlined",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 504,
                                        columnNumber: 26
                                    }, void 0),
                                    onClick: handleBackToTitle,
                                    disabled: isLoading,
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.backToTitle)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 502,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "contained",
                                    size: "large",
                                    onClick: handleCreateCharacter,
                                    disabled: !isFormValid() || isLoading,
                                    startIcon: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                        size: 20,
                                        color: "inherit"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 515,
                                        columnNumber: 38
                                    }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 515,
                                        columnNumber: 87
                                    }, void 0),
                                    children: isLoading ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.creating) : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].characterCreation.createCharacter)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                    elevation: 8,
                    sx: {
                        width: '400px',
                        maxHeight: '95vh',
                        overflow: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                gutterBottom: true,
                                sx: {
                                    color: 'primary.main',
                                    fontWeight: 'bold'
                                },
                                children: "Character Stats"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                sx: {
                                    mb: 3
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 528,
                                columnNumber: 13
                            }, this),
                            stats && formData.race && formData.class && formData.background ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Vitals"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 534,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "HP: ",
                                                            stats.vitals.maxHP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "SP: ",
                                                            stats.vitals.maxSP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "MP: ",
                                                            stats.vitals.maxMP
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            "Planar Aptitude: ",
                                                            stats.vitals.planarAptitude
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 535,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 533,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 543,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Attributes"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 547,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.attributes).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base,
                                                            value.bonus !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: value.bonus > 0 ? 'green' : 'red'
                                                                },
                                                                children: value.bonus > 0 ? ` +${value.bonus}` : ` ${value.bonus}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 548,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 546,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 562,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Proficiencies"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 566,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.proficiencies).filter(([_, value])=>value.base > 8) // Only show proficiencies > 8
                                                .map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 565,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 578,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Artisan Skills"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 582,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 0.5
                                                },
                                                children: Object.entries(stats.artisans).filter(([_, value])=>value.base > 8) // Only show artisan skills > 8
                                                .map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        children: [
                                                            key.charAt(0).toUpperCase() + key.slice(1),
                                                            ": ",
                                                            value.base
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 583,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 581,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        sx: {
                                            my: 2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 594,
                                        columnNumber: 17
                                    }, this),
                                    stats.startingSkills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    mb: 3
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "subtitle1",
                                                        sx: {
                                                            fontWeight: 'bold',
                                                            mb: 1
                                                        },
                                                        children: "Starting Skills"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1.5
                                                        },
                                                        children: stats.startingSkills.map((skillId)=>{
                                                            const skillL10N = getSkillL10N(skillId, formData.class, language || "en");
                                                            if (!skillL10N) {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                            variant: "body2",
                                                                            sx: {
                                                                                fontWeight: 'medium'
                                                                            },
                                                                            children: skillId
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                            lineNumber: 607,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                                            lineNumber: 610,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, skillId, true, {
                                                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 31
                                                                }, this);
                                                            }
                                                            // Render description with text parser
                                                            // useFormulaCapsule: false means formulas render as plain text (no border/capsule)
                                                            const renderOptions = {
                                                                skillLevel: 1,
                                                                formula: skillL10N.formula || null,
                                                                counter: 0,
                                                                isSkill: true,
                                                                character: null,
                                                                l10nData: null,
                                                                currentLanguage: language || "en",
                                                                renderBuffDebuffTooltip: null,
                                                                useFormulaCapsule: false
                                                            };
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            fontWeight: 'medium',
                                                                            mb: 0.5
                                                                        },
                                                                        children: skillL10N.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                        lineNumber: 633,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$utils$2f$TextRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextRenderer"], {
                                                                        text: skillL10N.description,
                                                                        options: renderOptions,
                                                                        variant: "caption",
                                                                        component: "div",
                                                                        sx: {
                                                                            color: "text.secondary",
                                                                            fontStyle: 'italic',
                                                                            lineHeight: 1.6
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                        lineNumber: 636,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, skillId, true, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 599,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 2
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 652,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    stats.startingEquipments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                },
                                                children: "Starting Equipment"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 659,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1
                                                },
                                                children: stats.startingEquipments.map((equip, index)=>{
                                                    // Format slot name for display
                                                    const slotName = equip.slot.replace(/([A-Z])/g, ' $1').replace(/^./, (str)=>str.toUpperCase()).trim();
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                                lineNumber: 669,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                color: "text.secondary",
                                                                sx: {
                                                                    fontStyle: 'italic'
                                                                },
                                                                children: "Equipment description not available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                                lineNumber: 672,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, `${equip.slot}-${index}`, true, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                                lineNumber: 660,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                        lineNumber: 658,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 531,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                color: "text.secondary",
                                children: "Select race, class, and background to see stats preview."
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                                lineNumber: 684,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                        lineNumber: 524,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
                    lineNumber: 523,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
            lineNumber: 330,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/character-creation/CharacterCreationView.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__025e2423._.js.map