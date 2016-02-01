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

// API: https://docs.strongloop.com/display/public/LB/Built-in+models+REST+API

module.exports = (User) => {
  // Disabling not needed routes.
  User.disableRemoteMethod('upsert', true);
  User.disableRemoteMethod('updateAll', true);

  User.disableRemoteMethod('deleteById', true);

  User.disableRemoteMethod('createChangeStream', true);

  User.disableRemoteMethod('count', true);
  User.disableRemoteMethod('exists', true);

  User.disableRemoteMethod('__count__accessTokens', false);
  User.disableRemoteMethod('__create__accessTokens', false);
  User.disableRemoteMethod('__delete__accessTokens', false);
  User.disableRemoteMethod('__destroyById__accessTokens', false);
  User.disableRemoteMethod('__findById__accessTokens', false);
  User.disableRemoteMethod('__get__accessTokens', false);
  User.disableRemoteMethod('__updateById__accessTokens', false);
};
