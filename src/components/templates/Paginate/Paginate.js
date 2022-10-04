import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

const cx = classNames.bind(styles);

function Paginate({ pageCount, forcePage, handleChangePage, containerClassNameCustom }) {
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            forcePage={pageCount > 0 ? forcePage : -1}
            onPageChange={handleChangePage}
            pageLinkClassName={cx('page-link')}
            activeClassName={cx('page-active')}
            disabledClassName={cx('page-disable')}
            containerClassName={cx('page-controller', containerClassNameCustom)}
            previousClassName={cx('page-btn', 'page-btn-margin')}
            previousLinkClassName={cx('page-link')}
            nextClassName={cx('page-btn', 'page-btn-margin')}
            nextLinkClassName={cx('page-link')}
            pageClassName={cx('page-btn')}
        />
    );
}

export default Paginate;
