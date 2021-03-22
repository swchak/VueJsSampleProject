<template>
  <v-card class="inventory-flex-container">
    <v-card-title class="inventory-flex-item-first"> 
      <select-date @date-changed="onDateChanged"></select-date>
    </v-card-title>
    <v-data-table
      :headers="mainHeaders"
      :items="inventoryItems"
       item-key="id"
       class="inventory-flex-item"
       >
    ></v-data-table>
  </v-card>
</template>

<script>
import SelectDate from '../components/SelectDate.vue'
import * as inventorySvc from '../services/inventory.service'
import moment from 'moment'

export default {
  components: { SelectDate },
  name: 'Inventory',

  data() {
    return {
      mainHeaders: [
        {
          text: 'Date/Time',
          value: 'dateTime',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Allowed Reservations',
          value: 'allowedReservations'
        },
        {
          text: 'Used Reservations',
          value: 'usedReservations'
        }
        ],
      inventoryItems: []
    }
  },
  methods: {
    async onDateChanged(val) {
      try {
        const itemsList = await inventorySvc.default.getInventoryList({
          date: val
        })
        console.log(itemsList)
        const transformInvItems = []
        itemsList.forEach(item => {
          const usedInvList = item.usedInventories
          item.usedInventories.forEach(usedInv => {
            transformInvItems.push({
              dateTime: moment(usedInv.reservationDateTime).local().format('MMM DD YYYY hh:mm a'),
              allowedReservations: item.allowedReservations,
              usedReservations: usedInv.usedReservations
            })
          })
        })

        this.inventoryItems = transformInvItems
             console.log(this.inventoryItems)
      } catch (error) {
        alert(error)
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
  flex: 0 1 100%;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 30px;
}
.inventory-flex-item {
  flex: 1 0 70%;
  padding-left: 60px;
  padding-right: 60px
}

</style>
