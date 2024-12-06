import ContactComponent from '@/components/Contact/ContactComponent';
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
					Contact me
				</Title>
				<ContactComponent />
			</div>
		</div>
	);
}
