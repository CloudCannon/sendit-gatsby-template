
exports.createPages = async function ({ actions, graphql }) {
	const { data } = await graphql(`
		query {
			allMarkdownRemark {
				edges {
					node {
						id
						fields {
							sourceName
						}
						parent {
							... on File {
								id
								name
							}
						}
					}
				}
			}
		}
	`)
	data?.allMarkdownRemark?.edges?.forEach((edge) => {
		const ignored = {
			index: true,
			blog: true,
			"404": true,
			feed: true
		};

		const id = edge.node.id;
		const slug = edge.node.parent.name;
		const type = edge.node.fields.sourceName;

		let component;
		let url;
		switch (type) {
			case 'posts':
				component = require.resolve(`./src/templates/posts.js`);
				url = `/blog/${slug}`;
				break;
			case 'pages':
				if (ignored[slug]){
					return;
				}
				component = require.resolve(`./src/templates/pages.js`);
				url = `/${slug}`;
				break;
			default:
				return;
		}
		actions.createPage({
			path: url,
			component: component,
			context: { slug: slug, id: id },
		});
	});

	const postsData = await graphql(`
		query {
			allMarkdownRemark(
				filter: {fields: {sourceName: {eq: "posts"}}}
				limit: 1000
			) {
				nodes {
					id
					frontmatter {
						tags
					}
					fields {
						sourceName
					}
				}
			}
		}
	`)
	const posts = postsData.data.allMarkdownRemark.nodes
	const postsPerPage = 9
	let numPages = Math.ceil(posts.length / postsPerPage)
	Array.from({ length: numPages }).forEach((_, i) => {
		actions.createPage({
		path: i === 0 ? `/blog` : `/blog/${i + 1}`,
		component: require.resolve("./src/templates/blog.js"),
		context: {
			limit: postsPerPage,
			skip: i * postsPerPage,
			currentPage: i + 1,
		},
		})
	})

	const postsTags = postsData.data.allMarkdownRemark.nodes
	let slugs = [];
	postsTags.map((post) => {
		post.frontmatter.tags.map((tag) => {
			if(slugs.indexOf(tag) === -1) {
				slugs.push(tag)
			}
		})
	})
	console.log(slugs)
	slugs.forEach((tag) => {
		actions.createPage({
			path: `/tags/${tag}`,
			component: require.resolve("./src/templates/blog.js"),
			context: {
				limit: postsPerPage,
				currentPage: 0,
				tagFilter: { "tags": { "in": [tag] } }
			},
		})
	})
}
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: [
            {
              loader: 'import-glob-keyed'
            },
          ],
        },
      ],
    }
  })
}