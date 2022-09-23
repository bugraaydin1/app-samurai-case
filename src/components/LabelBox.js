import PropTypes from "prop-types";

const LabelBox = ({ selectedLanguage }) => {
	return (
		<div className="label-box">
			<input readOnly value={selectedLanguage} />
		</div>
	);
};

export default LabelBox;

LabelBox.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
};

LabelBox.defaultProps = {
	selectedLanguage: "",
};
