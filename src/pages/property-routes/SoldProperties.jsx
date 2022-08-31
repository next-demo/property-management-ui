

import React from "react";
import Base from "../../components/Base";

import { myAxios } from "../../services/helper";

class SoldProperties extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      property: []
    }
  }

  componentDidMount(){
    
    myAxios.get("/api/properties").then((res)=>{
        console.log(res.data)
        this.setState({property: res.data["details"]});
      })
    
  }
  render(){
    return (
        <Base>
        <div>
             <h2 className="text-center">Property List</h2>
             <br></br>
             <div className = "row" style={{marginLeft:'30px'}}>
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr >
                                <th>property Image</th>
                                <th>Owner Name</th>
                                <th>Owner Contact Detail</th>
                                <th>City</th>
                                <th>Appartment Type</th>
                                <th>Customer Name</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.property.map(
                                    owner => 
                                    {if(owner.customer !== null){ 
                                      console.log(owner);
                                    return <tr >
                                         <td><img src={`http://localhost:9090/api/property/image/${owner.imageName}`} /> </td>   
                                         <td> { owner.owner.name} </td>   
                                         <td> {owner.owner.contactdetail}</td>
                                         <td> {owner.locality.city}</td>
                                         <td> {owner.apartmenttype}</td>
                                         <td> {owner.customer.name}</td>
                                         <td>
                                             <button style={{marginLeft: "5px"}} className="btn btn-danger" onClick={this.DeleteCustomer}>Details </button>
                                         </td>
                                    </tr>
                                    }}
                                )
                            }
                        </tbody>
                    </table>

             </div>

        </div>
        </Base>
    )

    
  }
}
export default SoldProperties;