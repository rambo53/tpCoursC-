window.onload = function () {
    if (Array.isArray(model) && model.length != 0) {
        let divLstCats = document.getElementById("divLstCats");
        showElements(divLstCats, model);
    }
    else {
        document.getElementById("divEmptyList").classList.remove("hidden");
    }

};


function showDetails(elt) {
    let idCat = elt.getAttribute('name');
    getFetch("Home/catDetails/" + idCat, function (data) {
        let elt = document.getElementById("divDetailsCat");
        showElements(elt,data);
    })
}
