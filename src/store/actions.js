import {
    ADD_TO_CART,
    UPDATE_TO_CART,
    SAVE_PRODUCT_TO_CART,
    DELETE_PRODUCT_TO_CART,
    PROCEED_TO_CHECKOUT,
} from './contants';

function add_to_cart(payload = {}) {
    return {
        type: ADD_TO_CART,
        payload,
    };
}

function update_to_cart(payload = {}) {
    return {
        type: UPDATE_TO_CART,
        payload,
    };
}

function save_product_to_cart(payload) {
    return {
        type: SAVE_PRODUCT_TO_CART,
        payload,
    };
}

function delete_product_to_cart(payload) {
    return {
        type: DELETE_PRODUCT_TO_CART,
        payload,
    };
}

function proceed_to_checkout() {
    return {
        type: PROCEED_TO_CHECKOUT,
        payload: '',
    };
}

export { add_to_cart, update_to_cart, save_product_to_cart, delete_product_to_cart, proceed_to_checkout };
