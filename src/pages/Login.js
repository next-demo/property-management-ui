import { Component, useState } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  ButtonGroup
} from "reactstrap";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";
import { doLogin, getCurrentUserDetail, isLoggedIn } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import { myAxios } from "../services/helper";

class Login extends Component {
  state = {
    username: "",
    password: "",
    rSelected: null
  };

  handleChange = (event, field) => {
    let actualValue = event.target.value;
    this.setState({
      ...this.state,
      [field]: actualValue,
    });
  };

  handleReset = () => {
    this.setState({
      username: "",
      password: "",
    });
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    //validation
    if (
      this.state.username.trim() == "" ||
      this.state.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    if(this.state.rSelected==="Customer"){
      loginUser(this.state).then((data) => {
      console.log(data)
      const user =({
        name:data.customer.name,
        contactdetail:data.customer.contactdetail,
        ownerId:data.customer.id,
        type:"Customer",
        token:data.token,
      })
      //save the data to localstorage
      doLogin(user, () => {
        console.log("login detail is saved to localstorage")
        this.props.navigate("/user/customer-dashboard");
      })

      toast.success("Login Success")
    }).catch(error => {
      console.log(error)
      if (error.response.status == 400 || error.response.status == 404) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.response.data.message)
      }

    })
    }
    else if(this.state.rSelected === "Owner"){
      myAxios
      .get("/api/owner/login/"+this.state.username)
      .then((response) => {
        console.log(response.data)
        
        if(response.data.password != this.state.password){
          toast.error("Your password is incorrect")
          return;
        }
        const user =({
          name:response.data.name,
          contactdetail:response.data.contactdetail,
          ownerId:response.data.ownerId,
          type:"Owner",
        })
        //save the data to localstorage
        doLogin(user, () => {
          console.log("login detail is saved to localstorage")
          this.props.navigate("/user/owner-dashboard");

        })
  
        toast.success("Login Success")
      }).catch(error => {
        console.log(error)
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Something went wrong  on sever !!")
        }
  
      })
    }
    else if(this.state.rSelected ==="Admin"){
      // if(isLoggedIn() && getCurrentUserDetail().type==="Admin"){
      //   if(this.state.username==="manas840@gmail.com"|| this.state.password==="manasgupta1"){
      //     const user =({
      //       name:"Manas Gupta",
      //       contactdetail:"manas840@gmail.com",
      //       ownerId:"200",
      //       type:"Admin",
      //     })
      //     //save the data to localstorage
      //     doLogin(user, () => {
      //       console.log("login detail is saved to localstorage")
      //     })
    
      //     toast.success("Login Success")
      //   }
      // }
      if(this.state.username==="manas840@gmail.com"|| this.state.password==="manasgupta1"){
        const user =({
          name:"Manas Gupta",
          contactdetail:"manas840@gmail.com",
          ownerId:"200",
          type:"Admin",
        })
        //save the data to localstorage
        doLogin(user, () => {
          console.log("login detail is saved to localstorage")
          this.props.navigate("/user/admin-dashboard");
        })
  
        toast.success("Login Success")
      }
    }
    else{
      toast.error("Please select the type of User");
      this.setState({
        username: "",
        password: "",
        rSelected: null
      })
      return;
    }
    

  };
  render() {

    return (
      <Base>
        <Container>
          <Row className="mt-4">
            <Col
              sm={{
                size: 6,
                offset: 3,
              }}
            >
              <ButtonGroup>
                <Button
                  color="primary"
                  outline
                  onClick={() => this.setState({rSelected:"Customer"})}
                  active={this.state.rSelected === "Customer"}
                >
                  Customer
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={() => this.setState({rSelected:"Owner"})}
                  active={this.rSelected === "Owner"}
                >
                  Owner
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={() => this.setState({rSelected:"Admin"})}
                  active={this.rSelected === "Admin"}
                >
                  Admin
                </Button>
              </ButtonGroup>
              <Card color="dark" inverse>
                <CardHeader>
                  <h3>Login Here !!</h3>
                  <h4>{this.state.rSelected}</h4>
                </CardHeader>

                <CardBody>
                  <Form onSubmit={this.handleFormSubmit}>
                    {/* Email field */}

                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input
                        type="text"
                        id="email"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e, "username")}
                      />
                    </FormGroup>

                    {/* password field */}

                    <FormGroup>
                      <Label for="password">Enter password</Label>
                      <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e, "password")}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button color="light" outline
                      disabled={this.state.username.length === 0 || this.state.password.length === 0}>
                        Login
                      </Button>
                      <Button 
                      onClick={this.handleReset} className="ms-2" outline color="secondary"
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    );
  };

}

function withMyHook(Login) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
  }
}
export default withMyHook(Login);