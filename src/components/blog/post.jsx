import PostSummary from '../../components/posts/summary';
import * as React from 'react'
const { DateTime } = require("luxon");

export default function BlogPost({ page, posts, headline, pageNo }) {

	const wordCount = page.wordCount;
	const readingTime = Math.floor(wordCount / 183)
	return (
		<>
			<section className="blog-details">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<article className="blog-single">
								<div className="inner-blog-details">
									<h2 className="w-xxl-70 w-xl-80 w-100">{page.data.title}</h2>
									<div className="inner-blog-details-meta">
										<ul className="list-unstyled">
											<li className="list-inline-item">
												<p>{DateTime.fromISO(page.data.date, 'string').toLocaleString(DateTime.DATE_FULL)}</p>
											</li>
											<li className="list-inline-item">
												<p>{page.data.author}</p>
											</li>
											<li className="list-inline-item">
												<p>{readingTime} <span>minutes read</span></p>
											</li>
											<li className="list-inline-item">
												<p>{wordCount} <span>words</span></p>
											</li>
										</ul>
									</div>
								</div>
								<div className="rounded-box mb-xxl-11 mb-8">
									<img
										src={page.data.featured_image.image}
										className="w-100"
										alt={page.data.featured_image.image_alt}
									/>
								</div>
								<div style={{ "max-width": "900px", margin: "0 auto" }} dangerouslySetInnerHTML={{ __html: page.content_html }}></div>
							</article>
						</div>
					</div>
				</div>
			</section>

			<section className="blog-related position-relative">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="blog-section">
								<h2 className="blog-section-title">Recent Blog</h2>
							</div>
						</div>
					</div>
					<div className="row">

						{posts.map((post, i) => (
							<PostSummary post={post} key={i}></PostSummary>
						))}
					</div>
				</div>
			</section>
		</>
	);
}





