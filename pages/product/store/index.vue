<template>
  <div>
    <crud-header title="product" url="product/store" />
    <datatable url="store" direct="product/store" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: [
        "publish",
        "name",
        "price",
        "category",
        "publishedAt",
        "availableTo",
      ],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/store" });
      this.rows = data.map((item) => {
        item.publish = item.isPublish
          ? `<i style="font-size:1.2em;" class="fas fa-star text-warning"></i>`
          : null;
        item.publishedAt = this.$moment(item.publishedAt)
          .subtract(7, "hours")
          .format("DD MMMM YYYY HH:mm");
        item.availableTo = this.$moment(item.availableTo)
          .subtract(7, "hours")
          .format("DD MMMM YYYY HH:mm");
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