<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Tags" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "article/tags/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "article/tags",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "article/tags",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>