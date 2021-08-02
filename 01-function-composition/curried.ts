import { flow } from "fp-ts/function";
import striptags from "striptags";

const checkStringLength = (length: number) => (str: string): string => {
  if (str.length < length) {
    return str;
  }

  throw new Error(`String longer than max length (${length})`);
};

const stripHtml = (allowedTags: string[]) => (html: string): string =>
  striptags(html, allowedTags);

const allowableHtmlTags = ["p", "h1", "h2", "a"];

const swearWords = ["poop"];

const catEmoji = "🐈";

const replaceWordWithCat = (str: string, word: string): string =>
  str.replace(new RegExp(word, "g"), catEmoji);

// Curried version of String.replace
const replace = (searchValue: string | RegExp) => (replacement: string) => (
  str: string
): string => str.replace(searchValue, replacement);

// Matches all instances where there are 2 or more "!" characters in a row
const multipleExclamationMarks = /\!{2,}/g;

// Curried version of Array.reduce
const reduce = <Accum, T>(fn: (accum: Accum, x: T) => Accum) => (
  list: Array<T>
) => (initial: Accum) => list.reduce(fn, initial);

const handleReview = flow(
  checkStringLength(5000),
  stripHtml(allowableHtmlTags),
  reduce(replaceWordWithCat)(swearWords),
  replace(multipleExclamationMarks)("!"),
)

/**
 * Example usage
 */
const result1 = handleReview("<p>hello</p><script>window.alert('You\'ve been hacked!')</script>");
console.log("result1: ", result1) // --> "<p>hello</p>"

const result2 = handleReview("The devs who made this game are poop!!!");
console.log("result2: ", result2) // --> "The devs who made this game are 🐈!"

console.log("result3: ")
handleReview(new Array(5000 + 1).join("a"));
// --> Error: String longer than max length (5000)
