<template>
  <div>
    <nuxt-link to="/report/product" type="button" class="btn btn-outline-secondary mb-3"> <i class="fas fa-arrow-left"></i> Back</nuxt-link>
    <crud-header no-add :title="`Product <span class='text-warning'>${$route.query.name}</span> Report`" url="users" />
    <datatable no-action url="report/promo" :thead="header" :data="rows" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["week", "startDate", "lastDate", "priceRp", "qty", "totalRp"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({
        url: "/report/product/product/" + this.$route.params.id,
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