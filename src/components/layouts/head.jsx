import globalData from '../../../lib/data';
import * as React from 'react'
import urlJoin from 'url-join';
import '../../../styles/theme.scss';

export const GlobalHead = ({ data, location, children }) => {

	const node = data.page.nodes[0];
	const page = {
		data: {
			...node.frontmatter,
		},
		slug: location.pathname
	};

	const title = page.data.title ? `${page.data.title} | ${globalData.site.site_title}` : globalData.site.site_title;
	const description = page.data.seo?.page_description || globalData.site.description;
	const image = page.data.seo?.feature_image || globalData.site.image;
	const image_alt = page.data.seo?.feature_image_alt || globalData.site.image_alt;
	return (
		<>
			<meta charSet="utf-8" />

			<title>{title}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta name="description" content={description} />
			<meta name="og:description" content={description} />

			<meta name="og:title" content={title} />
			<meta name="og:type" content={page.data.seo?.open_graph_type || 'website'} />

			<meta name="og:image" content={image} />
			<meta name="og:image:alt" content={image_alt} />

			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:alt" content={image_alt} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={globalData.site.twitter_site} />
			<meta name="twitter:creator" content={page.data.seo?.author_twitter_handle || globalData.site.twitter_site} />
			<meta name="twitter:title" content={title} />

			{page.data.seo?.no_index &&
				<>
					<meta name="robots" content="noindex" />
					<meta name="googlebot" content="noindex" />
				</>
			}

			<link rel="canonical" href={urlJoin(globalData.site.baseurl, page.data.seo?.canonical_url || page.slug)} />


			<link rel="shortcut icon" href={globalData.site.favicon_icon} type="image/x-icon" />
			<link rel="icon" href={globalData.site.favicon_image} type="image/x-icon" />
			<link rel="apple-touch-icon" href={globalData.site.favicon_image} />

			{children}
		</>
	)
}