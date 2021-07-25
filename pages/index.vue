<template>
  <div>
    <h1>Users</h1>
    <datatable url="users" :thead="header" :data="rows" />
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