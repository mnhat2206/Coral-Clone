import { useEffect, useMemo, useState } from 'react';

import Management from '~/layouts/admin/Management';
import { Table } from '~/components/templates';
import { useDebounce } from '~/hooks';

function Customers() {
    const [tableContent, setTableContent] = useState([]);
    const [paginate, setPaginate] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [selectValue, setSelectValue] = useState({ value: true, label: 'Active' });
    const [showDeleteIcon, setShowDeleteIcon] = useState(true);

    const debounce = useDebounce(searchValue, 500);

    const tableHeader = ['User Name', 'Full Name', 'Phone', 'Address', 'Birth Day'];

    const handleTableContent = (data) => {
        if (!Array.isArray(data)) return;
        const newData = [];
        data.forEach((item) => {
            const { id, avatar, userName, fullName, phoneNumber, address, birthDay } = item;
            const convertTableContent = {
                id,
                avatar,
                userName,
                fullName,
                phoneNumber,
                address,
                birthDay,
            };
            newData.push(convertTableContent);
        });
        return newData;
    };

    useEffect(() => {
        if (!debounce.trim()) {
            fetch(
                `https://coral-server.onrender.com/api/users?isCustomer=true&isActive=${selectValue.value}&_page=${page}&_limit=5`,
            )
                .then((res) => res.json())
                .then((resData) => {
                    const data = resData.data;
                    const newData = handleTableContent(data);
                    setTableContent(newData);
                    setPaginate(resData.pagination);
                });
            return;
        }

        fetch(
            `https://coral-server.onrender.com/api/users?q=${encodeURIComponent(debounce)}&isActive=${
                selectValue.value
            }&_limit=5`,
        )
            .then((res) => res.json())
            .then((resData) => {
                const data = resData.data;
                const newData = handleTableContent(data);
                setTableContent(newData);
            });
    }, [debounce, page, selectValue]);

    const pageCount = useMemo(() => {
        return Math.ceil(paginate._totalRows / paginate._limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginate]);

    const handleChangePage = ({ selected }) => {
        setPage(selected + 1);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    function getParent(inputElement) {
        while (inputElement.parentElement) {
            if (inputElement.parentElement.id) {
                return inputElement.parentElement.id;
            }
            inputElement = inputElement.parentElement;
        }
    }

    const handleSelectChange = (e) => {
        if (e.value === true) {
            setShowDeleteIcon(true);
        } else {
            setShowDeleteIcon(false);
        }
        setSelectValue(e);
    };
    const middlewareHandleAction = (isActive) => {
        //  const handleDelete =

        return async (event) => {
            const userId = getParent(event.currentTarget);
            const isSuccessfully = await fetch(`https://coral-server.onrender.com/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isActive: isActive,
                }),
            })
                .then(() => {
                    return true;
                })
                .catch((e) => {
                    return false;
                });
            if (isSuccessfully) {
                fetch(
                    `https://coral-server.onrender.com/api/users?isCustomer=true&isActive=${selectValue.value}&_page=${page}&_limit=5`,
                )
                    .then((res) => res.json())
                    .then((resData) => {
                        const data = resData.data;
                        const newData = handleTableContent(data);
                        setTableContent(newData);
                        setPaginate(resData.pagination);
                    });
                return;
            }
        };
    };

    return (
        <Management menuId={2}>
            <Table
                title={'Customer'}
                hasBtn={false}
                handleSearch={handleSearch}
                selectGroup
                selectValue={selectValue}
                setSelectValue={handleSelectChange}
                tableHeaders={tableHeader}
                tableContents={tableContent}
                hasPencil={false}
                hasDelete={showDeleteIcon}
                handleDelete={middlewareHandleAction(false)}
                handleActive={middlewareHandleAction(true)}
                paginatePageCount={pageCount || 0}
                paginateHandleChange={handleChangePage}
            />
        </Management>
    );
}

export default Customers;
