import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ExploreStyles.module.scss';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ExploreStyles() {
    const [styleFashion, setStylesFashion] = useState([]);
    const [loading, setLoading] = useState('ide');
    const classIndex = [0, 1, 2, 3, 4];

    const [, dispatch] = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading('loading');
        fetch('https://coral-server.onrender.com/api/categories/main?_sort=updateAt&_order=desc')
            .then((res) => res.json())
            .then((data) => {
                setLoading('ide');
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
                {loading === 'loading'
                    ? classIndex.map((item) => (
                          <div key={item} className={cx('item', `item-${item + 1}`)}>
                              <Skeleton
                                  style={{
                                      width: '100%',
                                      height: '100%',
                                  }}
                              />
                          </div>
                      ))
                    : styleFashion.map((item, index) => (
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
                              {index + 1 === 1 && (
                                  <div className={cx('wrapper-text')}>
                                      {loading === 'ide' && (
                                          <span className={cx('text')}>{'Explore new and popular styles'}</span>
                                      )}
                                  </div>
                              )}
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default ExploreStyles;
