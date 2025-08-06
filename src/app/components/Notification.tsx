"use client";

import React from "react";
import { useNotification } from "@/context/NotificationContext";

export default function Notification() {
	const { message, type } = useNotification();

	if (!message) return null;

	const bgColor =
		type === "success"
			? "bg-green-600"
			: type === "error"
			? "bg-red-600"
			: "bg-blue-600";

	return (
		<div
			className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white animate-fadeIn ${bgColor} z-[9999]`}
			role="alert"
		>
			{message}
		</div>
	);
}
