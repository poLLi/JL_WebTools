module.exports = {
    router: {
        routeNameSplitter: '/',
        linkActiveClass: 'active',
        linkExactActiveClass: 'active'
    },

    mode: 'spa',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Just-Look Network | Web Tools',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Custome handmade WebApps for Just-Look Network' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon-16.png', sizes: '16x16' },
            { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' },
            { rel: 'icon', type: 'image/png', href: '/favicon-96.png', sizes: '96x96' },
            { rel: 'apple-touch-icon', href: '/apple-icon-72.png', sizes: '72x72' },
            { rel: 'apple-touch-icon', href: '/apple-icon-114.png', sizes: '114x114' },
            { rel: 'apple-touch-icon', href: '/apple-icon-144.png', sizes: '144x144' },
            { rel: 'apple-touch-icon', href: '/apple-icon-180.png', sizes: '180x180' }
        ]
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
    plugins: ['~/plugins/vue-fontawesome.js', '~/plugins/vue-swal.js', '~/plugins/vue-clipboard.js'],

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
        [
            '@nuxtjs/axios',
            {
                baseURL: 'https://jln.just-look.net/'
                //baseURL: 'http://127.0.0.1:1337'
            }
        ]
    ],
    env: {
        WS_URL: process.env.WS_URL || 'http://localhost:3002'
    },

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
        vendor: ['socket.io-client'],
        extend(config, ctx) { },
        extractCSS: {
            allChunks: true
        }
    },

    /*
     ** Generate configuration
     */
    generate: {
        fallback: true
    }
};
