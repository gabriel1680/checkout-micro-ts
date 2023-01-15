import { createApp } from "vue";

import App from "./App.vue";
import { CheckoutGatewayHttp } from "./infra/gateway/CheckoutGatewayHttp";
import { AxiosAdapter } from "./infra/http/AxiosAdapter";
import { CheckoutGatewayInMemory } from "./infra/gateway/CheckoutGatwayInMemory";

const app = createApp(App);
// const httpClient = new AxiosAdapter();
// const baseUrl = "http://localhost:3000";
// const checkoutGateway = new CheckoutGatewayHttp(httpClient, baseUrl);
const checkoutGateway = new CheckoutGatewayInMemory();
app.provide("CheckoutGateway", checkoutGateway);
app.mount("#app");
