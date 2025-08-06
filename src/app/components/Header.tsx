"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
	title: string;
};

const navLinks = [
	{
		name: "Blog",
		href: "/",
	},
	{
		name: "Přidat článek",
		href: "/posts/create",
	},
];

export default function Header({ title }: HeaderProps) {
	const pathname = usePathname();

	const isLinkActive = (href: string) =>
		pathname === href || (pathname.startsWith(href) && href !== "/");

	return (
		<header className="header">
			<div className="absolute inset-0 bg-[#343A40]/40 h-20"></div>
			<div className="relative z-10 text-white p-4">
				<div className="container mx-auto flex justify-between items-center">
					<Link href="/">
						<Image
							className="dark:invert"
							src="/images/logo.png"
							alt="Q2 logo"
							width={81}
							height={54}
						/>
					</Link>

					<div className="header-links">
						{navLinks.map(({ name, href }) => {
							return (
								<Link
									key={name}
									href={href}
									className={`header-link ${
										isLinkActive(href) ? "active" : null
									}`}
								>
									{name}
								</Link>
							);
						})}
					</div>
				</div>

				<div className="container mx-auto">
					<h1 className="main-heading">{title}</h1>
				</div>
			</div>
		</header>
	);
}
