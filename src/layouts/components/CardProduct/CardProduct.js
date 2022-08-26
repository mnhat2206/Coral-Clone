import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './CardProduct.module.scss';
import { SearchIcon, Favorite, Shopping } from '~/components/Icons';

const cx = classNames.bind(styles);

function CardProduct({
    notMarginLeft = false,
    notMarginTop = false,
    id,
    srcImg,
    title,
    category,
    price,
    discount,
    label,
}) {
    return (
        <div className={cx('wrapper', notMarginLeft && 'not-margin-left', notMarginTop && 'not-margin-top')}>
            <Link to={`/${id}`}>
                {label && (
                    <div className={cx('label-product', label)}>
                        <span>{label}</span>
                    </div>
                )}
                <div className={cx('header')}>
                    <img className={cx('img')} src={srcImg} alt="" />
                    <div className={cx('action')}>
                        <div className={cx('left-action')}>
                            <div className={cx('icon-action')}>
                                <Favorite />
                            </div>
                            <div className={cx('icon-action')}>
                                <SearchIcon width={20} height={20} color="#fff" />
                            </div>
                        </div>
                        <div className={cx('right-action')}>
                            <Shopping color="#fff" />
                            <span className={cx('shop-now')}>Shop Now</span>
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <span className={cx('title')}>{title}</span>
                    <div className={cx('text-footer')}>
                        <span className={cx('name')}>{category}</span>
                        <span className={cx('price', discount && 'cross')}>{price}</span>
                        {discount && <span className={cx('price', 'discount')}>{discount}</span>}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CardProduct;
