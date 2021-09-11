<template>
  <div>
    <crud-header title="product" url="product" />
    <datatable url="store" direct="product" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "price"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/store" });
      this.rows = data.map((item) => {
        item.price = item.rupiah;
        return item;
      });
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>