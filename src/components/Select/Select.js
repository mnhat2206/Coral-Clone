import classNames from 'classnames/bind';
import Select from 'react-select';

import styles from './Select.module.scss';

const cx = classNames.bind(styles);

function Field({ notName = false, name = 'Name', options = [], defaultValue = {}, handleSelectChange }) {
    const style = {
        control: (base) => ({
            ...base,
            border: 0,
            backgroundColor: 'transparent',
            // This line disable the blue border
            boxShadow: 'none',
        }),
    };
    return (
        <label className={cx('input-group')}>
            {!notName && <span className={cx('label-name')}>{name}</span>}
            <Select
                className={cx('select')}
                styles={style}
                name="Category"
                value={
                    Object.keys(defaultValue).length > 0 && {
                        value: defaultValue.id,
                        label: defaultValue.name,
                    }
                }
                onChange={handleSelectChange}
                options={options}
            />
        </label>
    );
}

export default Field;
