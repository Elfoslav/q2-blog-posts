"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import PostForm from "./components/PostForm";
import Header from "@/app/components/Header";
import { BASE_URL } from "@/lib/consts";
import { z } from "zod";
import { postSchema } from "@/models/post";
import { useNotification } from "@/context/NotificationContext";

type PostFormData = z.input<typeof postSchema>;

export default function CreatePost() {
	const router = useRouter();
	const { showNotification } = useNotification();

	const onSubmit = async (data: PostFormData) => {
		const res = await fetch(`${BASE_URL}/api/posts/create`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || "Neznámá chyba při odesílání.");
		}

		showNotification("Příspěvek byl úspěšně vytvořen!", "success");

		router.push("/");
	};

	return (
		<>
			<Header title="Přidání článku" />
			<main className="main main-no-title">
				<PostForm onSubmit={onSubmit} />
			</main>
		</>
	);
}
