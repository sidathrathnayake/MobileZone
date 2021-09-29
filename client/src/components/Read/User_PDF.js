import React, { Component , useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../image/allcover.png'
import title from '../../image/customerpdf.jpg'
import TableScrollbar from 'react-table-scrollbar';

class User_PDF extends Component {

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

    await axios.get('http://localhost:5000/user/newusers').then((res) => {

        if(res.data.success){
            this.setState({
                users:res.data.users
            })
        }
        console.log(this.state.users);
    })

}

pdfGenerate = () =>{
    var doc = new jsPDF('portrait', 'px', 'a4', 'false');
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
    doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
    doc.setFont('Comic Sans');
    doc.setFontSize(22);
    doc.setTextColor(26, 40, 88);
    doc.addImage(title, 'png', 25,25,395,50)
    
    doc.addImage(logo, 'png', 180,90,100,50)
    doc.autoTable({
        margin: {top: 150},
        styles: {overflow: 'linebreak'},
        html: '#new_user_table',
    })
    doc.save('Customers who registered last week.pdf');

    this.props.history.push("/userdetails");
}

    render() {



        return (
            
                <div className='pdfpage'>
                
                <div id="pdfform">
                    
                <div className="adminnav">
            <h1>
              <a href="/userdetails">
                <i className="fa fa-users-cog"></i> Customers who registered last week
              </a>
            </h1>
            
          </div>
          <div className="reportbutton">
          
          <button className="btn" onClick={this.pdfGenerate} id="right-panel-btn"> Generate</button>
            
          </div>
                <br/>
                <div className="table-container">
                <TableScrollbar rows={9}>
                    <table id="new_user_table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.users.map((users,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{users._id}</td>
                                <td>{users.userName}</td>
                                <td>{users.userEmail}</td>
                                
                            </tr>
                             ))}
                            
                        </tbody>
                    </table> 
                    </TableScrollbar>
                    </div>
                </div>
                </div>

            
        );
    }
}

export default User_PDF;