import classNames from 'classnames/bind';

import styles from './ContainerAdmin.module.scss';

const cx = classNames.bind(styles);

function ContainerAdmin({ fullWidth = false, children }) {
    return <div className={cx('container', fullWidth && 'full-width')}>{children}</div>;
}

export default ContainerAdmin;
