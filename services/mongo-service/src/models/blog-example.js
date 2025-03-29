"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
var mongoose_1 = require("mongoose");
var blog_example_1 = require("../schemas/blog-example");
exports.BlogModel = mongoose_1.default.model('Blog', blog_example_1.blogSchema);
