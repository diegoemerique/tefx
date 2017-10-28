const LETTERS = 'abcdefghijklmnopqrstuvwxyz#%&^+=-';

function selectorType(selector) {
  let isClass = /(\.)[\S]+/gi.test(selector);
  let isId = /(\#)[\S]+/gi.test(selector);
  let isTag = /(\w)[\S]+/gi.test(selector);

  if (isClass) { return 'class'; }
  if (isId) { return 'id'; }
  if (isTag) { return 'tag'; }

  return false;
}

function grebElement(selector) {
  let cleanSelector = selector.replace(/\.|\#/g, '');

  if (selectorType(selector) === 'class') {
    return document.getElementsByClassName(cleanSelector);
  } else if (selectorType(selector) === 'id') {
    return document.getElementsById(cleanSelector);
  }

  return document.querySelectorAll(cleanSelector);
}

export {
	grebElement,
	LETTERS
};
