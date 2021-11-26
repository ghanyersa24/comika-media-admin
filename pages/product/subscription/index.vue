<template>
  <div>
    <crud-header title="Subscription" url="product/subscription" />
    <datatable url="store" direct="product/subscription" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
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
        "price",
        "long time",
        "publishedAt",
        "availableTo",
      ],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/package" });
      this.rows = data.map((item) => {
        item.publish = item.isPublish
          ? `<i style="font-size:1.2em;" class="fas fa-star text-warning"></i>`
          : null;
        item.price = item.rupiah;
        item["long time"] = item.longTime + " hari";
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