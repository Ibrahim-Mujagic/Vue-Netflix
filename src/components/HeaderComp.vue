<script>
import { store } from "../data/store";
export default {
  name: "HeaderComp",
  data() {
    return {
      store,
    };
  },
  methods: {},
};
</script>

<template>
  <header>
    <div class="logo-nav">
      <img :src="store.getImg('netflix-logo.png')" alt="Logo" />
      <nav>
        <ul>
          <li><a @click="$emit('getPopular')" href="#">Home</a></li>
          <li><a @click="$emit('getPopular')" href="#">Film</a></li>
          <li><a @click="$emit('getTv')" href="#">Serie Tv</a></li>
        </ul>
      </nav>
    </div>

    <div class="searchbar">
      <input
        @keyup.enter="$emit('search')"
        v-model.trim="store.userItemToSearch"
        type="text"
        placeholder="Cerca"
      />
      <select @change="$emit('search')" v-model="store.type">
        <option value="">Tutto</option>
        <option value="movie">Film</option>
        <option value="tv">Tv</option>
      </select>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../style/vars" as *;
header {
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-black;
  padding: 0px 15px;
  position: sticky;
  top: 0%;
  z-index: 999;
  margin-bottom: 20px;
  .logo-nav {
    display: flex;
    align-items: center;
    img {
      width: 200px;
      cursor: pointer;
    }
    nav {
      ul {
        list-style: none;
        display: flex;
        gap: 20px;
        li {
          a {
            text-decoration: none;
            color: #ffffff;

            &:hover {
              text-shadow: 0px 0px 4px #ffffff;
            }
          }
        }
      }
    }
  }
  .searchbar {
    display: flex;
    align-content: center;
    gap: 25px;
    input {
      border: 1px solid $main-red;
      background-color: transparent;
      border-radius: 6px;
      min-width: 260px;
      height: 38px;
      padding-left: 10px;
      color: $main-red;
      text-shadow: 0px 0px 2px $main-red;
      &:focus {
        outline: none;
        box-shadow: 0px 0px 15px $main-red;
      }
    }
    select {
      font-size: 1.1rem;
      color: #ffffff;
      background-color: transparent;
      border: 1px solid #ffffff;
      height: 38px;
      width: 100px;
      border-radius: 6px;
      padding: 0px 7px;
      cursor: pointer;

      &:hover {
        box-shadow: 0px 0px 15px #ffffff;
        text-shadow: 0px 0px 2px #ffffff;
      }
    }
  }
}
</style>
