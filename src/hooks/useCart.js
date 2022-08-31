import { products } from '~/api/product';
import { useStore } from '~/hooks';

function useCart() {
    const [state] = useStore();
    const newProducts = products;
    const { carts } = state;
    const productToCarts = [];
    carts.forEach((item) => {
        const productItem = newProducts.find((product) => product.id === +item.productId);
        const result = {
            ...productItem,
            ...item,
        };
        productToCarts.push(result);
    });
    return productToCarts;
}

export default useCart;
