import { HashRouter as Routers, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';

function App() {
    return (
        <Routers>
            <div>
                <Routes>
                    {publicRoutes.map((item, index) => {
                        const Page = item.component;
                        return <Route key={index} path={item.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Routers>
    );
}

export default App;
