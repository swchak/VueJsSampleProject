<template>
  <v-app>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">
          Restaurant Booking Hub
        </h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="(item, key) in items" :key="key">
          <router-link :to="item.routerlink">{{ item.title }}</router-link>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, key) in items" :key="key">
          <div style="align-content: center">
            <router-view></router-view>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      tab: null,
      items: [
        {
          title: 'View Inventory',
          routerlink: '/inventory'
        },
        {
          title: 'Add Inventory',
          routerlink: '/inventory/create'
        },
        {
          title: 'View Reservations',
          routerlink: '/reservations'
        },
        {
          title: 'Make a reservation',
          routerlink: '/create-reservation'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 5px;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #eef2f7;
  }
}

.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
