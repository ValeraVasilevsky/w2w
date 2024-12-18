import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { router } from "./router";

import App from "./app.vue";

import "unfonts.css";
import "./style.css";
import "shared/ui/theme/variables.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(router);
app.mount("#app");
