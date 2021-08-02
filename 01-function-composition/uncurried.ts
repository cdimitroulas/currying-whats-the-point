import { flow } from "fp-ts/function";
import striptags from 'striptags'

const checkStringLength = (length: number, str: string): string => {
  if (str.length < length) {
    return str;
  }

  throw new Error(`String longer than max length (${length})`);
};

const stripHtml = (allowedTags: string[], html: string): string => striptags(html, allowedTags);

const allowableHtmlTags = ["p", "h1", "h2", "a"];

// no, I'm not really gonna list the swear words here
const swearWords = ["poop"];

const catEmoji = "🐈";

const replaceWordWithCat = (str: string, word: string): string =>
  str.replace(new RegExp(word, "g"), catEmoji);

// Matches all instances where there are 2 or more "!" characters in a row
const multipleExclamationMarks = /\!{2,}/g;

const handleReview = (review: string) => {
  const correctLenReview = checkStringLength(5000, review);

  const strippedHtmlReview = stripHtml(
    allowableHtmlTags,
    correctLenReview
  );

  const noSwearWordsReview = swearWords.reduce(
    replaceWordWithCat,
    strippedHtmlReview
  );

  const noMultiExclamationMarksReview = noSwearWordsReview.replace(
    multipleExclamationMarks,
    "!"
  );

  return noMultiExclamationMarksReview;
}

// handleReview rewritten using flow
const handleReviewFlow = flow(
  (review: string) => checkStringLength(5000, review),
  correctLenReview => stripHtml(allowableHtmlTags, correctLenReview),
  correctLenAndStrippedReview => swearWords.reduce(
    replaceWordWithCat,
    correctLenAndStrippedReview
  ),
  nonSwearingReview =>
    nonSwearingReview.replace(multipleExclamationMarks, "!")
);

/**
 * Example usage
 */
const result1 = handleReview("<p>hello</p><script>window.alert('You\'ve been hacked!')</script>");
console.log("result1: ", result1) // --> "<p>hello</p>"

const result2 = handleReviewFlow("The devs who made this game are poop!!!");
console.log("result2: ", result2) // --> "The devs who made this game are 🐈!"

console.log("result3: ")
handleReview(new Array(5000 + 1).join("a"));
// --> Error: String longer than max length (5000)
