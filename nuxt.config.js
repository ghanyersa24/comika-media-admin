export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Admin Comika Media",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Website admin untuk comika media"
      },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css"
      },
      { rel: "stylesheet", href: "/assets/css/style.css" },
      { rel: "stylesheet", href: "/assets/css/components.css" },
      { rel: "stylesheet", href: "/assets/css/spinkit.css" }
    ],
    script: [
      { src: "https://code.jquery.com/jquery-3.3.1.min.js" },
      { src: "https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js" },
      {
        src:
          "https://cdn.datatables.net/1.10.22/js/dataTables.bootstrap4.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"
      },
      { src: "/assets/js/stisla.js" },
      { src: "/assets/js/scripts.js" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/mixins.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "vue-sweetalert2/nuxt"
  ],
  toast: {
    position: "bottom-center",
    duration: 1500,
    action: {
      text: "close",
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },
  loading: "~/components/loading.vue",
  auth: {
    strategies: {
      local: {
        token: {
          propertyName: "token",
          type: ""
        },
        user: {
          property: false
        },
        endpoints: {
          login: {
            url: "/login",
            method: "POST"
          },
          user: {
            url: "/users/me",
            method: "GET"
          },
          logout: false
        }
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://service-comika.herokuapp.com/api/admin"
    // baseURL: "http://localhost:3010/api/admin"
  },
  router: {
    middleware: ["auth"]
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: "0",
    // port: 3005
  }
};
