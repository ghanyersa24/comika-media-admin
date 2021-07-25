<template>
  <div class="bg-white">
    <div class="d-flex justify-content-center vh-100" v-if="loading">
      <div class="d-flex align-items-center">
        <div class="sk-grid">
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
          <div class="sk-grid-cube bg-warning"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      setTimeout(() => {
        this.loading = false;
      }, 700);
    },
  },
};
</script>
