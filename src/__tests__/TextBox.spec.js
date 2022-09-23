/* eslint-disable testing-library/no-render-in-setup */
import * as React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import TextBox from "../components/TextBox";
import { languages } from "../data/languages";
import App from "../App";

describe("TextBox", () => {
	const language = languages[0];

	const setTextToTranslateMock = jest.fn();
	const setTranslatedTextMock = jest.fn();
	const onShowHistoryMock = jest.fn();

	const textBoxComponent = (props) => (
		<TextBox
			selectedLanguage={language}
			setTextToTranslate={setTextToTranslateMock}
			setTranslatedTextMock={setTranslatedTextMock}
			onShowHistory={onShowHistoryMock}
			{...props}
		/>
	);

	it("renders correctly", () => {
		const textBox = renderer.create(textBoxComponent()).toJSON();

		expect(textBox).toMatchSnapshot();
	});

	it("title is correct when type is 'input'", () => {
		render(textBoxComponent({ type: "input" }));

		const input = screen.getByPlaceholderText(language.enterText);

		expect(input).toBeInTheDocument();
	});

	it("renders correct items when type is 'input'", () => {
		render(textBoxComponent({ type: "input" }));

		const icons = screen.getAllByTestId((id) => id.includes("-icon"));
		const iconClasses = icons.map((icon) => icon.className.split(" ")[1]).sort();
		const isAllIconIncluded = ["history", "microphone", "speaker"].every((ico) =>
			iconClasses.includes(ico)
		);

		expect(isAllIconIncluded).toBe(true);
	});

	it("title is correct when type is 'output'", () => {
		render(textBoxComponent({ type: "output" }));

		const input = screen.getByPlaceholderText(language.translation);

		expect(input).toBeInTheDocument();
	});

	it("renders correct items when type is 'output'", () => {
		render(textBoxComponent({ type: "output" }));

		const icon = screen.getByTestId((id) => id.includes("-icon"));
		const iconClass = icon.className.split(" ")[1];
		const isIconIncluded = iconClass === "speaker";

		expect(isIconIncluded).toBe(true);
	});
});
