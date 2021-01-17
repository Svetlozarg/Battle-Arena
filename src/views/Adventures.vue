<template>
  <main class="wrapper">
    <div class="adventures-wrapper">
      <div v-if="!chosenAdventure && !isFighting">
        <div class="adventures-box-wrapper">
          <div class="adventure-box">
            <h2 class="adventure-title-easy">{{ easy_title }}</h2>
            <img
              src="https://1.bp.blogspot.com/_y0ZlSySQA1Q/RxrrLLr0AMI/AAAAAAAAB3w/wWcpgJzMpE0/s1600/2PDVD_033.jpg"
              alt=""
              class="adventure-img"
            />
            <p class="adventure-desc">
              {{ easy_description }}
            </p>
          </div>
          <div class="adventure-box">
            <h2 class="adventure-title-medium">{{ medium_title }}</h2>
            <img
              src="https://i.pinimg.com/originals/1f/d2/39/1fd239d91a5517af3fd8f897751a6cc3.jpg"
              alt=""
              class="adventure-img"
            />
            <p class="adventure-desc">
              {{ medium_description }}
            </p>
          </div>
          <div class="adventure-box">
            <h2 class="adventure-title-hard">{{ hard_title }}</h2>
            <img
              src="https://i.pinimg.com/originals/eb/06/c2/eb06c2064355b28e9844c451b6a46891.jpg"
              alt=""
              class="adventure-img"
            />
            <p class="adventure-desc">
              {{ hard_description }}
            </p>
          </div>
        </div>

        <div class="btn-wrapper">
          <div class="btn-box">
            <div class="btn-desc">
              <p class="bottom-text">At least level 2 required</p>
              <p class="bottom-text">Time: {{ easy_time }}</p>
              <p class="bottom-text">
                Difficulty:
                <span style="color: rgb(37, 207, 37)">{{
                  easy_difficulty
                }}</span>
              </p>
              <p class="bottom-text" style="text-decoration: underline">
                Reward
              </p>
              <p class="bottom-text" style="color: #ffd700">
                Gold: {{ easy_gold }}
              </p>
              <p class="bottom-text">
                Chance for:
                <span style="color: rgb(0, 174, 255)"
                  >normal item: {{ easy_normal_item }}%</span
                >,
                <span style="color: rgb(209, 76, 250)"
                  >rare item: {{ easy_rare_item }}%</span
                >
              </p>
            </div>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="
                startAdventure(
                  easy_title,
                  easy_description,
                  easy_time,
                  easy_gold,
                  easy_enemy
                )
              "
            >
              Start now
            </button>
          </div>
          <div class="btn-box">
            <div class="btn-desc">
              <p class="bottom-text">At least level 6 required</p>
              <p class="bottom-text">Time: {{ medium_time }}</p>
              <p class="bottom-text">
                Difficulty:
                <span style="color: rgb(207, 142, 37)">{{
                  medium_difficulty
                }}</span>
              </p>
              <p class="bottom-text" style="text-decoration: underline">
                Reward
              </p>
              <p class="bottom-text" style="color: #ffd700">
                Gold: {{ medium_gold }}
              </p>
              <p class="bottom-text">
                Chance for:
                <span style="color: rgb(0, 174, 255)"
                  >normal item: {{ medium_normal_item }}%</span
                >,
                <span style="color: rgb(209, 76, 250)"
                  >rare item: {{ medium_rare_item }}%</span
                >
              </p>
            </div>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="
                startAdventure(
                  medium_title,
                  medium_description,
                  medium_time,
                  medium_gold,
                  medium_enemy
                )
              "
            >
              Start now
            </button>
          </div>
          <div class="btn-box">
            <div class="btn-desc">
              <p class="bottom-text">At least level 10 required</p>
              <p class="bottom-text">Time: {{ hard_time }}</p>
              <p class="bottom-text">
                Difficulty:
                <span style="color: rgb(207, 37, 37)">{{
                  hard_difficulty
                }}</span>
              </p>
              <p class="bottom-text" style="text-decoration: underline">
                Reward
              </p>
              <p class="bottom-text" style="color: #ffd700">
                Gold: {{ hard_gold }}
              </p>
              <p class="bottom-text">
                Chance for:
                <span style="color: rgb(0, 174, 255)"
                  >normal item: {{ hard_normal_item }}%</span
                >,
                <span style="color: rgb(209, 76, 250)"
                  >rare item: {{ hard_rare_item }}%</span
                >
              </p>
            </div>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="
                startAdventure(
                  hard_title,
                  hard_description,
                  hard_time,
                  hard_gold,
                  hard_enemy
                )
              "
            >
              Start now
            </button>
          </div>
        </div>
      </div>

      <div
        class="adventure-timer"
        style="width: 100%"
        v-if="chosenAdventure && !isFighting"
      >
        <div class="timer-box">
          <h2 class="timer-title">{{ adventure_title }}</h2>
          <p class="timer-desc">{{ adventure_description }}</p>
        </div>
        <div class="timer-progress">
          <p class="progress-text">{{ adventureTimer }}</p>
        </div>
        <div class="progress">
          <div
            id="progress-bar"
            class="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div class="skip-adventure">
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="skipAdventure()"
          >
            Skip adventure
            <span class="skip-text">
              3
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1830/1830937.svg"
                alt=""
                class="skip-img"
              />
            </span>
          </button>
        </div>
      </div>

      <!-- Fight Overlay -->
      <h2
        class="fight-title"
        v-if="
          isFighting && !playerHasEnded && !bossHasEnded && !chosenAdventure
        "
      >
        Battle
      </h2>
      <!-- User Stats -->
      <div
        class="player-wrapper"
        v-if="
          isFighting && !playerHasEnded && !bossHasEnded && !chosenAdventure
        "
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
        <p class="end-rubies">XP: 250</p>
        <button @click="reload()" type="button" class="btn btn-outline-danger">
          Choose new adventure
        </button>
      </div>

      <div class="boss-wrapper" v-if="bossHasEnded">
        <h2 class="end-title" style="color: red">Defeat!</h2>
        <p class="end-desc">Try again</p>
        <button @click="reload()" type="button" class="btn btn-outline-danger">
          Choose new adventure
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

    let chosenAdventure = ref(false);
    let isFighting = ref(false);
    let playerHasEnded = ref(false);
    let bossHasEnded = ref(false);

    // Chosen Adventure
    let adventureTimer = ref();
    let adventure_title = ref();
    let adventure_description = ref();

    // Easy Adventure Stats
    let easy_title = ref();
    let easy_description = ref();
    let easy_difficulty = ref();
    let easy_time = ref();
    let easy_counter = 301;
    let easy_gold = ref();
    let easy_normal_item = ref();
    let easy_rare_item = ref();
    let easy_adventure = ref();
    let easy_enemy = ref();

    // Medium Adventure Stats
    let medium_title = ref();
    let medium_description = ref();
    let medium_difficulty = ref();
    let medium_time = ref();
    let medium_counter = 601;
    let medium_gold = ref();
    let medium_normal_item = ref();
    let medium_rare_item = ref();
    let medium_adventure = ref();
    let medium_enemy = ref();

    // Hard Adventure Stats
    let hard_title = ref();
    let hard_description = ref();
    let hard_difficulty = ref();
    let hard_time = ref();
    let hard_counter = 901;
    let hard_gold = ref();
    let hard_normal_item = ref();
    let hard_rare_item = ref();
    let hard_adventure = ref();
    let hard_enemy = ref();

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

    // Adventure Enemy
    let boss_name = ref();
    let boss_level = ref();
    let boss_strength = ref();
    let boss_strength_stats_max = ref();
    let boss_strength_stats_min = ref();
    let boss_agility = ref();
    let boss_speed = ref();
    let boss_endurance = ref();
    let boss_health = ref();
    let boss_health_max = ref();
    let boss_intelligence = ref();
    let boss_magicalpower = ref();

    let round = 0;
    let gold = ref();
    let rubies = ref();

    onMounted(() => {
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;

        if (localStorage.getItem("adventureEnded") == "true") {
          isFighting.value = true;
          fight();
        }

        checkAdventureTimer();

        setTimeout(() => {
          var started = localStorage.getItem("adventureTimer");

          if (started) {
            var diff = Date.now() - started;
            let counter = parseInt(localStorage.getItem("gold"), 10);
            chosenAdventure.value = true;

            adventure_title.value = localStorage.getItem("title");
            adventure_description.value = localStorage.getItem("description");

            if (Math.round(diff / 60 / 60) >= counter) {
              chosenAdventure.value = false;
              isFighting.value = true;
              setTimeout(() => {
                fight();
              }, 100);
            }
          } else {
            chosenAdventure.value = false;
          }
        }, 500);

        // Get easy adventure
        firebase
          .database()
          .ref("/adventures/easy")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            let randNum = Math.floor(Math.random() * 6);
            scoresArray[randNum].forEach((element) => array.push(element));
            easy_adventure.value = array;

            for (let item of array) {
              easy_title.value = item.title;
              easy_description.value = item.description;
              easy_difficulty.value = item.difficulty;
              easy_time.value = "0" + item.time / 60 + ":00";
              easy_gold.value = item.gold;
              easy_normal_item.value = item.normal_item;
              easy_rare_item.value = item.rare_item;
              easy_enemy.value = item.enemy;
            }
          });

        // Get medium adventure
        firebase
          .database()
          .ref("/adventures/medium")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            let randNum = Math.floor(Math.random() * 6);
            scoresArray[randNum].forEach((element) => array.push(element));
            medium_adventure.value = array;

            for (let item of array) {
              medium_title.value = item.title;
              medium_description.value = item.description;
              medium_difficulty.value = item.difficulty;
              medium_time.value = item.time / 60 + ":00";
              medium_gold.value = item.gold;
              medium_normal_item.value = item.normal_item;
              medium_rare_item.value = item.rare_item;
              medium_enemy.value = item.enemy;
            }
          });

        // Get hard adventures
        firebase
          .database()
          .ref("/adventures/hard")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            let randNum = Math.floor(Math.random() * 6);
            scoresArray[randNum].forEach((element) => array.push(element));
            hard_adventure.value = array;

            for (let item of array) {
              hard_title.value = item.title;
              hard_description.value = item.description;
              hard_difficulty.value = item.difficulty;
              hard_time.value = item.time / 60 + ":00";
              hard_gold.value = item.gold;
              hard_normal_item.value = item.normal_item;
              hard_rare_item.value = item.rare_item;
              hard_enemy.value = item.enemy;
            }
          });
      } else {
        router.push("/");
      }
    });

    function startAdventure(title, description, time, gold, enemy) {
      setTimeout(() => {
        var started = localStorage["adventureTimer"];

        if (started) {
          var diff = Date.now() - started;
          chosenAdventure.value = true;

          if (Math.round(diff / 60 / 60) >= 300) {
            chosenAdventure.value = false;
            isFighting.value = true;
          }
        } else {
          // This is the first time the user opens this file

          if (time.localeCompare("05.00") == -1) {
            localStorage.setItem("counter", 301);
          } else if (time.localeCompare("10.00") == -1) {
            localStorage.setItem("counter", 601);
          } else if (time.localeCompare("15.00") == -1) {
            localStorage.setItem("counter", 901);
          }

          localStorage.setItem("title", title);
          adventure_title.value = localStorage.setItem("title", title);
          localStorage.setItem("description", description);
          adventure_description.value = localStorage.setItem(
            "description",
            description
          );
          localStorage.setItem("time", time);
          localStorage.setItem("gold", gold);

          localStorage.setItem("enemy", enemy.name);
          localStorage.setItem("level", enemy.level);
          localStorage.setItem("strength", enemy.strength);
          localStorage.setItem("strength_stats_max", enemy.strength_stats_max);
          localStorage.setItem("strength_stats_min", enemy.strength_stats_min);
          localStorage.setItem("agility", enemy.agility);
          localStorage.setItem("speed", enemy.speed);
          localStorage.setItem("endurance", enemy.endurance);
          localStorage.setItem("health", enemy.health);
          localStorage.setItem("intelligence", enemy.health);
          localStorage.setItem("magicalpower", enemy.magicalpower);

          chosenAdventure.value = true;
          localStorage["adventureTimer"] = Date.now();
        }
        adventure_title.value = localStorage.getItem("title");
        adventure_description.value = localStorage.getItem("description");
      }, 1000);
    }

    function checkAdventureTimer() {
      setTimeout(() => {
        var started = localStorage.getItem("adventureTimer");

        if (started) {
          var diff = Date.now() - started;

          let counter = parseInt(localStorage.getItem("gold"), 10);

          adventureTimer.value =
            Math.round((diff / 60 / 60 / counter) * 100) + "%";
          document.getElementById("progress-bar").style.width =
            adventureTimer.value;

          if (Math.round(diff / 60 / 60) >= counter) {
            chosenAdventure.value = false;
            isFighting.value = true;
            setTimeout(() => {
              fight();
            }, 100);
          }
        }
      }, 1000);

      setTimeout(() => {
        checkAdventureTimer();
      }, 1000);
    }

    function fight() {
      // Get User
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
            }
          }
        });

      // Get enemy
      boss_name.value = localStorage.getItem("enemy");
      boss_level.value = localStorage.getItem("level");
      boss_strength.value = localStorage.getItem("strength");
      boss_strength_stats_max.value = localStorage.getItem(
        "strength_stats_max"
      );
      boss_strength_stats_min.value = localStorage.getItem(
        "strength_stats_min"
      );
      boss_agility.value = localStorage.getItem("agility");
      boss_speed.value = localStorage.getItem("speed");
      boss_endurance.value = localStorage.getItem("endurance");
      boss_health.value = localStorage.getItem("health");
      boss_health_max.value = boss_health.value;
      boss_intelligence.value = localStorage.getItem("intelligence");
      boss_magicalpower.value = localStorage.getItem("magicalpower");

      // Battle
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
            window.setTimeout(function () {
              bossHasEnded.value = true;

              localStorage.removeItem("speed");
              localStorage.removeItem("health");
              localStorage.removeItem("time");
              localStorage.removeItem("intelligence");
              localStorage.removeItem("description");
              localStorage.removeItem("title");
              localStorage.removeItem("level");
              localStorage.removeItem("agility");
              localStorage.removeItem("endurance");
              localStorage.removeItem("magicalpower");
              localStorage.removeItem("gold");
              localStorage.removeItem("strength");
              localStorage.removeItem("adventureTimer");
              localStorage.removeItem("strength_stats_max");
              localStorage.removeItem("strength_stats_min");
              localStorage.removeItem("enemy");
              localStorage.removeItem("adventureEnded");
              localStorage.removeItem("counter");
            }, 600);
            return;
          }
          if (boss_health.value <= 0) {
            gold.value = localStorage.getItem("gold");
            boss_health.value = 0;
            boss_health_bar.style.width = "0%";
            console.log("Player has won the game");
            let num = parseInt(localStorage.getItem("gold"), 10);
            window.setTimeout(function () {
              // Update reward
              firebase
                .database()
                .ref("users/" + store.state.user.user.displayName)
                .update({
                  gold: player_gold.value + num,
                  xp: player_xp.value + 250,
                })
                .catch((error) => {
                  console.log(error.message);
                });
              playerHasEnded.value = true;

              localStorage.removeItem("speed");
              localStorage.removeItem("health");
              localStorage.removeItem("time");
              localStorage.removeItem("intelligence");
              localStorage.removeItem("description");
              localStorage.removeItem("title");
              localStorage.removeItem("level");
              localStorage.removeItem("agility");
              localStorage.removeItem("endurance");
              localStorage.removeItem("magicalpower");
              localStorage.removeItem("gold");
              localStorage.removeItem("strength");
              localStorage.removeItem("adventureTimer");
              localStorage.removeItem("strength_stats_max");
              localStorage.removeItem("strength_stats_min");
              localStorage.removeItem("enemy");
              localStorage.removeItem("adventureEnded");
              localStorage.removeItem("counter");
            }, 1000);
            return;
          }
        }
      }, 1800);
    }

    function skipAdventure() {
      setTimeout(() => {
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
              if (item[0] == "rubies") {
                rubies.value = item[1];
                console.log(rubies.value);
              }
            }
          });
      }, 150);

      setTimeout(() => {
        if (rubies.value >= 3) {
          firebase
            .database()
            .ref("users/" + store.state.user.user.displayName)
            .update({
              rubies: rubies.value - 3,
            })
            .catch((error) => {
              console.log(error.message);
            });

          chosenAdventure.value = false;
          isFighting.value = true;
          setTimeout(() => {
            fight();
          }, 100);
        }
      }, 500);
    }

    function reload() {
      window.location.reload();
    }

    return {
      fight,
      reload,
      startAdventure,
      chosenAdventure,
      isFighting,
      easy_title,
      easy_description,
      easy_difficulty,
      easy_time,
      easy_gold,
      easy_normal_item,
      easy_rare_item,
      easy_adventure,
      easy_enemy,
      medium_title,
      medium_description,
      medium_difficulty,
      medium_time,
      medium_gold,
      medium_normal_item,
      medium_rare_item,
      medium_adventure,
      medium_enemy,
      hard_title,
      hard_description,
      hard_difficulty,
      hard_time,
      hard_gold,
      hard_normal_item,
      hard_rare_item,
      hard_adventure,
      hard_enemy,
      adventureTimer,
      adventure_title,
      adventure_description,
      player_name,
      player_xp,
      player_level,
      player_gold,
      player_rubies,
      player_strength_stats_min,
      player_strength_stats_max,
      player_speed,
      player_health_max,
      player_health,
      player_magicalpower,
      boss_name,
      boss_level,
      boss_strength,
      boss_strength_stats_max,
      boss_strength_stats_min,
      boss_agility,
      boss_speed,
      boss_endurance,
      boss_health,
      boss_health_max,
      boss_intelligence,
      boss_magicalpower,
      round,
      gold,
      rubies,
      playerHasEnded,
      bossHasEnded,
      easy_counter,
      medium_counter,
      hard_counter,
      skipAdventure,
    };
  },
};
</script>
<style scoped>
@import "../assets/style/adventures.css";
</style>