<script>
export default {
  methods: {
    renderTable(id = "table_id") {
      setTimeout(() => {
        $(`#${id}`).DataTable();
      }, 500);
    },
  },
};
</script>
