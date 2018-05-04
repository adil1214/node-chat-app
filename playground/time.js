let moment = require('moment');





let date = moment("2020-02-29");
date.add(1, 'years');

console.log(date.format("dddd Do MMMM YYYY"));