<template>
<div>
    <v-btn
        outlined
        rounded
        text
        @click="log"
      >
        Button
      </v-btn>
      <transition name="bounce">
        <v-snackbar
            centered
            v-model="snackbar"
            v-if="snackbar"
            timeout="3000"
        >
            DENEMEeee
        </v-snackbar>
      </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false
    }
  },
  methods: {
    log () {
      this.snackbar = !this.snackbar
      console.log(this.snackbar)
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
