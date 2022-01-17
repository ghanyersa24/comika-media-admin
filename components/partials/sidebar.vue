<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <nuxt-link to="/">Admin Panel</nuxt-link>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <nuxt-link to="/">AP</nuxt-link>
      </div>
      <ul class="sidebar-menu">
        <li v-for="(menu,i) in menus" :key="i" :class="'nav-item '+menu.dropdown?'dropdown':''">
          <a v-if="menu.dropdown && menu.role.includes($auth.user.role)" href="#" class="nav-link has-dropdown" data-toggle="dropdown">
            <i :class="menu.icon"></i> <span>{{menu.name}}</span>
          </a>
          <ul v-if="menu.dropdown" class="dropdown-menu">
            <li v-for="(item,i) in menu.menus" :key="i" v-show="item.role.includes($auth.user.role)">
              <nuxt-link :to="item.link" class="nav-link">
                <i :class="item.icon" style="font-size:1.2em"></i> <span>{{item.name}}</span>
              </nuxt-link>
            </li>
          </ul>
          <nuxt-link v-if="!menu.dropdown&& menu.role.includes($auth.user.role)" :to="menu.link" class="nav-link">
            <i :class="menu.icon" style="font-size:1.2em"></i> <span>{{menu.name}}</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  created() {
    this.menus.forEach((item) => {
      if (item.dropdown) {
        item.menus.forEach((item2) => {
          if (item2.link == this.$route.path) {
            if (!item2.role.includes(this.$auth.user.role)) {
              this.$router.push("/");
            }
          }
        });
      } else {
        if (item.link == this.$route.path) {
          if (!item.role.includes(this.$auth.user.role)) {
            this.$router.push("/");
          }
        }
      }
    });
  },
  data() {
    return {
      menus: [
        {
          icon: "fab fa-dashcube",
          name: "Dashboard",
          link: "/",
          role: ["writer", "admin"],
        },
        {
          icon: "fab fa-adversal",
          name: "Jumbotron",
          link: "/jumbotron",
          role: ["admin"],
        },
        {
          icon: "fas fa-newspaper",
          name: "Article",
          dropdown: true,
          role: ["admin", "writer"],
          menus: [
            {
              icon: "fas fa-newspaper",
              name: "Article",
              link: "/article/post",
              role: ["writer", "admin"],
            },
            {
              icon: "fas fa-tags",
              name: "Tags",
              link: "/article/tags",
              role: ["writer", "admin"],
            },
          ],
        },
        {
          icon: "fab fa-product-hunt",
          name: "Product",
          dropdown: true,
          role: ["admin"],
          menus: [
            {
              icon: "fas fa-user-tag",
              name: "Subscription",
              link: "/product/subscription",
              role: ["admin"],
            },
            {
              icon: "fas fa-percent",
              name: "Promo",
              link: "/product/promo",
              role: ["admin"],
            },
            {
              icon: "fas fa-store",
              name: "Store",
              link: "/product/store",
              role: ["admin"],
            },
            {
              icon: "fas fa-images",
              name: "Image - Source",
              link: "/image-source",
              role: ["admin"],
            },
          ],
        },
        {
          icon: "fas fa-cart-arrow-down",
          name: "Orders",
          link: "/orders",
          role: ["admin"],
        },
        {
          icon: "fas fa-project-diagram",
          name: "Report",
          dropdown: true,
          role: ["admin"],
          menus: [
            {
              icon: "fas fa-chart-bar",
              name: "Register",
              link: "/report/register",
              role: ["admin"],
            },
            // {
            //   icon: "fas fa-chart-bar",
            //   name: "Membership",
            //   link: "/report/membership",
            //   role: ["admin"],
            // },
            {
              icon: "fas fa-chart-bar",
              name: "Product",
              link: "/report/product",
              role: ["admin"],
            },
            {
              icon: "fas fa-chart-bar",
              name: "Promo",
              link: "/report/promo",
              role: ["admin"],
            },
          ],
        },
        {
          icon: "fas fa-users",
          name: "Redaktur",
          role: ["admin"],
          link: "/comika",
        },
        {
          icon: "fas fa-users-cog",
          name: "Users",
          link: "/users",
          role: ["admin"],
        },
      ],
    };
  },
};
</script>