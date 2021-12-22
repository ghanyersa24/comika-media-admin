<template>
  <div>
    <crud-header title="Tags" url="article/tags" />
    <datatable url="article/tags" direct="article/tags" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/article/tags" });
      this.rows = data;
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>