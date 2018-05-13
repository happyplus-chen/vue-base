<template>
  <div style="width:100%" v-clickoutside="handleClick">
    <input class="h-input" @click="showPopper=true" ref="reference">
    <transition name="transition-drop">
      <div v-show="showPopper" class="popper" ref="popper">
        <ul>
          <li v-for="(city,index) in data" :key="index">{{city}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
// import popper from '../src/utils/vue-popper'
import popper from '../src/utils/vue-popper'
import clickoutside from '../src/utils/clickoutside'
import mockjs from 'mockjs'
window.mock = mockjs
export default {
  mixins: [popper],
  directives: { clickoutside },
  data() {
    return {
      showPopper: false,
      currentPlacement: 'bottom-start'
    }
  },
  computed: {
    data() {
      let d = []
      for (let i = 0; i < 10; i++) {
        d.push(mockjs.Random.county())
      }
      return d
    }
  },
  methods: {
    handleClick() {
      this.showPopper = false
      // this.doDestroy()
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
  width: 220px;
  background: #fff
}
.zoom-in-top-enter-active,
.zoom-in-top-leave-active {
    transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s
}

.zoom-in-top-enter-active,
.zoom-in-top-leave-active {
    opacity: 1;
    -ms-transform: scaleY(1);
    transform: scaleY(1);
    -ms-transform-origin: center top;
    transform-origin: center top
}

.zoom-in-top-enter,
.zoom-in-top-leave-active {
    opacity: 0;
    -ms-transform: scaleY(0);
    transform: scaleY(0)
}

.transition-drop-leave-active {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
}

.transition-drop-appear,
.transition-drop-enter-active {
    -webkit-animation-name: ivuTransitionDropIn;
    animation-name: ivuTransitionDropIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.transition-drop-leave-active {
    -webkit-animation-name: ivuTransitionDropOut;
    animation-name: ivuTransitionDropOut;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.transition-drop-appear,
.transition-drop-enter-active {
    opacity: 0;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
}

.transition-drop-leave-active {
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
}
</style>
