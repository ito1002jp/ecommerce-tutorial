// src/templates/Bag.js
import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../components/layout';

// run template query
export const query = graphql`
  query BagTemplateQuery($slug: String!) {
    item: contentfulFashionTwoBags(productSlug: { eq: $slug }) {
      id
      productSlug
      productName
      shortDescription
      description {
        json
      }

      mainImage {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      otherImages {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      price
      discountPrice
      tags
      rating
      color
    }
  }
`;

const StyledImage = styled(Img)`
width: 30rem;
height: 30rem;
`;

const BagTemplate = ({ data: { item } }) => {
const options = {
  // options for rich text formating
};

return (
  <Layout>
    <h2>{item.productName}</h2>
    <div>{item.rating} stars</div>
    <div>{item.shortDescription}</div>
    <StyledImage fluid={item.mainImage.fluid} />
    {/* render the rich text format description */}
    <main>{documentToReactComponents(item.description.json, options)}</main>
  </Layout>
);
};

export default BagTemplate; 