import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";

function UserListF(props) {
    const[info, setInfo] = useState({
        users: [],
        message: null
    });

    useEffect(() => {
        reloadUserList();
    })

    const reloadUserList = () =>{
        ApiService.fetchUsers()
        .then( res => {
            setInfo({
                ...info,
                users: res.data
            })
        })
        .catch(err =>{
            console.log('reloadUserList() Error!', err)
        })
    }

    const deleteUser = userID => {
        ApiService.deleteUser(userID)
        .then( res => {
            setInfo({
                ...info,
                message: 'User Deleted Successfully'
            });
            setInfo({
                ...info,
                users: info.users.filter(user => user.id !== userID)
            });
        })
        .catch(err =>{
            console.log('deleteUser() Error!', err);
        })
    }

    const navigate = useNavigate();

    const editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
        navigate('/edit-user')
    }

    const addUser = () => {
        window.localStorage.removeItem("userID");
        navigate('/add-user')
    }

    return(
        <div>
            <Typography variant="h4" style={style}>User List</Typography>
            
            <Button variant="contained" color="primary" onClick={addUser}>
                Add User
            </Button>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>FirstName</TableCell>
                        <TableCell align="right">LastName</TableCell>
                        <TableCell align="right">UserName</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Salary</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info.users.map( user => 
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="user">{user.id}</TableCell>
                            <TableCell align="right">{user.firstName}</TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.age}</TableCell>
                            <TableCell align="right">{user.salary}</TableCell>
                            <TableCell align="right" onClick={() => editUser(user.id)}>
                                <Create />
                            </TableCell>
                            <TableCell align="right" onClick={() => deleteUser(user.id)}>
                                <Delete />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default UserListF;