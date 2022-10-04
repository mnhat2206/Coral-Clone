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

const CART_KEY = 'CART';
const USER_SESSION_KEY = 'USER';
const CATEGORY_PARENT_ID = 'CATEGORY';

const configLocal = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];
const userSession = () => JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)) || {};
const categoryLocal = () => JSON.parse(localStorage.getItem(CATEGORY_PARENT_ID)) || {};

export const initState = {
    carts: configLocal(),
    user: userSession(),
    params: {
        categoryId: categoryLocal(),
    },
};

function reducer(state, action) {
    let newCarts = state.carts;

    switch (action.type) {
        case ADD_TO_CART:
            const data = action.payload;

            const checkData = newCarts.find((item) => item.productId === data.productId);

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

            const findUpdateData = newCarts.find((item) => item.productId === dispatchUpdateData.productId);

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
            const foundIndex = newCarts.findIndex((product) => product.productId === id);
            newCarts[foundIndex].isConfirm = !newCarts[foundIndex].isConfirm;
            localStorage.setItem(CART_KEY, JSON.stringify(newCarts));
            return {
                ...state,
                carts: configLocal(),
            };
        case DELETE_PRODUCT_TO_CART:
            const idProduct = action.payload;
            const foundIndexProduct = newCarts.findIndex((product) => product.productId === idProduct);
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
                pushId.push(item.productId);
            });
            if (pushId.length > 0) {
                const productRemaining = newCarts.filter((item) => item.isConfirm === false);
                localStorage.setItem(CART_KEY, JSON.stringify(productRemaining));
            }
            return {
                ...state,
                carts: configLocal(),
            };

        // AUTHENTICATE
        case USER_LOGIN:
            sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(action.payload));
            return {
                ...state,
                user: userSession(),
            };

        case USER_LOGOUT: {
            sessionStorage.removeItem(USER_SESSION_KEY);
            return {
                ...state,
                user: {},
            };
        }

        // PARAM
        case PARAM_PRODUCT_ID: {
            return {
                ...state,
                params: {
                    ...state.params,
                    productId: action.payload,
                },
            };
        }

        case PARAM_CATEGORY_ID: {
            localStorage.setItem(CATEGORY_PARENT_ID, JSON.stringify(action.payload));
            return {
                ...state,
                params: {
                    ...state.params,
                    categoryId: categoryLocal(),
                },
            };
        }

        default:
            return state;
    }
}

export default reducer;
