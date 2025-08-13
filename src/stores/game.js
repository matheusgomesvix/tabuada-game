import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    record: 0,
  }),
  getters: {
    getRecord: (state) => state.record,
  },
  actions: {
    setRecord(newValue) {
      if (newValue > this.record) {
        this.record = newValue
      }
    },
  },
  persist: {
    paths: ['record'],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
