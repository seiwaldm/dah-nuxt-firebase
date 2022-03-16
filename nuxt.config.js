/* eslint-disable prettier/prettier */
export default {
  components: true,
  ssr: false,
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
  modules: [

    [
      '@nuxtjs/firebase',
      {
        config: {
          // apiKey: 'AIzaSyDG_gasyorLNjDv6eBmeSnV321WHkCODlU',
          // authDomain: 'nuxt-fire-vuexfire.firebaseapp.com',
          // databaseURL: 'https://nuxt-fire-vuexfire.firebaseio.com',
          // projectId: 'nuxt-fire-vuexfire',
          // storageBucket: '',
          // messagingSenderId: '1048167249658',
          // appId: '1:1048167249658:web:d45b765280a64ed4',
          apiKey: 'AIzaSyAiT1Qs-B-qqkwSxXewNmDOzDrhgiGiRvM',
          authDomain: 'cah-dummy.firebaseapp.com',
          projectId: 'cah-dummy',
          storageBucket: 'cah-dummy.appspot.com',
          messagingSenderId: '778366957576',
          appId: '1:778366957576:web:c82a75703baa96fec979bd',
          measurementId: 'G-MM5S0VP1PE',
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
