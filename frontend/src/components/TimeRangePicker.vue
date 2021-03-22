<template>
  <div>
    <v-row justify="space-in-between" align="left">
      <v-col style="width: 350px; flex: 0 1 auto;">
        <v-dialog
          ref="startDialog"
          v-model="startModal"
          :return-value.sync="startTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startTime"
              label="Select Start Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="startModal" v-model="startTime" :max="endTime" :allowed-minutes="allowedMinutes">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startDialog.save(startTime)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col style="width: 350px; flex: 0 1 auto;">
        <v-dialog
          ref="endDialog"
          v-model="endModal"
          :return-value.sync="endTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endTime"
              label="Select End Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-model="endTime" :min="startTime" :allowed-minutes="allowedMinutes">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endModal = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.endDialog.save(endTime)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as moment from 'moment'

export default Vue.extend({
  data() {
    return {
      startTime: null,
      endTime: null,
      startModal: false,
      endModal: false
    }
  },
  methods: {
    allowedMinutes: m => m % 15 === 0
  },
  watch: {
    startTime: function(val) {
      this.$emit('start-time-changed', val)
    },
    endTime: function(val) {
      this.$emit('end-time-changed', val)
    }
  }
})
</script>
