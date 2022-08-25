import { memo, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './NavbarProduct.module.scss';
import { Filter } from '~/components/Icons';
import { styList } from '~/api/styList';

const cx = classNames.bind(styles);

function NavbarProduct({ btnShowAll = false, onClickNavbar }) {
    const [active, setActive] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('category')}>
                {styList.map((sty) => {
                    return (
                        <li
                            onClick={() => {
                                const id = onClickNavbar(sty.id);
                                setActive(id);
                            }}
                            id={sty.id}
                            key={sty.id}
                            className={cx('category-item', active === sty.id && 'active')}
                        >
                            {sty.styleName}
                        </li>
                    );
                })}
            </ul>
            {!btnShowAll && (
                <div className={cx('btn-container', 'active-filter')}>
                    <div className={cx('icon-btn')}>
                        <Filter />
                    </div>
                    <span className={cx('btn-text')}>Filter</span>

                    <div className={cx('filter')}>
                        <div className={cx('filter-item')}>
                            <h4 className={cx('title')}>Category</h4>
                            <ul className={cx('list-check')}>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>All Category</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Men</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Women</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Couple</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('filter-item')}>
                            <h4 className={cx('title')}>Size</h4>
                            <ul className={cx('list-check')}>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>XS</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>S</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>M</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>L</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('filter-item')}>
                            <h4 className={cx('title')}>Color</h4>
                            <ul className={cx('list-check')}>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>White</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Black</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Blue</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                                <li className={cx('checkbox-group')}>
                                    <label className={cx('checkbox-container')}>
                                        <span className={cx('checkbox-text')}>Gray</span>
                                        <input type="checkbox" hidden />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {btnShowAll && (
                <button className={cx('btn-container')}>
                    <span className={cx('btn-text', 'btn-show-all')}>Show All</span>
                </button>
            )}
        </div>
    );
}

export default memo(NavbarProduct);
