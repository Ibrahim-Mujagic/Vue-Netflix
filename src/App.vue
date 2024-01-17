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
    getApiData(type, isPopular = false) {
      let apiUrl;
      isPopular
        ? (apiUrl = `https://api.themoviedb.org/3/${type}/popular`)
        : (apiUrl = store.apiUrl + type);

      axios
        .get(apiUrl, {
          params: {
            api_key: store.api_key,
            query: store.userItemToSearch,
          },
        })
        .then((result) => {
          store[type] = result.data.results;
          console.log(store[type]);
        });
    },
    startSearch() {
      store.movie = [];
      store.tv = [];

      if (store.type === "") {
        this.getApiData("movie", false);
        this.getApiData("tv", false);
      } else {
        this.getApiData(store.type, false);
      }
    },
    getPopularTvMovie(isMovie) {
      store.movie = [];
      store.tv = [];

      if (isMovie) {
        this.getApiData("movie", true);
      } else {
        this.getApiData("tv", true);
      }
    },
  },
  mounted() {
    this.getApiData("movie", true);
    this.getApiData("tv", true);
  },
};
</script>

<template>
  <div class="container-general">
    <HeaderComp
      @search="startSearch()"
      @getPopular="getPopularTvMovie(true)"
      @getTv="getPopularTvMovie(false)"
    />
    <main>
      <div class="movie-tv-cards">
        <h2 v-if="store.movie.length > 0">Film</h2>
        <div class="container-movies">
          <CardMovieSeries type="movie" />
        </div>
        <h2 v-if="store.tv.length > 0">Tv</h2>
        <div class="container-tv">
          <CardMovieSeries type="tv" />
        </div>
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
  .movie-tv-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-movies,
  .container-tv {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-bottom: 25px;
  }
}
</style>
