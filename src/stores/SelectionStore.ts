// src/stores/SelectionStore.ts
import { makeAutoObservable } from "mobx";

class SelectionStore {
  elements: string[] = Array.from({ length: 300 }, (_, i) => `Element ${i + 1}`);
  selectedElements: string[] = [];
  searchQuery: string = "";
  filterValue: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setFilterValue(value: number) {
    this.filterValue = value;
  }

  addElement(element: string) {
    if (this.selectedElements.length < 3) {
      this.selectedElements.push(element);
    }
  }

  removeElement(element: string) {
    this.selectedElements = this.selectedElements.filter(el => el !== element);
  }

  get filteredElements() {
    return this.elements
      .filter(el => el.includes(this.searchQuery))
      .filter(el => {
        const num = parseInt(el.split(" ")[1]);
        return num > this.filterValue;
      });
  }
}

const selectionStore = new SelectionStore();
export default selectionStore;
