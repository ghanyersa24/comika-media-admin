<template>
  <div>
    <input-custom :name="name">
      <input :id="idName" type="text" class="form-control" name="dates" />
    </input-custom>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    val: {
      type: Object,
      default: () => ({
        start: this.$moment().startOf("month").format("YYYY-MM-DD"),
        end: this.$moment().endOf("month").format("YYYY-MM-DD"),
      }),
    },
  },
  computed: {
    idName() {
      return this.name.replace(/ /g, "");
    },
    value() {
      // return this.val.start + " - " + this.val.end;
    },
  },
  mounted() {
    if (process.browser) {
      const emit = this.get;
      $(`#${this.idName}`).daterangepicker(
        {
          startDate: this.$moment(this.val.start),
          endDate: this.$moment(this.val.end),
        },
        emit
      );
    }
  },
  methods: {
    get(start, end) {
      return this.$emit("get", {
        start: this.$moment(start).format("YYYY-MM-DD"),
        end: this.$moment(end).format("YYYY-MM-DD"),
      });
    },
  },
};
</script>