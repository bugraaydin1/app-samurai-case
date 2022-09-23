/* eslint-disable testing-library/no-render-in-setup */
import { screen, render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import LabelBox from "../components/LabelBox";
import { languages } from "../data/languages";

describe("LabelBox", () => {
	const lang = languages[0].title;

	const labelBoxComponent = <LabelBox selectedLanguage={lang} />;

	beforeEach(() => {
		render(labelBoxComponent);
	});

	afterAll(() => {
		cleanup();
	});

	it("renders correctly", () => {
		const labelBox = renderer.create(labelBoxComponent).toJSON();
		expect(labelBox).toMatchSnapshot();
	});

	it("renders with supplied language", () => {
		const input = screen.getByDisplayValue(lang);
		expect(input).toBeInTheDocument();
	});

	it("has readonly attribute", () => {
		const input = screen.getByDisplayValue(lang);
		const isReadOnly = input.hasAttribute("readonly");
		expect(isReadOnly).toBe(true);
	});
});
