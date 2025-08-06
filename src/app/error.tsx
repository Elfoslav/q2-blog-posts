"use client";

import { useEffect } from "react";
import Header from "./components/Header";

export default function GlobalError({ error }: { error: Error }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<>
			<Header title={`Error - ${error.message}`} />
			<main className="main">
				<h2 className="sub-heading">An error occured</h2>

				<section className="content">
					<p>{error.message}</p>
					<button className="btn mt-4" onClick={() => location.reload()}>
						Try again
					</button>
				</section>
			</main>
		</>
	);
}
