export default (seconds) => {
	const now = Math.floor(new Date().getTime()/1000);
	const difference = now-seconds;

	if(difference < 120) {
		return "1 minute ago";
	} else if(difference < 3600) {
		return Math.floor(difference/60)+" minutes ago";
	} else if(difference < 86400) {
		return Math.floor(difference/3600)+(difference < 7200 ? " hour ago" : " hours ago");
	} else {
		return Math.floor(difference/3600)+(difference < 7200 ? " hour ago" : " hours ago");
	}
};