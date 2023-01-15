import { mount } from "@vue/test-utils";

import AppVue from "../src/App.vue";
import { CheckoutGatewayInMemory } from "../src/infra/gateway/CheckoutGatwayInMemory";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("should be able to test empty screen", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    expect(wrapper.get(".title").text()).toBe("Checkout");
    expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
    expect(wrapper.findAll(".product-price").at(0)?.text()).toBe(
        "R$\u00a01.000,00"
    );
    expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
    expect(wrapper.findAll(".product-price").at(1)?.text()).toBe(
        "R$\u00a05.000,00"
    );
    expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
    expect(wrapper.findAll(".product-price").at(2)?.text()).toBe(
        "R$\u00a0300,00"
    );
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a00,00");
});

test("should be able to add items to order and calculate total App", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a01.000,00");
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a02.000,00");
    await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a07.000,00");
    await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a07.300,00");
    await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a07.600,00");
});

test("should be able to add items and display the items quantity App", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
    await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
    await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
    expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
    expect(wrapper.findAll(".item-description").at(1)?.text()).toBe("B");
    expect(wrapper.findAll(".item-description").at(2)?.text()).toBe("C");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("2");
    expect(wrapper.findAll(".item-quantity").at(1)?.text()).toBe("1");
    expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("2");
});

test("should be able to remove item from order", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a01.000,00");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
    await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
    await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a03.000,00");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("3");
});

test("should be able to have some items and decrease item quantity until its 0 and remove it", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
    await wrapper.findAll(".item-decrease-button").at(0)?.trigger("click");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBeUndefined();
    expect(wrapper.get(".total").text()).toBe("Total: R$\u00a00,00");
});

test("should be able to checkout order with items", async () => {
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                CheckoutGateway: new CheckoutGatewayInMemory(),
            },
        },
    });
    await sleep(0);
    await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
    await wrapper.get(".confirm").trigger("click");
    expect(wrapper.get(".message").text()).toBe("success");
    expect(wrapper.get(".order-code").text()).toBe("2023000001");
});
