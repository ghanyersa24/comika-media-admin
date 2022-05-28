<template>
  <div>
    <h3>Notification</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th width="5%">
            <input type="checkbox" v-model="checkedAll" />
          </th>
          <th width="5%">#</th>
          <th colspan="2">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in listNotification"
          :key="i"
          :class="item.isRead ? '' : 'table-info'"
        >
          <td>
            <input type="checkbox" :value="item.id" v-model="checked" />
          </td>
          <td>{{ i + 1 }}</td>
          <td width="10%">
            <img class="w-100" :src="item.img" alt="" srcset="" />
          </td>
          <td class="desc" @click="readNotification(item)">
            {{ item.description }}
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="loadMore" class="btn btn-outline-primary rounded-pill">
      Load more
    </button>
    <button
      @click="readAllNotification"
      class="btn btn-outline-light text-secondary rounded-pill"
    >
      Read
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listNotification: [],
      page: 1,
      checked: [],
      checkedAll: false
    };
  },
  watch: {
    checkedAll(val) {
      if (val) {
        this.checked = [];
        this.listNotification.forEach(item => {
          this.checked.push(item.id);
        });
      } else {
        this.checked = [];
      }
    },
    checked(val) {
      if (val.length == this.listNotification.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    }
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    loadMore() {
      this.page++;
      this.getNotification();
    },
    async getNotification() {
      const request = await this.requestGet({
        url: "/notification",
        params: {
          limit: 5,
          page: this.page,
          type: "komentar"
        }
      });
      if (request.length) this.listNotification.push(...request);
      else {
        this.page--;
        this.$toast.error("No more data");
      }
    },
    async readNotification(item) {
      const request = await this.requestPost({
        url: "/notification/read-all",
        data: {
          ids: [item.id]
        },
        notify: false
      });
      window.open(item.link, "_blank");
      this.resetNotification();
    },
    async readAllNotification() {
      const request = await this.requestPost({
        url: "/notification/read-all",
        data: {
          ids: this.checked
        },
        notify: false
      });
      this.checked = [];
      this.resetNotification();
    },
    async resetNotification() {
      this.listNotification = await this.requestGet({
        url: `/notification`,
        params: {
          limit: 5 * this.page,
          page: 1,
          type: "komentar"
        }
      });
    }
  }
};
</script>

<style scoped>
/* hover */
.desc:hover {
  cursor: pointer;
}
</style>
