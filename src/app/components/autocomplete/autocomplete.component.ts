import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CocktailServiceService} from '../../shared/services/cocktail-service.service';
import {debounce, debounceTime, fromEvent, Observable, switchMap, tap} from 'rxjs';
import {Cocktail} from '../../shared/models/cocktail';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements AfterViewInit{

  @Input()
  placeholder : string = 'Search'

  @ViewChild('autocompleteInput')
  input: ElementRef = null!
  filteredInput$: Observable<Cocktail[]> = null!;
  inputValue: string = '';


  constructor(private cocktailService : CocktailServiceService) {
  }

  ngAfterViewInit(): void {
        this.filteredInput$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
          tap(e => console.log((e as any).target.value)),
          debounceTime(300),
          switchMap(e => this.cocktailService.searchCocktail((e as any).target.value))
        )

    this.filteredInput$.subscribe(cocktail =>  {
      console.log(cocktail)
      if(cocktail)
        console.log("DrinkName",cocktail.map(c => c.strDrink))
    })
    }


}
