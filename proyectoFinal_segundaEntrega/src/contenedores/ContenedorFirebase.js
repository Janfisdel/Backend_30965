// contenedores/ContenedorFirebase.js
class ContenedorFirebase{
    constructor(query){
        this.query = query
    }

    async findAll(){
        try{
            const response = await this.query.get()
            const docs = response.docs
            const items = docs.map(doc=>{
                return {id:doc.id, ...doc.data()}
            })
            return items
            
        }catch(e){
            console.log(`Error:${e.message}`)
        }
    }

    async find(id){
        try{
            const response = await this.query.doc(id).get()
            const item = {id:response.id, ...response.data()}
            return item
        }catch(e){
            console.log(`Error:${e.message}`)
        }

    }
    async create(data){
        try{
            const producto = await this.query.add(data)
        }catch(e){
            console.log(`Error:${e.message}`)
        }        
    }

    async update(id, data){
        try {
            const item = await this.query.doc(`${id}`).update(data)
            return item
           } catch (e) {
            console.error(`Error: ${e.message}`)
           }
           
    }
    async delete(id){
        try {
            const item = await this.query.doc(`${id}`).delete()
            return item
           } catch (e) {
            console.error(`Error: ${e.message}`)
           }
           
   
    }
}

module.exports = ContenedorFirebase
