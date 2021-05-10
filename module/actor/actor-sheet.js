/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class LmActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["lm", "sheet", "actor"],
      template: "systems/lm/templates/actor/actor-sheet.html",
      width: 500,
      height: 664,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributtes" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.config = CONFIG.LM;
    data.dtypes = ["String", "Number", "Boolean"];
    /*for (let attr of Object.values(data.data.attributes)) {
      attr.isCheckbox = attr.dtype === "Boolean";
    } */
    data.isGM = game.user.isGM;


    // Setup the fake container entry for "On Person" container
    data.containers = {
      'encima': {
          "data": {
              "name": "Encima",
              "type": "container",
              "data": {
                  "container": "encima",
                  "capacity": {
                    "max": 1,
                    "value": 0,
                  }
              }
          }
      }
    };
  

    this.actor.items.forEach(it => {
      if (it.type === 'container') {
          data.containers[it._id] = it;
      }
    });

    // Prepare items.
    if (this.actor.data.type == 'character') {
      this._prepareCharacterItems(data);
    }


    return data;
  }

  activateEditor(target, editorOptions, initialContent) {
    // remove some controls to the editor as the space is lacking
    if (target == "data.biography") {
      editorOptions.toolbar = "styleselect bullist hr table removeFormat save";
    }
    super.activateEditor(target, editorOptions, initialContent);
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const gear = [];
    const weapons = [];
    const containers = [];
    const armors = [];
    const consumables = [];
    const features = [];
    const occupations = [];
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
      if (i.type === "occupation") {
        occupations.push(i);
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
    actorData.occupations = occupations;
    actorData.spells = spells;

    this.actor.items.forEach(it => {
      if (it.type === 'container') {
          actorData.containers[it._id] = it;
      }
   });

  }

  async _chooseLang() {
    let choices = CONFIG.LM.languages;

    let templateData = { choices: choices },
      dlg = await renderTemplate(
        "/systems/lm/templates/dialog/lang-create.html",
        templateData
      );
    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: "",
        content: dlg,
        buttons: {
          ok: {
            label: game.i18n.localize("LM.Ok"),
            icon: '<i class="fas fa-check"></i>',
            callback: (html) => {
              resolve({
                choice: html.find('select[name="choice"]').val(),
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

  _pushLang() {
    const data = this.actor.data.data;
    this._chooseLang().then((dialogInput) => {
      const name = CONFIG.LM.languages[dialogInput.choice];
      let newData = [];
      data.skills.lan.learn.push(name);
      newData = data.skills.lan.learn;
      console.log(newData)
      return this.actor.update({ 
        data: {
          skills: {
            lan: {
              learn: newData,
            } 
          },
        },
      })
    });
  }
  _popLang() {
    const data = this.actor.data.data;
    let newData = [];
    data.skills.lan.learn.pop();
    newData = data.skills.lan.learn;
    console.log(newData)
    return this.actor.update({ 
        data: {
          skills: {
            lan: {
              learn: newData,
            } 
          },
        },
      })
    
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
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    function itemForClickEvent(clickEvent) {
      return $(clickEvent.currentTarget).parents(".item");
    }
    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Show Inventory Item in chat
    html.find(".item-show").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.show();
    });
    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });
    // Update Container Item
    html.find('.container-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item-titles");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });
    

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Delete Container Item
    html.find('.container-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item-titles");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Toggle inventory Item
    html.find(".item-toggle").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const weapons = this.actor.getOwnedItem(li.data("itemId"));
      await this.actor.updateOwnedItem({
        _id: li.data("itemId"),
        data: {
          equipped: !weapons.data.data.equipped,
        },
      });
    });
    html.find(".container-toggle").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item-titles");
      const containers = this.actor.getOwnedItem(li.data("itemId"));
      await this.actor.updateOwnedItem({
        _id: li.data("itemId"),
        data: {
          drop: !containers.data.data.drop,
        },
      });
    });
    html.find(".item-packed").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const items = this.actor.getOwnedItem(li.data("itemId"));
      await this.actor.updateOwnedItem({
        _id: li.data("itemId"),
        data: {
          packed: !items.data.data.packed,
        },
      });
    });
    html.find(".item-fast").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const items = this.actor.getOwnedItem(li.data("itemId"));
      await this.actor.updateOwnedItem({
        _id: li.data("itemId"),
        data: {
          fast: !items.data.data.fast,
          packed: true,
        },
      });
    });
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
    // Reset spells
    html.find(".spells .item-reset").click((ev) => {
      this._resetSpells(ev);
    });
    // Add 1 to Quantity
    html.find('.plus').click(clickEvent => {
      const shownItem = itemForClickEvent(clickEvent);
      const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.quantity = item.data.quantity + amount;
      this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
    // Add 1 to memorized
    html.find('.plusm').click(clickEvent => {
      const shownItem = itemForClickEvent(clickEvent);
      const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.memorized = item.data.memorized + amount;
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
    // Subtract 1 to memorized
    html.find('.minusm').click(clickEvent => {
      const shownItem = itemForClickEvent(clickEvent);
      const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.memorized = item.data.memorized - amount;
      this.actor.updateEmbeddedEntity('OwnedItem', item);
    });
    

    // Subtract 1 from Ammunition
    html.find('.spendAnmo').click(clickEvent => {
      const shownItem = itemForClickEvent(clickEvent);
      const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", shownItem.data("itemId")));
      let amount = (event.ctrlKey || event.metaKey) ? 10 : 1;
      item.data.range.ammunition.quantity = item.data.range.ammunition.quantity - amount;
      this.actor.updateEmbeddedEntity('OwnedItem', item);
    });

    // Toggle retainer
    html.find(".retainer").click(async (ev) => {
      const retainerValue = this.actor.data.data.retainer.enabled;
      this.actor.update({ "data.retainer.enabled": !retainerValue });
      this._render();
    });

    // Toggle righteous turn
    html.find(".righteous").click(async (ev) => {
      const rightValue = this.actor.data.data.skills.turn.righteous;
      this.actor.update({ "data.skills.turn.righteous": !rightValue });
      this._render();
    });
    

    // Expand inventory.
    html.find(".item-titles .item-caret").click((ev) => {
      let items = $(ev.currentTarget.parentElement.parentElement).children(
        ".item-list"
      );
      if (items.css("display") == "none") {
        let el = $(ev.currentTarget).find(".fas.fa-caret-right");
        el.removeClass("fa-caret-right");
        el.addClass("fa-caret-down");
        items.slideDown(200);
      } else {
        let el = $(ev.currentTarget).find(".fas.fa-caret-down");
        el.removeClass("fa-caret-down");
        el.addClass("fa-caret-right");
        items.slideUp(200);
      }
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));
    html.find('.moral-check').click(this._onMoralCheck.bind(this));
    html.find('.attribute-name').click(this._onAbilityCheck.bind(this));
    html.find('.skills-pack').click(this._onSkillsCheck.bind(this));
    html.find('.hd-roll').click(this._onHdRoll.bind(this));
    html.find('.rest-roll').click(this._onRestRoll.bind(this));
    html.find('.saving-throw').click(this._onSavingThrow.bind(this));
    html.find('.thac0-roll').click(this._onThac0Roll.bind(this));
    html.find('.turn.roll').click(this._onTurnRoll.bind(this));
    html.find('.surprise.roll').click(this._onSurpriseRoll.bind(this));
    html.find('.reaction.roll').click(this._onReactionRoll.bind(this));
    html.find('.initiative.roll').click(this._onInitiativeRoll.bind(this));

    // Generate character abilities
    html.find('.generate-abilities').click(this._onStatsRoll.bind(this));


    // Refresh turn undead
    html.find(".turn.refresh").click(async (ev) => {
      const newValue = 0;
      this.actor.update({ 
        data: {
          skills: {
            turn: {
              used: newValue,
            } 
          },
        },
      })
      this._render();
    });
    // Use the luck
    html.find(".useTheLuck").click(this._onLuck.bind(this));

    // Reset Luck
    html.find(".resetLuck").click(async (ev) => {
      const newValue = 1;
      this.actor.update({ 
        data: {
          skills: {
            luck: {
              value: newValue,
                } 
              },
            },
        })
        this._render();
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
    // Consumable use
    html.find(".item-image.consumable.use").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.spendConsumable();
    });
    

    // Occupation show.
    html.find('.occupation').click( ev => {
      const occupations = this.actor.data.items.find(i => i.type == "occupation");
      if(occupations){
          const item = this.actor.getOwnedItem(occupations._id);
          item.sheet.render(true);
      }
     });
    // In Hands show.
    html.find('.inhand').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        item.sheet.render(true);
      });

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
    // Add Delete languages.
    html.find(".item-push").click((ev) => {
      ev.preventDefault();
      this._pushLang();
    });
    html.find(".item-pop").click((ev) => {
      ev.preventDefault();
      this._popLang();
    });

  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
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
    return new Promise(resolve => {
      new Dialog({
        title: game.i18n.localize('LM.retainer.moral'),
        content:`<form>
        <div class="form-group">
          <label>Modificador a la moral</label>
          <input type='text' name='inputField'></input>
        </div>
       </form>`,
       buttons: {
         normal: {
           icon: '<i class="fas da-dice"></i>',
           label: game.i18n.localize('LM.retainer.moralcheck'),
           callback: (html) => {
             let mod = html.find('input[name=\'inputField\']');
             let moralMod = mod.val();
             let needed = this.actor.data.data.retainer.moral;
             let result = new Roll("2d6", data).roll();
             let flavor;
             if (result.total == 2) {
                flavor = game.i18n.localize('LM.retainer.stand');
             } else if (result.total == 12) {
                flavor = game.i18n.localize('LM.retainer.flee');
             } else {
                flavor = ((result.total - moralMod) <= needed ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
             }
             let text = game.i18n.localize('LM.retainer.moralcheck') + ": ";
             result.toMessage({
               speaker: ChatMessage.getSpeaker({actor: this.actor},{text : text}),
               flavor: text + flavor,
             }, {rollMode: DICE_ROLL_MODES.BLIND});
           }
         },
       },
      default: "roll",
      close: () => resolve(null)
      }).render(true);
    });
  }

  async _onStatsRoll(event) {
    event.preventDefault();
        const dice = '3d6';
        const rollstr = new Roll(dice).roll();
        let str = rollstr.total;
        const rollint = new Roll(dice).roll();
        let int = rollint.total
        const rollwis = new Roll(dice).roll();
        let wis = rollwis.total
        const rolldex = new Roll(dice).roll();
        let dex = rolldex.total
        const rollcon = new Roll(dice).roll();
        let con = rollcon.total
        const rollcha = new Roll(dice).roll();
        let cha = rollcha.total
        const data = {
          actor: this.actor,
          str,
          int,
          wis,
          dex,
          con,
          cha,
        };
        const chatContent = await renderTemplate("systems/lm/templates/chat/stat-block.html", data);
        ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                content: chatContent,
            }, );
    return;
  }

  _onAbilityCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    return new Promise(resolve => {
      new Dialog({
        title: game.i18n.localize('LM.abilities.check'),
        content:`<form>
        <div class="form-group">
          <label>Escoge tipo de tirada en la característica</label>
        </div>
       </form>`,
       buttons: {
        disadvantage: {
          icon: '<i class="fas fa-dice"></i>',
          label: game.i18n.localize('LM.roll.disadvantage'),
          callback: (html) => {
            let roll = new Roll("2d6kh", this.actor.data.data);
            let result = roll.roll();
            let needed = this.actor.data.data.abilities[dataset.abilities].check
            let flavor = (result.total <= this.actor.data.data.abilities[dataset.abilities].check ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + '<span class="objetive">(</span>' + needed + '<span class="objetive"> en 1d6)</span>'+ ": " + flavor
            });
          }
        },
        normal: {
          icon: '<i class="fas fa-dice-d6"></i>',
          label: game.i18n.localize('LM.roll.normal'),
          callback: (html) => {
            let roll = new Roll("1d6", this.actor.data.data);
            let result = roll.roll();
            let needed = this.actor.data.data.abilities[dataset.abilities].check
            let flavor = (result.total <= this.actor.data.data.abilities[dataset.abilities].check ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + '<span class="objetive">(</span>' + needed + '<span class="objetive"> en 1d6)</span>'+ ": " + flavor
            });
          }
        },
        advantage: {
          icon: '<i class="fas fa-dice"></i>',
          label: game.i18n.localize('LM.roll.advantage'),
          callback: (html) => {
            let roll = new Roll("2d6kl", this.actor.data.data);
            let result = roll.roll();
            let needed = this.actor.data.data.abilities[dataset.abilities].check
            let flavor = (result.total <= this.actor.data.data.abilities[dataset.abilities].check ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + '<span class="objetive">(</span>' + needed + '<span class="objetive"> en 1d6)</span>'+ ": " + flavor
            });
          }
        },
        },
        default: "roll",
        close: () => resolve(null)
        }).render(true);
   });
  }

  _onSkillsCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let bonus = this.actor.data.data.skills[dataset.skills].mod;
    let skb = "+" + bonus;
    return new Promise(resolve => {
      new Dialog({
        title: game.i18n.localize('LM.skillCheck'),
        content:`<form>
        <div class="form-group">
          <label>Escoge tipo de tirada en la habilidad</label>
        </div>
       </form>`,
       buttons: {
        disadvantage: {
          icon: '<i class="fas fa-dice"></i>',
          label: game.i18n.localize('LM.roll.disadvantage'),
          callback: (html) => {
            let roll = new Roll("3d6kl2" + skb, this.actor.data.data);
            let result = roll.roll();
            let needed = `<b class="attack"> 9+ </b>`;
            let flavor = (result.total >= 9  ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            let rollMode = DICE_ROLL_MODES.PUBLIC;
            if (dataset.skills == "sea"){
              rollMode = `blindroll`;
            } 
            if (dataset.skills == "he"){
              rollMode = `gmroll`;
            }
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + needed + flavor
            },{ rollMode : rollMode });
          }
        },
        normal: {
          icon: '<i class="fas fa-dice-d6"></i>',
          label: game.i18n.localize('LM.roll.normal'),
          callback: (html) => {
            let roll = new Roll("2d6" + skb, this.actor.data.data);
            let result = roll.roll();
            let needed = `<b class="attack"> 9+ </b>`;
            let flavor = (result.total >= 9  ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            let rollMode = DICE_ROLL_MODES.PUBLIC;
            if (dataset.skills == "sea"){
              rollMode = `blindroll`;
            } 
            if (dataset.skills == "he"){
              rollMode = `gmroll`;
            }
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + needed + flavor
            },{ rollMode : rollMode });
          }
        },
        advantage: {
          icon: '<i class="fas fa-dice"></i>',
          label: game.i18n.localize('LM.roll.advantage'),
          callback: (html) => {
            let roll = new Roll("3d6kh2" + skb, this.actor.data.data);
            let result = roll.roll();
            let needed = `<b class="attack"> 9+ </b>`;
            let flavor = (result.total >= 9  ? '<span class="success">Éxito</span> ' : '<span class="failed">Fallo</span> ');
            let rollMode = DICE_ROLL_MODES.PUBLIC;
            if (dataset.skills == "sea"){
              rollMode = `blindroll`;
            }
            if (dataset.skills == "he"){
              rollMode = `gmroll`;
            }
            result.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor:  (dataset.label ? `${dataset.label} ` : '') + needed + flavor
            },{ rollMode : rollMode });
          }
        },
        },
        default: "roll",
        close: () => resolve(null)
        }).render(true);
   });
  }

  async _onLuck(event) {
    event.preventDefault();
        const luck = 0;
        this.actor.update({ 
          data: {
            skills: {
              luck: {
                value: luck,
                  } 
                },
              },
        }),this._render();
        const chatContent = game.i18n.localize('LM.useTheLuck');
        ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                content: chatContent,
            }, );
    return;
  }


  _onHdRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let text = game.i18n.localize('LM.roll.hd');
    let data = this.actor.data.data;
    let hdb = "+" + data.abilities.con.mod;
    let dado = data.hp.hd;
    if (data.hp.advantage) {
       dado = "2"+ dado +"kh";
    }
    let result = new Roll(dado + hdb, data).roll();
    result.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: text
    });
  }
  _onRestRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.hd.restRoll'),
         content: `<form>
         <div class="form-group">
         <label for="rollSelect">Tipo de tirada</label>
         <select name="rollSelect">
           <option value="normal">Normal</option>
           <option value="disadvantage">Desventaja</option>
           <option value="advantage">Ventaja</option>
         </select>
          </div>
        </form>`,
         buttons: {
            short: {
              icon: '<i class="fas fa-plus-circle"></i>',
              label: game.i18n.localize('LM.hd.restShort'),
              callback: (html) => {
                let select = html.find('[name="rollSelect"]').val();
                let hdb = "+" + data.abilities.con.mod;
                let dice = data.hp.hd;
                switch (select) {
                  case "advantage":
                    dice = "2"+ dice +"kh";
                  break;
                  case "disadvantage":
                    dice = "2"+ dice +"kl";
                  break;
                  default:
                    dice = dice;
                }
                let result = new Roll(dice + hdb, data).roll();
                let newRest = this.actor.data.data.hp.rest.value + 1;
                let hpRoll = result.total;
                if (hpRoll < 1) {
                  hpRoll = 1;
                }
                let hpNow =  parseInt(this.actor.data.data.hp.value);
                let hpMax =  parseInt(this.actor.data.data.hp.max);
                let hpHeal = hpRoll + hpNow;
                if (hpHeal > hpMax) {
                  hpHeal = hpMax;
                }
                this.actor.update({ 
                  data: {
                    hp: {
                      rest: {
                        value: newRest,
                      },
                    value: hpHeal,
                    },
                  },
                })
                let text = game.i18n.localize('LM.hd.restRoll');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                  flavor: text,
                });
              }
            },
            long: {
              icon: '<i class="fas fa-plus-square"></i>',
              label: game.i18n.localize('LM.hd.restLong'),
              callback: (html) => {
                let select = html.find('[name="rollSelect"]').val();
                let dice = data.hp.hd;
                let levelDice = data.description.level.value;
                let hdlb = levelDice * (data.abilities.con.mod);
                let hdb = "+" + hdlb;
                switch (select) {
                  case "advantage":
                    dice = `${levelDice*2}`+ dice +"kh"+`${levelDice}`;
                  break;
                  case "disadvantage":
                    dice = `${levelDice*2}`+ dice +"kl"+`${levelDice}`;
                  break;
                  default:
                    dice = `${levelDice}`+ dice;
                }
                let result = new Roll(dice + hdb, data).roll();
                let newRest0 = Math.round(this.actor.data.data.hp.rest.value / 2);
                let newRest = this.actor.data.data.hp.rest.value - newRest0;
                let hpRoll = result.total;
                let hpNow =  parseInt(this.actor.data.data.hp.value);
                let hpMax =  parseInt(this.actor.data.data.hp.max);
                let hpHeal = hpRoll + hpNow;
                if (hpHeal > hpMax) {
                  hpHeal = hpMax;
                }
                this.actor.update({ 
                  data: {
                    hp: {
                      rest: {
                        value: newRest,
                      },
                    value: hpHeal,
                    },
                  },
                })
                let text = game.i18n.localize('LM.hd.restRoll');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                  flavor: text,
                });
              }
            },
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }

  _onDmgRoll(item, eventTarget)
  {
    let data = this.actor.data.data;
    let bdmg = "";
    let bdmgm = data.abilities.str.dmg;
    let bdmgp = data.abilities.dex.dmg;
    let text = game.i18n.localize('LM.items.damage2');
    if (item.data.data.melee || item.data.data.throw) {
      if (item.data.data.melee){
        bdmg = "+" + (data.abilities.str.mod + bdmgm);
      } else {
        bdmg = "+" + (data.abilities.str.mod + bdmgp);
        }
    }
    else if (item.data.data.type == "shield") {
      bdmg = "+" + (data.abilities.str.mod + bdmgm);
    } else {
      bdmg = "+" + bdmgp;
    }
    if(eventTarget.title === text)
    {
      let r = new Roll(item.data.data.damage2 + bdmg);
      r.roll();
      let messageHeader = "<b>" + item.name + ` hace </b><b class="failed"> daño</b>`;
      r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader});
    }
    else {
      let r = new Roll(item.data.data.damage + bdmg);
      r.roll();
      let messageHeader = "<b>" + item.name + ` hace </b><b class="failed"> daño</b>`;
      r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader});
    }
  }

  _onSkillRoll(item, eventTarget)
  {
    let data = this.actor.data.data;
    let type = item.data.data.rollType;
    let blindroll = item.data.data.blindroll;
    let objetive = item.data.data.rollTarget
    let text = game.i18n.localize('LM.items.roll');
    let success = "";
    let rollMode = DICE_ROLL_MODES.PUBLIC;
    if (blindroll){
      rollMode = DICE_ROLL_MODES.BLIND;
    } 
    let r = new Roll(item.data.data.roll);
    r.roll();
    if ( type == "above"){
      success = ( r.total  >=  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    } else if ( type == "below") {
      success = ( r.total  <=  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    } else {
      success = ( r.total  ==  objetive ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
    }
    let messageHeader = text + " " + item.name + `<b class="attack">` + objetive + `</b>:` + success;
    r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: messageHeader},
    { rollMode : rollMode });
  }


  _onSavingThrow(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    if (! dataset.save) return;
    let bonus = 0;
    let data = this.actor.data.data;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.saveCheck'),
         content: `<form>
         <div class="form-group">
           <label>Escoge modificador a tirada de salvación</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            normal: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: game.i18n.localize('LM.roll.normal'),
              callback: (html) => {
                let mod = html.find('input[name=\'inputField\']');
                let saveMod = mod.val();
                bonus = bonus + saveMod;
                let result = new Roll(bonus ? `d20+${bonus}` : "d20", data).roll();
                let success = (result.total >= data.saves[dataset.save].value ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
                let saveName = game.i18n.localize(`${CONFIG.LM.savesCheck[dataset.save]}`);
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: `${saveName} <b class="attack">${data.saves[dataset.save].value}+</b> ${success} `
                });
              }
            },
            venom: {
              icon: '<i class="fas fa-tint"></i>',
              label: game.i18n.localize('LM.roll.venom'),
              callback: (html) => {
                let mod = html.find('input[name=\'inputField\']');
                let saveMod = "+" + mod.val();
                bonus = data.abilities.con.venom + saveMod;
                let result = new Roll(bonus ? `d20+${bonus}` : "d20", data).roll();
                let success = (result.total >= data.saves[dataset.save].value ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
                let saveName = game.i18n.localize(`${CONFIG.LM.savesCheck[dataset.save]}`);
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: `${saveName} <b class="attack">${data.saves[dataset.save].value}+</b> ${success} `
                });
              }
            },
            magic: {
              icon: '<i class="fas fa-magic"></i>',
              label: game.i18n.localize('LM.roll.magic'),
              callback: (html) => {
                let mod = html.find('input[name=\'inputField\']');
                let saveMod =  "+" + mod.val();
                bonus = data.abilities.wis.save + saveMod;
                let result = new Roll(bonus ? `d20+${bonus}` : "d20", data).roll();
                let success = (result.total >= data.saves[dataset.save].value ? '<span class="success">Pasado</span> ' : '<span class="failed">Fallado</span> ');
                let saveName = game.i18n.localize(`${CONFIG.LM.savesCheck[dataset.save]}`);
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: `${saveName} <b class="attack">${data.saves[dataset.save].value}+</b> ${success} `
                });
              }
            }
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });

  }

  _onThac0Roll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const meleemod = data.thac0.mod.melee;
    const missilemod = data.thac0.mod.missile;
    const thac0 = data.thac0.value;
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
                let melee = meleemod;
                let result = new Roll("d20",data).roll();
                if (result.total == 1) {
                  let fumble = '<span class="failed"><a class="fumble">¡1! Posible pifia <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total == 20){
                  let critical = '<span class="success"><a class="critical">¡20! Golpeas y posible crítico <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: critical,
                  });
                } else {
                let hitac = thac0 - result.total - mod - melee;
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: `Ataque de melé da a CA:` + `<b class="attack">` + hitac + "</b>",
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
                let missile = missilemod
                let result = new Roll("d20", data).roll();
                if (result.total == 1) {
                  let fumble = '<span class="failed fumble"><a>¡1! Posible pifia <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total == 20){
                  let critical = '<span class="success critical"><a>¡20! Golpeas y posible crítico <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: critical,
                  });
                } else {
                let hitac = thac0 - result.total - mod - missile;
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: `Ataque de distancia da a CA:` + `<b class="attack">` + hitac + "</b>",
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

  _onWeaponRoll(item) {
    
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const meleemod = data.thac0.mod.melee;
    const missilemod = data.thac0.mod.missile;
    const itemBonus = item.data.data.bonus;
    const crit = item.data.data.crit;
    const thac0 = data.thac0.value;
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
                  let fumble = '<span class="failed"><a class="fumble">¡1! Posible pifia <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total >= crit){
                  let critical = `<span class="success critical"><a> ¡${crit}! Golpeas y posible crítico <i class="fas fa-dice"></i></a></span> `;
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: critical,
                  });
                } else {
                let hitac = thac0 - result.total - mod - melee;
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: "<b>"+ item.name + ":</b>" + ` Ataque de melé da a CA:` + `<b class="attack">` + hitac + "</b><br />Bono: " + "<b>" + melee + "</b>",
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
                  let fumble = '<span class="failed fumble"><a>¡1! Posible pifia <i class="fas fa-dice"></i></a></span> ';
                  result.toMessage({
                    speaker: ChatMessage.getSpeaker({actor: this.actor}),
                    flavor: fumble,
                  });
                } else if (result.total >= crit){
                  let critical = `<span class="success critical"><a> ¡${crit}! Golpeas y posible crítico <i class="fas fa-dice"></i></a></span> `;
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
                  flavor: "<b>"+ item.name + ":</b>" + ` Ataque de distancia da a CA:` + `<b class="attack">` + hitac + "</b><br />Bono: " + "<b>" + missile + "</b>",
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

  _onTurnRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let bonus = this.actor.data.data.skills.turn.value;
    let malus = this.actor.data.data.skills.turn.used;
    let hd = this.actor.data.data.skills.turn.rightMod
    let tb = "+" + bonus;
    let tm = "-" + malus;
    let hb = "+" + hd
    let roll = new Roll("2d6" + tb + tm, this.actor.data.data);
    let roll2 = new Roll("2d6" + hb, this.actor.data.data);
    let result = roll.roll();
    let text1 = result.total;
    let result2 = roll2.roll();
    let text2 = result2.total;
    let newData = this.actor.data.data.skills.turn.used + 1;
    this.actor.update({ 
      data: {
        skills: {
          turn: {
            used: newData,
          } 
        },
      },
    })
    let flavor2 = game.i18n.localize('LM.monsterHd.turn');
    let flavor = game.i18n.localize('LM.skills.turn');
    let finalText = flavor + ": " + `<b class="attack">` + text1 + "</b>, " + flavor2 + ": "+ `<b class="attack">` + text2 + "</b>";

    result.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor:  finalText
    });
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
    const reactionMod = data.abilities.cha.mod;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.reactionRoll'),
         content: `<form>
         <div class="form-group">
           <label>Modificador reacción</label>
           <input type='text' name='inputField'></input>
         </div>
         <div class="form-group">
        <label for="rollSelect">Tipo de tirada</label>
        <select name="rollSelect">
          <option value="normal">Normal</option>
          <option value="disadvantage">Desventaja</option>
          <option value="advantage">Ventaja</option>
        </select>
        </div>
        </form>`,
         buttons: {
            contract: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.contract'),
              callback: (html) => {
                let reactionMod2 = html.find('input[name=\'inputField\']');
                let select = html.find('[name="rollSelect"]').val();
                let mod2 = "+" + reactionMod2.val();
                let mod = "+" + reactionMod;
                let dice = "";
                switch (select) {
                  case "advantage":
                    dice = "3d6kh2";
                  break;
                  case "disadvantage":
                    dice = "3d6kl2";
                  break;
                  default:
                    dice = "2d6";
                }
                let result = new Roll( dice + mod + mod2, data).roll();
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
                let select = html.find('[name="rollSelect"]').val();
                let mod2 = "+" + reactionMod2.val();
                let mod = "+" + reactionMod;
                let dice = "";
                switch (select) {
                  case "advantage":
                    dice = "3d6kh2";
                  break;
                  case "disadvantage":
                    dice = "3d6kl2";
                  break;
                  default:
                    dice = "2d6";
                }
                let result = new Roll(dice + mod + mod2, data).roll();
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

  _onInitiativeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    const iniMod = data.initiative.value;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.initiative.value'),
         content: `<form>
         <div class="form-group">
           <label>Modificador iniciativa</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            normal: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize('LM.roll.normal'),
              callback: (html) => {
                let iniMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + iniMod2.val();
                let mod = "+" + iniMod;
                let result = new Roll("d6" + mod + mod2, data).roll();
                let initiativeRoll = game.i18n.localize('LM.initiativeRoll');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: initiativeRoll,
                });
             }
            },
            disadvantage: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.roll.disadvantage'),
              callback: (html) => {
                let iniMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + iniMod2.val();
                let mod = "+" + iniMod;
                let result = new Roll("2d6dh" + mod + mod2, data).roll();
                let initiativeRoll = game.i18n.localize('LM.initiativeRoll');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: initiativeRoll,
                });
              }
            },
            advantage: {
              icon: '<i class="fas fa-dice"></i>',
              label: game.i18n.localize('LM.roll.advantage'),
              callback: (html) => {
                let iniMod2 = html.find('input[name=\'inputField\']');
                let mod2 = "+" + iniMod2.val();
                let mod = "+" + iniMod;
                let result = new Roll("2d6dl" + mod + mod2, data).roll();
                let initiativeRoll = game.i18n.localize('LM.initiativeRoll');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: initiativeRoll,
                });
              }
            }
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }


}
