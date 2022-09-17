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

	const handleRecord = () => {
		console.log("start recording!");
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
						onClick={handleRecord}
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
