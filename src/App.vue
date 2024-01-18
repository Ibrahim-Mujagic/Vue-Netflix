<script>
import { store } from "./data/store";
import HeaderComp from "./components/HeaderComp.vue";
import CardMovieSeries from "./components/CardMovieSeries.vue";
import SliderComp from "./components/SliderComp.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderComp,
    CardMovieSeries,
    SliderComp,
  },
  data() {
    return {
      store,
      isShowDetail: false,
      clock: "",
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
    getPopularTvMovie(isMovie, isShowAll) {
      this.isShowDetail = false;
      store.movie = [];
      store.tv = [];

      if (isShowAll) {
        this.getApiData("movie", true);
        this.getApiData("tv", true);
      }

      if (isMovie) {
        this.getApiData("movie", true);
      } else {
        this.getApiData("tv", true);
      }
    },
    nextPrevImage(isNext) {
      if (isNext) {
        store.counterImage++;
        if (store.counterImage === store.movie.length) {
          store.counterImage = 0;
        }
      } else {
        store.counterImage--;
        if (store.counterImage < 0) {
          store.counterImage = store.movie.length - 1;
        }
      }
    },
    saveData(type) {
      this.isShowDetail = true;
    },
    autoSlide() {
      this.clock = setInterval(() => this.nextPrevImage(true), 2500);
    },
    stopPlayAutoSlide(isAutoPlay) {
      if (isAutoPlay) {
        clearInterval(this.clock);
      } else {
        this.autoSlide();
      }
    },
  },
  mounted() {
    this.getApiData("movie", true);
    this.getApiData("tv", true);
    this.autoSlide();
  },
};
</script>

<template>
  <div class="container-general">
    <HeaderComp
      @search="startSearch()"
      @getPopular="getPopularTvMovie('', true)"
      @getMovie="getPopularTvMovie(true)"
      @getTv="getPopularTvMovie(false)"
    />
    <main v-if="!isShowDetail">
      <div
        class="cont-slider"
        v-if="store.tv.length > 0 && store.movie.length > 0"
      >
        <SliderComp
          v-for="(slide, index) in store.movie"
          :key="index"
          :imageData="slide"
          :counterIndex="index"
          @mouseover="stopPlayAutoSlide(true)"
          @mouseleave="stopPlayAutoSlide(false)"
        />

        <button @click="nextPrevImage(false)" class="btn btn-prev">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button @click="nextPrevImage(true)" class="btn btn-next">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div class="movie-tv-cards">
        <h2 v-if="store.movie.length > 0">Film</h2>
        <div class="container-movies">
          <CardMovieSeries type="movie" @showMyDetail="saveData(type)" />
        </div>
        <h2 v-if="store.tv.length > 0">Tv</h2>
        <div class="container-tv">
          <CardMovieSeries type="tv" @showMyDetail="saveData(type)" />
        </div>
      </div>
    </main>
    <router-view @getPopular="getPopularTvMovie('', true)" v-else></router-view>
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
  .cont-slider {
    height: 500px;
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    button.btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      height: 100%;
      min-width: 60px;
      font-size: 2rem;
      background-color: rgba(220, 220, 220, 0.026);
      color: #ffffff;
      border: none;
      &.btn-prev {
        left: 0px;
      }
      &.btn-next {
        right: 0px;
      }
      &:hover {
        font-size: 2.5rem;
      }
    }
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
