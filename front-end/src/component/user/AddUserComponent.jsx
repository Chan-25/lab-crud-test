import { Button, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ApiService from "../../ApiService";

class AddUserComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            massage: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary,
        }

        ApiService.addUser(user)
        .then( res => {
            this.setState({
                message: user.username + '님이 성공적으로 등록되었습니다.'
            })
            console.log(this.state.message);
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        });
    }

    render() {
        return (
        <div>
            <Typography variant='h4' style={style}>Add User</Typography>
            <form style={formContainer}>
                
                <TextField type="text" placeholder='please input your username' name="username"
                 fullWidth margin='normal' value={this.state.username} onChange={this.onChange} />

                <TextField type="password" placeholder='please input your password' name="password"
                 fullWidth margin='normal' value={this.state.password} onChange={this.onChange} />

                <TextField placeholder='please input your first name' name="firstName"
                 fullWidth margin='normal' value={this.state.firstName} onChange={this.onChange} />

                <TextField placeholder='please input your last name' name="lastName"
                 fullWidth margin='normal' value={this.state.lastName} onChange={this.onChange} />

                <TextField type="number" placeholder='please input your age' name="age"
                 fullWidth margin='normal' value={this.state.age} onChange={this.onChange} />

                <TextField type="number" placeholder='please input your salary' name="salary"
                 fullWidth margin='normal' value={this.state.salary} onChange={this.onChange} />

                <Button variant='contained' color='primary' onClick={this.saveUser}>
                    <Link to='/users' style={rmLinkStyle}>
                        Save
                    </Link>
                </Button>
            </form>
        </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const rmLinkStyle ={
    textDecoration: 'none',
    color: 'inherit'
}

export default AddUserComponent;