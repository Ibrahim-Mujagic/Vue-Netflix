<script>
import { store } from "../data/store";
export default {
  name: "DetailMovieSeries",
  data() {
    return {
      store,
      movieTvDetailData: [],
    };
  },
  methods: {
    getDetailData() {
      const itemId = this.$route.params.id;
      const movieDetail = store.movie.find(
        (item) => item.id === Number(itemId)
      );

      if (movieDetail) {
        this.movieTvDetailData = movieDetail;
        return;
      }

      const tvDetail = store.tv.find((item) => item.id === Number(itemId));
      if (tvDetail) {
        this.movieTvDetailData = tvDetail;
      }
    },
  },
  mounted() {
    this.getDetailData();
  },
};
</script>

<template>
  <div class="cont-detail-card">
    <div class="detail-card">
      <div class="card-header">
        <h2>{{ movieTvDetailData.title || movieTvDetailData.name }}</h2>
      </div>
      <div
        class="card-body"
        :style="{
          backgroundImage: `url(
            https://image.tmdb.org/t/p/original/${movieTvDetailData.backdrop_path}
          )`,
        }"
      >
        <div class="original-title">
          <h3>Original title</h3>
          <p>
            {{
              movieTvDetailData.original_title ||
              movieTvDetailData.original_name
            }}
          </p>
        </div>
        <div class="description">
          <h3>Description</h3>
          <p>
            {{ movieTvDetailData.overview }}
          </p>
        </div>
        <div class="vote">
          <h3>Vote</h3>
          <span
            ><i
              v-for="(star, index) in 5"
              :key="index"
              class="fa-star"
              :class="
                index < Math.ceil(movieTvDetailData.vote_average / 2)
                  ? 'fas'
                  : 'far'
              "
            ></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../style/vars" as *;
.cont-detail-card {
  width: 100%;
  height: calc(100vh - 65px);
  display: flex;
  justify-content: center;
  align-items: center;
  .detail-card {
    min-height: 450px;
    width: 60%;
    border: 1px solid $main-red;
    box-shadow: 0px 0px 13px $main-red;
    background-color: rgba(47, 46, 46, 0.512);
    border-radius: 3px;
    .card-header {
      min-height: 65px;
      border-bottom: 1px solid $main-red;
      box-shadow: 0px 0px 10px $main-red;
      text-align: center;
      line-height: 65px;
      color: #ffffff;
      h2 {
        text-shadow: 0px 0px 2px #fff;
      }
    }
  }
  .card-body {
    width: 100%;
    min-height: calc(450px - 65px);
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
    background-size: cover;
    h3,
    p,
    i {
      text-shadow: 0px 0px 10px $main-black;
    }
    .original-title,
    .vote,
    .description {
      width: 65%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 992px) {
  .cont-detail-card {
    min-height: calc(450px - 160px);
    align-items: flex-start;
    padding-top: 20px;

    .detail-card {
      width: 80%;
    }
    .card-body {
      align-items: center;
      background-position: center;
      max-height: 450px;
      overflow-y: scroll;
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }
      .description {
        p {
          margin: 10px auto;
          overflow: hidden;
          width: 90%;
        }
      }
    }
  }
}
@media screen and (max-width: 720px) {
  .cont-detail-card {
    .detail-card {
      width: 90%;
    }
    .card-body {
      padding: 5px;
      .description {
        p {
          width: 100%;
        }
      }
    }
  }
}
</style>
