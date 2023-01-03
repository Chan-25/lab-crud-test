import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../ApiService'

const AddUserF = (props) => {

    const [state, setState] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        salary: '',
        message: null
    })

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const navigate = useNavigate();

    const saveUser = (e) => {
        e.preventDefault();

        let user = {
            username : state.username,
            password : state.password,
            firstName : state.firstName,
            lastName : state.lastName,
            age : state.age,
            salary : state.salary
        }

        ApiService.addUser(user)
        .then( res => {
            setState({
                ...state,
                message: user.username + '님이 성공적으로 등록되었습니다.'
            })
            console.log(state.message);
            navigate('/users')
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        });
    }

    return (
        <div>
            <Typography variant='h4' style={style}>Add User</Typography>
            <form style={formContainer}>
                
                <TextField type="text" placeholder='please input your username' name="username"
                 fullWidth margin='normal' value={state.username} onChange={onChange} />

                <TextField type="password" placeholder='please input your password' name="password"
                 fullWidth margin='normal' value={state.password} onChange={onChange} />

                <TextField placeholder='please input your first name' name="firstName"
                 fullWidth margin='normal' value={state.firstName} onChange={onChange} />

                <TextField placeholder='please input your last name' name="lastName"
                 fullWidth margin='normal' value={state.lastName} onChange={onChange} />

                <TextField type="number" placeholder='please input your age' name="age"
                 fullWidth margin='normal' value={state.age} onChange={onChange} />

                <TextField type="number" placeholder='please input your salary' name="salary"
                 fullWidth margin='normal' value={state.salary} onChange={onChange} />

                <Button variant='contained' color='primary' onClick={saveUser}>
                    Save
                </Button>
            </form>
        </div>
    )
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default AddUserF;