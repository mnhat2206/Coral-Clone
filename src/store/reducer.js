import {
    ADD_TO_CART,
    UPDATE_TO_CART,
    SAVE_PRODUCT_TO_CART,
    DELETE_PRODUCT_TO_CART,
    PROCEED_TO_CHECKOUT,
} from './contants';

const CART_KEY = 'CART';

const configLocal = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];

export const initState = {
    carts: configLocal(),
};

function reducer(state, action) {
    let newCarts = state.carts;

    switch (action.type) {
        case ADD_TO_CART:
            const data = action.payload;

            const checkData = newCarts.find((item) => +item.productId === +data.productId);

            if (checkData) {
                const indexProductCart = newCarts.indexOf(checkData);
                newCarts[indexProductCart] = data;
            } else {
                newCarts.push(data);
            }

            localStorage.setItem(CART_KEY, JSON.stringify(newCarts));

            return {
                ...state,
                carts: configLocal(),
            };

        case UPDATE_TO_CART:
            const dispatchUpdateData = action.payload;

            const findUpdateData = newCarts.find((item) => +item.productId === +dispatchUpdateData.productId);

            const indexOfData = newCarts.indexOf(findUpdateData);
            newCarts[indexOfData] = {
                ...findUpdateData,
                ...dispatchUpdateData,
            };

            localStorage.setItem(CART_KEY, JSON.stringify(newCarts));

            return {
                ...state,
                carts: configLocal(),
            };

        case SAVE_PRODUCT_TO_CART:
            const id = action.payload;
            const foundIndex = newCarts.findIndex((product) => +product.productId === +id);
            newCarts[foundIndex].isConfirm = !newCarts[foundIndex].isConfirm;
            localStorage.setItem(CART_KEY, JSON.stringify(newCarts));
            return {
                ...state,
                carts: configLocal(),
            };
        case DELETE_PRODUCT_TO_CART:
            const idProduct = action.payload;
            const foundIndexProduct = newCarts.findIndex((product) => +product.productId === +idProduct);
            newCarts.splice(foundIndexProduct, 1);
            localStorage.setItem(CART_KEY, JSON.stringify(newCarts));
            return {
                ...state,
                carts: configLocal(),
            };
        case PROCEED_TO_CHECKOUT:
            const pushId = [];
            const productConfirm = action.payload;
            productConfirm.forEach((item) => {
                pushId.push(+item.productId);
            });
            if (pushId.length > 0) {
                const productRemaining = newCarts.filter((item) => item.isConfirm === false);
                localStorage.setItem(CART_KEY, JSON.stringify(productRemaining));
                console.log('[RESPONSE]', JSON.stringify(pushId));
            }
            return {
                ...state,
                carts: configLocal(),
            };

        default:
            return state;
    }
}

export default reducer;
