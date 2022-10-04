import Management from '~/layouts/admin/Management';
import ProfileForm from '~/layouts/components/ProfileForm';

function ProfileAdmin() {
    return (
        <Management menuId={6}>
            <ProfileForm />
        </Management>
    );
}

export default ProfileAdmin;
