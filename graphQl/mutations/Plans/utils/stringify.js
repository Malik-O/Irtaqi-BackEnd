let cons = { lang: {} };
const versesPerPage = require("./versesPerPage");
const setConstants = ({ surahAdj, $vuetify = {} }) => {
	cons.lang.isEn = $vuetify.locale?.current == "en";
	cons.surahAdj = surahAdj;
	// translations
	cons.$vuetify = $vuetify;
	cons.lang.from = $vuetify.locale?.t("$vuetify.from");
	cons.lang.to = $vuetify.locale?.t("$vuetify.to");
	cons.lang.ayah = $vuetify.locale?.t("$vuetify.ayah");
	cons.lang.rabt = $vuetify.locale?.t("$vuetify.rabt");
};
// day to string
const stringify = ({
	courseTitle,
	title,
	day,
	details,
	surahAdj,
	$vuetify,
	showDate,
}) => {
	// if there is nothing
	if (!title && !day) return;
	title = $vuetify.locale.t(`$vuetify.${title}`);
	// set all the constants
	setConstants({ surahAdj, $vuetify });
	// if the course is quran
	if (courseTitle.toLowerCase() === "quran") {
		let str = rangeToStr(day);
		// if (details) str = `${title}: ${str}`;
		// if (showDate) {
		//     let lang = cons.lang.isEn ? "en-GB" : "ar-EG",
		//         spread = cons.lang.isEn ? "," : "،",
		//         date = new Intl.DateTimeFormat(lang, { dateStyle: "full" })
		//             .format(day.date)
		//             .split(spread)[1];
		//     str = `<p>${date}</p> ${str}`;
		// }
		return str;
	} // normal book
	else {
		let de = [];
		let str = `${title}: from page ${day.from} to ${day.to}\n`;
		// details
		// if (!details) str = `${title}: ${str}`;
		de.push({ title: title, str });
		// rabt
		// if (day.rabt_from) {
		//     if (!details) str = `${title} ${cons.lang.rabt}: `;
		//     str += `from page ${day.rabt_from} to ${Math.max(day.from - 1, 1)}`;
		//     if (details) de.push({ title: `${title} ${cons.lang.rabt}`, str });
		// }
		return details ? de : str;
	}
};
// get verses from pages
const pageToVerse = ({ from, to, consValues }) => {
	// set all the constants
	if (consValues) setConstants(consValues);
	const amount = to - from;
	// set from
	if (from % 1)
		// get the verse after middle one
		from = versesPerPage.pages[~~from - 1].reduce((acc, curr) => {
			if (curr.isMiddle) return true;
			if (acc === true) return curr;
			return acc;
		}, false);
	else from = versesPerPage.pages[from - 1][0];
	// set to
	if (to % 1) to = versesPerPage.pages[~~to - 1].find((v) => v.isMiddle);
	else to = versesPerPage.pages[to - 1].at(-1);
	// return
	return { from: from?.verse_key, to: to?.verse_key };
};
// verse range string
const rangeToStr = ({ from, to }) => {
	// var { from, to } = pageToVerse({ from, to });
	// translate verse key to a name
	from = verseKeyToName(from);
	to = verseKeyToName(to);
	return `${cons.lang.from} ${from} ${cons.lang.to} ${to}`;
};
//
const verseKeyToName = (verse_key, consValues) => {
	// set all the constants
	if (consValues) setConstants(consValues);
	// console.log(verse_key);
	const [surah, ayah] = verse_key.split(":"),
		lang = cons.$vuetify.locale.current,
		nameLang = lang == "en" ? "name_simple" : "name_arabic";
	return `${cons.surahAdj.chapters[+surah - 1][nameLang]} ${
		cons.lang.ayah
	} ${ayah}`;
};
// export
module.exports = { stringify, pageToVerse, verseKeyToName };
