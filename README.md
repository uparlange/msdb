# MSDB (Mame Smart DataBase)
MAME 'Multiple Arcade Machine Emulator' is an arcade emulator. 
The list of games is such that it is considered as a large library or 'memory' of the arcade game. 
To check if your favorite game is available, go for a search on MSDB!
* MSDB Homepage (https://msdb.lapli.fr)
* Author Homepage (https://www.lapli.fr)

## Technical
This application has been developped using
* Angular v8 (https://github.com/angular/angular) 
* Angular Material v8 (https://github.com/angular/material2)
* And others libraries, see package.json for dependencies (https://github.com/uparlange/msdb/blob/master/package.json)

## Execute application

### 1. Install NW.js
* Download lastest normal version of NW.js (https://nwjs.io/)
* Unzip content in "C:\Program Files\nwjs"

### 2. Download application
* Latest : https://github.com/uparlange/msdb/raw/master/release/msdb-4.7.5.nw

### 3. Launch application
* Double click on the application (.nw file)
* Select "nw.exe" from "C:\Program Files\nwjs" as default reader for "*.nw" files

## Test localy ##

> * Install Nodejs (https://nodejs.org)
> * Clone repository
> * Execute 'npm install' command to get dependencies

### Test browser version
* Execute 'npm run web' command to start web server
* Launch your favorite brower
* Go to http://localhost

### Test desktop version
* Execute 'npm run desktop' command to launch desktop version

## Build localy

> * Make sure to have gulp installed, execute 'npm install gulp-cli -g'
> * In case of problem with jpegtran, execute : 'npm rebuild jpegtran-bin'
> * In case of problem with optipng, execute : 'npm rebuild optipng-bin'

### Build web version
* Execute 'gulp build-web'

### Build desktop version
* Execute 'gulp build-desktop'