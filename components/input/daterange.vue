<template>
  <date-range-picker ref="picker" :opens="opens" :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }" :minDate="minDate" :maxDate="maxDate" :singleDatePicker="singleDatePicker" :timePicker="timePicker" :timePicker24Hour="timePicker24Hour" :showWeekNumbers="showWeekNumbers" :showDropdowns="showDropdowns" :autoApply="autoApply" v-model="dateRange" @update="updateValues" @toggle="logEvent('event: open', $event)" @start-selection="logEvent('event: startSelection', $event)" @finish-selection="logEvent('event: finishSelection', $event)" :linkedCalendars="linkedCalendars">
    <template v-slot:input="picker" style="min-width: 350px;">
      {{ picker.startDate | date }} - {{ picker.endDate | date }}
    </template>
  </date-range-picker>
</template>
<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: { DateRangePicker },
  data() {
    return {
      dateRange: {
        start: this.$moment().subtract(1, "month"),
        end: this.$moment(),
      },
      opens: "center",
      minDate: this.$moment().subtract(1, "month"),
      maxDate: this.$moment(),
      singleDatePicker: false,
      timePicker: false,
      timePicker24Hour: false,
      showWeekNumbers: false,
      showDropdowns: false,
      autoApply: false,
      linkedCalendars: false,
      // dateFormat: "DD-MM-YYYY HH:mm:ss",
    };
  },
  methods: {
    updateValues(value) {
      this.dateRange = value;
      this.logEvent("event: update", value);
    },
    logEvent(event, value) {
      console.log(event, value);
    },
  },
};
</script>