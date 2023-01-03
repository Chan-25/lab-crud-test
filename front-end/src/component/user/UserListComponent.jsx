import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../ApiService";

class UserListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers()
        .then( res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => {
            console.log('reloadUserList() Error!', err);
        })
    }

    deleteUser = (userID) => {
        ApiService.deleteUser(userID)
            .then( res => {
                this.setState({
                    message: 'User Deleted Successfully'
                });
                this.setState({
                    users: this.state.users.filter( user => user.id !== userID)
                })
            })
            .catch(err => {
                console.log('deleteUser() Error!', err);
            })
    }

    editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>User List</Typography>
                
                <Link to='/add-user' style={rmLinkStyle}>
                    <Button variant="contained" color="primary" onClick={this.addUser}>
                        Add User
                    </Button>
                </Link>
                
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
                        {this.state.users.map( user => 
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="user">{user.id}</TableCell>
                                <TableCell align="right">{user.firstName}</TableCell>
                                <TableCell align="right">{user.lastName}</TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.age}</TableCell>
                                <TableCell align="right">{user.salary}</TableCell>
                                <TableCell align="right" onClick={() => this.editUser(user.id)}>
                                    <Link to='/edit-user' style={rmLinkStyle}>
                                        <Create />
                                    </Link>
                                </TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(user.id)}>
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const rmLinkStyle ={
    textDecoration: 'none',
    color: 'inherit'
}

export default UserListComponent;