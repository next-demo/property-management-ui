import React from 'react'
import Base from '../../components/Base'
import { Button, Card, CardBody, Row, CardImg, CardSubtitle, CardText, CardTitle, Container, Badge } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import { myAxios } from '../../services/helper'
import propertyImage from "../../assest/Real-Estate-PNG-Photo.png"
import { useNavigate } from 'react-router-dom'

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      property: [],
      owner: getCurrentUserDetail(),
      ownerproperty: true,
    }
  }

  componentDidMount() {

    myAxios.get(`/api/customer/${this.state.owner.ownerId}/properties`).then((res) => {
      console.log(res.data)
      if (res.data.length === 0) {
        this.setState({ ownerproperty: false });
        return
      }
      this.setState({ property: res.data });
    })

  }
  handleAddProperty = () =>{
    this.props.navigate("/properties-list");
  }
  render() {

    const ownerPropertyDetails = (
      <>
        <Container >
          <Row xs={1} md={3} className="g-4">
            {
              this.state.property.map(
                owner =>
                  <Card
                    color='info'
                    style={{
                      width: '18rem'
                    }}
                    className="p-2 ms-2"

                  >
                    <CardBody>
                      <CardTitle tag="h5">
                        {owner.apartmenttype}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {owner.locality.city}
                      </CardSubtitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        Posted on :  
                         {owner.postedOn}
                      </CardSubtitle>
                    </CardBody>
                    <img
                      alt="Card cap"
                      src={`http://localhost:9090/api/property/image/${owner.imageName}`}
                      width="100%"
                    />
                    <CardBody>
                      <CardText>
                        Bhk Type: {owner.bhktype} || Build Up Area: {owner.builduparea}
                      </CardText>
                      <CardText>
                        dimensions: {owner.dimensions} || facing: {owner.facing}
                      </CardText>
                    </CardBody>
                    <Button
                      color="danger"

                      outline
                    >
                      Details
                    </Button>
                  </Card>


              )
            }</Row></Container>
      </>
    )

    const addproperty = (
      <Container>

        <Card
          body
          color="secondary"
          className="my-2">
          <CardImg
            alt="Card image cap"
            src={propertyImage}
            style={{
              height: "20%",
              width: "30%"
            }}
            top
            width="50%"
          />
          <CardBody>
            <CardTitle tag="h5">
              No property Found
            </CardTitle>
            <CardText>
              You can add you property by clicking on Button ...
            </CardText>
          </CardBody>
        </Card>

      </Container>
    )
  return (

    <Base>
        <Card
          color="success"
          className="my-2"
          style={{
            width: '18rem'
          }}>

          <CardTitle tag="h2">
            Welcome {this.state.owner.name}
          </CardTitle>

        </Card>

        <Card
          color="secondary"
          className="my-2 align-self-center"
          style={{
            width: '18rem'
          }}>

          <CardTitle tag="h2">
            Your Properties List
          </CardTitle>

        </Card>

        {
          (this.state.ownerproperty) ? ownerPropertyDetails : addproperty
        }
        <Container className='text-center text-md-right mt-2'>

          <Button
            color="primary"
            onClick={this.handleAddProperty}
            outline
          >
            Book Your property
          </Button></Container>
      </Base>

  )
  }
}

function withMyHook(CustomerDashboard) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <CustomerDashboard {...props} navigate={navigate} />;
  }
}
export default withMyHook(CustomerDashboard);