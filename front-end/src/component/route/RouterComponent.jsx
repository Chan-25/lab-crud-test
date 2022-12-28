import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserListComponent from '../user/UserListComponent';
import AddUserComponent from '../user/AddUserComponent';
import EditUserComponent from '../user/EditUserComponent';

const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserListComponent />} />
                    <Route path="/users" element={<UserListComponent />} />
                    <Route path="/add-user" element={<AddUserComponent />} />
                    <Route path="/edit-user" element={<EditUserComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;