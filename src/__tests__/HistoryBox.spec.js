import * as React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

import HistoryBox from "../components/HistoryBox";
import { languages } from "../data/languages";
import { history } from "../mocks/history.json";
import * as audio from "../utils/audio";

describe("HistoryBox", () => {
	const language = languages[0];

	const historyComponent = (props) => (
		<HistoryBox loading={false} selectedLanguage={language} {...props} />
	);

	it("renders correctly", () => {
		const historyBox = renderer.create(historyComponent()).toJSON();

		expect(historyBox).toMatchSnapshot();
	});

	it("title is correct", () => {
		render(historyComponent());

		const input = screen.getByText(`${language.flag} ${language.history}`);

		expect(input).toBeInTheDocument();
	});

	it("when no history shows relevant text", () => {
		render(historyComponent());
		const input = screen.getByText(language.noHistory);
		expect(input).toBeInTheDocument();
	});

	it("render correct number of items in history", () => {
		render(historyComponent({ history }));
		const historyItems = screen.getAllByTestId("translation-item");
		expect(historyItems.length).toBe(history.length);
	});

	it("render loading text when loading", () => {
		render(historyComponent({ loading: true }));
		const loadingDiv = screen.getByText(language.loading);
		expect(loadingDiv).toBeInTheDocument();
	});

	it("calls speakTTS function onClick 'translation-item'", () => {
		window.speechSynthesis = jest.fn();
		speechSynthesis.getVoices = jest.fn().mockReturnValue([{ lang: "en" }]);
		audio.speakTTS = jest.fn();

		render(historyComponent({ history }));

		const translationItemDivs = screen.getAllByTestId("translation-item");
		fireEvent.click(translationItemDivs[0]);

		expect(audio.speakTTS).toHaveBeenCalled();
		expect(audio.speakTTS).toHaveBeenCalledWith(undefined, "en");
	});
});
