import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CocktailServiceService} from '../../shared/services/cocktail-service.service';
import {combineLatestWith, debounceTime, fromEvent, merge, Observable, Subject, switchMap, tap} from 'rxjs';
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

  internalInputs = new Subject<Cocktail[]>()

  @Output()
  selected = new EventEmitter<Cocktail>;

  constructor(private cocktailService : CocktailServiceService) {

    this.inputControl = new FormControl('')
    const internalInputs$ = this.internalInputs.asObservable()
    const inputChanges$ =this.inputControl.valueChanges.pipe(debounceTime(300),
      switchMap(e => this.cocktailService.searchCocktail(e)));
    this.filteredInput$ = merge(internalInputs$,inputChanges$).pipe(
      tap(e => console.log(e)),
    )
  }

  inputSelected(i : Cocktail) {
    this.inputControl.setValue(i.strDrink, {emitEvent:false})
    this.internalInputs.next([])
    this.selected.emit(i)
  }

  moveFocus(e: any, item: Cocktail) {
    console.log("EVENT", e)
    console.log("Item", item)
    switch(e.key){
      case "Enter":
        this.inputSelected(item)
        break
    }

  }
}
