import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';

import Management from '~/layouts/admin/Management';
import { Table } from '~/components/templates';
import { useDebounce } from '~/hooks';

function ProductsAdmin() {
    const [tableContent, setTableContent] = useState([]);
    const [paginate, setPaginate] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [selectValue, setSelectValue] = useState({ value: true, label: 'Active' });
    const [showIconPencilAndDelete, setShowIconPencilAndDelete] = useState(true);

    const navigate = useNavigate();

    const debounce = useDebounce(searchValue, 500);

    const tableHeader = ['Name', 'Price'];

    function getParent(inputElement) {
        while (inputElement.parentElement) {
            if (inputElement.parentElement.id) {
                return inputElement.parentElement.id;
            }
            inputElement = inputElement.parentElement;
        }
    }

    const handleTableContent = (data) => {
        if (!Array.isArray(data)) return;
        const newData = [];
        data.forEach((item) => {
            const { id, srcImage, name, price } = item;
            const convertTableContent = {
                id,
                srcImage,
                name,
                price,
            };
            newData.push(convertTableContent);
        });
        return newData;
    };

    useEffect(() => {
        if (!debounce.trim()) {
            fetch(
                `http://localhost:3002/api/products?_sort=createdAt&_order=desc&isActive=${selectValue.value}&_page=${page}&_limit=5`,
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
            `http://localhost:3002/api/products?q=${encodeURIComponent(debounce)}&isActive=${
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

    const handlePencil = (e) => {
        const productId = getParent(e.currentTarget);
        navigate(`/admin/products/form/${productId}`);
    };

    const handleSelectChange = (e) => {
        if (e.value === true) {
            setShowIconPencilAndDelete(true);
        } else {
            setShowIconPencilAndDelete(false);
        }
        setSelectValue(e);
    };

    const middlewareHandleAction = (isActive) => {
        return async (e) => {
            const productId = getParent(e.currentTarget);
            const isSuccessfully = await fetch(`http://localhost:3002/api/products/${productId}`, {
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
                    `http://localhost:3002/api/products?_sort=createdAt&_order=desc&isActive=${selectValue.value}&_page=${page}&_limit=5`,
                )
                    .then((res) => res.json())
                    .then((resData) => {
                        const data = resData.data;
                        const newData = handleTableContent(data);
                        setTableContent(newData);
                        setPaginate(resData.pagination);
                    });
            }
        };
    };

    return (
        <Management menuId={3}>
            <Table
                title={'Products'}
                btnName="Add"
                btnIcon={<BsPlusCircle />}
                handleSearch={handleSearch}
                hasPencil={showIconPencilAndDelete}
                handlePencil={handlePencil}
                hasDelete={showIconPencilAndDelete}
                handleDelete={middlewareHandleAction(false)}
                handleActive={middlewareHandleAction(true)}
                selectGroup
                selectValue={selectValue}
                setSelectValue={handleSelectChange}
                tableHeaders={tableHeader}
                tableContents={tableContent}
                paginatePageCount={pageCount || 0}
                paginateHandleChange={handleChangePage}
            />
        </Management>
    );
}

export default ProductsAdmin;
