<template>
  <div>
    <select-date></select-date>
  </div>
</template>

<script>
import axios from 'axios'
import SelectDate from '../components/SelectDate.vue'

export default {
  components: { SelectDate },
  name: 'Reservations',

  async mounted() {
    try {
      await axios.get('http://localhost:8080/api/reservations')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
