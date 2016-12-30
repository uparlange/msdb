define(["app:AppUtils", "app:LogUtils"],
function (AppUtils, LogUtils) 
{
    return {
        init:function()
        {
            this._logger = LogUtils.getLogger("Server");

            const fs = require("fs");
            const express = require("express");
            const expressInstance = express();
            const http = require("http");
            const httpInstance = http.createServer(expressInstance);
            const io = require("socket.io");
            const ioInstance = io(httpInstance);
            const bodyParser = require("body-parser");

            expressInstance.use(function(request, response, next) 
            {
                response.header("Access-Control-Allow-Origin", "*");
                response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
            expressInstance.use(bodyParser.json()); 
            expressInstance.use(bodyParser.urlencoded({extended:true}));

            const serverPort = AppUtils.getServerPort();
            httpInstance.listen(serverPort, function()
            {
                this._getLogger().info("(EXPRESS) Listening on port " + serverPort);
            });

            ioInstance.on("connection", (socket) =>
            {
                this._getLogger().info("(SOCKET.IO) User (" + socket.id + ") connected");

                socket.on("GET_MY_GAMES", (name, callback) => 
                {
                    this._getMyGamesHandler(name, callback);
                });
                socket.on("IS_ROM_AVAILABLE", (name, callback) =>
                {
                    this._isRomAvailableHandler(name, callback);
                });
                socket.on("PLAY_GAME", (name) => 
                {
                    this._playGameHandler(name);
                });
            });
        },
        _getLogger:function()
        {
            return this._logger;
        },
        _getConfiguration:function()
        {
            return require("./data/config.json");
        },
        _initMame:function(mameDirectory, mameFileName)
        {
            const eventEmitter = new ng.core.EventEmitter();

            const mameIni = mameDirectory + "\\mame.ini"; 
            const fs = require("fs");
            if(fs.existsSync(mameIni))
            {
                cmd = "cd " + mameDirectory + " & " + mameFileName;
                cmd += " -cc";
                this._execCmd(cmd).subscribe(() =>
                {
                    let source = fs.readFileSync(mameIni, "utf8");
                    const params = {};
                    const all_lines_array = source.split("\r\n");
                    all_lines_array.forEach(function(line, index, array) 
                    {
                        if(line.length > 0 && line.indexOf("#") === -1)
                        {
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

                    dest = "";
                    for(let attr in params)
                    {
                        dest += attr + " " + params[attr] + "\r\n";
                    }
                    fs.writeFileSync(mameIni, dest);
                    eventEmitter.emit();
                });
            }
            else
            {
                setTimeout(() =>
                {
                    eventEmitter.emit();
                },0);
                callback();
            }

            return eventEmitter;
        },
        _execCmd:function(cmd)
        {
            const eventEmitter = new ng.core.EventEmitter();

            this._getLogger().info("(CMD) Execute '" + cmd + "'");
            
            const child_process = require("child_process");
            child_process.exec(cmd, (error, stdout, stderr) =>
            {
                if(error != null && error.length > 0)
                {
                    this._getLogger().error("(CMD) " + error.toString());
                }
                if(stdout != null && stdout.length > 0)
                {
                    this._getLogger().info("(CMD) " + stdout);
                }
                if(stderr != null && stderr.length > 0)
                {
                    this._getLogger().error("(CMD) " + stderr);
                }
                eventEmitter.emit();
            });

            return eventEmitter;
        },
        _playGameHandler:function(name)
        {
            this._getLogger().info("(MAME) Launch game " + name);

            const fs = require("fs");
            const configuration = this._getConfiguration();   
            const mameDirectory = configuration.MAME_DIRECTORY;
            let mameFileName = "mame64.exe";
            if(!fs.existsSync(mameDirectory + "\\" + mameFileName))
            {
                mameFileName = "mame.exe";
            }
            this._initMame(mameDirectory, mameFileName).subscribe(() =>
            {
                let cmd = "cd " + mameDirectory + " & " + mameFileName + " " + name; 
                if(configuration.AUTOSAVE)
                {
                    cmd += " -autosave";
                }
                if(configuration.JOYSTICK)
                {
                    cmd += " -joystick";
                }
                this._execCmd(cmd);
            });
        },
        _getMyGamesHandler:function(name, callback)
        {
            const fs = require("fs");
            const path = require("path");
            const configuration = this._getConfiguration();
            const games = [];	
            try {
                const files = fs.readdirSync(configuration.ROMS_DIRECTORY);
                files.forEach((file, index, array) => 
                {
                    const fileInfos = path.parse(file);
                    if(fileInfos.ext === ".zip")
                    {
                        games.push(fileInfos.name);
                    }
                });
            } catch(e) {

            }
            callback(games);
        },
        _isRomAvailableHandler:function(name, callback)
        {
            const fs = require("fs");
            const configuration = this._getConfiguration();
            const result = {
                name:name,
                available:false
            };
            const gameFilename = configuration.ROMS_DIRECTORY + "\\" + name + ".zip";
            if(fs.existsSync(gameFilename))
            {
                result.available = true;
            }
            callback(result);
        }
    };
});