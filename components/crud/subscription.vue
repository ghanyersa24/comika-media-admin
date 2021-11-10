<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Subscription" />
      <input-check name="Publish" label="Publish" :val="payload.isPublish" @get="(val)=>payload.isPublish=val" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="code" :val="payload.code" @get="(val)=>payload.code=val" />
      <input-text name="long time (day)" :val="payload.longTime" @get="(val)=>payload.longTime=val" />
      <input-text name="price" :val="payload.price" @get="(val)=>payload.price=val" />
      <input-text type="datetime-local" name="published at" :val="payload.publishedAt" @get="(val)=>payload.publishedAt=val" />
      <input-text type="datetime-local" name="available to" :val="payload.availableTo" @get="(val)=>payload.availableTo=val" />
      <input-list name="Benefit" :list="payload.description" @get="(val)=>payload.description=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        code: "",
        longTime: 1,
        price: 0,
        isPublish: false,
        publishedAt: this.$moment().format("YYYY-MM-DDTHH:mm"),
        availableTo: this.$moment().format("YYYY-MM-DDTHH:mm"),
        description: [],
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "package/" + this.$route.params.id,
      });
      this.payload = request;
      this.payload.publishedAt = this.$moment(request.publishedAt).format(
        "YYYY-MM-DDTHH:mm"
      );

      this.payload.availableTo = this.$moment(request.availableTo).format(
        "YYYY-MM-DDTHH:mm"
      );
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "package",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "package",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>