import { Button, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../ApiService'

const EditUserF = (props) => {

    const [state, setState] = useState({
        id: '',
        username:'',
        firstName: '',
        lastName: '',
        age: '',
        salary: '',
        message: null
    })

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        ApiService.fetchUserByID(window.localStorage.getItem("userID"))
        .then( res => {
            let user = res.data;
            setState({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                salary: user.salary
            })

            console.log(user)
        })
        .catch( err => {
            console.log('loadUser() 에러', err)
        });
    }

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
            id: state.id,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            age: state.age,
            salary: state.salary
        }

        ApiService.editUser(user)
        .then( res => {
            setState({
                ...state,
                message: user.lastName + '님의 정보가 수정되었습니다.'
            })
            navigate('/users');
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        })
    }

    return (
        <div>
            <Typography variant='h4' style={style}>Edit User</Typography>
            <form>

                <TextField type="text" name="username" readOnly={true}
                 fullWidth margin='normal' value={state.username} />

                <TextField placeholder='Edit your first name' name="firstName"
                 fullWidth margin='normal' value={state.firstName} onChange={onChange} />

                <TextField placeholder='Edit your last name' name="lastName"
                 fullWidth margin='normal' value={state.lastName} onChange={onChange} />

                <TextField type='number' placeholder='Edit your age' name="age"
                 fullWidth margin='normal' value={state.age} onChange={onChange} />

                <TextField type='number' placeholder='Edit your salary' name="salary"
                 fullWidth margin='normal' value={state.salary} onChange={onChange} />

                <Button variant='contained' color='primary' onClick={saveUser}>
                    Save
                </Button>
                
            </form>
        </div>
    )
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserF