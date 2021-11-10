<template>
  <div>
    <input class="form-control" v-model="vInput">
  </div>
</template>
<script>
export default {
  props: {
    val: { type: String },
    i: { type: Number },
  },
  computed: {
    vInput: {
      set(val) {
        this.$emit("get", val);
      },
      get() {
        return this.val;
      },
    },
  },
};
</script>