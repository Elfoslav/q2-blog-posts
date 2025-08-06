import PostsList from "@/app/components/PostsList";
import Header from "@/app/components/Header";

export default function Home() {
	return (
		<>
			<Header title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
			<main className="main">
				<h2 className="sub-heading">Nejnovější</h2>

				<section className="content">
					<PostsList />
				</section>
			</main>
		</>
	);
}
