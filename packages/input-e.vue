<template>
  <div style="width:100%" v-clickoutside="handleClick">
    <input v-model="inputVal" class="h-input" @click="showPopper=true" @change="change" ref="reference">
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <div v-show="showPopper" class="popper" ref="popper">
        <ul>
          <li v-for="(city,index) in data" :key="index" @click="doSelect">{{city}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import popper from '../src/utils/ele-vue-popper'
import clickoutside from '../src/utils/clickoutside'
import mockjs from 'mockjs'
window.mock = mockjs
export default {
  mixins: [popper],
  directives: { clickoutside },
  created() {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper()
    })
    this.$on('visible', val => {
      this.showPopper = val
    })
  },
  data() {
    return {
      showPopper: false,
      currentPlacement: 'bottom-start',
      inputVal: ''
      // visibleArrow: true
    }
  },
  computed: {
    data() {
      let d = []
      for (let i = 0; i < 5; i++) {
        d.push(mockjs.Random.county())
      }
      return d
    }
  },
  watch: {
    inputVal() {
      this.validate('change')
    }
  },
  methods: {
    handleClick() {
      this.showPopper = false
      // this.doDestroy()
    },
    change(value) {
      this.$emit('change', value)
    },
    doSelect(e) {
      this.inputVal = e.target.innerText
      this.$emit('change', e.target.innerText)
      this.showPopper = false
    },
    validate(trigger, callback = function() {}) {
      var descriptor = {
        name: { type: 'string', len: 4, required: true }
      }
      var validator = new AsyncValidator(descriptor)
      validator.validate({ name: this.inputVal }, (errors, fields) => {
        if (errors) {
          // validation failed, errors is an array of all errors
          // fields is an object keyed by field name with an array of
          // errors per field
          return this.handleErrors(errors, fields)
        }
        this.$el.querySelector('input').className = 'h-input'
        // validation passed
      })
    },
    handleErrors(errors, fields) {
      console.warn(arguments)
      this.$el.querySelector('input').className = 'h-input error'
    }
  }
  // watch: {
  //   show(value) {
  //     if (value) {
  //       this.updatePopper()
  //     }
  //   }
  // }
}
</script>

<style scoped>
.h-input {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
ul {
  list-style: none;
  border: 1px solid #ccc;
}
li {
  line-height: 32px;
}
li:hover {
  background: burlywood;
}
.popper {
  width: 200px;
  background: #fff;
}

.error{
  border-color: red;
  box-shadow: 0px 0px 1px 1px red;
}
.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active,
.el-zoom-in-left-enter-active,
.el-zoom-in-left-leave-active,
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s,
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
}

.el-zoom-in-center-enter,
.el-zoom-in-center-leave-active {
  opacity: 0;
  -ms-transform: scaleX(0);
  transform: scaleX(0);
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  -ms-transform: scaleY(1);
  transform: scaleY(1);
  -ms-transform-origin: center top;
  transform-origin: center top;
}

.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
  opacity: 0;
  -ms-transform: scaleY(0);
  transform: scaleY(0);
}

.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
  opacity: 1;
  -ms-transform: scaleY(1);
  transform: scaleY(1);
  -ms-transform-origin: center bottom;
  transform-origin: center bottom;
}

.el-zoom-in-bottom-enter,
.el-zoom-in-bottom-leave-active {
  opacity: 0;
  -ms-transform: scaleY(0);
  transform: scaleY(0);
}

.el-zoom-in-left-enter-active,
.el-zoom-in-left-leave-active {
  opacity: 1;
  -ms-transform: scale(1, 1);
  transform: scale(1, 1);
  -ms-transform-origin: top left;
  transform-origin: top left;
}

.el-zoom-in-left-enter,
.el-zoom-in-left-leave-active {
  opacity: 0;
  -ms-transform: scale(0.45, 0.45);
  transform: scale(0.45, 0.45);
}
</style>
