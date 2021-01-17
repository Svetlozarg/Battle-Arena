<template>
  <main class="wrapper" v-if="isSigned">
    <div class="profile-wrapper">
      <div>
        <div class="profile-info">
          <div class="image-box">
            <img
              class="profile-image"
              src="https://avatarfiles.alphacoders.com/199/199045.jpg"
              alt=""
            />
          </div>

          <div class="profile-text">
            <div class="text-top">
              <p class="info-text">Name:</p>
              <p class="info-text">Level:</p>
              <p class="info-text">Rank:</p>
              <p class="info-text">Fame:</p>
              <p class="info-text">Experience:</p>
              <p class="info-text">Guild:</p>
            </div>
            <div class="text-bottom">
              <p class="info-text">{{ name }}</p>
              <p class="info-text">{{ level }}</p>
              <p class="info-text">{{ rank }}</p>
              <p class="info-text">{{ level * 100 }}</p>
              <p class="info-text">
                {{ xp }}
              </p>
              <p class="info-text">Guild Name</p>
            </div>
          </div>
        </div>

        <div class="profile-stats">
          <div class="profile-skill-top">
            <p class="profile-skill">Strength</p>
            <p class="profile-skill-desc">
              Damage {{ Math.round(1 + strength * level * 0.25) }} -
              {{ Math.round(1 + strength * level * 0.28) }}
            </p>
            <p class="profile-skill">Agility</p>
            <p class="profile-skill-desc">
              Speed {{ Math.round(1 + agility * level * 0.25) }}
            </p>
            <p class="profile-skill">Endurance</p>
            <p class="profile-skill-desc">
              Health {{ Math.round(1 + endurance * level * 2.5) }}
            </p>
            <p class="profile-skill">Intelligence</p>
            <p class="profile-skill-desc">
              Magical power {{ Math.round(1 + intelligence * level * 0.5) }}
            </p>
          </div>
          <div class="profile-skill-bottom">
            <p class="profile-skill-cost">
              <span class="cost">{{ strength }}</span>
              <a
                id="strength"
                href="#"
                class="upgrade"
                title="Upgrade Strength"
                @click="upgrade('strength', strength), checkGold()"
                >⇧</a
              >
              <span :class="enoughthStrength ? 'green-cost' : 'new-cost'"
                >{{ strength_cost }}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3141/3141816.svg"
                  alt=""
                  style="width: 20px"
              /></span>
            </p>
            <p class="profile-skill-cost">
              <span class="cost">{{ agility }}</span>
              <a
                id="agility"
                href="#"
                class="upgrade"
                title="Upgrade Agility"
                @click="upgrade('agility', agility), checkGold()"
                >⇧</a
              >
              <span :class="enoughthAgility ? 'green-cost' : 'new-cost'"
                >{{ agility_cost }}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3141/3141816.svg"
                  alt=""
                  style="width: 20px"
              /></span>
            </p>
            <p class="profile-skill-cost">
              <span class="cost">{{ endurance }}</span>
              <a
                id="endurance"
                href="#"
                class="upgrade"
                title="Upgrade Endurance"
                @click="upgrade('endurance', endurance), checkGold()"
                >⇧</a
              >
              <span :class="enoughthEndurance ? 'green-cost' : 'new-cost'"
                >{{ endurance_cost }}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3141/3141816.svg"
                  alt=""
                  style="width: 20px"
              /></span>
            </p>
            <p class="profile-skill-cost">
              <span class="cost">{{ intelligence }}</span>
              <a
                id="intelligence"
                href="#"
                class="upgrade"
                title="Upgrade Intelligence"
                @click="upgrade('intelligence', intelligence), checkGold()"
                >⇧</a
              >
              <span :class="enoughthIntelligence ? 'green-cost' : 'new-cost'"
                >{{ intelligence_cost }}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3141/3141816.svg"
                  alt=""
                  style="width: 20px"
              /></span>
            </p>
          </div>
        </div>
        <div class="progress-div">
          <div class="progress-text-s">
            <p class="progress-p">{{ xp + " xp " }}</p>
            <p class="progress-p">{{ next_xp + " xp " }}</p>
          </div>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{ width: xpdifference + '%' }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <div class="inventory-box">
        <div class="inventory-top">
          <div class="box" @drop="drop" @dragover="allowDrop"></div>
          <div class="small-box" @drop="drop" @dragover="allowDrop"></div>
        </div>
        <div class="inventory-middle">
          <div class="long-box" @drop="drop" @dragover="allowDrop"></div>
          <div class="long-box" @drop="drop" @dragover="allowDrop"></div>
          <div class="long-box" @drop="drop" @dragover="allowDrop"></div>
        </div>
        <div class="inventory-bottom">
          <div class="box" @drop="drop" @dragover="allowDrop"></div>
          <div class="box" @drop="drop" @dragover="allowDrop"></div>
          <div class="small-box" @drop="drop" @dragover="allowDrop"></div>
        </div>
        <div class="inventory-bottom">
          <div class="inventory-place-box">
            <span v-for="item in inventory" :key="item.id">
              <div class="hvrbox">
                <img
                  :src="item.image"
                  alt="Mountains"
                  class="hvrbox-layer_bottom"
                  style="width: 80px; height: 95px; padding: 0.2rem"
                />
                <div class="hvrbox-layer_top">
                  <div class="hvrbox-text">
                    <p class="hover-name">{{ item.name }}</p>
                    <p class="hover-dmg">
                      {{ item.demage_min }} - {{ item.demage_max }}
                    </p>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
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
    let userObj = ref();
    let inventory = ref();

    // User Info
    let name = ref("");
    let level = ref();
    let rank = ref();
    let fame = ref();
    let xp = ref();
    let next_xp = ref();
    let xpdifference = ref();

    // User Stats
    let strength = ref();
    let strength_stats_min = ref();
    let strength_stats_max = ref();
    let agility = ref();
    let speed = ref();
    let endurance = ref();
    let health = ref();
    let intelligence = ref();
    let magicalpower = ref();

    // User Currency
    let gold = ref();
    let rubies = ref();

    // Skill Cost
    let strength_cost = ref(1);
    let enoughthStrength = ref();
    let agility_cost = ref(1);
    let enoughthAgility = ref();
    let endurance_cost = ref(1);
    let enoughthEndurance = ref();
    let intelligence_cost = ref(1);
    let enoughthIntelligence = ref();

    onMounted(() => {
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;

        // Get Stats
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
              // User Info
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
              } else if (item[0] == "fame") {
                fame.value = item[1];
              } else if (item[0] == "xp") {
                xp.value = item[1];
              } else if (item[0] == "xp_next") {
                // Math.round(level.value * 100 * 2.5)
                next_xp.value = item[1];

                // Check For Level Up
                if (xp.value >= next_xp.value) {
                  // Update Level
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      level: level.value + 1,
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  level.value += 1;

                  // Update current xp
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      xp: Math.round(level.value * 100 * 2.5),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  xp.value = Math.round(level.value * 100 * 2.5);

                  // Update next xp
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      xp_next: Math.round((level.value + 1) * 100 * 3),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  next_xp.value = Math.round((level.value + 1) * 100 * 3);

                  // Update Strength
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      strength_stats_min: Math.round(
                        1 + strength.value * level.value * 0.25
                      ),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      strength_stats_min: Math.round(
                        1 + strength.value * level.value * 0.25
                      ),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      strength_stats_max: Math.round(
                        1 + strength.value * level.value * 0.28
                      ),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });

                  // Update Agility
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      speed: Math.round(1 + agility.value * level.value * 0.25),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });

                  // Update Endurance
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      health: Math.round(
                        1 + endurance.value * level.value * 2.5
                      ),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });

                  // Update Intelligence
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      magicalpower: Math.round(
                        1 + intelligence.value * level.value * 0.5
                      ),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                  xpProgress();
                } else {
                  firebase
                    .database()
                    .ref("users/" + store.state.user.user.displayName)
                    .update({
                      xp_next: Math.round((level.value + 1) * 100 * 3),
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                }
              }
              // User Stats
              if (item[0] == "strength") {
                strength.value = item[1];
              } else if (item[0] == "strength_stats_min") {
                strength_stats_min.value = item[1];
                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    strength_stats_min: Math.round(
                      1 + strength.value * level.value * 0.25
                    ),
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              } else if (item[0] == "strength_stats_max") {
                strength_stats_max.value = item[1];
                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    strength_stats_max: Math.round(
                      1 + strength.value * level.value * 0.28
                    ),
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              } else if (item[0] == "agility") {
                agility.value = item[1];
              } else if (item[0] == "speed") {
                speed.value = item[1];
                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    speed: Math.round(1 + agility.value * level.value * 0.25),
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });

                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    health: Math.round(1 + endurance.value * level.value * 2.5),
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              } else if (item[0] == "endurance") {
                endurance.value = item[1];
              } else if (item[0] == "intelligence") {
                intelligence.value = item[1];
              } else if (item[0] == "magicalpower") {
                magicalpower.value = item[1];
                firebase
                  .database()
                  .ref("users/" + store.state.user.user.displayName)
                  .update({
                    magicalpower: Math.round(
                      1 + intelligence.value * level.value * 0.5
                    ),
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }
              // Skill Cost
              if (item[0] == "strength_cost") {
                strength_cost.value = item[1];
              } else if (item[0] == "agility_cost") {
                agility_cost.value = item[1];
              } else if (item[0] == "endurance_cost") {
                endurance_cost.value = item[1];
              } else if (item[0] == "intelligence_cost") {
                intelligence_cost.value = item[1];
              }
              // User Currency
              if (item[0] == "gold") {
                gold.value = item[1];
              } else if (item[0] == "rubies") {
                rubies.value = item[1];
              }
            }
            checkGold();
            xpProgress();
          });

        // User inventory
        firebase
          .database()
          .ref("/users/" + store.state.user.user.displayName + "/inventory")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            let imgArray = [];
            scoresArray.forEach((element) => array.push(element));
            for (let item of array) {
              imgArray.push(item[1]);
            }
            // console.log(imgArray.length);
            inventory.value = imgArray;
          });
      } else {
        router.push("/");
      }
    });

    function xpProgress() {
      let xp_min = xp.value; // 250
      let xp_max = next_xp.value; //600
      xpdifference.value = Math.round((xp_min / xp_max) * 100);
    }

    function checkGold() {
      enoughthStrength.value = false;
      enoughthAgility.value = false;
      enoughthEndurance.value = false;
      enoughthIntelligence.value = false;

      if (gold.value >= strength_cost.value) {
        enoughthStrength.value = true;
      }
      if (gold.value >= agility_cost.value) {
        enoughthAgility.value = true;
      }
      if (gold.value >= endurance_cost.value) {
        enoughthEndurance.value = true;
      }
      if (gold.value >= intelligence_cost.value) {
        enoughthIntelligence.value = true;
      }
    }

    function upgrade(skillName, skill) {
      if (skill) {
        if (skillName == "strength") {
          if (gold.value >= strength_cost.value) {
            gold.value = gold.value - strength_cost.value;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                gold: gold.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            if (strength_cost.value < 10) {
              strength_cost.value = strength_cost.value + 1;
            } else if (strength_cost.value >= 10 && strength_cost.value < 20) {
              strength_cost.value = strength_cost.value + 2;
            } else if (strength_cost.value >= 20) {
              strength_cost.value = strength_cost.value + 5;
            }
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                strength_cost: strength_cost.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            strength.value++;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                strength: strength.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            return;
          }
        } else if (skillName == "agility") {
          if (gold.value >= agility_cost.value) {
            gold.value = gold.value - agility_cost.value;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                gold: gold.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            if (agility_cost.value < 10) {
              agility_cost.value = agility_cost.value + 1;
            } else if (agility_cost.value >= 10 && agility_cost.value < 20) {
              agility_cost.value = agility_cost.value + 2;
            } else if (agility_cost.value >= 20) {
              agility_cost.value = agility_cost.value + 5;
            }
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                agility_cost: agility_cost.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            agility.value++;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                agility: agility.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            return;
          }
        } else if (skillName == "endurance") {
          if (gold.value >= endurance_cost.value) {
            gold.value = gold.value - endurance_cost.value;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                gold: gold.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            if (endurance_cost.value < 10) {
              endurance_cost.value = endurance_cost.value + 1;
            } else if (
              endurance_cost.value >= 10 &&
              endurance_cost.value < 20
            ) {
              endurance_cost.value = endurance_cost.value + 2;
            } else if (endurance_cost.value >= 20) {
              endurance_cost.value = endurance_cost.value + 5;
            }
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                endurance_cost: endurance_cost.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            endurance.value++;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                endurance: endurance.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            return;
          }
        } else if (skillName == "intelligence") {
          if (gold.value >= intelligence_cost.value) {
            gold.value = gold.value - intelligence_cost.value;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                gold: gold.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            if (intelligence_cost.value < 10) {
              intelligence_cost.value = intelligence_cost.value + 1;
            } else if (
              intelligence_cost.value >= 10 &&
              intelligence_cost.value < 20
            ) {
              intelligence_cost.value = intelligence_cost.value + 2;
            } else if (intelligence_cost.value >= 20) {
              intelligence_cost.value = intelligence_cost.value + 5;
            }
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                intelligence_cost: intelligence_cost.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            intelligence.value++;
            firebase
              .database()
              .ref("users/" + store.state.user.user.displayName)
              .update({
                intelligence: intelligence.value,
              })
              .catch((error) => {
                console.log(error.message);
              });
            return;
          }
        }
      } else {
        console.log("No skill found");
      }
    }

    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");

      ev.target.appendChild(document.getElementById(data));
    }

    return {
      allowDrop,
      inventory,
      drag,
      drop,
      user,
      isSigned,
      userObj,
      name,
      level,
      rank,
      fame,
      xp,
      next_xp,
      xpdifference,
      strength,
      strength_stats_min,
      strength_stats_max,
      agility,
      speed,
      endurance,
      health,
      intelligence,
      magicalpower,
      gold,
      rubies,
      upgrade,
      strength_cost,
      agility_cost,
      endurance_cost,
      intelligence_cost,
      checkGold,
      enoughthStrength,
      enoughthAgility,
      enoughthEndurance,
      enoughthIntelligence,
    };
  },
};
</script>

<style scoped>
@import "../assets/style/profile.css";
</style>