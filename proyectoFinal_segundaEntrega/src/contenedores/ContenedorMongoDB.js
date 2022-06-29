
const { ObjectId } = require("bson")

class ContenedorMongoDB {
    constructor(connection, model){
        this.connection = connection
        this.model = model
    }

    findAll(){
        return this.connection
            .then(_=>this.model.find({}))
            .then(data=>{
                return data
            })
            .catch(err=>console.log(`Error: ${err.message}`))
    }

    find(id){
       return this.connection
            .then(_=>this.model.findOne({_id:ObjectId(`${id}`)}))
            .then(data=>{
                return data
            })
            .catch(err=>console.log(`Error: ${err.message}`))
    }

    create(data){
       const newmodel = new this.model(data)
        return this.connection
            .then(_ => newmodel.save())
            .then(document =>{
                console.log('Se guardó correctamente', document)
                return document
            })
            .catch(err => console.error(`Error: ${err.message}`))
    }
    
    update(id, data){
        return this.connection
            .then(_ => this.model.updateOne({
                        _id:ObjectId(`${id}`)
                        }, {
                         $set: data
                        }))
            .then(result => console.log(result))
            .catch(err => console.error(`Error: ${err.message}`))
            

    }

    delete(id){
        return this.connection
            .then(_=>this.model.findOne({_id:ObjectId(`${id}`)}))
            .then(item=>{
                return item.remove()
            })
            .catch(err=>{console.error(`Error: ${err.message}`)})
}
}

module.exports = ContenedorMongoDB