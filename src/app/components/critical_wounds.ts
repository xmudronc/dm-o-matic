export class CriticalWounds {
    static readonly SIMPLE = "SIMPLE";
    static readonly COMPLEX = "COMPLEX";
    static readonly DIFFICULT = "DIFFICULT";
    static readonly DEADLY = "DEADLY";

    public roll(xDx) {
      xDx = xDx.toUpperCase();
      let roll = xDx.split("D");
      let num = roll[0];
      let dice = roll[1];
      if (num && dice) {
        let total = 0;
        for (let i = 0; i < num; i++) {
          total += (1 + Math.floor(Math.random() * dice));
        }
        return total;
      }
    }

    public getCrit(type) {
        let roll = this.roll("2d6");
        switch (type) {
            case CriticalWounds.SIMPLE:
                return this.getSimple(roll);
            case CriticalWounds.COMPLEX:
                return this.getComplex(roll);
            case CriticalWounds.DIFFICULT:
                return this.getDifficult(roll);
            case CriticalWounds.DEADLY:
                return this.getDeadly(roll);
        }
    }

    public getCritWithRoll(type, roll) {
        switch (type) {
            case CriticalWounds.SIMPLE:
                return this.getSimple(roll);
            case CriticalWounds.COMPLEX:
                return this.getComplex(roll);
            case CriticalWounds.DIFFICULT:
                return this.getDifficult(roll);
            case CriticalWounds.DEADLY:
                return this.getDeadly(roll);
        }
    }

    private getSimple(roll) {
        return this.critRolls.simple[roll - 1].crit;
    }

    private getComplex(roll) {
        return this.critRolls.complex[roll - 1].crit;
    }

    private getDifficult(roll) {
        return this.critRolls.difficult[roll - 1].crit;
    }

    private getDeadly(roll) {
        return this.critRolls.deadly[roll - 1].crit;
    }

    public getElementalCrit(type) {
        let roll = this.roll("2d6");
        return this.getSpecterCritWithRoll(type, roll);
    }

    public getElementalCritWithRoll(type, roll) {
        return this.getSpecterCritWithRoll(type, roll);
    }

    public getSpecterCrit(type) {
        let roll = this.roll("2d6");
        while (roll <= 3) {
            roll = this.roll("2d6");
        }
        switch (type) {
            case CriticalWounds.SIMPLE:
                if (roll >= 6 && roll <= 8) {
                    return 5;
                } else {
                    return this.getSimple(roll);
                }
            case CriticalWounds.COMPLEX:
                if (roll >= 9 && roll <= 10) {
                    return 10;
                } else {
                    return this.getComplex(roll);
                }
            case CriticalWounds.DIFFICULT:
                if (roll >= 6 && roll <= 10) {
                    return 15;
                } else {
                    return this.getDifficult(roll);
                }
            case CriticalWounds.DEADLY:
                if (roll >= 6 && roll <= 8) {
                    return 20;
                } else {
                    return this.getDeadly(roll);
                }
        }
    }

    public getSpecterCritWithRoll(type, roll) {
        switch (type) {
            case CriticalWounds.SIMPLE:
                if (roll >= 6 && roll <= 8) {
                    return 5;
                } else {
                    return this.getSimple(roll);
                }
            case CriticalWounds.COMPLEX:
                if (roll >= 9 && roll <= 10) {
                    return 10;
                } else {
                    return this.getComplex(roll);
                }
            case CriticalWounds.DIFFICULT:
                if (roll >= 6 && roll <= 10) {
                    return 15;
                } else {
                    return this.getDifficult(roll);
                }
            case CriticalWounds.DEADLY:
                if (roll >= 6 && roll <= 8) {
                    return 20;
                } else {
                    return this.getDeadly(roll);
                }
        }
    }

    private crits = {
        simple: {
            spLeg: {
                name: "Sprained Leg",
                effect: "The blow sprained your leg, making it difficult towalk and maneuver. You take a -2 to SPD, Dodge/Escape, and Athletics.",
                stabilized: "You take a -1 to SPD, Dodge/Escape, and Athletics.",
                treated: "You take a -1 to SPD."
            },
            spArm: {
                name: "Sprained Arm",
                effect: "The blow sprained your arm, making it difficult to maneuver. You take a -2 to actions that use the arm.",
                stabilized: "You are at a -1 to actions with that arm.",
                treated: "You take a -1 to Physique."
            },
            foObject: {
                name: "Foreign Object",
                effect: "The blow lodged a piece of clothing or armor in your wound, causing an infection. Your Recovery and Critical Healing are quartered.",
                stabilized: "Your Recovery & Critical Healing are halved.",
                treated: "You take a -2 to Recovery and a -1 to your Critical Healing."
            },
            crRibs: {
                name: "Cracked Ribs",
                effect: "The blow cracked your ribs, making it painful to breathe and exert strength. You take a -2 to BODY. This does not effect Health Points.",
                stabilized: "You are at a -1 to BODY.",
                treated: "You take a -10 to Encumbrance."
            },
            dsScar: {
                name: "Disfiguring Scar",
                effect: "The blow mangled your face in some way. You are grotesque and difficult to look at. You take a -3 to empathic Verbal Combat (Charisma, Persuasion, Seduction, Deceit, Social Etiquette, and Leadership).",
                stabilized: "You take a -1 to empathic Verbal Combat.",
                treated: "You take a -1 to Seduction."
            },
            crJaw: {
                name: "Cracked Jaw",
                effect: "The blow cracked your jaw, making it hard to speak clearly. You are at a -2 to Magical Skills & Verbal Combat (Charisma, Persuasion, Seduction, Leadership, Deceit, Social Etiquette, and Intimidation).",
                stabilized: "You are at a -1 to Magical Skills & Verbal Combat.",
                treated: "You are at a -1 to Magical Skills."
            }
        },
        complex: {
            frLeg: {
                name: "Fractured Leg",
                effect: "The blow fractures your leg. You take a -3 to SPD, Dodge/Escape, and Athletics.",
                stabilized: "You take a -2 to SPD, Dodge/Escape, and Athletics.",
                treated: "-1 to SPD, Dodge/Escape, and Athletics."
            },
            frArm: {
                name: "Fractured Arm",
                effect: "The blow fractures your arm. You take a -3 to actions with that arm.",
                stabilized: "You take a -2 to actions with that arm.",
                treated: "You take a -1 to actions with that arm."
            },
            brRibs: {
                name: "Broken Ribs",
                effect: "The blow breaks your ribs, causing immense pain when you bend and strain. Take  a -2 to BODY and a -1 to REF and DEX.",
                stabilized: "You are at a -1 to BODY and REF.",
                treated: "You are at a -1 to BODY."
            },
            rtSpleen: {
                name: "Ruptured Spleen",
                effect: "A tear in your spleen begins bleeding profusely, making you woozy. Make a Stun save every 5 rounds. This wound induces bleeding.",
                stabilized: "You must make a Stun save every 10 Rounds.",
                treated: "You take a -2 to Stun."
            },
            lsTeeth: {
                name: "Lost Teeth",
                effect: "The blow knocked out some teeth. Roll 1d10 to see how many teeth are lost. You  take a -3 to magical skills and Verbal Combat.",
                stabilized: "You take a -2 to magical skills and Verbal Combat.",
                treated: "You take a -1 to magical skills and Verbal Combat."
            },
            mnHeadWd: {
                name: "Minor Head Wound",
                effect: "The blow rattled your brain and caused some internal bleeding. It’s hard to think straight. You take a -1 to INT, WILL, and STUN.",
                stabilized: "You are at a -1 to INT and WILL.",
                treated: "You are at a -1 to WILL."
            }
        },
        difficult: {
            cmLegFr: {
                name: "Compound Leg Fracture",
                effect: "The blow snaps your leg, rendering it useless. Quarter SPD, Dodge/Escape, and Athletics. This induces bleeding",
                stabilized: "Halves SPD, Dodge/Escape, and Athletics.",
                treated: "-2 to SPD, Dodge/Escape, and Athletics."
            },
            cmArmFr: {
                name: "Compound Arm Fracture",
                effect: "The blow crushes your arm. Bone sticks out of the skin. The arm is rendered useless and you start bleeding",
                stabilized: "That arm is useless.",
                treated: "That arm must remain in a sling, but it can hold things."
            },
            skChestWd: {
                name: "Sucking Chest Wound",
                effect: "The wound tears your lung, which fills your chest with air, crushing organs. You take a -3 to BODY and SPD. You also start suffocating",
                stabilized: "You take a -2 to BODY and SPD.",
                treated: "You take a -1 to BODY and SPD."
            },
            trStomach: {
                name: "Torn Stomach",
                effect: "The blow rips your stomach, pouring its contents into your gut. You take a -2 to all actions and take 4 points of acid damage per round.",
                stabilized: "You take a -2 to all actions.",
                treated: "You take a -1 to all actions."
            },
            concusion: {
                name: "Concussion",
                effect: "The blow caused a minor concussion. Make a Stun save every 1d6 rounds and take a -2 to INT, REF and DEX.",
                stabilized: "You take a -1 to INT, REF and DEX.",
                treated: "You take a -1 to INT and DEX"
            },
            skullFr: {
                name: "Skull Fracture",
                effect: "The blow fractures a part of your skull, weakening your head and causing bleeding. You take a -1 to INT and DEX, and take quadruple damage from head wounds.",
                stabilized: "Take a -1 to INT and DEX and quadruple damage from head wounds.",
                treated: "You take quadruple damage from head wounds."
            }
        },
        deadly: {
            dsLeg: {
                name: "Dismembered Leg",
                effect: "The blow tears your leg from your body or damages it beyond repair. Quarter your SPD, Dodge/Escape, and Athletics. This wound begins bleeding",
                stabilized: "You quarter your SPD, Dodge/Escape, and Athletics.",
                treated: "The leg can be replaced with a prosthetic."
            },
            dsArm: {
                name: "Dismembered Arm",
                effect: "The blow rends your arm from your body or damages it beyond repair. The arm cannot be used and you start bleeding.",
                stabilized: "That arm is useless.",
                treated: "The arm can be replaced with a prosthetic."
            },
            stShock: {
                name: "Septic Shock",
                effect: "The blow damages your intestines, letting waste enter your blood stream. Quarter your Stamina, take a -3 to INT, WILL, REF, and DEX. You are poisoned.",
                stabilized: "Your Stamina is halved and you take a -1 to INT, WILL, REF and DEX.",
                treated: "You take a -5 to Stamina permanently"
            },
            dmHeart: {
                name: "Heart Damage",
                effect: "The blow damages your heart. Make an immediate Death save. If you survive, the wound is bleeding and you must quarter your Stamina, SPD, and BODY.",
                stabilized: "You halve your Stamina, SPD, and BODY.",
                treated: "You take +2 damage per round from bleeding damage permanently"
            },
            dmEye: {
                name: "Damaged Eye",
                effect: "The blow cuts into or indents your eyeball. You take a -5 to sight-based Awareness and -4 to DEX. This wound begins bleeding.",
                stabilized: "You take a -3 to sight-based Awareness and -2 to DEX",
                treated: "Permanent -1 to sight-based Awareness and DEX."
            },
            spSpine: {
                name: "Separated Spine/Decapitated",
                effect: "The blow either snaps your neck or separates your head from your shoulders. You die immediately.",
                stabilized: "This wound cannot be stabilized.",
                treated: "This wound cannot be treated."
            }
        }
    }

    private critRolls = {
        simple: [
            { roll: 1, crit: undefined },
            { roll: 2, crit: this.crits.simple.spLeg },
            { roll: 3, crit: this.crits.simple.spLeg },
            { roll: 4, crit: this.crits.simple.spArm },
            { roll: 5, crit: this.crits.simple.spArm },
            { roll: 6, crit: this.crits.simple.foObject },
            { roll: 7, crit: this.crits.simple.foObject },
            { roll: 8, crit: this.crits.simple.foObject },
            { roll: 9, crit: this.crits.simple.crRibs },
            { roll: 10, crit: this.crits.simple.crRibs },
            { roll: 11, crit: this.crits.simple.dsScar },
            { roll: 12, crit: this.crits.simple.crJaw },
        ],
        complex: [
            { roll: 1, crit: undefined },
            { roll: 2, crit: this.crits.complex.frLeg },
            { roll: 3, crit: this.crits.complex.frLeg },
            { roll: 4, crit: this.crits.complex.frArm },
            { roll: 5, crit: this.crits.complex.frArm },
            { roll: 6, crit: this.crits.complex.brRibs },
            { roll: 7, crit: this.crits.complex.brRibs },
            { roll: 8, crit: this.crits.complex.brRibs },
            { roll: 9, crit: this.crits.complex.rtSpleen },
            { roll: 10, crit: this.crits.complex.rtSpleen },
            { roll: 11, crit: this.crits.complex.lsTeeth },
            { roll: 12, crit: this.crits.complex.mnHeadWd },
        ],
        difficult: [
            { roll: 1, crit: undefined },
            { roll: 2, crit: this.crits.difficult.cmLegFr },
            { roll: 3, crit: this.crits.difficult.cmLegFr },
            { roll: 4, crit: this.crits.difficult.cmArmFr },
            { roll: 5, crit: this.crits.difficult.cmArmFr },
            { roll: 6, crit: this.crits.difficult.skChestWd },
            { roll: 7, crit: this.crits.difficult.skChestWd },
            { roll: 8, crit: this.crits.difficult.skChestWd },
            { roll: 9, crit: this.crits.difficult.trStomach },
            { roll: 10, crit: this.crits.difficult.trStomach },
            { roll: 11, crit: this.crits.difficult.concusion },
            { roll: 12, crit: this.crits.difficult.skullFr },
        ],
        deadly: [
            { roll: 1, crit: undefined },
            { roll: 2, crit: this.crits.deadly.dsLeg },
            { roll: 3, crit: this.crits.deadly.dsLeg },
            { roll: 4, crit: this.crits.deadly.dsArm },
            { roll: 5, crit: this.crits.deadly.dsArm },
            { roll: 6, crit: this.crits.deadly.stShock },
            { roll: 7, crit: this.crits.deadly.stShock },
            { roll: 8, crit: this.crits.deadly.stShock },
            { roll: 9, crit: this.crits.deadly.dmHeart },
            { roll: 10, crit: this.crits.deadly.dmHeart },
            { roll: 11, crit: this.crits.deadly.dmEye },
            { roll: 12, crit: this.crits.deadly.spSpine },
        ]
    }

}