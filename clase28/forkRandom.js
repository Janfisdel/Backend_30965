const random = (cantidad)=>{
    const maximo = 1000
    const cantRandom = cantidad
    let arrRandom =[]
    for (let i=0; i<=cantRandom; i++) {
        const numeroRandom = Math.floor((Math.random()*(maximo + 1)))
        arrRandom.push(numeroRandom) 
    }
    let objCantidades ={}
    objCantidades = arrRandom.reduce((a,elemento)=>(a[elemento]?a[elemento]+=1 : a[elemento]=1, a),{})

    return objCantidades
    
    
}



const valoresRandom = random(5)
process.send(valoresRandom)