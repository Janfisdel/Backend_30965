const {Router} = require("express")
const forkRouter = Router()
const {fork} = require("child_process")


forkRouter.get('/', (req, res)=>{
    const cant = req.query || 100000000
    const random= fork('./forkRandom.js')
    random.on('message', valores=>{
    
        return res.end(`objeto de valores: ${valores}`)
    } )
 })



module.exports = forkRouter