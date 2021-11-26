<template>
  <input-custom :name="name">
    <div class="row mt-1" v-for="(item,i) in list" :key="i">
      <div class="col-md-6">
        <list-input :val="item" @get="val=>updateInput(val,i)" />
      </div>
      <div class="col-2 row">
        <div class="col-6" v-if="list.length>1">
          <button class="btn btn-outline-danger rounded-pill w-100" type="button" @click="remove(i)"><i class="fas fa-minus"></i></button>
        </div>
        <div class="col-6">
          <button v-if="list.length==1 || i==list.length-1" class="btn btn-outline-primary rounded-pill w-100" type="button" @click="add"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  </input-custom>
</template>
<script>
export default {
  mounted() {
    alert(this.list);
  },
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
    remove(index) {
      const data = this.list.filter((item, i) => {
        if (i != index) return item;
      });
      this.$emit("get", data);
    },
    add() {
      const data = [...this.list, " "];
      this.$emit("get", data);
    },
  },
};
</script>