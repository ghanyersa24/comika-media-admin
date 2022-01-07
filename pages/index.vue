<template>
  <div>
     <h1>DASHBOARD</h1>
    <chart-line v-if="showReportSubscription" :chartData="reportSubscription" :height="100" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      showReportSubscription: false,
      reportSubscription: {
        labels: [],
        datasets: [
          {
            label: "Report Subscription",
            data: [],
            backgroundColor: "#006ac185",
          },
        ],
      },
    };
  },
  created() {
    this.getReportSubscription();
  },
  methods: {
    async getReportSubscription() {
      const request = await this.requestGet({
        url: "report/subscription",
      });
      let labels = [];
      let datasets = [];
      request.forEach((report) => {
        labels.push(report.date);
        datasets.push(report.active);
      });
      this.reportSubscription.labels = labels;
      this.reportSubscription.datasets[0].data = datasets;
      this.showReportSubscription = true;
    },
  },
};
</script>