// src/templates/Bag.js
import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../components/layout';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

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

// Add in some styling
const Bold = styled.span`
 font-weight: bold;
 color: red;
`;

const P = styled.p`
 color: orangered;
`;

const StyledHyperLink = styled.span`
 color: purple;
 padding: 1px 2px;
 background: orange;
 cursor: pointer;
`;

// render the styling
const RTFBold = ({ children }) => <Bold>{children}</Bold>;
const Text = ({ children }) => <P>{children}</P>;
const HyperLink = ({ children }) => (
 <StyledHyperLink>{children}</StyledHyperLink>
);


const BagTemplate = ({ data: { item } }) => {
// modifying the options
const options = {
   renderMark: {
     [MARKS.BOLD]: text => <RTFBold>{text}</RTFBold>,
   },

   renderNode: {
     [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
     [INLINES.HYPERLINK]: (node, children) => (
       <HyperLink>{children}</HyperLink>
     ),
   },
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