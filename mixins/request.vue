<script>
export default {
  methods: {
    konfirm(message = "") {
      return this.$swal({
        title: "Apakah Kamu yakin?",
        text: message,
        icon: "question",
        showCancelButton: true,
      });
    },
    async requestPost({ url, data, notify = true }) {
      try {
        const request = await this.$axios.$post(url, data);
        if (notify) {
          this.$toast.show(request.msg);
        }
        return request;
      } catch (err) {
        this.$toast.show(err.response.data.msg);
      }
    },
    async requestFormData({ url, data, notify = true }) {
      try {
        this.$nuxt.$loading.start();
        const dataPayload = new FormData();
        for (const key in data) {
          if (Array.isArray(data[key])) {
            for (let idx = 0; idx < data[key].length; idx++) {
              const element = data[key][idx];
              dataPayload.append(`${key}[${idx}]`, element);
            }
          } else dataPayload.append(key, data[key]);
        }
        const request = await this.$axios.$post(url, dataPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (notify) {
          this.$toast.show(request.msg);
        }
        return request;
      } catch (err) {
        this.$toast.show(err.response.data.msg);
      }
    },
    async requestPut({ url, data, notify = true }) {
      try {
        const request = await this.$axios.$put(url, data);
        if (notify) {
          this.$toast.show(request.msg);
        }
        return request;
      } catch (err) {
        this.$toast.show(err.response.data.msg);
      }
    },
    async requestDel({ url, params, notify = true }) {
      try {
        const request = await this.$axios.$delete(url, { params });
        if (notify) {
          this.$toast.show(request.msg);
        }
        return request;
      } catch (err) {
        this.$toast.show(err.response.data.msg);
      }
    },
    async requestGet({ url, params }) {
      try {
        const request = await this.$axios.$get(url, { params });
        return request;
      } catch (err) {
        this.$toast.show(err.response.data.msg);
      }
    },
  },
};
</script>
