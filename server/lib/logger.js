/*
  Copyright Jesus Perez <jesusprubio gmail com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

// Abstracts our logging system.
// - To print stuff that we want to show always.
// - To debug: https://github.com/visionmedia/debug.

const path = require('path');

const logSymbols = require('log-symbols');

const util = require('./util');
const packageInfo = require('../../package');


// Get a tag from the file path to respect the LoopBack format.
// ie: ... /ninja-api-starter/server/server.js -> server:server
const getTag = (filePath) => {
  const filePathArr = filePath.split('/');
  const basePathArr = path.resolve(__dirname, '../../').split('/');

  return util.difference(filePathArr, basePathArr).join(':').slice(0, -3);
};


const log = (opts) => {
  process.stdout.write(`${ logSymbols[opts.level] } ${ opts.tag } ${ opts.msg }\n`);

  if (opts.data) {
    process.stdout.write(opts.data.toString());
  }
};


module.exports = (filePath) => {
  // Massaging to respect the loopback format.
  const tag = getTag(filePath);
  const res = {
    log: (msg, data) => log({ tag, level: 'success', msg, data }),
    error: (msg, data) => log({ tag, level: 'error', msg, data }),
    // To avoid a break but do nothing if not needed.
    debug: () => null,
  };

  // We only require the library if needed.
  if (process.env.DEBUG) {
    res.debug = require('debug')(`${ packageInfo.name }:${ tag }`);
  }

  return res;
};
