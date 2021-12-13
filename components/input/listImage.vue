<template>
  <input-custom :name="name">
    <div class="row mt-1" v-for="(item,i) in list" :key="i">
      <div class="col-md-6">
        <list-img :i="i" :key="i" :images="images" :val="item" @get="val=>updateInput(val,i)" />
      </div>
      <div>
        <list-button :i="i" :list="list" @get="(val)=>$emit('get',val)" />
      </div>
    </div>
  </input-custom>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
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
      if (val.thumbnail) {
        const data = this.list.map((item, i) => {
          if (i == idx) {
            return val;
          } else {
            return { ...item, thumbnail: false };
          }
        });
        this.$emit("get", data);
      } else {
        const data = this.list.map((item, i) => {
          if (i == idx) {
            return val;
          } else {
            return item;
          }
        });
        if (this.list.length == 1) {
          data[0].thumbnail = true;
        }
        this.$emit("get", data);
      }
    },
  },
};
</script>