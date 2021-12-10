import { NgOption, SelectionModel } from '@ng-select/ng-select';

export function CustomSelectionFactory() {
  return new CustomSelectionModel();
}

/**
 * Overriding the default
 * https://github.com/ng-select/ng-select/blob/master/src/ng-select/lib/selection-model.ts
 * to only select on apply
 */
export class CustomSelectionModel implements SelectionModel {
  private _selected: NgOption[] = [];

  // public get value(): NgOption[] {
  //   return this._selected;
  // }
  value: NgOption[] = []

  select(
    item: NgOption,
    multiple: boolean,
    selectableGroupAsModel: boolean
  ): void {
    item.selected = true;

    // if (!item.children || (!multiple && selectableGroupAsModel)) {
    //   this._selected.push(item);
    // }

    // if (multiple) {
    //   if (item.parent) {
    //     const childrenCount = item.parent.children.length;
    //     const selectedCount = item.parent.children.filter(
    //       (x) => x.selected
    //     ).length;
    //     item.parent.selected = childrenCount === selectedCount;
    //   } else if (item.children) {
    //     this._setChildrenSelectedState(item.children, true);
    //     this._removeChildren(item);
    //     if (selectableGroupAsModel && this._activeChildren(item)) {
    //       this._selected = [
    //         ...this._selected.filter((x) => x.parent !== item),
    //         item,
    //       ];
    //     } else {
    //       this._selected = [
    //         ...this._selected,
    //         ...item.children.filter((x) => !x.disabled),
    //       ];
    //     }
    //   }
    // }
  }

  unselect(item: NgOption, multiple: boolean) {
    this._selected = this._selected.filter((x) => x !== item);
    item.selected = false;
    if (multiple) {
      if (item.parent && item.parent.selected) {
        const children = item.parent.children;
        this._removeParent(item.parent);
        this._removeChildren(item.parent);
        this._selected.push(
          ...children.filter((x) => x !== item && !x.disabled)
        );
        item.parent.selected = false;
      } else if (item.children) {
        this._setChildrenSelectedState(item.children, false);
        this._removeChildren(item);
      }
    }
  }

  clear(keepDisabled: boolean): void {
    this._selected = keepDisabled
      ? this._selected.filter((x) => x.disabled)
      : [];
  }

  private _setChildrenSelectedState(children: NgOption[], selected: boolean) {
    for (const child of children) {
      if (child.disabled) {
        continue;
      }
      child.selected = selected;
    }
  }

  private _removeChildren(parent: NgOption) {
    this._selected = [
      ...this._selected.filter((x) => x.parent !== parent),
      ...parent.children.filter(
        (x) => x.parent === parent && x.disabled && x.selected
      ),
    ];
  }

  private _removeParent(parent: NgOption) {
    this._selected = this._selected.filter((x) => x !== parent);
  }

  private _activeChildren(item: NgOption): boolean {
    return item.children.every((x) => !x.disabled || x.selected);
  }
}
