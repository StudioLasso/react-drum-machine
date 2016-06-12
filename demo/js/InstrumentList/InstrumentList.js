import React from 'react';

export default props => {
	const instruments = props.instruments.map((instrument,i) => (
		<div className="instrumentName" key={i} style={{width:'64px',height:'19px','outline':'1px solid'}}>
			<img src={instrument.imgurl} alt={instrument.name} height="20" width="20" />
		</div>
	));

	return (
		<div>
			{instruments}
		</div>
	);
}