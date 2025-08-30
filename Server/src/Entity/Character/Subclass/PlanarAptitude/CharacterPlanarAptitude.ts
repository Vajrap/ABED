export class CharacterPlanarAptitude {
    aptitude: number;
    constructor(value?: number) {
        this.aptitude = value ?? 50
    }

    dec(amount: number) {
        this.aptitude = Math.max(0, this.aptitude - amount)
        return this.aptitude
    }

    inc(amount: number) {
        this.aptitude = Math.min(200, this.aptitude + amount)
        return this.aptitude
    }

    getMagicResistanceAptitude() {
        //at aptitude 100, magic resistance is 0 meaning character will take 100% magic damage
        //at aptitude 0, magic resistance is 0.9 meaning will take 10% magic damage
        //aptitude for magic resistance is capped at 100
        const capped = Math.min(this.aptitude, 100)
        return 0.1 + (1 - capped / 100) * 0.9
    }

    getSpellEffectivenessAptitude() {
        // at aptitude 100, spell effectiveness is 1 meaning character will deal 100% magic damage
        // at aptitude 0, spell effectiveness is 0 meaning will deal 0% magic damage
        // aptitude for spell effectiveness is capped at 200
        // At aptitude 200, spell effectiveness is 2 meaning character will deal 200% magic damage
        const capped = Math.min(this.aptitude, 200)
        return capped / 100
    }
}