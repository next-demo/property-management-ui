
import React from "react";
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
import Base from "../../components/Base";

import { myAxios } from "../../services/helper";




class ListProperty extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      property: [],
      currentProperty: false,
      localityId: "",
      propertyId: "",
      apartmenttype: "",
      bhktype: "",
      floor: "",
      totalfloor: "",
      propertyage: "",
      facing: "",
      builduparea: "",
      plotArea: "",
      price: "",
      pricepersqft: "",
      description: "",
      dimension: "",
      postedon: "",
      availablefrom: "",
      city: "",
      landmark: "",
      locality: "",
      imageName: "",
      ownerName: "",
      contactdetail: ""

    }
  }

  componentDidMount() {

    myAxios.get("/api/properties").then((res) => {
      console.log(res.data)
      this.setState({ property: res.data["details"] });
    })

  }

  propertyDetails = (property) => {
    console.log(property);
    this.setState({
      currentProperty: true,
      id: property.id,
      apartmenttype: property.apartmenttype,
      bhktype: property.bhktype,
      floor: property.floor,
      totalfloor: property.totalfloor,
      propertyage: property.propertyage,
      facing: property.facing,
      builduparea: property.builduparea,
      plotArea: property.plotArea,
      price: property.price,
      pricepersqft: property.pricePerSqft,
      description: property.description,
      dimension: property.dimensions,
      postedon: property.postedOn,
      availablefrom: property.availableFrom,
      imageName: property.imageName,
      city: property.locality.city,
      landmark: property.locality.landmark,
      locality: property.locality.locality,
      ownerName: property.owner.name,
      contactdetail: property.owner.contactdetail
    });
  }
  render() {

    const currentProperty = (
      <div>
        <Card className="mt-4 " color="secondary">
          <CardBody className="">
            <Row className="mt-3">
              <Col className="col-md-2">
                <img src={`http://localhost:9090/api/property/image/${this.state.imageName}`} height="220" width="300" />
              </Col>

              <Col className="col-md-2">
                <Row>
                  <Col className="mt-5">
                    <h2>
                      Price:{' '}
                      <Badge
                        color="success">
                        {this.state.price}.00 lac
                      </Badge>
                    </h2>

                  </Col>
                  <Col className="mt-5">
                    <h2>
                      <Badge
                        color="success">
                        {this.state.apartmenttype}
                      </Badge>
                    </h2>

                  </Col>
                  <Col>
                      <div>
                        <h2 className="text-danger">Price Per Sqft:</h2>
                        <h4>{this.state.pricepersqft}.00 Rs</h4>
                      </div>
                  </Col>

                </Row>
              </Col>
              <Col>
                <Card>
                  <Row>
                    <Col>
                      <div>
                        <h6 className="text-secondary">BHK Type :</h6>
                        <h6>{this.state.bhktype}</h6>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <h6 className="text-secondary">Built Up Area :</h6>
                        <h6>{this.state.builduparea}</h6>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <h6 className="text-secondary">Owner Name :</h6>
                        <h6>{this.state.ownerName}</h6>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div>
                        <h6 className="text-secondary">Facing :</h6>
                        <h6>{this.state.facing}</h6>
                      </div>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Contact Details :</h6>
                      <h6>{this.state.contactdetail}</h6>
                    </Col>
                    <Col>
                      <div>
                        <h6 className="text-secondary">City :</h6>
                        <h6>{this.state.city}</h6>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <h6 className="text-secondary">Total Floor :</h6>
                      <h6>{this.state.totalfloor}</h6>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Property Age :</h6>
                      <h6>{this.state.propertyage}</h6>
                    </Col>
                    <Col>
                      <div>
                        <h6 className="text-secondary">Landmark :</h6>
                        <h6>{this.state.landmark}</h6>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <h6 className="text-secondary">Posted On :</h6>
                      <h6>{this.state.postedon}</h6>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Available From :</h6>
                      <h6>{this.state.availablefrom}</h6>
                    </Col>
                    <Col>
                      <div>
                        <h6 className="text-secondary">Locality :</h6>
                        <h6>{this.state.locality}</h6>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <h6 className="text-secondary">Dimensions :</h6>
                      <h6>{this.state.dimension}</h6>
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
                  <h6>
                    {this.state.description}
                  </h6>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
    const allPropery = (
      <div>
        <h2 className="text-center">Property List</h2>
        <br></br>
        <div className="row" style={{ marginLeft: '30px' }}>
          <table className="table table-striped table-bordered">

            <thead>
              <tr >
                <th>property Image</th>
                <th>Owner Name</th>
                <th>Owner Contact Detail</th>
                <th>City</th>
                <th>Appartment Type</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.property.map(
                  owner => {
                    if (owner.customer === null) {
                      return <tr >
                        <td><img src={`http://localhost:9090/api/property/image/${owner.imageName}`} /> </td>
                        <td> {owner.owner.name} </td>
                        <td> {owner.owner.contactdetail}</td>
                        <td> {owner.locality.city}</td>
                        <td> {owner.apartmenttype}</td>
                        <td>
                          <button style={{ marginLeft: "5px" }} className="btn btn-danger" onClick={this.propertyDetails.bind(this, owner)}>Details </button>
                        </td>
                      </tr>
                    }
                  }
                )
              }
            </tbody>
          </table>

        </div>

      </div>
    )
    return (
      <Base>
        {this.state.currentProperty ? currentProperty : allPropery}
      </Base>
    )


  }
}
export default ListProperty;