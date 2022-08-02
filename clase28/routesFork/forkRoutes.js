const {Router} = require("express")
const forkRouter = Router()
const {fork} = require("child_process")

forkRouter.get('/', (req, res)=>{
    const cant = Number(req.query.cant)|| 1e8
    const random= fork('./forkRandom.js')
    random.send(cant)
    random.on('message', result=>{
    
        jsonResult = JSON.stringify(result)
        return res.end(`objeto de valores: ${jsonResult}`)
    } )
 })



module.exports = forkRouter