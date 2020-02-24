import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'

Vue.config.productionTip = false
// eslint-disable-next-line @typescript-eslint/camelcase
Vue.use(GAuth, {
  clientId: '994681332628-h87l4n5gqrhpkuka99kn5buc5slfirkp.apps.googleusercontent.com',
  scope: 'profile',
  prompt: 'select_account',
  // eslint-disable-next-line @typescript-eslint/camelcase
  fetch_basic_profile: true })

new Vue({
  render: h => h(App),
}).$mount('#app')
