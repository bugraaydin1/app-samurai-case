/**
 * Speaks supplied text
 * @param {string} text
 * @param {string} languageCode
 * @param {boolean=} loading
 */

export const speakTTS = (text, languageCode, loading) => {
	const voices = speechSynthesis?.getVoices();

	if (!text) return;

	if (window.speechSynthesis !== undefined) {
		const utterance = new SpeechSynthesisUtterance();

		utterance.volume = 0.5;
		utterance.rate = 1;
		utterance.pitch = 1;
		utterance.text = text;
		utterance.lang = languageCode;
		utterance.voice = voices.find((voice) => voice.lang.startsWith(languageCode));

		!loading && speechSynthesis.speak(utterance);
	} else {
		console.warn("Text To Speech is not supported ❎");
	}
};
