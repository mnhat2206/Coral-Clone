// import { useEffect, useState } from 'react';
import { HashRouter as Routers, Routes, Route, Navigate } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import { useStore } from './hooks';

function App() {
    const [state] = useStore();
    const userLogin = state.user;

    return (
        <Routers>
            <div>
                <Routes>
                    {publicRoutes.map((item, index) => {
                        const Page = item.component;
                        return <Route key={index} path={item.path} element={<Page />} />;
                    })}
                    {Object.keys(userLogin).length > 0 &&
                        privateRoutes.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={userLogin.isCustomer === false ? <Page /> : <Navigate to="/" replace />}
                                />
                            );
                        })}
                </Routes>
            </div>
        </Routers>
    );
}

export default App;
