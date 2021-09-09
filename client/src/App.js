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
import InsertItem from "./components/Item/InsertItem";
import UserViewItem from "./components/Item/UserViewItem";
import AdminItemView from "./components/Item/AdminItemView";
import ItemByCategory from "./components/Item/ItemByCategory";

const App = () => {

  return (

    <Router>
      <div className="app">
        <Switch>

            <Route exact path="/" component={Normal_Cover}/>
            <Route exact path="/userlogin" component={User_Login}/>
            <Route exact path="/userregister" component={User_Register}/>
            <Route exact path="/adminhome" component={Admin_Home}/>



            <Route exact path="/userdetails" component={Read_User}/>
            /** Dhananajaya */
            <Route exact path="/add-item" component={InsertItem}/>
            <Route exact path="/user-get-item" component={UserViewItem}/>
            <Route exact path="/user-get-item/:id" component={ItemByCategory}/>
            <Route exact path="/admin-get-item" component={AdminItemView}/>
        </Switch>   
      </div>
    </Router>

  )

}


export default App;
