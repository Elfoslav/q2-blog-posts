import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/consts";
import PostDetail from "./components/PostDetail";
import Loading from "@/app/components/Loading";
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

		if (!response.ok) {
			console.error("Response not ok:", response, data);
			throw new Error(`Failed to load post: ${response.statusText}`);
		}

		// Check if post is missing or malformed
		if (!data?.post || !data.post.content) {
			console.error("Post not found or malformed:", data);
			notFound();
		}

		const post = data.post;
		// console.log(response, post);

		return (
			<>
				<Header title={post.title} />
				<main className="main">
					<Suspense fallback={<Loading />}>
						<PostDetail post={post} />
					</Suspense>
				</main>
			</>
		);
	} catch (error) {
		console.error("Error loading post:", error);
		throw error;
	}
}
