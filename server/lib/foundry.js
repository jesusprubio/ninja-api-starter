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

// Abstraction to manage the environment variables in both platforms (Bluemix/Heroku).

const logger = require('./logger')(__filename);


// Print an error and exit.
const doErr = (msg) => {
  logger.error(msg);

  process.exit(1);
};

const doErrPartial = (partialMsg) => {
  doErr(`Getting the ${ partialMsg } from the environment variables`);
};


const vars = {};

// Bluemix.
if (process.env.VCAP_APPLICATION) {
  const cfenv = require('cfenv');
  const appEnv = cfenv.getAppEnv();

  vars.url = appEnv.url;
  vars.port = appEnv.port;
  vars.dbUrl = appEnv.getService(/^mongo.*/).credentials.url;
// Heroku.
} else if (process.env.APP_URL) {
  vars.url = process.env.APP_URL;
  vars.port = process.env.PORT;
  vars.dbUrl = process.env.MONGOLAB_URI;
} else {
  doErr('The environment variable "APP_URL/VCAP_APPLICATION" is needed');
}

if (!vars.url) { doErrPartial('application URL'); }
if (!vars.port) { doErrPartial('application port'); }
if (!vars.dbUrl) { doErrPartial('database URL'); }

module.exports = vars;
