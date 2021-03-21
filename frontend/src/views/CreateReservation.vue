<template>
  <v-form id="create-reservation" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newReservationItem.userName"
      :counter="10"
      label="Name"
      required
      :rules="rules.userName"
    ></v-text-field>

    <v-text-field
      v-model="newReservationItem.userEmail"
      label="E-mail"
      required
      :rules="rules.userEmail"
    ></v-text-field>
    <select-date @date-changed="onDateChanged"></select-date>
    <v-select
      v-model="newReservationItem.inventoryItemId"
      :items="inventoryItems"
      :item-text="'inventoryDateTime'"
      :item-value="'id'"
      :rules="[v => !!v || 'Selection of time slot is required']"
      label="Select Time Slot to Reserve"
      required
    ></v-select>
       <v-text-field
      v-model="newReservationItem.partySize"
      label="Party Size"
      required
      :rules="rules.partySize"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveReservation">
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

export default Vue.extend({
  name: 'CreateReservation',
  components: { SelectDate },
  data() {
    return {
      valid: false,
      inventoryItems: [],
      newReservationItem: new ReservationModel({}),
      rules: ReservationModel.dataValidators()
    }
  },
  methods: {
    async onDateChanged(val) {
      try {
        await inventorySvc.default
          .getInventoryList({
            date: val
          })
          .then(response => {
            this.inventoryItems = response
          })
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
</style>
