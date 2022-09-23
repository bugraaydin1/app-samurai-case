import { useCallback, useEffect, useState } from "react";
import axios from "./config/axios";

import TextBox from "./components/TextBox";
import HistoryBox from "./components/HistoryBox";
import Arrows from "./components/svgComponents/Arrows";
import { languages } from "./data/languages";

const App = () => {
	const [inputLanguage, setInputLanguage] = useState(languages[0]);
	const [outputLanguage, setOutputLanguage] = useState(languages[1]);
	const [textToTranslate, setTextToTranslate] = useState("");
	const [translatedText, setTranslatedText] = useState("");
	const [translateLoading, setTranslateLoading] = useState(false);

	const [showHistory, setShowHistory] = useState(false);
	const [history, setHistory] = useState([]);

	const debounceTime = 800;

	const saveToHistory = useCallback(
		(textToTranslate, translate) => {
			let history = JSON.parse(localStorage.getItem(`${inputLanguage.code}`) ?? "[]");

			const isAlreadyInHistory = history.some((obj) => obj.source === textToTranslate);

			if (!isAlreadyInHistory) {
				localStorage.setItem(
					`${inputLanguage.code}`,
					JSON.stringify([...history, { source: textToTranslate, target: translate }])
				);
			}
		},
		[inputLanguage.code]
	);

	const handleStorageHistory = useCallback(() => {
		const storageHistory = JSON.parse(localStorage.getItem(`${inputLanguage.code}`) ?? "[]");
		setHistory(storageHistory);
	}, [inputLanguage.code]);

	const translate = useCallback(async () => {
		setTranslateLoading(true);

		const data = {
			q: textToTranslate,
			source: inputLanguage.code,
			target: outputLanguage.code,
		};

		const response = await axios.post("/translate", data);
		const translate = response.data.translatedText?.toLowerCase();

		setTranslatedText(translate);
		saveToHistory(textToTranslate, translate);
		handleStorageHistory();
		setTranslateLoading(false);
	}, [
		textToTranslate,
		inputLanguage.code,
		outputLanguage.code,
		handleStorageHistory,
		saveToHistory,
	]);

	useEffect(() => {
		let translateTimer;
		if (textToTranslate) {
			translateTimer = setTimeout(() => {
				translate();
			}, debounceTime);
		}

		return () => {
			clearTimeout(translateTimer);
		};
	}, [textToTranslate, translate]);

	const handleToggleLanguages = () => {
		setTextToTranslate(translatedText);
		setTranslatedText(textToTranslate);
		setInputLanguage(outputLanguage);
		setOutputLanguage(inputLanguage);
	};

	return (
		<div className="app">
			<div className="flex">
				<TextBox
					type="input"
					className="input"
					loading={translateLoading}
					selectedLanguage={inputLanguage}
					setTextToTranslate={setTextToTranslate}
					textToTranslate={textToTranslate}
					setTranslatedText={setTranslatedText}
					onShowHistory={() => setShowHistory(!showHistory)}
				/>
				<div className="arrow-container" onClick={handleToggleLanguages}>
					<Arrows />
				</div>
				<TextBox
					type="output"
					loading={translateLoading}
					selectedLanguage={outputLanguage}
					translatedText={!translateLoading ? translatedText : inputLanguage.loading}
				/>
			</div>

			{showHistory && (
				<HistoryBox loading={translateLoading} history={history} selectedLanguage={inputLanguage} />
			)}
		</div>
	);
};

export default App;
