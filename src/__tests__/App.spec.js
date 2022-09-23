import * as React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../App";
import { languages } from "../data/languages";

describe("App", () => {
	const language = languages[0];

	beforeEach(() => {
		localStorage.clear();
	});

	it("renders correctly", () => {
		const app = renderer.create(<App />).toJSON();
		expect(app).toMatchSnapshot();
	});

	it("clicking on arrows changes language input <-> output", () => {
		render(<App />);

		const inputLabel = screen.getByDisplayValue(language.title);
		const outputLabel = screen.getByDisplayValue(languages[1].title);
		const arrows = screen.getByTestId("arrow-container");

		fireEvent.click(arrows);

		expect(inputLabel).toHaveValue(languages[1].title);
		expect(outputLabel).toHaveValue(language.title);

		fireEvent.click(arrows);

		expect(inputLabel).toHaveValue(language.title);
		expect(outputLabel).toHaveValue(languages[1].title);
	});

	it("when typed input 'car' output value should be 'Translating...'", async () => {
		render(<App />);

		const inputArea = screen.getByPlaceholderText(language.enterText);
		const outputArea = screen.getByPlaceholderText(languages[1].translation);

		fireEvent.change(inputArea, { target: { value: "car" } });

		expect(inputArea).toHaveValue("car");
		await waitFor(() => expect(outputArea).toHaveValue(language.loading));
	});

	it("renders historyBox when clicked history icon", () => {
		render(<App />);

		let historyBox;
		try {
			historyBox = screen.getByTestId("history-wrapper");
		} catch (err) {}

		expect(historyBox).toBeFalsy();

		const historyButton = screen.getByTestId("history-icon");
		fireEvent.click(historyButton);
		historyBox = screen.getByTestId("history-wrapper");

		expect(historyBox).toBeInTheDocument();
	});

	it.todo("renders text in historyBox, written to input textbox");
});
