import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Logo, Facebook, Twitter, Linkedin, Dribble, ArrowTop } from '~/components/Icons';
import iconsPayment from '~/asset/img/footer/icons-payment.png';

const cx = classNames.bind(styles);

function Footer() {
    const handleToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-footer')}>
                <div className={cx('item-1')}>
                    <div className={cx('logo')}>
                        <Logo />
                    </div>
                    <span className={cx('text')}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua
                    </span>
                    <div className={cx('social')}>
                        <a href="/">
                            <Facebook />{' '}
                        </a>
                        <a href="/">
                            <Twitter />
                        </a>
                        <a href="/">
                            <Linkedin />
                        </a>
                        <a href="/">
                            <Dribble />
                        </a>
                    </div>
                </div>
                <div className={cx('item-2')}>
                    <span className={cx('title')}>CATALOG</span>
                    <ul className={cx('list-content')}>
                        <li className={cx('item-content')}>Necklaces</li>
                        <li className={cx('item-content')}>Hoodies</li>
                        <li className={cx('item-content')}>Jewelry Box</li>
                        <li className={cx('item-content')}>T-shirt</li>
                        <li className={cx('item-content')}>Jacket</li>
                    </ul>
                </div>
                <div className={cx('item-3')}>
                    <span className={cx('title')}>ABOUT US</span>
                    <ul className={cx('list-content')}>
                        <li className={cx('item-content')}>Our Producers</li>
                        <li className={cx('item-content')}>Sitemap</li>
                        <li className={cx('item-content')}>FAQ</li>
                        <li className={cx('item-content')}>About Us</li>
                        <li className={cx('item-content')}>{'Terms & Conditions'}</li>
                    </ul>
                </div>
                <div className={cx('item-4')}>
                    <span className={cx('title')}>CUSTOMER SERVICES</span>
                    <ul className={cx('list-content')}>
                        <li className={cx('item-content')}>Contact Us</li>
                        <li className={cx('item-content')}>Track Your Order</li>
                        <li className={cx('item-content')}>{'Product Care & Repair'}</li>
                        <li className={cx('item-content')}>Book an Appointment</li>
                        <li className={cx('item-content')}>{'Shipping & Returns'}</li>
                    </ul>
                </div>
            </div>
            <div className={cx('bot-footer')}>
                <div className={cx('bot-footer-wrapper')}>
                    <span className={cx('copyright')}>© 2022 Coral , Inc.</span>
                    <img src={iconsPayment} alt="" />
                    <div onClick={handleToTop} className={cx('scroll')}>
                        <span>Scroll to top</span>
                        <div className={cx('arrow-top')}>
                            <ArrowTop />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
