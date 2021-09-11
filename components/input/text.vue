<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <input :type="type" v-model="data" :placeholder="placeholder" :disabled="disabled" :readonly="disabled" class="form-control" :required="!noRequired">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    val: [String, Number],
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    placeholder() {
      return "Please input " + this.name;
    },
    idName() {
      return this.name.replace(/ /g, "");
    },
    data: {
      get() {
        return this.val;
      },
      set(val) {
        this.$emit("get", val);
      },
    },
  },
};
</script>