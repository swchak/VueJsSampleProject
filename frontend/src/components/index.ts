import selectDate from './SelectDate.vue'
import TimePicker from './TimeRangePicker.vue'

export default {
  install: function(Vue, options) {
    Vue.component('select-date', selectDate)
    Vue.component('time-picker', TimePicker)
  }
}
