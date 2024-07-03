import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CocktailServiceService} from '../../shared/services/cocktail-service.service';
import {debounceTime, merge, Observable, Subject, switchMap} from 'rxjs';
import {Cocktail} from '../../shared/models/cocktail';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {HighlightTextPipe} from '../../shared/pipes/highlight-text.pipe';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    HighlightTextPipe
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent{
  get textInput() : string{
    return this.inputControl.value;
  }

  @Input()
  placeholder : string = 'Search'
  filteredInput$: Observable<Cocktail[]> = null!;
  inputControl: FormControl;

  internalInputs = new Subject<Cocktail[]>()

  @Output()
  selected = new EventEmitter<Cocktail>;

  constructor(private cocktailService : CocktailServiceService) {

    this.inputControl = new FormControl('')
    const internalInputs$ = this.internalInputs.asObservable()
    const inputChanges$ =this.inputControl.valueChanges.pipe(debounceTime(300),
      switchMap(e => this.cocktailService.searchCocktail(e)));
    this.filteredInput$ = merge(internalInputs$,inputChanges$)
  }

  inputSelected(i : Cocktail) {
    this.inputControl.setValue(i.strDrink, {emitEvent:false})
    this.internalInputs.next([])
    this.selected.emit(i)
  }

  moveFocus(e: any, item: Cocktail) {
    switch(e.key){
      case "Enter":
        this.inputSelected(item)
        break
    }

  }
}
