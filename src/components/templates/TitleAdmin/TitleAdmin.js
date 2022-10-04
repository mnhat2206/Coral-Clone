import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './TitleAdmin.module.scss';

const cx = classNames.bind(styles);

function TitleAdmin({ title, btnName, btnIcon, hasBtn = true, linkTo = '/' }) {
    return (
        <div className={cx('header-container')}>
            <h3 className={cx('menu-name')}>{title}</h3>
            {hasBtn && (
                <Link to={linkTo} className={cx('btn-add')}>
                    {<p>{btnName}</p>}
                    <span>{btnIcon}</span>
                </Link>
            )}
        </div>
    );
}

export default TitleAdmin;
