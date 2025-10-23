import { Button } from "@repo/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Button",
	component: Button,
	tags: ["docs"],
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary",
	},
};
