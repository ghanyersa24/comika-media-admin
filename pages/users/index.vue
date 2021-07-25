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
      const data = await this.requestGet({ url: "/users" });
      this.rows = data;
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>