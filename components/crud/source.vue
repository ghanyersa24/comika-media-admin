<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Image Source" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-img name="source" :no-required="payload.url" :val="payload.url" @get="(val)=>{file=val.file;payload.url=val.url}" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      payload: {
        name: null,
        src: null,
        url: null,
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "source/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      const payload = { ...this.payload };
      if (typeof this.file == "object") {
        payload.src = this.file;
      }
      if (this.$route.params.id) {
        const request = await this.requestFormData({
          url: "source",
          action: "put",
          data: { id: this.$route.params.id, ...payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestFormData({
          url: "source",
          data: payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>