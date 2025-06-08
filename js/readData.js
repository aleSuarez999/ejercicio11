const BASE_PROD_URL = "https://6838e0cd6561b8d882ae700d.mockapi.io/api/"
let data1 = {} // guardo al inicio los productos
let ordenPrecio = true;
const readProducts = async () => {
    const response = await fetch(BASE_PROD_URL + "Producto", { method: "GET" })
    const listaProductos = await response.json()
    return listaProductos
}

const ordenarPrecio = () => {
    if (ordenPrecio)
        data1.sort((movie1, movie2) => movie1.price - movie2.price)
    else{
        data1.sort((movie1, movie2) => movie2.price - movie1.price)
    }
    ordenPrecio = !ordenPrecio
    showResult1(data1)
}

const filterProducts = (event) => {
    // data la cargo al principio
    event.preventDefault()

    readProducts()
    .then( data => {
        //console.log(data)
        const series_container = document.getElementById("series_container");
        const fProd = document.getElementById("fProd").value.toLowerCase();
        const arrayFiltered = data.filter( listaProductos => listaProductos.product.toLowerCase().includes(fProd) )
        //console.log(arrayFiltered)
        //document.getElementById("series_container").innerHTML = JSON.stringify(arrayFiltered)
        data1 = arrayFiltered.map(
        movie => ({
            product: movie.product,
            price: movie.price,
            description: movie.description,
            title: movie.title,
        }))
        showResult1(arrayFiltered)
//        return arrayFiltered;
    
    })
    .catch( err => console.log(err) )

}

const showResult1 = (arrayProducts) => {
    let tableFin =""
    resumenResultados = document.getElementById("productsList")
    
    resumenResultados.innerHTML = (arrayProducts.length > 0)?`Se encontraron  ${arrayProducts.length} coincidencias`:`No se encontraron coincidencias para su busqueda`;
    if (arrayProducts) {
            let th = `
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col" onclick="ordenarPrecio()" class="rotulo">Precio</th>
                            <th scope="col">Descripción</th>
                        </tr>
                    </thead>`
            let tr = ""
     
            arrayProducts.forEach(({id, product, description, price }) => {
                
                 tr += `
                    <tr id=${id} ">
                        <td title='${description}'>${product}</td>
                        <td class='taR'><span>${price}</span></td>
                        <td >${description.substr(0,60)}...</td>
                    </tr>\n
                    `
            })
            let tableFin = `</table>`
            document.getElementById("productsList").innerHTML += th + "\n" + tr + "\n" + tableFin
        }
}

//  muestra en un OL no se usa
const showResult = (arrayProducts) => {
    let tableFin =""
    productsList = document.getElementById("productsList")
    productsList.innerHTML = ""
    contador = 0
    if (arrayProducts) {

            let olIni = `
                    <ol role='list'> 
                `
            productsList.innerHTML = productsList.innerHTML.concat(olIni)
            let tr = ""
            let li = ""
            arrayProducts.forEach(({id, product, description, price }) => {
                contador += 1

                 li = ` <li id="li_${id}" title='${description}'>${product} - <span id="price">${price}</span> / ${description.substr(0,30)}... </li> `
                productsList.innerHTML = productsList.innerHTML.concat(li)     
                if (contador % 2) // zebra inventado
                    document.getElementById(`li_${id}`).className = document.getElementById(`li_${id}`).className.concat("fondoBlanco")
            })
            const olFin = "</ol>"
            
            productsList.innerHTML = productsList.innerHTML.concat(olFin)
        }
}
