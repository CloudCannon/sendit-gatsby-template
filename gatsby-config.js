module.exports = {
  siteMetadata: {
    title: "Sendit Gatsby",
    siteUrl: 'http://www.example.com/'
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-source-filesystem-markdown-name`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, posts } }) => {
              return posts.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/${(node.frontmatter.seo?.canonical_url || node.parent.name)}`,
                  categories: node.frontmatter.tags,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                posts: allMarkdownRemark(
                  filter: {
                    fields: {sourceName: {eq: "posts"}}
                  }
                  sort: {frontmatter: {date: DESC}}
                ) {
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
                    html
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "Sendit Gatsby RSS Feed",
            match: "^/blog/"
          }
        ],
      },
    },
  ],
}