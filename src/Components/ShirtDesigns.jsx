import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  Spinner,
  Button,
  Mask,
} from "gestalt";
import React from "react";
import { Link } from "react-router-dom";

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class ShirtDesigns extends React.Component {
  state = {
    _brandName: "",
    _shirtDesigns: [],
    loadingShirts: true,
    _cartItems: [],
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
            brand(id: "${this.props.match.params.brandId}"){
              _id
              name
              description
              shirt_designs{
                _id
                name
                description
                image{
                  url
                }
                price
                brand{
                  _id
                }
              }
            }
          }`,
        },
      });

      this.setState({
        _brandName: response.data.brand.name,
        _shirtDesigns: response.data.brand.shirt_designs,
        loadingShirts: false,
      });
    } catch (err) {
      console.error(err);
      this.setState({ loadingShirts: false });
    }
  }

  addToCart = (shirt) => {
    const alreadyInCart = this.state._cartItems.findIndex(
      (item) => item._id === shirt._id
    );

    if (alreadyInCart === -1) {
      const updatedItems = this.state._cartItems.concat({
        ...shirt,
        quantity: 1,
      });

      this.setState({ _cartItems: updatedItems });
    } else {
      const updatedItems = [...this.state._cartItems];

      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ _cartItems: updatedItems });
    }
  };

  render() {
    const { _brandName, _shirtDesigns, loadingShirts, _cartItems } = this.state;

    return (
      <Container>
        {/* Brands Header */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            {_brandName}
          </Heading>
        </Box>

        {/* Actual Shirt Designs */}
        <Box wrap display="flex" justifyContent="center" alignItems="start">
          {_shirtDesigns.map((shirt) => (
            <Box margin={2} width={400} key={shirt._id} rounding={2}>
              {/* <Link to={`/${shirt._id}`}> */}
              <Card
                image={
                  <Box height={400} width={400}>
                    <Image
                      alt="Shirt Design"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${shirt.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text size="xl">{shirt.name}</Text>
                  <Text>{shirt.description}</Text>
                  <Text size="xl">{`$${shirt.price}`}</Text>
                  <Box marginTop={2}>
                    <Text bold size="xl">
                      <Button
                        color="blue"
                        text="Add to Cart"
                        onClick={() => this.addToCart(shirt)}
                      />
                    </Text>
                  </Box>
                </Box>
              </Card>
              {/* </Link> */}
            </Box>
          ))}
        </Box>

        {/* User Cart */}
        <Box marginTop={2}>
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              padding={2}
            >
              <Heading align="center" size="md">
                Your Cart
              </Heading>
              <Text color="gray" italic>
                {_cartItems.length} items selected
              </Text>

              {/* Cart Items Added */}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {_cartItems.length === 0 && (
                    <Text color="maroon">Please select some shirt designs</Text>
                  )}
                </Box>
                <Text size="lg">Total: $3.99</Text>
                <Text>
                  <Link to="/checkout">Check out!</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>

        <Spinner show={loadingShirts} accessibilityLabel="Loading Spinner" />
      </Container>
    );
  }
}
export default ShirtDesigns;
