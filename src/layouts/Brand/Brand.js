import classNames from 'classnames/bind';

import styles from './Brand.module.scss';
import { GraphicBrand, SSalvaBrand, GolvenStudioBrand, FurnitureBrand, TravelBrand } from '~/components/Icons';

const cx = classNames.bind(styles);

function Brand() {
    const brandListApi = [GraphicBrand, SSalvaBrand, GolvenStudioBrand, FurnitureBrand, TravelBrand];

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('brand-list')}>
                {brandListApi.map((brand, index) => {
                    let Layout = brand;
                    return (
                        <li key={index}>
                            <Layout />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Brand;
