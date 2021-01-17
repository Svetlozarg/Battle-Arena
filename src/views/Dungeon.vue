<template>
  <main class="wrapper">
    <div class="dungeon-wrapper">
      <!-- Boss Overlay -->
      <div
        id="boss-wrapper"
        class="boss-wrapper"
        v-if="!isFighting && !playerHasEnded && !bossHasEnded"
      >
        <img
          src="https://image.shutterstock.com/image-vector/fantasy-rpg-game-character-monsters-600w-1221332008.jpg"
          alt=""
          class="boss-img"
        />
        <h2 class="boss-level">Dungeon level: {{ dungeon_level }}</h2>
        <h2 class="boss-name">{{ boss_name }}</h2>
        <h2 class="boss-level">Level: {{ boss_level }}</h2>
        <button
          type="button"
          id="fight-btn"
          class="btn btn-danger fight-btn"
          @click="checkIsFighting(), fight()"
          disabled
        >
          Fight
        </button>
      </div>

      <!-- Fight Overlay -->
      <h2
        class="fight-title"
        v-if="isFighting && !playerHasEnded && !bossHasEnded"
      >
        Battle
      </h2>
      <!-- User Stats -->
      <div
        class="player-wrapper"
        v-if="isFighting && !playerHasEnded && !bossHasEnded"
      >
        <div class="player-stats-box">
          <p class="player-text">Name: {{ player_name }}</p>
          <p class="player-text">Level: {{ player_level }}</p>
          <p class="player-text">
            Strength: {{ player_strength_stats_min }} -
            {{ player_strength_stats_max }}
          </p>
          <p class="player-text">Speed: {{ player_speed }}</p>
          <p class="player-text">Health: {{ player_health_max }}</p>
          <p class="player-text">Magicalpower: {{ player_magicalpower }}</p>
        </div>
        <!-- Boss Stats -->
        <div class="player-stats-box">
          <p class="player-text">Name: {{ boss_name }}</p>
          <p class="player-text">Level: {{ boss_level }}</p>
          <p class="player-text">
            Strength: {{ boss_strength_stats_min }} -
            {{ boss_strength_stats_max }}
          </p>
          <p class="player-text">Speed: {{ boss_speed }}</p>
          <p class="player-text">Health: {{ boss_health_max }}</p>
          <p class="player-text">Magicalpower: {{ boss_magicalpower }}</p>
        </div>
      </div>

      <div
        class="fight-wrapper"
        v-if="isFighting && !playerHasEnded && !bossHasEnded"
      >
        <div class="player-box">
          <div class="player-top">
            <img
              class="player-img"
              src="https://avatarfiles.alphacoders.com/199/199045.jpg"
              alt=""
            />
            <h2 id="pl-name" class="pl-name">{{ player_name }}</h2>
            <div id="dmg-txt-player"></div>
          </div>
          <p class="bar-text-left">
            {{ player_health }} / {{ player_health_max }}
          </p>
          <div class="progress">
            <div
              id="player-health"
              class="progress-bar bg-danger player-health"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            ></div>
          </div>
        </div>
        <div>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1732/1732476.svg"
            alt=""
            class="fight-icon"
          />
        </div>
        <div class="enemy-box">
          <div class="enemy-top">
            <img
              class="player-img"
              src="https://image.shutterstock.com/image-vector/final-boss-dragon-icon-simple-600w-1770979514.jpg"
              alt=""
            />
            <h2 class="pl-name-enemy">{{ boss_name }}</h2>
            <div id="dmg-txt-enemy" style="margin-right: 30rem"></div>
          </div>
          <p class="bar-text-right">
            {{ boss_health }} / {{ boss_health_max }}
          </p>
          <div class="progress">
            <div
              id="enemy-health"
              class="progress-bar bg-danger enemy-health"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            ></div>
          </div>
        </div>
      </div>

      <!-- End Screen -->
      <div class="boss-wrapper" v-if="playerHasEnded">
        <h2 class="end-title">Victory!</h2>
        <p class="end-desc">Your reward:</p>
        <p class="end-gold">Gold: {{ gold }}</p>
        <p class="end-rubies">Rubies: {{ rubies }}</p>
        <button @click="reload()" type="button" class="btn btn-outline-danger">
          Next Boss
        </button>
      </div>

      <div class="boss-wrapper" v-if="bossHasEnded">
        <h2 class="end-title" style="color: red">Defeat!</h2>
        <p class="end-desc">Try again</p>
        <button @click="reload()" type="button" class="btn btn-outline-danger">
          Fight again
        </button>
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
    let user = ref();
    let isSigned = ref(false);
    let isFighting = ref(false);
    let playerHasEnded = ref(false);
    let bossHasEnded = ref(false);

    // User Info
    let player_name = ref("");
    let player_xp = ref();
    let player_level = ref();
    let player_gold = ref();
    let player_rubies = ref();
    let player_strength_stats_min = ref();
    let player_strength_stats_max = ref();
    let player_speed = ref();
    let player_health_max = ref();
    let player_health = ref();
    let player_magicalpower = ref();
    let dungeon_level = ref();
    let dungeon_boss = ref("");

    // Boss Info
    let boss_name = ref("");
    let boss_level = ref();
    let boss_strength_stats_min = ref();
    let boss_strength_stats_max = ref();
    let boss_speed = ref();
    let boss_health_max = ref();
    let boss_health = ref();
    let boss_magicalpower = ref();

    let round = 0;
    let gold = ref();
    let rubies = ref();

    onMounted(() => {
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;

        setTimeout(() => {
          var started = localStorage.getItem("dungeonTimer");

          if (started) {
            var diff = Date.now() - started;
            console.log(Math.round(diff / 60 / 60));
            document.getElementById("fight-btn").disabled = true;

            if (Math.round(diff / 60 / 60) >= 300) {
              document.getElementById("fight-btn").disabled = false;
              localStorage.removeItem("dungeonTimer");
            }
          } else {
            document.getElementById("fight-btn").disabled = false;
          }
        }, 500);

        // User Info
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
              if (item[0] == "name") {
                player_name.value = item[1];
              } else if (item[0] == "xp") {
                player_xp.value = item[1];
              } else if (item[0] == "gold") {
                player_gold.value = item[1];
              } else if (item[0] == "rubies") {
                player_rubies.value = item[1];
              } else if (item[0] == "level") {
                player_level.value = item[1];
              } else if (item[0] == "strength_stats_min") {
                player_strength_stats_min.value = item[1];
              } else if (item[0] == "strength_stats_max") {
                player_strength_stats_max.value = item[1];
              } else if (item[0] == "speed") {
                player_speed.value = item[1];
              } else if (item[0] == "health") {
                player_health_max.value = item[1];
                player_health.value = item[1];
              } else if (item[0] == "magicalpower") {
                player_magicalpower.value = item[1];
              } else if (item[0] == "dungeon_lvl") {
                dungeon_level.value = item[1];
                // Check for dungeon level
                if (dungeon_level.value == 1) {
                  dungeon_boss.value = "Boss_lvl5";
                } else if (dungeon_level.value == 2) {
                  dungeon_boss.value = "Boss_lvl10";
                } else if (dungeon_level.value == 3) {
                  dungeon_boss.value = "Boss_lvl15";
                } else if (dungeon_level.value == 4) {
                  dungeon_boss.value = "Boss_lvl20";
                } else if (dungeon_level.value == 5) {
                  dungeon_boss.value = "Boss_lvl25";
                } else if (dungeon_level.value == 6) {
                  dungeon_boss.value = "Boss_lvl30";
                }
              }
            }
          });

        window.setTimeout(function () {
          // Boss Info
          firebase
            .database()
            .ref("/dungeon/" + dungeon_boss.value)
            .once("value")
            .then((snapshot) => {
              let scoresObj = snapshot.val();
              let scoresArray = Object.entries(scoresObj);
              let array = [];
              scoresArray.forEach((element) => array.push(element));

              for (let item of array) {
                if (item[0] == "name") {
                  boss_name.value = item[1];
                } else if (item[0] == "level") {
                  boss_level.value = item[1];
                } else if (item[0] == "strength_stats_min") {
                  boss_strength_stats_min.value = item[1];
                } else if (item[0] == "strength_stats_max") {
                  boss_strength_stats_max.value = item[1];
                } else if (item[0] == "speed") {
                  boss_speed.value = item[1];
                } else if (item[0] == "health") {
                  boss_health.value = item[1];
                  boss_health_max.value = item[1];
                } else if (item[0] == "magicalpower") {
                  boss_magicalpower.value = item[1];
                } else if (item[0] == "gold") {
                  gold.value = item[1];
                } else if (item[0] == "rubies") {
                  rubies.value = item[1];
                }
              }
            });
        }, 1100);
      } else {
        router.push("/");
      }
    });

    function checkIsFighting() {
      document.getElementById("boss-wrapper").style.display = "none";
      setTimeout(() => {
        isFighting.value = !isFighting.value;
      }, 300);
    }

    function fight() {
      window.setTimeout(function () {
        let player_health_bar = document.getElementById("player-health");
        let boss_health_bar = document.getElementById("enemy-health");

        let dmgPlayer = document.getElementById("dmg-txt-player");
        let dmgEnemy = document.getElementById("dmg-txt-enemy");

        // Check if both players are alive
        if (player_health.value > 0 && boss_health.value > 0) {
          // Check if it's first found and use magic power
          if (round == 0) {
            round++;
            if (player_speed.value >= boss_speed.value) {
              window.setTimeout(function () {
                boss_health.value -= player_magicalpower.value;
                boss_health_bar.style.width =
                  100 -
                  (player_magicalpower.value / boss_health_max.value) * 100 +
                  "%";
                var element = document.createElement("div");
                element.innerHTML = "-" + player_magicalpower.value;
                element.className = "dmg-text";
                dmgEnemy.appendChild(element);
                setTimeout(() => {
                  dmgEnemy.removeChild(element);
                }, 600);
              }, 800);

              window.setTimeout(function () {
                if (boss_health.value > 0) {
                  player_health.value -= boss_magicalpower.value;
                  player_health_bar.style.width =
                    100 -
                    (boss_magicalpower.value / player_health_max.value) * 100 +
                    "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + boss_magicalpower.value;
                  element.className = "dmg-text";
                  dmgPlayer.appendChild(element);
                  setTimeout(() => {
                    dmgPlayer.removeChild(element);
                  }, 600);
                }
              }, 1400);
            } else {
              window.setTimeout(function () {
                player_health.value -= boss_magicalpower.value;
                player_health_bar.style.width =
                  100 -
                  (boss_magicalpower.value / player_health_max.value) * 100 +
                  "%";
                var element = document.createElement("div");
                element.innerHTML = "-" + boss_magicalpower.value;
                element.className = "dmg-text";
                dmgPlayer.appendChild(element);
                setTimeout(() => {
                  dmgPlayer.removeChild(element);
                }, 600);
              }, 800);

              window.setTimeout(function () {
                if (player_health.value > 0) {
                  boss_health.value -= player_magicalpower.value;
                  boss_health_bar.style.width =
                    100 -
                    (player_magicalpower.value / boss_health_max.value) * 100 +
                    "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + player_magicalpower.value;
                  element.className = "dmg-text";
                  dmgEnemy.appendChild(element);
                  setTimeout(() => {
                    dmgEnemy.removeChild(element);
                  }, 600);
                }
              }, 1800);
            }
            fight();
            // After 1st round
          } else {
            if (player_speed.value >= boss_speed.value) {
              if (boss_health.value > 0) {
                window.setTimeout(function () {
                  boss_health.value -= player_strength_stats_min.value;
                  boss_health_bar.style.width =
                    (boss_health.value / boss_health_max.value) * 100 + "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + player_strength_stats_min.value;
                  element.className = "dmg-text";
                  dmgEnemy.appendChild(element);
                  setTimeout(() => {
                    dmgEnemy.removeChild(element);
                  }, 600);
                }, 1000);

                window.setTimeout(function () {
                  player_health.value -= boss_strength_stats_min.value;
                  player_health_bar.style.width =
                    (player_health.value / player_health_max.value) * 100 + "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + boss_strength_stats_min.value;
                  element.className = "dmg-text";
                  dmgPlayer.appendChild(element);
                  setTimeout(() => {
                    dmgPlayer.removeChild(element);
                  }, 600);
                }, 1800);
              }
            } else {
              if (player_health.value > 0) {
                window.setTimeout(function () {
                  player_health.value -= boss_strength_stats_min.value;
                  player_health_bar.style.width =
                    (player_health.value / player_health_max.value) * 100 + "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + boss_strength_stats_min.value;
                  element.className = "dmg-text";
                  dmgPlayer.appendChild(element);
                  setTimeout(() => {
                    dmgPlayer.removeChild(element);
                  }, 600);
                }, 1000);

                window.setTimeout(function () {
                  boss_health.value -= player_strength_stats_min.value;
                  boss_health_bar.style.width =
                    (boss_health.value / boss_health_max.value) * 100 + "%";
                  var element = document.createElement("div");
                  element.innerHTML = "-" + player_strength_stats_min.value;
                  element.className = "dmg-text";
                  dmgEnemy.appendChild(element);
                  setTimeout(() => {
                    dmgEnemy.removeChild(element);
                  }, 600);
                }, 1800);
              }
            }
            fight();
          }
        } else {
          // Check who won the game
          if (player_health.value <= 0) {
            player_health.value = 0;
            player_health_bar.style.width = "0%";
            console.log("Boss has won the game");
            countDown();
            window.setTimeout(function () {
              bossHasEnded.value = true;
            }, 600);
            return;
          }
          if (boss_health.value <= 0) {
            boss_health.value = 0;
            boss_health_bar.style.width = "0%";
            console.log("Player has won the game");
            countDown();
            window.setTimeout(function () {
              // Update reward
              firebase
                .database()
                .ref("users/" + store.state.user.user.displayName)
                .update({
                  gold: player_gold.value + gold.value,
                  rubies: player_rubies.value + rubies.value,
                  dungeon_lvl: dungeon_level.value + 1,
                  xp:
                    player_xp.value +
                    dungeon_level.value * boss_level.value * 10 +
                    500,
                })
                .catch((error) => {
                  console.log(error.message);
                });
              playerHasEnded.value = true;
            }, 1000);
            return;
          }
        }
      }, 1800);
    }

    function reload() {
      window.location.reload();
    }

    function countDown() {
      setTimeout(() => {
        var started = localStorage["dungeonTimer"];

        if (started) {
          var diff = Date.now() - started;
          console.log(Math.round(diff / 60 / 60));
          document.getElementById("fight-btn").disabled = true;

          if (Math.round(diff / 60 / 60) >= 300) {
            document.getElementById("fight-btn").disabled = false;
            localStorage.removeItem("dungeonTimer");
          }
        } else {
          // This is the first time the user opens this file
          localStorage["dungeonTimer"] = Date.now();
          document.getElementById("fight-btn").disabled = true;
        }
      }, 500);
    }

    return {
      checkIsFighting,
      isFighting,
      playerHasEnded,
      bossHasEnded,
      fight,
      reload,
      player_name,
      player_level,
      player_strength_stats_min,
      player_strength_stats_max,
      player_speed,
      player_health,
      player_health_max,
      player_magicalpower,
      boss_name,
      boss_level,
      boss_strength_stats_min,
      boss_strength_stats_max,
      boss_speed,
      boss_health,
      boss_health_max,
      boss_magicalpower,
      gold,
      rubies,
      dungeon_level,
      dungeon_boss,
    };
  },
};
</script>

<style scoped>
@import "../assets/style/dungeon.css";
</style>