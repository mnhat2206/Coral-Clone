const { faker } = require('@faker-js/faker');
const fs = require('fs');

const randomUserList = (n) => {
    if (n <= 0) return [];

    const users = [
        {
            userName: 'admin',
            password: 'admin',
            fullName: 'Nguyen Minh Nhat',
            phoneNumber: faker.phone.number(),
            address: faker.address.country(),
            birthDay: faker.date.birthdate(),
            isCustomer: false,
            isActive: true,
            avatar: faker.image.avatar(),
            createdAt: Date.now(),
            updateAt: Date.now(),
            id: faker.datatype.uuid(),
        },
        {
            userName: 'nhatnm',
            password: 123123,
            fullName: 'Minh Nhat',
            phoneNumber: faker.phone.number(),
            address: faker.address.country(),
            birthDay: faker.date.birthdate(),
            isCustomer: true,
            isActive: true,
            avatar: faker.image.avatar(),
            createdAt: Date.now(),
            updateAt: Date.now(),
            id: faker.datatype.uuid(),
        },
    ];

    // loop and pust user
    Array.from(new Array(n)).forEach(() => {
        const userRandom = {
            userName: faker.internet.userName().toLocaleLowerCase(),
            password: 123123,
            fullName: faker.name.fullName(),
            phoneNumber: faker.phone.number(),
            address: faker.address.country(),
            birthDay: faker.date.birthdate(),
            isCustomer: true,
            isActive: true,
            avatar: faker.image.avatar(),
            createdAt: Date.now(),
            updateAt: Date.now(),
            id: faker.datatype.uuid(),
        };

        users.push(userRandom);
    });
    return users;
};

const randomCategoryList = (n) => {
    if (n <= 0) return [];

    const categories = [
        {
            id: faker.datatype.uuid(),
            name: 'Jewelry & Accessories',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl: '',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Clothing & Shoes',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl:
                'https://firebasestorage.googleapis.com/v0/b/uploadfiles-25ef3.appspot.com/o/images%2Fcategories%2F2165fd5d-7e5a-42b8-9513-cfcf9a50b76f?alt=media&token=79220b1c-da10-4127-94fb-5b888e749ef2',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Home & Living',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl:
                'https://firebasestorage.googleapis.com/v0/b/uploadfiles-25ef3.appspot.com/o/images%2Fcategories%2Fb8c9bc80-bfee-4a9d-9748-cdde5545db89?alt=media&token=d64e1e72-2693-4f88-bdca-4e2978ba4e04',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Wedding & Party',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl:
                'https://firebasestorage.googleapis.com/v0/b/uploadfiles-25ef3.appspot.com/o/images%2Fcategories%2F9b9ea769-59f8-43c9-9ba6-35938eb9da00?alt=media&token=87019df4-93dc-4f73-8f26-b2ea8743a6ea',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Toys & Entertainment',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl:
                'https://firebasestorage.googleapis.com/v0/b/uploadfiles-25ef3.appspot.com/o/images%2Fcategories%2Fa0a75423-aa9a-41e2-a190-eddef938edf8?alt=media&token=921a0cc2-13a6-4131-96e0-00fd0c208056',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Art & Collectibles',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl:
                'https://firebasestorage.googleapis.com/v0/b/uploadfiles-25ef3.appspot.com/o/images%2Fcategories%2F046e546b-7ece-4da1-909e-46e00ab0b521?alt=media&token=66a35fe5-d032-4024-8be6-e0415009a501',
        },
        {
            id: faker.datatype.uuid(),
            name: 'Craft Supplies & Tools',
            isActive: true,
            isMenu: true,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl: '',
        },
    ];

    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const categoryRandom = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            isActive: true,
            isMenu: false,
            isMain: false,
            createdAt: Date.now(),
            updateAt: Date.now(),
            thumbnailUrl: faker.image.fashion(312, 312, true),
        };

        categories.push(categoryRandom);
    });

    return categories;
};

const randomProductList = (categoryList, n) => {
    if (n <= 0) return [];

    const products = [];

    // loop and push product
    for (let category of categoryList) {
        Array.from(new Array(n)).forEach(() => {
            const productRandom = {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                srcImage: faker.image.fashion(312, 400, true),
                categoryId: category.id,
                price: +faker.commerce.price(50, 5000, 2),
                discount: 0,
                isBestSeller: false,
                isNew: false,
                isActive: true,
                isLabel: '',
                createdAt: Date.now(),
                updateAt: Date.now(),
            };

            products.push(productRandom);
        });
    }

    return products;
};

(() => {
    // random data
    const userList = randomUserList(10);
    const categoryList = randomCategoryList(8);
    const productList = randomProductList(categoryList, 12);

    // prepare db object
    const db = {
        cart: [
            {
                cartId: 1,
                userId: 1,
                total: 2000,
                shoppingCart: [],
            },
        ],
        users: userList,
        categories: categoryList,
        products: productList,
    };

    // write db object to  db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate is successfully =))');
    });
})();
