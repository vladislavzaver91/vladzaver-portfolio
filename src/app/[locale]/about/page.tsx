import AboutComponent from '@/components/About/AboutComponent';
import Title from '@/components/Title/Title';

export default function About() {
	return (
		<div className="section">
			<div className="container">
				<Title
					style={{
						background: 'linear-gradient(138deg, #ff8660 0%, #8000ff 98.96%)',
						backgroundClip: 'text',
					}}
				>
					About me
				</Title>
				<AboutComponent />
			</div>
		</div>
	);
}
