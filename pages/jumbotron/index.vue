<template>
  <div>
    <crud-header title="jumbotron" url="jumbotron" />
    <datatable url="jumbotron" :thead="header" :data="rows" attrDel="sequence" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["access", "sequence", "image", "link"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/jumbotron" });
      data.map((item) => {
        item.image = `<img class="my-1" src="${item.img}" width="300" hight="100" >`;
        let access = "";
        if (item.isPhone) {
          access += `<i style="font-size:1.2em;color:gold" class="fas fa-mobile-alt mx-1"></i>`;
        }
        if (item.isDesktop) {
          access += `<i style="font-size:1.2em;color:gold" class="fas fa-desktop ml-1"></i>`;
        }
        item.access = access;
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