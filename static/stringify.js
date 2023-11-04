let cons = { lang: {} };
const setConstants = ({
	versesPerPage,
	reversedPages,
	surahAdj,
	$vuetify = {},
}) => {
	cons.lang.isEn = $vuetify.locale?.current == "en";
	cons.versesPerPage = versesPerPage;
	cons.reversedPages = reversedPages;
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
	versesPerPage,
	surahAdj,
	$vuetify,
	showDate,
}) => {
	// if there is nothing
	if (!title && !day) return;
	title = $vuetify.locale.t(`$vuetify.${title}`);
	// set all the constants
	setConstants({ versesPerPage, surahAdj, $vuetify });
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
//
class Quran_Pages {
	constructor(order_reversed) {
		this.pages = order_reversed
			? cons.reversedPages.pages
			: cons.versesPerPage.pages;
	}
	pageAt(realNum) {
		return this.pages[realNum - 1];
	}
}
// get verses from pages
const pageToVerse = ({ from, to, order_reversed, consValues }) => {
	// set all the constants
	if (consValues) setConstants(consValues);
	const quran = new Quran_Pages(order_reversed);
	// set from
	if (from % 1)
		// get the verse after middle one
		from = quran.pageAt(~~from).verses.reduce((acc, curr) => {
			if (curr.isMiddle) return true;
			if (acc === true) return curr;
			return acc;
		}, false);
	else from = quran.pageAt(from).verses[0];
	// set to
	if (to % 1) to = quran.pageAt(~~to).verses.find((v) => v.isMiddle);
	else to = quran.pageAt(to).verses.at(-1);
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
	const [surah, ayah] = verse_key.split(":"),
		lang = cons.$vuetify.locale.current,
		nameLang = lang == "en" ? "name_simple" : "name_arabic";
	return `${cons.surahAdj.chapters[+surah - 1][nameLang]} ${
		cons.lang.ayah
	} ${ayah}`;
};
// export
module.exports = { stringify, pageToVerse, verseKeyToName };
