import Management from '~/layouts/admin/Management';
import CategoryForm from '~/layouts/components/CategoryForm';

function CategoryFormPage() {
    return (
        <Management menuId={4}>
            <CategoryForm />
        </Management>
    );
}

export default CategoryFormPage;
