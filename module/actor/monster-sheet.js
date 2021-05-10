/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class LmMonsterSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["lm", "sheet", "monster"],
      template: "systems/lm/templates/actor/monster-sheet.html",
      width: 490,
      height: 580,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /* -------------------------------------------- */

  /**
   * Monster creation helpers
   */
   async generateSave() {
    let choices = CONFIG.LM.monster_saves;

    let templateData = { choices: choices },
      dlg = await renderTemplate(
        "/systems/lm/templates/dialog/monster-saves.html",
        templateData
      );
    //Create Dialog window
    new Dialog({
      title: game.i18n.localize("LM.generateSaves"),
      content: dlg,
      buttons: {
        ok: {
          label: game.i18n.localize("LM.Ok"),
          icon: '<i class="fas fa-check"></i>',
          callback: (html) => {
            let hd = html.find('input[name="hd"]').val();
            this.actor.generateSave(hd);
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("LM.Cancel"),
        },
      },
      default: "ok",
    }, {
      width: 250
    }).render(true);
  }

  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];

    // Prepare items.
    if (this.actor.data.type == 'monster') {
      this._prepareMonsterItems(data);
    }
    
    return data;
  }


  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareMonsterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const gear = [];
    const weapons = [];
    const containers = [];
    const armors = [];
    const consumables = [];
    const features = [];
    const spells = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: []
    };

    

    // Iterate through items, allocating to containers
    // let totalWeight = 0;
    for (let i of sheetData.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      if (i.type === 'weapon') {
        weapons.push(i);
      }
      if (i.type === 'armor') {
        armors.push(i);
      }
      if (i.type === 'consumable') {
        consumables.push(i);
      }
      if (i.type === "container") {
        containers.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.data.lvl != undefined) {
          spells[i.data.lvl].push(i);
        }
      }
    }

    // Assign and return
    actorData.gear = gear;
    actorData.weapons = weapons;
    actorData.armors = armors;
    actorData.consumables = consumables;
    actorData.containers = containers;
    actorData.features = features;
    actorData.spells = spells;

    this.actor.items.forEach(it => {
      if (it.type === 'container') {
          actorData.containers[it._id] = it;
      }
   });
  }

  /* -------------------------------------------- */
  async _chooseItemType(choices = ["weapon", "armor", "shield", "consumable","gear"]) {
    let templateData = { types: choices },
      dlg = await renderTemplate(
        "systems/lm/templates/item/entity-create.html",
        templateData
      );
    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: game.i18n.localize("LM.dialog.createItem"),
        content: dlg,
        buttons: {
          ok: {
            label: game.i18n.localize("LM.Ok"),
            icon: '<i class="fas fa-check"></i>',
            callback: (html) => {
              resolve({
                type: html.find('select[name="type"]').val(),
                name: html.find('input[name="name"]').val(),
              });
            },
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: game.i18n.localize("LM.Cancel"),
          },
        },
        default: "ok",
      }).render(true);
    });
  }

  async _resetSpells(event) {
    let spells = $(event.currentTarget)
      .closest(".tab.spells")
      .find(".item");
    spells.each((_, el) => {
      let itemId = el.dataset.itemId;
      const item = this.actor.getOwnedItem(itemId);
      item.update({
        _id: item.id,
        "data.cast": 0,
      });
    });
  }


  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    function itemForClickEvent(clickEvent) {
      return $(clickEvent.currentTarget).parents(".item");
    }


    // Roll monster hp
    html.find(".hd-roll").click((ev) => {
      let actorObject = this.actor;
      actorObject.rollHP({ event: ev });
    });

    html.find('.moral-check').click(this._onMoralCheck.bind(this));
    html.find('.surprise-check').click(this._onSurpriseRoll.bind(this));
    html.find('.reaction-check').click(this._onReactionRoll.bind(this));
    html.find(".appearing-check.W").click(this._appearingW.bind(this));
    html.find(".appearing-check.D").click(this._appearingD.bind(this));
    html.find(".roll.treasure").click(this._onTreasureRoll.bind(this));
    html.find('.saving-throw').click(this._onSavingThrow.bind(this));

    // Add Inventory Item
    html.find(".item-create").click((event) => {
      event.preventDefault();
      const header = event.currentTarget;
      const type = header.dataset.type;

    // item creation helper func
    let createItem = function (type, name = `New ${type.capitalize()}`) {
      const itemData = {
      name: name ? name : `New ${type.capitalize()}`,
      type: type,
      data: duplicate(header.dataset),
      };
      delete itemData.data["type"];
      return itemData;
    };

    // Getting back to main logic
    if (type == "choice") {
    const choices = header.dataset.choices.split(",");
    this._chooseItemType(choices).then((dialogInput) => {
    const itemData = createItem(dialogInput.type, dialogInput.name);
    this.actor.createOwnedItem(itemData, {});
    });
    return;
    }
    const itemData = createItem(type);
    return this.actor.createOwnedItem(itemData, {});
    });
    // Input monster attacks
    html
    .find(".counter input")
    .click((ev) => ev.target.select())
    .change(this._onCountChange.bind(this));
    html.find(".item-reset").click((ev) => {
      this._resetCounters(ev);
    });
    // Add 1 to Quantity
    html.find('.plus').click(clickEvent => {
    const shownItem = itemForClickEvent(clickEvent);
    const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
    let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
    item.data.quantity = item.data.quantity + amount;
    this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
    // Subtract 1 from Quantity
    html.find('.minus').click(clickEvent => {
    const shownItem = itemForClickEvent(clickEvent);
    const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
    let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
    item.data.quantity = item.data.quantity - amount;
    this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
    
    // Show Inventory Item in chat
    html.find(".item-show").click(async (ev) => {
    const li = $(ev.currentTarget).parents(".item");
    const item = this.actor.getOwnedItem(li.data("itemId"));
    item.show();
    });
    
    // Reset spells
    html.find(".spells .item-reset").click((ev) => {
    this._resetSpells(ev);
    });
    // Add 1 to memorized
    html.find('.plusm').click(clickEvent => {
    const shownItem = itemForClickEvent(clickEvent);
    const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
    let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
    item.data.memorized = item.data.memorized + amount;
    this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
        
    // Subtract 1 to memorized
    html.find('.minusm').click(clickEvent => {
    const shownItem = itemForClickEvent(clickEvent);
    const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
    let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
    item.data.memorized = item.data.memorized - amount;
    this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
    
    // Update Inventory Item
    html.find('.item-edit').click(ev => {
    const li = $(ev.currentTarget).parents(".item");
    const item = this.actor.getOwnedItem(li.data("itemId"));
    item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragItemStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }

    // Generate Saves
    html.find('.monsterSaves').click(() => this.generateSave());

    // Toggle magicUser
    html.find(".magicUser").click(async (ev) => {
    const magicValue = this.actor.data.data.magicUser;
    this.actor.update({ "data.magicUser": !magicValue });
    this._render();
    });
    // Toggle damage
    html.find(".item-dmg").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const weapons = this.actor.getOwnedItem(li.data("itemId"));
      await this.actor.updateOwnedItem({
        _id: li.data("itemId"),
        data: {
          isDamage2: !weapons.data.data.isDamage2,
        },
      });
    });
    // inventory weapon rolls
    html.find('.dmg.roll').click(ev =>
      {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        this._onDmgRoll(item, ev.currentTarget);
    });
    html.find('.item-image.weapon').click(ev =>
      {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        this._onWeaponRoll(item, ev.currentTarget);
    });
    // skill roll
    html.find('.item-image.skill').click(ev =>
    {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        this._onSkillRoll(item, ev.currentTarget);
    });
    // cast spell
    html.find(".item-image.castSpell").click(async (ev) => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        item.spendSpell();
    });
    
  }


  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
  }

  _onMoralCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    let data = this.actor.data.data;
    let result = new Roll("2d6", data).roll();
    let needed = this.actor.data.data.retainer.moral;
    let flavor = (result.total <= needed ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
    let text = game.i18n.localize('LM.retainer.moralcheck') + ": ";
    result.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor},{text : text}),
      flavor: text + flavor,
    }, {rollMode: DICE_ROLL_MODES.BLIND});
  }

  _onSurpriseRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const surpriseMod = data.surprise.mod;
    const surprise = data.surprise.value;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.surprisename'),
         content: `<form>
         <div class="form-group">
           <label>Modificador sorpresa</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            normal: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize('LM.roll.normal'),
              callback: (html) => {
                let surpriseMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + surpriseMod2.val();
                let mod = "+" + surpriseMod;
                let result = new Roll("d6" + mod + mod2, data).roll();
                let surprised = (result.total <= surprise ? '<span class="failed">¡Sorprendido!</span> ' : '<span class="success">No sorprendido</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: surprised,
                });
             }
            },
            disadvantage: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.roll.disadvantage'),
              callback: (html) => {
                let surpriseMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + surpriseMod2.val();
                let mod = "+" + surpriseMod;
                let result = new Roll("2d6dh" + mod + mod2, data).roll();
                let surprised = (result.total <= surprise ? '<span class="failed">¡Sorprendido!</span> ' : '<span class="success">No sorprendido</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: surprised,
                });
              }
            }
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }

  _onReactionRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.reactionRoll'),
         content: `<form>
         <div class="form-group">
           <label>Modificador reacción</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            contract: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.contract'),
              callback: (html) => {
                let reactionMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + reactionMod2.val();
                let result = new Roll("2d6" + mod2, data).roll();
                let reaction = "";
                let control = result.total;
                if (control <= 2) {
                  control = 2;
                }
                switch (control) {
                  case 2:
                    reaction = game.i18n.localize('LM.refusedPlus');
                    break;
                  case 3:
                  case 4:
                  case 5:
                    reaction = game.i18n.localize('LM.refused');
                    break;
                  case 6:
                  case 7:
                  case 8:
                    reaction = game.i18n.localize('LM.undecided');
                    break;
                  case 9:
                  case 10:
                  case 11:
                    reaction = game.i18n.localize('LM.accepted');
                    break;
                  default:
                    reaction = game.i18n.localize('LM.acceptedPlus');
                }
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: reaction,
                });
             }
            },
            reaction: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.reaction'),
              callback: (html) => {
                let reactionMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + reactionMod2.val();
                let result = new Roll("2d6" + mod2, data).roll();
                let reaction = "";
                let control = result.total;
                if (control <= 2) {
                  control = 2;
                }
                switch (control) {
                  case 2:
                    reaction = game.i18n.localize('LM.hostilePlus');
                    break;
                  case 3:
                  case 4:
                  case 5:
                    reaction = game.i18n.localize('LM.hostile');
                    break;
                  case 6:
                  case 7:
                  case 8:
                    reaction = game.i18n.localize('LM.undecidedNormal');
                    break;
                  case 9:
                  case 10:
                  case 11:
                    reaction = game.i18n.localize('LM.indiferent');
                    break;
                  default:
                    reaction = game.i18n.localize('LM.friendly');
                }
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: reaction,
                });
              }
            }
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }
  _appearingW(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const wilderness = data.appearing.w;
    let rollParts = "";
    let label = "en Exterior";
    rollParts = new Roll(wilderness).roll();
    let result = rollParts;
    // Roll and return
    result.toMessage({
      parts: rollParts,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("LM.roll.appearing") + label,
      title: game.i18n.format("LM.roll.appearing") + label,
    });
  }
  _appearingD(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const dungeon = data.appearing.d;
    let rollParts = "";
    let label = "en Laberinto";
    rollParts = new Roll(dungeon).roll();
    let result = rollParts;
    // Roll and return
    result.toMessage({
      parts: rollParts,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("LM.roll.appearing") + label,
      title: game.i18n.format("LM.roll.appearing") + label,
    });
  }
  async _onTreasureRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const dice = '1d100';
    const rollpc = new Roll(dice).roll();
    let pc = rollpc.total;
    const rollppt = new Roll(dice).roll();
    let ppt = rollppt.total
    const rollpe = new Roll(dice).roll();
    let pe = rollpe.total
    const rollpo = new Roll(dice).roll();
    let po = rollpo.total
    const rollpp = new Roll(dice).roll();
    let pp = rollpp.total
    const rollgems = new Roll(dice).roll();
    let gems = rollgems.total
    const rolljewels = new Roll(dice).roll();
    let jewels = rolljewels.total
    const rollmagic = new Roll(dice).roll();
    let magic = rollmagic.total
    const data = this.actor.data.data;
    let treasurePc = (pc <= data.treasure.pcPercent ? data.treasure.pcQuantity : 0 );
    let treasurePpt = (ppt <= data.treasure.pptPercent ? data.treasure.pptQuantity : 0 );
    let treasurePe = (pe <= data.treasure.pePercent ? data.treasure.peQuantity : 0 );
    let treasurePo = (po <= data.treasure.poPercent ? data.treasure.poQuantity : 0 );
    let treasurePp = (pp <= data.treasure.ppPercent ? data.treasure.ppQuantity : 0 );
    let treasureGems = (gems <= data.treasure.gemsPercent ? data.treasure.gemsQuantity : 0 );
    let treasureJewels = (jewels <= data.treasure.jewelsPercent ? data.treasure.jewelsQuantity : 0 );
    let treasureMagic = (magic <= data.treasure.magicPercent ? data.treasure.magicQuantity : 0 );
    const treasure = {
      actor: this.actor,
      treasurePc,
      treasurePpt,
      treasurePe,
      treasurePo,
      treasurePp,
      treasureGems,
      treasureJewels,
      treasureMagic
    };
    const chatContent = await renderTemplate("systems/lm/templates/chat/treasure-roll.html", treasure);
    ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: chatContent,
            whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        },);
    return;

  }
  _onSavingThrow(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    if (! dataset.save) return;
    let bonus = 0;
    let data = this.actor.data.data;
    let result = new Roll(bonus ? `d20+${bonus}` : "d20", data).roll();
    let success = (result.total >= data.saves[dataset.save].value ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    let saveName = game.i18n.localize(`${CONFIG.LM.savesCheck[dataset.save]}`);
    result.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: `${saveName} <b class="attack">${data.saves[dataset.save].value}+</b> ${success} `
    });
  }
  _onWeaponRoll(item) {
    
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const meleemod = data.thac0.mod.melee;
    const missilemod = data.thac0.mod.missile;
    const itemBonus = item.data.data.bonus;
    const thac0 = data.thac0.value;
    item.update({
      data: { counter: { value: item.data.data.counter.value - 1 } },
    });
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.attack'),
         content: `<form>
         <div class="form-group">
           <label>Modificador ataque</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            melee: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: game.i18n.localize('LM.melee.attack'),
              callback: (html) => {
                let attackmod = html.find('input[name=\'inputField\']');
                let mod = attackmod.val();
                let melee = meleemod + itemBonus;
                let result = new Roll("d20", data).roll();
                if (result.total == 1) {
                  let fumble = '<span class="failed"><a class="fumble">¡1! Posible pifia</a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total == 20){
                  let critical = '<span class="success"><a class="critical">¡20! Golpeas y posible crítico</a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: critical,
                  });
                } else {
                let hitac = thac0 - result.total - mod - melee;
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: "<b>"+ item.name + ":</b>" + ` Ataque de melé da a CA:` + `<b class="attack">` + hitac + "</b>",
                });
              }
             }
            },
            missile: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: game.i18n.localize('LM.missile.attack'),
              callback: (html) => {
                let attackmod = html.find('input[name=\'inputField\']');
                let mod = attackmod.val();
                let missile = missilemod + itemBonus;
                let result = new Roll("d20", data).roll();
                if (result.total == 1) {
                  let fumble = '<span class="failed fumble"><a>¡1! Posible pifia</a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total == 20){
                  let critical = '<span class="success critical"><a>¡20! Golpeas y posible crítico</a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: critical,
                  });
                } else {
                let hitac = thac0 - result.total - mod - missile;
                item.update({
                  data: { range: { ammunition: {quantity : item.data.data.range.ammunition.quantity - 1 } }},
                });
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: "<b>"+ item.name + ":</b>" + ` Ataque de distancia da a CA:` + `<b class="attack">` + hitac + "</b>",
                });
              }
              }
            }
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
    
  }
  _onDmgRoll(item, eventTarget)
  {
    let data = this.actor.data.data;
    let text = game.i18n.localize('LM.items.damage2');
    if(eventTarget.title === text)
    {
      let r = new Roll(item.data.data.damage2);
      r.roll();
      let messageHeader = "<b>" + item.name + `</b><b class="failed"> daño</b>`;
      r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader});
    }
    else {
      let r = new Roll(item.data.data.damage);
      r.roll();
      let messageHeader = "<b>" + item.name + `</b><b class="failed"> daño</b>`;
      r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader});
    }
  }

  _onSkillRoll(item, eventTarget)
  {
    let data = this.actor.data.data;
    let type = item.data.data.rollType;
    let objetive = item.data.data.rollTarget
    let text = game.i18n.localize('LM.items.roll');
    let success = "";
    let r = new Roll(item.data.data.roll);
    r.roll();
    if ( type == "above"){
      success = ( r.total  >=  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    } else if ( type == "below") {
      success = ( r.total  <=  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    } else {
      success = ( r.total  ==  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    }
    let messageHeader = text + item.name +"(" + objetive + "):" + success;
    r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader});
  }

  async _resetCounters(event) {
    const weapons = this.actor.data.items.filter(i => i.type === 'weapon');
    for (let wp of weapons) {
      const item = this.actor.getOwnedItem(wp._id);
      await item.update({
        data: {
          counter: {
            value: parseInt(wp.data.counter.max),
          },
        },
      });
    }
  }
  async _onCountChange(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    if (event.target.dataset.field == "value") {
      return item.update({
        "data.counter.value": parseInt(event.target.value),
      });
    } else if (event.target.dataset.field == "max") {
      return item.update({
        "data.counter.max": parseInt(event.target.value),
      });
    }
  }
}
