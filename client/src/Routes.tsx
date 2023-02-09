import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { NotFound } from './pages/NotFound';
import Register from './pages/Register';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RoutesComponent;
