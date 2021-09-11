<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Tags" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-options name="type" :options="options" :val="payload.type" @get="(val)=>payload.type=val"/>
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          id: "physical",
          value: "Fisik",
        },
        {
          id: "electronic",
          value: "Elektronik",
        },
        {
          id: "redirect",
          value: "Alihkan laman",
        },
      ],
      payload: {
        name: "",
        type: "physical",
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "store/category/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "store/category",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "store/category",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>