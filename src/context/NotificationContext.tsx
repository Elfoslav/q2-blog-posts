"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "success" | "error" | "info";

type NotificationContextType = {
	message: string | null;
	type: NotificationType;
	showNotification: (message: string, type?: NotificationType) => void;
	hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<NotificationType>("info");

	const showNotification = (
		msg: string,
		notifType: NotificationType = "info"
	) => {
		setMessage(msg);
		setType(notifType);

		// Auto-hide after 4 seconds
		setTimeout(() => {
			setMessage(null);
		}, 4000);
	};

	const hideNotification = () => {
		setMessage(null);
	};

	return (
		<NotificationContext.Provider
			value={{ message, type, showNotification, hideNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotification() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotification must be used within a NotificationProvider"
		);
	}
	return context;
}
