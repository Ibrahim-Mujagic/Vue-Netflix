<script>
import { store } from "../data/store";

export default {
  name: "CardMovieSeries",
  props: {
    title: String,
    type: String,
  },
  data() {
    return {
      store,
      apiFlagsToRemove: ["it", "en", "us"],
      sendType: this.type,
    };
  },
};
</script>

<template>
  <router-link
    v-for="(item, index) in store[type]"
    :key="item.id"
    class="card"
    :to="{ name: 'Detail', params: { id: item.id } }"
    @click="$emit('showMyDetail')"
  >
    <div class="cont-image">
      <img
        v-if="item.poster_path"
        :src="'https://image.tmdb.org/t/p/w342' + item.poster_path"
        :alt="item.title"
      />
      <img
        v-else
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
        alt=""
      />
    </div>
    <div class="card-body">
      <div class="cont-title">
        <h3 class="title">
          {{ item.title || item.name }}
        </h3>
      </div>
      <div class="detail-card">
        <p class="original-title">
          Original Title:
          {{ item.original_title || item.original_name }}
        </p>
        <p class="lang">
          Lang:
          {{
            !apiFlagsToRemove.includes(item.original_language)
              ? item.original_language
              : ""
          }}
          <span
            :class="{
              ' fi': true,
              'fi-it': item.original_language === 'it',
              'fi-gb': item.original_language === 'en',
              'fi-us': item.original_language === 'us',
            }"
          ></span>
        </p>
        <div class="vote">
          Vote:
          <i
            v-for="(star, index) in 5"
            :key="index"
            class="fa-star"
            :class="index < Math.ceil(item.vote_average / 2) ? 'fas' : 'far'"
          ></i>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "../style/vars" as *;
h2 {
  display: block;
}
.card {
  height: 360px;
  width: calc(100% / 5 - 50px);
  min-width: 220px;
  max-width: 250px;
  position: relative;
  box-shadow: 0px 0px 6px #ffffff;
  cursor: pointer;
  border-radius: 2px;
  color: #ffffff;
  .cont-image {
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 2px;
    }
  }

  &:hover .card-body {
    height: 50%;
  }

  .card-body {
    width: 100%;
    height: 0px;
    max-height: 50%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.687);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    border-end-start-radius: 2px;
    border-end-end-radius: 2px;
    transition: all 1s ease-in-out;

    .title,
    .detail-card {
      font-size: 0.9rem;
      margin: 6px;
    }
  }
}
@media screen and (max-width: 720px) {
  .card {
    min-width: 190px;
  }
}
</style>
