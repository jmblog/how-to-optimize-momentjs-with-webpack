const assert = require('assert');
const moment = require('moment');
require('moment/locale/ja');
require('moment/locale/it');

const oneDay = '2016-11-25T15:43:21';

describe('localized moment', function() {
  it('should be shown in English', function() {
    moment.locale('en');
    console.log(moment(oneDay).format('LLLL'));
    assert(moment(oneDay).format('LLLL') === 'Friday, November 25, 2016 3:43 PM');
  });

  it('should be shown in Japanese', function() {
    moment.locale('ja');
    console.log(moment(oneDay).format('LLLL'));
    assert(moment(oneDay).format('LLLL') === '2016年11月25日 15:43 金曜日');
  });

  it('should be shown in Italian', function() {
    moment.locale('it');
    console.log(moment(oneDay).format('LLLL'));
    assert(moment(oneDay).format('LLLL') === 'venerdì 25 novembre 2016 15:43');
  });
});
