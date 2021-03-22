<template>
  <div class="cr-inv-flex-container">
    <div class="cr-inv-flex-item" >
        <select-date @date-changed="onDateChanged"></select-date>
    </div>
    <div class="cr-inv-flex-item-second">
      <time-picker
        @start-time-changed="onStartTimeChanged"
        @end-time-changed="onEndTimeChanged"
      ></time-picker>
    </div>
    <div class="cr-inv-flex-item">
      <v-text-field
        label="Number Of Reservations Allowed"
        :rules="rules"
        hide-details="auto"
        v-model="localAllowedReservations"
        style="width:33%"
      >
      </v-text-field>
    </div>
    <div class="cr-inv-flex-item" >
      <v-btn color="primary" @click="saveInventory" :enabled="isValid" style="width 50px;height:30px">
        Add to Inventory
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectDate from '../components/SelectDate.vue'
import TimePicker from '../components/TimeRangePicker.vue'
import { InventoryModel } from '../models/inventory.model'
import * as inventorySvc from '../services/inventory.service'
import moment from 'moment'

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
        startDateTime: null,
        endDateTime: null,
        allowedReservations: null
      }),
      localAllowedReservations: null,
      localInvDate: null,
      localStartTime: null,
      localEndTime: null
    }
  },
  methods: {
    async saveInventory() {
      try{
        const { data: created } = await inventorySvc.default.postInventory(new InventoryModel({
            startDateTime: moment(this.localInvDate + ' ' + this.localStartTime, 'YYYY-MM-DD HH:mm'),
            endDateTime: moment(this.localInvDate + ' ' + this.localEndTime, 'YYYY-MM-DD HH:mm'),
            allowedReservations: this.localAllowedReservations
        }))
        alert('Successfully created inventory')
        this.$router.push({ name: 'Inventory'})
      } catch (error) {
        alert(error)
      }

    },
    isValid() {
      if(this.localInvDate && this.startDateTime && this.endDateTime && this.localAllowedReservations > 0) {
        return true
      }
      else return false
    },
    onDateChanged(val) {
      this.localInvDate = val
    },
    onStartTimeChanged(val) {
      this.localStartTime = val
    },
    onEndTimeChanged(val) {
      this.localEndTime = val
    }
  }
})
</script>

<style lang="scss">
.cr-inv-flex-container{
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.cr-inv-flex-item {
  flex: 0 1 50%;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 30px
}
.cr-inv-flex-item-second {
  flex: 1 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 30px
}


</style>