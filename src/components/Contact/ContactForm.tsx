'use client';
import useContactForm from '@/hooks/useContactForm';
import Button from '../Button/Button';

const ContactForm = () => {
	const { formData, sending, success, error, handleChange, handleSubmit } = useContactForm();

	return (
		<div className="flex-1">
			<form onSubmit={handleSubmit} className="flex flex-col gap-12">
				<label className="label group">
					<span className="label-text">Name</span>
					<input
						type="text"
						placeholder="Your Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="label-input"
					/>
				</label>
				<label className="label group">
					<span className="label-text">Email</span>
					<input
						type="email"
						placeholder="email@example.com"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="label-input"
					/>
				</label>
				<label className="label group">
					<span className="label-text">Message</span>
					<textarea
						placeholder="Enter text"
						name="message"
						value={formData.message}
						onChange={handleChange}
						className="label-input resize-none min-h-32"
					></textarea>
				</label>
				<Button
					typeBtn="submit"
					styles={{
						width: 158,
					}}
					disabled={sending}
				>
					{sending ? 'Sending...' : 'Send'}
				</Button>
			</form>
			{success && <p className="text-green-500">Message sent successfully!</p>}
			{error && <p className="text-red-500">Something went wrong. Please try again later.</p>}
		</div>
	);
};

export default ContactForm;
