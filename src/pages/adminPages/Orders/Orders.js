import Management from '~/layouts/admin/Management';
import { Table } from '~/components/templates';

function Orders() {
    return (
        <Management menuId={5}>
            <Table title={'Orders'} />
        </Management>
    );
}

export default Orders;
