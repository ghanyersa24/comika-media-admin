<template>
  <div>
    <crud-header title="Image Source" url="image-source" />
    <datatable url="source" direct="image-source" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["image", "name"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/source" });
      this.rows = data.map((item) => {
        item.image = `<img class="my-1" src="${item.url}" width="100" hight="100" alt="${item.name}">`;
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