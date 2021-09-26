import React, { Component } from 'react'
import Sidebar from '../Navigation/Sidebar';
import '../../css/payment.css'
import axios from 'axios';
import Select from 'react-select';

/**Defining the initial state research paper amount */
const initialState = {
    month:[{value:'June',label:'June'},
                    {value:'July',label:'July'},
                    {value:'August',label:'August'},
                    {value:'September',label:'September'}],
    year:[{value:'2021',label:'2021'}],
    selectedMonth:'',
    selectedYear:''               
}

export default class admin_generate_sales_report extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onMonthChange(e) {
        this.setState({ selectedMonth: e.value });
    }
    onYearChange(e) {
        this.setState({ selectedYear: e.value });
    }
    

    onSubmit(e) {
        e.preventDefault();
        
        axios.delete(`http://localhost:5000/order/delete/${this.props.match.params.orderId}`)
        .then(response => {
            window.location = '/adminViewOrder'
            alert('Data successfully Deleted!!!')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
         
      }

    render() {
        return (
            <div className="wrapper" style={{backgroundColor:'rgba(0,0,0,0.25)',height:'753px'}}>
                <Sidebar/> 
                <div>
                    <h1 className="heading">Generate Monthly Sales Report</h1>
                    <div>
                        <div className="orderUpdateCont">
                            <form style={{padding:'20px'}} onSubmit={this.onSubmit}>
                                <div class="form-group row updateOrdRow" style={{width:'500px',marginTop:'30px'}}>
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Sales Year</label>
                                    <div class="col-6">
                                    <Select options={this.state.year} placeholder='Select the Year' onChange={this.onYearChange} className="basic-single reportSelect" />
                                    </div>
                                </div><br/><br/><br/>
                                <div class="form-group row updateOrdRow" style={{width:'500px'}}>
                                    <label for="form-control-orderId" class="col-4 form-label updateLabel">Sales Month</label>
                                    <div class="col-6">
                                    <Select options={this.state.month} placeholder='Select the Month' onChange={this.onMonthChange} className="basic-single reportSelect"/>
                                    </div>
                                </div><br/><br/><br/><br/><br/><br/>
                                
                                <button type="submit" class="dark-btn">Generate Report</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
