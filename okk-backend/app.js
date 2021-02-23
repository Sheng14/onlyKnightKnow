const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const ENV = 'odst'

// 跨域
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

// 接收post参数解析
app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next)=>{
    console.log('全局中间件')
    // ctx.body = 'Hello Wolrd'
    ctx.state.env = ENV
    await next()
})

/*const subjectList = require('./controller/subjectList.js')
const recordList = require('./controller/recordList.js')
const squareList = require('./controller/squareList.js')
router.use('/subjectList', subjectList.routes())
router.use('/recordList', recordList.routes())
router.use('/squareList', squareList.routes())*/

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3000, () => {
    console.log('服务开启在3000端口')
})