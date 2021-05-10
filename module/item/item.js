/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class LmItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // Set default image
    let img = CONST.DEFAULT_TOKEN;
        switch (this.data.type) {
        case "spell":
            img = "/systems/lm/assets/default/spell.png";
                break;
        case "feature":
            img = "/systems/lm/assets/default/ability.png";
                break;
        case "armor":
            img = "/systems/lm/assets/default/armor.png";
                break;
        case "weapon":
            img = "/systems/lm/assets/default/weapon.png";
                break;
        case "item":
            img = "/systems/lm/assets/default/item.png";
                break;
        case "consumable":
            img = "/systems/lm/assets/default/spiral-bottle.svg";
                break;
        case "occupation":
            img = "/systems/lm/assets/default/3d-meeple.svg";
                break;
        case "container":
            img = "/systems/lm/assets/default/item.png";
                break;
        }
    if (!this.data.img) this.data.img = img;
    
    super.prepareData();

    

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;

  }

  pushTag(values) {
    const data = this.data.data;
    let update = [];
    if (data.tags) {
      update = duplicate(data.tags);
    }
    let newData = {};
    var regExp = /\(([^)]+)\)/;
    if (update) {
      values.forEach((val) => {
        // Catch infos in brackets
        var matches = regExp.exec(val);
        let title = "";
        if (matches) {
          title = matches[1];
          val = val.substring(0, matches.index).trim();
        } else {
          val = val.trim();
          title = val;
        }
        // Auto fill checkboxes
        switch (val) {
          case CONFIG.LM.tags.melee:
            newData.melee = true;
            break;
          case CONFIG.LM.tags.slow:
            newData.slow = true;
            break;
          case CONFIG.LM.tags.missile:
            newData.missile = true;
            break;
          case CONFIG.LM.tags.throw:
            newData.throw = true;
            break;
          case CONFIG.LM.tags.twoHanded:
            newData.twoHanded = true;
            newData.oneTwoHands = true;
            break;
          case CONFIG.LM.tags.oneTwoHanded:
            newData.oneTwoHands = true;
            break;
        }
        update.push({ title: title, value: val });
      });
    } else {
      update = values;
    }
    newData.tags = update;
    return this.update({ data: newData });
  }

  popTag(value) {
    const data = this.data.data;
    let update = data.tags.filter((el) => el.value != value);
    let newData = {
      tags: update,
    };
    return this.update({ data: newData });
  }

  getChatData(htmlOptions) {
    const data = duplicate(this.data.data);

    // Rich text description
    data.description = TextEditor.enrichHTML(data.description, htmlOptions);

    // Item properties
    const props = [];
    const labels = this.labels;

    if (this.data.type == "weapon") {
      data.tags.forEach(t => props.push(t.value));
    }
    if (this.data.type == "spell") {
      let rollSave = game.i18n.localize(`LM.saves.${data.save}.check`);
      props.push(`${data.user}, nivel:${data.lvl}, alcance:${data.range}, duración:${data.duration}, `);
      props.push(data.save ? `${rollSave}` : "No tiene tirada de salvación");
    }
    if (this.data.type == "consumable") {
      props.push(data.fast ? "En hueco rápido" : "No en hueco rápido ");
    }
    if (this.data.type == "feature") {
      let rollSave = game.i18n.localize(`LM.saves.${data.save}.check`);
      props.push(data.save ? `${rollSave}` : "No tiene tirada de salvación");
    }
    // Filter properties and return
    data.properties = props.filter((p) => !!p);
    return data;
  } 

  spendSpell() {
    this.update({
      data: {
        cast: this.data.data.cast + 1,
      },
    }).then(() => {
      this.show({ skipDialog: true });
    });
  }

  spendConsumable() {
    this.update({
      data: {
        quantity: this.data.data.quantity - 1,
      },
    }).then(() => {
      this.show({ skipDialog: true });
    });
  }


  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    // Basic template rendering data
    const token = this.actor.token;
    const item = this.data;
    const actorData = this.actor ? this.actor.data.data : {};
    const itemData = item.data;

    if ( this.data.type == "weapon") {
    let roll = new Roll('d20', actorData);
    let label = `Ataque ${item.name}`;
    roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: label
    });
    }
    if ( this.data.type == "feature") {
      let roll = new Roll('2d6', actorData);
      let label = `Tirando habilidad ${item.name}`;
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
      }
  }

    /**
   * Show the item to Chat, creating a chat card which contains follow up attack or damage roll options
   * @return {Promise}
   */
  async show() {
    // Basic template rendering data
    const token = this.actor.token;
    const templateData = {
      actor: this.actor,
      tokenId: token ? `${token.scene._id}.${token.id}` : null,
      item: this.data,
      data: this.getChatData(),
      labels: this.labels,
      isHealing: this.isHealing,
      hasDamage: this.hasDamage,
      isSpell: this.data.type === "spell",
      hasSave: this.hasSave,
      config: CONFIG.LM,
    };

    // Render the chat card template
    const template = `systems/lm/templates/chat/item-chat.html`;
    const html = await renderTemplate(template, templateData);

    // Basic chat message data
    const chatData = {
      user: game.user._id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html,
      speaker: {
        actor: this.actor._id,
        token: this.actor.token,
        alias: this.actor.name,
      },
    };

    // Toggle default roll mode
    let rollMode = game.settings.get("core", "rollMode");
    if (["gmroll", "blindroll"].includes(rollMode))
      chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
    if (rollMode === "selfroll") chatData["whisper"] = [game.user._id];
    if (rollMode === "blindroll") chatData["blind"] = true;

    // Create the chat message
    return ChatMessage.create(chatData);
  }

}
