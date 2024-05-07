type ConstTodo = {
	title: string;
	description?: string;
};

const TODOS: ConstTodo[] = [
	{
		title: "Send copy to editor for review.",
		description: "Send the first 3 chapters of the book to the editor.",
	},
	{
		title: "Learn more about Cypress framework.",
		description: "What is the Cypress framework about? JavaScript testing?",
	},
	{
		title: "Relax and enjoy the day.",
	},
	{
		title: "Meet with Biology pres. group.",
	},
	{
		title: "Lunch with Patrick Star.",
		description: "Meet at the Krusty Krab at 1pm.",
	},
	{
		title: "Read 3 chapters of 'Clean Code'.",
	},
	{
		title: "Get groceries.",
	},
	{
		title: "Pay electricity bill.",
		description: "The bill is due on the 23rd.",
	},
	{
		title: "Sign up for CSB course.",
		description: "Remember to read instructions!",
	},
	{
		title: "Do laundry.",
	},
	{
		title: "Answer urgent emails.",
	},
	{
		title: "Get a haircut.",
	},
	{
		title: "Clean my room.",
	},
	{
		title: "Purchase flights to Lisbon.",
		description: "Check for the best deals.",
	},
	{
		title: "Find a present for Mom's birthday.",
	},
	{
		title: "Upload wedding photos.",
		description: "Upload the photos to the shared drive.",
	},
	{
		title: "Play the piano.",
	},
	{
		title: "Go for a run.",
		description: "No excuses!",
	},
];

export default TODOS;
