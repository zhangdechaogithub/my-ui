const fs = require('fs')
var stat = fs.stat
const isDev = process.env.NODE_ENV === 'dev'
const copyFunc = (src, dst) => {
    fs.readdir(src, function(err, paths) {
        if (err) {
            throw err
        }
        paths.forEach(function(path) {
            var _src = src + '/' + path
            var _dst = dst + '/' + path
            var readable
            var writable
            stat(_src, function(err, st) {
                if (err) {
                    throw err
                }
                if (st.isFile()) {
                    readable = fs.createReadStream(_src)
                    writable = fs.createWriteStream(_dst)
                    readable.pipe(writable)
                } else if (st.isDirectory()) {
                    exists(_src, _dst, copyFunc)
                }
            })
        })
    })
}

var exists = (src, dst, callback) => {
    fs.exists(dst, function(exists) {
        if (exists) {
            callback(src, dst)
        } else {
            fs.mkdir(dst, function() {
                callback(src, dst)
            })
        }
    })
}

if (isDev) {
    const rollup = require('rollup')
    const config = require('../rollup.config.js')

    const watchOptions = { ...config }
    const watcher = rollup.watch(watchOptions)
    watcher.on('event', event => {
        if (event.code === 'END') {
            exists('./components/style/font', '../test/public/font', copyFunc)
            console.log('event state-----success-------watching------------')
        }
        if(event.code === 'ERROR'){
            console.log('event state-------fail----------------')
        }
    })
} else {
    exists('./components/style/font', './dist/font', copyFunc)
    exists('./components/style/font', './es/style/font', copyFunc)
    console.log('--------------success---------------')
}