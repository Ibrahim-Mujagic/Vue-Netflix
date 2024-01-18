<script>
export default {
  name: "Error404",
};
</script>
<template>
  <div class="cont-error">
    <h2>ERROR 404</h2>
    <div>
      <router-link @click="$emit('getPopular')" :to="{ name: 'Home' }">
        <i class="fa fa-solid fa-home"></i>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cont-error {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  h2 {
    text-shadow: 0px 0px 2px #ffffff;
  }
  a {
    border: 1px solid #ffffff;
    padding: 5px 20px;
    color: #ffffff;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      text-shadow: 0px 0px 10px #ffffff;
      box-shadow: 0px 0px 10px #ffffff;
    }
  }
}
</style>
