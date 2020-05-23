// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'vuelidate',
      'lodash',
      'filter'
    ],
    css: [
      'app.styl'
    ],
    extras: [ 
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'https://weplace.laxmichitfund.in/api/',
          changeOrigin: true,
          pathRewrite: {
            '^/api/': ''
          }
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QPageContainer',
        'QPage',
        'QLayoutHeader',
        'QLayoutFooter',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QField',
        'QInput',
        'QAlert',
        'QToolbar',
        'QToolbarTitle',
        'QCheckbox',
        'QDatetime',
        'QSelect',
        'QModal',
        'QModalLayout',
        'QAutocomplete',
        'QLayoutDrawer',
        'QPageSticky',
        'QSpinner',
        'QSpinnerDots',        
        'QInnerLoading',
        'QCollapsible',
        'QScrollArea'          
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'LocalStorage',
        'Loading'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    }

  }
}
