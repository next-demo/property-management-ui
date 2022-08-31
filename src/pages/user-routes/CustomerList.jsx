import React from "react";
import Base from '../../components/Base'
import { myAxios } from "../../services/helper";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";

class CustomerList extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      customer: [],
      id:"",
    customerlist:true,
    updatedName:"",
    updateContactDetails:"",
    updatedPassword:""
    }
  }

  componentDidMount(){
    
    myAxios.get("/api/customers/").then((res)=>{
      console.log(res.data);
        this.setState({customer: res.data});
      })
    
  }
  DeleteCustomer =(index)=>{
    console.log(index)
    //delete api
    myAxios.delete("/api/customers/"+index.id)
    .then((resp) =>{
      toast.success(resp.data.message +"of customer id "+ index.id);
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
      customerlist:false,
      id:owner.id,
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
      
      myAxios.put(
        "/api/customers/"+ this.state.id,updatedCustomer
      )
      .then(response => {
        toast.success("Updated Successfully !! Customer id "+response.data.id)
        console.log(response.data);
        this.setState({
          customerlist:true,
        })
        this.componentDidMount();
    })
    .catch(error =>{
      console.log(error);
      const err = error.response.data.errors;
      err.map((e) =>{
        this.setState({
        errors: {
          message:e.defaultMessage,
          field:e.field
        },
        isError: true,
      });
      toast.error("In "+e.field+" "+ e.defaultMessage);
      })
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
                        <label htmlFor="trainNumber">Customer Id</label>
                        <input
                          type="name"
                          className="form-control"
                          id="trainNumber"
                          value={this.state.id}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="trainName">Customer Name</label>
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

    const AllCustomer = (

      <div>
             <h2 className="text-center">Customers List</h2>
             <div className = "row">
                <a  href="/add-customer" className="btn btn-primary" style={{width:'176px',marginLeft:'20px'}}> Add customer</a>
             </div>
             <br></br>
             <div className = "row" style={{marginLeft:'30px'}}>
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr >
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>Customer Contact Detail</th>
                                <th>Customer Password</th>
                                <th>Owner name</th>
                                {/* <th>Owner Id </th> */}
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customer.map(
                                    customer => 
                                    <tr >
                                         <td> { customer.id} </td>   
                                         <td> { customer.name} </td>   
                                         <td> {customer.contactdetail}</td>
                                         <td> {customer.password}</td>
                                         <td> {customer.owner===null ? "No Owner": customer.owner.name}</td>
                                         <td>
                                             <button className="btn btn-info" onClick={this.handleUpdateCustomer.bind(this,customer)}>Update </button>
                                             <button style={{marginLeft: "5px"}} className="btn btn-danger" onClick={this.DeleteCustomer.bind(this,customer)}>Delete </button>
                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

             </div>

        </div>
    );
    return (
        <Base>
            {this.state.customerlist ? AllCustomer : updateCustomer}
        </Base>
    )

    
  }
}
export default CustomerList;