import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ExploreStyles.module.scss';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ExploreStyles() {
    const [styleFashion, setStylesFashion] = useState([]);

    const [, dispatch] = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://coral-server.onrender.com/api/categories/main?_sort=updateAt&_order=desc')
            .then((res) => res.json())
            .then((data) => {
                setStylesFashion(data);
            });
    }, []);

    const handleClick = (categoryId, categoryName) => {
        dispatch(actions.param_category_id(categoryId));
        navigate(`/category/${categoryName}`, { replace: true });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {styleFashion.map((item, index) => (
                    <div
                        onClick={() => handleClick(item.categoryParentId, item.categoryParentName.name)}
                        id={item.id}
                        key={item.id}
                        className={cx('item', `item-${index + 1}`)}
                    >
                        <img className={cx('img')} src={item.thumbnailUrl} alt="" />
                        <div className={cx('style-intro')}>
                            <span>{item.name}</span>
                            <span>{`${item.productsTotal} Product`}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('wrapper-text')}>
                <span className={cx('text')}>Explore new and popular styles</span>
            </div>
        </div>
    );
}

export default ExploreStyles;
