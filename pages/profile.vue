<template>
  <div>
    <div>
      <form id="form-view" name="form-view" method="post" @submit.prevent="save">
        <div class="section-body">
          <div class="row mt-sm-4">
            <div class="col-12 col-md-12 col-lg-5">
              <div class="card text-center">
                <div class="my-3">
                  <img id="view-profil" class="rounded" style="height: 250px; width: 250px; object-fit:cover" :src="payload.photo" alt="gambar profil">
                </div>
                <div class="text-center">
                  <span style="cursor:pointer" @click="upload">Ganti Foto Profil</span>
                  <input id="view-status" class="text-capitalize bg-light form-control text-center" type="text" readonly :value="payload.role">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-7">
              <div class="card">
                <div class="card-header">
                  <h4>Edit Profile</h4>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label for="view-full_name">Nama Lengkap</label>
                    <input name="full_name" id="view-full_name" class="form-control" type="text" v-model="payload.name">
                  </div>
                  <div class="row">
                    <div class="form-group col-sm">
                      <label for="view-phone">Phone</label>
                      <input name="phone" id="view-phone" class="form-control" type="number" v-model="payload.phone">
                    </div>
                    <div class="form-group col-sm">
                      <label for="view-birthdate">Birthdate</label>
                      <input name="birthdate" id="view-birthdate" type="date" class="form-control" v-model="payload.birthdate">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="view-email">Email</label>
                    <input name="email" id="view-email" class="form-control" type="email" v-model="payload.email">
                  </div>

                  <div class="form-group">
                    <label for="view-address">Address</label>
                    <textarea name="address" id="view-address" class="form-control" v-model="payload.address" rows="3"></textarea>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-6">
                      <label for="view-postalCode">Postal Code</label>
                      <input name="postalCode" id="view-postalCode" class="form-control" v-model="payload.postalCode">
                    </div>

                    <div class="form-group col-sm-6">
                      <label for="view-district">District</label>
                      <input name="district" id="view-district" class="form-control" v-model="payload.district">
                    </div>

                    <div class="form-group col-sm-6">
                      <label for="view-city">City</label>
                      <input name="city" id="view-city" class="form-control" v-model="payload.city">
                    </div>

                    <div class="form-group col-sm-6">
                      <label for="view-province">Province</label>
                      <input name="province" id="view-province" class="form-control" v-model="payload.province">
                    </div>
                  </div>
                </div>
                <div class="card-footer text-right">
                  <button class="btn btn-secondary" type="button" @click="()=>$router.push('/')">Cancel</button>
                  <button class="btn btn-primary" id="btn-save" type="submit">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div id="upload" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <input-img :val="photo" name="Photo Profile" @get="(val)=>{photo=val.url;file=val.file}" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" type="button" id="btn-upload" @click="uploadPhoto">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      photo: null,
      file: null,
      payload: this.$auth.user,
    };
  },
  methods: {
    upload() {
      $("#upload").modal("show");
    },
    uploadPhoto() {
      $("#upload").modal("hide");
      try {
        this.save();
      } catch (error) {}
    },
    async save() {
      try {
        const payload = this.payload;
        if (typeof this.file == "object") {
          payload.photo = this.file;
        }
        const request = await this.requestFormData({
          url: "/users/update-myprofile",
          data: payload,
          action: "put",
        });
        location.reload();
      } catch (error) {}
    },
  },
};
</script>