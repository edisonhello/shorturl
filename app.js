var config = require('./config.json')
var port = config.port || 3000

var fs = require('fs')
var express = require('express')
var app = express()
var colors = require('colors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var randomstring = require('randomstring')
var sha512_256 = require('js-sha512').sha512_256

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/shorturl')
app.use(bodyParser.urlencoded({ extended: false }))

var urlSchema = new mongoose.Schema({
    isUrl: {type: Boolean},
    url: {type: String},
    shortUrl: {type: String}
})
var urlDetail = mongoose.model('url', urlSchema)

app.get('', (req,res) => {
    res.send('ovob')
    res.end()
})
app.get('/short', (req, res) => {
    meow('LOG', 'Get request /short')
    res.sendFile(__dirname+'/pages/index.html', () => {
        res.end()
    })
})
app.get('/short/:id', (req, res) => {
    meow('LOG', 'Get request /short/'+req.params.id)
    if(fs.existsSync(__dirname+'/pages/'+req.params.id+'.html')){
        res.sendFile(__dirname+'/pages/'+req.params.id+'.html', () => {
            res.end()
        })
        return
    }
    urlDetail.findOne({ shortUrl: req.params.id }, (err, item) => {
        if(err) throw err
        if(item){
            meow('LOG', 'found '+req.params.id)
            if(item.isUrl){
                res.send('<a href="'+item.url+'">'+item.url+'</a>')
                res.end()
            }
            else{
                res.send(item.url)
                res.end()
            }
        }
        else{
            meow('LOG', 'Can\' find '+req.params.id)
            res.send('WTF?')
            res.end()
        }
    })
})
app.post('/', (req, res) => {
	meow('LOG', 'Get post / ')
    if(sha512_256(req.body.pass) !== config.password){
        meow('LOG', 'Wrong password')
        res.send('Invaild password')
        res.end()
        return
    }
    meow('LOG', 'correct password')
    let shortUrl = req.body.short || randomstring.generate(4)
    urlDetail.findOne({ url: req.body.detail }, (err, item) => {
        if(err) throw err
        if(item){
            meow('DEBUG', 'find same: '+item)
            let link = 'https://weak.infor.org/short/'+item.shortUrl
            res.send('<a href="'+link+'">'+link+'</a>')
            res.end()
        }
        else{
            meow('LOG', 'Create new url: '+shortUrl)
            meow('DEBUG', 'is url: '+req.body.isUrl)
            meow('DEBUG', 'detail: '+req.body.detail)
            let newUrl = new urlDetail({
                isUrl: req.body.isUrl,
                url: req.body.detail,
                shortUrl: shortUrl
            })
            newUrl.save( err => {
                if(err) throw err
                let link = 'https://weak.infor.org/short/'+shortUrl
                res.send('<a href="'+link+'">'+link+'</a>')
                res.end()
                meow('LOG', 'Saved!')
            })
        }
    })
})
app.post('/edit', (req, res) => {
    meow('LOG', 'Get post /edit')
    if(sha512_256(req.body.pass) !== config.password){
        meow('LOG', 'Wrong password')
        res.send('Invaild password')
        res.end()
        return
    }
    meow('LOG', 'correct password')
    urlDetail.findOne({ shortUrl: req.body.short }, (err, item) => {
        if(err) throw err
        if(item){
            item.isUrl = req.body.isUrl
            item.url = req.body.detail
            item.save((err, item) => {
                if(err) throw err
                let link = 'https://weak.infor.org/short/'+req.body.short
                res.send('<a href="'+link+'">'+link+'</a>')
                res.end()
                meow('LOG', 'Saved!')
            })
        }
        else{
            res.send('Nothing to edit!')
            res.end()
        }
    })
})
app.post('/del', (req, res) => {
    meow('LOG', 'Get post /del')
    if(sha512_256(req.body.pass) !== config.password){
        meow('LOG', 'Wrong password')
        res.send('Invaild password')
        res.end()
        return
    }
    meow('LOG', 'correct password')
    urlDetail.remove({ shortUrl: req.body.short }, (err) => {
        if(err) throw err
        meow('LOG', 'deleted')
        res.send('Deleted')
        res.end()
        return
    })
})

app.listen(port, () => {
    meow('LOG', 'Server is running at port '+port)
})

function meow(type, msg){
    let time = '['+(new Date()).toLocaleTimeString('en-US', { hour12: false })+']'
    let front = '['+type+']'
    console.log(time.green, front.cyan, msg)
}
