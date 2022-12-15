import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import Blocks from '../components/shared/blocks';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

export const query = graphql`
  query {
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/404/"}}) {
      nodes {
        frontmatter {
          title
          seo {
            page_description
            canonical_url
            featured_image
            featured_image_alt
            author_twitter_handle
            open_graph_type
            no_index
          }
          content_blocks {
            _bookshop_name
            description
            image
            image_alt
          }
        }
      }
    }
  }
`
const NotFound = (props) => {
  const node = props.data.page.nodes[0];
  const page = {
    data: {
      ...node.frontmatter,
    },
  };

  const LiveEditingComponent = CloudCannonConnect(DefaultLayout);
  return (
    <LiveEditingComponent page={page}>
      <Blocks content_blocks={page.data.content_blocks} ></Blocks>
    </LiveEditingComponent>
  );
}
export default NotFound
