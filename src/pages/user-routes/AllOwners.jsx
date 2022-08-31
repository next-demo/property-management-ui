import React from "react";
import Base from '../../components/Base'
import { myAxios } from "../../services/helper";
import { toast } from "react-toastify";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { doLogin } from "../../auth";
class AllOwner extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      owner: [],
      id:"",
    ownerlist:true,
    updatedName:"",
    updateContactDetails:"",
    updatedPassword:""
    }
  }

  componentDidMount(){
    
    myAxios.get("/api/owner/list").then((res)=>{
        console.log(res.data)
        this.setState({owner: res.data});
      })
    
  }

  DeleteOwner =(index)=>{
    console.log(index)
    //delete api
    myAxios.delete("/api/owner/"+index.ownerId)
    .then((resp) =>{
      toast.success(resp.data.message +"of owner id "+ index.ownerId);
      this.componentDidMount();
    })
    .catch(e=>{
      console.log(e);
    })
    
  }

  handleCustomerName = event => {
      const { value } = event.target;
      if (value != null) {
        this.setState({ updatedName: value});
      }
    };
  
    handleDetails = event => {
      const { value } = event.target;
      if (value != null) {
        this.setState({ updateContactDetails: value});
      }
    };
  
    handlepassword = event => {
      const { value } = event.target;
      if (value != null) {
        this.setState({ updatedPassword: value});
      }
    };

    handleUpdateCustomer=(owner)=>{
      console.log(owner);
      this.setState({
        ownerlist:false,
        id:owner.ownerId,
        updatedName:owner.name,
        updateContactDetails:owner.contactdetail,
      });
     }
    handleSubmit=e=>{
      e.preventDefault();
      
      const updatedCustomer = {
        name:this.state.updatedName ,
        contactdetail: this.state.updateContactDetails,
        password: this.state.updatedPassword,
      };
        console.log(updatedCustomer)
        
        myAxios.put(
          "/api/owner/"+ this.state.id,updatedCustomer
        )
        .then(response => {
          toast.success("Updated Successfully !! Owner id "+response.data.ownerId)
          console.log(response.data);
          this.setState({
              ownerlist:true,
            })
            this.componentDidMount();
      })
      .catch(error =>{
        console.log(error);

          console.log(error.message);
          toast.error(error.message);
      })
      
    }
  render(){

    const updateCustomer = (
    <div className="d-flex justify-content-center mt-3">
          <div className="card bg-light mb-3">
            <div className="card-header">
              <h3 className="d-flex justify-content-center">Update profile</h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="trainNumber">Owner Id</label>
                      <input
                        type="name"
                        className="form-control"
                        id="trainNumber"
                        value={this.state.id}
                        readOnly
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="trainName">Owner Name</label>
                      <input
                        type="name"
                        className="form-control"
                        id="trainName"
                        onChange={this.handleCustomerName}
                        value={this.state.updatedName}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="inputState">Contact Details</label>
                      <input
                        id="contact-details"
                        className="form-control"
                        onChange={this.handleDetails}
                        value={this.state.updateContactDetails}
                        required
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="inputState">Password</label>
                      <input
                        id="password"
                        type={"password"}
                        className="form-control"
                        onChange={this.handlepassword}
                        value={this.state.updatedPassword}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <button
                      type="submit"
                      value="createTicket"
                      className="btn btn-dark btn-lg btn-block"
                      onClick={this.handleSubmit}
                    >
                      Update 
                    </button>
                  </div>
                </form>
              </h5>
            </div>
          </div>
        </div>
  );

  const AllOwner = (
        <div>
             <h2 className="text-center">Owner List</h2>
             <div className = "row">
                <a  href="/add-owner" className="btn btn-primary" style={{width:'176px',marginLeft:'20px'}}> Add Owner</a>
             </div>
             <br></br>
             <div className = "row" style={{marginLeft:'30px'}}>
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr >
                                <th>Owner Id</th>
                                <th>Owner Name</th>
                                <th>Owner Contact Detail</th>
                                
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.owner.map(
                                    owner => 
                                    <tr >
                                         <td> { owner.ownerId} </td>   
                                         <td> { owner.name} </td>   
                                         <td> {owner.contactdetail}</td>
                                        
                                         <td>
                                             <button className="btn btn-info" onClick={this.handleUpdateCustomer.bind(this,owner)}>Update </button>
                                             <button style={{marginLeft: "5px"}} className="btn btn-danger" onClick={this.DeleteOwner.bind(this,owner)}>Delete </button>
                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

             </div>

        </div>
    
  )
    return (

      <div>
      <Base>
      
          {this.state.ownerlist ? AllOwner : updateCustomer}
      </Base>
    </div>
        
    )

    
  }
}
export default AllOwner;