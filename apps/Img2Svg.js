const potrace = require('potrace');
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const changeSvgPaths = require('./img2Svg/changeSvgPaths');

class Img2Svg {
  constructor(input = null, output = null) {
    this.input = input;
    this.output = output;
  }

  getInputImage() {
    this.input = prompt('Enter the relative path to the input image:');
  }

  setOutputImage() {
    this.output = prompt('Enter the relative path to the output image:');
  }

  change2Svg() {
    const trace = new potrace.Potrace();

    if (!this.input) {
      this.getInputImage();
    }

    if (!this.output) {
      this.setOutputImage();
    }

    trace.loadImage(this.input, err => {
      if (err) throw err;
      fs.writeFileSync(this.output, trace.getSVG());
      changeSvgPaths(this.output);
    });
  }
}

module.exports = Img2Svg;
