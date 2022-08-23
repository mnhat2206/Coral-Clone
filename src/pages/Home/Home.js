import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Header from '~/layouts/Header';
import Featured from '~/layouts/Featured';
import Brand from '~/layouts/Brand';
import ExploreStyles from '~/layouts/ExploreStyles';
import NewProduct from '~/layouts/NewProduct';
import Banner from '~/layouts/Banner';
import BestSellers from '~/layouts/BestSellers';
import FollowOnInstagram from '~/layouts/FollowOnInstagram';
import Footer from '~/layouts/Footer';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-main')}>
                <Header />
                <Featured />
            </div>
            <Brand />
            <ExploreStyles />
            <NewProduct />
            <Banner />
            <BestSellers />
            <FollowOnInstagram />
            <Footer />
        </div>
    );
}

export default Home;
