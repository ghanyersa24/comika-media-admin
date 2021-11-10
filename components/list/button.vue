<template>
  <div class="col-2 row">
    <div class="col-6" v-if="list.length>1">
      <button class="btn btn-outline-danger rounded-pill w-100" type="button" @click="remove(i)"><i class="fas fa-minus"></i></button>
    </div>
    <div class="col-6">
      <button v-if="list.length==0 || i==list.length-1" class="btn btn-outline-primary rounded-pill w-100" type="button" @click="add"><i class="fas fa-plus"></i></button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    i: { type: Number, default: 0 },
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    remove(index) {
      const data = this.list.filter((item, i) => {
        if (i != index) return item;
      });
      this.$emit("get", data);
    },
    add() {
      const data = [...this.list, ""];
      this.$emit("get", data);
    },
  },
};
</script>