import Management from '~/layouts/admin/Management';
import { DashboardComponent } from '~/layouts/admin/managementComponents';

function Dashboard() {
    return (
        <Management menuId={1}>
            <DashboardComponent />
        </Management>
    );
}

export default Dashboard;
