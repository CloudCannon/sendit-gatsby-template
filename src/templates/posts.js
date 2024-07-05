import globalData from '../../lib/data';
import * as React from 'react'
import { graphql } from 'gatsby'
import DefaultLayout from '../components/layouts/default';
import BlogPost from '../components/blog/post';
import { CloudCannonConnect } from '@cloudcannon/react-connector'
import urlJoin from 'url-join';
import { GlobalHead } from "../components/layouts/head"

export const Head = ({data, location}) => {
  const node = data.page.nodes[0];
  const page = {
    data: {
      ...node.frontmatter,
    },
    slug: location.pathname
  };
  return (
     <GlobalHead data={data} location={location}>

			<script type='application/ld+json'>
				{`{
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					"datePublished": "${page.data.date}",
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": "${urlJoin(globalData.site.baseurl, page.data.seo?.canonical_url || page.slug)}"
					},
					"headline": "${page.data.title}",
					"image": "${[page.data.seo?.featured_image || page.data.featured_image.image || null]}",
					"dateModified": "${page.data.date}",
					"author": {
						"@type": "Person",
						"name": "${page.data.author}"
					}
				}`}
			</script>
     </GlobalHead>
  )
}

const PostTemplate = (props) => {
  const node = props.data.page.nodes[0];
  const page = {
    data: {
      ...node.frontmatter,
    },
    content_html: node.html,
    wordCount: node.wordCount.words,
    slug: props.path

  };


  const posts = props.data.posts.nodes.map((node) => ({
    data: {
      ...node.frontmatter,
    },
    slug: node.parent.name
  }));

  const LiveEditingComponent = CloudCannonConnect(({page, posts}) => <BlogPost page={page} posts={posts} ></BlogPost>, {
		valueOptions: {
			keepMarkdownAsHTML: false
		  }
	});
  return (
    <DefaultLayout page={page}>
      <LiveEditingComponent page={page} posts={posts} ></LiveEditingComponent>
    </DefaultLayout>
  )
}

export const query = graphql`
query ($id: String) {
  page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "posts"}}, id: {eq: $id}}) {
    nodes {      
        frontmatter {
            date
            title
            tags
            author
            thumb_image: {
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
        html
            wordCount{
                words   
        }
    }
  }
  posts: allMarkdownRemark(
    limit: 3
    filter: {fields: {sourceName: {eq: "posts"}}}) {
    nodes {
      frontmatter {
        date
        title
        tags
        author
        thumb_image: {
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

export default PostTemplate