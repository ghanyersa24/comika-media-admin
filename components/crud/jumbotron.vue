<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Jumbotron" />
      <input-check name="phone" label="Phone" :val="payload.isPhone" @get="(val)=>payload.isPhone=val" />
      <input-check name="desktop" label="Desktop" :val="payload.isDesktop" @get="(val)=>payload.isDesktop=val" />
      <input-text name="sequence" type="number" :val="payload.sequence" @get="(val)=>payload.sequence=val" />
      <input-text name="link" no-required type="url" :val="payload.link" @get="(val)=>payload.link=val" />
      <input-img name="photo" :no-required="payload.img?true:false" :val="payload.img" @get="(val)=>{file=val.file;payload.img=val.url}" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      payload: {
        banner: "",
        isPhone: false,
        isDesktop: false,
        link: "",
        sequence: 1,
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "jumbotron/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      const payload = this.payload;
      if (typeof this.file == "object") {
        payload.img = this.file;
      }
      if (this.$route.params.id) {
        const request = await this.requestFormData({
          url: "jumbotron",
          data: { id: this.$route.params.id, ...payload },
          action: "update",
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestFormData({
          url: "jumbotron",
          data: payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>