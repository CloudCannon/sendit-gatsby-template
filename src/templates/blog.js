import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import BlogList from '../components/blog/list';
import { CloudCannonConnect } from '@cloudcannon/react-connector'
import { GlobalHead } from "../components/layouts/head"

export const Head = ({data, location}) => {
  return (
     <GlobalHead data={data} location={location}>
     </GlobalHead>
  )
}

export const query = graphql`
  query ($skip: Int! = 0, $limit: Int! = 9, $tagFilter: MarkdownRemarkFrontmatterFilterInput){
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/blog/"}}) {
      nodes {
        frontmatter {
          title
          description
          pagination {
            size
          }
          seo {
            page_description
            canonical_url
            featured_image
            featured_image_alt
            author_twitter_handle
            open_graph_type
            no_index
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {
        frontmatter: $tagFilter
        fields: {
          sourceName: {
            eq: "posts"
          }
        }
      }
      limit: $limit
      skip: $skip
      ) {
      pageInfo {
        perPage
        currentPage
        hasNextPage
        hasPreviousPage
        totalCount 
        pageCount
      }
      nodes {
        frontmatter {
          date
          title
          tags
          author
          thumb_image {
            image
            image_alt
          }
          featured_image {
            image
            image_alt
          }
          seo {
            page_description
            canonical_url
            featured_image
            featured_image_alt
            author_twitter_handle
            open_graph_type
            no_index
          }
        }
        parent {
          ... on File {
            name
          }
        }
        excerpt
      }
    }
  }
`
const BlogPage = (props) => {
  const node = props.data.page.nodes[0];
  const page = {
    data: {
      ...node.frontmatter,
    },
    slug: props.path
  };

  const posts = {
    pageInfo: {
      ...props.data.posts.pageInfo
    },
  }

  posts.data = props.data.posts.nodes.map((node) => ({
    data: {
      ...node.frontmatter,
    },
    slug: node.parent.name
  }));

  const LiveEditingComponent = CloudCannonConnect(({page, posts, headline}) => <BlogList page={page} posts={posts} headline={headline} ></BlogList>, {
		valueOptions: {
			keepMarkdownAsHTML: false
		  }
	});
  return (
    <DefaultLayout page={page}>
      <LiveEditingComponent page={page} posts={posts} headline={props.pageContext.headline}></LiveEditingComponent>
    </DefaultLayout>
  )
}

export default BlogPage