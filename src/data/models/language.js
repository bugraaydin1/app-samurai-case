import PropTypes from "prop-types";

const LanguageShape = {
	title: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	enterText: PropTypes.string.isRequired,
	translation: PropTypes.string.isRequired,
	loading: PropTypes.string.isRequired,
	noHistory: PropTypes.string.isRequired,
	history: PropTypes.string.isRequired,
	flag: PropTypes.string.isRequired,
};

export const Language = PropTypes.shape(LanguageShape);
