"use client";

import type { ReactNode } from "react";

export const Button = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<button type="button" className={`${className} ui:text-5xl`}>
			{children}
		</button>
	);
};
