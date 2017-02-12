import {Path} from "../lib/path-tools.js";
import {Pattern} from "./pattern.js";

class StripePattern extends Pattern{
	constructor(){
		super("stripe");
	}

	draw(stripeColors, fullWidth, fullHeight){
		const stripeCount = stripeColors.length;
		const stripeUnit = fullHeight / stripeCount;
		let stripeWidth = fullWidth / 64;
		while(stripeWidth / 2 > stripeUnit / 8){
			stripeWidth /= 2;
		}
		const stripeMinHeight = stripeUnit / 8;
		const stripeMaxHeight = stripeUnit / 2;
		const stripeRadius = stripeWidth / 2;

		const path = [];

		for(let i = 0; i < stripeCount; i++){
			const y = i * stripeUnit;
			path.push(new Path(
				stripeColors[i],
				['M', 0, y],
				['L', fullWidth, y],
				['L', fullWidth, y + stripeUnit],
				['L', 0, y + stripeUnit],
				['Z']
			));

			let j = 0;
			for(let x = 0; x < fullWidth; x += stripeWidth){
				const randomHeight =
					Math.floor(
						Math.random() * (stripeMaxHeight - stripeMinHeight)
					) + stripeMinHeight;

				path.push(new Path(
					(i === 0 || j % 2 === 0) ? stripeColors[i] : stripeColors[i - 1],
					['M', x, y - (randomHeight / 2 - stripeRadius)],
					[
						'A',
						//x + fullWidth / 2,
						//y - (randomHeight / 2 - stripeRadius),
						stripeRadius,
						stripeRadius,
						0,
						0,
						1,
						x + stripeWidth,
						y - (randomHeight / 2 - stripeRadius)
					],
					['L', x + stripeWidth, y + (randomHeight / 2 - stripeRadius)],
					[
						'A',
						//x + fullWidth / 2,
						//y + (randomHeight / 2 - stripeRadius),
						stripeRadius,
						stripeRadius,
						0,
						0,
						1,
						x,
						y + (randomHeight / 2 - stripeRadius)
					],
					['Z']
				));
				j++;
			}
		}

		return path;
	}
}

export default StripePattern;
