//	lib.mono.tidy.CJK.js
//	Evadne Wu at Iridia, 2010





if (!mono) var mono = {};





(function () {





//	Base Patterns

	var patternCJKIdeograms = new XRegExp("\\p{InCJKUnifiedIdeographs}|\\p{InCJKUnifiedIdeographsExtensionA}");

	var patternLatinateNumericOrSpace = new XRegExp("(?:\\p{InBasicLatin}|\\p{InLatin1Supplement}|\\p{InLatinExtendedA}|\\p{InLatinExtendedB}|\\p{InGeneralPunctuation}|\\p{InSupplementalPunctuation})+");

	var patternOptionalWhitespace = /(?:\s+)?/ig;
	
	
	
	
	
	var _ = function (inString) { return ["(", String(inString), ")"].join(""); }
	
	var _s = function (inRegExp) {
	
		if (typeof inRegExp.source != 'string') return undefined;
		return inRegExp.source;
		
	}
	
	var __s = function () { return _(_s(arguments[0])) };
	
	
	var _mul = function (inRegExpGroupString, inRepeatTimes) {
	
		inRepeatTimes = inRepeatTimes || "1,";	//	as in +
	
		return "(" + inRegExpGroupString + "){" + String(inRepeatTimes) + "}";
	
	};
	
	
	var _rx = function (inArray) {
	
		if (typeof inArray.join != 'function') return undefined;
		return new RegExp(inArray.join(""), "ig");
	
	}
	
	
	
	
	
	var transformations = [
	
	
	//	Normalizes whitespace
	
		{
		
			from: _rx([
			
				_(_s(patternCJKIdeograms)),
				_s(patternOptionalWhitespace),
				_(_s(patternLatinateNumericOrSpace))
								
			]), to: "$1 $2"
			
		}, 
		
		{
		
			from: _rx([
			
				_(_s(patternCJKIdeograms)),
				_s(patternOptionalWhitespace),
				_(_s(patternCJKIdeograms))
								
			]), to: "$1$2"
			
		}, 
		
		{
		
			from: _rx([
			
				_(_s(patternLatinateNumericOrSpace)),
				_s(patternOptionalWhitespace),
				_(_s(patternCJKIdeograms))
								
			]), to: "$1 $2"
			
		}, 
	
	
	//	Normalize parentheses
	
		{
		
			from: _rx([
			
				"\\(",
				_s(patternOptionalWhitespace),
				_(_mul(_s(patternCJKIdeograms)))
								
			]), to: "（$1"
			
		}, 
		
		{
		
			from: _rx([
			
				_(_mul(_s(patternCJKIdeograms))),
				_s(patternOptionalWhitespace),
				"\\)"
								
			]), to: "$1）"
			
		}, 
		
		{
		
			from: _rx([
			
				"（", 
				_s(patternOptionalWhitespace),
				_(_mul(_s(patternLatinateNumericOrSpace))),
				_s(patternOptionalWhitespace),
				 "）"
								
			]), to: " ($1) "
			
		}, 
	
	
	//	Normalize Quotation Marks	patternLatinateNumericOrSpace
	
		{
		
			from: _rx([
			
				"「", 
				_s(patternOptionalWhitespace),
				_(_mul(_s(patternLatinateNumericOrSpace))),
				_s(patternOptionalWhitespace),
				 "」"
								
			]), to: " “$1” "
		
		},
		
		{
		
			from: _rx([
			
				"“", 
				_s(patternOptionalWhitespace),
				_(_mul(_s(patternLatinateNumericOrSpace)))
								
			]), to: " “$1"
		
		},
		
		{
		
			from: _rx([
			
				_(_mul(_s(patternLatinateNumericOrSpace))),
				_s(patternOptionalWhitespace),
				"”" 
								
			]), to: "$1” "
		
		},
		
		{
		
			from: _rx([
			
				"『", 
				_s(patternOptionalWhitespace),
				_(_mul(_s(patternLatinateNumericOrSpace))),
				_s(patternOptionalWhitespace),
				 "』"
								
			]), to: " ‘$1’ "
		
		},
	
	//	Remove duplicate whitespaces
		
		{
		
			from: /\s+/ig, 
			to: " "
		
		}

	
	];
	
	
	
	
	
	
	
	
	
	
	mono.tidyCJK = function (theString) {
	
		var responseString = new String(theString);
		
		$.each(transformations, function (transformationIndex, transformationInstruction) {
		
			responseString = responseString.replace(transformationInstruction.from, transformationInstruction.to);
			
		});
		
		return responseString;
		
	}
	
})();









