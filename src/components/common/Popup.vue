<template>
  <transition name="fade">
    <div class="mask"  v-if="value" @click="close">
      <div class="popup-wrap" ref="popup" v-if="value"  @click='cancelBubble($event)'>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script >
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    cancelBubble(event){
      event.cancelBubble = true
    }
  }
}
</script>

<style>
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: -1000px;
  background: rgba(0,0,0,0.6);
  z-index: 11111;
}
.mask-fade-enter-active, .mask-fade-leave-active {
  transition: opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
}
.mask-fade-enter,
.mask-fade-leave-active {
  opacity: 0 !important;
}
.popup-wrap{
  width: 580px;
  position: fixed;
  background-color: #fff;
  padding: 50px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 6px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}


</style>
</script>