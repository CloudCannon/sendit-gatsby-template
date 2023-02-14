import Navigation from './navigation';
import Footer from './footer';
import React, { useState } from "react"
import { Script } from "gatsby"
import '../../../styles/theme.scss';

export default function DefaultLayout({ children, page }) {
	const [loadedjQuery, setLoadedjQuery] = useState(false)
	const [loadedMagnific, setLoadedMagnific] = useState(false)

	return (
		<>

			<Script src="/vendor/jQuery/jquery.min.js" onLoad={() => setLoadedjQuery(true)} />
			<Script src="/vendor/bootstrap/bootstrap.bundle.min.js" />
			<Script src="/vendor/counter-up/countup.js" />
			{
				loadedjQuery && 
				<Script src="/vendor/magnific-popup/magnific-popup.min.js" onLoad={() => setLoadedMagnific(true)} />
			}
			{
				loadedMagnific && 
				<Script src="/js/script.js" strategy='idle' />
			}
			<Navigation page={page} />
			{children}
			<Footer page={page} />

		</>
	);
}
