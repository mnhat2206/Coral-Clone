import classNames from 'classnames/bind';
import { VscCloudUpload } from 'react-icons/vsc';

import styles from './PreviewImg.module.scss';

const cx = classNames.bind(styles);

function PreviewImg({ width = '', height = '', backgroundColor = '', handleClick, imageSrc = '' }) {
    return (
        <div style={{ width, height, backgroundColor }} onClick={handleClick} className={cx('preview-img')}>
            {!imageSrc && (
                <div className={cx('upload-icon')}>
                    <VscCloudUpload />
                </div>
            )}
            {imageSrc && <img className={cx('img')} src={imageSrc} alt="" />}
        </div>
    );
}

export default PreviewImg;
