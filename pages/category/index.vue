<template>
  <div>
    <crud-header title="Category" url="category" />
    <datatable url="store/tags" direct="category" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  created() {
    this.$router.push("/");
  },
  data() {
    return {
      header: ["name", "type"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/store/category" });
      this.rows = data;
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>