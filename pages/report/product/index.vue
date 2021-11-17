<template>
  <div>
    <crud-header no-add title="Product Report" url="users" />
    <datatable just-view url="report/product" :thead="header" :data="rows" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "priceRp", "qty", "totalRp"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/report/data/product" });
      data.map((item) => {
        item.id = item.id + "?name=" + item.name;
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