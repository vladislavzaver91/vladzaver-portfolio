import React, { CSSProperties } from 'react';

interface TitleProps {
	children: React.ReactNode;
	style?: CSSProperties;
}

const Title = ({ style, children }: TitleProps) => {
	return (
		<h2
			className="title"
			style={{
				...style,
			}}
		>
			{children}
		</h2>
	);
};

export default Title;
