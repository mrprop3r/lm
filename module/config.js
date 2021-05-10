export const LM = {
    actorClass : {
        lvl0: "Level0",
        ass: "Assasin",
        bar: "Bard",
        bld: "Bladedancer",
        cl: "Cleric",
        elfn: "ElfNightblade",
        elf: "Elf",
        dw: "Dwarf",
        dwp: "DwarfPriest",
        ran: "Ranger",
        ftr: "Fighter",
        hal: "Halfling",
        th: "Thief",
        mag: "Mage",
    },
    classDetails : {
        lvl0: {
            img: "/systems/lm/assets/class/swordman.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.level0",
            hd: "d4",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.level0",
            weaponStyle: "LM.weaponStyle.level0",
            armorUse: "LM.armorUse.level0",
            languagesKnow: [ "LM.lan.common" ],
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante", "Aspirante" ],
            thac0: [ 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100 ],
            saves: {
                death: [ 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7, 7, 6, 5 ],
                wand: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                paralysis: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9, 8, 7, 6 ],
                breath: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                spell: [18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 8 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        ass: {
            img: "/systems/lm/assets/class/bloody-sword.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.assasin",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.level0",
            weaponStyle: "LM.weaponStyle.assasin",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: true,
                hitBonus: [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
                dmgBonusback: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Thug", "Ejecutor", "Torturador", "Exterminador", "Destructor", "Verdugo", "Canalla", "Asesino", "Maestro Asesino", "Maestro Asesino", "Maestro Asesino", "Maestro Asesino", "Maestro Asesino", "Padrino de Asesinos" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 1701, 3401, 6801, 14001, 28001, 55001, 110001, 230001, 3500001, 470001, 590001, 710001, 830001, 830001 ],
            saves: {
                death: [ 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7, 7, 6, 5 ],
                wand: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                paralysis: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9, 8, 7, 6 ],
                breath: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                spell: [18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 8 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        bar: {
            img: "/systems/lm/assets/class/shouting.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.bard",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.level0",
            weaponStyle: "LM.weaponStyle.bard",
            armorUse: "LM.armorUse.bard",
            skillsPoints : [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante","Recitador", "Versificador", "Archivista", "Analista", "Cronista", "Panegirista", "Poeta", "Rapsodista", "Bardo", "Bardo", "Bardo", "Bardo", "Bardo","Maestro Bardo" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 1401, 2801, 5601, 11201, 22401, 45001, 90001, 190001, 2900001, 390001, 490001, 590001, 690001, 690001 ],
            saves: {
                death: [ 15, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                wand: [17, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8 ],
                paralysis: [16, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                breath: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10 ],
                spell: [18, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        bld: {
            img: "/systems/lm/assets/class/dervish-swords.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.bladedancer",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.bladedancer",
            weaponStyle: "LM.weaponStyle.bladedancer",
            armorUse: "LM.armorUse.bladedancer",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: true,
                value: 1
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante","Iniciada-filo", "Hija-filo", "Cantarina-filo", "Tejedora-filo", "Hermana-filo", "Adepta-filo", "Danzarina-filo", "Sacerdotisa-filo", "Dama-filo", "Dama-filo", "Dama-filo", "Dama-filo", "Dama-filo","Dama-todo filo" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: true,
                value: [ 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3 ]
            },
            xpn: [ 100, 1565, 3125, 6251, 12501, 25001, 50001, 100001, 200001, 3000001, 400001, 500001, 600001, 700001, 700001 ],
            saves: {
                death: [ 15, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4 ],
                wand: [17, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                paralysis: [16, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                breath: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10 ],
                spell: [18, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9 ]
            },
            turn: {
                yes: true,
                turnUndead: {
                    dg1: [ 20, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    dg2: [ 20, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1 ],
                    dg3: [ 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1 ],
                    dg4: [ 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1 ],
                    dg5: [ 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1 ],
                    dg6: [ 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1 ],
                    dg7: [ 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1 ],
                    dg8: [ 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1 ],
                    dg9: [ 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2 ],
                    dg10: [ 20, 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2 ],
                }
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6 ],
                    lvl2: [ 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ],
                    lvl3: [ 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 5 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
        cl: {
            img: "/systems/lm/assets/class/holy-symbol.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.cleric",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: {
                legal: "LM.weaponUse.clericL",
                neutral: "LM.weaponUse.clericN",
                chaotic: "LM.weaponUse.clericC",
            },
            weaponStyle: "LM.weaponStyle.level0",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Acólito", "Adepto", "Sacerdote", "Curandero", "Vicario", "Rector", "Prelado", "Obispo", "Patriarca", "Patriarca 10º", "Patriarca 11º", "Patriarca 12º", "Patriarca 13º", "Teócrata" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 1565, 3125, 6251, 12501, 25001, 50001, 100001, 200001, 300001, 400001, 500001, 600001, 700001, 700001 ],
            saves: {
                death: [ 15, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4 ],
                wand: [17, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                paralysis: [16, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                breath: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10 ],
                spell: [18, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9 ]
            },
            turn: {
                yes: true,
                turnUndead: {
                    dg1: [ 20, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    dg2: [ 20, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1 ],
                    dg3: [ 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1 ],
                    dg4: [ 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1 ],
                    dg5: [ 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1 ],
                    dg6: [ 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1 ],
                    dg7: [ 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1 ],
                    dg8: [ 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1 ],
                    dg9: [ 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2 ],
                    dg10: [ 20, 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2 ],
                }
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6 ],
                    lvl2: [ 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ],
                    lvl3: [ 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 5 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
        elfn: {
            img: "/systems/lm/assets/class/elf-helmet.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.nightblade",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.nightblade",
            weaponStyle: "LM.weaponStyle.nightblade",
            armorUse: "LM.armorUse.nightblade",
            skillsPoints : [ 0, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
            languagesKnow: [ "LM.lan.common", "LM.lan.elfish", "LM.lan.gnoll", "LM.lan.hobgoblin", "LM.lan.orc" ],
            backstab: {
                value: true,
                hitBonus: [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
                dmgBonusback: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
            },
            surpriseBonus: {
                yes: true,
                value: 1
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: true,
                value: 1
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Vengador-arcaísta", "Ejecutor-vidente", "Teúrgo-torturador", "Matador-mago", "Taumaturgo-destructor", "Ejecutor-encantador", "Brujo-guardanegro", "Asesino-mago", "Filonocturno", "Filonocturno", "Filonocturno", "Filonocturno", "Filonocturno", "Filonocturno" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 14, 14 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2775, 5551, 11101, 22201, 45001, 90001, 180001, 330001, 4800001, 630001, 630001, 630001, 630001, 630001 ],
            saves: {
                death: [ 15, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 8, 8 ],
                wand: [17, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 9, 9 ],
                paralysis: [16, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 7 ],
                breath: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 11, 11 ],
                spell: [18, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 9, 9 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
                    lvl2: [ 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2 ],
                    lvl3: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
        elf: {
            img: "/systems/lm/assets/class/elf-ear.svg",
            requeriment: "LM.requeriment.elf",
            principalAbility: "LM.principalAbility.elf",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.level0",
            weaponStyle: "LM.weaponStyle.elf",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common", "LM.lan.elfish", "LM.lan.gnoll", "LM.lan.hobgoblin", "LM.lan.orc" ],        
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: true,
                value: 1
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: true,
                value: 1
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Guardián arcaista", "Guerrero vidente", "Teúrgo maestro", "Héroe mago", "Taumaturgo ejemplar", "Mirmidón encantador", "Brujo campeón", "Héroe épico", "Lord mago", "Lord mago", "Lord mago", "Lord mago", "Lord mago", "Lord mago" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 13, 13, 13, 13, 13 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 4065, 8125, 16251, 32501, 65001, 130001, 200001, 400001, 6000001, 600001, 600001, 600001, 600001, 600001 ],
            saves: {
                death: [ 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 8, 8, 8, 8 ],
                wand: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 10, 10, 10, 10 ],
                paralysis: [16, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 8, 8, 8, 8  ],
                breath: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 10, 10, 10, 10 ],
                spell: [18, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 10, 10, 10, 10 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
                    lvl2: [ 0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3 ],
                    lvl3: [ 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
        dw: {
            img: "/systems/lm/assets/class/dwarf-helmet.svg",
            requeriment: "LM.requeriment.dwarf",
            principalAbility: "LM.principalAbility.dwarf",
            hd: "d8",
            hdAdvantage: true,
            weaponsUse: "LM.weaponUse.dwarf",
            weaponStyle: "LM.weaponStyle.dwarf",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common", "LM.lan.dwarf", "LM.lan.goblin", "LM.lan.gnome", "LM.lan.kobold" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Centinela", "Guardián", "Porta escudo", "Defensor", "Tutor", "Custodio", "Campeón", "Guardián bóveda", "Señor bóveda", "Señor bóveda", "Señor bóveda", "Señor bóveda", "Señor bóveda", "Señor bóveda" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 11 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2187, 4375, 8751, 17501, 35001, 70001, 140001, 270001, 4000001, 530001, 660001, 790001, 790001, 790001 ],
            saves: {
                death: [ 15, 10, 9, 9, 8, 7, 7, 6, 5, 5, 4, 3, 3, 2, 2 ],
                wand: [17, 12, 11, 11, 10, 9, 9, 8, 7, 7, 6, 5, 5, 4, 4 ],
                paralysis: [16, 11, 10, 10, 9, 8, 8, 7, 6, 6, 5, 4, 4, 3, 3 ],
                breath: [17, 13, 12, 12, 11, 10, 10, 9, 8, 8, 7, 6, 6, 5, 5 ],
                spell: [18, 13, 12, 12, 11, 10, 10, 9, 8, 8, 7, 6, 6, 5, 5 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        dwp: {
            img: "/systems/lm/assets/class/dwarf-face.svg",
            requeriment: "LM.requeriment.dwarf",
            principalAbility: "LM.principalAbility.dwarfpriest",
            hd: "d6",
            hdAdvantage: true,
            weaponsUse: "LM.weaponUse.dwarfpriest",
            weaponStyle: "LM.weaponStyle.dwarfpriest",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common", "LM.lan.dwarf", "LM.lan.goblin", "LM.lan.gnome", "LM.lan.kobold" ],   
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Catequista", "Acólito", "Sacerdote", "Párroco", "Vicario", "Rector", "Prelado", "Obispo", "Señor artesano", "Señor artesano", "Señor artesano", "Señor artesano", "Señor artesano", "Señor artesano" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 15, 15, 15, 15 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2401, 4801, 9601, 19201, 38401, 75001, 150001, 280001, 4100001, 4100001, 4100001, 4100001, 4100001, 4100001 ],
            saves: {
                death: [ 15, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2 ],
                wand: [17, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 5, 5, 5 ],
                paralysis: [16, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 5, 5, 5 ],
                breath: [17, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 9, 9, 9, 9 ],
                spell: [18, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 7, 7, 7 ]
            },
            turn: {
                yes: true,
                turnUndead: {
                    dg1: [ 20, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    dg2: [ 20, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1 ],
                    dg3: [ 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1 ],
                    dg4: [ 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1, 1 ],
                    dg5: [ 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1, 1 ],
                    dg6: [ 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1, 1 ],
                    dg7: [ 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1, 1 ],
                    dg8: [ 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2, 1 ],
                    dg9: [ 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2, 2 ],
                    dg10: [ 20, 20, 20, 20, 20, 20, 20, 20, 12, 11, 9, 7, 5, 3, 2 ],
                }
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6 ],
                    lvl2: [ 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ],
                    lvl3: [ 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 5 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
        ran: {
            img: "/systems/lm/assets/class/maple-leaf.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.ranger",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.ranger",
            weaponStyle: "LM.weaponStyle.ranger",
            armorUse: "LM.armorUse.ranger",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: true,
                value: 1
            },
            initBonus: {
                yes: true,
                value: 1
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Scout", "Batidor", "Silvicultor", "Explorador", "Guia", "Rastreador", "Pionero", "Ranger", "Guardián", "Guardián", "Guardián", "Guardián", "Guardián", "Señor guardián" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10 ],
            hitbonusp: {
                yes: true,
                value: 1
            },
            dmgBonusm: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2035, 4065, 8125, 16251, 32501, 65001, 130001, 250001, 3700001, 490001, 610001, 730001, 850001, 850001 ],
            saves: {
                death: [ 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7, 7, 6, 5 ],
                wand: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                paralysis: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9, 8, 7, 6 ],
                breath: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                spell: [18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 8 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes:false,
            }
        },
        ftr: {
            img: "/systems/lm/assets/class/brutal-helm.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.fighter",
            hd: "d8",
            hdAdvantage: true,
            weaponsUse: "LM.weaponUse.level0",
            weaponStyle: "LM.weaponStyle.level0",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Hombre de Armas", "Luchador", "Maestro de Espadas", "Héroe", "Bravucón", "Mirmidón", "Campeón", "Héroe Épico", "Señor de la Guerra", "Señor de la Guerra", "Señor de la Guerra", "Señor de la Guerra", "Señor de la Guerra", "Jefe Supremo" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2035, 4065, 8125, 16251, 32501, 65001, 130001, 250001, 370001, 490001, 610001, 730001, 850001, 850001 ],
            saves: {
                death: [ 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7, 7, 6, 5 ],
                wand: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                paralysis: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9, 8, 7, 6 ],
                breath: [17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 9, 9, 8, 7 ],
                spell: [18, 17, 16, 16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 8 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        hal: {
            img: "/systems/lm/assets/class/hobbit-door.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.halfling",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.halfling",
            weaponStyle: "LM.weaponStyle.halfling",
            armorUse: "LM.armorUse.level0",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common", "LM.lan.halfling" ],
            backstab: {
                value: false,
            },
            surpriseBonus: {
                yes: false,
            },
            initBonus: {
                yes: false,
            },
            searchBonus: {
                yes: false,
            },
            stealthBonus: {
                yes: true,
                value: 2
            },
            survivalBonus: {
                yes: false,
            },
            luck: true,
            title: [ "Aspirante", "Veterano", "Luchador", "Héroe", "Bravucón", "Mirmidón", "Campeón", "Gran maestro", "Lord", "Lord", "Lord", "Lord", "Lord", "Lord", "Lord" ],
            thac0: [ 20, 19, 18, 18, 17, 16, 16, 15, 14, 14, 14, 14, 14, 14, 14 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dmgBonusp: [ 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2035, 4065, 8125, 16251, 32501, 65001, 130001, 130001, 1300001, 130001, 130001, 130001, 130001, 130001 ],
            saves: {
                death: [ 15, 10, 9, 9, 8, 7, 7, 6, 5, 5, 5, 5, 5, 5, 5 ],
                wand: [17, 12, 11, 11, 10, 9, 9, 8, 7, 7, 7, 7, 7, 7, 7 ],
                paralysis: [16, 11, 10, 10, 9, 8, 8, 7, 6, 6, 6, 6, 6, 6, 6 ],
                breath: [17, 13, 12, 12, 11, 10, 10, 9, 8, 8, 8, 8, 8, 8, 8 ],
                spell: [18, 13, 12, 12, 11, 10, 10, 9, 8, 8, 8, 8, 8, 8, 8 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: false,
            }
        },
        th: {
            img: "/systems/lm/assets/class/key-lock.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.thieft",
            hd: "d6",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.thieft",
            weaponStyle: "LM.weaponStyle.thieft",
            armorUse: "LM.armorUse.thieft",
            skillsPoints : [ 0, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: true,
                hitBonus: [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
                dmgBonusback: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: true,
            title: [ "Aspirante", "Salteador", "Encapuchado", "Atracador", "Asaltante", "Cortabolsas", "Malandrín", "Ladronzuelo", "Ratero", "Maestro ladrón", "Maestro ladrón", "Maestro ladrón", "Maestro ladrón", "Maestro ladrón", "Príncipe ladrón" ],
            thac0: [ 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 1251, 2501, 5001, 10001, 20001, 40001, 80001, 180001, 2800001, 380001, 480001, 580001, 680001, 680001 ],
            saves: {
                death: [ 15, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                wand: [17, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8 ],
                paralysis: [16, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7 ],
                breath: [17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10 ],
                spell: [18, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9 ]
            },
            turn: {
                yes: false
            },
            magic: {
                yes: false
            }
        },
        mag: {
            img: "/systems/lm/assets/class/magic-palm.svg",
            requeriment: "LM.requeriment.level0",
            principalAbility: "LM.principalAbility.mage",
            hd: "d4",
            hdAdvantage: false,
            weaponsUse: "LM.weaponUse.mage",
            weaponStyle: "LM.weaponStyle.mage",
            armorUse: "LM.armorUse.mage",
            skillsPoints : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            languagesKnow: [ "LM.lan.common" ],
            backstab: {
                value: false
            },
            surpriseBonus: {
                yes: false
            },
            initBonus: {
                yes: false
            },
            searchBonus: {
                yes: false
            },
            stealthBonus: {
                yes: false
            },
            survivalBonus: {
                yes: false
            },
            luck: false,
            title: [ "Aspirante", "Arcaísta", "Vidente", "Teúrgo", "Prestidigitador", "Taumaturgo", "Encantador", "Brujo", "Mago", "Hechicero", "Hechicero", "Hechicero", "Hechicero", "Hechicero", "Archimago" ],
            thac0: [ 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15 ],
            hitbonusp: {
                yes: false,
            },
            dmgBonusm: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            dmgBonusp: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            acBonus: {
                yes: false,
            },
            xpn: [ 100, 2501, 5001, 10001, 20001, 40001, 80001, 160001, 310001, 4600001, 610001, 760001, 910001, 1060001, 1060001 ],
            saves: {
                death: [ 15, 10, 10, 10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6 ],
                wand: [17, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8 ],
                paralysis: [16, 11, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8, 8, 7, 7 ],
                breath: [17, 13, 13, 13, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9 ],
                spell: [18, 13, 13, 13, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9 ]
            },
            turn: {
                yes: false,
            },
            magic: {
                yes: true,
                spellsLevel: {
                    lvl1: [ 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4 ],
                    lvl2: [ 0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4 ],
                    lvl3: [ 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4 ],
                    lvl4: [ 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 4 ],
                    lvl5: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 2 ],
                    lvl6: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2 ],
                    lvl7: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl8: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    lvl9: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                }
            }
        },
    },
    abilities: {
        str: "LM.abilities.str.long",
        int: "LM.abilities.int.long",
        dex: "LM.abilities.dex.long",
        wis: "LM.abilities.wis.long",
        con: "LM.abilities.con.long",
        cha: "LM.abilities.cha.long",
    },
    savesCheck: {
        death: "LM.saves.death.check",
        wand: "LM.saves.wand.check",
        paralysis: "LM.saves.paralysis.check",
        breath: "LM.saves.breath.check",
        spell: "LM.saves.spell.check",
    },
    savesShort: {
        death: "MU",
        wand: "VA",
        paralysis: "PA",
        breath: "AL",
        spell: "CO",
    },
    saves_long: {
        death: "LM.saves.death.long",
        wand: "LM.saves.wand.long",
        paralysis: "LM.saves.paralysis.long",
        breath: "LM.saves.breath.long",
        spell: "LM.saves.spell.long",
    },
    roll_type: {
        result: "=",
        above: "≥",
        below: "≤"
      },
    armor : {
        unarmored: "Unarmored",
        light: "Light",
        medium: "Medium",
        heavy: "Heavy",
        shield: "Shield",
        helm: "Helm",
        magic: "Magic"
    },
    magicUser : {
        arcano: "LM.user.magicUser",
        divino: "LM.user.divineUser",
        danzafilos: "LM.user.bladeUser",
        elfo: "LM.user.elfUser",
    },
    languages: [
        "LM.lan.common",
        "LM.lan.legal",
        "LM.lan.neutral",
        "LM.lan.chaotic",
        "Bugbear",
        "LM.lan.doppelgänger",
        "LM.lan.dragon",
        "LM.lan.dwarf",
        "LM.lan.elfish",
        "LM.lan.gargoyle",
        "LM.lan.gnoll",
        "LM.lan.gnome",
        "LM.lan.goblin",
        "LM.lan.halfling",
        "LM.lan.harpy",
        "LM.lan.hobgoblin",
        "LM.lan.kobold",
        "LM.lan.lizardmen",
        "Medusa",
        "LM.lan.minotaur",
        "LM.lan.ogre",
        "LM.lan.orc",
        "LM.lan.pixie",
        "LM.lan.country",
        ],
    tags: {
        melee: "melé",
        missile: "proyectil",
        throw: "arrojadiza",
        slow: "lenta",
        twoHanded: "dos manos",
        blunt: "contundente",
        oneTwoHanded: "una o dos manos",
        brace: "afianzar",
        splash: "salpica",
        reload: "recargar",
        charge: "carga",
    },
    tag_images: {
        melee: "/systems/lm/assets/tags/melee.png",
        missile: "/systems/lm/assets/tags/missile.png",
        throw: "/systems/lm/assets/tags/missile.png",
        slow: "/systems/lm/assets/tags/slow.png",
        twoHanded: "/systems/lm/assets/tags/twohanded.png",
        blunt: "/systems/lm/assets/tags/blunt.png",
        oneTwoHanded: "/systems/lm/assets/tags/glowing-hands.svg",
        brace: "/systems/lm/assets/tags/brace.png",
        splash: "/systems/lm/assets/tags/splash.png",
        reload: "/systems/lm/assets/tags/reload.png",
        charge: "/systems/lm/assets/tags/charge.png",
    },
    marketClass: {
        "VI": ["10","1","10%","5%","1%","-"],
        "V": ["30","1","25%","10%","5%","-"],
        "IV": ["65","5","1%","25%","10%","-"],
        "III": ["260","15","2","1","25%","2%"],
        "II": ["585","30","5","2","1","5%"],
        "I": ["1700","100","15","7","2","10%"],
    },
    monster_saves: {
        0: {
            label: "Normal Human",
            d: 15,
            w: 17,
            p: 16,
            b: 17,
            s: 18
        },
        1: {
            label: "1",
            d: 14,
            w: 16,
            p: 15,
            b: 16,
            s: 17
        },
        3: {
            label: "2-3",
            d: 13,
            w: 15,
            p: 14,
            b: 15,
            s: 16
        },
        4: {
            label: "4",
            d: 12,
            w: 14,
            p: 13,
            b: 14,
            s: 15
        },
        6: {
            label: "5-6",
            d: 11,
            w: 13,
            p: 12,
            b: 13,
            s: 14
        },
        7: {
            label: "7",
            d: 10,
            w: 12,
            p: 11,
            b: 12,
            s: 13
        },
        9: {
            label: "8-9",
            d: 9,
            w: 11,
            p: 10,
            b: 11,
            s: 12
        },
        10: {
            label: "10",
            d: 8,
            w: 10,
            p: 9,
            b: 10,
            s: 11
        },
        12: {
            label: "11-12",
            d: 7,
            w: 9,
            p: 8,
            b: 9,
            s: 10
        },
        13: {
            label: "13",
            d: 6,
            w: 8,
            p: 7,
            b: 8,
            s: 9
        },
        14: {
            label: "14+",
            d: 5,
            w: 7,
            p: 6,
            b: 7,
            s: 8
        },
        21: {
            label: "Ladrón",
            d: 13,
            w: 14,
            p: 13,
            b: 16,
            s: 15
        },
        31: {
            label: "Clérigo",
            d: 10,
            w: 13,
            p: 13,
            b: 16,
            s: 15
        },
        41: {
            label: "Mago",
            d: 13,
            w: 10,
            p: 11,
            b: 12,
            s: 13
        },
        51: {
            label: "Elfo",
            d: 14,
            w: 16,
            p: 14,
            b: 16,
            s: 16
        },
        61: {
            label: "Enano",
            d: 10,
            w: 12,
            p: 11,
            b: 13,
            s: 13
        },
    },
    treasureTable: {
        No: {
            pc: [ 0, "[[1d6*1000]]"],
            ppt: [ 0, "[[1d6*1000]]"],
            pe: [ 0, "[[1d4*1000]]"],
            po: [ 0, "[[2d6*1000]]"],
            pp: [ 0, "[[1d2*1000]]"],
            gems: [ 0,"[[6d6]]"],
            jewels: [ 0, "[[6d6]]"],
            magic: [ 0, "3 objetos mágicos"],
        },
        A: {
            pc: [ 25, "[[1d6*1000]]"],
            ppt: [ 30, "[[1d6*1000]]"],
            pe: [ 20, "[[1d4*1000]]"],
            po: [ 35, "[[2d6*1000]]"],
            pp: [ 25, "[[1d2*1000]]"],
            gems: [ 50,"[[6d6]]"],
            jewels: [ 50, "[[6d6]]"],
            magic: [ 30, "3 objetos mágicos"],
        },
        B: {
            pc: [ 50, "[[1d8*1000]]"],
            ppt: [ 25, "[[1d6*1000]]"],
            pe: [ 25, "[[1d4*1000]]"],
            po: [ 25, "[[1d3*1000]]"],
            pp: [ 0, "0"],
            gems: [ 25,"[[1d6]]"],
            jewels: [ 25, "[[1d6]]"],
            magic: [ 10, "1 espada mágica, armadura o arma"],
        },
        C: {
            pc: [ 20, "[[1d12*1000]]"],
            ppt: [ 30, "[[1d4*1000]]"],
            pe: [ 10, "[[1d4*1000]]"],
            po: [ 35, "0"],
            pp: [ 25, "0"],
            gems: [ 25,"[[1d4]]"],
            jewels: [ 25, "[[1d4]]"],
            magic: [ 10, "2 objetos mágicos"],
        },
        D: {
            pc: [ 10, "[[1d8*1000]]"],
            ppt: [ 15, "[[1d12*1000]]"],
            pe: [ 0, "0"],
            po: [ 15, "[[1d6*1000]]"],
            pp: [ 0, "0"],
            gems: [ 30,"[[1d8]]"],
            jewels: [ 30, "[[1d8]]"],
            magic: [ 15, "2 objetos mágicos y 1 poción"],
        },
        E: {
            pc: [ 5, "[[1d10*1000]]"],
            ppt: [ 30, "[[1d12*1000]]"],
            pe: [ 25, "[[1d4*1000]]"],
            po: [ 25, "[[1d8*1000]]"],
            pp: [ 0, "0"],
            gems: [ 10,"[[1d10]]"],
            jewels: [ 10, "[[1d10]]"],
            magic: [ 25, "3 objetos mágicos y 1 pergamino"],
        },
        F: {
            pc: [ 0, "0"],
            ppt: [ 10, "[[2d10*1000]]"],
            pe: [ 20, "[[1d8*1000]]"],
            po: [ 45, "[[1d12*1000]]"],
            pp: [ 30, "[[1d3*1000]]"],
            gems: [ 20,"[[2d12]]"],
            jewels: [ 10, "[[1d12]]"],
            magic: [ 30, "3 objetos mágicos( no arma ), 1 poción y 1 pergamino"],
        },
        G: {
            pc: [ 0, "0<b> mc</b>"],
            ppt: [ 0, "0<b> mpt</b>"],
            pe: [ 0, "0<b> me</b>"],
            po: [ 50, "[[1d4*1000]]<b> mo</b>"],
            pp: [ 50, "[[1d6*1000]]<b> mp</b>"],
            gems: [ 25,"[[3d6]]<b> gemas</b>"],
            jewels: [ 25, "[[1d10]]<b> piezas de joyería</b>"],
            magic: [ 35, "4<b> objetos mágicosy </b>1<b> pergamino</b>"],
        },
        H: {
            pc: [ 25, "[[3d8*1000]]"],
            ppt: [ 50, "[[1d100*1000]]"],
            pe: [ 50, "[[1d4*10000]]"],
            po: [ 50, "[[1d6*10000]]"],
            pp: [ 25, "[[5d4*1000]]"],
            gems: [ 50,"[[1d100]]"],
            jewels: [ 50, "[[1d4*10]]"],
            magic: [ 30, "4 objetos mágicos, 1 poción y 1 pergamino"],
        },
        I: {
            pc: [ 0, "0"],
            ppt: [ 30, "[[1d8*1000]]"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 50,"[[2d6]]"],
            jewels: [ 50, "[[2d6]]"],
            magic: [ 15, "1 objetos mágicos"],
        },
        J: {
            pc: [ 25, "[[1d4*1000]]"],
            ppt: [ 10, "[[1d3*1000]]"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        K: {
            pc: [ 0, "0"],
            ppt: [ 30, "[[1d6*1000]]"],
            pe: [ 10, "[[1d2*10000]]"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        L: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 50,"[[1d4]]"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        M: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 40, "[[2d4*10000]]"],
            pp: [ 50, "[[5d6*1000]]"],
            gems: [ 55,"[[5d4]]"],
            jewels: [ 45, "[[2d6]]"],
            magic: [ 0, "0"],
        },
        N: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 40, "[[2d4]]"],
        },
        O: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 50, "[[1d4]]"],
        },
        P: {
            pc: [ 100, "[[3d8]]"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        Q: {
            pc: [ 0, "0"],
            ppt: [ 100, "[[3d6]]"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        R: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 100, "[[2d6]]"],
            po: [ 0, "0"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        S: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 100, "[[2d4]]"],
            pp: [ 0, "0"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        T: {
            pc: [ 0, "0"],
            ppt: [ 0, "0"],
            pe: [ 0, "0"],
            po: [ 0, "0"],
            pp: [ 100, "[[1d6]]"],
            gems: [ 0,"0"],
            jewels: [ 0, "0"],
            magic: [ 0, "0"],
        },
        U: {
            pc: [ 10, "[[1d100]]"],
            ppt: [ 10, "[[1d100]]"],
            pe: [ 0, "0"],
            po: [ 5, "[[1d100]]"],
            pp: [ 0, "0"],
            gems: [ 5,"[[1d4]]"],
            jewels: [ 5, "[[1d4]]"],
            magic: [ 2, "1 objeto mágico"],
        },
        V: {
            pc: [ 0, "0"],
            ppt: [ 10, "[[1d100]]"],
            pe: [ 5, "[[1d100]]"],
            po: [ 10, "[[1d100]]"],
            pp: [ 5, "[[1d100]]"],
            gems: [ 10,"[[1d4]]"],
            jewels: [ 10, "[[1d4]]"],
            magic: [ 5, "1 objetos mágicos"],
        },

    }
}