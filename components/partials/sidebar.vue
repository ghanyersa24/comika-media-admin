<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <nuxt-link to="/">Comika Media</nuxt-link>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <nuxt-link to="/">CM</nuxt-link>
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
        { icon: "fas fa-newspaper", name: "Articles", link: "/articles" },
        { icon: "fas fa-ad", name: "Advertisement", link: "/advertisement" },
        { icon: "fas fa-users", name: "Comika", link: "/comika" },
        { icon: "fas fa-users-cog", name: "Users", link: "/users" },
      ],
    };
  },
};
</script>