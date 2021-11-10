<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Product" />
      <input-check name="publish" label="Publish" :val="payload.isPublish" @get="(val)=>payload.isPublish=val" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-options name="category" :options="listCategory" :val="payload.category" @get="(val)=>payload.category=val" />
      <input-text name="price (Rp)" type="number" :val="payload.price" @get="(val)=>payload.price=val" />
      <input-cms name="description" :val="payload.description" @get="(val)=>payload.description=val" />
      <input-text name="published At" type="datetime-local" :val="payload.publishedAt" @get="(val)=>payload.publishedAt=val" />
      <input-text name="available To" type="datetime-local" :val="payload.availableTo" @get="(val)=>payload.availableTo=val" />
      <input-list-image name="Photo Product" :list="payload.images" @get="(val)=>payload.images=val" :images="listSource" />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listSource: [],
      listCategory: [
        { id: "Digital Produk", value: "Digital Produk" },
        { id: "Merchandise", value: "Merchandise" },
        { id: "Online", value: "Online" },
      ],
      payload: {
        name: "",
        category: "Digital Produk",
        price: 0,
        description: null,
        images: [],
        isPublish: false,
        publishedAt: this.$moment().format("YYYY-MM-DDTHH:mm"),
        availableTo: this.$moment().format("YYYY-MM-DDTHH:mm"),
        images: [{ thumbnail: true }],
      },
    };
  },
  created() {
    this.getSource();
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "store/" + this.$route.params.id,
      });
      this.payload = request;
      this.payload.publishedAt = this.$moment(request.publishedAt).format(
        "YYYY-MM-DDTHH:mm"
      );
      this.payload.availableTo = this.$moment(request.availableTo).format(
        "YYYY-MM-DDTHH:mm"
      );
    },
    async getSource() {
      const request = await this.requestGet({
        url: "source",
      });
      const sources = request.map((item) => ({
        sourceId: item.id,
        name: item.name,
        url: item.url,
        thumbnail: false,
      }));
      this.listSource = [...sources, ...sources, ...sources, ...sources];
    },
    async doSubmit() {
      const payload = this.payload;
      payload.images = payload.images.map((item) => ({
        sourceId: item.sourceId,
        thumbnail: item.thumbnail || false,
      }));
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "store",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "store",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>