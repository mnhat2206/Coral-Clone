import classNames from 'classnames/bind';

import styles from './ExploreStyles.module.scss';
import { apiImages } from '~/api/exploreStyles';

const cx = classNames.bind(styles);

function ExploreStyles() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {apiImages.map((img, index) => (
                    <div key={img.id} className={cx('item', `item-${index + 1}`)}>
                        <img className={cx('img')} src={img.srcImage} alt="" />
                        <div className={cx('style-intro')}>
                            <span>{img.styleName}</span>
                            <span>{`${img.numberOfProductStyle} Product`}</span>
                        </div>
                    </div>
                ))}
                {/* <div className={cx('item', 'item-2')}>Img2</div>
                <div className={cx('item', 'item-3')}>Img3</div>
                <div className={cx('item', 'item-4')}>Img4</div>
                <div className={cx('item', 'item-5')}>Img5</div> */}
            </div>
            <div className={cx('wrapper-text')}>
                <span className={cx('text')}>Explore new and popular styles</span>
            </div>
        </div>
    );
}

export default ExploreStyles;
