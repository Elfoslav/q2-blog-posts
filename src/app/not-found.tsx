import React from "react";
import Header from "./components/Header";

export default function notFound() {
	return (
		<>
			<Header title="404 - Page not found" />
			<div className="h-screen text-center flex flex-col items-center justify-center font-sans">
				<div className="flex items-center">
					<h1 className="text-[24px] font-medium leading-[49px] border-r border-black dark:border-white pr-6 mr-5">
						404
					</h1>
					<div>
						<h2 className="text-[14px] font-normal leading-[49px] m-0">
							This page could not be found.
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
