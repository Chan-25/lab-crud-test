import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import UserListComponent from '../user/UserListComponent';
//import AddUserComponent from '../user/AddUserComponent';
//import EditUserComponent from '../user/EditUserComponent';
import AddUserF from '../user/AddUserF';
import EditUserF from '../user/EditUserF';
import UserListF from '../user/UserListF';

const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserListF />} />
                    <Route path="/users" element={<UserListF />} />
                    <Route path="/add-user" element={<AddUserF />} />
                    <Route path="/edit-user" element={<EditUserF />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;