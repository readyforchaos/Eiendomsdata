// Initial Get-response from GeoNorge Adresse API to test status 200 = OK
document.getElementById("btnGetAddress").onclick = function getAddress() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://ws.geonorge.no/adresser/v1/sok?adressenavn=harbitzalléen&nummer=18", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
