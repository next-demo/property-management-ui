import { Component } from "react";
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
import { toast } from "react-toastify";
import Base from '../../components/Base'

import { useNavigate } from "react-router-dom";
import { myAxios } from "../../services/helper";
 class AddOwner extends Component {
    state = {
      name: "",
      email: "",
      password: "",
      errors: {
        message:"",
        field:""
      },
      isError: false,
      updateCustomer:false,
    updatedName:"",
    updateContactDetails:"",
    updatedPassword:""
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
      console.log(newUser)
      //call server api for sending data
        myAxios.post("/api/owner/",newUser)
        .then((resp) => {
          console.log(resp.data);
          console.log("success log");
          toast.success("Owner is Added successfully !! Owner id " + resp.data.ownerId);
          this.setState({
            name: "",
            email: "",
            password: "",
  
          });
          this.props.navigate("/user/owner-list");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          //handle errors in proper way
          const err = error.response.data.errors
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
          
        });
      
    };

render() {
  
    return(
    <Base>
    <Container>
      <Row className="mt-4">
        {/* { JSON.stringify(data) } */}

        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3> Fill Information of Owner</h3>
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
                      (this.state.errors?.field === "name")?  true : false
                    }
                  />

                  <FormFeedback>
                    {this.state.errors?.message}
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
                      this.state.errors?.field === "contactdetail" ? true : false
                    }
                  />

                  <FormFeedback>
                    {this.state.errors?.message}
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
                      this.state.errors?.field === "password" ? true : false
                    }
                  />

                  <FormFeedback>
                    {this.state.errors?.message}
                  </FormFeedback>
                </FormGroup>

                <Container className="text-center">
                  <Button outline color="light">
                    Add Owner
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

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </Base>
   );
 }


}


function withMyHook(AddOwner) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <AddOwner {...props} navigate={navigate} />;
  }
}
export default withMyHook(AddOwner);

