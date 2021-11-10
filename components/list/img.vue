<template>
  <div class="row">
    <div class="col-3">
      <img v-if="val.url" :src="val.url" :alt="val.name" width="100" height="100">
    </div>
    <div class="col-2">
      <input type="radio" class="form-control" :checked="val.thumbnail" name="image" @click="setThumbnail">
    </div>
    <div class="col">
      <select class="form-control" v-model="choseImg">
        <option selected disabled value="">-choose one-</option>
        <option v-for="(option,i) in images" :key="i" :value="JSON.stringify(noThumbnail(option))">
          {{option.name}}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: { type: Array, default: () => [] },
    val: { type: Object },
    i: { type: Number },
  },
  computed: {
    choseImg: {
      set(val) {
        val = JSON.parse(val);
        if (this.val.thumbnail) this.$emit("get", { ...val, thumbnail: true });
        else this.$emit("get", val);
      },
      get() {
        if (!this.val.sourceId) {
          return "";
        } else return JSON.stringify(this.noThumbnail(this.val));
      },
    },
  },
  methods: {
    noThumbnail(val) {
      delete val.thumbnail;
      return val;
    },
    setThumbnail() {
      this.$emit("get", { ...this.val, thumbnail: true });
    },
  },
};
</script>