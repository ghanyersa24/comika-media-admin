<template>
  <div>
    <crud-header title="article" url="article" />
    <datatable url="article" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["title", "tag", "premium", "publish", "publishedAt", "reporter"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const { data } = await this.requestGet({
        url: "/article",
        params: { limit: 9999999999 },
      });
      data.map((item) => {
        item.comika = `${item.Comika.name}`;
        item.tag = item.Tag ? item.Tag.name : null;
        item.publishedAt = this.$moment(item.publishedAt)
          .subtract(7, "hours")
          .format("DD MMMM YYYY HH:mm");
        item.premium = item.isPremium
          ? `<i style="font-size:1.2em;color:gold" class="fas fa-star"></i>`
          : null;
        item.publish = !item.isPublish
          ? `<i style="font-size:1.2em;" class="fas fa-pencil-ruler"></i>`
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