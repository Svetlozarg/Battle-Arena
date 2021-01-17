import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import '../node_modules/bootswatch/dist/lux/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAFB5gE5VsK0RN0U7lczUL7H4yENxyfE7k",
  authDomain: "battle-arena-dd796.firebaseapp.com",
  databaseURL: "https://battle-arena-dd796-default-rtdb.firebaseio.com",
  projectId: "battle-arena-dd796",
  storageBucket: "battle-arena-dd796.appspot.com",
  messagingSenderId: "598737609027",
  appId: "1:598737609027:web:12f1df8254e7fe91cfcff6",
  measurementId: "G-F4CYKXL1CJ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('updatedUser', {user});
  }
  createApp(App).use(store).use(router).mount('#app');
});

