<template>
  <section id="sideMenu" v-if="active && !loading">
    <div class="profile-box">
      <img
        class="profile-image"
        src="https://avatarfiles.alphacoders.com/199/199045.jpg"
        alt=""
      />
      <h2 class="profile-name">{{ name }}</h2>
      <p class="logout" @click="signOut">Logout</p>
      <p class="profile-stats">Level: {{ level }} / Rank: {{ rank }}</p>
      <div class="profile-gold">
        <p class="gold-text">
          {{ gold }}
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3141/3141816.svg"
            alt=""
            class="gold-img"
          />
        </p>
      </div>
      <div class="profile-rubies">
        <p class="rubies-text">
          {{ rubies }}
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1830/1830937.svg"
            alt=""
            class="rubies-img"
          />
        </p>
      </div>
    </div>
    <hr class="row-line" />
    <nav>
      <router-link
        to="/profile"
        :class="profile ? 'active' : ''"
        @click="checkActive"
        ><i class="fa fa-user" aria-hidden="true"></i>Profile</router-link
      >
      <router-link
        to="#"
        :class="leaderboard ? 'active' : ''"
        @click="checkActive"
        ><i class="fa fa-user" aria-hidden="true"></i>Leaderboard</router-link
      >
      <router-link to="#" :class="arena ? 'active' : ''" @click="checkActive"
        ><i class="fa fa-sticky-note-o" aria-hidden="true"></i>Battle
        Arena</router-link
      >
      <router-link
        to="/adventures"
        :class="adventures ? 'active' : ''"
        @click="checkActive"
        ><i class="fa fa-bookmark-o" aria-hidden="true"></i>Adventures
        <span id="adventureTimer" v-if="adventureTimer">{{
          " " + adventureTimer + " / 100%"
        }}</span></router-link
      >
      <router-link to="shop" :class="shop ? 'active' : ''" @click="checkActive"
        ><i class="fa fa-user-circle-o" aria-hidden="true"></i>Shop</router-link
      >
      <router-link
        to="#"
        :class="alchemist ? 'active' : ''"
        @click="checkActive"
        ><i class="fa fa-user-circle-o" aria-hidden="true"></i
        >Alchemist</router-link
      >
      <router-link
        to="/dungeon"
        :class="dungeon ? 'active' : ''"
        @click="checkActive"
        ><i class="fa fa-cog" aria-hidden="true"></i>Dungeon
        <span id="timer" v-if="timer">{{
          "[ 0" + timer + " / 05.00 ]"
        }}</span></router-link
      >
      <router-link to="#" :class="runes ? 'active' : ''" @click="checkActive"
        ><i class="fa fa-cog" aria-hidden="true"></i>Rune Page</router-link
      >
    </nav>
  </section>

  <!-- Loading -->
  <div class="content" v-if="loading">
    <h1 class="loading-title" v-if="loading">Battle Arena</h1>
    <div class="loading">
      <p>loading</p>
      <span></span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import firebase from "firebase";
import store from "../store";
import router from "../router";

