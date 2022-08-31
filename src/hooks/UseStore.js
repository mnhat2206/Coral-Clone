import { useContext } from 'react';

import { CartContext } from '~/store';

function UseStore() {
    const [state, dispatch] = useContext(CartContext);
    return [state, dispatch];
}

export default UseStore;
