const Koa = require('koa2')
const Router = require('koa-router')
const koaStatic = require('koa-static2')
const koaProxy = require('koa2-proxy-middleware')
const koaNunjucks = require('koa-nunjucks-2')

const axios = require('axios')
const Debug = require('debug')
const debug = Debug('main')
Debug.enable('*')

const path = require('path')

const app = new Koa()

const router = new Router()

const defaultOption = {
    'deploy_website': 'http://weak.csie.org:9099',
}

router.get('/', async (ctx) => {
    await ctx.render('main')
})

router.get(['/favicon.ico'], async (ctx) => {
    ctx.status = 404
})

router.get('/url', async (ctx) => {
    await ctx.render('url_form', defaultOption)
})
router.get('/text', async (ctx) => {
    await ctx.render('text_form', defaultOption)
})
router.get('/file', async (ctx) => {
    await ctx.render('file_form', defaultOption)
})

router.get('/:str', async (ctx) => {
    str = ctx.params.str
    debug(`GET /${str}`)
    let Debug = debug.extend(`GET /${str}`)
    await axios.post(`${defaultOption.deploy_website}/api/get`, {
        url: str
    }).then(async (res) => {
        if (res.status === 200) {
            Debug(res.data)
            await ctx.render('redirect', {...defaultOption, ...{ 'destination':res.data }})
        }
        else ctx.status = 404
    }).catch((err) => {
        throw err
    })
})


app.use(koaNunjucks({
    ext: 'njk',
    path: path.join(__dirname, './views'),
    // nunjuckConfig: { trimBlocks: true }
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.use(koaStatic("src", __dirname + "/src"))

app.use(koaProxy({
    targets: {
        '/api/(.*)': {
            target: 'http://localhost:10999',
            changeOrigin: true,
            pathRewrite: {
                '/api': ''
            }
        }
    }
}))


app.listen(9099)
