function decodeHTMLEntities(text: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body
    .textContent;
  return decodedString;
}

export default decodeHTMLEntities;
