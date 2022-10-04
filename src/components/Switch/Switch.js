import classNames from 'classnames/bind';

import styles from './Switch.module.scss';

const cx = classNames.bind(styles);

function Switch({ name = 'Name', value = false, handleChange }) {
    return (
        <div className={cx('input-group')}>
            <span className={cx('label-name')}>{name}</span>
            <label className={cx('switch')}>
                <input
                    type="checkbox"
                    className={cx('input-checkbox')}
                    value={value}
                    onChange={handleChange}
                    checked={value}
                />
                <span className={cx('slider', 'round')}></span>
            </label>
        </div>
    );
}

export default Switch;
