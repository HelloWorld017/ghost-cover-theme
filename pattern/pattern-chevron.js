import {Path} from "../lib/path-tools.js";
import {Pattern} from "./pattern.js";

class ChevronPattern extends Pattern{
	constructor(){
		super("chevron");
	}

	draw(chevronColors, fullWidth, fullHeight){
		const peakXCount = 5;
		const peakYCount = chevronColors.length - 1;
		const peakHeight = fullHeight / peakYCount;
		const peakWidth = fullWidth / peakXCount;

		const path = [];

		for(let y = 0; y < peakYCount; y++){
			let yPath = [];
			let cy = (y) * peakHeight;
			for(let x = 0; x < peakXCount; x++){
				let cx = x * peakWidth;
				yPath.push(
					['M', cx, cy + peakHeight],
					['v', -peakHeight],
					['l', peakWidth / 2, -peakHeight],
					['l', peakWidth / 2, peakHeight],
					['v', peakHeight],
					['l', -peakWidth / 2, -peakHeight],
					['Z']
				);
			}
			path.push(new Path(chevronColors[y], ...yPath));
		}

		return path;
	}
}

export default ChevronPattern;
