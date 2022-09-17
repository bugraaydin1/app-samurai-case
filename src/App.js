import { useCallback, useEffect, useState } from "react";
import axios from "./data/api/axios";

import TextBox from "./components/TextBox";
import Arrows from "./components/svg/Arrows";
import { languages } from "./data/languages";

const App = () => {
	const [inputLanguage, setInputLanguage] = useState(languages[0]);
	const [outputLanguage, setOutputLanguage] = useState(languages[1]);
	const [textToTranslate, setTextToTranslate] = useState("");
	const [translatedText, setTranslatedText] = useState("");
	const [translateLoading, setTranslateLoading] = useState(false);

	const debounceTime = 800;

	const translate = useCallback(async () => {
		setTranslateLoading(true);

		const data = {
			q: textToTranslate,
			source: inputLanguage.code,
			target: outputLanguage.code,
		};

		const response = await axios.post("/translate", data);

		setTranslatedText(response.data.translatedText?.toLowerCase());
		setTranslateLoading(false);
	}, [textToTranslate, inputLanguage.code, outputLanguage.code]);

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

	const handleClick = () => {
		setTextToTranslate(translatedText);
		setTranslatedText(textToTranslate);
		setInputLanguage(outputLanguage);
		setOutputLanguage(inputLanguage);
	};

	return (
		<div className="app">
			<TextBox
				type="input"
				className="input"
				selectedLanguage={inputLanguage}
				setTextToTranslate={setTextToTranslate}
				textToTranslate={textToTranslate}
				setTranslatedText={setTranslatedText}
			/>
			<div className="arrow-container" onClick={handleClick}>
				<Arrows />
			</div>
			<TextBox
				type="output"
				selectedLanguage={outputLanguage}
				translatedText={!translateLoading ? translatedText : inputLanguage.loading}
			/>
		</div>
	);
};

export default App;
