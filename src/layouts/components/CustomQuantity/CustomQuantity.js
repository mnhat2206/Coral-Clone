import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './CustomQuantity.module.scss';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function CustomQuantity({ productId, initValue }) {
    const [quantity, setQuantity] = useState(initValue);

    const [, dispatch] = useStore();

    const handleChange = (e) => {
        let value = e.currentTarget.value;
        if (value < 1) value = 1;
        dispatch(
            actions.update_to_cart({
                productId,
                quantity: value,
            }),
        );
        setQuantity(value);
    };

    const handleCalc = (calc) => {
        let result;
        if (calc === 'plus') {
            result = quantity + 1;
        } else {
            result = quantity - 1;
            if (result < 1) result = 1;
        }
        dispatch(
            actions.update_to_cart({
                productId,
                quantity: result,
            }),
        );
        setQuantity(result);
    };

    return (
        <div className={cx('wrapper')}>
            <label className={cx('label-group')}>
                <span onClick={() => handleCalc('minus')} className={cx('action')}>
                    -
                </span>
                <input type="number" className={cx('quantity')} value={quantity} onChange={handleChange} />
                <span onClick={() => handleCalc('plus')} className={cx('action')}>
                    +
                </span>
            </label>
        </div>
    );
}

export default CustomQuantity;
