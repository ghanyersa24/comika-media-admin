<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Article" />
      <input-check name="Premium Content" label="Premium" :val="payload.isPremium" @get="(val)=>payload.isPremium=val" />
      <input-check name="Publish" label="Publish" :val="payload.isPublish" @get="(val)=>payload.isPublish=val" />
      <input-text name="Published At" type="datetime-local" :val="payload.publishedAt" @get="(val)=>payload.publishedAt=val" />
      <input-text name="title" :val="payload.title" @get="(val)=>payload.title=val" />
      <input-options name="comika" :options="listComika" :val="payload.comikaId" @get="(val)=>payload.comikaId=val" />
      <input-cms name="article" :val="payload.content" @get="(val)=>payload.content=val" />
      <input-img name="photo" :no-required="payload.banner?true:false" :val="payload.banner" @get="(val)=>{file=val.file;payload.banner=val.url}" />
      <input-text name="attribution" :val="payload.attribution" @get="(val)=>payload.attribution=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      listComika: [],
      file: null,
      payload: {
        title: "",
        content: "",
        comikaId: "",
        isPremium: false,
        isPublish: false,
        banner: null,
        attribution: null,
        publishedAt: this.$moment().format("YYYY-MM-DDTHH:mm"),
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
    this.getComika();
  },
  methods: {
    async getComika() {
      const request = await this.requestGet({ url: "comika" });
      this.listComika = request.map((item) => ({
        id: item.id,
        value: item.name,
      }));
    },
    async getDetail() {
      const request = await this.requestGet({
        url: "article/" + this.$route.params.id,
      });
      this.payload = request;
      this.payload.publishedAt = this.$moment(request.publishedAt).format(
        "YYYY-MM-DDTHH:mm"
      );
    },
    async doSubmit() {
      const payload = this.payload;
      payload.publishedAt = this.$moment(payload.publishedAt).format(
        "YYYY-MM-DD HH:mm"
      );
      if (typeof this.file == "object") {
        payload.banner = this.file;
      }
      if (this.$route.params.id) {
        const request = await this.requestFormData({
          url: "article",
          data: { id: this.$route.params.id, ...payload },
          action: "update",
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestFormData({
          url: "article",
          data: payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>