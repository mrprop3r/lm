/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class LmActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
    if (actorData.type === 'monster') this._prepareMonsterData(actorData);
    if (actorData.type === 'container') this._prepareContainerData(actorData);
  }


  generateSave(hd) {
    let saves = {};
    for (let i = 0; i <= hd; i++) {
      let tmp = CONFIG.LM.monster_saves[i];
      if (tmp) {
        saves = tmp;
      }
    }
    this.update({
      "data.saves": {
        death: {
          value: saves.d,
        },
        wand: {
          value: saves.w,
        },
        paralysis: {
          value: saves.p,
        },
        breath: {
          value: saves.b,
        },
        spell: {
          value: saves.s,
        },
      },
    });
  }
  /**
  * Apply damage to this actor
  * @param {Number} damageAmount   Damage amount to apply
  * @param {Number} multiplier     Damage multiplier
  */
  async applyDamage (damageAmount, multiplier) {
    const speaker = { alias: this.name, _id: this._id }
  
    // Calculate damage amount and current hit points
    const amount = damageAmount * multiplier
    const hp = this.data.data.hp.value
  
    let newHp = hp
    if (amount > 0) {
        // Taking damage - just subtract and allow damage to go below zero
        newHp = newHp - amount
      } else {
        // Healing - don't allow HP to be brought above MaxHP, but if it's already there assume it's intentional
        const maxHp = this.data.data.hp.max
        if (hp >= maxHp) {
          newHp = hp
        } else {
          newHp = Math.min(newHp - amount, maxHp)
        }
      }
  
      const deltaHp = newHp - hp
  
      // Announce damage or healing results
      if (Math.abs(deltaHp) > 0) {
        const locstring = (deltaHp > 0) ? 'LM.healDamage' : 'LM.takeDamage'
        const messageData = {
          user: game.user._id,
          speaker: speaker,
          type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
          content: game.i18n.format(locstring, { target: this.name, damage: Math.abs(deltaHp) }),
          sound: CONFIG.sounds.notification
        }
        ChatMessage.applyRollMode(messageData, game.settings.get('core', 'rollMode'))
        await CONFIG.ChatMessage.entityClass.create(messageData)
      }
  
      // Apply new HP
      return this.update({
        'data.hp.value': newHp
      })
    }
  

  rollHP(options = {}) {
    let roll = new Roll(this.data.data.hp.hd).roll();
    let hpTotal = roll.total;
    if (hpTotal < 1) {
      hpTotal = 1;
    }
    return this.update({
      data: {
        hp: {
          max: hpTotal,
          value: hpTotal,
        },
      },
    });
  }

  /**
   * Prepare Character type specific data
   */
  static _valueFromTable(table, val) {
    let output;
    for (let i = 0; i <= val; i++) {
      if (table[i] != undefined) {
        output = table[i];
      }
    }
    return output;
  }

  _prepareCharacterData(actorData) {
    const data = actorData.data;

    // Select class
    data.class.label = CONFIG.LM.actorClass[data.class.value];
    const classInfo = CONFIG.LM.classDetails[data.class.value];
    data.class.img = classInfo.img;
    // Set occupation
    let occupations = actorData.items.filter(i => i.type == "occupation");
    if (occupations.length>0) data.retainer.occupation = occupations[0].name;
    // Set Hit Die from class
    data.hp.hd = classInfo.hd;
    data.hp.advantage = classInfo.hdAdvantage;
    if (data.description.level.value == 0 ) {
      data.hp.rest.max = 1;
    } else {
      data.hp.rest.max = data.description.level.value;
    }
    // Set Title from level
    data.description.title = classInfo.title[data.description.level.value];
    // Set xp next level
    data.description.level.xpnext = classInfo.xpn[data.description.level.value];
    // Set class requeriments
    data.abilities.requeriment = game.i18n.localize(`${classInfo.requeriment}`);
    // Set class principal abilities
    data.abilities.principal = game.i18n.localize(`${classInfo.principalAbility}`);
    // Set class weapons use
    if ( data.class.value === "cl") {
      switch (data.description.aligment) {
        case "legal":
          data.skills.weapons = game.i18n.localize(`${classInfo.weaponsUse.legal}`);
          break;
        case "chaotic":
          data.skills.weapons = game.i18n.localize(`${classInfo.weaponsUse.chaotic}`);
          break;
        default:
          data.skills.weapons = game.i18n.localize(`${classInfo.weaponsUse.neutral}`);
      }
    } else {
      data.skills.weapons = game.i18n.localize(`${classInfo.weaponsUse}`);
    }
    data.skills.styles = game.i18n.localize(`${classInfo.weaponStyle}`);
    // Set class armors use
    data.skills.armors = game.i18n.localize(`${classInfo.armorUse}`);
    // Set class skills points
    data.skills.skillsPoints = classInfo.skillsPoints[data.description.level.value];
    // Compute modifiers 
    const standard = {
      0: -3,
      3: -3,
      4: -2,
      6: -1,
      9: 0,
      13: 1,
      16: 2,
      18: 3,
    };
    data.abilities.str.mod = LmActor._valueFromTable(
      standard,
      data.abilities.str.value
    );
    data.abilities.int.mod = LmActor._valueFromTable(
      standard,
      data.abilities.int.value
    );
    data.abilities.dex.mod = LmActor._valueFromTable(
      standard,
      data.abilities.dex.value
    );
    data.abilities.cha.mod = LmActor._valueFromTable(
      standard,
      data.abilities.cha.value
    );
    data.abilities.wis.mod = LmActor._valueFromTable(
      standard,
      data.abilities.wis.value
    );
    data.abilities.wis.save = LmActor._valueFromTable(
      standard,
      data.abilities.wis.value
    );
    data.abilities.con.mod = LmActor._valueFromTable(
      standard,
      data.abilities.con.value
    );

    // Compute modifiers capped
    const capped = {
      0: -2,
      3: -2,
      4: -1,
      6: -1,
      9: 0,
      13: 1,
      16: 1,
      18: 2,
    };
    data.abilities.dex.init = LmActor._valueFromTable(
      capped,
      data.abilities.dex.value
    );
    data.abilities.con.venom = LmActor._valueFromTable(
      capped,
      data.abilities.con.value
    );
    data.skills.turn.value = LmActor._valueFromTable(
      capped,
      data.abilities.cha.value
    );
    data.abilities.cha.retain = data.abilities.cha.mod + 4;
    data.abilities.cha.loyalty = data.abilities.cha.mod +7;
    if (data.class.value ==="dw") {
      data.abilities.con.mod = data.abilities.con.mod + 1;
    }
    if (data.class.value ==="hal") {
      data.abilities.dex.mod = data.abilities.dex.mod + 1;
      data.abilities.dex.init = data.abilities.dex.init + 1;
    }

    // Compute Ability test
    const test = {
      0: 1,
      3: 1,
      6: 2,
      13: 3,
      16: 4,
      18: 5,
    }
    data.abilities.str.check = LmActor._valueFromTable(
      test,
      data.abilities.str.value
    );
    data.abilities.int.check = LmActor._valueFromTable(
      test,
      data.abilities.int.value
    );
    data.abilities.wis.check = LmActor._valueFromTable(
      test,
      data.abilities.wis.value
    );
    data.abilities.dex.check = LmActor._valueFromTable(
      test,
      data.abilities.dex.value
    );
    data.abilities.con.check = LmActor._valueFromTable(
      test,
      data.abilities.con.value
    );
    data.abilities.cha.check = LmActor._valueFromTable(
      test,
      data.abilities.cha.value
    );

    // Compute fast 
    const itemFast = {
      0: 0,
      3: 1,
      4: 2,
      5: 2,
      6: 3,
      7: 3,
      8: 4,
      9: 4,
      10: 5,
      11: 5,
      12: 6,
      13: 6,
      14: 7,
      15: 7,
      16: 8,
      17: 8,
      18: 9,
    }
    data.abilities.dex.itemFast = LmActor._valueFromTable(
      itemFast,
      data.abilities.dex.value
    );
    
    let totalFast = 0;
    Object.values(this.data.items).forEach((item) => {
      let fastBonus = item.data.fastBonus;
      if (item.data.fast) {
      totalFast += 1;
      }
      data.abilities.dex.itemFast += fastBonus;
    });
      
    data.abilities.dex.fast = totalFast;

    // Compute modifiers two hands attacks
    const twoAttacksP = {
      0: -5,
      3: -4,
      9: -3,
      12: -2,
      16: -1,
      18: 0,
    };
    const twoAttacksS = {
      0: -6,
      3: -5,
      9: -4,
      12: -3,
      16: -2,
      18: -1,
    };

    if (data.class.value ==="hal") {
      if (data.abilities.dex.value < 16){
        data.abilities.dex.twoAttacksP = LmActor._valueFromTable(
          twoAttacksP,
          16
        );
      } else {
        data.abilities.dex.twoAttacksP = LmActor._valueFromTable(
          twoAttacksP,
          data.abilities.dex.value
        );
      }
    } else {
      data.abilities.dex.twoAttacksP = LmActor._valueFromTable(
        twoAttacksP,
        data.abilities.dex.value
      );
    }

    if (data.class.value ==="hal") {
      if (data.abilities.dex.value < 16){
        data.abilities.dex.twoAttacksS = LmActor._valueFromTable(
          twoAttacksS,
          16
        );
      } else {
        data.abilities.dex.twoAttacksS = LmActor._valueFromTable(
          twoAttacksS,
          data.abilities.dex.value
        );
      }
    } else {
      data.abilities.dex.twoAttacksS = LmActor._valueFromTable(
        twoAttacksS,
        data.abilities.dex.value
      );
    }

    /*  Compute languages   */
    const literacy = {
      0: "",
      3: "LM.illiterate",
      6: "LM.literacyBasic",
      9: "LM.literate",
    };
    data.skills.lan.literacy = game.i18n.localize(`${LmActor._valueFromTable(
      literacy,
      data.abilities.int.value
    )}`);
    const spoken = {
      0: "LM.nativeBroken",
      4: "LM.native",
      13: "LM.nativePlus1",
      16: "LM.nativePlus2",
      18: "LM.nativePlus3",
    };
    data.skills.lan.spoken = game.i18n.localize(`${LmActor._valueFromTable(
      spoken,
      data.abilities.int.value
    )}`);
    data.skills.lan.ini = classInfo.languagesKnow.slice(),
    data.skills.lan.aligment = "LM.lan." + data.description.aligment,
    data.skills.lan.ini.push(data.skills.lan.aligment),
    /* Calculate skills */

    /* Acrobatics */
    data.skills.acr.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.str.value
    );
    data.skills.acr.mod2 = LmActor._valueFromTable(
      capped,      
      data.abilities.dex.value
    );
    if (data.class.value ==="hal") {
      data.skills.acr.mod2 += 1;
    }
    if (data.skills.acr.mod1 >= data.skills.acr.mod2) {
      data.skills.acr.mod = data.skills.acr.mod1 + data.skills.acr.value
    };
    if (data.skills.acr.mod2 > data.skills.acr.mod1) {
      data.skills.acr.mod = data.skills.acr.mod2 + data.skills.acr.value
    };
    /* Architecture skill */
    data.skills.arch.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.int.value
    );
    data.skills.arch.mod = data.skills.arch.mod1 + data.skills.arch.value;
    /* Search skill */
    data.skills.sea.bonus = classInfo.searchBonus.yes;
    data.skills.sea.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.wis.value
    );
    data.skills.sea.mod = data.skills.sea.mod1 + data.skills.sea.value;
    if (data.skills.sea.bonus) {
      data.skills.sea.mod += classInfo.searchBonus.value;
    }
    /* Hear skill */
    data.skills.he.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.wis.value
    );
    data.skills.he.mod = data.skills.he.mod1 + data.skills.he.value;
    /* Bash Doors skill */
    data.skills.bd.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.str.value
    );
    data.skills.bd.mod = data.skills.bd.mod1 + data.skills.bd.value;
    /* Sleight of Hands skill */
    data.skills.gh.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.dex.value
    );
    if (data.class.value ==="hal") {
      data.skills.gh.mod1 += 1;
    }
    data.skills.gh.mod = data.skills.gh.mod1 + data.skills.gh.value;
    /* Languages skill */
    data.skills.lan.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.int.value
    );
    data.skills.lan.mod = data.skills.lan.mod1 + data.skills.lan.value;
    /* Manipulate skill */
    data.skills.man.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.dex.value
    );
    if (data.class.value ==="hal") {
      data.skills.man.mod1 += 1;
    }
    data.skills.man.mod = data.skills.man.mod1 + data.skills.man.value;
    /* Stealth skill */
    data.skills.st.bonus = classInfo.stealthBonus.yes;
    data.skills.st.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.dex.value
    );
    if (data.class.value ==="hal") {
      data.skills.st.mod1 += 1;
    }
    data.skills.st.mod = data.skills.st.mod1 + data.skills.st.value;
    if (data.skills.st.bonus) {
      data.skills.st.mod += classInfo.stealthBonus.value;
    }
    /* Survival skill */
    data.skills.sur.bonus = classInfo.survivalBonus.yes;
    data.skills.sur.mod1 = LmActor._valueFromTable(
      capped,      
      data.abilities.int.value
    );
    data.skills.sur.mod2 = LmActor._valueFromTable(
      capped,      
      data.abilities.wis.value
    );
    if (data.skills.sur.mod1 >= data.skills.sur.mod2) {
      data.skills.sur.mod = data.skills.sur.mod1 + data.skills.sur.value
    };
    if (data.skills.sur.mod2 > data.skills.sur.mod1) {
      data.skills.sur.mod = data.skills.sur.mod2 + data.skills.sur.value
    };
    if (data.skills.sur.bonus) {
      data.skills.sur.mod += classInfo.survivalBonus.value;
    }
    /*  Luck skill */ 
    data.skills.luck.yes = classInfo.luck;
    /*  Backstab skill  */
    data.skills.back.yes = classInfo.backstab.value;
    if (data.skills.back.yes){
      data.skills.back.hit = classInfo.backstab.hitBonus[data.skills.back.value];
      data.skills.back.dmg = classInfo.backstab.dmgBonusback[data.skills.back.value];
    }
    /*  Turn skill  */  
    data.skills.turn.yes = classInfo.turn.yes; 
    if (data.skills.turn.yes) {
      data.skills.turn.value1 = classInfo.turn.turnUndead.dg1[data.description.level.value];
      data.skills.turn.value2 = classInfo.turn.turnUndead.dg2[data.description.level.value];
      data.skills.turn.value3 = classInfo.turn.turnUndead.dg3[data.description.level.value];
      data.skills.turn.value4 = classInfo.turn.turnUndead.dg4[data.description.level.value];
      data.skills.turn.value5 = classInfo.turn.turnUndead.dg5[data.description.level.value];
      data.skills.turn.value6 = classInfo.turn.turnUndead.dg6[data.description.level.value];
      data.skills.turn.value7 = classInfo.turn.turnUndead.dg7[data.description.level.value];
      data.skills.turn.value8 = classInfo.turn.turnUndead.dg8[data.description.level.value];
      data.skills.turn.value9 = classInfo.turn.turnUndead.dg9[data.description.level.value];
      data.skills.turn.value10 = classInfo.turn.turnUndead.dg10[data.description.level.value];
    }
    if (data.skills.turn.righteous) {
    data.skills.turn.rightMod = LmActor._valueFromTable(
      standard,
      data.abilities.wis.value
    );
    } else {
      data.skills.turn.rightMod = 0;
    }

    // compute Max Weight
    data.encumbrance.weight = (data.abilities.str.value)*100;
    if (data.class.value ==="dw") {
      data.encumbrance.weight = data.encumbrance.weight + 500;
    }

    /* Compute Max containers */    
    let numberContainers = 0;
    
    let slots = this.data.items.filter(
          (i) => i.type == "container" && !i.data.drop,
        );
        slots.forEach((item) => {
          numberContainers += 1;
        });
        if ( numberContainers > 4) {
          ui.notifications.error(`${this.data.name} ` +  game.i18n.localize("LM.toomuchcontainers"));
        }
    
    
    // Compute encumbrance

      let totalWeight = 0;
      let tempWeight = 0;
      let weightContainer = []
      Object.values(this.data.items).forEach((item) => {
        if (item.data.carried !== "encima") {
            tempWeight += item.data.quantity * item.data.weight;
            item.data.packed = true;
        } else {
          totalWeight += item.data.quantity * item.data.weight;
        }
        //  Compute containers capacity
        let totalContainers = 0;
        let contWeight = 0;
        let counter = 0
        const containers = this.data.items.filter((i) => i.type == "container");
        containers.forEach((a) => {
          if (!a.data.drop) {
            totalContainers += a.data.capacity.max;
            if (counter == 0 ) {
              contWeight += tempWeight;
              counter += 1
            }
          } else {
            if (counter == 0 ) {
              totalWeight -= contWeight;
              counter += 1
            }
          }
          data.abilities.str.containersCapacity = totalContainers;
          data.abilities.str.containerWeight = contWeight;
      });
        data.encumbrance = {
          pct: Math.clamped(
            (100 * parseFloat(totalWeight + contWeight)) / data.encumbrance.weight,
            0,
            100
          ),
          weight: data.encumbrance.weight,
          encumbered: totalWeight > data.encumbrance.weight,
          value: totalWeight + contWeight,
        }
      });
      let weight = data.encumbrance.value;
      if (weight >= data.encumbrance.weight + 1) {
        data.movement.base = 0;
      } else if (weight > data.encumbrance.weight) {
        data.movement.base = 30;
      } else if (weight > data.encumbrance.weight*0.75) {
        data.movement.base = 60;
      } else if (weight > data.encumbrance.weight*0.5) {
        data.movement.base = 90;
      } else {
        data.movement.base = 120;
      }
    // Compute combat movement
    data.movement.encounter = data.movement.base / 3;

    // Compute initiative value 
    data.initiative.bonus = classInfo.initBonus.yes;
    if (data.initiative.bonus) {
      data.initiative.value += (classInfo.initBonus.value + data.abilities.dex.init);
    } else {
      data.initiative.value += data.abilities.dex.init;
    }
    // Compute surprise modifier
    data.surprise.bonus = classInfo.surpriseBonus.yes;
    if (data.surprise.bonus){
      data.surprise.mod += (classInfo.surpriseBonus.value);
    }

    // Compute thac0 and modifiers
    data.thac0.value = classInfo.thac0[data.description.level.value];
    data.skills.proyectile = classInfo.hitbonusp.yes;
    data.thac0.mod.melee = data.abilities.str.mod;
    if (data.skills.proyectile){
      data.thac0.mod.proyectile = classInfo.hitbonusp.value;
      data.thac0.mod.missile = data.abilities.dex.mod + data.thac0.mod.proyectile;
    } else {
      data.thac0.mod.missile = data.abilities.dex.mod;
    }
    data.thac0.v1 = (data.thac0.value) - 1;
    data.thac0.v2 = (data.thac0.value) - 2;
    data.thac0.v3 = (data.thac0.value) - 3;
    data.thac0.v4 = (data.thac0.value) - 4;
    data.thac0.v5 = (data.thac0.value) - 5;
    data.thac0.v6 = (data.thac0.value) - 6;
    data.thac0.v7 = (data.thac0.value) - 7;
    data.thac0.v8 = (data.thac0.value) - 8;
    data.thac0.v9 = (data.thac0.value) - 9;
    //compute damage modifiers
    data.abilities.str.dmg = classInfo.dmgBonusm[data.description.level.value];
    data.abilities.dex.dmg = classInfo.dmgBonusp[data.description.level.value];
    
    // Compute saves
    data.saves.death.value = classInfo.saves.death[data.description.level.value];
    data.saves.wand.value = classInfo.saves.wand[data.description.level.value];
    data.saves.paralysis.value = classInfo.saves.paralysis[data.description.level.value];
    data.saves.breath.value = classInfo.saves.breath[data.description.level.value];
    data.saves.spell.value = classInfo.saves.spell[data.description.level.value];

    // Compute magicUser
    data.magicUser = classInfo.magic.yes;
    if (data.magicUser) {
      data.canSpell.lvl1 = classInfo.magic.spellsLevel.lvl1[data.description.level.value];
      data.canSpell.lvl2 = classInfo.magic.spellsLevel.lvl2[data.description.level.value];
      data.canSpell.lvl3 = classInfo.magic.spellsLevel.lvl3[data.description.level.value];
      data.canSpell.lvl4 = classInfo.magic.spellsLevel.lvl4[data.description.level.value];
      data.canSpell.lvl5 = classInfo.magic.spellsLevel.lvl5[data.description.level.value];
      data.canSpell.lvl6 = classInfo.magic.spellsLevel.lvl6[data.description.level.value];
      data.canSpell.lvl7 = classInfo.magic.spellsLevel.lvl7[data.description.level.value];
      data.canSpell.lvl8 = classInfo.magic.spellsLevel.lvl8[data.description.level.value];
      data.canSpell.lvl9 = classInfo.magic.spellsLevel.lvl9[data.description.level.value];
    }
    
    /* Compute freeHands */    
    let total = 0;
    let hands = this.data.items.filter(
      (i) => i.type == "weapon" && i.data.equipped || "armor" && i.data.equipped,
    );
    hands.forEach((item) => {
      total += 1;
      if (item.data.type !== "shield") {
        switch (item.data.type) {
          case "unarmored":
            total -= 1;
            break;
          case "light":
            total -= 1;
            break;
          case "medium":
            total -= 1;
            break;
          case "heavy":
            total -= 1;
          break;
          case "helm":
            total -= 1;
            break;
          case "magic":
            total -= 1;
            break;
          default:
            total = total;
        }
        if (item.data.oneTwoHands && item.data.isDamage2) {
          total += 1;
        }
      }
      if (item.data.twoHanded) {
        total += 1;
      }
    });
    data.hands = total;
    if ( data.hands >= 3) {
      ui.notifications.error(`${this.data.name} ` + game.i18n.localize("LM.toomuchhands"));
    }

    // Compute AC

    let baseAc = 9;
    let AcShield = 0;
    let AcHelm = 0;
    let AcMagic = 0;
    data.ac.bonus = classInfo.acBonus.yes
    if (data.ac.bonus) {
      data.ac.classBonus = classInfo.acBonus.value[data.description.level.value];
    } else {
      data.ac.classBonus = 0;
    }
    data.ac.naked = baseAc - data.ac.classBonus - data.abilities.dex.mod;
    const armors = this.data.items.filter((i) => i.type == "armor");
    armors.forEach((a) => {
      if (a.data.equipped && a.data.type == "unarmored") {
        baseAc = a.data.ac - data.ac.classBonus;
      } else if (a.data.equipped && a.data.type == "light") {
        baseAc = a.data.ac - data.ac.classBonus;
      } else if (a.data.equipped && a.data.type == "medium") {
        baseAc = a.data.ac - data.ac.classBonus;
      } else if (a.data.equipped && a.data.type == "heavy") {
        baseAc = a.data.ac;
      } else if (a.data.equipped && a.data.type == "shield") {
        AcShield = a.data.ac;
      } else if (a.data.equipped && a.data.type == "helm") {
        AcHelm = a.data.ac;
      } else if (a.data.equipped && a.data.type == "magic") {
        AcMagic = a.data.ac;
      }
    });
    data.ac.value = baseAc - data.abilities.dex.mod - AcShield - AcHelm - AcMagic;
    data.ac.shield = AcShield;
    data.ac.helm = AcHelm;
    data.ac.magic = AcMagic;
  }
  
  _prepareMonsterData(actorData){
    const data = actorData.data;

    // Compute combat movement
    data.movement.encounter = data.movement.base / 3;

    // Compute monster treasure
    const treasureTable = CONFIG.LM.treasureTable[data.treasure.table];
    data.treasure.pcPercent = treasureTable.pc[0];
    data.treasure.pcQuantity = treasureTable.pc[1];
    data.treasure.pptPercent = treasureTable.ppt[0];
    data.treasure.pptQuantity = treasureTable.ppt[1];
    data.treasure.pePercent = treasureTable.pe[0];
    data.treasure.peQuantity = treasureTable.pe[1];
    data.treasure.poPercent = treasureTable.po[0];
    data.treasure.poQuantity = treasureTable.po[1];
    data.treasure.ppPercent = treasureTable.pp[0];
    data.treasure.ppQuantity = treasureTable.pp[1];
    data.treasure.gemsPercent = treasureTable.gems[0];
    data.treasure.gemsQuantity = treasureTable.gems[1];
    data.treasure.jewelsPercent = treasureTable.jewels[0];
    data.treasure.jewelsQuantity = treasureTable.jewels[1];
    data.treasure.magicPercent = treasureTable.magic[0];
    data.treasure.magicQuantity = treasureTable.magic[1];
  }

  _prepareContainerData(actorData){
    const data = actorData.data;

  // Set market class 
  const marketClass = CONFIG.LM.marketClass[data.market.class];
  data.market.a = marketClass[0];
  data.market.b = marketClass[1];
  data.market.c = marketClass[2];
  data.market.d = marketClass[3];
  data.market.e = marketClass[4];
  data.market.f = marketClass[5];

  }

}