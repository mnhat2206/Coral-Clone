import classNames from 'classnames/bind';

import styles from './Field.module.scss';

const cx = classNames.bind(styles);

function Field({
    name = 'Name',
    inputName = '',
    type = 'text',
    className,
    value = '',
    handleChange,
    handleFocus,
    readOnly = false,
    messageError = '',
}) {
    return (
        <div>
            <label className={cx('input-group', className)}>
                <span className={cx('label-name')}>{name}</span>
                <input
                    name={inputName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className={cx('input', messageError && 'error-input')}
                    type={type}
                    value={value}
                    readOnly={readOnly}
                />
            </label>
            {messageError && <span className={cx('error-message')}>{messageError}</span>}
        </div>
    );
}

export default Field;
