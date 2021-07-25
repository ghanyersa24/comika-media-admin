<template>
  <div>
    <table id="table_id" class="display">
      <thead>
        <tr>
          <th>Action</th>
          <th v-for="(item,i) in thead" :key="i">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td>
            <nuxt-link :to="'/'+url" class="btn btn-outline-primary"><i class="fas fa-eye"></i></nuxt-link>
          </td>
          <td v-for="(item,i) in row" :key="i" v-html="item"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Data Table",
    },
    url: {
      type: String,
      default: "",
    },
    thead: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initializeDatatable();
  },
  methods: {
    initializeDatatable() {
      $(document).ready(function () {
        $("#table_id").DataTable();
      });
    },
  },
};
</script>