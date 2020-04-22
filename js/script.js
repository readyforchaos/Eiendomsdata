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
      const textResponse = document.getElementById("txtResponse")
      var input = document.getElementById("searchInput").value
      console.log("Inserted value: ", input)
      ul.innerHTML = "";
      fetch("https://ws.geonorge.no/adresser/v1/sok?sok="+ input, requestOptions)
        .then(response => response.json())
        .then(function(data) {
            let adresser = data.adresser;
            txtResponse.innerHTML = "The following is the response from matrikkelen (kartverket):"
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
