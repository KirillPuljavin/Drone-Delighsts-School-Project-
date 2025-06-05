# Drone Delights – Matleverans med drönare

Det här projektet är utvecklat som en del av kursen Gränssnittsutveckling (VT25) vid Newton Yrkeshögskola, men fungerar också som en demoapplikation för min utvecklarportfölj. Applikationen är en fullstacklösning som simulerar en modern matleveranstjänst där användare kan utforska en meny, lägga beställningar och hantera sin profil. Fokus har varit på att bygga en komplett användarupplevelse med en stabil teknisk grund.

## Syfte och mål

Syftet var att utveckla en användarvänlig och responsiv webbapplikation som övar viktiga färdigheter såsom frontendutveckling i React, backendintegration via json-server, UI/UX-design med Figma samt att dokumentera arbetsprocessen. Applikationen är byggd för att visa upp min förmåga att arbeta med moderna teknologier och följa branschstandard.

## Teknologier och arkitektur

Applikationen är byggd i React 18 med React Router för navigering mellan sidor. För backend används json-server som tillhandahåller mock-endpoints för produkter, användare och ordrar. Jag har använt SCSS för modulär styling och i18next för stöd för flera språk (svenska och engelska). Applikationen är helt komponentbaserad med tydlig uppdelning av ansvar, och all kod är skriven i moderna ES6-moduler med funktionella komponenter.

Exempel på tekniska val:
-React Hooks för state och effekter
-LocalStorage för varukorg, favoriter och sessionshantering
-UUID för unika order-ID:n
-Figma för design och wireframes

## Funktionalitet och designval

- Startsida med hero-sektion, call-to-action och carousel för trending-rätter
- Menysida med dynamisk filtrering (huvudrätter, förrätter, drycker, desserter, favoriter), sökfunktion och sortering
- Varukorg med dynamisk uppdatering och animation i header
- Checkout-sida med omfattande validering av namn, adress, telefonnummer och betaluppgifter (Swish och kontokort)
- Login och registrering med sessionshantering och grundläggande autentisering
- Profilsida med möjlighet att ändra personuppgifter och lösenord samt visa orderhistorik
- Bekräftelsesida med orderöversikt och sammanställning

Jag har lagt särskild vikt vid användarvänlighet, med responsiv design och tillgänglighet genom t.ex. aria-labels och korrekt formhantering.

## Utmaningar och lärdomar

Att bygga en så pass komplett applikation har varit utmanande men lärorikt. Att få json-server att simulera en riktig backend med användarhantering krävde en del kreativitet, särskilt vid hantering av sessionsdata och autentisering. Språkväxlingen med i18next var en extra funktionalitet som jag valde att lägga till för att ge en mer internationell känsla. Att hålla varukorgen i synk med localStorage och UI var också en utmaning som lärde mig mycket om state-hantering i React.

Jag insåg också att i ett större projekt hade jag gärna använt TypeScript för bättre typkontroll och eventuellt Redux för global state management. Dessutom hade jag gärna lagt till loading states och spinner-komponenter för att förbättra användarupplevelsen ytterligare. Med mer tid hade jag också implementerat en riktig backend med JWT för säkrare autentisering.

## Filstruktur (kortfattad)

src/
 ├── components/ (Header, Footer)
 ├── pages/ (HomePage, MenuPage, CartPage, CheckoutPage, ConfirmationPage, auth/)
 ├── api/ (productService, userService)
 ├── utils/ (cartService, validationService)
 ├── styles/ (layout/*)
 ├── i18n.js
 └── main.jsx

## Slutsatser

Projektet visar att jag kan ta ansvar för både frontend och backend i en modern webbapplikation. Jag har arbetat med användarflöden, design, databasstruktur, sessionshantering och validering och fått en djupare förståelse för hur man bygger en professionell produkt från start till mål. Applikationen är välstrukturerad, responsiv och utvecklad med fokus på både funktionalitet och användarvänlighet.

Jag ser fram emot att bygga vidare på detta projekt och använda erfarenheterna från det i framtida projekt.
