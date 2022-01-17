<template>
  <div>
    <form @submit.prevent="save">
      <form-save :title="'Order '+payload.orderCode" :viewOnly="payload.status=='sending'" />
      <input-text name="Resi" :disabled="payload.status=='sending'" :val="payload.noResi" @get="(val)=>payload.noResi=val" />
      <input-text name="Courier" disabled :val="payload.courier" />
      <input-text name="Name" disabled :val="payload.name" />
      <input-custom name="Address">
        <div class="row mb-2">
          <div class="col">
            <input type="text" class="form-control" v-model="payload.province" disabled>
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="payload.city" disabled>
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="payload.subdistrict" disabled>
          </div>
        </div>
        <textarea class="form-control" v-model="payload.address" disabled style="height:100px"></textarea>
      </input-custom>
      <input-custom name="Detail">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="payload.phone" placeholder="qty" disabled>
          </div>
          <div class="col">
            <span class="mt-2 badge badge-secondary text-capitalize">{{payload.status}}</span>
          </div>
        </div>
      </input-custom>
      <input-custom name="Items">
        <div class="row">
          <div class="col-md-4" v-for="(item,i) in payload.items" :key="i">
            <div class="card">
              <!-- <div class="card-body"> -->
              <img :src="item.img" class="img-fluid" />
              <h5 class="card-title mt-2">{{item.name}} <br> <span style="font-size:0.8em">({{item.quantity}} buah )</span></h5>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </input-custom>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        orderCode: "",
        courier: "",
        noResi: "",
        name: "",
        address: "",
        qty: "",
        totalRp: "",
        status: "pending",
        items: [],
      },
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const data = await this.requestGet({
        url: "/store/order/delivery-detail/" + this.$route.params.id,
      });
      data.orderCode = data.storeDetails.code;
      data.items = data.storeDetails.details;
      this.payload = data;
    },
    async save() {
      const data = await this.requestPut({
        url: "/store/order/delivery-update/" + this.$route.params.id,
        data: this.payload,
      });
      if (data) this.$router.go(-1);
    },
  },
};
</script>