import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';

function App() {
    return (
        <Routers>
            <Routes>
                {publicRoutes.map((item, index) => {
                    const Page = item.component;
                    return <Route key={index} path={item.path} element={<Page />} />;
                })}
            </Routes>
        </Routers>
    );
}

export default App;
