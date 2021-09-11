<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Product" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-options name="category" :options="listCategory" :val="payload.categoryId" @get="(val)=>payload.categoryId=val" />
      <input-text name="price" type="number" :val="payload.price" @get="(val)=>payload.price=val" />
      <input-cms name="description" :val="payload.description" @get="(val)=>payload.description=val" />
      <input-image-options name="Image" multiple :options="listSource" :val="payload.images" @get="(val)=>payload.images=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      listCategory: [],
      listSource: [],
      payload: {
        name: "",
        categoryId: "",
        price: 0,
        description: null,
        images: [],
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
    this.getListCategory();
    this.getSource();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "store/" + this.$route.params.id,
      });
      const dataImages = request.images;
      request.images = dataImages.map((item) => item.id);
      this.payload = request;
    },
    async getListCategory() {
      const request = await this.requestGet({
        url: "store/category",
      });
      this.listCategory = request.map((item) => ({
        id: item.id,
        value: item.name,
      }));
    },
    async getSource() {
      const request = await this.requestGet({
        url: "source",
      });
      const sources = request.map((item) => ({
        id: item.id,
        alt: item.name,
        src: item.url,
      }));
      this.listSource = [...sources, ...sources, ...sources, ...sources];
    },
    async doSubmit() {
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