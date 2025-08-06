import React from "react";
import Image from "next/image";
import { Post } from "@/models/post";
import "./PostsList.scss";
import Link from "next/link";
import { BASE_URL } from "@/lib/consts";

async function getPosts() {
	const res = await fetch(`${BASE_URL}/api/posts`, {
		cache: "no-store",
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		const errorData = await res.json();
		console.log(errorData);
		throw new Error(errorData.message || "Chyba při načítání článků.");
	}

	const data = await res.json();
	if (data) {
		return data.applications;
	}

	return [];
}

export default async function PostsList() {
	const posts = await getPosts();

	return (
		<div className="posts-list">
			{posts.map((post: Post) => (
				<Link
					href={`/posts/${post.id}`}
					className="post-item group"
					key={post.id}
				>
					{/* Overlay */}
					<div className="hover-overlay" />

					<Image
						className="post-image"
						src={post.image || "/images/img-placeholder.jpg"}
						alt="placeholder"
						width={310}
						height={280}
						style={{ maxHeight: "280px" }}
					/>
					<div className="author">{post.author}</div>
					<div className="title">{post.title}</div>
					<div className="content">{post.content}</div>
				</Link>
			))}
		</div>
	);
}
