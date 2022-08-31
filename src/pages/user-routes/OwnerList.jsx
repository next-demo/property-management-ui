import React from "react";
import Base from '../../components/Base'
import { myAxios } from "../../services/helper";

class OwnerList extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      owner: []
    }
  }

  componentDidMount(){
    
    myAxios.get("/api/properties").then((res)=>{
        console.log(res.data)
        this.setState({owner: res.data["details"]});
      })
    
  }
  render(){
    return (
        <Base>
        <div>
             <h2 className="text-center">Owner List</h2>
             <div className = "row">
                <a  href="/addcustomer" className="btn btn-primary" style={{width:'176px',marginLeft:'20px'}} onClick={""}> Add Owner</a>
             </div>
             <br></br>
             <div className = "row" style={{marginLeft:'30px'}}>
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr >
                                <th>Owner Id</th>
                                <th>Owner Name</th>
                                <th>Owner Contact Detail</th>
                                
                                <th>Owner Property </th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.owner.map(
                                    owner => 
                                    <tr >
                                         <td> { owner.owner.ownerId} </td>   
                                         <td> { owner.owner.name} </td>   
                                         <td> {owner.owner.contactdetail}</td>
                                      
                                         <td> {owner.apartmenttype}</td>
                                         <td>
                                             <a  href="/updatecustomer"className="btn btn-info">Update </a>
                                             <button style={{marginLeft: "5px"}} className="btn btn-danger" onClick={this.DeleteCustomer}>Delete </button>
                                         </td>
                                    </tr>
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
export default OwnerList;