import React, {useState} from 'react'
import userService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {handleChangeValue} from './userHandlerFunction';

const AddUser = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        role: '',
        usercode: ''
    })

    const navigate = useNavigate();
    const navigateToUserList = (page) => {
        console.log("navigateToUserList")
        navigate('/users');
    };

    const navigateToBack = (event) => {
        event.preventDefault();
        console.log("navigateToBack")
        navigate(-1);
    };

    const addUser = (event) => {
        event.preventDefault();
        let data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            title: user.title,
            role: user.role,
            usercode: user.usercode
        }
        console.log('user => ' + JSON.stringify(data));
        userService.createUser(data)
            .then(response => {
                navigateToUserList(); // Successful response handling
            })
            .catch(error => {
                console.log('error', error);  // Failure response handling
            });
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add User</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                           value={user.firstName}
                                           onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                           value={user.lastName} onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <div className="form-group">
                                    <label> Email: </label>
                                    <input placeholder="Email Address" name="email" className="form-control"
                                           value={user.email} onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <div className="form-group">
                                    <label> Title: </label>
                                    <input placeholder="Title" name="title" className="form-control"
                                           value={user.title} onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <div className="form-group">
                                    <label> Role: </label>
                                    <input placeholder="Role" name="role" className="form-control"
                                           value={user.role} onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <div className="form-group">
                                    <label> Usercode: </label>
                                    <input placeholder="Usercode" name="usercode" className="form-control"
                                           value={user.usercode} onChange={(e) => handleChangeValue(e, user, setUser)}/>
                                </div>
                                <br />
                                <button className="btn btn-success" onClick={addUser}>Save</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={navigateToBack}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddUser
