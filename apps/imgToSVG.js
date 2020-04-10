const potrace = require('potrace');
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const changeSvgPaths = require('')
const trace = new potrace.Potrace();

function getInputImage() {
  return prompt('Enter the relative path to the input image:');
}

function setOutputImage() {
  return prompt('Enter the relative path to the output image:');
}


trace.loadImage(getInputImage(), err => {
  if (err) throw err;
  const outputFile = setOutputImage();
  fs.writeFileSync(outputFile, trace.getSVG());
  changeSVG(outputFile);
});
