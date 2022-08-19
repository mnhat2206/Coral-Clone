import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Header from '~/layouts/Header';
import Featured from '~/layouts/Featured';
import Brand from '~/layouts/Brand';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-main')}>
                <Header />
                <Featured />
            </div>
            <Brand />
        </div>
    );
}

export default Home;
