// import Head from 'next/head';
// import { NextSeo } from 'next-seo';
import { Helmet } from 'react-helmet'
import data from '../../../lib/data';
import Navigation from './navigation';
import Footer from './footer';
import * as React from 'react'
import urlJoin from 'url-join';
import '../../../styles/theme.scss';

export default function DefaultLayout({ children, page }) {
	const title = page?.data.title ? `${page.data.title} | ${data.site.site_title}` : data.site.site_title;
	const description = page?.data.seo?.page_description || data.site.description;
	const image = page?.data.seo?.feature_image || data.site.image;
	const image_alt = page?.data.seo?.feature_image_alt || data.site.image_alt;

	return (
		<>
			<Helmet>
				<meta charset="utf-8" />
      			
				<title>{ title }</title>

				<meta name="viewport" content="width=device-width, initial-scale=1" />

				 {/* Page description for SEO */}
				<meta name="description" content={description} />
				<meta name="og:description" content={description} />

				 {/* meta tags for open graph and twitter */}

				<meta name="og:title" content={ title } />
				<meta name="og:type" content={ page.data.seo?.open_graph_type || 'website' } />

				<meta name="og:image" content={image} />
				<meta name="og:image:alt" content={image_alt} />

				<meta name="twitter:image" content={image} />
				<meta name="twitter:image:alt" content={image_alt} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content={ data.site.twitter_site } />
				<meta name="twitter:creator" content={ page.data.seo?.author_twitter_handle || data.site.twitter_site } />
				<meta name="twitter:title" content={ title } />

				 {/* Add robots no index */}
				{ page.data.seo?.no_index  &&
					<>
					<meta name="robots" content="noindex" />
					<meta name="googlebot" content="noindex" />
					</>
				}
				
				 {/* Canonical URL for SEO */}
				<link rel="canonical" href={urlJoin(data.site.baseurl, page.seo?.canonical_url || page.slug)} />

				 {/* Favicon */}
				
				<link rel="shortcut icon" href={ data.site.favicon_icon } type="image/x-icon" />
				<link rel="icon" href={ data.site.favicon_image } type="image/x-icon" />
				<link rel="apple-touch-icon" href={ data.site.favicon_image } />


				<script src="/vendor/jQuery/jquery.min.js" type="text/javascript"/>
				<script src="/vendor/bootstrap/bootstrap.bundle.min.js" type="text/javascript"/>
				<script src="/vendor/counter-up/countup.js" type="text/javascript"/>
				<script src="/vendor/magnific-popup/magnific-popup.min.js" type="text/javascript"/>
				<script src="/js/script.js" type="text/javascript" async/>

			</Helmet>

			<Navigation page={page}/>
            {children}
			<Footer page={page}/>
            
		</>
	);
}
