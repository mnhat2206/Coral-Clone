import { useCallback, useLayoutEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductTemplate.module.scss';
import NavbarProduct from '~/layouts/components/NavbarProduct';
import CardProduct from '~/layouts/components/CardProduct';

const cx = classNames.bind(styles);

function ProductTemplate({ isNotMarginTop = false, btnShowAll = false, titleName, products = [] }) {
    const [listProduct, setListProduct] = useState([]);

    useLayoutEffect(() => {
        setListProduct(products);
    }, [products]);

    const handleClickNavbar = useCallback(
        (styId) => {
            if (styId !== 0) {
                const result = products.filter((product) => product.styId === styId);
                setListProduct(result);
            } else {
                setListProduct(products);
            }
            return styId;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [products],
    );

    let numberItem = 0;

    return (
        <div className={cx('wrapper', isNotMarginTop && 'not-margin-top')}>
            <h3 className={cx('title')}>{titleName}</h3>
            <NavbarProduct btnShowAll={btnShowAll} onClickNavbar={handleClickNavbar} />
            <div className={cx('product-container')}>
                {listProduct.map((product, index) => {
                    let notMarginLeft = false;
                    let notMarginTop = false;

                    // set row one margin-top = 0 because function component NavbarPoduct had margin-bottom
                    if (index >= 0 && index < 4) {
                        notMarginTop = true;
                    } else {
                        notMarginTop = false;
                    }

                    // set first product every row margin-left = 0
                    if (index === numberItem) {
                        numberItem += 4;
                        notMarginLeft = true;
                    } else {
                        notMarginLeft = false;
                    }

                    return (
                        <CardProduct
                            notMarginLeft={notMarginLeft}
                            notMarginTop={notMarginTop}
                            id={product.id}
                            key={product.id}
                            srcImg={product.srcImage}
                            title={product.title}
                            category={product.categoryName}
                            price={product.price}
                            discount={product.discount}
                            label={product.label}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProductTemplate;
