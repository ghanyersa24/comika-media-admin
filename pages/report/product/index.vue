<template>
  <div>
    <crud-header no-add title="Product Report" url="users" />
    <datatable view-only url="report/product" :thead="header" :data="rows" />
    <chart-bar v-if="isShowData" :chartData="reportProduct" :height="100" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "priceRp", "qty", "totalRp"],
      isShowData: false,
      rows: [],
      reportProduct: {
        labels: ["Product"],
        datasets: [
          {
            label: "Terjual",
            backgroundColor: [],
          },
        ],
      },
    };
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async getAll() {
      this.isShowData = false;
      const data = await this.requestGet({ url: "/report/data/product" });
      let datasets = [];
      let labels = [];
      let backgroundColor = [];
      data.map((item) => {
        item.id = item.id + "?name=" + item.name;
        labels.push(item.name);
        datasets.push(item.qty);
        backgroundColor.push(this.getRandomColor());
      });
      this.reportProduct.labels = labels;
      this.reportProduct.datasets[0].data = datasets;
      this.reportProduct.datasets[0].backgroundColor = backgroundColor;
      this.rows = data;
      this.isShowData = true;
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