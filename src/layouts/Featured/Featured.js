import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './Featured.module.scss';
import featuredImg from '~/asset/img/featured-img.png';
import { Shopping } from '~/components/Icons';
import { useStore } from '~/hooks';
import { param_category_id } from '~/store/actions';

const cx = classNames.bind(styles);

function Featured() {
    const [, dispatch] = useStore();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/category/Clothing%20%26%20Shoes');
        dispatch(param_category_id('502d2262-0335-4050-9fb3-2246d8eddc37'));
    };

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
                        <span onClick={handleClick} className={cx('text-button')}>
                            Shop Now
                        </span>
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
