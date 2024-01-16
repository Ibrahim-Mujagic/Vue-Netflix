<script>
export default {
  name: "CardMovieSeries",
  props: {
    entertainmentData: Object,
  },
  methods: {},
};
</script>

<template>
  <div class="card">
    <div class="cont-image">
      <img
        :src="'https://image.tmdb.org/t/p/w342' + entertainmentData.poster_path"
        :alt="entertainmentData.title"
      />
    </div>
    <div class="card-body">
      <div class="cont-title">
        <h3 class="title">{{ entertainmentData.title }}</h3>
      </div>
      <div class="detail-card">
        <p class="original-title">
          Original Title: {{ entertainmentData.original_title }}
        </p>
        <p class="lang">Lang: {{ entertainmentData.original_language }}</p>
        <p class="vote">Vote: {{ entertainmentData.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/vars" as *;
.card {
  height: 360px;
  width: calc(100% / 5 - 50px);
  position: relative;
  box-shadow: 0px 0px 6px #ffffff;
  cursor: pointer;
  border-radius: 2px;
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
    height: 55%;
    padding-bottom: 10px;
  }

  &:hover .card-body .cont-title {
    margin-bottom: 5%;
  }

  .card-body {
    width: 100%;
    height: 75px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.687);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    border-end-start-radius: 2px;
    border-end-end-radius: 2px;
    padding: 10px 7px;
    transition: all 1s ease-in-out;

    .cont-title {
      transition: margin 1s ease-in-out;
      height: 40%;
      width: 100%;
      margin-bottom: 25%;

      .title {
        font-size: 0.9rem;
      }
    }

    .detail-card {
      width: 100%;
      font-size: 0.9rem;
    }
  }
}
</style>
