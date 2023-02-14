import Navigation from './navigation';
import Footer from './footer';
import * as React from 'react'
import { Script } from "gatsby"
import '../../../styles/theme.scss';

export default function DefaultLayout({ children, page }) {

	return (
		<>

			<Script src="/vendor/jQuery/jquery.min.js"/>
			<Script src="/vendor/bootstrap/bootstrap.bundle.min.js"/>
			<Script src="/vendor/counter-up/countup.js"/>
			<Script src="/vendor/magnific-popup/magnific-popup.min.js"/>
			<Script src="/js/script.js"/>
			<Navigation page={page}/>
            {children}
			<Footer page={page}/>
            
		</>
	);
}
