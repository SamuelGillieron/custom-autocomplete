import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {Cocktail} from './shared/models/cocktail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'custom-autocomplete';

  onSelected(event: Cocktail) {
    alert(`You selected ${event.strDrink} `)
  }
}
