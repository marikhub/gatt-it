import React, { Component } from 'react';

const RateComponent = ({rate}) => {

		return (
			<div className = "row pa3 ma2">
				<div className="col-lg-3">
					<label htmlFor="products">CN Code</label>
			        <p>{rate.code}</p>
		        </div>
		        <div className="col-lg-3">
					<label htmlFor="products">Active rate, %</label>
			        <p>{rate.active_rate}</p>
		        </div>
		        <div className="col-lg-3">
					<label htmlFor="products">Base rate, %</label>
			        <p>{rate.base_rate}</p>
		        </div>
		        <div className="col-lg-3">
					<label htmlFor="products">Transition, years</label>
			        <p>{rate.transition}</p>
		        </div>
	        </div>
		);
}

export default RateComponent;