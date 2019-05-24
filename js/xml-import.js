var fileForm = document.querySelector("#xmlForm");
var contentDiv = document.querySelector("#contenu");

var readXml = null;




//////////////// Code when XML in

fileForm.addEventListener("submit", function (event) {

  event.preventDefault();
  var selectedFile = document.getElementById('input').files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    xmlString = e.target.result;
    const parsedXML = new DOMParser().parseFromString(xmlString, "text/xml");
    const parsedXMLContent = parsedXML.querySelector('body');

    // console.log(parsedXMLContent);

    const paragraphs = parsedXMLContent.querySelectorAll("p");

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];

      begin = paragraph.getAttribute("begin").slice(0, -1);
      end = paragraph.getAttribute("end").slice(0, -1);	// change attr 'end' to numeral value


      if (i != paragraphs.length - 1) {
        timeAfter = paragraph.nextElementSibling.getAttribute("begin").slice(0, -1);
      } else {
        timeAfter = 0;
      }

      space = (timeAfter - end) * 15;

      speakDuration = (end - begin);
      calculatedFontSize = speakDuration * 10; // ratio fontSize
      calculatedFontWeight = speakDuration * 150; // ratio fontWeight



      var newParagraph = document.createElement("p");
      newParagraph.innerHTML = paragraph.innerHTML;

      newParagraph.style.fontSize = calculatedFontSize + "px";
      newParagraph.style.fontWeight = calculatedFontWeight;

      contentDiv.appendChild(newParagraph);


      var silence = "";

      for (var j = 0; j < space; j++) {
        silence = silence + ". . ";
      }
      var spaceAfterParagraph = document.createElement('p');
      spaceAfterParagraph.innerHTML = silence;
      spaceAfterParagraph.classList.add("space");

      contentDiv.appendChild(spaceAfterParagraph);

    }


  }

  reader.readAsText(selectedFile);


// });