import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// memorize selector
// if input returns new object, then output run
export const selectCategories = createSelector(
  // input
  [selectCategoryReducer],
  // output
  (categoriesSlice) => categoriesSlice.categories
);

// memorize selector
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
