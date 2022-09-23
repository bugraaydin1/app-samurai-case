import Axios from "axios";

const axios = Axios.create({
	// we can either use: "https://libretranslate.com/",
	baseURL: "https://translate.argosopentech.com",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axios;
