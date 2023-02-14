module.exports = {
  siteMetadata: {
    title: "Sendit Gatsby",
  },
  plugins: [
    `gatsby-plugin-sass`,
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
    'gatsby-source-filesystem-markdown-name',
    `gatsby-transformer-remark`,
  ],
}