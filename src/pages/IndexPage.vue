<template>
  <q-page class="flex flex-center bg-blue-grey-9">
    <div>
      <my-timer />
      <div class="text-h1 text-white text-center">10 x 5 = ?</div>
      <q-input
        autofocus
        outlined
        inputmode="numeric"
        color="grey-1"
        bg-color="blue-grey-10"
        input-class="text-white text-h4 text-center"
        mask="#"
        reverse-fill-mask
      />
    </div>
  </q-page>
</template>

<script setup>
import MyTimer from 'src/components/MyTimer.vue'
</script>
