<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="User" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="email" type="email" :val="payload.email" @get="(val)=>payload.email=val" />
      <input-text v-if="!$route.params.id" name="password" type="password" :val="payload.password" @get="(val)=>payload.password=val" />
      <input-text name="phone" type="number" :val="payload.phone" @get="(val)=>payload.phone=val" />
      <input-options name="role" :options="roles" :val="payload.role" @get="(val)=>payload.role=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      roles: [
        { id: "admin", value: "admin" },
        { id: "writer", value: "writer" },
      ],
      gender: [
        { id: "L", value: "Laki-laki" },
        { id: "P", value: "Perempuan" },
      ],
      payload: {
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "users/user/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "users",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "users",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>