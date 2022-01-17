<template>
  <div>
    <crud-header no-add title="Register" url="users" />
    <datatable view-only url="report/register" :thead="header" :data="rows" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "email", "phone", "birthdate"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/users/user" });
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