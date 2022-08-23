import classNames from 'classnames/bind';

import styles from './FollowOnInstagram.module.scss';
import { followOnInstargam } from '~/api/followOnInstagram';
import { Instagram } from '~/components/Icons';

const cx = classNames.bind(styles);

function FollowOnIntagram() {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Follow products and discounts on Instagram</h4>
            <ul className={cx('list-img')}>
                {followOnInstargam.map((item) => (
                    <li className={cx('item-img')} key={item.id}>
                        <img src={item.img} alt="" />
                        <div className={cx('layout-hover')}>
                            <span className={cx('icon-layout-hover')}>{<Instagram />}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={cx('subscribe-wrapper')}>
                <h4 className={cx('title')}>Or subscribe to the newsletter</h4>
                <div className={cx('mail-wrapper')}>
                    <input placeholder="Email Address ..." className={cx('mail-input')} />
                    <span className={cx('submit-mail')}>SUBMIT</span>
                </div>
            </div>
        </div>
    );
}

export default FollowOnIntagram;
