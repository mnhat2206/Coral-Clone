import classNames from 'classnames/bind';

import styles from './Featured.module.scss';
import featuredImg from '~/asset/img/featured-img.png';
import { Shopping } from '~/components/Icons';

const cx = classNames.bind(styles);

function Featured() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('featured-wrapper')}>
                <div className={cx('content')}>
                    <h2 className={cx('title')}>Collections</h2>
                    <h3 className={cx('text')}>
                        you can explore ans shop many differnt collection from various barands here.
                    </h3>
                    <button className={cx('button-shop')}>
                        <Shopping width={30} height={30} color={'#fff'} />
                        <span className={cx('text-button')}>Shop Now</span>
                    </button>
                </div>
                <div className={cx('sample')}>
                    <div className={cx('product-wrapper')}>
                        <img src={featuredImg} alt="" className={cx('img-product')} />
                        <div className={cx('border')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
