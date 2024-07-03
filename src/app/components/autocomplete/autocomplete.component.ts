import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CocktailServiceService} from '../../shared/services/cocktail-service.service';
import {debounceTime, fromEvent, Observable, switchMap, tap} from 'rxjs';
import {Cocktail} from '../../shared/models/cocktail';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent{

  @Input()
  placeholder : string = 'Search'
  filteredInput$: Observable<Cocktail[]> = null!;
  inputControl: FormControl;

  @Output()
  selected = new EventEmitter<Cocktail>;


  constructor(private cocktailService : CocktailServiceService) {
    this.inputControl = new FormControl('')
    this.filteredInput$ = this.inputControl.valueChanges.pipe(
      debounceTime(300),
      tap(e => console.log(e)),
      switchMap(e => this.cocktailService.searchCocktail(e))
    )
  }

  inputSelected(i : Cocktail) {
    console.log(i.strDrink)
    this.selected.emit(i)

  }

}
