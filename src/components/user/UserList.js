import React, {useEffect, useState} from 'react'

import './UserList.css'
import userService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import PopupModal from "../common/popup/PopupModal";
import MyPagination from "../common/pagnation/MyPagination";

const ListUser = () => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState(-1);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        const fetchUsers = () => {
            console.log("fetchUsers........ page: " + page + " pageSize: " + pageSize);
            userService.getUsers(page, pageSize)
                .then((res) => {
                    setUsers(res.data)
                });
        }
        fetchUsers();
    }, [page]);

    // const dataLength = users.length > 0 ? users.length * 2 : users.length;
    const dataLength = 30;


    const navigate = useNavigate();
    const navigateToAddPage = (page) => {
        console.log("navigateToAddPage page: " + page)
        navigate('/add-user');
    };
    const navigateToEditPage = (id) => {
        console.log("navigateToEditPage user.id: " + id)
        navigate('/edit-user/' + id);
    };


    const handleShowModal = (event) => {
        setUserId(parseInt(event.target.value));
        setShowModal(true);
    };
    const handleConfirm = (confirmed) => {
        setShowModal(false);
        console.log("handleConfirm confirmed: " + confirmed);
        if (confirmed) {
            console.log("to delete userId: " + userId);
            userService.deleteUser(userId)
                .then(res => {
                    setUsers(users.filter(user => user.id !== userId));
                    console.log(res._status.NAME())
                })
                .catch(error => {
                    console.log('error', error);  // Failure response handling
                });
        }
    };

    return (
        <div className="grid">
            <h2>Users List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={navigateToAddPage}> Add User</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Role</th>
                        <th>User Code</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(
                            user =>
                                <tr key={user.id}>
                                    <td> {user.firstName} </td>
                                    <td> {user.lastName}  </td>
                                    <td> {user.email}     </td>
                                    <td> {user.title}     </td>
                                    <td> {user.role}      </td>
                                    <td> {user.usercode}  </td>
                                    <td className="align-items-center">
                                        <button onClick={() => navigateToEditPage(user.id)}
                                                className="btn btn-info">Update
                                        </button>
                                        <button style={{marginLeft: "10px"}}
                                                value={user.id}
                                                onClick={(e) => handleShowModal(e)}
                                                className="btn btn-danger">Delete
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <MyPagination
                    currentPage={page}
                    pageSize={pageSize}
                    maxItems={2}
                    dataLength={dataLength}
                    onPageChange={
                        (page) => {
                            setPage(page)
                            // console.log("onPageChange num ===>: " + page)
                            // fetchUsers()
                        }
                    }
                    className="my-3"/>
                {showModal && <PopupModal handleConfirm={handleConfirm}/>}
            </div>
        </div>
    )

}

export default ListUser;
