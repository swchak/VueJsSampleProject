<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Select Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable :allowed-dates="allowedDates">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import * as moment from 'moment'

export default Vue.extend({
  data: () => ({
    date: null,
    menu: false,
    modal: false,
    menu2: false
  }),
  methods: {
    allowedDates(_date) {
     const today = moment.default();
     const dateToCheck = moment.default(_date);
     return dateToCheck.diff(today) >= 0
    }
  },
  mounted() {
    this.date = new Date().toISOString().substr(0, 10)
  },
  watch: {
    date: function(val) {
      this.$emit('date-changed', val)
    }
  }
})
</script>
