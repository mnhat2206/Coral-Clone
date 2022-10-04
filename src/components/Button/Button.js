import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ btnName = 'name', className, handleClick }) {
    return (
        <button onClick={handleClick} className={cx('btn', className)}>
            {btnName}
        </button>
    );
}

export default Button;
