> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# React Redux Calendar

Otrzymaliśmy zlecenie przebudowania reactowej aplikacji, która informacje o umówionych spotkaniach przechowuje w `state`. 

Niestety zarządzanie takim projektem jest dość problematyczne, ponieważ dane ze `state` najwyższego komponentu (`Calendar`) musimy przekazywać do jego potomków przez `props`. Obsługa większej ilości komponentów przy dotychczasowym rozwiązaniu byłaby prawdziwym utrapieniem.

Naszym zadaniem będzie przebudowanie mechanizmu zarządzania stanem na taki, który wykorzystuje Reduxa. Ułatwi to nie tylko obsługę komponentów, ale i rozbudowę aplikacji.

## Przygotowania środowiska pracy

### Instalacja paczek

W pliku `package.json` mamy zapisane zależności (tj. niezbędne paczki), które pozwolą nam uruchomić aplikację.

W pierwszej kolejności musimy je zainstalować. Zrobimy to, będąc w katalogu głównym naszej aplikacji, za pomocą komendy `npm i`.

Po instalacji możemy uruchomić webpack komendą `npm start`, która również została zapisana w pliku `package.json`.

Natomiast w pliku `webpack.config.js` znajdziemy minimalną, niezbędną konfigurację webpacka dla uruchomienia lokalnego serwera, a w pliku `.babelrc` mamy ustawienia związane z Babelem – narzędziem, które transpiluje kod. 


### JSON Server – przypomnienie

> Jeśli robiłeś co najmniej poprzedni projekt kalendarza, tj. **React Calendar**, to poniższe czynności zapewne już wykonałeś.

Dane są przechowywane w pliku `data.json` i pobierane za pomocą lokalnego API z wykorzystaniem [JSON Servera](https://github.com/typicode/json-server).

Zainstalujemy go dzięki [npm](https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)), więc musimy mieć zainstalowany [Node.js](https://nodejs.org) w wersji co najmniej 10.16.

Jeśli nie jesteś pewny, jaką wersję posiadasz, to możesz to sprawdzić za pomocą flagi `-v`, tj. `node -v`.

Paczka  `json-server`  powinna być zainstalowana globalnie, dlatego warto mieć uprawnienia administratora (sudo na Linuksie), aby móc to zrobić.

W terminalu wpisz komendę:

```
npm install -g json-server@0.17
```

Po instalacji powinieneś mieć dostęp do informacji o zainstalowanej wersji: 

```
json-server -v
```

Jeśli masz już uruchomionego webpacka (`npm start`), to w kolejnym terminalu (wierszu poleceń) uruchom API:

```
json-server --watch ./db/data.json --port 3005
```

Ustawiamy inny port niż domyślny (3000), aby być pewnym, że nic go nie blokuje.

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/meetings
```

> **Uwaga!** Jeśli API ma działać, json-server zawsze musi być uruchomiony. 

## Implementacja

### Magazyn + Reducer

W pierwszej kolejności utworzymy Magazyn (Store). Musimy się zastanowić, w którym miejscu to zrobić.

Nasz `state` jest w `<Calendar/>`, jednak jest on stanem tylko dla tego komponentu. Równie dobrze moglibyśmy przenieść stan do pliku `index.js` i tam przekazywać go z rodzica do dziecka, aż do `<Calendar/>`.

Nie będziemy tego robić, ale Magazyn utworzymy właśnie w `index.js`, ponieważ będzie to stan całej aplikacji.

W lokalizacji `./src/reducers/index.js` tworzymy również Reducer, który będzie zwracał na razie jedynie stan początkowy – obiekt z właściwością `meetings`:

```javascript
{
    meetings: [],
}
```

To również dobry moment, aby za pomocą `<Provider/>` przekazać do pozostałych komponentów nasz Store.


### Action + Reducer

Zastanówmy się teraz, jakie akcje mamy w naszym `<Calendar/>`. Należy spojrzeć na to w taki sposób: jakie mamy czynności, które operują na `state` w `<Calendar/>`?

Pewnie będzie to wczytanie wszystkich danych z API oraz dodanie nowego elementu przez formularz. Dlatego zdefiniujmy sobie dwie akcje:

* loadMeetingsAction
* saveMeetingAction

Obie akcje zdefiniujmy w pliku `./src/actions/calendar.js`. Zauważmy również, że muszą one nieść ze sobą ładunek w postaci danych, które mają zostać dodane do naszego Magazynu.

W przypadku `loadMeetingsAction` ładunkiem będą dane pobrane z API. Natomiast dla `saveMeetingAction` będzie to obiekt przechowujący dane o nowym spotkaniu.

Kiedy mamy już zdefiniowane (i wyeksportowane) Akcje, powinniśmy zmodyfikować Reducera – tak aby te akcje obsługiwał. Należy pamiętać o tworzeniu kopii dla `state`!

### connect()

Nadszedł czas na połącznie Magazynu z komponentem `<Calendar/>`, ponieważ to w nim są czynności (czyli Akcje), które operują na stanie aplikacji.

Importujemy `connect()` i wskazujemy przez mapowanie, jakie Stany i Akcje nas interesują w `<Calendar/>`.
Na pewno potrzebujemy listy spotkań (`meetings`) i obu Akcji, które musimy zaimportować.

Nasze połącznie powinno wyglądać mniej więcej tak:

```javascript
export default connect(mapStateToProps, mapActionToProps)(Calendar);
```

Jeśli wszystko wykonaliśmy prawidłowo, to od teraz nie musimy już korzystać ze `state` w `<Calendar/>`. Wystarczy, że będziemy przekazywać `this.props.meetings` do `<CalendarList />`.

### `state` w `<CalendarForm/>`

Używanie Reduxa nie wyklucza korzystania z reactowego `state`. Jeśli potrzebujemy stanu lokalnego (w szczególności gdy tworzymy komponenty kontrolowane), to nic nie stoi na przeszkodzie, aby go używać.


### Redux DevTools

Spróbuj teraz podłączyć Magazyn do wtyczki Redux DevTools i zobacz, jak się ona zachowuje w czasie pracy naszej aplikacji.

## Usprawnij swój kod

Wykonaj refaktoryzację kodu, np. zapytania do API wrzuć do osobnego pliku w katalogu `providers`.

Być może będziesz chciał podzielić komponenty na mniejsze lub wykorzystać hooki, tworząc komponenty funkcyjne. 

Dzięki implementacji Reduxa możesz też przenieść logikę działania aplikacji do poszczególnych komponentów (w `<CalendarList>` pobieranie danych z API, a w `<CalendarForm>` dodawanie danych do API), co pozwoli odchudzić komponent `<Calendar>` i zwiększyć jego czytelność.

Przygotuj kod w taki sposób, jakby projekt ten miał zdecydować o Twoim przyjęciu do pracy.

## Dodaj odpowiedni wygląd

Dla formularza możesz wykorzystać np. komponenty z poprzedniego projektu „Neumorfizm” (`task-react-styling`).

W takim przypadku przy przenoszeniu kodu do innego projektu zwróć uwagę na elementy problematyczne. Ta wiedza powinna przydać Ci się podczas tworzenia następnych rozwiązań.


&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
