import ProductTemplate from '~/layouts/components/ProductTemplate';
import { products } from '~/api/product';

function NewProduct() {
    const newProducts = products.filter((product) => {
        return product.isNew === true;
    });
    return <ProductTemplate titleName="New Product" products={newProducts} />;
}

export default NewProduct;
