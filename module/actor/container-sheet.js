/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class LmContainerSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["lm", "sheet", "actor"],
      template: "systems/lm/templates/actor/container-sheet.html",
      width: 500,
      height: 664,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }



  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];

    // Prepare items.
    if (this.actor.data.type == 'container') {
      this._prepareContainerItems(data);
    }

    return data;
  }
/* -------------------------------------------- */

  activateEditor(target, editorOptions, initialContent) {
  // remove some controls to the editor as the space is lacking
  if (target == "data.travel") {
    editorOptions.toolbar = "save";
  }
  if (target == "data.members") {
    editorOptions.toolbar = "styleselect bullist hr save";
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
  _prepareContainerItems(sheetData) {
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

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    function itemForClickEvent(clickEvent) {
      return $(clickEvent.currentTarget).parents(".item");
    }


    // Encounter
    html.find(".encounterCheck").click(this._onEncounterCheck.bind(this));

    // Add turn hour
    html.find(".turnplus").click(async (ev) => {
      let newValue = this.actor.data.data.time.turn + 1;
      if ( newValue == 2) {
        ui.notifications.error(game.i18n.localize("LM.encounterCheck"));
      }
      if ( newValue == 4) {
        ui.notifications.error(game.i18n.localize("LM.encounterCheck"));
      }
      if ( newValue == 6) {
        ui.notifications.error(game.i18n.localize("LM.encounterCheck"));
      }
      if  (newValue == 7) {
        newValue = 1;
        ui.notifications.error(game.i18n.localize("LM.torch"));
        this.actor.update({ 
          data: {
            time: {
              turn: newValue,
              hour : this.actor.data.data.time.hour + newValue,
            },
          },
        })
      }
      this.actor.update({ 
          data: {
            time: {
              turn: newValue,
            },
          },
        })
      this._render();
    });

    html.find(".hourplus").click(async (ev) => {
      let hourValue = this.actor.data.data.time.hour + 1;
      if  (hourValue == 24) {
        hourValue = 0;
        ui.notifications.error(game.i18n.localize("LM.eat"));
      }
      this.actor.update({ 
          data: {
            time: {
              hour: hourValue,
            },
          },
        })
      this._render();
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
    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));
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
    // Delete Container Item
    html.find('.container-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item-titles");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });
    // Update Container Item
    html.find('.container-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item-titles");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
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

    // Toggle gm
    html.find(".gm-toggle").click(async (ev) => {
    const gmValue = this.actor.data.data.gm;
    if (game.user.isGM) {
    this.actor.update({ 
      "data.gm": !gmValue,
      "data.group": false,
      "data.object": false,
      "data.shop": false,
     });
    this._render();
    }
    });

    // Toggle group
    html.find(".group-toggle").click(async (ev) => {
    const groupValue = this.actor.data.data.group;
    if (game.user.isGM) {
    this.actor.update({ 
      "data.group": !groupValue,
      "data.gm": false,
      "data.object": false,
      "data.shop": false,
     });
    this._render();
    }
    });

    // Toggle object
    html.find(".object-toggle").click(async (ev) => {
    const objectValue = this.actor.data.data.object;
    if (game.user.isGM) {
    this.actor.update({ 
        "data.object": !objectValue,
        "data.group": false,
        "data.gm": false,
        "data.shop": false,
    });
    this._render();
    }
    });

    // Toggle shop
    html.find(".shop-toggle").click(async (ev) => {
    const shopValue = this.actor.data.data.shop;
    if (game.user.isGM) {
    this.actor.update({ 
        "data.shop": !shopValue,
        "data.group": false,
        "data.gm": false,
        "data.object": false,
    });
    this._render();
    }
    });

    // Toggle magicUser
    html.find(".magic-toggle").click(async (ev) => {
      const magicValue = this.actor.data.data.magicUser;
      this.actor.update({ "data.magicUser": !magicValue });
      this._render();
    });
    
    // Calculate px
    html.find(".calculate-xp").click(this._onCalculateXp.bind(this));

    // Disponibility check
    html.find(".item.disp").click(this._onItemDisp.bind(this));

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
  _onEncounterCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.encounterCheck'),
         content: game.i18n.localize('LM.encounterChoice'),
         buttons: {
            dungeon: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize('LM.dungeonCheck'),
              callback: () => {
                let result = new Roll("d6").roll();
                let distance = new Roll("2d6*10").roll();
                let encounter = (result.total <= 1 ? '<span class="failed">¡Encuentro! a </span> ' + distance.total + 'pies'  : '<span class="success">Sin encuentro</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: encounter,
                }, {rollMode: DICE_ROLL_MODES.BLIND});
             }
            },
            desert: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize('LM.desertCheck'),
              callback: () => {
                let result = new Roll("d6").roll();
                let distance = new Roll("4d6*10").roll();
                let encounter = (result.total <= 2 ? '<span class="failed">¡Encuentro! a </span> ' + distance.total + 'pies' : '<span class="success">Sin encuentro</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: encounter,
                }, {rollMode: DICE_ROLL_MODES.BLIND});
              }
            },
            mountain: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize('LM.mountainCheck'),
              callback: () => {
                let result = new Roll("d6").roll();
                let distance = new Roll("4d6*10").roll();
                let encounter = (result.total <= 3 ? '<span class="failed">¡Encuentro! a </span> ' + distance.total + 'pies' : '<span class="success">Sin encuentro</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: encounter,
                }, {rollMode: DICE_ROLL_MODES.BLIND});
              }
            }

         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }

  _onCalculateXp(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    let xpShare = data.pxShare;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.actors.pxShare'),
         content: `<form>
         <div class="form-group">
           <label>Nº miembros del grupo</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            normal: {
              icon: '<i class="fas fa-calculator"></i>',
              label: game.i18n.localize('LM.actors.pxCalc'),
              callback: (html) => {
                let players = html.find('input[name=\'inputField\']');
                let mod = players.val();
                let result = Math.floor(xpShare/mod);
                ChatMessage.create({
                  content: `<html>
                            <div><label><strong>Total Px:${xpShare}</label></div>
                            <div>Experiencia cada uno:${result}</div>
                            </html>`
                });
             }
            },
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }
  _onItemDisp(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    let data = this.actor.data.data;
    return new Promise(resolve => {
      new Dialog({
         title: game.i18n.localize('LM.items.disp'),
         content: `<form>
         <div class="form-group">
           <label>% de disponibilidad</label>
           <input type='text' name='inputField'></input>
         </div>
        </form>`,
         buttons: {
            normal: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: game.i18n.localize('LM.items.percent'),
              callback: (html) => {
                let percent = html.find('input[name=\'inputField\']');
                let mod = percent.val();
                let result = new Roll("d100" , data).roll();
                let isItem = (result.total <= mod ? '<span class="success">¡Uno disponible!</span> ' : '<span class="failed">Objeto no disponible</span> ');
                result.toMessage({
                  speaker: ChatMessage.getSpeaker({actor: this.actor}),
                  flavor: isItem,
              });
             }
            },
         },
         default: "roll",
         close: () => resolve(null)
        }).render(true);
    });
  }

}
