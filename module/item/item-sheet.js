/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class LmItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["lm", "sheet", "item"],
      width: 520,
      height: 478,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/lm/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/item-${this.item.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.config = CONFIG.LM;

    data.containers = { 'Encima': 'encima'};
    // Containers are not allowed in other containers.  So if this item is a container,
    // don't show any other containers.
    let containerValue = 0
    if (this.actor && this.item.data.type !== 'container') {
      if (data.data.carried !== 'encima') {
        containerValue = data.data.weight * data.data.quantity;
      }
      this.actor.items.forEach(it => {
        if (it.type === 'container') {
          data.containers[it.name] = it.name;
        }
        this.object.update({data: {capacity: {value: containerValue},
        }}
          );
      }); 
    } 
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    html.find('input[data-action="add-tag"]').keypress((ev) => {
      if (ev.which == 13) {
        let value = $(ev.currentTarget).val();
        let values = value.split(',');
        this.object.pushTag(values);
      }
    });
    html.find('.tag-delete').click((ev) => {
      let value = ev.currentTarget.parentElement.dataset.tag;
      this.object.popTag(value);
    });
    html.find('a.melee-toggle').click(() => {
      this.object.update({data: {melee: !this.object.data.data.melee}});
    });

    html.find('a.missile-toggle').click(() => {
      this.object.update({data: {missile: !this.object.data.data.missile}});
    });

    html.find('a.throw-toggle').click(() => {
      this.object.update({data: {throw: !this.object.data.data.throw}});
    });

    html.find('a.item-toggle.treasure').click(() => {
      this.object.update({data: {treasure: !this.object.data.data.treasure}});
    });
    html.find('a.item-toggle.splintered').click(() => {
      this.object.update({data: {splintered: !this.object.data.data.splintered}});
    });
    html.find('a.item-toggle.slow').click(() => {
      this.object.update({data: {slow: !this.object.data.data.slow}});
    });
    super.activateListeners(html);

    // Rolling occupation initial money
    html.find('.roll-item').click(this._onRollItem.bind(this));
  }

  /**
  * Handle clickable rolls.
  * @param {Event} event   The originating click event
  * @private
  */

  _onRollItem(event) {
    event.preventDefault();
    const element = event.currentTarget;
      const dataset = element.dataset;
  
    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.item.data.data);
      let label = dataset.label ? `Tirando ${dataset.label}` : '';
      roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
      }
  }
  
}
