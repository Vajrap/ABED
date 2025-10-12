import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { mapPartyToInterface } from "../../Utils/PartyMapper";
import { mapCharacterToInterface } from "../../Utils/CharacterMapper";

export const partyRoutes = express.Router();

// GET /api/party/user - Get current user's party
partyRoutes.get("/user", async (req: Request, res: Response) => {
  console.log("🔥 USER PARTY ROUTE HIT!");
  Report.info("User party request received");

  try {
    // 1. Validate session
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    const user = await SessionService.validateSession(token);
    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    Report.info(`Fetching party for user: ${user.username} (${user.id})`);

    // 2. Get character from in-memory manager
    const character = characterManager.getUserCharacterByUserId(user.id);
    if (!character) {
      Report.error(`Character not found for user ${user.id}`);
      return res.json({ success: false, messageKey: "character.notFound" });
    }

    Report.info(`Character found: ${character.name} (${character.id})`);

    // 3. Get party from in-memory manager
    if (!character.partyID) {
      Report.error(`Character ${character.id} has no partyID`);
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    const party = partyManager.getPartyByID(character.partyID);
    if (!party) {
      Report.error(`Party not found for partyID ${character.partyID}`);
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    Report.info(`Party found: ${party.partyID} at ${party.location}`);

    // 4. Map to frontend interface (includes all character data)
    const partyInterface = mapPartyToInterface(party);

    Report.info(`Successfully returning party with all character data for ${user.username}`);

    // 5. Return party with all character data
    return res.json({
      success: true,
      party: partyInterface
    });
  } catch (error) {
    Report.error(`User party fetch error: ${error}`);
    return res.json({ success: false, messageKey: "party.fetchFailed" });
  }
});

// GET /api/party/:partyId - Get any party by ID (admin/debug)
partyRoutes.get("/:partyId", async (req: Request, res: Response) => {
  console.log("🔥 PARTY BY ID ROUTE HIT!");
  Report.info(`Party by ID request: ${req.params.partyId}`);

  try {
    const { partyId } = req.params;

    if (!partyId) {
      return res.json({ success: false, messageKey: "party.invalidId" });
    }

    // Get party from in-memory manager
    const party = partyManager.getPartyByID(partyId);
    if (!party) {
      Report.error(`Party not found for ID ${partyId}`);
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    Report.info(`Party found: ${party.partyID} at ${party.location}`);

    // Map to frontend interface (includes all character data)
    const partyInterface = mapPartyToInterface(party);

    Report.info(`Successfully returning party ${partyId}`);

    return res.json({
      success: true,
      party: partyInterface
    });
  } catch (error) {
    Report.error(`Party by ID fetch error: ${error}`);
    return res.json({ success: false, messageKey: "party.fetchFailed" });
  }
});

