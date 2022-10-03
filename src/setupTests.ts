// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// https://github.com/pouchdb/pouchdb/issues/8383
// @ts-ignore
window.setImmediate = (fn) => {
  setTimeout(fn, 0);
};
window.process.nextTick = (fn) => {
  setTimeout(fn, 0);
};

console.log = () => {};
console.error = () => {};
