let codeDiv = document.getElementById("code");

let link = "",
  code = "",
  index = 0;

let href = window.location.href;

let links = href.substring(href.indexOf('?') + 1).split(",");
link = links[Math.floor(Math.random() * links.length)];

document.addEventListener('keydown', (event) => {
  if (index != code.length) {

    if (codeDiv.innerHTML.endsWith(' |')) {
      codeDiv.innerHTML = codeDiv.innerHTML.slice(0, -2);
    }

    let nextIndex = code.regexIndexOf(/[\n\s\t]/g, index + 8);
    codeDiv.innerHTML += code.substring(index, nextIndex)
                             .replace("<", "")
							 .replace(">", "")
							 .replace("\"", "&quot;")
							 .replace("'", "&apos;")
							 .replace("\n", "<br>");

    index = nextIndex;
    window.scrollBy(0, 50);

  } else {
    index = 0;
  }
});

//https://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr
String.prototype.regexIndexOf = function(regex, startpos) {
  var indexOf = this.substring(startpos || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

fetch(link, {
  method: "GET"
}).then((response) => {
  response.text().then((text) => {
    code = text;
    index = 0;
  });
});

setInterval(() => {
  if (codeDiv.innerHTML.endsWith(' |')) {
    codeDiv.innerHTML = codeDiv.innerHTML.slice(0, -2);
  } else {
    codeDiv.innerHTML += " |";
  }
}, 500);
