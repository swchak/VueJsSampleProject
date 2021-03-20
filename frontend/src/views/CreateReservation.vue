<template>
  <v-form id="create-reservation" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <select-date @date-changed="onDateChanged"></select-date>
    <v-select
      v-model="newReservationItem.reservationDateTime"
      :items="inventoryItems"
      :item-text="'inventoryDateTime'"
      :item-value="'id'"
      :rules="[v => !!v || 'Selection of time slot is required']"
      label="Select Time Slot to Reserve"
      required
    ></v-select>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Reserve
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectDate from '../components/SelectDate.vue'
import * as inventorySvc from '../services/inventory.service'
import { ReservationModel } from '../models/reservation.model'

export default Vue.extend({
  name: 'CreateReservation',
  components: { SelectDate },
  data() {
    return {
      inventoryItems: [],
      newReservationItem: new ReservationModel({})
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
        console.log(this.inventoryItems)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss">
#create-reservation {
  margin: 20px auto;
}
</style>
