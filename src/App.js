import './App.css';
import {Route, Routes} from "react-router-dom";
import ListUser from "./components/user/UserList";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";


function App() {
    return (
        // <BrowserRouter></BrowserRouter>
        <div className="container">
            <Routes>
                <Route exact path='/' element={<ListUser/>}/>
                <Route exact path='/users' element={<ListUser/>}/>
                <Route path='/add-user' element={<AddUser/>}/>
                <Route path='/edit-user/:id' element={<EditUser/>}/>
            </Routes>
        </div>
    );
}


export default App;
