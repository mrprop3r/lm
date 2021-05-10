/**
 * This function is used to hook into the Chat Log context menu to add additional options to each message
 * These options make it easy to conveniently apply damage to controlled tokens based on the value of a Roll
 *
 * @param {HTMLElement} html    The Chat Message being rendered
 * @param {Array} options       The Array of Context Menu options
 *
 * @return {Array}              The extended options Array including new context choices
 */
 export const addChatMessageContextOptions = function (html, options) {
  const canApply = function (li) {
    if (canvas.tokens.controlled.length === 0) return false
    if (li.find('.damage-applyable').length) return true
    if (li.find('.dice-total').length) return true
  }

  options.push(
    {
      name: game.i18n.localize('LM.ChatContextDamage'),
      icon: '<i class="fas fa-user-minus"></i>',
      condition: canApply,
      callback: li => applyChatCardDamage(li, 1)
    }
  )
  options.push(
    {
      name: game.i18n.localize('LM.ChatContextHealing'),
      icon: '<i class="fas fa-user-plus"></i>',
      condition: canApply,
      callback: li => applyChatCardDamage(li, -1)
    }
  )
  return options
}

export function addChatListeners(html) {
  html.on('click', '.fumble', onFumble);
  html.on('click', '.critical', onCritical);
  html.on('click', '.apply.abilities', onApplyAbilities);

}

/* -------------------------------------------- */


function onApplyAbilities(event) {
  console.log('apply');
}
function onFumble(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const dataset = element.dataset;
  let text = "";
  return new Promise(resolve => {
    new Dialog({
      title: game.i18n.localize('LM.roll.fumble'),
      content:`<form>
      <div class="form-group">
        <label>Escoge tirada normal o con desventaja</label>
      </div>
     </form>`,
     buttons: {
      normal: {
        icon: '<i class="fas fa-dice"></i>',
        label: game.i18n.localize('LM.roll.normal'),
        callback: (html) => {
          let roll = new Roll("2d6");
          let result = roll.roll();
          switch (result.total) {
            case 2 :
              text = game.i18n.localize("LM.fumble2");
              break;
            case 3:
              text = game.i18n.localize("LM.fumble3");
              break;
            case 4:
              text = game.i18n.localize("LM.fumble4");
              break;
            case 5:
              text = game.i18n.localize("LM.fumble5");
            break;
            case 6:
              text = game.i18n.localize("LM.fumble6");
              break;
            case 7:
              text = game.i18n.localize("LM.fumble7");
            break;
            default:
              text = game.i18n.localize("LM.fumble8");
          }
          result.toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor:  text
          });
        }
      },
      disadvantage: {
        icon: '<i class="fas fa-tshirt"></i>',
        label: game.i18n.localize('LM.roll.disadvantage'),
        callback: (html) => {
          let roll = new Roll("3d6kl2");
          let result = roll.roll();
          switch (result.total) {
            case 2 :
              text = game.i18n.localize("LM.fumble2");
              break;
            case 3:
              text = game.i18n.localize("LM.fumble3");
              break;
            case 4:
              text = game.i18n.localize("LM.fumble4");
              break;
            case 5:
              text = game.i18n.localize("LM.fumble5");
            break;
            case 6:
              text = game.i18n.localize("LM.fumble6");
              break;
            case 7:
              text = game.i18n.localize("LM.fumble7");
            break;
            default:
              text = game.i18n.localize("LM.fumble8");
          }
          result.toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor:  text
          });
        }
      },
      },
      default: "roll",
      close: () => resolve(null)
      }).render(true);
 });
}
function onCritical(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const dataset = element.dataset;
  let text = "";
  return new Promise(resolve => {
    new Dialog({
      title: game.i18n.localize('LM.roll.critical'),
      content:`<form>
      <div class="form-group">
        <label>Escoge tirada normal o con ventaja</label>
      </div>
     </form>`,
     buttons: {
      normal: {
        icon: '<i class="fas fa-dice"></i>',
        label: game.i18n.localize('LM.roll.normal'),
        callback: (html) => {
          let roll = new Roll("2d6");
          let result = roll.roll();
          switch (result.total) {
            case 7 :
              text = game.i18n.localize("LM.critical7");
              break;
            case 8:
              text = game.i18n.localize("LM.critical8");
              break;
            case 9:
              text = game.i18n.localize("LM.critical9");
              break;
            case 10:
              text = game.i18n.localize("LM.critical10");
            break;
            case 11:
              text = game.i18n.localize("LM.critical11");
              break;
            case 12:
              text = game.i18n.localize("LM.critical12");
            break;
            default:
              text = game.i18n.localize("LM.critical6");
          }
          result.toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor:  text
          });
        }
      },
      advantage: {
        icon: '<i class="fas fa-dice"></i>',
        label: game.i18n.localize('LM.roll.advantage'),
        callback: (html) => {
            let roll = new Roll("3d6kh2");
            let result = roll.roll();
            switch (result.total) {
              case 7 :
                text = game.i18n.localize("LM.critical7");
                break;
              case 8:
                text = game.i18n.localize("LM.critical8");
                break;
              case 9:
                text = game.i18n.localize("LM.critical9");
                break;
              case 10:
                text = game.i18n.localize("LM.critical10");
              break;
              case 11:
                text = game.i18n.localize("LM.critical11");
                break;
              case 12:
                text = game.i18n.localize("LM.critical12");
              break;
              default:
                text = game.i18n.localize("LM.critical6");
            }
            result.toMessage({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              flavor:  text
          });
        }
      },
      },
      default: "roll",
      close: () => resolve(null)
      }).render(true);
 });
}
/**
 * Apply rolled dice damage to the token or tokens which are currently controlled.
 * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
 *
 * @param {HTMLElement} roll    The chat entry which contains the roll data
 * @param {Number} multiplier   A damage multiplier to apply to the rolled damage.
 * @return {Promise}
 */
function applyChatCardDamage (roll, multiplier) {
  const amount = roll.find('.damage-applyable').attr('data-damage') ||
                   roll.find('.dice-total').text()
  return Promise.all(canvas.tokens.controlled.map(t => {
    const a = t.actor
    return a.applyDamage(amount, multiplier)
  }))
}
