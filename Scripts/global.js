﻿
// fonction qui récupère l'élément à valoriser et les datas, 
// les datas peuvent être sous forme de tableau ou une data unique
// la fonction vérifie si la data est un tableau, si oui alors elle 
// boucle sur chacun des éléments en appelant la fonction "showValues"
// pour valoriser et afficher ces éléments autrement elle appelle la même
// fonction une fois
function showElements(el, datas) {

    if (datas != null) {
        if (datas.length) {
            for (let j = 0; j < datas.length; j++) {
                let data = datas[j];
                showValues(el, data);
            };
        }
        else {
            showValues(el, datas);
        }
    }
}


// fonction qui clone l'élément à valoriser, récupère les éléments ayant 
// l'attribut "data-prop", filtre les doublon de valeur "data-prop",
// puis boucle sur chaques élément récupérés afin de valoriser les éléments
// où ils doivent l'être (text, name...) en se basant sur la valeur de 
// l'attribut "data-src", si la valeur de ce dernier est "model", alors on
// appel la fonction showElements en récursif, et pour finir on injecte l'élément
// généré dans l'élément parent (ici une div)
function showValues(el, data) {

    const elClone = el.cloneNode(true);
    elClone.classList.add("clone");
    const lstElData = Array.from(elClone.querySelectorAll("[data-prop]"));

    for (let i = 0; i < lstElData.length; i++) {
        
        const currentProp = lstElData[i].getAttribute("data-prop");

        if (data.hasOwnProperty(currentProp)) {

            const whereInsert = lstElData[i].getAttribute("data-src");

            switch (whereInsert) {
                case "text": lstElData[i].textContent = data[currentProp];
                    break;
                case "name": lstElData[i].setAttribute("name", data[currentProp]);
                    break;
                case "model": showElements(lstElData[i], data[currentProp]);
                    break;
            }

        }
        else {
            console.log(currentProp + " n'est pas renseignée.");
        }
    };

    el.parentNode.append(elClone);
    elClone.classList.remove("hidden");
}


function getFetch(url, fonction) {

    fetch("https://localhost:44302/" + url, { method: 'GET' })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            fonction(data)
        })
}

function postFetch(url, obj, fonction) {

    fetch("https://localhost:44302/" + url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        }
        })
        .then(function (response){
         return response.json()
         })
        .then(function (data) {
            fonction(data)
        })
}

