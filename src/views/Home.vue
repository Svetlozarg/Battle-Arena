<template>
  <main class="login-wrapper">
    <div class="home-wrapper">
      <h1 class="home-title">Battle Arena</h1>
      <h2 class="home-slogan">Fight for glory</h2>
      <p class="home-desc">
        Battle Arena is a multiplayer web browser game where you fight for glory
        and to conquer the top places on the leaderboard!
      </p>

      <div class="login-box">
        <h3 class="login-text">
          Register or login to access the game and start playing
        </h3>
        <img
          class="login-button"
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
          alt=""
          @click="logInWithGoogle"
          v-if="!isSigned"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import firebase from "firebase";
import store from "../store";
import router from "../router";

export default {
  setup() {
    let token = ref();
    let user = ref();
    let isSigned = ref(false);

    onMounted(() => {
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;
        router.push("/profile");
      }
    });

    async function logInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      // firebase
      //   .database()
      //   .ref("items/swords")
      //   .set({
      //     sw_lvl1: {
      //       item: "https://pasteboard.co/JIMA8Ov.png",
      //       name: "Basic Sword",
      //       rarity: "common",
      //       demage_min: 2,
      //       demage_max: 2,
      //     },
      //     sw_lvl2: {
      //       item: "https://pasteboard.co/JIMycAa.png",
      //       name: "Basic Sword",
      //       rarity: "common",
      //       demage_min: 4,
      //       demage_max: 6,
      //     },
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });

      isSigned.value = false;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async (result) => {
          if (result.additionalUserInfo.isNewUser) {
            token.value = result.credential.accessToken;
            user.value = result.user;
            isSigned.value = true;

            firebase
              .database()
              .ref("users/" + result.user.displayName)
              .set({
                // User Info
                name: result.user.displayName,
                level: 1,
                rank: 1,
                fame: 1 * 10,
                xp: Math.round(1 * 100 * 1.25),
                xp_next: Math.round((1 + 1) * 100 * 1.25),
                dungeon_lvl: 1,

                // User Stats
                strength: 1,
                strength_stats_min: 1,
                strength_stats_max: 1,
                agility: 1,
                speed: 1,
                endurance: 1,
                health: 4,
                intelligence: 1,
                magicalpower: 2,

                // Skill Cost
                strength_cost: 1,
                agility_cost: 1,
                endurance_cost: 1,
                intelligence_cost: 1,

                // User Currency
                gold: 100,
                rubies: 5,
              })
              .then(() => {
                let debouceTimeout;
                clearTimeout(debouceTimeout);
                debouceTimeout = setTimeout(() => {
                  location.reload();
                }, 300);
                router.push("/profile");
              })
              .catch((error) => {
                console.log(error.message);
              });
          } else {
            token.value = result.credential.accessToken;
            user.value = result.user;
            isSigned.value = true;

            let debouceTimeout;
            clearTimeout(debouceTimeout);
            debouceTimeout = setTimeout(() => {
              location.reload();
            }, 300);
            router.push("/profile");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return {
      token,
      user,
      isSigned,
      logInWithGoogle,
    };
  },
};
</script>

<style scoped>
@import "../assets/style/home.css";
</style>