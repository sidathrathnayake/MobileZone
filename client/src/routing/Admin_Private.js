import {Redirect, Route} from 'react-router-dom';



const Admin_Private = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("adminToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/"/>
                    )                
            }
        />
    );
};

export default Admin_Private;