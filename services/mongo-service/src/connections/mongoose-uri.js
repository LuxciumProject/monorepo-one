"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongooseUri = createMongooseUri;
var url_1 = require("url");
/**
 * Creates a MongoDB connection URI based on the provided parameters.
 * @remarks This function is used to create a MongoDB connection URI.
 * For more information, see the [MongoDB documentation](https://docs.mongodb.com/manual/reference/connection-string/).
 *
 * @param database - The name of the database to connect to. Defaults to 'my_app'.
 * @param port - The port number of the MongoDB server. Defaults to 27017.
 * @param host - The host address of the MongoDB server. Defaults to 'localhost'.
 * @param username - The username for authentication. Optional.
 * @param password - The password for authentication. Optional.
 * @param authSource - The authentication source database. Optional.
 * @param options - Additional connection options as key-value pairs. Optional.
 * @param srv - Indicates whether to use the SRV record. Defaults to false.
 * @returns The MongoDB connection URI.
 */
function createMongooseUri(database, port, host, username, password, authSource, options, srv) {
    if (database === void 0) { database = 'my_app'; }
    if (port === void 0) { port = 27017; }
    if (host === void 0) { host = 'localhost'; }
    if (srv === void 0) { srv = false; }
    var uri = !srv ? 'mongodb://' : 'mongodb+srv://';
    if (username && password) {
        // Encode username and password to handle special characters
        var encodedUsername = encodeURIComponent(username);
        var encodedPassword = encodeURIComponent(password);
        uri += "".concat(encodedUsername, ":").concat(encodedPassword, "@");
    }
    else if (username) {
        var encodedUsername = encodeURIComponent(username);
        uri += "".concat(encodedUsername, "@");
    }
    uri += "".concat(host, ":").concat(port);
    if (database || authSource) {
        uri += '/';
    }
    if (database) {
        uri += database;
    }
    var params = new url_1.URLSearchParams();
    if (authSource) {
        params.append('authSource', authSource);
    }
    if (options) {
        for (var _i = 0, _a = Object.entries(options); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            params.append(key, value);
        }
    }
    if (params.toString()) {
        uri += "?".concat(params.toString());
    }
    return uri;
}
