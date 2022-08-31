import React, { Component } from "react";
import moment from "moment";

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
import { myAxios } from "../../services/helper";
import { toast } from "react-toastify";
import Base from "../../components/Base";
import { getCurrentUserDetail } from "../../auth";
import { useNavigate } from "react-router-dom";

class AddProperty extends Component {
    state = {
        form:"locality",
        owner:getCurrentUserDetail(),
        localityId:"",
        propertyId:"",
        apartmenttype: "",
        bhktype: "",
        floor: "",
        totalfloor: "",
        propertyage: "",
        facing: "",
        builduparea: "",
        plotArea:"",
        price: "",
        pricepersqft: "",
        description: "",
        dimension: "",
        postedon: "",
        availablefrom: "",
        city: "",
        landmark: "",
        locality: "",
        errors: {},
        isError: false,

    };
  // handle change
  handleChange = (event, eventValue) => {
    //dynamic setting the values
    console.log(event.target.value)
    this.setState({ ...this.state, [eventValue]: event.target.value });
    console.log(this.state.eventValue)
    if(this.state.eventValue===""){
      toast.error(this.state.eventValue+" can not be null ")
      this.setState({
        isError:true
      })
    }
  };

  //submit the form
  submitLocalityForm = (event) => {
    event.preventDefault();

    if (this.state.isError) {
      toast.error("Form data is invalid , correct all details then submit. ");
      this.setState({ isError: false });
      return;
    }

    console.log(this.state);
    //data validate

    // Creating newlocality Object...
    const newLocality = {
      city: this.state.city,
      landmark: this.state.landmark,
      locality: this.state.locality,
    };

    //call server api for sending data
    console.log(newLocality);

    myAxios
      .post(`/api/locality/owner/${this.state.owner.ownerId}`, newLocality)
      .then((resp) => {
        console.log(resp.data);
        console.log("success log");
        toast.success(
          "Locality Details Added successfully !! Locality id " + resp.data.locationId
        );
        this.setState({
          city: "",
          landmark: "",
          locality: "",
          localityId: resp.data.locationId,
          form:"property"
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message)
        //handle errors in proper way
        this.setState({
          errors: error,
          isError: true,
        });
      });
  };

  submitPropertyForm = (event) => {
    event.preventDefault();

    if (this.state.isError) {
      toast.error("Form data is invalid , correct all details then submit. ");
      this.setState({ isError: false });
      return;
    }

    console.log(this.state);

    //data validate

    // Creating newProperty Object...
    const newProperty = {
      apartmenttype:this.state.apartmenttype,
      bhktype:this.state.bhktype ,
      floor:this.state.floor,
      totalfloor:this.state.totalfloor ,
      propertyage:this.state.propertyage ,
      facing:this.state.facing ,
      builduparea:this.state.builduparea ,
      plotArea:this.state.plotArea ,
      pricePerSqft:this.state.pricepersqft ,
      price:this.state.price ,
      availableFrom:this.state.availablefrom ,
      postedOn:moment().format("DD-MM-YYYY"),
      dimensions:this.state.dimension ,
      description:this.state.description
    };

    //call server api for sending data
    console.log(newProperty);

    myAxios
      .post(`/api/owner/${this.state.owner.ownerId}/locality/${this.state.localityId}/properties`, newProperty)
      .then((resp) => {
        console.log(resp.data);
        console.log("success log");
        toast.success(
          "Property Details Added successfully !! Property id " + resp.data.id);
        this.props.navigate('/user/owner-dashboard')
        this.setState({
          apartmenttype: "",
          bhktype: "",
          floor: "",
          totalfloor: "",
          propertyage: "",
          facing: "",
          builduparea: "",
          price: "",
          pricepersqft: "",
          description: "",
          dimension: "",
          postedon: "",
          availablefrom: "",
          propertyId:resp.data.id,
          form:"image"
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message)
        //handle errors in proper way
        this.setState({
          errors: error,
          isError: true,
        });
      });
  }

  render() {

    const locality =(
        <div>
          <Container>
            <Row className="mt-4">
              {/* { JSON.stringify(data) } */}

              <Col sm={{ size: 6, offset: 3 }}>
                <Card color="dark" inverse>
                  <CardHeader>
                    
                    <h4>Locality Details</h4>
                  </CardHeader>

                  <CardBody>
                    {/* creating form */}

                    <Form onSubmit={this.submitLocalityForm} >
                      {/* Name field */}
                      <FormGroup>
                        <Label for="city">Enter City</Label>
                        <Input
                          type="text"
                          placeholder="Enter here"
                          id="city"
                          onChange={(e) => this.handleChange(e, "city")}
                          value={this.state.city}
                          invalid={
                            this.state.errors?.response?.data?.error
                              ? true
                              : false
                          }
                        />

                        <FormFeedback>
                          {this.state.errors?.response?.data?.error}
                        </FormFeedback>
                      </FormGroup>

                      {/* email field */}
                      <FormGroup>
                        <Label for="landmark">Enter Landmark</Label>
                        <Input
                          type="text"
                          placeholder="Enter here"
                          id="landmark"
                          onChange={(e) => this.handleChange(e, "landmark")}
                          value={this.state.landmark}
                          invalid={
                            this.state.errors?.response?.data?.landmark
                              ? true
                              : false
                          }
                        />

                        <FormFeedback>
                          {this.state.errors?.response?.data?.landmark}
                        </FormFeedback>
                      </FormGroup>

                      {/* password field */}
                      <FormGroup>
                        <Label for="locality">Enter Locality</Label>
                        <Input
                          type="text"
                          placeholder="Enter here"
                          id="locality"
                          onChange={(e) => this.handleChange(e, "locality")}
                          value={this.state.locality}
                          invalid={
                            this.state.errors?.response?.data?.locality
                              ? true
                              : false
                          }
                        />

                        <FormFeedback>
                          {this.state.errors?.response?.data?.locality}
                        </FormFeedback>
                      </FormGroup>

                      <Container className="text-center">
                        <Button outline color="light">
                          Add Locality
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
      </div>
    )
    const propertyDetails =(
      <div className="form-group-row">
        <Container>
          <Row className="mt-4">
            {/* { JSON.stringify(data) } */}

            <Col sm={{ size: 6, offset: 3 }}>
              <Card className="p-3 mb-2 bg-info text-dark">
                <CardHeader color="danger">
                  <h4>Property Details</h4>
                </CardHeader>

                <CardBody color="danger">
                  <Form onSubmit={this.submitPropertyForm}>
                    <Row>
                      <Col>
                        <div className="col-xs-4">
                          <Label for="name" color="primary">
                            Apartment Type{" "}
                          </Label>
                          <select
                            name="apartmenttype"
                            id="apartmenttype"
                            value={this.state.selectValue}
                            onChange={(e) =>
                              this.handleChange(e, "apartmenttype")
                            }
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="IndependentHouse">Independent House/Villa</option>
                            <option value="Villa">
                              Villa
                            </option>
                            <option value="Gatedcommunity">
                              Gated community/Villa
                            </option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    

                    <Row>
                      <Col>
                        <div>
                          <label for="propertyAge">Property Age* </label>

                          <select
                            name="propertyage"
                            id="propertyage"
                            value={this.state.selectValue}
                            onChange={(e) =>
                              this.handleChange(e, "propertyage")
                            }
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="Less than 1 Year">Less than 1 Year</option>
                            <option value="1 to 3 Year">1 to 3 Year</option>
                            <option value="3 to 5 Year">3 to 5 Year</option>
                            <option value="5 to 10 Year">5 to 10 Year</option>
                            <option value="more than 10 Year">more than 10 Year</option>
                          </select>
                        </div>
                      </Col>

                      <Col xs={6}>
                        <div className="col-xs-4">
                          <label for="Facing">Facing* </label>

                          <select
                            name="facing"
                            id="facing"
                            value={this.state.selectValue}
                            onChange={(e) => this.handleChange(e, "facing")}
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                            <option value="north-east">North-East</option>
                            <option value="north-west">North-West</option>
                            <option value="south-east">South-East</option>
                            <option value="south-west">South-West</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="divv1">
                          <label for="Area">Built up Area* </label>
                          <input
                            type="number"
                            id="builduparea"
                            name="builduparea"
                            placeHolder="2000"
                            onChange={(e) => this.handleChange(e, "builduparea")}
                            value={this.state.builduparea}
                            invalid={
                              this.state.errors?.response?.data?.error ? true : false
                            }
                          ></input>
                        </div>
                      </Col>
                      <Col>
                        <div className="divv2">
                          <label for="Area">Plot Area*(in Sqft) </label>
                          <input
                            type="number"
                            id="plotarea"
                            name="plotarea"
                            placeHolder="800 Sqft"
                            onChange={(e) => this.handleChange(e, "plotArea")}
                            value={this.state.plotArea}
                            invalid={
                              this.state.errors?.response?.data?.error ? true : false
                            }
                          ></input>
                        </div>
                      </Col>
                      
                    </Row>
                    <Row className="mt-4">
                    <Col>
                        <div className="">
                          <label for="price">Price( in lac) </label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            placeHolder="10 lac"
                            onChange={(e) => this.handleChange(e, "price")}
                            value={this.state.price}
                            invalid={
                              this.state.errors?.response?.data?.error ? true : false
                            }
                          ></input>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="col-xs-4">
                          <label for="perpersqft">Price Per Sqft </label>
                          <input
                            type="number"
                            id="pricepersqft"
                            name="pricepersqft"
                            placeHolder="₹ 1400 per sq. ft."
                            onChange={(e) => this.handleChange(e, "pricepersqft")}
                    value={this.state.pricepersqft}
                    invalid={
                      this.state.errors?.response?.data?.error ? true : false
                    }
                          ></input>
                        </div>
                      </Col>
                      <Col>
                        <div className="coli-xs-4">
                          <label for="price">Dimension(LxB)</label>
                          <input
                            type="text"
                            id="dimension"
                            name="dimension"
                            placeHolder="30x20 sq. ft."
                            onChange={(e) => this.handleChange(e, "dimension")}
                            value={this.state.dimension}
                            invalid={
                              this.state.errors?.response?.data?.error ? true : false
                            }
                          ></input>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <div className="col-xs-4">
                          <label for="BHK">BHK Type* </label>

                          <select
                            name="bhktype"
                            id="bhktype"
                            value={this.state.selectValue}
                            onChange={(e) => this.handleChange(e, "bhktype")}
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="1rk">1 RK</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                            <option value="4BHK">4+BHK</option>
                          </select>
                        </div>
                      </Col>

                      <Col>
                        <div className="col-xs-4">
                          <label className="a" for="Floor">
                            Floor*
                          </label>

                          <select
                            name="floor"
                            id="floor"
                            value={this.state.selectValue}
                            onChange={(e) => this.handleChange(e, "floor")}
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="ground">Ground</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </Col>

                      <Col>
                        <div className="col-xs-4">
                          <label for="TotalFloor">TotalFloor* </label>

                          <select
                            name="totalfloor"
                            id="totalfloor"
                            value={this.state.selectValue}
                            onChange={(e) => this.handleChange(e, "totalfloor")}
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          >
                            <option value="ground">Ground</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <div>
                      <Label for="availableFrom">Available From</Label>
                      <Input
                        type="date"
                        name="availablefrom"
                        placeholder="date placeholder"
                        value={this.state.selectValue}
                        onChange={(e) => this.handleChange(e, "availablefrom")}
                        invalid={
                          this.state.errors?.response?.data?.error
                            ? true
                            : false
                        }
                      />
                    </div>
                    <Row className="mt-4">
                      <Col>
                        <div className="coli-xs-4">
                          <label for="price">Description</label>
                          <input
                            type="text-area"
                            id="description"
                            name="description"
                            placeHolder="write about your property"
                            onChange={(e) =>
                              this.handleChange(e, "description")
                            }
                            value={this.state.description}
                            invalid={
                              this.state.errors?.response?.data?.error
                                ? true
                                : false
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <Container className=" mt-4 text-center">
                      <Button outline color="dark">
                        Add Property
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
      </div> 
    )
    return (
      <Base>
      {
        (this.state.form === "locality")? locality:propertyDetails
      }
      </Base>
    );
  }
}


function withMyHook(AddProperty) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <AddProperty {...props} navigate={navigate} />;
  }
}
export default withMyHook(AddProperty);