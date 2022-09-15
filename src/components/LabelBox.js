const LabelBox = ({ style, selectedLanguage }) => {
	return (
		<div className="label-box">
			<input readOnly value={selectedLanguage} />
		</div>
	);
};

export default LabelBox;
