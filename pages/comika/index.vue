<template>
  <div>
    <crud-header title="Comika" url="comika" />
    <datatable url="comika" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "photo", "verified"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/comika" });
      data.map((item) => {
        item.photo = `<img class="my-1" src="${item.photo}" width="100" hight="100" alt="${item.name}">`;
        item.verified = item.verified
          ? `<i style="font-size:1.2em;color:gold" class="fas fa-star"></i>`
          : null;
      });
      this.rows = data;
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>