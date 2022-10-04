import ProfileForm from '~/layouts/components/ProfileForm';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';

function ProfileFormPage() {
    return (
        <>
            <Header />
            <div
                style={{
                    maxWidth: 'var(--max-width-main)',
                    margin: '0 auto',
                }}
            >
                <ProfileForm />
            </div>
            <Footer />
        </>
    );
}

export default ProfileFormPage;
