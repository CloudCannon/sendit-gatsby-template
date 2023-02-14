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
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/index/"}}) {
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
            title
            description
            title_suffix
            image
            image_alt
            reversed
            alternate_style
            video_url
            remove_top_padding
            numbers {
              prefix
              number
              suffix
              text
            }
            button {
              link
              text
            }
            slider {
              image
              image_alt
              author
              designation
              message
            }
          }
        }
      }
    }
  }
`
const HomePage = (props) => {
  const node = props.data.page.nodes[0];
  const page = {
    data: {
      ...node.frontmatter,
    },
    slug: ''
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
  )
}

export default HomePage