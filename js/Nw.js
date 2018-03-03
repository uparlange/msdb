define(["AppUtils", "LogUtils"],
    function (AppUtils, LogUtils) {
        return {
            init: function () {
                this._logger = LogUtils.getLogger("Nw");
                this._fs = require("fs");
                this._initServer();
            },
            _initServer: function () {
                const express = require("express");
                const expressInstance = express();
                const http = require("http");
                const httpInstance = http.Server(expressInstance);
                const io = require("socket.io");
                const ioInstance = io(httpInstance);
                const bodyParser = require("body-parser");
                expressInstance.use(bodyParser.json());
                const serverPort = AppUtils.getSocketPort();
                httpInstance.listen(serverPort, () => {
                    this._getLogger().info("(EXPRESS) Listening on port " + serverPort);
                });
                ioInstance.on("connection", (socket) => {
                    this._getLogger().info("(SOCKET.IO) User (" + socket.id + ") connected");
                    socket.on("GET_MY_GAMES", (params, callback) => {
                        this._getMyGames(params, callback);
                    });
                    socket.on("IS_ROM_AVAILABLE", (params, callback) => {
                        this._isRomAvailable(params, callback);
                    });
                    socket.on("PLAY_GAME", (params, callback) => {
                        this._playGame(params, callback);
                    });
                    socket.on("GET_CONFIGURATION", (params, callback) => {
                        this._getConfiguration(callback);
                    });
                    socket.on("SAVE_CONFIGURATION", (params, callback) => {
                        this._saveConfiguration(params, callback);
                    });
                });
            },
            _getLogger: function () {
                return this._logger;
            },
            _getConfigFile: function () {
                const os = require("os");
                const pkg = require("./package.json");
                return os.homedir() + "\\" + pkg.name + ".json";
            },
            _saveConfiguration: function (config, callback) {
                this._fs.writeFileSync(this._getConfigFile(), JSON.stringify(config));
                callback();
            },
            _getConfiguration: function (callback) {
                let config = null;
                try {
                    config = JSON.parse(this._fs.readFileSync(this._getConfigFile()));
                } catch (e) {
                    this._getLogger().info("(CONFIG) No configuration file found !");
                }
                if (config === null) {
                    config = {
                        "mameDirectory": null,
                        "romsDirectory": null,
                        "autosave": false,
                        "joystick": false
                    };
                }
                callback(config);
            },
            _initMame: function (mameDirectory, mameFileName) {
                const eventEmitter = new ng.core.EventEmitter();
                const mameIni = mameDirectory + "\\mame.ini";
                if (this._fs.existsSync(mameIni)) {
                    let cmd = "cd " + mameDirectory + " & " + mameFileName;
                    cmd += " -cc";
                    this._execCmd(cmd).subscribe(() => {
                        let source = this._fs.readFileSync(mameIni, "utf8");
                        const params = {};
                        const all_lines_array = source.split("\r\n");
                        all_lines_array.forEach((line) => {
                            if (line.length > 0 && line.indexOf("#") === -1) {
                                const key = line.substring(0, line.indexOf(" "));
                                const value = line.substring(line.lastIndexOf(" ") + 1);
                                params[key] = value;
                            }
                        });
                        /* http://www.gamoover.net/tuto/am%C3%A9liorer-le-rendu-de-mame-sur-un-lcd */
                        params.multithreading = "1";
                        params.video = "d3d";
                        params.keepaspect = "1";
                        params.prescale = "2";
                        params.hwstretch = "1";
                        params.effect = "scanlines";
                        params.waitvsync = "1"
                        params.syncrefresh = "1"
                        let dest = "";
                        for (let attr in params) {
                            dest += attr + " " + params[attr] + "\r\n";
                        }
                        this._fs.writeFileSync(mameIni, dest);
                        eventEmitter.emit();
                    });
                }
                else {
                    setTimeout(() => {
                        eventEmitter.emit();
                    }, 0);
                }
                return eventEmitter;
            },
            _execCmd: function (cmd) {
                const eventEmitter = new ng.core.EventEmitter();
                this._getLogger().info("(CMD) Execute '" + cmd + "'");
                const child_process = require("child_process");
                child_process.exec(cmd, (error, stdout, stderr) => {
                    if (error != null && error.length > 0) {
                        this._getLogger().error("(CMD) " + error.toString());
                    }
                    if (stdout != null && stdout.length > 0) {
                        this._getLogger().info("(CMD) " + stdout);
                    }
                    if (stderr != null && stderr.length > 0) {
                        this._getLogger().error("(CMD) " + stderr);
                    }
                    eventEmitter.emit();
                });
                return eventEmitter;
            },
            _playGame: function (name, callback) {
                this._getLogger().info("(MAME) Launch game " + name);
                this._getConfiguration((configuration) => {
                    const mameDirectory = configuration.mameDirectory;
                    let mameFileName = "mame64.exe";
                    if (!this._fs.existsSync(mameDirectory + "\\" + mameFileName)) {
                        mameFileName = "mame.exe";
                    }
                    this._initMame(mameDirectory, mameFileName).subscribe(() => {
                        let cmd = "cd " + mameDirectory + " & " + mameFileName + " " + name;
                        if (configuration.autosave) {
                            cmd += " -autosave";
                        }
                        if (configuration.joystick) {
                            cmd += " -joystick";
                        }
                        this._execCmd(cmd);
                    });
                    callback();
                });
            },
            _getMyGames: function (name, callback) {
                this._getConfiguration((configuration) => {
                    const path = require("path");
                    const games = [];
                    try {
                        const files = this._fs.readdirSync(configuration.romsDirectory);
                        files.forEach((file) => {
                            const fileInfos = path.parse(file);
                            if (fileInfos.ext === ".zip") {
                                games.push(fileInfos.name);
                            }
                        });
                    } catch (e) {
                        /* dont't act */
                    }
                    callback(games);
                });
            },
            _isRomAvailable: function (name, callback) {
                this._getConfiguration((configuration) => {
                    const result = {
                        name: name,
                        available: false
                    };
                    const gameFilename = configuration.romsDirectory + "\\" + name + ".zip";
                    if (this._fs.existsSync(gameFilename)) {
                        result.available = true;
                    }
                    callback(result);
                });
            }
        };
    }
);