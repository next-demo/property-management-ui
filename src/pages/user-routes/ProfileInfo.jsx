import React, { Component } from 'react'
import Base from '../../components/Base'
import userimage from '../../assest/user-setting-male.png'
import { doLogin, getCurrentUserDetail } from '../../auth';
import { toast } from "react-toastify";
import { myAxios } from '../../services/helper';
export default class ProfileInfo extends Component{

  state={
    name:getCurrentUserDetail().name,
    contact_detail:getCurrentUserDetail().contactdetail,
    id:getCurrentUserDetail().ownerId,
    type:getCurrentUserDetail().type,
    updateCustomer:false,
    updatedName:"",
    updateContactDetails:"",
    updatedPassword:""
  }
  handleUpdateCustomer=()=>{
     this.setState({
      updateCustomer:true
     });
     console.log(this.state.updateCustomer)
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
    handleSubmit=e=>{
      e.preventDefault();
      
      const updatedCustomer = {
        name:this.state.updatedName ,
        contactdetail: this.state.updateContactDetails,
        password: this.state.updatedPassword,
      };

      if(this.state.type === "Owner"){
        console.log(updatedCustomer)
        
        myAxios.put(
          "/api/owner/"+ this.state.id,updatedCustomer
        )
        .then(response => {
          toast.success("Updated Successfully !! Owner id "+response.data.ownerId)
          console.log(response.data);
          const user =({
            name:response.data.name,
            contactdetail:response.data.contactdetail,
            ownerId:response.data.ownerId,
            type:"Owner",
          })
          //save the data to localstorage
          doLogin(user, () => {
            console.log("login detail is saved to localstorage")
            // this.props.navigation("/user/dashboard");
          })
          return response.data;
      })
      .catch(error =>{
        console.log(error);

          console.log(error.message);
          toast.error(error.message);
      })
      }
      else if(this.state.type ==="Customer"){
        console.log(updatedCustomer)
        
        myAxios.put(
          "/api/customers/"+ this.state.id,updatedCustomer
        )
        .then(response => {
          toast.success("Updated Successfully !! Customer id "+response.data.id)
          console.log(response.data);
          const user =({
            name:response.data.name,
            contactdetail:response.data.contactdetail,
            ownerId:response.data.id,
            type:"Customer",
          })
          //save the data to localstorage
          doLogin(user, () => {
            console.log("login detail is saved to localstorage")
            // this.props.navigation("/user/dashboard");
          })
          return response.data;
      })
      .catch(error =>{
        console.log(error);

          console.log(error.message);
          toast.error(error.message);
      })

      }
      else{
        console.log(updatedCustomer);
        const user =({
          name:this.state.updatedName,
          contactdetail:this.state.updateContactDetails,
          ownerId:this.state.id,
          password:this.state.updatedPassword,
          type:"Admin",
        })
        //save the data to localstorage
        doLogin(user, () => {
          toast.success("Updated Successfully !! Admin id "+user.ownerId)
          console.log("login detail is saved to localstorage")
          // this.props.navigation("/user/dashboard");
        })
      }

      
    }
  render(){
    const customerProfile =(
      <div className="d-flex justify-content-center mt-4">
        <div className="card bg-light mb-3">
          <div className="card-header">
          <img
                src={userimage}
                width="63"
                height="62"
                className="d-inline-block align-center"
                alt="user-logo"
              />
            <h3 className="d-flex justify-content-center">{this.state.type} Profile</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row">
                  <div className="col ">
                    <h3 className="d-flex justify-content-center">
                      <b> Name: {this.state.name}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="col">
                    <h3 className="d-flex justify-content-center">
                      <b>Login Details: {this.state.contact_detail}</b>
                    </h3>
                  </div>

                  <hr />
                  <br />
                  <div className="col">
                    <h3 className="d-flex justify-content-center">
                      <b>Id: {this.state.id}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <br />
                <div>
                  <button
                    className='d-flex justify-content-center'
                    size="sm"
                    onClick={this.handleUpdateCustomer}
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
                        <label htmlFor="trainNumber">{this.state.type} Id</label>
                        <input
                          type="name"
                          className="form-control"
                          id="trainNumber"
                          value={this.state.id}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="trainName">{this.state.type} Name</label>
                        <input
                          type="name"
                          className="form-control"
                          id="trainName"
                          onChange={this.handleCustomerName}
                          value={this.state.upatedName}
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
                      >
                        Update {this.state.type}
                      </button>
                    </div>
                  </form>
                </h5>
              </div>
            </div>
          </div>
    );
    return(
      <div>
      <Base>
      <div className="d-flex justify-content-center">
        <div>
          {this.state.updateCustomer ? updateCustomer : customerProfile}
        </div>
      </div></Base>
    </div>
    )
}
}
