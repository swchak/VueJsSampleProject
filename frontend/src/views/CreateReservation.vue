<template>
  <v-form id="create-reservation" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newReservationItem.userName"
      :counter="10"
      label="Name"
      required
      :rules="rules.userName"
      class="form-field-style"
      style="width:30%"
    ></v-text-field>

    <v-text-field
      class="form-field-style"
      v-model="newReservationItem.userEmail"
      label="E-mail"
      required
      :rules="rules.userEmail"
      style="width:30%"
    ></v-text-field>
    <select-date class="form-field-style" @date-changed="onDateChanged"></select-date>
    <v-select
      class="form-field-style"
      v-model="newReservationItem.usedInventoryId"
      :items="localUsedInventoryList"
      :item-text="'reservationDateTime'"
      :item-value="'id'"
      :rules="[v => !!v || 'Selection of time slot is required']"
      label="Select Time Slot to Reserve"
      required
    ></v-select>
       <v-text-field
       class="form-field-style"
      v-model="newReservationItem.partySize"
      label="Party Size"
      required
      :rules="rules.partySize"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="form-field-style mr-4" @click="saveReservation">
      Reserve
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectDate from '../components/SelectDate.vue'
import * as inventorySvc from '../services/inventory.service'
import * as reservationSvc from '../services/reservation.service'
import { ReservationModel } from '../models/reservation.model'
import moment from 'moment'

export default Vue.extend({
  name: 'CreateReservation',
  components: { SelectDate },
  data() {
    return {
      valid: false,
      inventoryItems: [],
      newReservationItem: new ReservationModel({}),
      rules: ReservationModel.dataValidators(),
      localUsedInventoryList: null
    }
  },
  methods: {
    async onDateChanged(val) {
      try {
        const invList = await inventorySvc.default
          .getInventoryList({
            date: val
          })

          const usedInventoryList = []
          invList.forEach(inventoryItem => {
           const maxReservations = inventoryItem.allowedReservations
           inventoryItem.usedInventories.forEach(usedInventory => {
             usedInventory.reservationDateTime = moment( usedInventory.reservationDateTime).local().format('MMM DD YYYY hh:mm a')
             if(maxReservations - usedInventory.usedReservations > 0) {
               usedInventoryList.push(usedInventory)
             }
           })
          })
          this.localUsedInventoryList = usedInventoryList

      } catch (error) {
        alert(error)
      }
    },
  async saveReservation() {
    await reservationSvc.default.postReservation(this.newReservationItem)
    .then(response => {
      alert('saved reservation successfully')
    })
    .catch(error => alert(error))
  }
  }
})
</script>

<style lang="scss">
#create-reservation {
  margin: 20px auto;
}

.form-field-style{
  margin-left:7%;
  margin-right: 7%;
}
</style>
