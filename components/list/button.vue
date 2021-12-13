<template>
  <div class="col-4">
    <div class="row">
      <div class="col-6" v-if="list.length>1">
        <button class="btn btn-outline-danger rounded-pill" type="button" @click="remove(i)"><i class="fas fa-minus  m-auto"></i></button>
      </div>
      <div class="col-6">
        <button v-if="list.length==0 || i==list.length-1" class="btn btn-outline-primary rounded-pill" type="button" @click="add">
          <i class="fas fa-plus m-auto"></i>
        </button>
      </div>
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