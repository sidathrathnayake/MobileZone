import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../Navigation/Sidebar'

class Read_User extends Component {

constructor(props){
    super(props);

    this.state={
        users:[]
    }
}

componentDidMount(){
    this.retrive_users();
}

async retrive_users(){

    await axios.get('http://localhost:5000/user/users').then((res) => {

        if(res.data.success){
            this.setState({
                users:res.data.users
            })
        }
        console.log(this.state.users);
    })

}


onDelete = (id) =>{
    axios.delete(`http://localhost:5000/user/deleteuser/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.retrive_users();
    })
}

filterData(users, searchKey){
    const result = users.filter((user) =>
    user.userName.toLowerCase().includes(searchKey) ||
    user.userEmail.toLowerCase().includes(searchKey)
    )

    this.setState({users:result})
}


handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/user/users').then(res => {
        if(res.data.success){
            this.filterData(res.data.users, searchKey)
        }
    })
}



    render() {
        return (
            <div className="wrapper">

            <Sidebar/>
            
                <div className="table-container">
                <h1>Customers</h1><br/>
                    <div className="table-search">
                    <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            onChange={this.handleSearch}
                        ></input>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.users.map((users,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{users.userName}</td>
                                <td>{users.userEmail}</td>
                                <td>
                                    <a className="btn btndlt" href="#" onClick={() => this.onDelete(users._id)}>
                                    Delete<i className="fas fa-trash-alt"></i> 
                                    </a>
                                </td>
                            </tr>
                             ))}
                            
                        </tbody>
                    </table>
                </div>          
            </div>
        );
    }
}

export default Read_User;