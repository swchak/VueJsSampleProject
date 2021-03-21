<template>
  <div>
    <select-date @date-changed="onDateChanged"></select-date>
    <div>
      <time-picker
        @start-time-changed="onStartTimeChanged"
        @end-time-changed="onEndTimeChanged"
      ></time-picker>
    </div>
    <v-spacer></v-spacer>
    <v-text-field
      label="Number Of Reservations Allowed"
      :rules="rules"
      hide-details="auto"
      v-model="newItem.allowedReservations"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="saveInventory">
      Add to Inventory
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectDate from '../components/SelectDate.vue'
import TimePicker from '../components/TimeRangePicker.vue'
import { InventoryModel } from '../models/inventory.model'
import * as inventorySvc from '../services/inventory.service'

export default Vue.extend({
  components: { SelectDate, TimePicker },
  data() {
    return {
      time: null,
      menu2: false,
      modal2: false,
      rules: [
        value => !!value || 'Required.',
        value =>
          !isNaN(value) || 'Numbers are only allowed'
      ],
      newItem: new InventoryModel({
        inventoryDate: null,
        startTime: null,
        endTime: null,
        allowedReservations: null,
        usedReservations: 0
      })
    }
  },
  methods: {
    async saveInventory() {
      try{
        const { data: created } = await inventorySvc.default.postInventory(this.newItem)
        alert('Successfully created inventory')
        this.$router.push({ name: 'Inventory'})
      } catch (error) {
        alert(error)
      }

    },
    onDateChanged(val) {
      this.newItem.inventoryDate = val
    },
    onStartTimeChanged(val) {
      this.newItem.startTime = val
    },
    onEndTimeChanged(val) {
      this.newItem.endTime = val
    }
  }
})
</script>
