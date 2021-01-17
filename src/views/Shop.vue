<template>
  <main class="wrapper">
    <div class="shop-wrapper">
      <div class="shop-side">
        <img
          src="https://i.pinimg.com/originals/73/5e/5d/735e5da3c5a46564cb9b3df94b785c20.jpg"
          alt=""
          class="shop-image"
        />
        <p class="error" id="error" v-if="error">{{ error }}</p>
        <div class="shop-flex">
          <div class="shop-menu">
            <div
              class="shop-menu-hovered"
              @click="openShopMenu('weapons')"
              id="weaponsMenu"
            >
              <img
                class="shop-menu-img"
                src="https://www.flaticon.com/svg/static/icons/svg/1399/1399654.svg"
                alt=""
              />
            </div>
            <div
              class="armor-box"
              @click="openShopMenu('armor')"
              id="armorMenu"
            >
              <img
                class="shop-menu-img"
                src="https://www.flaticon.com/svg/static/icons/svg/1907/1907813.svg"
                alt=""
              />
            </div>
            <div
              class="potions-box"
              @click="openShopMenu('potions')"
              id="potionsMenu"
            >
              <img
                class="shop-menu-img"
                src="https://www.flaticon.com/svg/static/icons/svg/1205/1205664.svg"
                alt=""
              />
            </div>
            <div
              class="runes-box"
              @click="openShopMenu('runes')"
              id="runesMenu"
            >
              <img
                class="shop-menu-img"
                src="https://www.flaticon.com/svg/static/icons/svg/1396/1396675.svg"
                alt=""
              />
            </div>
          </div>
          <!-- Weapons -->
          <div id="weapons" class="shop">
            <div class="shop-top">
              <div class="box">
                <div
                  class="hvrbox"
                  @click="
                    buy(
                      sword1_img,
                      sword1_name,
                      sword1_rarity,
                      sword1_dmg_min,
                      sword1_dmg_max,
                      sword1_price
                    )
                  "
                >
                  <img
                    :src="sword1_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ sword1_name }}</p>
                      <p class="hover-dmg">
                        {{ sword1_dmg_min }} - {{ sword1_dmg_max }}
                      </p>
                      <p class="hover-rarity">{{ sword1_rarity }}</p>
                      <p class="hover-cost">{{ sword1_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div
                  class="hvrbox"
                  @click="
                    buy(
                      sword2_img,
                      sword2_name,
                      sword2_rarity,
                      sword2_dmg_min,
                      sword2_dmg_max,
                      sword2_price
                    )
                  "
                >
                  <img
                    :src="sword2_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ sword2_name }}</p>
                      <p class="hover-dmg">
                        {{ sword2_dmg_min }} - {{ sword2_dmg_max }}
                      </p>
                      <p class="hover-rarity">{{ sword2_rarity }}</p>
                      <p class="hover-cost">{{ sword2_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div
                  class="hvrbox"
                  @click="
                    buy(
                      sword3_img,
                      sword3_name,
                      sword3_rarity,
                      sword3_dmg_min,
                      sword3_dmg_max,
                      sword3_price
                    )
                  "
                >
                  <img
                    :src="sword3_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ sword3_name }}</p>
                      <p class="hover-dmg">
                        {{ sword3_dmg_min }} - {{ sword3_dmg_max }}
                      </p>
                      <p class="hover-rarity">{{ sword3_rarity }}</p>
                      <p class="hover-cost">
                        {{ sword3_price }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-bottom">
              <div class="box"></div>
              <div class="box"></div>
              <div class="box"></div>
            </div>
          </div>
          <!-- Armor -->
          <div class="shop" id="armor">
            <div class="shop-top">
              <div class="box">
                <div class="hvrbox">
                  <img
                    :src="hm_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ hm_name }}</p>
                      <p class="hover-dmg">{{ hm_armour }} - {{ hm_health }}</p>
                      <p class="hover-rarity">{{ hm_rarity }}</p>
                      <p class="hover-cost">{{ hm_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="hvrbox">
                  <img
                    :src="cp_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ cp_name }}</p>
                      <p class="hover-dmg">{{ cp_armour }} - {{ cp_health }}</p>
                      <p class="hover-rarity">{{ cp_rarity }}</p>
                      <p class="hover-cost">{{ cp_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="hvrbox">
                  <img
                    :src="gl_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ gl_name }}</p>
                      <p class="hover-dmg">
                        {{ gl_armour }} - {{ gl_magicpower }}
                      </p>
                      <p class="hover-rarity">{{ gl_rarity }}</p>
                      <p class="hover-cost">{{ gl_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-bottom">
              <div class="box">
                <div class="hvrbox">
                  <img
                    :src="bt_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ bt_name }}</p>
                      <p class="hover-dmg">{{ bt_armour }} - {{ bt_speed }}</p>
                      <p class="hover-rarity">{{ bt_rarity }}</p>
                      <p class="hover-cost">{{ bt_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box"></div>
              <div class="box"></div>
            </div>
          </div>
          <!-- Potions -->
          <div class="shop" id="potions">
            <div class="shop-top">
              <div class="box">
                <div
                  class="hvrbox"
                  @click="
                    buy(
                      sword1_img,
                      sword1_name,
                      sword1_rarity,
                      sword1_dmg_min,
                      sword1_dmg_max,
                      sword1_price
                    )
                  "
                >
                  <img
                    :src="sword1_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ sword1_name }}</p>
                      <p class="hover-dmg">
                        {{ sword1_dmg_min }} - {{ sword1_dmg_max }}
                      </p>
                      <p class="hover-rarity">{{ sword1_rarity }}</p>
                      <p class="hover-cost">{{ sword1_price }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box"></div>
              <div class="box">
                <div
                  class="hvrbox"
                  @click="
                    buy(
                      sword3_img,
                      sword3_name,
                      sword3_rarity,
                      sword3_dmg_min,
                      sword3_dmg_max,
                      sword3_price
                    )
                  "
                >
                  <img
                    :src="sword3_img"
                    alt="Mountains"
                    class="hvrbox-layer_bottom"
                  />
                  <div class="hvrbox-layer_top">
                    <div class="hvrbox-text">
                      <p class="hover-name">{{ sword3_name }}</p>
                      <p class="hover-dmg">
                        {{ sword3_dmg_min }} - {{ sword3_dmg_max }}
                      </p>
                      <p class="hover-rarity">{{ sword3_rarity }}</p>
                      <p class="hover-cost">
                        {{ sword3_price }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-bottom">
              <div class="box"></div>
              <div class="box"></div>
              <div class="box"></div>
            </div>
          </div>
          <!-- Runes -->
          <div class="shop" id="runes">
            <div class="shop-top">
              <div class="box"></div>
              <div class="box"></div>
              <div class="box"></div>
            </div>
            <div class="shop-bottom">
              <div class="box"></div>
              <div class="box"></div>
              <div class="box"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="shop-inventory">
        <div class="inventory-box">
          <div class="inventory-top">
            <div class="box"></div>
            <div class="small-box"></div>
          </div>
          <div class="inventory-middle">
            <div class="long-box"></div>
            <div class="long-box"></div>
            <div class="long-box"></div>
          </div>
          <div class="inventory-bottom">
            <div class="box"></div>
            <div class="box"></div>
            <div class="small-box"></div>
          </div>
          <div class="inventory-bottom">
            <div id="inventory" class="inventory-place-box">
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
                      <!-- <p class="hover-rarity">{{ item.rarity }}</p> -->
                    </div>
                  </div>
                </div>
              </span>
            </div>
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

    let error = ref();

    let gold = ref();
    let rubies = ref();
    let inventory = ref();

    // Weapons
    let sword1 = ref();
    let sword1_img = ref();
    let sword1_name = ref();
    let sword1_rarity = ref();
    let sword1_dmg_min = ref();
    let sword1_dmg_max = ref();
    let sword1_price = ref();

    let sword2 = ref();
    let sword2_img = ref();
    let sword2_name = ref();
    let sword2_rarity = ref();
    let sword2_dmg_min = ref();
    let sword2_dmg_max = ref();
    let sword2_price = ref();

    let sword3 = ref();
    let sword3_img = ref();
    let sword3_name = ref();
    let sword3_rarity = ref();
    let sword3_dmg_min = ref();
    let sword3_dmg_max = ref();
    let sword3_price = ref();

    // Armour
    let cp = ref();
    let cp_img = ref();
    let cp_name = ref();
    let cp_rarity = ref();
    let cp_armour = ref();
    let cp_health = ref();
    let cp_price = ref();

    let bt = ref();
    let bt_img = ref();
    let bt_name = ref();
    let bt_rarity = ref();
    let bt_armour = ref();
    let bt_speed = ref();
    let bt_price = ref();

    let gl = ref();
    let gl_img = ref();
    let gl_name = ref();
    let gl_rarity = ref();
    let gl_armour = ref();
    let gl_magicpower = ref();
    let gl_price = ref();

    let hm = ref();
    let hm_img = ref();
    let hm_name = ref();
    let hm_rarity = ref();
    let hm_armour = ref();
    let hm_health = ref();
    let hm_price = ref();

    onMounted(() => {
      if (store.state.isSigned) {
        user.value = store.state.user.user;
        isSigned.value = store.state.isSigned;

        openShopMenu("weapons");

        setTimeout(() => {
          updateInventory();
        }, 100);

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
              if (item[0] == "gold") {
                gold.value = item[1];
              } else if (item[0] == "rubies") {
                rubies.value = item[1];
              }
            }
          });
        // Weapons
        firebase
          .database()
          .ref("/items/swords")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            scoresArray.forEach((element) => array.push(element));
            for (let item of array) {
              if (item[0] == "sw_lvl1") {
                sword1.value = item[1];
                sword1_img.value = sword1.value.item;
                sword1_name.value = sword1.value.name;
                sword1_rarity.value = sword1.value.rarity;
                sword1_dmg_min.value = sword1.value.demage_min;
                sword1_dmg_max.value = sword1.value.demage_max;
                sword1_price.value = sword1.value.price;
              } else if (item[0] == "sw_lvl2") {
                sword2.value = item[1];
                sword2_img.value = sword2.value.item;
                sword2_name.value = sword2.value.name;
                sword2_rarity.value = sword2.value.rarity;
                sword2_dmg_min.value = sword2.value.demage_min;
                sword2_dmg_max.value = sword2.value.demage_max;
                sword2_price.value = sword2.value.price;
              } else if (item[0] == "sw_lvl3") {
                sword3.value = item[1];
                sword3_img.value = sword3.value.item;
                sword3_name.value = sword3.value.name;
                sword3_rarity.value = sword3.value.rarity;
                sword3_dmg_min.value = sword3.value.demage_min;
                sword3_dmg_max.value = sword3.value.demage_max;
                sword3_price.value = sword3.value.price;
              }
            }
          });
        // Armour
        firebase
          .database()
          .ref("/items/armor")
          .once("value")
          .then((snapshot) => {
            let scoresObj = snapshot.val();
            let scoresArray = Object.entries(scoresObj);
            let array = [];
            scoresArray.forEach((element) => array.push(element));
            for (let item of array) {
              if (item[0] == "cp_lvl1") {
                cp.value = item[1];
                cp_img.value = cp.value.item;
                cp_name.value = cp.value.name;
                cp_rarity.value = cp.value.rarity;
                cp_armour.value = cp.value.armour;
                cp_health.value = cp.value.health;
                cp_price.value = cp.value.price;
              } else if (item[0] == "bt_lvl1") {
                bt.value = item[1];
                bt_img.value = bt.value.item;
                bt_name.value = bt.value.name;
                bt_rarity.value = bt.value.rarity;
                bt_armour.value = bt.value.armour;
                bt_speed.value = bt.value.speed;
                bt_price.value = bt.value.price;
              } else if (item[0] == "gl_lvl1") {
                gl.value = item[1];
                gl_img.value = gl.value.item;
                gl_name.value = gl.value.name;
                gl_rarity.value = gl.value.rarity;
                gl_armour.value = gl.value.armour;
                gl_magicpower.value = gl.value.magicpower;
                gl_price.value = gl.value.price;
              } else if (item[0] == "hm_lvl1") {
                hm.value = item[1];
                hm_img.value = hm.value.item;
                hm_name.value = hm.value.name;
                hm_rarity.value = hm.value.rarity;
                hm_armour.value = hm.value.armour;
                hm_health.value = hm.value.health;
                hm_price.value = hm.value.price;
              }
            }
          });
      } else {
        router.push("/");
      }
    });

    function buy(image, name, rarity, dmg_min, dmg_max, price) {
      firebase
        .database()
        .ref(
          "/users/" + store.state.user.user.displayName + "/inventory/" + name
        )
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            setTimeout(() => {
              document.getElementById("error").style.display = "block";
            }, 100);
            error.value = "Item exists in inventory";
            setTimeout(() => {
              document.getElementById("error").style.display = "none";
            }, 1000);
            return;
          } else {
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
                  if (item[0] == "gold") {
                    gold.value = item[1];
                  }
                }
              });

            if (gold.value >= price) {
              firebase
                .database()
                .ref("users/" + store.state.user.user.displayName)
                .update({
                  gold: gold.value - price,
                })
                .catch((error) => {
                  console.log(error.message);
                });

              firebase
                .database()
                .ref(
                  "users/" +
                    store.state.user.user.displayName +
                    "/inventory/" +
                    name
                )
                .update({
                  image: image,
                  name: name,
                  rarity: rarity,
                  demage_max: dmg_max,
                  demage_min: dmg_min,
                  price: price,
                })
                .catch((error) => {
                  console.log(error.message);
                });
              let inventory = document.getElementById("inventory");
              const img = document.createElement("span");
              img.innerHTML =
                "<img src='" +
                image +
                "'style='width: 80px; height: 80px; padding: 0.2rem'>";
              inventory.appendChild(img);
            } else {
              setTimeout(() => {
                document.getElementById("error").style.display = "block";
              }, 100);
              error.value = "Not enough gold";
              setTimeout(() => {
                document.getElementById("error").style.display = "none";
              }, 1000);
              return;
            }
          }
        });
    }

    function updateInventory() {
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
    }

    function openShopMenu(menuType) {
      let weaponsMenuItem = document.getElementById("weaponsMenu");
      let weaponsMenu = document.getElementById("weapons");

      let armorMenuItem = document.getElementById("armorMenu");
      let armorMenu = document.getElementById("armor");

      let potionsMenuItem = document.getElementById("potionsMenu");
      let potionsMenu = document.getElementById("potions");

      let runesMenuItem = document.getElementById("runesMenu");
      let runesMenu = document.getElementById("runes");

      weaponsMenuItem.classList = "weapons-box";
      armorMenuItem.classList = "armor-box";
      potionsMenuItem.classList = "potions-box";
      runesMenuItem.classList = "runes-box";

      weaponsMenu.style.display = "none";
      armorMenu.style.display = "none";
      potionsMenu.style.display = "none";
      runesMenu.style.display = "none";

      if (menuType == "weapons") {
        weaponsMenuItem.classList = "shop-menu-hovered";
        weaponsMenu.style.display = "block";
      } else if (menuType == "armor") {
        armorMenuItem.classList = "shop-menu-hovered";
        armorMenu.style.display = "block";
      } else if (menuType == "potions") {
        potionsMenuItem.classList = "shop-menu-hovered";
        potionsMenu.style.display = "block";
      } else if (menuType == "runes") {
        runesMenuItem.classList = "shop-menu-hovered";
        runesMenu.style.display = "block";
      }
    }

    return {
      openShopMenu,
      sword1,
      sword1_img,
      sword1_name,
      sword1_rarity,
      sword1_dmg_min,
      sword1_dmg_max,
      sword1_price,
      sword2,
      sword2_img,
      sword2_name,
      sword2_rarity,
      sword2_dmg_min,
      sword2_dmg_max,
      sword2_price,
      sword3,
      sword3_img,
      sword3_name,
      sword3_rarity,
      sword3_dmg_min,
      sword3_dmg_max,
      sword3_price,
      cp,
      cp_img,
      cp_name,
      cp_rarity,
      cp_armour,
      cp_health,
      cp_price,
      bt,
      bt_img,
      bt_name,
      bt_rarity,
      bt_armour,
      bt_speed,
      bt_price,
      gl,
      gl_img,
      gl_name,
      gl_rarity,
      gl_armour,
      gl_magicpower,
      gl_price,
      hm,
      hm_img,
      hm_name,
      hm_rarity,
      hm_armour,
      hm_health,
      hm_price,
      buy,
      inventory,
      error,
    };
  },
};
</script>

<style scoped>
@import "../assets/style/shop.css";
</style>