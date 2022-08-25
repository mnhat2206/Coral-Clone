import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-controller')}>
                <button className={cx('page-btn', 'page-btn-left')}>Previous</button>
                <button className={cx('page-btn', 'active')}>1</button>
                <button className={cx('page-btn')}>2</button>
                <button className={cx('page-btn')}>3</button>
                <button className={cx('page-btn')}>4</button>
                <button className={cx('page-btn')}>5</button>
                <button className={cx('page-btn')}>...</button>
                <button className={cx('page-btn', 'page-btn-right')}>Next</button>
            </div>
        </div>
    );
}

export default Pagination;
