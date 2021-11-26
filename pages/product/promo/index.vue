<template>
  <div>
    <crud-header title="Promo" url="product/promo" />
    <datatable url="promo" direct="product/promo" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: [
        "publish",
        "name",
        "code",
        "discount",
        "publishedAt",
        "availableTo",
      ],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/promo" });
      this.rows = data.map((item) => {
        item.publish = item.isPublish
          ? `<i style="font-size:1.2em;" class="fas fa-star text-warning"></i>`
          : null;
        item.discount =
          item.category == "Nominal" ? item.rupiah : item.price * 100 + " %";
        item.publishedAt = this.$moment(item.publishedAt)
          .subtract(7, "hours")
          .format("DD MMMM YYYY HH:mm");
        item.availableTo = this.$moment(item.availableTo)
          .subtract(7, "hours")
          .format("DD MMMM YYYY HH:mm");
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