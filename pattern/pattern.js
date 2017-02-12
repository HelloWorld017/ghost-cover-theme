class Pattern{
	constructor(name){
		this._name = name;
	}

	get name(){
		return this._name;
	}

	set name(v){
		throw new Error("Cannot set pattern name!");
	}

	draw(colors, fullWidth, fullHeight){}
}

class PatternChooser{
	constructor(){
		this._patterns = {};
	}

	addPattern(pattern){
		this._patterns[pattern.name] = pattern;
	}

	getPattern(name){
		return this._patterns[name];
	}
}


export {Pattern, PatternChooser};
