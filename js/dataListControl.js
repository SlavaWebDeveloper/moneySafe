import { getData } from "./service.js";

const categoryList = document.querySelector('#categoryList');

export const dataListControl = async () => {
  categoryList.textContent = '';

  const categories = await getData('/categories');

  const getCategories = (category) => {
    const option = document.createElement('option');
    option.value = category;
    return option; 

  }

  const opionsIncome = categories.income.map(getCategories);
  const optionExpenses = categories.expenses.map(getCategories);

  categoryList.append(...optionExpenses, ...opionsIncome);
}