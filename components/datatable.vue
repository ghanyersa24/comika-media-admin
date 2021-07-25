<template>
  <div>
    <table id="table_id" class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Action</th>
          <th class="text-capitalize" v-for="(item,i) in thead" :key="i">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td>
            <nuxt-link :to="'/'+url+'/'+row.id" class="btn btn-outline-primary"><i class="fas fa-eye"></i></nuxt-link>
            <button @click="onDelete(row)" type="button" class="btn btn-outline-danger"> <i class="fas fa-trash"></i> </button>
          </td>
          <td v-for="(item,idx) in thead" :key="idx" v-html="row[item]"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: "",
    },
    thead: {
      type: Array,
      default: () => [],
    },
    attrDel: String,
  },
  methods: {
    async onDelete(row) {
      const { isConfirmed } = await this.konfirm(
        "Apakah kamu yakin ingin menghapus " + row[this.attrDel]
      );
      if (isConfirmed) {
        const request = await this.requestDel({ url: this.url + "/" + row.id });
        if (request) {
          this.$emit("onDelete", request);
        }
      }
    },
  },
};
</script>