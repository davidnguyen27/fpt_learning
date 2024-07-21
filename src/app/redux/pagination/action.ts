// actions.ts
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';

interface SetPageAction {
  type: typeof SET_PAGE;
  payload: number;
}

interface SetPageSizeAction {
  type: typeof SET_PAGE_SIZE;
  payload: number;
}

export type PaginationActionTypes = SetPageAction | SetPageSizeAction;

export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  payload: page,
});

export const setPageSize = (pageSize: number): SetPageSizeAction => ({
  type: SET_PAGE_SIZE,
  payload: pageSize,
});
