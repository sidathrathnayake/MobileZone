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

import Read_User from './components/Read/Read_User';
import Footer from './components/Footer/Footer';
import Admin_Navigation from './components/Navigation/Admin_Navigation';
import Admin_Login from './components/Login/Admin_Login';
import User_Login from './components/Login/User_Login';
import User_Register from './components/Register/User_Regiseter';
import Admin_Reset_Password from './components/Reset_Password/Admin_Reset_Password';
import Normal_Cover from './components/CoverImage/Normal_Cover';
import Normal_Home from './components/Home/Normal_Home';
import Admin_Home from './components/Home/Admin_Home';
/**Viraj Imports */
import Category_Insert from './components/Category/Category_Insert';
import Category_ViewAdmin from './components/Category/Category_ViewAdmin';
import Category_Update from './components/Category/Category_Update';
import Category_Delete from './components/Category/Category_Delete';
import Category_ViewCustomer from './components/Category/Category_ViewCustomer';
import ItemV_ViewCustomer from './components/Category/ItemV_ViewCustomer';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import example from './components/Category/example';


const App = () => {

  return (

    <Router>
      <div className="app">
        <Switch>

            <Route exact path="/" component={Normal_Home}/>
            <Route exact path="/userlogin" component={User_Login}/>
            <Route exact path="/userregister" component={User_Register}/>
            <Route exact path="/adminhome" component={Admin_Home}/>
            <Route exact path="/userdetails" component={Read_User}/>

            {/* Viraj Paths */}
            <Route exact path="/create-category" component={Category_Insert}/>
            <Route exact path="/view-category-admin" component={Category_ViewAdmin}/>
            <Route exact path="/update-before-category/:categoryName" component={Category_Update}/>
            <Route exact path="/delete-before-category/:categoryName" component={Category_Delete}/>
            <Route exact path="/view-category-customer" component={Category_ViewCustomer}/>

            <Route exact path="/view-item-customer/:categoryName" component={ItemV_ViewCustomer}/>
            <Route exact path="/view-product/:id" component={ProductScreen}/>
            {/* <Route exact path="/view-product/:id" component={example}/> */}
            <Route exact path="/cart" component={CartScreen}/>
            
            
        </Switch>   
      </div>
    </Router>

  )

}


export default App;
