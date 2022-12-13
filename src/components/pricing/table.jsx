import {Link} from "gatsby";
import PricingItem from './item';
import * as React from 'react'

export default function PricingTable( {block, dataBinding}) {
	return (
        <section className="pricing pb-xxl-20 pb-lg-15 pb-md-5" data-cms-bind={dataBinding}>
            <div className="container">
                <div className="row">
                    {block.pricing_tier.map((tier, i) => (
                        <PricingItem tier={tier}  key={i}/>
                    ))}
                </div>
            </div>
        </section>
	);
}
