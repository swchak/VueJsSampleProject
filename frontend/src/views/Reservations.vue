<template>
  <div class="res-flex-container">
    <div class="res-flex-item">
      <select-date @date-changed="onDateChanged"></select-date>
    </div>
    <div class="res-flex-item">
      <v-data-table
        :headers="headers"
        :items="reservationItems"
        :items-per-page="5"
        class="elevation-1"
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import SelectDate from '../components/SelectDate.vue'
import * as reservationSvc from '../services/reservation.service'


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
      reservationItems: []
    }
  },
  methods: {
    async onDateChanged(val) {
      try {
        this.reservationItems = await reservationSvc.default.getReservationsList({
            date: val
          }
        )
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
  justify-content: center;
  width: 100%;
}

.res-flex-item-first {
  flex: 0 0 30%;
}
.res-flex-item {
  flex: 1 0 70%;
}
</style>
