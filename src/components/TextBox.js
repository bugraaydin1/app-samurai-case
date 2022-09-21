import { useState } from "react";
import LabelBox from "./LabelBox";
import Speaker from "./svg/Speaker";
import History from "./svg/History";
import Microphone from "./svg/Microphone";
import { speakTTS } from "../utils/audio";
import { languages } from "../data/languages";

const TextBox = ({
	type,
	loading,
	selectedLanguage,
	setTextToTranslate,
	textToTranslate,
	translatedText,
	setTranslatedText,
	onShowHistory,
}) => {
	const [recording, setRecording] = useState(false);

	const text = type === "output" ? translatedText : textToTranslate;

	const handleDelete = () => {
		setTextToTranslate("");
		setTranslatedText("");
	};

	const handleRecordToggle = () => {
		if (!recording) {
			handleSpeechRecognition();
		}
		setRecording(!recording);
	};

	const handleSpeechRecognition = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (SpeechRecognition !== undefined) {
			const recognition = new SpeechRecognition();

			recognition.continuous = false;
			recognition.lang = selectedLanguage.code;
			recognition.interimResults = true;
			recognition.maxAlternatives = 1;

			recognition.start();

			recognition.onspeechend = () => {
				recognition.stop();
				setRecording(false);
			};

			recognition.onresult = (result) => {
				const resolved = result.results[0][0];
				const accuracy = Math.floor(resolved.confidence * 100);

				console.log(`${accuracy}% accurate: ${resolved.transcript}`);

				setTextToTranslate(resolved.transcript.toLowerCase());

				// for mac safari to stop rec.
				recognition.stop();
			};
		} else {
			console.warn("Speech recognition is not supported ❎");
		}
	};

	const handleTextToSpeech = () => {
		speakTTS(text, selectedLanguage.code, loading);
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
				<div className="action-buttons">
					<div className="icon-button delete" onClick={handleDelete}>
						˟
					</div>
					<div
						onClick={handleRecordToggle}
						className={`icon-button microphone ${recording ? "microphone-rec" : ""}`}
					>
						<Microphone />
					</div>
					<div className={"icon-button speaker"} onClick={handleTextToSpeech}>
						<Speaker />
					</div>
					<div onClick={onShowHistory} className={"icon-button history"}>
						<History />
					</div>
				</div>
			)}

			{type === "output" && (
				<div className={"icon-button speaker"} onClick={handleTextToSpeech}>
					<Speaker />
				</div>
			)}
		</div>
	);
};

export default TextBox;
