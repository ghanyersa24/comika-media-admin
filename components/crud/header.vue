<template>
  <div class="d-flex justify-content-between mb-3">
    <h3>List of {{title}}</h3>
    <nuxt-link :to="'/'+this.url+'/add'" class="btn btn-primary">Add</nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    url: String,
  },
};
</script>