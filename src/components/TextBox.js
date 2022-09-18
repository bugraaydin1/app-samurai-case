import { useState } from "react";
import LabelBox from "./LabelBox";
import Microphone from "./svg/Microphone";
import { languages } from "../data/languages";

const TextBox = ({
	type,
	setShowModal,
	selectedLanguage,
	setTextToTranslate,
	textToTranslate,
	translatedText,
	setTranslatedText,
}) => {
	const [recording, setRecording] = useState(false);

	const handleClick = () => {
		setTextToTranslate("");
		setTranslatedText("");
	};

	const handleSpeechRecognition = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (SpeechRecognition !== undefined) {
			let recognition = new SpeechRecognition();

			recognition.continuous = false;
			recognition.lang = selectedLanguage.code;
			recognition.interimResults = true;
			recognition.maxAlternatives = 1;

			recognition.start();

			recognition.onspeechend = () => {
				setRecording(false);
				recognition.stop();
			};

			recognition.onresult = (result) => {
				const resolved = result.results[0][0];
				const accuracy = Math.floor(resolved.confidence * 100);

				console.log(`${accuracy}% accurate: ${resolved.transcript}`);

				setTextToTranslate(resolved.transcript.toLowerCase());
			};
		} else {
			console.warn("Speech recognition is not supported ❎");
		}
	};

	const handleRecordToggle = () => {
		if (!recording) {
			handleSpeechRecognition();
		}
		setRecording(!recording);
	};

	const getPlaceholderText = () => {
		const currentLanguage = languages.find((lang) => lang.code === selectedLanguage.code);
		return type === "input" ? currentLanguage.enterText : currentLanguage.translation;
	};

	return (
		<div className={type}>
			<LabelBox className={type} selectedLanguage={selectedLanguage.title} />
			<textarea
				className={type}
				disabled={type === "output"}
				placeholder={getPlaceholderText()}
				onChange={(e) => setTextToTranslate(e.target.value)}
				value={type === "input" ? textToTranslate : translatedText}
			/>
			{type === "input" && (
				<>
					<div className="icon-button delete" onClick={handleClick}>
						˟
					</div>

					<div
						onClick={handleRecordToggle}
						className={`icon-button microphone ${recording ? "microphone-rec" : ""}`}
					>
						<Microphone />
					</div>
				</>
			)}
		</div>
	);
};

export default TextBox;
