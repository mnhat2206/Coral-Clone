import classNames from 'classnames/bind';

import styles from './Banner.module.scss';
import { backgroundBanner } from '~/api/banner';
import { ZaraBanner } from '~/components/Icons';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div style={{ backgroundImage: `url(${backgroundBanner.background})` }} className={cx('wrapper')}>
            <div
                style={{ backgroundImage: `url(${backgroundBanner.dropBackground})` }}
                className={cx('drop-background')}
            ></div>
            <div className={cx('content-container')}>
                <div className={cx('logo')}>
                    <ZaraBanner />
                </div>
                <span className={cx('content')}>{backgroundBanner.content}</span>
                <button className={cx('btn-collection')}>
                    <span className={cx('btn-text')}>See Collection</span>
                </button>
            </div>
        </div>
    );
}

export default Banner;
