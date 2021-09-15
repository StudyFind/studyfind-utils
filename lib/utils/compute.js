"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flesch_1 = require("flesch");
var syllable_1 = require("syllable");
/*
TO FIX IMPORTS:
CHANGE FLESCH EXPORT TO: module.exports = { flesch: flesch }
CHANGE SYLLABLE EXPORT TO: module.exports = { syllable: syllable }
CHANGE IMPORTS WITHIN SYLLABLE INDEX FILE TO: var pluralize = require('pluralize')
                                              var normalize = require('normalize-strings')
                                              var problematic = require('./problematic')
CHANGE PROBLEMATIC EXPORT TO: module.exports = problematic
THIS MAY ONLY BE NECESSARY WHEN MERGING SINCE NODE_MODULES IS GITIGNORED
*/
var compute = {
    readabilityIndex: function (text) {
        // https://en.wikipedia.org/wiki/Automated_readability_index
        // https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch%E2%80%93Kincaid_grade_level
        if (!text) {
            return null;
        }
        var wordList = text
            .toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ") // removes all punctuation
            .split(/\s/) // splits text at newlines and spaces
            .map(function (word) { return word.trim(); }) // removes whitespace from each word
            .filter(function (word) { return word; }); // removes empty strings
        var syllablesList = wordList.map(function (word) { return syllable_1.syllable(word); });
        var numSentences = text.split(".").length;
        var numWords = wordList.length;
        var numSyllables = numWords ? syllablesList.reduce(function (a, b) { return a + b; }) : 0;
        var BIAS = 20;
        var score = BIAS + flesch_1.flesch({ sentence: numSentences, word: numWords, syllable: numSyllables });
        score = Math.min(score, 100);
        score = Math.max(score, 0);
        return Math.round(score);
    },
    eligibilityScore: function (questions, responses) {
        /*
          RETURNS:
            a score between 0 and 100
    
          TO CALCULATE THE RAW SCORE:
            each mismatch = -1
            each don't know = 0
            each match = +1
    
          THEREFORE:
            worst score = -n / n
            best score = n / n
    
          TO CONVERT RAW SCORE TO PERCENTILE:
            - add n to both the numerator and denominator
            - multiply the fraction by 100
    
          EXAMPLES:
            If the user's responses match all questions:
              - they will receive a raw score of n / n
              - this will be converted to ((n + n) / (n + n)) * 100 = 100
              - this is the highest percentile
    
            If the user responds "don't know" to all questions:
              - they will receive a raw score of 0 / n
              - this will be converted to ((0 + n) / (n + n)) * 100 = 50
              - this is the median percentile
    
            If the user's responses mismatch all questions:
              - they will receive a raw score of -n / n
              - this will be converted to ((-n + n) / (n + n)) * 100 = 0
              - this is the lowest percentile
        */
        if (!questions || !responses)
            return 0;
        var length = questions.length;
        if (!length || !responses.length)
            return 0;
        var score = 0;
        for (var i = 0; i < length; i++) {
            var question = questions[i];
            var response = responses[i];
            if (response === "Yes") {
                if (question.type === "Inclusion") {
                    score += 1;
                }
                else {
                    score -= 1;
                }
            }
            if (response === "No") {
                if (question.type === "Exclusion") {
                    score += 1;
                }
                else {
                    score -= 1;
                }
            }
        }
        return Math.round(((score + length) / (2 * length)) * 100);
    },
};
exports.default = compute;
