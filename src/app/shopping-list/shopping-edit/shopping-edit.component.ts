import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode = false;
  editedIndex: number;
  deletedIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe((index: number) => { this.editedIndex = index; this.editMode = true; this.editedItem = this.slService.getIngredient(index); this.slForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount }) });
    this.slService.startedDeleting.subscribe((index: number) => { this.deletedIndex = index; });
  }

  onAdd(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode)
      this.slService.updateIngredient(this.editedIndex, newIngredient);
    else
      this.slService.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.deletedIndex);
    this.onClear();
  }
}
