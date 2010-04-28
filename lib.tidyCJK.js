//	lib.tidyCJK.js
//	Evadne Wu at Iridia, 2010

if (!mono) var mono = {};





mono.tidyCJK = function (theString) {

	var tidyProcess = /([\u4E00-\u9FFF|\u3000-\u303F|\u0021-\u007E|\uFF00-\uFF20])(\s*)([\u0000-\u0019|\u0021-\u007F|\u2000-\u206F|\u0025][\u0000-\u0019|\u0021-\u007F|\u2000-\u206F|\u0025|\s]*[\u0000-\u0019|\u0021-\u007F|\u2000-\u206F|\u0025])(\s*)([\u4E00-\u9FFF|\u3000-\u303F|\u0021-\u007E|\uFF00-\uFF20])/gi;
	
	var arrayOfStringsToProcess = theString.match(tidyProcess);
	if (arrayOfStringsToProcess == null) return theString;
	
	return theString.replace(tidyProcess, "$1 $3 $5");
	
}