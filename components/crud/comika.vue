<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Redaktur" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-check label="Verified" :val="payload.verified" @get="(val)=>payload.verified=val" />
      <input-img name="photo" :no-required="payload.photo" :val="payload.photo" @get="(val)=>{file=val.file;payload.photo=val.url}" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      payload: {
        name: "",
        photo: "",
        verified: false,
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "comika/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      const payload = this.payload;
      if (typeof this.file == "object") {
        payload.photo = this.file;
      }
      if (this.$route.params.id) {
        const request = await this.requestFormData({
          url: "comika",
          data: { id: this.$route.params.id, ...payload },
          action: "update",
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestFormData({
          url: "comika",
          data: payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>