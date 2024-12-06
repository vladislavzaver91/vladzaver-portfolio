import Link from 'next/link';
import { ADDRESS } from '../Footer/address.data';

const ContactAddressLinks = () => {
	return (
		<address className="mt-7">
			<ul className="flex justify-between">
				{ADDRESS.map(item => (
					<li key={item.name}>
						{item.name === 'email' ? (
							<Link
								href={item.href}
								target="_blank"
								rel="noopener nofollow noreferrer"
								className="font-bold text-2xl tracking-extra-tight text-secondTextColor not-italic link-hover"
							>
								{item.descr}
							</Link>
						) : (
							<Link
								href={item.href}
								className="font-bold text-2xl tracking-extra-tight text-secondTextColor not-italic link-hover"
							>
								{item.descr}
							</Link>
						)}
					</li>
				))}
			</ul>
		</address>
	);
};

export default ContactAddressLinks;
