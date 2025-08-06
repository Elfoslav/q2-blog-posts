import DOMPurify from "isomorphic-dompurify";
import { Post } from "@/models/post";

export default function PostDetailPage({ post }: { post: Post }) {
	const formatTextWithLineBreaks = (text: string) => {
		return DOMPurify.sanitize(text.replace(/\n/g, "<br />"));
	};

	return (
		<main className="main main-no-title">
			<div className="flex flex-col md:flex-row gap-6">
				<aside className="w-full md:w-[160px] text-gray-700 font-semibold">
					<div className="flex items-center justify-between">
						<p className="text-[12px] whitespace-nowrap">{post.author}</p>
						<div className="hidden xl:block h-px bg-[#C4C4C4] w-[34px]" />
					</div>
				</aside>

				<article className="md:flex-1 lg:max-w-3/4 text-[14px]">
					<div
						dangerouslySetInnerHTML={{
							__html: formatTextWithLineBreaks(post.content),
						}}
					/>
				</article>
			</div>
		</main>
	);
}
