import { Component } from '@angular/core';
import {CocktailServiceService} from '../../shared/services/cocktail-service.service';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {

  constructor(private cocktailService : CocktailServiceService) {
    cocktailService.searchCocktail("margarita").subscribe(
      cocktail => {
        console.log(cocktail)
        console.log("DrinkName",cocktail.map(c => c.strDrink))
      }
    )
  }
}
