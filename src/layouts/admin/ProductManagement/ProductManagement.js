import { useEffect, useState } from 'react';

function ProductManagement() {
    const [products] = useState([]);
    const [image, setImage] = useState([]);

    const reader = new FileReader();
    const convertFiles = () => {
        setImage(reader.result);
    };
    const handlePreviewFile = (e) => {
        const file = e.target.files[0];

        reader.addEventListener('load', convertFiles);

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const data = {
            srcImage: image,
            title: 'Adicolor Classics Joggers',
            categoryName: 'Artsy',
            price: 63.85,
            discount: '',
            label: '',
            isBestSeller: false,
            isNew: true,
            numberSeller: 23,
            styId: 1,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };

        fetch('http://localhost:3002/product', options);
    };

    useEffect(() => {
        return () => {
            console.log('clean up');
            // reader.removeEventListener('load', convertFiles);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    // useEffect(() => {
    //     fetch('http://localhost:3002/product')
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // }, []);

    return (
        <div>
            <form>
                <input onChange={handlePreviewFile} type="file" />
                <img src={image || ''} alt="" />
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </form>

            <div>
                {products.map((item) => (
                    <img src={item.srcImage} key={item.id} alt="" />
                ))}
            </div>
        </div>
    );
}

export default ProductManagement;
