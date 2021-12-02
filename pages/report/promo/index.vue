<template>
  <div>
    <crud-header no-add title="Promo Report" url="users" />
    <datatable just-view url="report/promo" :thead="header" :data="rows" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "promo", "qty", "totalRp"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/report/data/promo" });
      data.map((item) => {
        item.id = item.id + "?name=" + item.name;
        if (item.price <= 100) {
          item.promo = item.price + "%";
        } else {
          item.promo = item.priceRp;
        }
      });
      this.rows = data;
      if (process.browser) {
        setTimeout(() => {
          $(`#table_id`).DataTable({
            dom: "Bfrtip",
            buttons: ["excelHtml5", "pdfHtml5"],
          });
        }, 500);
      }
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>