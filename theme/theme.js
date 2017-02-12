class StyleSet{
	constructor(match, ...colors){
		this.match = match;
		this.colors = colors;
	}
}

class Theme{
	constructor(themeName, ...styles){
		this.name = themeName;
		this.styles = styles;
	}

	getMatchingStyleSet(){
		return this.styles.find(
			(v) => v.match.test(new Date().toISOString())
		);
	}
}

class ThemeChooser{
	constructor(){
		this._themes = {};
	}

	addTheme(theme){
		this._themes[theme.name] = theme;
	}

	getTheme(name){
		return this._themes[name];
	}
}

export {Theme, ThemeChooser, StyleSet};
