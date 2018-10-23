export default (seconds, lang) => {
	const now = Math.floor(new Date().getTime()/1000);
	const difference = now-seconds;

	if(difference < 120) {
		return `1 ${lang.shorts.minute} ${lang.shorts.ago}`;
	} else if(difference < 3600) {
		return Math.floor(difference/60)+` ${lang.shorts.minutes} ${lang.shorts.ago}`;
	} else if(difference < 86400) {
		return Math.floor(difference/3600)+(difference < 7200 ? ` ${lang.shorts.hour} ${lang.shorts.ago}` : ` ${lang.shorts.hours} ${lang.shorts.ago}`);
	} else {
		return Math.floor(difference/86400)+(difference < 100000 ? ` ${lang.shorts.day} ${lang.shorts.ago}` : ` ${lang.shorts.days} ${lang.shorts.ago}`);
	}
};