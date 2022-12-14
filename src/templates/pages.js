import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import Blocks from '../components/shared/blocks';
// import { CloudCannonConnect } from '@cloudcannon/react-connector'

// const LiveEditingComponent = CloudCannonConnect(PostLayout);

const PagesTemplate = (props) => {
const node = props.data.page.nodes[0];
const page = {
    data: {
        ...node.frontmatter,
    },
  };
//   const author = null;
//   const nextPost = null;
    return (
        <DefaultLayout page={page}>
        <Blocks content_blocks={page.data.content_blocks } ></Blocks>
        </DefaultLayout>
    )
}

export const query = graphql`
  query ($id: String) {
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, id: {eq: $id}}) {
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
              button {
                link
                text
              }
              numbers {
                prefix
                number
                suffix
                text
              }
              slider {
                image
                image_alt
                author
                designation
                message
              }
              pricing_tier {
                tier
                highlight_tier
                description
                currency_symbol
                price
                has_discount
                discount_price
                features {
                  item
                  active_feature
                }
              }
              FAQ {
                title
                description
              }
              hero_images {
                image
                image_alt
                placement
              }
              team_members {
                name
                designation
                image
                image_alt
              }
              address {
                heading
                address
              }
              phone {
                heading
                cell
                image
                image_alt
              }
              email {
                heading
                email
                image
                image_alt
              }
              form {
                checkbox_text
                sign_up_text
                heading
                fullname {
                  heading
                  placeholder
                }
                email {
                  heading
                  placeholder
                }
                phone_number {
                  heading
                  placeholder
                }
                message {
                  heading
                  placeholder
                }
                submit_button {
                  text
                }
                password {
                  heading
                }
                retype_password {
                  heading
                }
                log_in_button {
                  link
                  text
                }
                sign_up_button {
                  link
                  text
                }
              }
              terms_and_conditions {
                heading
                description
              }
            }
          }
        }
    }
  }
`

export default PagesTemplate