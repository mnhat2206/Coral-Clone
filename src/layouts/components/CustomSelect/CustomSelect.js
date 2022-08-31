import { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import styles from './CustomSelect.module.scss';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function CustomSelect({ productId, initValue, type, selectList = [] }) {
    const initState = selectList.indexOf(initValue);
    const [option, setOption] = useState(selectList[initState]);
    const selectListLength = useMemo(() => selectList.length, [selectList]);

    const [, dispatch] = useStore();

    const handleArrow = (action) => {
        if (action === 'UP') {
            let indexList = selectList.indexOf(option) + 1;
            if (indexList > selectListLength - 1) {
                indexList = 0;
            }
            dispatch(
                actions.update_to_cart({
                    productId,
                    [type]: selectList[indexList],
                }),
            );
            setOption(selectList[indexList]);
        } else {
            let indexList = selectList.indexOf(option) - 1;
            if (indexList < 0) {
                indexList = selectListLength - 1;
            }
            dispatch(
                actions.update_to_cart({
                    productId,
                    [type]: selectList[indexList],
                }),
            );
            setOption(selectList[indexList]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('custom-select')}>
                <span className={cx('text')}>{option}</span>
                <div>
                    <p onClick={() => handleArrow('UP')} className={cx('arrow', 'arrow-up')}>
                        <TiArrowSortedUp />
                    </p>
                    <p onClick={() => handleArrow('DOWN')} className={cx('arrow', 'arrow-down')}>
                        <TiArrowSortedDown />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CustomSelect;
