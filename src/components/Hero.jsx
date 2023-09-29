import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Hero = () => {
  return (
    <section className="section position-relative">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">Food Food</p>
              <h1 className="mb-4 font-weight-normal line-height-1_4">Burger burger burger burger <span className="text-primary font-weight-medium">Burger</span></h1>
              <p className="text-muted mb-4 pb-2">Burger Burger Burger Burger Burger Burger Burger Burger Burger BurgerBurger Burger Burger Burger Burger</p>
              <a href="#" className="btn btn-warning">
              Burger Burger Burger Burger Burger <span className="ml-2 right-icon">&#8594;</span>
              </a>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mt-5 mt-lg-0">
              <img src="https://www.freepnglogos.com/uploads/food-png/food-png-transparent-images-png-only-22.png" alt="" className="img-fluid mx-auto d-block"/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;