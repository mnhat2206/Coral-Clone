import classNames from 'classnames/bind';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import Select from 'react-select';

import styles from './Table.module.scss';
import { SearchIcon } from '~/components/Icons';
// import avatar from '~/asset/img/follow-on-instagram/fio1.png';
import { TitleAdmin, ContainerAdmin, Paginate } from '~/components/templates';

const cx = classNames.bind(styles);

function Table({
    title,
    hasBtn,
    btnName,
    btnIcon,
    selectGroup = false,
    selectValue = '',
    setSelectValue,
    handleSearch,
    hasPencil = true,
    handlePencil,
    hasDelete = true,
    handleDelete,
    handleActive,
    tableHeaders = [],
    tableContents = [],
    paginatePageCount,
    paginateHandleChange,
}) {
    const style = {
        control: (base) => ({
            ...base,
            border: 0,
            width: '100%',
            backgroundColor: 'transparent',
            // This line disable the blue border
            boxShadow: 'none',
        }),
    };

    return (
        <div className={cx('wrapper')}>
            <TitleAdmin title={title} hasBtn={hasBtn} btnName={btnName} btnIcon={btnIcon} linkTo={'form'} />

            <ContainerAdmin fullWidth>
                <div className={cx('container-header')}>
                    <label className={cx('group-header', 'search-group')}>
                        <input
                            className={cx('input-search')}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search"
                        />
                        <SearchIcon color="#a6a6a6" />
                    </label>
                    {selectGroup && (
                        <div className={cx('select-group')}>
                            <Select
                                className={cx('group-header', 'select')}
                                styles={style}
                                isSearchable={false}
                                // placeholder="Is Active ..."
                                name="Is Active"
                                options={[
                                    {
                                        value: true,
                                        label: 'Active',
                                    },
                                    {
                                        value: false,
                                        label: 'Not Active',
                                    },
                                ]}
                                value={selectValue}
                                onChange={setSelectValue}
                            />
                        </div>
                    )}
                </div>
                <div className={cx('container-footer')}>
                    <table className={cx('table')}>
                        <tbody>
                            <tr className={cx('header')}>
                                {/* render column header
                                        ex:
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Category</th>
                                        <th>Status</th> */}
                                {tableHeaders.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                            {/* render column body follow length array tableHeaders */}
                            {tableContents.map((item) => {
                                // length + 1 because array object is one key id
                                const lengthTableHeaders = tableHeaders.length + 1;
                                const tdMap = [];
                                for (let i = 0; i <= lengthTableHeaders; i++) {
                                    let result;
                                    // because i == 1 is img and first column
                                    if (i === 1) {
                                        result = (
                                            <td key={i} className={cx('first-column')}>
                                                <img className={cx('column-img')} src={Object.values(item)[i]} alt="" />
                                                <span>{Object.values(item)[i + 1]}</span>
                                            </td>
                                        );
                                    }
                                    // because i === 0 is key id and i === 2 is content column 1 with img
                                    else if (i === 0 || i === 2) {
                                        continue;
                                    } else {
                                        result = <td key={i}>{Object.values(item)[i] || 'no data'}</td>;
                                    }
                                    tdMap.push(result);
                                }
                                return (
                                    <tr key={item.id} id={item.id} className={cx('table-content')}>
                                        {tdMap.map((item) => {
                                            return item;
                                        })}
                                        <td className={cx('action-column')}>
                                            {hasPencil && (
                                                <span onClick={handlePencil}>
                                                    <BsPencil />
                                                </span>
                                            )}
                                            {hasDelete && (
                                                <span onClick={handleDelete}>
                                                    <RiDeleteBin6Line />
                                                </span>
                                            )}
                                            {!hasDelete && !hasPencil ? (
                                                <span onClick={handleActive}>
                                                    <HiOutlineViewGridAdd />
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* <tr className={cx('table-content')}>
                                        <td className={cx('first-column')}>
                                            <img className={cx('column-img')} src={avatar} alt="" />
                                            <span>Adventure High Ropes</span>
                                        </td>
                                        <td>New York</td>
                                        <td>Out door activites</td>
                                        <td>Approved</td>
                                        <td className={cx('action-column')}>
                                            <span>
                                                <BsPencil />
                                            </span>
                                            <span>
                                                <RiDeleteBin6Line />
                                            </span>
                                        </td>
                                    </tr> */}
                        </tbody>
                    </table>
                </div>
                <Paginate
                    pageCount={paginatePageCount}
                    handleChangePage={paginateHandleChange}
                    containerClassNameCustom={cx('paginate-container')}
                />
            </ContainerAdmin>
        </div>
    );
}

export default Table;
