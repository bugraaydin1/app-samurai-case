import { useState } from "react";
import LabelBox from "./LabelBox";
import Microphone from "./svg/Microphone";

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

	return (
		<div className={type}>
			<LabelBox style={type} selectedLanguage={selectedLanguage} />
			<textarea
				className={type}
				disabled={type === "output"}
				placeholder={type === "input" ? "Enter text" : "Translation"}
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