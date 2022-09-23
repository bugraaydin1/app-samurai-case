import { speakTTS } from "../utils/audio";
import { Language } from "../data/models/language";
import { languages } from "../data/languages";
import Speaker from "./svgComponents/Speaker";
import PropTypes from "prop-types";

const HistoryBox = ({ history, loading, selectedLanguage }) => {
	return (
		<div className="history-wrapper">
			<h6 className="sticky-title">
				{selectedLanguage.flag} {selectedLanguage.history}
			</h6>

			{!loading ? (
				history.length ? (
					history.map((item, i) => (
						<div className="flex row" key={`${item.source}-${i}`}>
							<div
								className="translation-item icon-button"
								onClick={() => speakTTS(item.source, selectedLanguage.code)}
								data-testid="translation-item"
							>
								<Speaker size="16px" />
								{item.source} →
							</div>

							<div className="translation-item">{item.target}</div>
						</div>
					))
				) : (
					<div>{selectedLanguage.noHistory}</div>
				)
			) : (
				<div>{selectedLanguage.loading}</div>
			)}
		</div>
	);
};

export default HistoryBox;

HistoryBox.propTypes = {
	loading: PropTypes.bool,
	history: PropTypes.array.isRequired,
	selectedLanguage: Language.isRequired,
};

HistoryBox.defaultProps = {
	loading: false,
	history: [],
	selectedLanguage: languages[0],
};
