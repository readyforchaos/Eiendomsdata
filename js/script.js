function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// Initial Get-response from GeoNorge Adresse API to test status 200 = OK
document.getElementById("btnGetAddress").onclick = function getData() {

    // Matrikkel below
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      var input = document.getElementById("searchInput").value
      const ul = document.getElementById('addressList')
      
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

        // Eiendomspriser below

        var container = L.DomUtil.get('map');
        if(container != null) { 
            container._leaflet_id = null; 
        }
        var map = new L.Map('map').setView([59.9308509, 10.7952747], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        var headerProperty = new Headers();
        headerProperty.append("X-Requested-With", "XMLHttpRequest");
        headerProperty.append("Sec-Fetch-Mode", "cors");
    
        var requestOptionsProperty = {
        method: 'GET',
        headers: headerProperty,
        redirect: 'follow'
        };
    
        var input = document.getElementById("searchInput").value
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const ulProperty = document.getElementById('propertyList')
        ulProperty.innerHTML = "";
        fetch(proxyurl + "https://siste.eiendomspriser.no/service/search?query=" + input + "&sort=1&fromDate=&toDate=&placeFilter=&municipalities=", requestOptionsProperty)
        .then(response => response.json())
        .then(function(data) {
            let properties = data.Properties;
                
                return properties.map(function(property) {
                    let liProperty = createNode('li'),
                    pProperty = createNode('p');
                    p2Property = createNode('p');
                    p3Property = createNode('p');
                    h5Property = createNode('h5');
                    spanProperty = createNode('span');
    
                h5Property.innerHTML = property.Title; 
                pProperty.innerHTML = property.SaleType + ", " + "tinglyst: " + property.SoldDate; 
                p2Property.innerHTML = "Solgt for: " + property.Price;
                p3Property.innerHTML = property.Object;
    
                txtResponseProperty.innerHTML = "The following is the response from eiendomspriser (grunnboka):"
                
                L.marker([property.Coordinate.Lat, property.Coordinate.Lon]).addTo(map)
                .bindPopup(property.Title + "<br>Tinglyst: " + property.SoldDate + "<br>Solgt for kr: " + property.PriceF + "<br>Kjøpere: " + property.To)
                .openPopup();
    
                append(liProperty, h5Property);
                append(liProperty, pProperty);
                append(liProperty, spanProperty)
                append(liProperty, p2Property)
                append(liProperty, p3Property)
                append(ulProperty, liProperty);
                })
            })
        .catch(error => console.log('error', error)); 
}
