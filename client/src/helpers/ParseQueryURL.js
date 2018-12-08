export default (url) => {
	let params = {};
	const string = url.substring(url.indexOf("?")+1).split("&");

	string.map((key) => {
		let item = key.split("=");
		return params[item[0]] = item[1];
	});

	return params;
}