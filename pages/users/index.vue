<template>
  <div>
    <crud-header title="User" url="users" />
    <datatable url="users" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "email", "role"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/users/admin" });
      this.rows = data;
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>