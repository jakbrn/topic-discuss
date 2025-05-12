# TopicDiscuss

### Czym jest projekt?

**TopicDiscuss** to platforma forum dyskusyjnego zbudowana przy użyciu **Next.js** i **PayloadCMS**, która umożliwia użytkownikom odkrywanie interesujących ich tematów i angażowanie się w wartościowe rozmowy ze społecznością. Aplikacja pozwala użytkownikom przeglądać tematy, uczestniczyć w dyskusjach oraz tworzyć własne wątki konwersacji. (interfejs wykonany przez [v0](https://v0.dev/))

### Funkcjonalności:

- Uwierzytelnianie użytkowników (rejestracja i logowanie)
- Przeglądanie i tworzenie tematów
- Komunikację w czasie rzeczywistym między użytkownikami na temat konkretnych tematów

### Zrealizowane wymagania projektowe:

- skrócony opis projektu
- system autentykacji i użytkowników (model użytkownicy, logowanie, rejestracja itd.)
- co najmniej dwie dodatkowe domeny danych poza użytkownikami (np. posty i grupy w przypadku serwisu społecznościowego)
- crudowe endpointy do obsługi modeli danych oraz wszystkie wymagane do realizowania logiki projektu

### Niezrealizowane wymagania (na ten moment):

- skrócona dokumentacja (głównie do czego służy projekt i jak korzystać z jego API)
- zawarta obsługa websocketów w projekcie, realizująca jakąś logikę w projekcie (np. czat, powiadomienia itd.)
- konteneryzacja aplikacji (produkcyjna)

# Jak odpalić?

<sub>Z dedykacją dla jurorów codecamp 2025 :)</sup>

### Development

1. Najpierw sklonuj repozytorium, jeśli jeszcze tego nie zrobiłeś
2. Wykonaj `cd topic-discuss && cp .env.example .env`, aby skopiować przykładowe zmienne środowiskowe. Musisz dodać `MONGODB_URI` z adresem swojej bazy danych
3. Wykonaj `pnpm install && pnpm dev`, aby zainstalować zależności i uruchomić serwer deweloperski
4. Otwórz `http://localhost:3000`, aby uruchomić aplikację w przeglądarce

### Development (Docker)

1. Zmień `MONGODB_URI` w swoim pliku `.env` na `mongodb://mongo/topic-discuss`
2. Uruchom `docker compose up`, aby uruchomić bazę danych i aplikację, opcjonalnie dodaj `-d`, aby uruchomić w tle.
