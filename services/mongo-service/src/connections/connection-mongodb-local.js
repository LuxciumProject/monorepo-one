"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnection = getDbConnection;
exports.getAsyncDbConnection = getAsyncDbConnection;
var mongoose_1 = require("mongoose");
var mongoose_uri_1 = require("./mongoose-uri");
function getDbConnection() {
    var _a;
    var _this = this;
    var connection = mongoose_1.default.connect('mongodb://127.0.0.1:27017/myapp');
    connection.then(function () {
        console.log('Connected to MongoDB');
    });
    return _a = {
            connection: connection
        },
        _a[Symbol.asyncDispose] = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection];
                    case 1:
                        (_a.sent()).disconnect();
                        console.log('Disconnected from MongoDB');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error in mogoose disconnect asyncDispose: ".concat(error_1));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        _a;
}
function getAsyncDbConnection() {
    return __awaiter(this, arguments, void 0, function (database, port, host, username, password, authSource, options) {
        var URI, connection_1, error_2;
        var _a, _b;
        var _this = this;
        if (database === void 0) { database = 'my_app'; }
        if (port === void 0) { port = 27017; }
        if (host === void 0) { host = 'localhost'; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    URI = mongoose_uri_1.createMongooseUri.apply(void 0, [database, port, host, username, password, authSource, options]);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.default.connect(URI).then(function (payload) {
                            console.log('Connecting to MongoDB...');
                            return payload;
                        })];
                case 2:
                    connection_1 = _c.sent();
                    return [2 /*return*/, __assign(__assign({}, connection_1), (_a = {}, _a[Symbol.asyncDispose] = function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, connection_1.disconnect()];
                                    case 1:
                                        _a.sent();
                                        console.log('Disconnected from MongoDB');
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_3 = _a.sent();
                                        console.error("Error in mogoose disconnect asyncDispose: ".concat(error_3));
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, _a))];
                case 3:
                    error_2 = _c.sent();
                    /*
                      The addition of the try/catch block
                      ensure that the function does not throw any exceptions
                      if an unexpected error occurs.
                    */
                    console.error("Error in mongoose at: getAsyncDbConnection   ".concat(error_2));
                    return [2 /*return*/, (_b = {
                                connection: null
                            },
                            _b[Symbol.asyncDispose] = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                });
                            }); },
                            _b)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
