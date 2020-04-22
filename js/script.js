function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// Initial Get-response from GeoNorge Adresse API to test status 200 = OK
document.getElementById("btnGetAddress").onclick = function getAddress() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const ul = document.getElementById('addressList')
      fetch("https://ws.geonorge.no/adresser/v1/sok?adressenavn=harbitzalléen&nummer=18", requestOptions)
        .then(response => response.json())
        .then(function(data) {
            let adresser = data.adresser;
            return adresser.map(function(adresse) {
                let li = createNode('li'),
                span = createNode('span');

            span.innerHTML = adresse.adressetekst; // return adressetekst
            append(li, span);
            append(ul, li);
            })
        })
        .catch(error => console.log(JSON.stringify(error)));
    
}
