import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import Blocks from '../components/shared/blocks';
import { CloudCannonConnect } from '@cloudcannon/react-connector'
import { GlobalHead } from "../components/layouts/head"

export const Head = ({data, location}) => {
  return (
     <GlobalHead data={data} location={location}>
     </GlobalHead>
  )
}

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
    slug: props.path
  };

  const LiveEditingComponent = CloudCannonConnect(({page}) => <Blocks content_blocks={page.data.content_blocks} ></Blocks>, {
		valueOptions: {
			keepMarkdownAsHTML: false
		  }
	});
  return (
    <DefaultLayout page={page}>
      <LiveEditingComponent page={page} ></LiveEditingComponent>
    </DefaultLayout>
  );
}
export default NotFound
