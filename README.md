> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# React Redux Calendar

Otrzymaliśmy zlecenie przebudowania aplikacji, która przechowuje informacje o terminie spotkania z konkretną osobą wykorzystując mechanizm `state` dostępny w React. 

Niestety zarządzanie projektem w ten sposów zaimplementowanym jest dość problematyczne ponieważ musimy przekazywać przez `props` dane ze `state` z najwyższego komponentu tj `Calendar` do jego potomków. W momencie utworzenia większej ilości komponentów będzie to prawdziwe utrapienie.

Naszym zadaniem będzie przebudowanie mechanizmu `state` z React na zarządzanie stanem aplikacji wykorzystując Redux.
Co ma ułatwić zadządzanie naszą aplikacją i ułatwić jej rozbudowę.

## Przygotowania środowiska pracy

### instalacja paczek

W pliku `package.json` mamy zapisane zależności (tj. niezbędne paczki), które pozwolą nam uruchomić aplikacje.

Musimy w pierwszej kolejności je zainstalować tj. w terminalu uruchomić `npm i` będąc w katalogu głównym naszej aplikacji.

Po instalacji możemy uruchomić webpack-a używając komendy `npm start`, która również została zapisane w pliku `package.json`.

Natomiast w pliku `webpack.config.js` znajdziemy minimalna, niezbędną konfigurację webpacka-a w celu uruchomienia lokalnego serwera, natomiast w pliku `.babelrc` mamy ustawienia związane z babel-em tj. narzędzia, który transpiluje kod. 


### json-server

> Jeśli wykonałeś poprzednie zadanie tj. **React Calendar** to te czynności zapowne już wykonywałeś.

Danę są przechowywane na lokalny API, wykorzystując [json-server](https://github.com/typicode/json-server). 

Wspomniane rozwiązania zainstalujemy dzięki [npm](https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)) więc musimy mieć zainstalowany [Node.js](https://nodejs.org) w wersji co najmniej 10.16.

Jeśli nie jesteś pewny jaką wersję posiadasz to możesz to sprawdzić za pomocą flagi `-v` tj `node -v`.

Instalujemy globalnie `json-server` dlatego warto mieść uprawnienia administratora (sudo na Linux-ie), aby móc to zrobić.

W terminalu wpisujemy komendę:

```
npm install -g json-server@0.15
```

Po instalacji powinniśmy mieć dostęp do informacji o zainstalowanej wersji 

```
json-server -v
```

Jeśli masz już uruchomienego webpacka (`npm start`), to w kolejnym terminalu (lub wierszu poleceń) powinisśmy odpalić nasze API tj.

```
json-server --watch ./db/data.json --port 3005
```

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/meetings
```

> **Uwaga!** json-server musi zawsze być uruchomiony jeśli API ma działać. 

## Implementacja

### Magazyn + Reducer

W pierwszej kolejności utworzymy Magazyn. Musimy zastanowić się, w którym miejscu mamy go utworzyć.

Nasz `state` jest w `<Calendar/>` jednak jest on stanem tylko dla tego komponentu. Równie dobrze moglibyśmy przenieść go do pliku `index.js` i tam przekazywać z rodzica do dziecka, aż do `<Calendar/>`.

Nie będziemy tego robić, ale nasz Magazyn właśnie tam utworzymy ponieważ będzie to stan naszej całej aplikacji.

Podczas tworzenie Magazunu (Store), tworzymu również Readucer-a w lokalizacji `./src/reducers/index.js`, który będzie zwraca na razie jedynie stan początkowy jakim będzie obiekt z właściwością `meetings` tj.

```javascript
{
    meetings: [],
}
```

To również dobry moment, aby za pomocą `<Provider/>` przekazać do pozostałych komponentów naszego Store-a.


### Action + Reducer

Zastanówmy się teraz jakie akcje mamy w naszym `<Calendar/>`. Należy spojrzeć na to w taki sposób tj. jakie mamy czynności, które operują na `state` w `<Calendar/>`?

Pewnie będzie to wczytanie wszysktich danych z API oraz dodanie utworzonego elementu przez formularz. Dlatego zdefiniujmy sobie 2 akcje:

* loadMeetingsAction
* saveMeetingAction

Obie akcje zdefiniujmy w pliku `./src/actions/calendar.js`. Zauważmy również, że muszą one nieść ze sobą ładnek w postaci danych, które mają zostać dodane naszego Magazynu.

W przypadku `loadMeetingsAction` to będą dane pobrane z API. Natomiast dla `saveMeetingAction` będzie to obiekt przechowujący dane o nowym spotkaniu.

Kiedy mamy już zdefiniowane (i wyeksportowane Akcje) to powinniśmy zmodyfikować Reduxer-a, który powinien absłużyć zdefiniowane akcje. Należy pamiętać o tworzeniu kopii dla `state`!

### connect()

Nadszedł czas na połącznie naszego Magazynu z naszym `<Calendar/>` ponieważ to w nim są czynności (czyli docelowo Akcje), które będą operować na stanie aplikacji.

Importujemy `connect()` i wskazujemy przez map-owanie jakie Stany i Akcje nas interesują w `<Calendar/>`.
Na pewno potrzebujemy listy spotkań tj. `meetings` i potrzebujemy obu Akcji, które musimy zaimportować.

Nasze połącznie powinno wyglądac mniej więcej tak:

```javascript
export default connect(mapStateToProps, mapActionToProps)(Calendar);
```

Jeśli wszystko wykonaliśmy prawidłowo to od teraz nie musimy już korzystać ze state w `<Calendar/>`. Wystarczy, że będziemy przekazywać `this.props.meetings` do `<CalendarList />`.

### state w `<CalendarForm/>`

Używanie Redux-a nie wyklucza korzystanie z React-owego `state`. Jeśli potrzebujemy stanu lokalnego (a w szcególności, gdy tworzymy komponenty kontrolowane) to nic nie stoi na przeszkodzie, aby go używać.


### Redux DevTools

Spróbuj teraz podłaczyć Magazyn do wtyczki Redux DevTools i zobacz jak się ona zachowuje w czasie pracy naszej aplikacji.

## Usprawnij swój kod

Wykonaj refaktoryzację kodu - np. zapytania do API wrzuć do osobnego pliku w katalogu `providers`.

Być może będziesz chciał podzielić komponenty na mniejsze lub wykorzystać *hooki* tworząc komponenty funkcyjne. 

Dzięki implementacji Redux-a możesz też przenieść logikę działania aplikacji do poszczególnych komponentów (w `<CalendarList>` pobieranie danych z API, a w `<CalendarForm>` dodawanie danych do API), co pozwoli odchudzić i zwiększyć czytelność komponentu `<Calendar>`.

Przygotuj kod w taki sposób, jakby ten porojekt miał zedecydować o Twoim przyjęciu do pracy.

## Dodaj odpowiedni wygląd

Możesz wykorzystać komponenty z poprzedniego projektu tj. `task-react-styling`, aby upiększyć formularz w odpowiedni sposób.

W tym przypadku zwróć uwagę na elementy, które były problematyczne przy przenoszeniu kodu do innego projektu. Ta wiedza powinna być Ci przydatna podczas tworzenia następnych rozwiązań.



&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
