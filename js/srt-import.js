const fileForm = document.querySelector("#xmlForm");
const contentDiv = document.querySelector("#contenu");

const dropArea = document.getElementById('drop-area')

// Prevent file opening on drop
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}


// Set styles when hovering and droping
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})
function highlight(e) {
  dropArea.classList.add('highlight')
}
function unhighlight(e) {
  dropArea.classList.remove('highlight')
}


// Fire function on drop
dropArea.addEventListener('drop', interpretSrt, false)


// Handle srt file and display result
function interpretSrt(e) {
  let dt = e.dataTransfer
  let files = dt.files

  console.log(files)

  let selectedFile = files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    srtString = e.target.result;
    
    srtArray = Subtitle.parse(srtString); // use parser to create an array with the file https://github.com/gsantiago/subtitle.js/

    console.log(srtArray)

    for (let i = 0; i < srtArray.length; i++) {
      const srtEntry = srtArray[i];
      const nextEntry = srtArray[i + 1];

      begin = srtEntry.start;
      end = srtEntry.end;

      speakDuration = (end - begin);
      calculatedFontSize = speakDuration / 80; // ratio fontSize
      calculatedFontWeight = speakDuration / 150; // ratio fontWeight

      
      // Create dom element for each array entry
      const newParagraph = document.createElement("p");
      newParagraph.innerHTML = srtEntry.text;
      // add styles to the element depending on subtitle duration
      newParagraph.style.fontSize = calculatedFontSize + "px";
      newParagraph.style.fontWeight = calculatedFontWeight;
      // Append the element to the html
      contentDiv.appendChild(newParagraph);


      // Space after each entry of the file, based on time difference
      // Check if last in array
      if (i != srtArray.length - 1) {
        timeAfter = nextEntry.start;
      } else {
        timeAfter = 0;
      }

      space = (timeAfter - end) / 50; // Ratio Spacing

      let silence = "";
      for (let j = 0; j < space; j++) {
        silence = silence + ". . ";
      }
      const spaceAfterParagraph = document.createElement('p');
      spaceAfterParagraph.innerHTML = silence;
      spaceAfterParagraph.classList.add("space");

      contentDiv.appendChild(spaceAfterParagraph);
    }

  }

  reader.readAsText(selectedFile);

  // Hide drop here hint
  const hint = document.querySelector('.drop-hint');
  hint.classList.add('hidden')

}




//////////////////////////////////////////////////////////// Handle from input

// fileForm.addEventListener("submit", function (event) {

//   event.preventDefault();
//   const selectedFile = document.getElementById('input').files[0];
//   const reader = new FileReader();

//   reader.onload = function (e) {
//     srtString = e.target.result;
    
//     srtArray = Subtitle.parse(srtString); // use parser to create an array with the file https://github.com/gsantiago/subtitle.js/

//     for (let i = 0; i < srtArray.length; i++) {
//       const srtEntry = srtArray[i];
//       const nextEntry = srtArray[i + 1];

//       begin = srtEntry.start;
//       end = srtEntry.end;

//       speakDuration = (end - begin);
//       calculatedFontSize = speakDuration / 80; // ratio fontSize
//       calculatedFontWeight = speakDuration / 150; // ratio fontWeight

      
//       // Create dom element for each array entry
//       const newParagraph = document.createElement("p");
//       newParagraph.innerHTML = srtEntry.text;
//       // add styles to the element depending on subtitle duration
//       newParagraph.style.fontSize = calculatedFontSize + "px";
//       newParagraph.style.fontWeight = calculatedFontWeight;
//       // Append the element to the html
//       contentDiv.appendChild(newParagraph);


//       // Space after each entry of the file, based on time difference
//       // Check if last in array
//       if (i != srtArray.length - 1) {
//         timeAfter = nextEntry.start;
//       } else {
//         timeAfter = 0;
//       }

//       space = (timeAfter - end) / 50; // Ratio Spacing

//       const silence = "";
//       for (let j = 0; j < space; j++) {
//         silence = silence + ". . ";
//       }
//       const spaceAfterParagraph = document.createElement('p');
//       spaceAfterParagraph.innerHTML = silence;
//       spaceAfterParagraph.classList.add("space");

//       contentDiv.appendChild(spaceAfterParagraph);
//     }

//   }

//   reader.readAsText(selectedFile);


// });