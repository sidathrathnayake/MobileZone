/* eslint-disable no-unused-vars */
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import './css/table.css';
import './css/font.css';
import './css/container.css';
import './css/footer.css';
import './css/nav.css';
import './css/style.css';
import './css/insert.css';
import './css/cover_slide.css';
import './css/sidebar.css';
import './css/admincard.css';
import './css/usercard.css';
import './css/payment.css';
import './css/pdfpage.css';

import Read_User from './components/Read/Read_User';
import Admin_Login from './components/Login/Admin_Login';
import User_Login from './components/Login/User_Login';
import User_Register from './components/Register/User_Regiseter';
import Normal_Home from './components/Home/Normal_Home';
import Admin_Home from './components/Home/Admin_Home';
import User_Home from './components/Home/User_Home';
import User_Reset_Password from './components/Reset_Password/User_Reset_Password';
import Admin_Reset_Password from './components/Reset_Password/Admin_Reset_Password';
import User_Profile from './components/Profile/User_Profile';
import User_Update from './components/Profile/User_Update';
import User_PDF from './components/Read/User_PDF';

/**Viraj Imports */
/**Importing the Category_Insert component */
import Category_Insert from './components/Category/Category_Insert';
/**Importing the Category_ViewAdmin component */
import Category_ViewAdmin from './components/Category/Category_ViewAdmin';
/**Importing the Category_Update component */
import Category_Update from './components/Category/Category_Update';
/**Importing the Category_Delete component */
import Category_Delete from './components/Category/Category_Delete';
/**Importing the Category_ViewCustomer component */
import Category_ViewCustomer from './components/Category/Category_ViewCustomer';
/**Importing the ItemV_ViewCustomer component */
import ItemV_ViewCustomer from './components/Category/ItemV_ViewCustomer';
/**Importing the ProductScreen component */
import ProductScreen from './screens/ProductScreen';
/**Importing the CartScreen component */
import CartScreen from './screens/CartScreen';
import Category_ViewCustomer_Logged from './components/Category/Category_ViewCustomer_Logged';
import ProductScreen_Logged from './screens/ProductScreen_Logged';

/**Dhananajaya*/
import InsertItem from "./components/Item/InsertItem";
import UserViewItem from "./components/Item/UserViewItem";
import AdminItemView from "./components/Item/AdminItemView";
import ItemByCategory from "./components/Item/ItemByCategory";
import UserViewItemLogged from "./components/Item/UserViewItemLogged";
import ItemByCategoryLogged from "./components/Item/ItemByCategoryLogged";
import UpdateItem from './components/Item/UpdateItem';
import ItemReport from './components/Item/ItemReport'

/**Yathushan*/
import Shipping_Address from './components/order_and_payment/shippingAddress';
import Payment_Type from './components/order_and_payment/payment_type';
import placeOrder from './components/order_and_payment/place_order';
import orderSummary from './components/order_and_payment/order_summary';
import userViewOrders from './components/order_and_payment/user_view_orders';
import Admin_View_Orders from './components/order_and_payment/admin_view_orders';
import admin_update_orders from './components/order_and_payment/admin_order_update';
import admin_delete_orders from './components/order_and_payment/admin_order_delete';
import admin_generate_sales_report from './components/order_and_payment/generateSalesReport';

const App = () => {

  return (

    <Router>
      <div className="app">
        <Switch>

            <Route exact path="/" component={Normal_Home}/>
            <Route exact path="/userlogin" component={User_Login}/>
            <Route exact path="/adminlogin" component={Admin_Login}/>
            <Route exact path="/userregister" component={User_Register}/>
            <Route exact path="/adminhome" component={Admin_Home}/>
            <Route exact path="/userhome" component={User_Home}/>
            <Route exact path="/userprofile" component={User_Profile}/>
            <Route exact path="/updateuser/:id" component={User_Update}/>
            <Route exact path="/userdetails" component={Read_User}/>
            <Route exact path="/userspdf" component={User_PDF}/>
            <Route exact path="/userresetpassword/:resetToken" component={User_Reset_Password}/>
            <Route exact path="/adminresetpassword/:resetToken" component={Admin_Reset_Password}/>
        
            {/* Viraj Paths */}
            <Route exact path="/create-category" component={Category_Insert}/>
            <Route exact path="/view-category-admin" component={Category_ViewAdmin}/>
            <Route exact path="/update-before-category/:categoryName" component={Category_Update}/>
            <Route exact path="/delete-before-category/:categoryName" component={Category_Delete}/>
            <Route exact path="/view-category-customer" component={Category_ViewCustomer}/>
            <Route exact path="/view-item-customer/:categoryName" component={ItemV_ViewCustomer}/>
            <Route exact path="/view-product/:id" component={ProductScreen}/>
            <Route exact path="/cart" component={CartScreen}/>
            <Route exact path="/view-category-customer-logged" component={Category_ViewCustomer_Logged}/>
            <Route exact path="/view-product-logged/:id" component={ProductScreen_Logged}/>

             {/* Dhananajaya  */}
            <Route exact path="/add-item" component={InsertItem}/>
            <Route exact path="/user-get-item" component={UserViewItem}/>
            <Route exact path="/user-get-item/:id" component={ItemByCategory}/>
            <Route exact path="/admin-get-item" component={AdminItemView}/>
            <Route exact path="/user-get-item-logged" component={UserViewItemLogged}/>
            <Route exact path="/user-get-item-logged/:id" component={ItemByCategoryLogged}/>
            <Route exact path="/user-update-item-logged/:id" component={UpdateItem}/>
            <Route exact path="/item-report" component={ItemReport}/>

            
        
            {/* Yathushan  */}
            <Route path="/shipping" component={Shipping_Address}/>
            <Route exact path="/payType" component={Payment_Type}/>
            <Route exact path="/placeOrder" component={placeOrder}/>
            <Route exact path="/orderSum" component={orderSummary}/>
            <Route exact path="/userViewOrd" component={userViewOrders}/>
            <Route exact path="/adminViewOrder" component={Admin_View_Orders}/>
            <Route exact path="/adminUpdateOrder/:orderId" component={admin_update_orders}/>
            <Route exact path="/adminDeleteOrder/:orderId" component={admin_delete_orders}/>
            <Route exact path="/adminDeleteOrder/:orderId" component={admin_delete_orders}/>
            <Route exact path="/generateSalesReport" component={admin_generate_sales_report}/>

        </Switch>   
      </div>
    </Router>

  )

}


export default App;
