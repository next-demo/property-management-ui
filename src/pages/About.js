import Base from "../components/Base";

const About = () => {
    return (
        <Base>        
        <div>
    <section>
      <div>
      
      <h3>My Property.com</h3>
      <p>
        
         My Property.com is a high-end property portal that caters to a global market with its unique services and novel online features. Having been launched in the year 2006 by Times Group, My Property has quickly risen to being the No. 1 Property Portal in India.

         The My Property design is based on rigorous research, unique product developments, and innovative initiative which has been readily accepted by users. In an attempt to best serve the users, features on the My Property realty portal are constantly invented, evaluated and upgraded.

         In addition to all else, My Property.com is synonymous with internationally acclaimed property fairs. It is here that top-notch properties of major Indian metros are showcased for audiences in India and abroad.

         Till date, My Property.com has successfully hosted 75 domestic and over 15 international property shows around the globe.
      </p>
      </div>
    </section>

    <div>
              <h3 style = {{textAlign: 'center'}}>What My Property.com Offers</h3><br/><br/>
              <section >

              <section>
              <div class='shadow-lg p-3 mb-5 bg-success rounded'>
      
             <div className='card-body' >
              <h5 style= {{marginLeft :'50px', color:'white'}}>incredible Choice :</h5>
              <p style={{marginLeft :'50px'}}>
              Whether you want to stay in a chic city apartment, a luxury beach resort or 
              a cosy B&B in the countryside, My Property.com provides you with amazing diversity 
              and breadth of choice - all in one place.
              </p>
              </div> 
              </div>
              </section>

              <section >
              <div class='shadow-lg p-3 mb-5 bg-primary rounded'>
              <div className='card-body'>
              <h5 style= {{marginLeft :'50px',color:'white'}}>Low rates :</h5>
              <p style= {{marginLeft :'50px'}}>
              My Property.com guarantees to offer you the best available rates. And with our promise 
              to price match, you can rest assured that you’re always getting a great deal.
              </p>
              </div>
              </div>
              </section>

              <section>
                
              <div class = 'shadow-lg p-3 mb-5 bg-danger rounded'>
              <div className='card-body'>
                <h5 style= {{marginLeft :'50px',color:'white'}}>instant Confirmation :</h5>
                <p style= {{marginLeft :'50px'}}>
                My Property.com, every reservation is instantly confirmed. Once you’ve found your perfect 
                stay, a few clicks are all it takes.
                </p>
                </div>
              </div>
              </section>

              <section>
              <div class= 'shadow-lg p-3 mb-5 bg-warning rounded'>
              <div className='card-body'>
                <h5 style= {{marginLeft :'50px',color:'white'}}>No reservation fee :</h5>
                <p style= {{marginLeft :'50px'}}>
                We don’t charge you any booking fees or add any administrative charges. And in many cases,
                 your booking can be cancelled free of charge.
                </p>
                </div>
              </div>
              </section>

              <section>
              <div class="shadow-lg p-3 mb-5 bg-info rounded">
              <div className='card-body'>
                <h5 style= {{marginLeft :'50px',color:'white'}}>Secure Booking :</h5>
                <p style= {{marginLeft :'50px'}}> 
                We facilitate hundreds of thousands of transactions every day through our secure platform, 
                and work to the highest standards to guarantee your privacy.
                </p>
                </div>
              </div>
              </section>
              </section>
            </div>

    </div>
        </Base>
    );
  };
  
  export default About;
  