export default {
  setup() {
    let active = ref(false);
    let profile = ref();
    let leaderboard = ref();
    let arena = ref();
    let adventures = ref();
    let shop = ref();
    let alchemist = ref();
    let dungeon = ref();
    let runes = ref();

    let token = ref();
    let user = ref();
    let isSigned = ref(false);

    let name = ref("");
    let level = ref();
    let rank = ref();
    let gold = ref();
    let rubies = ref();

    let timer = ref(0);
    let adventureTimer = ref(0);
    let loading = ref(true);

    onMounted(() => {
      let debouceTimeout;
      clearTimeout(debouceTimeout);
      debouceTimeout = setTimeout(() => {
        loading.value = false;
      }, 1500);

      checkActive();
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;

        setTimeout(() => {
          updateUser();
        }, 100);

        checkDungeonTimer();
        checkAdventureTimer();

        firebase
          .database()
          .ref("/users/" + store.state.user.user.displayName)
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            scoresArray.forEach((element) => array.push(element));
            for (let item of array) {
              // Get Stats
              if (item[0] == "name") {
                name.value = item[1];
              } else if (item[0] == "level") {
                level.value = item[1];
                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    fame: level.value * 100,
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              } else if (item[0] == "rank") {
                rank.value = item[1];
              }
              // User Currency
              if (item[0] == "gold") {
                gold.value = item[1];
              }
              if (item[0] == "rubies") {
                rubies.value = item[1];
              }
            }
          });
      } else {
        router.push("/");
      }
    });

    function signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          token.value = {};
          user.value = {};
          isSigned.value = false;
          store.commit("clearUser");
          sessionStorage.clear();
          window.localStorage.clear();
          let debouceTimeout;
          clearTimeout(debouceTimeout);
          debouceTimeout = setTimeout(() => {
            location.reload();
          }, 100);
          router.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    function checkActive() {
      profile.value = false;
      leaderboard.value = false;
      arena.value = false;
      adventures.value = false;
      shop.value = false;
      alchemist.value = false;
      dungeon.value = false;
      runes.value = false;
      active.value = false;

      if (window.location.pathname == "/profile") {
        profile.value = true;
        active.value = true;
      } else if (window.location.pathname == "/leaderboard") {
        leaderboard.value = true;
        active.value = true;
      } else if (window.location.pathname == "/arena") {
        arena.value = true;
        active.value = true;
      } else if (window.location.pathname == "/adventures") {
        adventures.value = true;
        active.value = true;
      } else if (window.location.pathname == "/shop") {
        shop.value = true;
        active.value = true;
      } else if (window.location.pathname == "/alchemist") {
        alchemist.value = true;
        active.value = true;
      } else if (window.location.pathname == "/dungeon") {
        dungeon.value = true;
        active.value = true;
      } else if (window.location.pathname == "/runes") {
        runes.value = true;
        active.value = true;
      }
    }

    function checkDungeonTimer() {
      setTimeout(() => {
        var started = localStorage.getItem("dungeonTimer");

        if (started) {
          var diff = Date.now() - started;
          // let timerTime = Math.round(diff / 60 / 60);
          // timer.value = Math.round((timerTime / 60) * 100) / 100;
          timer.value = Math.floor(diff / 60 / 60) / 100;

          if (Math.round(diff / 60 / 60) >= 301) {
            document.getElementById("timer").style.display = "none";
            localStorage.removeItem("dungeonTimer");
          }
        }
      }, 1000);

      setTimeout(() => {
        checkDungeonTimer();
      }, 1000);
    }

    function checkAdventureTimer() {
      setTimeout(() => {
        var started = localStorage.getItem("adventureTimer");
        let counter = parseInt(localStorage.getItem("gold"), 10);

        if (started) {
          var diff = Date.now() - started;
          adventureTimer.value =
            Math.round((diff / 60 / 60 / counter) * 100) + "%";

          if (Math.round(diff / 60 / 60) >= counter) {
            document.getElementById("adventureTimer").style.display = "none";
            // localStorage.removeItem("adventureTimer");
            localStorage.setItem("adventureEnded", true);
          }
        }
      }, 1000);

      setTimeout(() => {
        checkAdventureTimer();
      }, 1000);
    }

    function updateUser() {
      firebase
        .database()
        .ref("/users/" + store.state.user.user.displayName)
        .once("value")
        .then((snapshot) => {
          let scoresObj = snapshot.val();
          let scoresArray = Object.entries(scoresObj);
          let array = [];
          scoresArray.forEach((element) => array.push(element));
          for (let item of array) {
            // Get Stats
            if (item[0] == "name") {
              name.value = item[1];
            } else if (item[0] == "level") {
              level.value = item[1];
              firebase
                .database()
                .ref("users/" + store.state.user.user.displayName)
                .update({
                  fame: level.value * 100,
                })
                .catch((error) => {
                  console.log(error.message);
                });
            } else if (item[0] == "rank") {
              rank.value = item[1];
            }
            // User Currency
            if (item[0] == "gold") {
              gold.value = item[1];
            }
            if (item[0] == "rubies") {
              rubies.value = item[1];
            }
          }
        });
      setTimeout(() => {
        updateUser();
      }, 50);
    }

    return {
      checkActive,
      profile,
      leaderboard,
      arena,
      adventures,
      shop,
      alchemist,
      dungeon,
      runes,
      active,
      signOut,
      user,
      token,
      isSigned,
      name,
      level,
      rank,
      rubies,
      gold,
      timer,
      adventureTimer,
      loading,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto");
* {
  box-sizing: border-box;
}
body {
  font-family: "Roboto", sans-serif;
  background: #f2f5fa;
}
.row-line {
  background: #252234;
  margin-bottom: 1rem;
}
.profile-box {
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0 0rem 0;
}
.profile-image {
  width: 150px;
  border-radius: 50%;
  padding-bottom: 1rem;
  border: none;
}
.profile-name {
  font-size: 1.4rem;
  color: white;
  text-transform: unset;
}
.profile-stats {
  color: #818181;
  font-size: 1.4rem;
  margin: 0 auto;
  text-align: center;
  padding: 1rem 0;
}
#sideMenu {
  background: #2c293f;
  width: 240px;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: 0.5s;
}
nav a {
  display: block;
  padding: 15px;
  border-left: 5px solid transparent;
  color: #e7eaf4;
  transition: all 0.5s;
  font-size: 1.5rem;
}
nav a.active {
  background: #252234;
  border-left: 5px solid #6eb81b;
}
nav a:hover {
  background: #252234;
  border-left: 5px solid #6eb81b;
  text-decoration: none;
  color: #e7eaf4;
}
nav a .fa {
  color: #6eb81b;
  width: 30px;
}
.profile-gold {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.gold-img {
  width: 20px;
}
.gold-text {
  color: #ffd700;
  font-size: 1.5rem;
}
.profile-rubies {
  width: 50%;
  margin: 1rem auto;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
}
.rubies-img {
  width: 20px;
}
.rubies-text {
  color: #e0115f;
  font-size: 1.5rem;
}
.logout {
  font-size: 1.3rem;
  cursor: pointer;
}
.logout:hover {
  color: #e0115f;
}
@media only screen and (max-width: 1600px) {
  .profile-image {
    width: 120px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  .profile-name {
    font-size: 1.4rem;
    color: white;
    text-transform: unset;
  }
  .profile-stats {
    color: #818181;
    font-size: 1.4rem;
    margin: 0 auto;
    text-align: center;
    padding: 1rem 0;
  }
  #sideMenu {
    background: #2c293f;
    width: 240px;
    position: absolute;
    top: 0;
    bottom: 0;
    transition: 0.5s;
  }
  nav a {
    display: block;
    padding: 15px;
    border-left: 5px solid transparent;
    color: #e7eaf4;
    transition: all 0.5s;
    font-size: 1.4rem;
  }
}
/* Loading */
@import url("https://fonts.googleapis.com/css?family=Oxygen:700&display=swap");
.content {
  width: 100%;
  height: 100vh;
  background-color: #171f30;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content .loading {
  width: 80px;
  height: 50px;
  position: relative;
}
.loading-title {
  font-size: 4rem;
  font-weight: 800;
  color: rgb(214, 214, 214);
}
.content .loading p {
  top: 0;
  padding: 0;
  margin: 0;
  color: #5389a6;
  font-family: "Oxygen", sans-serif;
  animation: text 3.5s ease both infinite;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 5px;
}
@keyframes text {
  0% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
  40% {
    letter-spacing: 2px;
    transform: translateX(26px);
  }
  80% {
    letter-spacing: 1px;
    transform: translateX(32px);
  }
  90% {
    letter-spacing: 2px;
    transform: translateX(0px);
  }
  100% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
}
.content .loading span {
  background-color: #5389a6;
  border-radius: 50px;
  display: block;
  height: 16px;
  width: 16px;
  bottom: 0;
  position: absolute;
  transform: translateX(64px);
  animation: loading 3.5s ease both infinite;
}
.content .loading span:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #a6dcee;
  border-radius: inherit;
  animation: loading2 3.5s ease both infinite;
}
@keyframes loading {
  0% {
    width: 16px;
    transform: translateX(0px);
  }
  40% {
    width: 100%;
    transform: translateX(0px);
  }
  80% {
    width: 16px;
    transform: translateX(64px);
  }
  90% {
    width: 100%;
    transform: translateX(0px);
  }
  100% {
    width: 16px;
    transform: translateX(0px);
  }
}
@keyframes loading2 {
  0% {
    transform: translateX(0px);
    width: 16px;
  }
  40% {
    transform: translateX(0%);
    width: 80%;
  }
  80% {
    width: 100%;
    transform: translateX(0px);
  }
  90% {
    width: 80%;
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0px);
    width: 16px;
  }
}
</style>