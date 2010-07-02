//	lib.mono.tidy.CJK.js
//	Evadne Wu at Iridia, 2010





if (!mono) var mono = {};





(function () {





//	Base Patterns

	var patternCJKIdeograms = new XRegExp("\\p{InCJKUnifiedIdeographs}|\\p{InCJKUnifiedIdeographsExtensionA}");

	var patternLatinateNumericOrSpace = new XRegExp("(?:\\p{InBasicLatin}|\\p{InGeneralPunctuation}|\\p{InSupplementalPunctuation})+");

	var patternOptionalWhitespace = /(?:\s+)?/ig;
	
	
	
	
	
	var _ = function (inString) { return ["(", String(inString), ")"].join(""); }
	
	var _s = function (inRegExp) {
	
		if (typeof inRegExp.source != 'string') return undefined;
		return inRegExp.source;
		
	}
	
	var __s = function () { return _(_s(arguments[0])) };
	
	
	var _rx = function (inArray) {
	
		if (typeof inArray.join != 'function') return undefined;
		return new RegExp(inArray.join(""), "ig");
	
	}
	
	
	
	
	
	var transformations = [
	
	
	//	Insert whitespace between a CJK glyph and an alphanumeric glyph
	
		{	from: _rx([
			
				_(_s(patternCJKIdeograms)),
				_s(patternOptionalWhitespace),
				_(_s(patternLatinateNumericOrSpace))
								
			]), to: "$1 $2"
			
		}, {	from: _rx([
			
				_(_s(patternLatinateNumericOrSpace)),
				_s(patternOptionalWhitespace),
				_(_s(patternCJKIdeograms))
								
			]), to: "$1 $2"
			
		}, 
	
	
	//	FIXME: Normalize punctuations around CJK glyphs
	
	
	//	FIXME: Normalize punctuaitons around alphanumeric glyphs
	
	
	//	Remove duplicate whitespaces
		
		{	from: /\s+/ig, to: " "	}
	
	
	];
	
	
	
	
	
	
	
	
	
	
	mono.tidyCJK = function (theString) {
	
		var responseString = new String(theString);
		
		$.each(transformations, function (transformationIndex, transformationInstruction) {
		
			responseString = responseString.replace(transformationInstruction.from, transformationInstruction.to);
			
		});
		
		return responseString;
		
	}
	
})();









