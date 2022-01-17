<template>
  <div>
    <form-save title="Register" view-only />
    <input-text disabled name="name" :val="payload.name" @get="(val)=>payload.name=val" />
    <input-text disabled name="email" type="email" :val="payload.email" />
    <input-text disabled name="phone" type="number" :val="payload.phone" />
    <input-text disabled name="birthdate" :val="payload.birthdate" />
    <input-text disabled name="postalCode" type="number" :val="payload.postalCode" />
    <input-text disabled name="province" :val="payload.province" />
    <input-text disabled name="city" :val="payload.city" />
    <input-text disabled name="subdistrict" :val="payload.subdistrict" />

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        email: "",
        role: "",
        phone: "",
        birthdate: "",
        postalCode: "",
        province: "",
        city: "",
        subdistrict: "",
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
      if (request.birthdate)
        this.payload.birthdate = this.$moment(request.birthdate).format(
          "DD MMMM YYYY"
        );
    },
  },
};
</script>