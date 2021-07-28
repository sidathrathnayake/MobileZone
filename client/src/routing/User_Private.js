import {Redirect, Route} from 'react-router-dom';



const UserPrivate = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => 
                    localStorage.getItem("userToken") ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to="/"/>
                    )                
            }
        />
    );
};

export default UserPrivate;