<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Article" />
      <input-check name="Premium Content" label="Premium" :val="payload.isPremium" @get="(val)=>payload.isPremium=val" />
      <input-check name="Publish" label="Publish" :val="payload.isPublish" @get="(val)=>payload.isPublish=val" />
      <input-text name="Date Publish" type="datetime-local" :val="payload.date" @get="(val)=>payload.date=val" />
      <input-text name="title" :val="payload.title" @get="(val)=>payload.title=val" />
      <input-options name="comika" :options="listComika" :val="payload.comikaId" @get="(val)=>payload.comikaId=val" />
      <input-cms name="article" :val="payload.content" @get="(val)=>payload.content=val" />
      <input-img name="photo" :no-required="payload.banner?true:false" :val="payload.banner" @get="(val)=>{file=val.file;payload.banner=val.url}" />
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
        date: this.$moment(),
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
      this.payload.date = this.$moment(request.date).format("YYYY-MM-DDThh:mm");
    },
    async doSubmit() {
      const payload = this.payload;
      payload.date = this.$moment(payload.date).format("YYYY-MM-DD hh:mm");
      if (typeof this.file == "object") {
        payload.banner = this.file;
      }
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "article",
          data: { id: this.$route.params.id, ...payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestFormData({
          url: "article",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>