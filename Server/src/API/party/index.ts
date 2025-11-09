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
  Report.debug("User party request received", {
    route: "/party/user",
    ip: req.ip,
  });

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

    // 2. Get character from in-memory manager
    const character = characterManager.getUserCharacterByUserId(user.id);
    if (!character) {
      Report.warn("Character not found for user", { userId: user.id });
      return res.json({ success: false, messageKey: "character.notFound" });
    }

    // 3. Get party from in-memory manager
    if (!character.partyID) {
      Report.warn("Character has no party ID", { characterId: character.id });
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    const party = partyManager.getPartyByID(character.partyID);
    if (!party) {
      Report.warn("Party not found for character", {
        characterId: character.id,
        partyId: character.partyID,
      });
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    // 4. Map to frontend interface (includes all character data)
    const partyInterface = mapPartyToInterface(party);

    Report.info("Returning party for user", {
      userId: user.id,
      username: user.username,
      partyId: party.partyID,
      location: party.location,
    });

    // 5. Return party with all character data
    return res.json({
      success: true,
      party: partyInterface
    });
  } catch (error) {
    Report.error("User party fetch error", {
      error,
      ip: req.ip,
    });
    return res.json({ success: false, messageKey: "party.fetchFailed" });
  }
});

// GET /api/party/:partyId - Get any party by ID (admin/debug)
partyRoutes.get("/:partyId", async (req: Request, res: Response) => {
  Report.debug("Party by ID request received", {
    route: "/party/:partyId",
    ip: req.ip,
    partyId: req.params.partyId,
  });

  try {
    const { partyId } = req.params;

    if (!partyId) {
      return res.json({ success: false, messageKey: "party.invalidId" });
    }

    // Get party from in-memory manager
    const party = partyManager.getPartyByID(partyId);
    if (!party) {
      Report.warn("Party not found for ID", { partyId });
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    // Map to frontend interface (includes all character data)
    const partyInterface = mapPartyToInterface(party);

    Report.info("Returning party by ID", {
      partyId: party.partyID,
      location: party.location,
    });

    return res.json({
      success: true,
      party: partyInterface
    });
  } catch (error) {
    Report.error("Party by ID fetch error", {
      error,
      partyId: req.params.partyId,
    });
    return res.json({ success: false, messageKey: "party.fetchFailed" });
  }
});

