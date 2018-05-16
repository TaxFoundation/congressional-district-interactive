const fs = require('fs');
const d3Dsv = require('d3-dsv');

const input = './src/data/data.csv';
const output = './src/data/data.json';

const updateData = () => {
  try {
    //read the data
    const rawData = fs.readFileSync(input, 'utf8');
    const rawJson = d3Dsv.csvParse(rawData);

    //create new structure
    let newData = {};
    rawJson.forEach(r => {
      if (!newData[r.state]) newData[r.state] = {};
      if (!newData[r.state][r.district]) newData[r.state][r.district] = {};

      let hash = `${r.bucket}${r.status}${r.children}`;
      if (!newData[r.state][r.district][hash]) {
        newData[r.state][r.district][hash] = {
          i: r.income,
          s: r.stateTax,
          t: r.taxDelta,
        };
      }
    });
    //write file
    fs.writeFileSync(output, JSON.stringify(newData, null, 0));
    console.log('Update complete.');
  } catch (err) {
    console.log(`There was a problem updating data: ${err}`);
  }
};

const beginTheWatch = () => {
  console.log('Inital new data building.');
  updateData();
  if (process.argv.includes('--watch')) {
    console.log('Watching for new changes...');
    fs.watch(
      input,
      {
        encoding: 'utf8',
      },
      (event, file) => {
        console.log('Updating data...');
        updateData();
      }
    );
  }
};

if (fs.existsSync(output)) {
  console.log('Removing old data.');
  fs.unlink(output, err => {
    if (err) throw err;
    console.log('Old data deleted.');
    beginTheWatch();
  });
} else {
  beginTheWatch();
}
