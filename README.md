# CustomAutocomplete

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Task

Build a search input field with a typeahead dropdown showing suggestions for names of cocktails. As soon as
the user starts to type, suggestions start to appear in a dropdown.

The challenge is composed of the following components:
- Input field: Where the user searches for a cocktails
- Result list: Suggestions for cocktails based on user input
- Suggestion: A single cocktail suggestion in the result list
- Selected suggestion: A single cocktail suggestion highlighted. Only one suggestion can be selected at
  any given time, the default suggestion is the first in the list

The search field should be accessible to keyboard-only users as well and feature the following key bindings:
- Arrow down : Select next suggestion
- Arrow up : Select previous suggestion
- Enter or click: Show the product image fullscreen (redirect to image URL; in a real application this
  would display the cocktail recipe page, but that page is not part of the challenge)

The cocktail recipe API is publicly available at https://www.thecocktaildb.com/api.php. A sample request could
look like this:
www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

The challenge is timed to maximum 3 hours

## Build

### Pre-requisite

* Node.js 20
* Angular 17

```shell
npm install
ng start
```
