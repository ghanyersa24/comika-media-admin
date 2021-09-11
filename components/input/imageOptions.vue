<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9 row" style="height:50vh;overflow-y:auto">
      <div class="col-sm-4 my-1" v-for="(item,i) in options" :key="i">
        <input type="checkbox" :id="'img'+i" v-model="data" :value="item.id">
        <label :for="'img'+i" class="d-inline">
          <span class="position-relative text-white" style="right:10px;z-index:10">{{val.indexOf(item.id)>=0?val.indexOf(item.id)+1:null}}</span>
          <img :src="item.src" class="w-75" :for="'img'+i" />
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    val: {
      type: [String, Array],
      default: "",
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