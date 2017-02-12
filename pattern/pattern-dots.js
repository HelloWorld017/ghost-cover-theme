import {Path} from "../lib/path-tools.js";
import {Pattern} from "./pattern.js";

class DotsPattern extends Pattern{
	constructor(){
		super("dots");
	}

	draw(unitColors, fullWidth, fullHeight){
		const unitYCount = 50;
		const unitHeight = fullHeight / unitYCount;
		const unitWidth = unitHeight;
		const unitXCount = Math.ceil(fullWidth / unitWidth);

		const section = unitYCount / unitColors.length;

		const path = [];
		const colorPath = [];

		const fields = [];

		const getCurrentSection = (y) => y / section;
		const drawCornered = (x, y, args) => {
			const corners = {
				lu: true,
				ld: true,
				ru: true,
				rd: true,
				ilu: false,
				ild: false,
				iru: false,
				ird: false
			};

			if(args.left) corners.lu = false, corners.ld = false;
			if(args.right) corners.ru = false, corners.rd = false;
			if(args.up) corners.lu = false, corners.ru = false;
			if(args.down) corners.ld = false, corners.rd = false;

			if(args.left && args.up) corners.ilu = true;
			if(args.right && args.up) corners.iru = true;
			if(args.left && args.down) corners.ild = true;
			if(args.right && args.down) corners.ird = true;

			const calculatedX = unitWidth * x;
			const calculatedY = unitHeight * y;
			const calculatedW = unitWidth / 2;
			const calculatedH = unitHeight / 2;
			const tempPath = [];

			if(corners.lu){
				tempPath.push(
					['M', calculatedX, calculatedY + calculatedH],
					['A', calculatedW, calculatedH, 0, 0, 1, calculatedX + calculatedW, calculatedY],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['Z']
				);
			}else{
				tempPath.push(
					['M', calculatedX, calculatedY],
					['L', calculatedX + calculatedW, calculatedY],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['L', calculatedX, calculatedY + calculatedH],
					['Z']
				);
			}

			if(corners.ru){
				tempPath.push(
					['M', calculatedX + calculatedW, calculatedY],
					['A', calculatedW, calculatedH, 90, 0, 1, calculatedX + 2 * calculatedW, calculatedY + calculatedH],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['Z']
				);
			}else{
				tempPath.push(
					['M', calculatedX + calculatedW, calculatedY],
					['L', calculatedX + 2 * calculatedW, calculatedY],
					['L', calculatedX + 2 * calculatedW, calculatedY + calculatedH],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['Z']
				);
			}

			if(corners.rd){
				tempPath.push(
					['M', calculatedX + 2 * calculatedW, calculatedY + calculatedH],
					['A', calculatedW, calculatedH, 180, 0, 1, calculatedX + calculatedW, calculatedY + 2 * calculatedH],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['Z']
				);
			}else{
				tempPath.push(
					['M', calculatedX + calculatedW, calculatedY + calculatedH],
					['L', calculatedX + 2 * calculatedW, calculatedY + calculatedH],
					['L', calculatedX + 2 * calculatedW, calculatedY + 2 * calculatedH],
					['L', calculatedX + calculatedW, calculatedY + 2 * calculatedH],
					['Z']
				);
			}

			if(corners.ld){
				tempPath.push(
					['M', calculatedX + calculatedW, calculatedY + 2 * calculatedH],
					['A', calculatedW, calculatedH, 270, 0, 1, calculatedX, calculatedY + calculatedH],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['Z']
				);
			}else{
				tempPath.push(
					['M', calculatedX, calculatedY + calculatedH],
					['L', calculatedX + calculatedW, calculatedY + calculatedH],
					['L', calculatedX + calculatedW, calculatedY + 2 * calculatedH],
					['L', calculatedX, calculatedY + 2 * calculatedH],
					['Z']
				);
			}

			if(corners.ilu){
				let _x = calculatedX - 2 * calculatedW;
				let _y = calculatedY - 2 * calculatedH;

				tempPath.push(
					['M', _x + 2 * calculatedW, _y + calculatedH],
					['A', calculatedW, calculatedH, 180, 0, 1, _x + calculatedW, _y + 2 * calculatedH],
					['L', _x + 2 * calculatedW, _y + 2 * calculatedH],
					['Z']
				);
			}

			if(corners.iru){
				let _x = calculatedX + 2 * calculatedW;
				let _y = calculatedY - 2 * calculatedH;

				tempPath.push(
					['M', _x + calculatedW, _y + 2 * calculatedH],
					['A', calculatedW, calculatedH, 270, 0, 1, _x, _y + calculatedH],
					['L', _x, _y + 2 * calculatedH],
					['Z']
				);
			}

			if(corners.ird){
				let _x = calculatedX + 2 * calculatedW;
				let _y = calculatedY + 2 * calculatedH;

				tempPath.push(
					['M', _x, _y + calculatedH],
					['A', calculatedW, calculatedH, 0, 0, 1, _x + calculatedW, _y],
					['L', _x, _y],
					['Z']
				);
			}

			if(corners.ild){
				let _x = calculatedX - 2 * calculatedW;
				let _y = calculatedY + 2 * calculatedH;

				tempPath.push(
					['M', _x + calculatedW, _y],
					['A', calculatedW, calculatedH, 90, 0, 1, _x + 2 * calculatedW, _y + calculatedH],
					['L', _x + 2 * calculatedW, _y],
					['Z']
				);
			}

			return tempPath;
		};

		for(let x = 0; x < unitXCount; x++) {
			fields[x] = [];
			for(let y = 0; y < unitYCount; y++) {
				fields[x][y] = unitColors[
					Math.min(
						unitColors.length - 1,
						Math.max(
							0,
							Math.round(
								getCurrentSection(y) + Math.random() * 1.25 - 0.625
							)
						)
					)
				];
			}
		}

		unitColors.forEach((v, k) => colorPath[k] = []);

		fields.forEach((row, x) => {
			row.forEach((color, y) => {

				const args = {
					up: fields[x][y - 1] === color,
					down: fields[x][y + 1] === color,
					right: fields[x + 1] && fields[x + 1][y] === color,
					left: fields[x - 1] && fields[x - 1][y] === color
				};

				colorPath[unitColors.indexOf(color)].push(drawCornered(x, y, args));
			});
		});

		unitColors.forEach((color, y) => {
			path.push(new Path(color,
				['M', 0, y * section * unitHeight],
				['L', fullWidth, y * section * unitHeight],
				['L', fullWidth, (y + 1) * section * unitHeight],
				['L', 0, (y + 1) * section * unitHeight],
				['Z']
			));
		});

		colorPath.forEach((v, k) => {
			const color = unitColors[k];
			v.forEach((pathList) => {
				path.push(new Path(color, ...pathList));
			});
		});

		return path;
	}
}

export default DotsPattern;
