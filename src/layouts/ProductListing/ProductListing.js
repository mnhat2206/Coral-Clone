import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductListing.module.scss';
import { Paginate } from '~/components/templates';
import ProductTemplate from '~/layouts/components/ProductTemplate';
// import Pagination from '~/layouts/components/Pagination';

const cx = classNames.bind(styles);

function ProductListing({ categoriesChild, products = [], titleProducts = 'Products', numberProducts = 0 }) {
    const productsPerPage = 12;
    const [pageNumber, setPageNumber] = useState(0);
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        setCategoryProducts(products);
    }, [products]);

    const pageVisited = pageNumber * productsPerPage;

    const pageCount = Math.ceil(categoryProducts.length / productsPerPage);
    const displayProducts = categoryProducts.slice(pageVisited, pageVisited + productsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleClickNavbar = (id) => {
        if (id !== 0) {
            const result = products.filter((product) => product.categoryId === id);
            setCategoryProducts(result);
        } else {
            setCategoryProducts(products);
        }
        setPageNumber(0);
        return id;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <div className={cx('text-wrapper')}>
                    <h3 className={cx('title-product')}>{titleProducts}</h3>
                    <span className={cx('number-product')}>{`${numberProducts.toLocaleString('de-DE')} Products`}</span>
                </div>
            </div>
            <ProductTemplate
                isNotMarginTop={true}
                products={displayProducts}
                categoriesChild={categoriesChild}
                handleClickNavbar={handleClickNavbar}
            />

            <Paginate pageCount={pageCount} forcePage={pageNumber} handleChangePage={changePage} />

            {/* <Pagination /> */}
        </div>
    );
}

export default ProductListing;
