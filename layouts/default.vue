<template>
  <div id="app">
    <div class="main-wrapper">
      <partials-navbar />
      <partials-sidebar />
      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>:: COMIKA MEDIA :: </h1>
          </div>
          <div class="section-body">
            <div class="card card-primary rounded">
              <div class="card-body">
                <Nuxt />
              </div>
            </div>
          </div>
        </section>
      </div>
      <partials-footer />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    if (process.browser) {
      this.$router.push("/");
    }
  },
};
</script>