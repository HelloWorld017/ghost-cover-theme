import {Pattern, PatternChooser} from "./pattern.js";

import ChevronPattern from "./pattern-chevron.js";
import DotsPattern from "./pattern-dots.js";
import FragmentsPattern from "./pattern-fragments.js";
import StripePattern from "./pattern-stripe.js";

const patternChooser = new PatternChooser();
patternChooser.addPattern(new ChevronPattern);
patternChooser.addPattern(new DotsPattern);
patternChooser.addPattern(new FragmentsPattern);
patternChooser.addPattern(new StripePattern);

export default patternChooser;
