import EventHandler from 'bootstrap/js/src/dom/event-handler'
import SelectorEngine from 'bootstrap/js/src/dom/selector-engine'

const NAME = 'inputlabel'
const DATA_KEY = 'bs.inputlabel'
const EVENT_KEY = `.${DATA_KEY}`
//const DATA_API_KEY = '.data-api'

const EVENT_FOCUS = `focus${EVENT_KEY}`
const EVENT_BLUR = `blur${EVENT_KEY}`
const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_ACTIVE = 'active'

class InputLabel {
  constructor(element) {
    this._element = element
    this._bindEvents()

    this._labelOut()
    this._labelOver()
  }

  // Getters

  static get NAME() {
    return NAME
  }

  // Public

  // Private
  _bindEvents() {
    if (this._element.getAttribute('type') === 'file') {
      EventHandler.on(this._element, EVENT_BLUR, () => {
        this._labelOut()
      })
    } else {
      EventHandler.on(this._element, EVENT_FOCUS, () => {
        this._labelOut()
      })
      EventHandler.on(this._element, EVENT_BLUR, () => {
        this._labelOver()
      })
      EventHandler.on(this._element, EVENT_CHANGE, () => {
        this._labelToggle()
      })
    }
  }

  _getLabel() {
    return SelectorEngine.findOne('label[for="' + this._element.getAttribute('id') + '"]')
  }

  _isEmpty() {
    return !this._element.value && !this._element.getAttribute('placeholder')
  }

  _labelOut() {
    const label = this._getLabel()
    if (label) {
      label.classList.add(CLASS_NAME_ACTIVE)
    }
  }
  _labelOver() {
    if (this._isEmpty()) {
      const label = this._getLabel()
      if (label) {
        label.classList.remove(CLASS_NAME_ACTIVE)
      }
    }
  }
  _labelToggle() {
    if (!this._isEmpty()) {
      this._labelOut()
    } else {
      this._labelOver()
    }
  }
}

export default InputLabel
