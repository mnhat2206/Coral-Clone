import { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';

import styles from './ProductListing.module.scss';
import ProductTemplate from '~/layouts/components/ProductTemplate';
// import Pagination from '~/layouts/components/Pagination';

const cx = classNames.bind(styles);

function ProductListing({ products = [], titleProducts = 'Products', numberProducts = 0 }) {
    const productsPerPage = 12;
    const [pageNumber, setPageNumber] = useState(0);

    const pageVisited = useMemo(() => pageNumber * productsPerPage, [pageNumber]);

    const pageCount = useMemo(() => {
        return Math.ceil(products.length / productsPerPage);
    }, [products]);

    const displayProducts = products.slice(pageVisited, pageVisited + productsPerPage);

    console.log('[displayProducts]', displayProducts);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <div className={cx('text-wrapper')}>
                    <h3 className={cx('title-product')}>{titleProducts}</h3>
                    <span className={cx('number-product')}>{`${numberProducts.toLocaleString('de-DE')} Products`}</span>
                </div>
            </div>
            <ProductTemplate isNotMarginTop={true} products={displayProducts} />

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                pageLinkClassName={cx('page-link')}
                onPageChange={changePage}
                activeClassName={cx('page-active')}
                disabledClassName={cx('page-disable')}
                containerClassName={cx('page-controller')}
                previousClassName={cx('page-btn', 'page-btn-margin')}
                previousLinkClassName={cx('page-link')}
                nextClassName={cx('page-btn', 'page-btn-margin')}
                nextLinkClassName={cx('page-link')}
                pageClassName={cx('page-btn')}
            />
            {/* <Pagination /> */}
        </div>
    );
}

export default ProductListing;
