import classNames from 'classnames/bind';

import styles from './ProductTemplate.module.scss';
import NavbarProduct from '~/layouts/components/NavbarProduct';
import CardProduct from '~/layouts/components/CardProduct';

const cx = classNames.bind(styles);

function NewProduct({ btnShowAll = false, titleName, products = [] }) {
    let numberItem = 0;
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{titleName}</h3>
            <NavbarProduct btnShowAll={btnShowAll} />
            <div className={cx('product-container')}>
                {products.map((product, index) => {
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
                            key={product.id}
                            srcImg={product.srcImage}
                            title={product.title}
                            category={product.categoryName}
                            price={product.price}
                            label={product.label}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default NewProduct;
