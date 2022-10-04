import { useContext } from 'react';

import { CartContext } from '~/store';

function useStore() {
    const [state, dispatch] = useContext(CartContext);
    return [state, dispatch];
}

export default useStore;
