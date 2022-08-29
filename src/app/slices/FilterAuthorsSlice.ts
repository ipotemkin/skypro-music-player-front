import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterItem, ITrack } from '../../models';
import { RootState } from '../store';

export interface IFilterSlice {
  field: FieldNames;
  filter: IFilter;
}

export interface IFilter {
  author: IFilterItem[];
  release_date: IFilterItem[];
  genre: IFilterItem[];
}

export interface IFilterMark {
  field: FieldNames;
  value: string;
}

export const initialState: IFilterSlice = {
  field: 'author',
  filter: {
    author: [],
    release_date: [],
    genre: [],  
  }
}

export type FieldNames = 'author' | 'genre' | 'release_date';

// возвращает первоначальное значение фильтра из data по заданному полю
const getFilterDataByField = (data: ITrack[], field: FieldNames) => {
  
  if (field === 'release_date') {
    const yearList = data.map((item: ITrack) => (item.release_date ? +item.release_date.split('-')[0] : 0));
    const orderedList = Array.from(new Set(yearList)).filter(item => item !== 0).sort((a, b) => (b! - a!));
    return orderedList.map(item => ({ value: String(item), selected: false }));
  }
  
  const tempList = data.map((item: ITrack) => (item[field]!)).filter(item => item !== '-');
  const orderedList = Array.from(new Set(tempList)).sort();
  return orderedList.map(item => ({ value: item, selected: false }));
}

// копируем установленные фильтры
const copyFilterSelection = (filterSelection: IFilterItem[], newFilterData: IFilterItem[]) => {
  for (let oldItem of filterSelection) {
    if (oldItem.selected) {
      const res = newFilterData.find((newItem: IFilterItem) => newItem.value === oldItem.value);
      if (res) res.selected = oldItem.selected;
    }
  }
  return newFilterData;
}

const updateFilterByField = (state: IFilter, payload: ITrack[], field: FieldNames) => {
  const dataSet = getFilterDataByField(payload, field);
  state[field] = [...copyFilterSelection(state[field], dataSet)];
}

const setFilter = (state: IFilter, payload: IFilterMark, selected: boolean = true) => {
  const { field, value } = payload;
  const update_item = state[field].find((el: IFilterItem) => el.value === value);
  if (update_item) update_item.selected = selected;
}

const toggleFilterFunc = (state: IFilter, payload: IFilterMark) => {
  const { field, value } = payload;
  const update_item = state[field].find((el: IFilterItem) => el.value === value);
  if (update_item) update_item.selected = !update_item.selected;
}


export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilter: (state) => { state = initialState; },
    updateFilter: (state, action: PayloadAction<ITrack[]>) => {
      let field: FieldNames = 'author';
      for (field in state.filter) updateFilterByField(state.filter, action.payload, field);
    },
    markFilter: (state, action: PayloadAction<IFilterMark>) => setFilter(state.filter, action.payload),
    unmarkFilter: (state, action: PayloadAction<IFilterMark>) => setFilter(state.filter, action.payload, false),
    toggleFilter: (state, action: PayloadAction<IFilterMark>) => toggleFilterFunc(state.filter, action.payload),
    setFilterField: (state, action: PayloadAction<FieldNames>) => { state.field = action.payload; },
  }
});

export const { clearFilter, updateFilter, toggleFilter, setFilterField } = filterSlice.actions;

export const selectFilterByField = (state: RootState, field: FieldNames) => state.filter.filter[field];

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
