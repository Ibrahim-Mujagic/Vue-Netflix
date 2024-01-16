<script>
import { store } from "./data/store";
import HeaderComp from "./components/HeaderComp.vue";
import CardMovieSeries from "./components/CardMovieSeries.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    HeaderComp,
    CardMovieSeries,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getApiData(apiUrl, type, userItemToSearch) {
      axios
        .get(apiUrl + type, {
          params: {
            api_key: store.api_key,
            query: userItemToSearch,
          },
        })
        .then((result) => {
          store.userFindedData = result.data;
          console.log(store.userFindedData);
        });
    },
    getUserValue(userValue) {
      this.getApiData(store.apiUrl, "movie", userValue);
    },
  },
};
</script>

<template>
  <div class="container-general">
    <HeaderComp @userValue="getUserValue" />
    <main>
      <div class="movie-cards">
        <CardMovieSeries
          v-for="(entertainmentItem, index) in store.userFindedData.results"
          :key="index"
          :entertainmentData="entertainmentItem"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use "./style/vars" as *;

main {
  h2 {
    text-align: center;
    text-shadow: 0px 0px 4px #ffffff;
    font-size: 1.8rem;
    margin: 10px;
  }
  .movie-cards {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
}
</style>
