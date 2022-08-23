import ProductTemplate from '~/layouts/components/ProductTemplate';
import { products } from '~/api/product';

function BestSellers() {
    const bestSellers = products.filter((product) => {
        return product.isBestSeller === true;
    });
    let highesToLowestProductSeller = bestSellers.sort((a, b) => {
        return b.numberSeller - a.numberSeller;
    });

    return <ProductTemplate btnShowAll={true} titleName="Best Seller" products={highesToLowestProductSeller} />;
}

export default BestSellers;
