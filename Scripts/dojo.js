window.onload = function () {

    (function () {
        getFetch("Dojo/GetArmes", function (data) {
            let formSamourai = document.getElementById("formSamourai");
            let selectArme = formSamourai.querySelector("#arme option");

            showSelect(data, selectArme);
        })
    })();
};

document.getElementById("btnSamourai").addEventListener('click', () => {

    getFetch("Dojo/GetSamourais/", function (data) {
        const elt = document.getElementById("tableLstSamourais");
        showElements(elt, data);
        document.querySelector("#tableSamourais").classList.remove("hidden");
    })
});

document.getElementById("btnArme").addEventListener('click', () => {

    getFetch("Dojo/GetArmes/", function (data) {
        const elt = document.getElementById("tableLstArmes");
        showElements(elt, data);
        document.querySelector("#tableArmes").classList.remove("hidden");
    })
});

document.getElementById("btnAddSamourai").addEventListener('click', () => {
    insertTitleValueBtn("Créer Samourai :", "Créer", "divFormSamourai");
    document.querySelector("#divFormSamourai").classList.remove("hidden");
});


document.getElementById("createButtonForm").addEventListener('click', () => {
    const divFormSamourai = document.getElementById("divFormSamourai");

    const ArmeSelect = divFormSamourai.querySelector("#arme");
    const arme = {
        'Id': parseInt(ArmeSelect.value),
        'Nom': ArmeSelect.options[ArmeSelect.selectedIndex].text
    }

    const newSamourai = {
        'Id': divFormSamourai.querySelector("#createButtonForm").getAttribute("name"),
        'Nom': divFormSamourai.querySelector("#nom").value,
        'Force': divFormSamourai.querySelector("#force").value,
        'Arme': isNaN(arme.Id) ? null : arme,
    }
    
    postFetch("/Dojo/saveSamourai/", newSamourai, function (data) {
        const divLstSamourai = document.getElementById("tableSamourais");
        divFormSamourai.querySelector("#formSamourai").reset();
        divFormSamourai.classList.add("hidden");

        const lstToRemove = divLstSamourai.querySelectorAll('.clone');
        lstToRemove.forEach(el => el.remove());
        showElements(document.getElementById("tableLstSamourais"), data);
    })
});

function showDetailsSamourai(el) {
    getFetch("Dojo/getSamouraiById/" + el.getAttribute("name"), function (data) {
        const divDetailSamourai = document.getElementById("detailsSamourai");
        const cloneEl = divDetailSamourai.parentNode.querySelector(".clone");
        if (cloneEl != null) {
            cloneEl.remove();
        }
        showElements(divDetailSamourai, data)
    })
}

function deleteSamourai(el) {
    getFetch("Dojo/deleteSamourai/" + el.getAttribute("name"), function (data) {
        const lstToRemove = document.querySelectorAll("#tableSamourais .clone");
        lstToRemove.forEach(el => el.remove());
        const elt = document.getElementById("tableLstSamourais");
        showElements(elt, data);
    })
}

function updateSamourai(el) {
    getFetch("Dojo/getSamouraiById/" + el.getAttribute("name") , function (data) {
        const formSamourai = document.querySelector("#divFormSamourai");
        insertTitleValueBtn("Modifier le samourai " + data.Nom + " :", "Modifier", "divFormSamourai");
        formSamourai.querySelector("#createButtonForm").setAttribute("name", data.Id);
        formSamourai.querySelector('#nom').value = data.Nom;
        formSamourai.querySelector('#force').value = data.Force;
        if (data.Arme != null) {
            formSamourai.querySelector('#arme').value = data.Arme.Id;
        }
        
        formSamourai.classList.remove("hidden");
    })
}

function showDetailsArme(el) {
    getFetch("Dojo/getArmeById/" + el.getAttribute("name"), function (data) {
        const divDetailArme = document.getElementById("detailsArme");
        const cloneEl = divDetailArme.parentNode.querySelector(".clone");
        if (cloneEl != null) {
            cloneEl.remove();
        }
        showElements(divDetailArme, data)
    })
}

function deleteArme(el) {
    getFetch("Dojo/deleteArme/" + el.getAttribute("name"), function (data) {
        const lstToRemove = divDetailArme.parentNode.querySelectorAll(".clone");
        lstToRemove.forEach(el => el.remove());
        const elt = document.getElementById("tableLstArmes");
        showElements(elt, data);
    })
}

function insertTitleValueBtn(title, valueBtn, selecteur) {
    const elt = document.getElementById(selecteur);
    elt.querySelector("h3").textContent = title;
    elt.querySelector("#createButtonForm").textContent = valueBtn;
}

function showSelect(datas, elt) {

    for (let i = 0; i < datas.length; i++) {
        const elClone = elt.cloneNode(true);

        elClone.setAttribute("value", datas[i].Id);
        elClone.textContent = datas[i].Nom;

        elt.parentNode.append(elClone);
        elClone.classList.remove("hidden");
    }
}