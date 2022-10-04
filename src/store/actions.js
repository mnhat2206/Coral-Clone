import {
    ADD_TO_CART,
    UPDATE_TO_CART,
    SAVE_PRODUCT_TO_CART,
    DELETE_PRODUCT_TO_CART,
    PROCEED_TO_CHECKOUT,
    USER_LOGIN,
    USER_LOGOUT,
    PARAM_PRODUCT_ID,
    PARAM_CATEGORY_ID,
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

function proceed_to_checkout(payload) {
    return {
        type: PROCEED_TO_CHECKOUT,
        payload,
    };
}

function user_login(payload) {
    return {
        type: USER_LOGIN,
        payload: payload,
    };
}

function user_logout() {
    return {
        type: USER_LOGOUT,
        payload: '',
    };
}

function param_product_id(payload) {
    return {
        type: PARAM_PRODUCT_ID,
        payload,
    };
}

function param_category_id(payload) {
    return {
        type: PARAM_CATEGORY_ID,
        payload,
    };
}

export {
    add_to_cart,
    update_to_cart,
    save_product_to_cart,
    delete_product_to_cart,
    proceed_to_checkout,
    user_login,
    user_logout,
    param_product_id,
    param_category_id,
};
