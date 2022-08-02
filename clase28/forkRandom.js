let arrRandom =[]
let objCantidades ={}
process.on("message", cant=>{

    for (let i=0; i<cant; i++) {
        const numeroRandom = Math.floor((Math.random()*(1000 + 1)))
        arrRandom.push(numeroRandom) 
    }
    
    objCantidades = arrRandom.reduce((a,elemento)=>(a[elemento]?a[elemento]+=1 : a[elemento]=1, a),{})
    
    process.send(objCantidades)
})

