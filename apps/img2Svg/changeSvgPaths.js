const replace = require('replace-in-file');

function changeSvgPaths(svg) {
  const options = {
    separatePaths: {
      files: svg,
      from: / M /g,
      to: '" stroke="black" fill="white" fill-rule="evenodd"/>\n  <path d="M '
    },
    changeFill: {
      files: svg,
      from: /black/g,
      to: 'white'
    },
    addStroke: {
      files: svg,
      from: /none/g,
      to: 'black'
    },
    addId: {
      files: svg,
      from: /path d/,
      to: ''
    }
  };

  try {
    console.log('Results of replaceing original fill:', replace.sync(options.changeFill));
    console.log('Results of replaceing original stroke:', replace.sync(options.addStroke));
    console.log('Results of adding new paths:', replace.sync(options.separatePaths));
    let hasChanged = true;
    let id = 1;
    while (hasChanged) {
      options.addId.to = `path id="${id}" d`;
      const result = replace.sync(options.addId);
      hasChanged = result[0].hasChanged;
      console.log(`Result of adding id to path ${id}:`, result);
      id += 1;
    }
    // for (let id = 1; id <= numMatches + 1; id++) {
    //   console.log(`Result of adding id to path ${id}: `, replace.sync(addId));
    // }
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

module.exports = changeSvgPaths;
