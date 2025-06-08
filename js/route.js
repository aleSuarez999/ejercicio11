const mainElement = document.querySelector("main");

const onLoadTemplate = template => {
    if (template !== "home")
    {
        location.hash = template
    } else {
        location.hash = "busqueda"
    }
    const xhr = new XMLHttpRequest;
    xhr.open ("GET", `./template/${template}.html`)
    xhr.addEventListener("load", () => mainElement.innerHTML = xhr.response )
    xhr.send()
}

window.addEventListener("popstate", () => {
    const { hash } = location
    console.log(hash) // esto me trae lo que le sigue 
    const parsedHash = hash.slice(1)
    onLoadTemplate(parsedHash)
})

const initialLoadContent = () => {
    
    const { hash } = location;
    const parsedHash = hash.slice(1)
    //onLoadTemplate(parsedHash || "home") // si parseHash toma eso, sino muestra home
    onLoadTemplate( (parsedHash === "busqueda") ? parsedHash : (parsedHash === "contact") ? parsedHash : "home")
}

document.addEventListener("DOMContentLoaded", initialLoadContent)

window.addEventListener("popstate", initialLoadContent)