var request = require('request');
var fs = require('fs');
var path = require('path');
var qs = require('qs');

var opt = require('optimist').usage('Usage: $0 query')
                             .alias('t', 'token')
                             .describe('t', 'API Token')
                             .alias('f', 'format')
                             .describe('f', 'Format (csv|geojson|json|postgres)')
                             .alias('h', 'host')
                             .describe('h', 'API Host')
                             .alias('v', 'verbose')
                             .describe('v', 'Verbose')
                             .alias('b', 'bare')
                             .describe('b', 'Bare (no headers)');

var argv = opt.argv;

var token = argv.token;
var query = argv._[0];

function execute() {
  if (!token) {
    try {
      token = fs.readFileSync(path.join(process.env.HOME, '.fulcrumrc'), {encoding: 'ascii'}).trim();
    } catch (ex) {
      console.warn('~/.fulcrumrc does not exist');
    }
  }

  if (!token) {
    opt.showHelp();
  }

  var url = 'https://api.fulcrumapp.com/api/v2/query';

  if (argv.host) {
    url = argv.host + '/query';
  }

  if (query.length && token) {
    var opts = {
      url: url,
      qs: {
        token: token,
        q: query,
        format: argv.format || 'csv',
        headers: argv.bare == null
      },
      headers: {
        'User-Agent': 'fq-cli'
      }
    };

    if (argv.verbose) {
      console.log(url + '?' + qs.stringify(opts.qs));
    }

    request(opts).pipe(process.stdout);
  }
}

if (process.stdin.isTTY && !argv._[0]) {
  opt.showHelp();
} else if (argv._.length === 0) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  query = '';

  process.stdin.on('data', function (text) {
    query += text;
  });

  process.stdin.on('end', function () {
    execute();
  });
} else {
  execute();
}
