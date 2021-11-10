<template>
  <div class="col-1">
    <button v-if="list.length==0 || i==list.length-1" class="btn btn-outline-primary rounded-pill w-100" type="button" @click="add"><i class="fas fa-plus"></i></button>
    <button v-else class="btn btn-outline-danger rounded-pill w-100" type="button" @click="remove(i)"><i class="fas fa-minus"></i></button>
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