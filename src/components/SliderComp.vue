<script>
import { store } from "../data/store";
export default {
  name: "SliderComp",
  props: {
    imageData: Object,
    counterIndex: Number,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <div
    :class="{
      'cont-image': true,
      'd-none': store.counterImage !== counterIndex,
    }"
  >
    <img
      :src="'https://image.tmdb.org/t/p/original/' + imageData.backdrop_path"
      :alt="imageData.title"
    />
    <div class="movie-text">
      <h2>{{ imageData.title }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/vars" as *;
.cont-image {
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px $main-red;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    object-position: center;
    opacity: 0.8;
    filter: contrast(90%);
  }
  .movie-text {
    position: absolute;
    top: 74%;
    background-color: $main-black;
    opacity: 0.8;
    box-shadow: 0px 0px 10px $main-black;
    width: 100%;
  }
}
.d-none {
  display: none;
}
</style>
