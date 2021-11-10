<template>
  <input-custom :name="name">
    <div class="row mt-1" v-for="(item,i) in list" :key="i">
      <div class="col-md-6">
        <list-input :val="item" @get="val=>updateInput(val,i)" />
      </div>
      <list-button :i="i" :list="list" @get="(val)=>$emit('get',val)" />
    </div>
  </input-custom>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    updateInput(val, idx) {
      const data = this.list.map((item, i) => {
        if (i != idx) return item;
        else return val;
      });
      this.$emit("get", data);
    },
  },
};
</script>