<template>
  <div class="row mt-3">
    <h3 class="col-md text-capitalize">Detail {{ title }}</h3>
    <div class="col-md-4 text-right">
      <button @click="$router.go(-1)" type="button" class="btn btn-outline-secondary"> <i class="fas fa-times"> </i> Cancel </button>
      <button v-if="!viewOnly" class="btn btn-primary" type="submit"><i class="fas fa-check"> </i> Save</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    viewOnly: { type: Boolean, default: false },
    title: { type: String, default: "Form Title" },
  },
};
</script>