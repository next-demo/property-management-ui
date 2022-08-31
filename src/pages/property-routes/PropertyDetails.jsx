import {
    Badge,
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
  import React, { Component } from "react";
  import userimage from "../../assest/Real-Estate-PNG-Photo.png";
import Base from "../../components/Base";

  
  class PropertyDetails extends Component {
    render() {
      return (
        <Base>
        <div>
          <Card className="mt-4 " color="secondary">
            <CardBody className="">
              <Row className="mt-3">
                <Col className="col-md-2">
                  <img src={userimage} height="180" width="250" />
                </Col>

                <Col className="col-md-2">
                    <Row>
                        <Col className="mt-5">
                        <h2>
                                Price:{' '}
                                <Badge color="success">
                                    10Lc
                                </Badge>
                        </h2>
                            
                        </Col>
                        
                    </Row>
                </Col>
                <Col>
                    <Card>
                        <Row>
                            <Col>
                  <div>
                    <h6 className="text-secondary">BHK Type :</h6>
                    <h6>3 BHK</h6>
                  </div>
                </Col>
                            <Col>
                  <div>
                    <h6 className="text-secondary">Build Up Area :</h6>
                    <h6>3000 sq. ft.</h6>
                  </div>
                </Col>
                        </Row>

                        <Row>
                            <Col>
                  <div>
                    <h6 className="text-secondary">Facing :</h6>
                    <h6>North</h6>
                  </div>
                </Col>
                <Col>
                  <h6 className="text-secondary">Floor :</h6>
                  <h6>5th</h6>
                </Col>
                        </Row>

                        <Row>
                            <Col>
                  <h6 className="text-secondary">Total Floor :</h6>
                  <h6>6</h6>
                </Col>
                <Col>
                  <h6 className="text-secondary">Property Age :</h6>
                  <h6>Less than 1 year</h6>
                </Col>
                        </Row>

                        <Row>
                            <Col>
                  <h6 className="text-secondary">Posted On :</h6>
                  <h6>31-08-2022</h6>
                </Col>
                <Col>
                  <h6 className="text-secondary">Available From :</h6>
                  <h6>02-09-2022</h6>
                </Col>
                        </Row>

                        <Row>
                            <Col>
                  <h6 className="text-secondary">Dimensions :</h6>
                  <h6>50x30sq.ft.</h6>
                </Col>
                
                <Col>
                  <div>
                    <h6 className="text-secondary">Price Per Sqft:</h6>
                    <h6>₹1500 </h6>
                  </div>
                </Col>
                        </Row>

                    </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
          
          <Card className="col-md-12" color="info">
              <CardBody>
               <Row>
               
                <Col>
                  <div>
                    <h6 className="text-secondary">Description:</h6>
                    <h6>This property is located on Hyderabad 
  
                    </h6>
                  </div>
                </Col>
               </Row>
              </CardBody>
          </Card>
        </div></Base>
      );
    }
  }
  export default PropertyDetails;