import {Theme, ThemeChooser, StyleSet} from "./theme.js";

const SeasonsTheme = new Theme(
	"default",
	new StyleSet(
		/^\d+-(02|03|04)-.+$/,
		'#f8bbd0',
		'#f06292',
		'#e91e63',
		'#c2185b',
		'#880e4f',
		'#ffffff'
	),
	new StyleSet(
		/^\d+-(05|06|07)-.+$/,
		'#ffeb3b',
		'#cddc39',
		'#8bc34a',
		'#4caf50',
		'#009688',
		'#ffffff'
	),
	new StyleSet(
		/^\d+-(08|09|10)-.+$/,
		'#ff9800',
		'#fb8c00',
		'#f57c00',
		'#ef6c00',
		'#e65100',
		'#ffffff'
	),
	new StyleSet(
		/^\d+-(11|12|01)-.+$/,
		'#e1f5fe',
		'#4fc3f7',
		'#03a9f4',
		'#0288d1',
		'#01579b',
		'#ffffff'
	)
);

const themeChooser = new ThemeChooser();
themeChooser.addTheme(SeasonsTheme);

export default themeChooser;
