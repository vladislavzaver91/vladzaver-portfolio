import ContactAddressLinks from './ContactAddressLinks'
import ContactForm from './ContactForm'

const ContactComponent = () => {
	return (
		<div className='wrapper'>
			<div className='flex gap-7 w-full'>
				<h3 className='flex-1 font-extrabold text-5xl leading-[1.15] text-primeColor font-montserrat'>
					Get In Touch With Me
				</h3>
				<ContactForm />
			</div>
			<ContactAddressLinks />
		</div>
	)
}

export default ContactComponent
