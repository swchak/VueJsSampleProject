<template>
  <div class="res-flex-container">
    <div class="res-flex-item">
      <select-date @date-changed="onDateChanged"></select-date>
    </div>
    <div class="res-flex-item">
      <v-data-table
        :headers="headers"
        :items="localReservationItems"
        :items-per-page="10"
        class="elevation-1"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import SelectDate from '../components/SelectDate.vue'
import * as reservationSvc from '../services/reservation.service'
import moment from 'moment'


export default {
  components: { SelectDate },
  name: 'Reservations',
  data() {
    return {
      headers: [
        {
          text: 'User Name',
          value: 'userName'
        },
        {
          text: 'User Email',
          value: 'userEmail'
        },
        {
          text: 'Reservation Date & Time',
          value: 'reservationDateTime'
        },
        {
          text: 'Party Size',
          value: 'partySize'
        }
      ],
      localReservationItems: []
    }
  },
  methods: {
    async onDateChanged(val) {
      try {
        const reservationItems = await reservationSvc.default.getReservationsList({
            date: val
          }
        )
        this.localReservationItems = reservationItems.map(reservationItem => {
          return {
            userName: reservationItem.user.name,
            userEmail: reservationItem.user.email,
            reservationDateTime: moment(reservationItem.usedInventory.reservationDateTime).local().format('MMM DD YYYY hh:mm a'),
            partySize: reservationItem.partySize
          }
        })
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style lang="scss">
.res-flex-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.res-flex-item-first {
  flex: 1 0 auto;
}
.res-flex-item {
  flex: 1 0 auto;
  padding-top: 30px;
  padding-bottom: 30;
}
</style>
