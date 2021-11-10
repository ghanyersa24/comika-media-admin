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
          <a v-if="menu.dropdown" href="#" class="nav-link has-dropdown" data-toggle="dropdown">
            <i :class="menu.icon"></i> <span>{{menu.name}}</span>
          </a>
          <ul v-if="menu.dropdown" class="dropdown-menu">
            <li v-for="(item,i) in menu.menus" :key="i">
              <nuxt-link :to="item.link" class="nav-link">
                <i :class="item.icon" style="font-size:1.2em"></i> <span>{{item.name}}</span>
              </nuxt-link>
            </li>
          </ul>
          <nuxt-link v-if="!menu.dropdown" :to="menu.link" class="nav-link">
            <i :class="menu.icon" style="font-size:1.2em"></i> <span>{{menu.name}}</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "fab fa-dashcube",
          name: "Dashboard",
          link: "/",
          dropdown: false,
        },

        { icon: "fab fa-adversal", name: "Jumbotron", link: "/jumbotron" },
        {
          icon: "fas fa-newspaper",
          name: "Article",
          dropdown: true,
          menus: [
            {
              icon: "fas fa-newspaper",
              name: "Article",
              link: "/article/post",
            },
            { icon: "fas fa-tags", name: "Tags", link: "/article/tags" },
          ],
        },
        {
          icon: "fab fa-product-hunt",
          name: "Product",
          dropdown: true,
          menus: [
            {
              icon: "fas fa-user-tag",
              name: "Subscription",
              link: "/product/subscription",
            },
            {
              icon: "fas fa-percent",
              name: "Promo",
              link: "/product/promo",
            },
            {
              icon: "fab fa-product-hunt",
              name: "Store",
              link: "/product/store",
            },
            {
              icon: "fas fa-images",
              name: "Image - Source",
              link: "/image-source",
            },
          ],
        },
        {
          icon: "fas fa-project-diagram",
          name: "Report",
          dropdown: true,
          menus: [
            {
              icon: "fas fa-images",
              name: "Membership",
              link: "/image-source",
            },
            {
              icon: "fas fa-images",
              name: "Promo",
              link: "/image-source",
            },
          ],
        },
        { icon: "fas fa-users", name: "Redaktur", link: "/comika" },
        { icon: "fas fa-users-cog", name: "Users", link: "/users" },
      ],
    };
  },
};
</script>