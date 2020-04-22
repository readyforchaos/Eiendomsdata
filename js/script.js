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

      var input = document.getElementById("searchInput").value
      const ul = document.getElementById('addressList')
      
      console.log("Inserted value: ", input)
      ul.innerHTML = "";
      fetch("https://ws.geonorge.no/adresser/v1/sok?sok="+ input, requestOptions)
        .then(response => response.json())
        .then(function(data) {
            let adresser = data.adresser;
            
            return adresser.map(function(adresse) {
                let li = createNode('li'),
                p = createNode('p');
                p2 = createNode('p');
                h5 = createNode('h5');
                span = createNode('span');

            h5.innerHTML = adresse.adressetekst; // return adressetekst
            p.innerHTML = adresse.postnummer + ", " + adresse.poststed; // return postnummer
            p2.innerHTML = adresse.bruksenhetsnummer; // return bruksenhetsnummer
            span.innerHTML = "Bruksenhetsnummer:"

            txtResponse.innerHTML = "The following is the response from matrikkelen (kartverket):"
            
            append(li, h5);
            append(li, p);
            if (p2.innerHTML == "") {

            } else {
                append(li, span)
                append(li, p2)
            }
            append(ul, li);
            })
        })
        .catch(error => console.log(JSON.stringify(error)));
    
}

document.getElementById("btnGetProperty").onclick = function getProperty() {
    var myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("Sec-Fetch-Mode", "cors");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var input = document.getElementById("searchInput").value
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const ul = document.getElementById('propertyList')
    ul.innerHTML = "";
    fetch(proxyurl + "https://siste.eiendomspriser.no/service/search?query=" + input + "&sort=1&fromDate=&toDate=&placeFilter=&municipalities=", requestOptions)
    .then(response => response.json())
    .then(function(data) {
        let properties = data.Properties;
            
            return properties.map(function(property) {
                let li = createNode('li'),
                p = createNode('p');
                p2 = createNode('p');
                h5 = createNode('h5');
                span = createNode('span');

            h5.innerHTML = property.Title; 
            p.innerHTML = property.SaleType + ", " + property.SoldDate; 
            p2.innerHTML = property.Price;

            txtResponseProperty.innerHTML = "The following is the response from eiendomspriser (grunnboka):"
            
            append(li, h5);
            append(li, p);
            append(li, span)
            append(li, p2)
            append(ul, li);
            })
        })
    .catch(error => console.log('error', error));
}

