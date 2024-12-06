import Link from 'next/link';
import Button from '../Button/Button';
import { ADDRESS } from './address.data';
import SocialLinkList from './SocialLinkList';

const Footer = () => {
	return (
		<footer className="bg-secondBgColor shadow-custom section-component pb-28">
			<div className="container">
				<div className="wrapper flex justify-between items-center">
					{/* address thumb */}
					<div>
						<h3 className="font-bold text-2xl tracking-extra-tight mb-7">Contact</h3>
						<address>
							<ul>
								{ADDRESS.map(item => (
									<li key={item.name} className="mb-2 last:mb-0">
										{item.name === 'email' ? (
											<Link
												href={item.href}
												target="_blank"
												rel="noopener nofollow noreferrer"
												className="font-semibold text-sm tracking-extra-tight text-secondTextColor not-italic link-hover"
											>
												{item.descr}
											</Link>
										) : (
											<Link
												href={item.href}
												className="font-semibold text-sm tracking-extra-tight text-secondTextColor not-italic link-hover"
											>
												{item.descr}
											</Link>
										)}
									</li>
								))}
							</ul>
						</address>
					</div>
					{/* social links */}
					<SocialLinkList />
					{/* Get in touch btn */}
					<div>
						<Button isLink href="/contact">
							Get In Touch
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
