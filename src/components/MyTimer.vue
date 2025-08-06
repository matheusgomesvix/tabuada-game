<template>
  <div class="text-white text-h3 text-center">
    {{ formattedTime }}
    <!-- <button @click="start" :disabled="isRunning">Iniciar</button>
    <button @click="reset">Resetar</button> -->
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  initialMs: {
    type: Number,
    default: 60000,
  },
})

const timeLeft = ref(props.initialMs)
const timerId = ref(null)
const isRunning = ref(false)

const formattedTime = computed(() => {
  const totalMs = timeLeft.value
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = Math.floor((totalMs % 1000) / 10)

  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')
  const ms = milliseconds.toString().padStart(2, '0')

  return `${mm}:${ss}:${ms}`
})

const tick = () => {
  if (timeLeft.value > 0) {
    timeLeft.value -= 50
    if (timeLeft.value < 0) timeLeft.value = 0
  } else {
    stop()
  }
}

const start = () => {
  if (isRunning.value) return
  isRunning.value = true
  timerId.value = setInterval(tick, 50)
}

const stop = () => {
  isRunning.value = false
  clearInterval(timerId.value)
  timerId.value = null
}

// eslint-disable-next-line no-unused-vars
const reset = () => {
  stop()
  timeLeft.value = props.initialMs
}

onUnmounted(() => {
  stop()
})

defineExpose({ start, stop })
</script>
