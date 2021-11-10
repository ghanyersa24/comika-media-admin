<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
  },
  computed: {
    idName() {
      return this.name.replace(/ /g, "");
    },
  },
};
</script>