<template>
  <div>
    <select-date @date-changed="onDateChanged"></select-date>
    <div>
      <time-picker
        @start-time-changed="onStartTimeChanged"
        @end-time-changed="onEndTimeChanged"
      ></time-picker>
      <!-- <time-picker title='Select Start Time' @time-changed="onStartTimeChanged"></time-picker>
      <time-picker title='Select End Time'  @time-changed="onEndTimeChanged"></time-picker> -->
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
          (value.length >= 0 && !isNaN(value)) || 'Numbers are only allowed'
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
      console.log(this.newItem)
      const { data: created } = await inventorySvc.default.postInventory(
        this.newItem
      )
      console.log(created)
      this.showAlertSuccess('Successfully created inventory')
    },
    onDateChanged(val) {
      this.newItem.inventoryDate = val
    },
    onStartTimeChanged(val) {
      console.log('start time changed')
      this.newItem.startTime = val
    },
    onEndTimeChanged(val) {
      console.log('end time changed')
      this.newItem.endTime = val
    }
  }
})
</script>
