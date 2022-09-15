import { useState } from "react";
import axios from "axios";

import TextBox from "./components/TextBox";
import Button from "./components/Button";
import Arrows from "./components/svg/Arrows";

const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [inputLanguage, setInputLanguage] = useState("English");
	const [outputLanguage, setOutputLanguage] = useState("Türkçe");
	const [textToTranslate, setTextToTranslate] = useState("");
	const [translatedText, setTranslatedText] = useState("");

	const translate = async () => {
		console.log("translate");

		const data = {
			textToTranslate,
			outputLanguage,
			inputLanguage,
		};

		const response = await axios.get("http://localhost:8000/translation", {
			params: data,
		});

		console.log("response", response);
		setTranslatedText(response.data);
	};

	const handleClick = () => {
		setInputLanguage(outputLanguage);
		setOutputLanguage(inputLanguage);
	};

	return (
		<div className="app">
			{!showModal && (
				<>
					<TextBox
						type={"input"}
						setShowModal={setShowModal}
						selectedLanguage={inputLanguage}
						setTextToTranslate={setTextToTranslate}
						textToTranslate={textToTranslate}
						setTranslatedText={setTranslatedText}
					/>
					<div className="arrow-container" onClick={handleClick}>
						<Arrows />
					</div>
					<TextBox
						type={"output"}
						setShowModal={setShowModal}
						selectedLanguage={outputLanguage}
						translatedText={translatedText}
					/>
					<div className="button-container" onClick={translate}>
						<Button />
					</div>
				</>
			)}
		</div>
	);
};

export default App;
