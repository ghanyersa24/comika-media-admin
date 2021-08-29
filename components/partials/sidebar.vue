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
        <li v-for="(menu,i) in menus" :key="i">
          <nuxt-link :to="menu.link" class="nav-link">
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
        { icon: "fab fa-dashcube", name: "Dashboard", link: "/" },
        { icon: "fas fa-newspaper", name: "Article", link: "/article" },
        { icon: "fas fa-tags", name: "Tags", link: "/tags" },
        { icon: "fab fa-adversal", name: "Jumbotron", link: "/jumbotron" },
        { icon: "fas fa-users", name: "Redaktur", link: "/comika" },
        { icon: "fas fa-users-cog", name: "Users", link: "/users" },
      ],
    };
  },
};
</script>