import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/consts";
import PostDetail from "./components/PostDetail";
import Header from "@/app/components/Header";

type Params = {
	id: string;
};

export default async function PostDetailPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { id } = await params;

	try {
		const response = await fetch(`${BASE_URL}/api/posts/${id}`);
		const data = await response.json();

		if (!response.ok || !data?.post?.content) {
			console.error("Invalid response:", response, data);
			notFound();
		}

		const post = data.post;

		return (
			<>
				<Header title={post.title} />
				<main className="main">
					<PostDetail post={post} />
				</main>
			</>
		);
	} catch (error) {
		console.error("Error loading post:", error);
		throw error;
	}
}
