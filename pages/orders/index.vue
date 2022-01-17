<template>
  <div>
    <crud-header title="Order" no-add />
    <datatable url="orders" view-only :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: [
        "status",
        "noResi",
        "code",
        "name",
        "address",
        "courier",
        "phone",
      ],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/store/order/delivery" });
      this.rows = data.map((item) => {
        item.code = item.storeDetails.code;
        if (item.status == "sending") {
          item.status = `<span class="badge badge-success">${item.status}</span>`;
        } else {
          item.status = `<span class="badge badge-secondary">${item.status}</span>`;
        }

        item.phone = `<a target="_blank" href="${this.urlWA(item)}">${
          item.phone
        }</a>`;
        // direct whatsapp with message
        return item;
      });
      this.renderTable();
    },
    replaceZeroWithCountryCode(val) {
      return val.replace(/^0/, "62");
    },
    urlWA(item) {
      return `https://api.whatsapp.com/send?phone=${this.replaceZeroWithCountryCode(
        item.phone
      )}&text=${encodeURI(
        `Halo ${item.name}, ini dengan saya ${this.$auth.user.name} dari comika media, pesanan kamu sedang kami siapkan.`
      )}`;
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>