/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import { Container, Box, Heading, Card, Image, Text, Spinner } from "gestalt";
import { Link } from "react-router-dom";

import "./App.css";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    loadingBrands: true,
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
          brands{
            _id
            name
            description
            image{
              url
            }
          }
        }`,
        },
      });

      this.setState({ brands: response.data.brands, loadingBrands: false });
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  render() {
    const { brands, loadingBrands } = this.state;

    return (
      <Container>
        {/* Brands Header */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Shirt Brands
          </Heading>
        </Box>

        {/* Actual Brands */}
        <Box wrap display="flex" justifyContent="around">
          {brands.map((brand) => (
            <Box margin={2} width={200} key={brand._id}>
              <Link to={`/${brand._id}`}>
                <Card
                  image={
                    <Box height={200} width={200}>
                      <Image
                        alt="Brand"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${apiUrl}${brand.image.url}`}
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
                    <Text size="xl">{brand.name}</Text>
                    <Text>{brand.description}</Text>
                    <Text size="xl">See Designs</Text>
                  </Box>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>

        <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" />
      </Container>
    );
  }
}

export default App;
