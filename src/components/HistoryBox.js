import { useEffect, useState } from "react";
import { speakTTS } from "../utils/audio";
import { Language } from "../data/models/language";
import Speaker from "./svg/Speaker";
import { languages } from "../data/languages";

const HistoryBox = ({ selectedLanguage }) => {
	const [history, setHistory] = useState([]);

	const getStorageHistory = () => {
		return JSON.parse(localStorage.getItem(`${selectedLanguage.code}`) ?? "[]");
	};

	useEffect(() => {
		setHistory(getStorageHistory());
	}, [selectedLanguage]);

	return (
		<div className="history-wrapper">
			<h6 className="sticky-title">
				{selectedLanguage.flag} {selectedLanguage.history}
			</h6>

			{history.length ? (
				history.map((item, i) => (
					<div className="flex row" key={`${item.source}-${i}`}>
						<div
							className="translation-item icon-button"
							onClick={() => speakTTS(item.source, selectedLanguage.code)}
						>
							<Speaker size="16px" />
							{item.source} →
						</div>

						<div className="translation-item">{item.target}</div>
					</div>
				))
			) : (
				<div>{selectedLanguage.noHistory}</div>
			)}
		</div>
	);
};

export default HistoryBox;

HistoryBox.propTypes = {
	selectedLanguage: Language.isRequired,
};

HistoryBox.defaultProps = {
	selectedLanguage: languages[0],
};
