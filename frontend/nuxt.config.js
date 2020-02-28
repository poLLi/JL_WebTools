const routerBase =
    process.env.DEPLOY_ENV === 'GH_PAGES'
        ? {
              router: {
                  base: '/JL_WebTools/',
                  routeNameSplitter: '/'
              }
          }
        : {
              router: {
                  routeNameSplitter: '/'
              }
          };

export default {
    /*
     ** Router Settings
     */
    ...routerBase,

    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Just-Look Network | Web Tools',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
     ** Disable Loading Bar
     */
    loading: false,

    /*
     ** Global SCSS
     */
    css: ['~/assets/scss/main.scss'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],

    /*
     ** BootstrapVue Settings
     */
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false
    },

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        extractCSS: {
            allChunks: true
        }
    },

    /*
     ** Generate configuration
     */
    generate: {}
};
