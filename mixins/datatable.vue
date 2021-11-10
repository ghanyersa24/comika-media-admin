<script>
export default {
  methods: {
    renderTable(id = "table_id") {
      if (process.browser) {
        setTimeout(() => {
          $(`#${id}`).DataTable();
        }, 500);
      }
    },
  },
};
</script>
