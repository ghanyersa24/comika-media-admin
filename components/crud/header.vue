<template>
  <div class="d-flex justify-content-between mb-3">
    <h3 v-html="'List of '+title"></h3>
    <nuxt-link :to="'/'+this.url+'/add'" class="btn btn-primary" v-if="!noAdd">Add</nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    noAdd: { type: Boolean, default: false },
    title: String,
    url: String,
  },
};
</script>