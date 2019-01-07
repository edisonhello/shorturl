const Koa = require('koa2')
const Router = require('koa-router')
const koaBodyparser = require('koa-bodyparser')

const mongoose = require('mongoose')

const randomString = require('randomstring')
const Debug = require('debug')
const debug = Debug('main')
Debug.enable('*')

mongoose.connect('mongodb://localhost/shorten', { useNewUrlParser: true })
const Schema = mongoose.Schema

const app = new Koa()

const router = new Router()

const urlSchema = new Schema({
    shorten_url: String,
    created_at: { type: Date, default: Date.now },
    original_url: String,
    count: { type: Number, default: 0 },
    last_access: { type: Date, default: Date.now }
})

const Url = mongoose.model('Url', urlSchema)

router.post('/submit/url', async (ctx) => {
    debug('POST /submit/url')
    let Debug = debug.extend('POST /submit/url')
    const url = ctx.request.body.url
    if (url == "") return
    Debug('url: %s', url)
    let shortenUrl = ''
    let generateNewUrl = async (next) => {
        shortenUrl = randomString.generate(5)
        await Url.find({ 'shorten_url':shortenUrl }, null, async (err, res) => {
            if (err) throw err
            if (res.length !== 0) return await generateNewUrl(next)
            Url.create({ shorten_url:shortenUrl, original_url:url }, (err, res) => {
                if (err) throw err
                ctx.response.status = 200
                ctx.response.body = shortenUrl
                Debug(`create new url for ${url} : ${shortenUrl}`)
                return next()
            })
        })
    }
    await new Promise((resolve, reject) => {
        Url.find({ 'original_url':url }, null, async (err, res) => {
            if (err) reject(err)
            if (res.length !== 0) {
                shortenUrl = res[0].shorten_url
                ctx.response.status = 200
                ctx.response.body = shortenUrl
                Debug(`return old shortenUrl is: ${shortenUrl}`)
                return resolve()
            }
            await generateNewUrl(next)
        })
    })
})

router.post('/get', async (ctx, next) => {
    let Debug = debug.extend('POST /get')
    const url = ctx.request.body.url
    if (url == "") return
    Debug('url: %s', url)
    await new Promise((resolve, reject) => {
        Url.find({ 'shorten_url':url }, null, async (err, res) => {
            if (err) reject(err)
            if (res.length === 1) {
                ctx.response.status = 200
                ctx.response.body = res[0].original_url
                Debug(`return original url: ${res[0].original_url}`)
                res[0].last_access = Date.now()
                res[0].count += 1
                res[0].save((err) => {
                    if (err) reject(err)
                    resolve()
                })
            }
        })
    })
})

app.use(koaBodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(10999)
