<template>
  <div class="inventory-flex-container">
    <div class="inventory-flex-item">
      <select-date @date-changed="onDateChanged"></select-date>
    </div>
    <div class="inventory-flex-item">
      <v-data-table
        :headers="headers"
        :items="inventoryItems"
        :items-per-page="5"
        class="elevation-1"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import SelectDate from '../components/SelectDate.vue'
import * as inventorySvc from '../services/inventory.service'

export default {
  components: { SelectDate },
  name: 'Inventory',

  data() {
    return {
      headers: [
        {
          text: 'Time Slot',
          value: 'inventoryDateTime'
        },
        {
          text: 'Reservations Allowed',
          value: 'allowedReservations'
        },
        {
          text: 'Reservations Used',
          value: 'usedReservations'
        }
      ],
      inventoryItems: []
    }
  },
  methods: {
    async onDateChanged(val) {
      console.log('inside onDateChanged')
      try {
        this.inventoryItems = await inventorySvc.default.getInventoryList({
          date: val
        })
        console.log(this.inventoryItems)
        // this.inventoryItems = await axios.post(
        //   'http://localhost:8080/api/inventory',
        //   {
        //     date: val
        //   }
        // )
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
.inventory-flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.inventory-flex-item-first {
  flex: 0 0 30%;
}
.inventory-flex-item {
  flex: 1 0 70%;
}
</style>
