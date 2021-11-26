<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Promo" />
      <input-check name="publish" label="Publish" :val="payload.isPublish" @get="(val)=>payload.isPublish=val" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="code" :val="payload.code" @get="(val)=>payload.code=val.replace(/ /g,'')" />
      <input-options name="category" :options="listCategory" :val="payload.category" @get="(val)=>payload.category=val" />
      <input-text :name="namePrice" :val="payload.price" @get="(val)=>payload.price=val" />
      <input-cms name="description" :val="payload.description" @get="(val)=>payload.description=val" />
      <input-text name="published At" type="datetime-local" :val="payload.publishedAt" @get="(val)=>payload.publishedAt=val" />
      <input-text name="available To" type="datetime-local" :val="payload.availableTo" @get="(val)=>payload.availableTo=val" />
    </form>

  </div>
</template>
<script>
export default {
  computed: {
    namePrice() {
      if (this.payload.category == "Percent") return "Discount ( % )";
      return "Discount ( Rp )";
    },
  },
  data() {
    return {
      listCategory: [
        { id: "Nominal", value: "Nominal" },
        { id: "Percent", value: "Percent" },
      ],
      payload: {
        name: "",
        code: "",
        category: "Nominal",
        price: 0,
        description: 0,
        isPublish: false,
        publishedAt: this.$moment().format("YYYY-MM-DDTHH:mm"),
        availableTo: this.$moment().format("YYYY-MM-DDTHH:mm"),
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
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
        url: "promo/" + this.$route.params.id,
      });
      this.payload = request;
      if (request.category == "Percent") this.payload.price *= 100;
      this.payload.publishedAt = this.$moment(request.publishedAt)
        .subtract(7, "hours")
        .format("YYYY-MM-DDTHH:mm");
      this.payload.availableTo = this.$moment(request.availableTo)
        .subtract(7, "hours")
        .format("YYYY-MM-DDTHH:mm");
    },
    async doSubmit() {
      const payload = this.payload;
      payload.price = Number(payload.price);
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "promo",
          data: { id: this.$route.params.id, ...payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "promo",
          data: payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>