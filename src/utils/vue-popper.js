import PopperJS from './popper.js'

/**
 * @param {HTMLElement} [reference=$els.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$els.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: Object,
    popper: Object,
    offset: {
      default: 0
    },
    visible: Boolean,
    visibleArrow: Boolean,
    transition: String,
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  watch: {
    // visible(val) {
    //   if (val) {
    //     this.updatePopper()
    //   } else {
    //     this.destroyPopper()
    //   }
    // },
    showPopper(val) {
      if (val) {
        this.updatePopper()
      } else {
        this.destroyPopper()
      }
    }
  },

  data() {
    return {
      showPopper: false,
      popperElm: null,
      referenceElm: null,
      popperOptions: {}
    }
  },

  methods: {
    createPopper() {
      this.currentPlacement = this.currentPlacement || this.placement
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return
      }

      this.popperElm = this.popper || this.$refs.popper
      this.referenceElm = this.reference || this.$refs.reference

      if (!this.popperElm || !this.referenceElm) {
        return
      }

      if (this.visibleArrow) {
        this.appendArrow(this.popperElm)
      }

      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy()
      }

      this.popperOptions.placement = this.currentPlacement
      this.popperOptions.offset = this.offset

      this.popperJS = new PopperJS(
        this.referenceElm,
        this.popperElm,
        this.popperOptions
      )
      this.popperJS.options.onCreate(popper => {
        this.resetTransformOrigin(popper)
        this.$emit('created', this)
      })
    },

    updatePopper() {
      if (this.popperJS) {
        this.popperJS.update()
      } else {
        this.createPopper()
      }
    },

    doDestroy() {
      this.popperJS.popper.removeEventListener('transitionend', this.doDestroy)
      this.popperJS.destroy()
      this.popperJS = null
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin(this.popperJS)
        if (this.transition) {
          this.popperJS.popper.addEventListener('transitionend', this.doDestroy)
        } else {
          this.doDestroy()
        }
      }
    },

    resetTransformOrigin(popper) {
      let placementMap = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
      let placement = popper.popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      popper.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
    },

    appendArrow(element) {
      let hash
      if (this.appended) {
        return
      }

      this.appended = true

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name
          break
        }
      }

      const arrow = document.createElement('div')

      if (hash) {
        arrow.setAttribute(hash, '')
      }
      arrow.setAttribute('x-arrow', '')
      arrow.className = 'popper__arrow'
      element.appendChild(arrow)
    }
  },

  beforeDestroy() {
    if (this.popperJS) {
      this.popperJS.destroy()
    }
  }
}
