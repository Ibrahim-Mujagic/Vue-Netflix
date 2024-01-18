import { reactive } from "vue";

export const store = reactive({
  getImg(imgName) {
    return new URL(`../assets/${imgName}`, import.meta.url).href;
  },
  api_key: "5fc220838d9270d7e1ac848b48ca70d1",
  apiUrl: "https://api.themoviedb.org/3/search/",
  userItemToSearch: "",
  type: "",
  movie: [],
  tv: [],
  counterImage: 0,
});
