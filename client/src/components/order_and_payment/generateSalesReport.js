import React, { Component } from 'react'
import Sidebar from '../Navigation/Sidebar';
import '../../css/payment.css'
import axios from 'axios';
import Select from 'react-select';
import { PDFDownloadLink,Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dateformat from 'dateformat';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '21cm',
        height: '29.7cm',
    },
    section: {
        height: '29.7cm',
        width: '6.5cm',
        backgroundColor: '#000',
        paddingBottom: '25px',
        paddingTop: '25px',
    },
    section2: {
        height: '29.7cm',
        width: '15cm',
        marginLeft: '25px',
        marginRight: '35px',
        marginBottom: '25px',
        marginTop: '25px',
    },
    head1:{
        fontSize:25,
        color:'white',
        marginLeft:-150,
        fontWeight:'extrabold'
    },
    head2:{
        fontSize:15,
        color:'goldenrod',
        marginLeft:-150,
        fontWeight:'extrabold'
    },
    textHead: {
        fontSize: '8px',
        textAlign: 'center'
    },
    salesH:{
        fontWeight:'demibold',
        marginBottom:30,
        textTransform:'uppercase',
    },
    dHead:{
        fontSize:14,
    },
    dValue:{
        fontSize:12,
    }
});

const initialState = {
    month:[{value:'August',label:'August'},{value:'September',label:'September'},{value:'October',label:'October'}],
    year:[{value:'2021',label:'2021'}],
    selectedMonth:'',
    selectedYear:'',
    salesAmount:0,      
    orders: [],
    linkView:false,      
}

export default class admin_generate_sales_report extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onMonthChange = this.onMonthChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.state = initialState;
    }

    onMonthChange(e) {
        this.setState({ selectedMonth: e.value });
    }
    onYearChange(e) {
        this.setState({ selectedYear: e.value });
    }   
    
    MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={{transform:'rotate(270deg)'}}>
                        <Text style={styles.head1}>
                            MOBILEZONE
                        </Text>
                        <Text style={styles.head2}>
                            BY CODE REBELS
                        </Text>
                    </View>
                </View>
                <View style={styles.section2}>
                    <Text style={styles.salesH}>
                        {this.state.selectedMonth} SALES REPORT
                    </Text>
                    <View>
                        {this.state.orders.length > 0 && this.state.orders.map((item, index) => (
                        <View style={{marginBottom:20}}>
                            <Text style={styles.dValue}>
                                Order ID: {item.orderId}
                            </Text>
                            <Text style={styles.dValue}>
                                User: {item.user}
                            </Text>
                            <Text style={styles.dValue}>
                                Order Date: {dateformat(new Date(item.orderDate),"dd-mmm-yyyy")}
                            </Text>
                            <Text style={styles.dValue}>
                                Order Total: Rs.{item.totalCharge}
                            </Text>
                            <Text style={styles.dValue}>
                                Payment Status: {item.paymentStatus}
                            </Text>
                            <Text style={styles.dValue}>
                                Delivery Status: {item.deliveryStatus}
                            </Text>
                        </View>
                        ))} 
                    </View>
                    <Text style={{fontSize:15}}>
                        Total Sales: Rs.{this.state.salesAmount}
                    </Text>
                </View>
            </Page>
        </Document>
    );

    onSubmit(e) {
        e.preventDefault();
        
        axios.get(`http://localhost:5000/order/report/${this.state.selectedMonth}/${this.state.selectedYear}`)
        .then(response => {
            this.setState({salesAmount:response.data.data[0].totalAmount})
            axios.get(`http://localhost:5000/order/reportOrderDetails/${this.state.selectedMonth}/${this.state.selectedYear}`)
            .then(response2 => {
                this.setState({ orders: response2.data.data })
                alert('Report successfully Generated!')
                this.setState({ linkView: true })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
         
      }

    render() {
        return (
            <div className="wrapper" >
                <Sidebar/> 
                <div className="adminhome-container" style={{backgroundColor:'rgba(0,0,0,0.25)'}}>
          <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-coins"></i> &nbsp;&nbsp;Sales Report
              </a>
            </h1>
            
          </div>
                    <div>
                        <div className="orderUpdateCont" style={{ marginTop: "30%",marginBottom: "30%"  }}>
                            <form style={{padding:'20px', overflow: "visible"}} onSubmit={this.onSubmit}  >
                                <div class="form-group row updateOrdRow" style={{width:'500px',marginTop:'30px', marginBottom: "5px" }}>
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
                                <br/>
                                {this.state.linkView == true &&
                                    <PDFDownloadLink document={<this.MyDocument />} fileName='Sales_Report.pdf'>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Download!'
                                    }
                                    </PDFDownloadLink>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
