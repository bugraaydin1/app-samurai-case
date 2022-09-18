import { useState } from "react";
import LabelBox from "./LabelBox";
import Microphone from "./svg/Microphone";
import Speaker from "./svg/Speaker";
import { languages } from "../data/languages";

const TextBox = ({
	type,
	loading,
	setShowModal,
	selectedLanguage,
	setTextToTranslate,
	textToTranslate,
	translatedText,
	setTranslatedText,
}) => {
	const [recording, setRecording] = useState(false);

	const voices = speechSynthesis?.getVoices();

	const handleClick = () => {
		setTextToTranslate("");
		setTranslatedText("");
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

	const handleRecordToggle = () => {
		if (!recording) {
			handleSpeechRecognition();
		}
		setRecording(!recording);
	};

	const handleTextToSpeech = (type) => {
		if (type === "output" ? !translatedText : !textToTranslate) return;

		if (window.speechSynthesis !== undefined) {
			const utterance = new SpeechSynthesisUtterance();

			utterance.volume = 0.5;
			utterance.rate = 1;
			utterance.pitch = 1;
			utterance.lang = selectedLanguage.code;
			utterance.voice = voices.find((voice) => voice.lang.startsWith(selectedLanguage.code));
			utterance.text = type === "output" ? translatedText : textToTranslate;

			!loading && speechSynthesis.speak(utterance);
		} else {
			console.warn("Text To Speech is not supported ❎");
		}
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

					<div onClick={handleTextToSpeech} className={"icon-button speaker"}>
						<Speaker />
					</div>
				</>
			)}

			{type === "output" && (
				<div onClick={() => handleTextToSpeech("output")} className={"icon-button speaker"}>
					<Speaker />
				</div>
			)}
		</div>
	);
};

export default TextBox;
