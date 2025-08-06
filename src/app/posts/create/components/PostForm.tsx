"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/models/post";
import "./PostForm.scss";

type PostFormData = z.input<typeof postSchema>;

type Props = {
	onSubmit: (data: PostFormData) => Promise<void>;
};

export default function PostForm({ onSubmit }: Props) {
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostFormData>({
		resolver: zodResolver(postSchema),
	});

	const handleFormSubmit = async (data: PostFormData) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="form-wrapper">
			<form onSubmit={handleSubmit(handleFormSubmit)} className="form">
				<div>
					<label className="label" htmlFor="title-input">
						Titulek
					</label>
					<input
						id="title-input"
						type="text"
						{...register("title")}
						className="input"
					/>
					{errors.title && (
						<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label className="label" htmlFor="content-textarea">
						Obsah
					</label>
					<textarea
						id="content-textarea"
						{...register("content")}
						className="textarea"
					/>
					{errors.content && (
						<p className="text-red-500 text-sm">{errors.content.message}</p>
					)}
				</div>

				<div>
					<label className="label" htmlFor="author-input">
						Autor
					</label>
					<input
						id="author-input"
						type="text"
						{...register("author")}
						className="input"
					/>
					{errors.author && (
						<p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
					)}
				</div>

				<button type="submit" className="btn btn-lg mt-4" disabled={isLoading}>
					{isLoading ? "Odesílám..." : "Odeslat"}
				</button>
			</form>
		</div>
	);
}
