import Base from '../../components/Base'
// import './Admin.css'
import{NavLink as ReactLink} from "react-router-dom";
import {Button} from "reactstrap";

const Admin= ()=>{

    return(
        
        <div>
            
            <div className="blue">
            
             <div className="container">
             <div className="admin-details">
                <span style={{fontSize:"20px" }}><h4>Admin Dashboard</h4>
                </span>
            </div> 
            <div className="second-container"><img style={{width:"60%",height:"100%",float:"right"}}
            src="https://images.emojiterra.com/google/noto-emoji/v2.034/share/1f3e0.jpg"/>
            {/* <button className="first-button" onClick={handleproperty}>Property detail</button> */}
            <Button
                color="primary"
                href="/properties-list"
                tag="a"
                className="ms-2"
            >
                    Property list
            </Button>
            <Button
                color="primary"
                href="/user/all-properties"
                tag="a"
                className="ms-2"
            >
                    All Property list
            </Button>
            <Button
                color="primary"
                href="/user/sold-properties"
                tag="a"
                className="ms-2"
            >
                    Sold Properties
            </Button>
            <Button
                color="primary"
                href="/user/customer-list"
                tag="a"
                className="ms-2 mt-3"
            >
                   Customer detail
            </Button>
            <Button
                color="primary"
                href="/user/owner-properties"
                tag="a"
                className="ms-2 mt-3"
            >
                  Owner Properties
            </Button>
            
            <Button
                color="primary"
                href="/user/owner-list"
                tag="a"
                className="ms-2 mt-3"
            >
                  Owner details
            </Button>
            </div>
             </div>

    </div>
    </div>
    
    )
    
}
export default Admin;