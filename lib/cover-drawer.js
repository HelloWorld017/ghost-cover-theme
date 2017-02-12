import {SVGObject} from "./path-tools.js"

import gcTheme from "../theme/index.js";
import gcPattern from "../pattern/index.js";

class CoverDrawer{
	constructor(pattern, theme){
		this.pattern = pattern;
		this.theme = theme;
	}

	drawPattern(width, height){
		return new SVGObject(width, height,
			gcPattern.getPattern(this.pattern).draw(
				gcTheme.getTheme(this.theme).getMatchingStyleSet().colors,
				width,
				height
			)
		);
	}
}

export default CoverDrawer;
