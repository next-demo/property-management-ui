import { Component } from "react";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { myAxios } from "../services/helper";
export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {},
    isError: false,
    customerform: true
  };

  // handle change
  handleChange = (event, property) => {
    //dynamic setting the values
    this.setState({ ...this.state, [property]: event.target.value });
  };

  //reseting the form
  resetData = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
    });
  };

  //submit the form
  submitForm = (event) => {
    event.preventDefault();

    if(this.state.isError){
      toast.error("Form data is invalid , correct all details then submit. ");
      this.setState({isError:false})
      return;
    }

    console.log(this.state);
    //data validate

    // Creating newUser Object...
    const newUser = {
      name: this.state.name,
      contactdetail: this.state.email,
      password: this.state.password,
    };

    //call server api for sending data
    if(this.state.customerform){
      signUp(newUser)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("Customer is registered successfully !! Customer id " + resp.id);
        this.setState({
          name: "",
          email: "",
          password: "",

        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle errors in proper way
        this.setState({
          errors: error,
          isError: true,
        });
      });
    }
    else{
      myAxios.post("/api/owner/",newUser)
      .then((resp) => {
        console.log(resp.data);
        console.log("success log");
        toast.success("Owner is registered successfully !! Owner id " + resp.id);
        this.setState({
          name: "",
          email: "",
          password: "",

        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle errors in proper way
        this.setState({
          errors: error,
          isError: true,
        });
      });
    }
    
  };
  render() {

    const customerSignUp = (
      <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(data) } */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Fill Information to Register !!</h3>
                <h4>Customer Form</h4>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={this.submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => this.handleChange(e, "name")}
                      value={this.state.name}
                      invalid={
                        this.state.errors?.response?.data?.error ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.error}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => this.handleChange(e, "email")}
                      value={this.state.email}
                      invalid={
                        this.state.errors?.response?.data?.email ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => this.handleChange(e, "password")}
                      value={this.state.password}
                      invalid={
                        this.state.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button
                      onClick={this.resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                    
                  </Container>

                  <Container className="text-center">
                    <Button
                    color="primary"
                    className="mt-2"
                    onClick={()=> this.setState({customerform:true})}>
                      Customer SignUp
                    </Button>
                    {"   "}
                    <Button
                    color="primary"
                    className="mt-2"
                    onClick={()=> this.setState({customerform:false})}>
                      Owner SignUp
                    </Button>

                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );

    const OwnerSignUp = (
      <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(data) } */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Fill Information to Register !!</h3>
                <h4>Owner Form</h4>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={this.submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => this.handleChange(e, "name")}
                      value={this.state.name}
                      invalid={
                        this.state.errors?.response?.data?.name ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => this.handleChange(e, "email")}
                      value={this.state.email}
                      invalid={
                        this.state.errors?.response?.data?.email ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => this.handleChange(e, "password")}
                      value={this.state.password}
                      invalid={
                        this.state.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {this.state.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button
                      onClick={this.resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                    
                  </Container>

                  <Container className="text-center">
                    <Button
                    color="primary"
                    className="mt-2"
                    onClick={()=> this.setState({customerform:true})}>
                      Customer SignUp
                    </Button>
                    {"   "}
                    <Button
                    color="primary"
                    className="mt-2"
                    onClick={()=> this.setState({customerform:false})}>
                      Owner SignUp
                    </Button>

                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    return (
      <Base>
        <div>
          {this.state.customerform ? customerSignUp : OwnerSignUp}
        </div>
      </Base>
    );
  };
}

