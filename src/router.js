import { createRouter, createWebHashHistory } from "vue-router";
import CardMovieSeries from "./components/CardMovieSeries.vue";
import DetailMovieSeries from "./components/DetailMovieSeries.vue";
import Error404 from "./components/Error404.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: CardMovieSeries,
    },
    {
      path: "/detail/:id",
      name: "Detail",
      component: DetailMovieSeries,
    },
    {
      path: "/:pathMatch(.*)*",
      component: Error404,
    },
  ],
});

export { router };
