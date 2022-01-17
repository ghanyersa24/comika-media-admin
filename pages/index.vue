<template>
  <div>
    <h1>DASHBOARD</h1>
    <!-- daterange picker -->
    <div class="container">
      <input-daterange name="Daterange" :val="dateRange" @get="(val)=>createDashboard(val)" />
    </div>
    <chart-line v-if="showReport" :chartData="reportDashboard" :height="150" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateRange: {
        start: this.$moment().startOf("month").format("YYYY-MM-DD"),
        end: this.$moment().endOf("month").format("YYYY-MM-DD"),
      },
      showReport: true,
      reportDashboard: {
        labels: [],
        datasets: [
          {
            label: "Active Subscription",
            data: [],
            backgroundColor: "#006ac185",
          },
          {
            label: "User Register",
            data: [],
            backgroundColor: "#003ac185",
          },
        ],
      },
    };
  },
  created() {
    this.createDashboard();
  },
  methods: {
    async createDashboard(dateRange = {}) {
      if (dateRange.start) this.dateRange = dateRange;
      await this.generateListDate();
      await this.getReportSubscription();
      await this.getReportUserRegister();
    },
    async generateListDate() {
      let listDate = [];
      let date = this.dateRange.start;
      while (date <= this.dateRange.end) {
        listDate.push(date);
        date = this.$moment(date).add(1, "days").format("YYYY-MM-DD");
      }
      this.reportDashboard.labels = listDate;
    },
    async getReportSubscription() {
      this.showReport = false;
      const request = await this.requestGet({
        url: "report/subscription",
        params: this.dateRange,
      });
      let datasets = [];
      const listDate = this.reportDashboard.labels;
      listDate.forEach((item) => {
        let data = request.find((data) => data.date === item);
        datasets.push(data ? data.active : 0);
      });
      this.reportDashboard.datasets[0].data = datasets;
      this.showReport = true;
    },
    async getReportUserRegister() {
      this.showReport = false;
      const request = await this.requestGet({
        url: "report/user-register",
        params: this.dateRange,
      });
      let datasets = [];
      const listDate = this.reportDashboard.labels;
      listDate.forEach((item) => {
        let data = request.find((data) => data.date === item);
        datasets.push(data ? data.active : 0);
      });
      this.reportDashboard.datasets[1].data = datasets;
      this.showReport = true;
    },
  },
};
</script>