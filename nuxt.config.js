/* eslint-disable prettier/prettier */
export default {
  components: true,
  ssr: true,
  runInNewContext: false,
  // mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAnLhDGY9RgazRkWY69OWt8ct1YqvOHlYo",
          authDomain: "dah-nuxt-firebase-3345c.firebaseapp.com",
          databaseURL: "https://dah-nuxt-firebase-3345c-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "dah-nuxt-firebase-3345c",
          storageBucket: "dah-nuxt-firebase-3345c.appspot.com",
          messagingSenderId: "193806619809",
          appId: "1:193806619809:web:cdfbf0c5660bfb1d1f4ce0"
        },
        services: {
          firestore: true,
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
          }
        },
      },
    ],
  ],
}
