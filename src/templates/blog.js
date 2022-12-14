import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import BlogList from '../components/blog/list';
import Blocks from '../components/shared/blocks';
// import { CloudCannonConnect } from '@cloudcannon/react-connector'

// const HomePage = (props) => {
// 	const page = props.data.page.nodes[0].frontmatter;

// 	const LiveEditingComponent = CloudCannonConnect(HomePageComponents);
// 	return <LiveEditingComponent page={ page } />
// }

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
          thumbImg {
            image
            image_alt
          }
          featuredImg {
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
const HomePage = (props) => {
	// const page = props.data.page.nodes[0];
  const node = props.data.page.nodes[0];
  // const nodePost = props.data.posts;
  const page = {
      data: {
          ...node.frontmatter,
      },
    };

  const posts = {
    pageInfo: {
      ... props.data.posts.pageInfo
    },
  }

  posts.data = props.data.posts.nodes.map((node) => ({
    data: {
        ...node.frontmatter,
    },
    slug: node.parent.name
    }));

  // const LiveEditingComponent = CloudCannonConnect(DefaultLayout);
	// return <LiveEditingComponent page={ page } />
  return (
    <DefaultLayout page={page}>
      <BlogList page={page} posts={posts} pageNo={0}></BlogList>
      {/* <Blocks content_blocks={page.data.content_blocks } ></Blocks> */}
    </DefaultLayout>
  )
}

export default HomePage
// export default function Component () {
//   return "Hello world"
// }