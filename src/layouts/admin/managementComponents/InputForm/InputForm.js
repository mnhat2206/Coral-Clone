import { useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './InputForm.module.scss';
import Field from '~/components/Field';
import Switch from '~/components/Switch';
import Button from '~/components/Button';
import PreviewImg from '~/components/PreviewImg';

const cx = classNames.bind(styles);

function InputForm() {
    const fileRef = useRef();

    const handleChooseFile = () => {
        fileRef.current.click();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <Field name={'Product Name'} />
                    <Field name={'Product Name'} />
                    <Field name={'Product Name'} />
                    <Field name={'Product Name'} />
                </div>
                <div className={cx('mid')}>
                    <Switch name={'Product Name'} />
                    <Switch name={'Product Name'} />
                    <Switch name={'Product Name'} />
                </div>
                <div className={cx('right')}>
                    <PreviewImg handleClick={handleChooseFile} />
                    <Button btnName="Upload Image" className={cx('upload-img')} handleClick={handleChooseFile} />
                    <input ref={fileRef} hidden type="file" />
                </div>
            </div>
            <div className={cx('btn-form')}>
                <Button btnName="Save" className={cx('btn-submit')} />
            </div>
        </div>
    );
}

export default InputForm;
