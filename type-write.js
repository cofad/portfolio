// This module is used to "type write" an html page. The existing elements will visually
// hidden and recursively cloned into the a new parent element with the text being written
// one character at a time to simulate a type writer.
//
// How to use:
//   1. Create a "div" with the "type-writeable" class around the elements to copy.
//   2. Add the following ".visually-hidden" class to a global css style sheet. This hides
//      the elements from sighted users but provides it for Users who rely on screen readers.
//      The type written element is built on character at a time and is not suitable for usae
//      with screen readers.
//
//          .visually-hidden {
//            clip: rect(0 0 0 0);
//            clip-path: inset(50%);
//            height: 1px;
//            overflow: hidden;
//            position: absolute;
//            white-space: nowrap;
//            width: 1px;
//          }
//
//   3. Add the following to a script file:
//
//          import * as typeWrite from "./type-write.js";
//
//          const typeWriteable = typeWrite.getTypeWriteableElement();
//          const typeWritten = typeWrite.getTypeWrittenElement();
//
//          typeWrite.typeWriteElement(typeWritten, typeWriteable);
//
//   4. Add the new script to the html pages with the 'type="module"' attribute set.
//   5. Ensure all text nodes are isolated in their own element. This is so the
//      type writer can grab the text appropriately. It only writes text on elements
//      that have no children.
//   5. Reload the page and watch the type writing happen!

import { sleep } from "./utils.js";

const TYPE_WRITER_SPEED = 50;

/**
 * Initializes and returns the element to clone for type writing.
 * @returns {HTMLElement} The element to clone for type writing
 */
export function getTypeWriteableElement() {
  const typeWriteable = document.querySelector(".type-writeable");
  typeWriteable.className = "visually-hidden";
  return typeWriteable;
}

/**
 * Initializes and returns the parent element to use for type writing.
 * @returns {HTMLElement} The parent element to use for type writing
 */
export function getTypeWrittenElement() {
  const typeWritten = document.createElement("div");
  typeWritten.className = "type-written";
  typeWritten.setAttribute("aria-hidden", true);
  document.querySelector("body").append(typeWritten);
  return typeWritten;
}

/**
 * Clones an element and it's children, adds it the the DOM, and type writes the
 * text of any element without children.
 * @param {HTMLElement} typeWrittenElement Element to add the elements to
 * @param {HTMLElement} typeWriteableElement Element to clone
 * @returns {Promise<void>} A promise indicating the element has been written
 */
export async function typeWriteElement(
  typeWrittenElement,
  typeWriteableElement
) {
  return new Promise(async (resolve) => {
    if (typeWriteableElement.children.length > 0) {
      for (let i = 0; i < typeWriteableElement.children.length; i++) {
        const child = typeWriteableElement.children[i];
        const newChild = typeWrittenElement.appendChild(child.cloneNode(false));
        await typeWriteElement(newChild, child);
      }
    } else {
      await typeWriteElementText(typeWrittenElement, typeWriteableElement);
    }

    resolve();
  });
}

/**
 * Copies text from one element to another one character at a time simulating a typewriter effect.
 * @param {HTMLElement} typeWrittenElement Element to write the text to
 * @param {HTMLElement} typeWriteableElement Element to copy the text from
 * @returns {Promise<void>} A promise indicating the text has been written
 */
export async function typeWriteElementText(
  typeWrittenElement,
  typeWriteableElement
) {
  return new Promise(async (resolve) => {
    const text = typeWriteableElement.innerText;

    for (const char of text) {
      await sleep(TYPE_WRITER_SPEED);
      const textNode = document.createTextNode(char);
      typeWrittenElement.appendChild(textNode);
    }

    resolve();
  });
}
