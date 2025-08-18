# Importables via `node:`

| API                           | node\:specifier            |
| ----------------------------- | -------------------------- |
| REPL                          | node\:repl                 |
| Readline                      | node\:readline             |
| Console                       | node\:console              |
| File system                   | node\:fs                   |
| TTY                           | node\:tty                  |
| Path                          | node\:path                 |
| OS                            | node\:os                   |
| Events                        | node\:events               |
| Async hooks                   | node\:async\_hooks         |
| Asynchronous context tracking | node\:async\_hooks         |
| Timers                        | node\:timers               |
| Buffer                        | node\:buffer               |
| Stream                        | node\:stream               |
| Web Streams API               | node\:stream/web           |
| Zlib                          | node\:zlib                 |
| Crypto                        | node\:crypto               |
| Web Crypto API                | node\:crypto               |
| SQLite                        | node\:sqlite               |
| Net                           | node\:net                  |
| HTTP/2                        | node\:http2                |
| HTTPS                         | node\:https                |
| HTTP                          | node\:http                 |
| DNS                           | node\:dns                  |
| TLS/SSL                       | node\:tls                  |
| UDP/datagram                  | node\:dgram                |
| Process                       | node\:process              |
| Child processes               | node\:child\_process       |
| Cluster                       | node\:cluster              |
| Worker threads                | node\:worker\_threads      |
| String decoder                | node\:string\_decoder      |
| URL                           | node\:url                  |
| V8                            | node\:v8                   |
| VM                            | node\:vm                   |
| WASI                          | node\:wasi                 |
| Test runner                   | node\:test                 |
| Assertion testing             | node\:assert               |
| Utilities                     | node\:util                 |
| Inspector                     | node\:inspector            |
| Diagnostics Channel           | node\:diagnostics\_channel |
| Performance hooks             | node\:perf\_hooks          |
| Trace events                  | node\:trace\_events        |
| Report                        | node\:report               |
| Command-line options          | node\:process              |
| Environment Variables         | node\:process              |
| Domain                        | node\:domain               |
| Punycode                      | node\:punycode             |
| Query strings                 | node\:querystring          |

# Globals et importables

| API (global)                        | node\:specifier   |
| ----------------------------------- | ----------------- |
| Console                             | node\:console     |
| Timers                              | node\:timers      |
| Buffer                              | node\:buffer      |
| Web Streams API                     | node\:stream/web  |
| Web Crypto API                      | node\:crypto      |
| Process                             | node\:process     |
| URL                                 | node\:url         |
| Performance (performance)           | node\:perf\_hooks |
| Command-line options (process.argv) | node\:process     |
| Environment Variables (process.env) | node\:process     |

# Ni importable ni global

| API                            | identifiant  |
| ------------------------------ | ------------ |
| Debugger                       | `debugger`   |
| Single executable applications | —            |
| Errors                         | `Error`      |
| Globals                        | `globalThis` |
| Permissions                    | —            |

---

# À part

* Internationalization
* C++ addons
* C/C++ addons with Node-API
* C++ embedder API
* Modules: ECMAScript modules
* Modules: CommonJS modules
* Modules: Packages
* Modules: node\:module API
* Modules: TypeScript
