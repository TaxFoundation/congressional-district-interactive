const fs = require('fs');
const d3Dsv = require('d3-dsv');

const updateData = (input, output) => {
  try {
    //read the data
    const rawData = fs.readFileSync(input, 'utf8');
    const rawJson = d3Dsv.csvParse(rawData);

    //create new structure
    let newData = {};
    rawJson.forEach(r => {
      if (!newData[r.state_fips]) newData[r.state_fips] = {};
      if (!newData[r.state_fips][r.district])
        newData[r.state_fips][r.district] = {};

      if (!newData[r.state_fips][r.district][r.income]) {
        newData[r.state_fips][r.district][r.income] = {
          i: r.avg_income_ALL,
          s: r.taxes_paid_ded,
          t: r['current-law-tax'] - r['pre-tcja-tax'],
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

const beginTheWatch = (input, output) => {
  console.log('Inital new data building.');
  updateData(input, output);
  if (process.argv.includes('--watch')) {
    console.log('Watching for new changes...');
    fs.watch(
      input,
      {
        encoding: 'utf8',
      },
      (event, file) => {
        console.log('Updating data...');
        updateData(input, output);
      }
    );
  }
};

const input = './src/data/data.csv';
const output = './src/data/data.json';

if (fs.existsSync(output)) {
  console.log('Removing old data.');
  fs.unlink(output, err => {
    if (err) throw err;
    console.log('Old data deleted.');
    beginTheWatch(input, output);
  });
} else {
  beginTheWatch(input, output);
}
