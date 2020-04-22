# Eiendomsdata

![eiendomsdata](https://github.com/readyforchaos/Eiendomsdata/blob/master/img/snapshot.PNG?raw=true)

Oppgaven er å illustrere muligheten for å hente ut data fra diverse kilder uten direktetilgang via API som f.eks Boligpriser og grunnboken.

### Howto

1. Tast inn addresse (addressen blir plukket opp av kartverkets API og leverer de beste resultatene som samsvarer med din input)
2. Første seksjon er responsen fra Kartverkets addresse API, midterste seksjonen er resultat fra en enkel leaflet integrasjon hvor markørene er populert med diverse info om tinglysninger fra boligpriser og grunnboka.

### Forbedringer mulig

Her er noen top-off-the-head forbedringer som kan gjøres som ikke har blitt prioritert:
1. Autocomplete av addressenavn
2. Fikse noen bugs relatert til at man ikke kan manøvrere rundt i kartet med "panning" funksjonen hvis man har søkt to ganger uten å refreshe
3. Bedre markør med shadows slik at det er lettere å se hvor boligen er på kartet
4. Konsolidering av markører med populært resultat i én og samme infoboks slik at man lettere kan velge hvilken bruksenhet man ønsker å se når flere antall markører er på samme geolokasjon
5. Det finnes mange flere felter man kan hente fra API-ene. De jeg har valgt å ta med er kun et kort utdrag av disse.

### Disclaimer

Det er blitt brukt færrest mulig eksterne biblioteker (eneste som er brukt er leaflet for kart-funksjon og fontawesome for det lille ikonet for søkeknappen). Alt annet er vanilla js.

Laget på 4 timer
