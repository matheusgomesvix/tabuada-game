<template>
  <q-page class="flex flex-center text-white" :style="{ backgroundColor }">
    <div class="q-pa-md column items-center">
      <div class="absolute-top-right text-white q-pa-sm">
        <div class="text-body1">
          {{ record }}
          <q-icon name="emoji_events" size="md" color="amber" />
        </div>
        <div class="text-body1">
          {{ score }}
          <q-icon name="psychology_alt" size="md" color="cyan" />
        </div>
      </div>
      <div class="text-h2 q-mb-md">{{ formattedMultiplication }}</div>
      <q-form @submit.prevent="onSubmit">
        <q-input
          ref="inputRef"
          v-model.number="answer"
          placeholder="Type result here"
          input-class="text-white text-h4 text-center"
          autofocus
          mask="#"
          reverse-fill-mask
          inputmode="numeric"
          borderless
          autocomplete="off"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { colors } from 'quasar'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useGameStore } from 'src/stores/game'

const gameStore = useGameStore()

const inputRef = ref(null)

const baseColor = '#000'
const backgroundColor = ref(baseColor)

const flashColor = (color) => {
  backgroundColor.value = color

  setTimeout(() => {
    backgroundColor.value = baseColor
  }, 350)
}

const randomNumber = (min, max) => {
  if (isNaN(min)) return null
  if (typeof max !== 'undefined' && isNaN(max)) return null
  if (typeof max === 'undefined') [min, max] = [0, min]

  return Math.floor(Math.random() * (max - min + 1) + min)
}

const answer = ref(null)

const score = ref(0)
const record = ref(gameStore.getRecord)

const n1 = ref(0)
const n2 = ref(0)

const result = computed(() => n1.value * n2.value)

const formattedMultiplication = computed(
  () => `${String(n1.value).padStart(2, '0')} x ${String(n2.value).padStart(2, '0')}`,
)

const generateRandomMultiplication = () => {
  n1.value = randomNumber(0, 10)
  n2.value = randomNumber(0, 10)
}

const onSubmit = () => {
  if (answer.value === null) return

  if (result.value === answer.value) {
    score.value++

    flashColor(colors.getPaletteColor('green-10'))

    generateRandomMultiplication()
  } else {
    score.value = 0

    flashColor(colors.getPaletteColor('red-10'))
  }

  answer.value = null

  if (score.value > record.value) {
    record.value = score.value
    gameStore.setRecord(score.value)
  }

  nextTick(() => {
    setTimeout(() => {
      inputRef.value.focus()
    }, 50)
  })
}

onMounted(() => {
  generateRandomMultiplication()
})
</script>

<style scoped>
.q-page {
  transition: background-color 1s ease;
}
</style>
