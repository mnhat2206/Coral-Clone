import Management from '~/layouts/admin/Management';
import ProductForm from '~/layouts/components/ProductForm';

function ProductFormPage() {
    return (
        <Management menuId={3}>
            <ProductForm />
        </Management>
    );
}

export default ProductFormPage;
