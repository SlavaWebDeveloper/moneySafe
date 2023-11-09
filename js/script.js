import { convertStringNumber } from "./convertStringNumber.js";
import { OverlayScrollbars } from "./overlayscrollbars.esm.min.js";

const API__URL = "https://overjoyed-wry-paranthodon.glitch.me/api";

const typesOperation = {
  income: "доход",
  expenses: "расход",
};

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");
const report = document.querySelector(".report");
const financeReport = document.querySelector(".finance__report");
const reportOperationList = document.querySelector(".report__operation-list");
const reportDates = document.querySelector(".report__dates");

let amount = 0;

financeAmount.textContent = amount;

financeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const typeOperation = event.submitter.dataset.typeOperation;

  const changeAmount = Math.abs(convertStringNumber(financeForm.amount.value));

  if (typeOperation === "income") {
    amount += changeAmount;
  }

  if (typeOperation === "expenses") {
    amount -= changeAmount;
  }

  financeAmount.textContent = `${amout.toLocaleString()} ₽`;
});

OverlayScrollbars(report, {});

const getData = async (url) => {
  try {
    const response = await fetch(`${API__URL}${url}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка в получении данных:", error);
    throw error;
  }
};

const closeReport = ({ target }) => {
  if (
    target.closest(".report__close") ||
    (!target.closest(".report") && target !== financeReport)
  ) {
    report.classList.remove("report__open");
    document.removeEventListener("click", closeReport);
  }
};

const openReport = () => {
  report.classList.add("report__open");
  document.addEventListener("click", closeReport);
};

const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

const renderReport = (data) => {
  reportOperationList.textContent = "";

  const reportRows = data.map(
    ({ category, amount, description, date, type }) => {
      const reportRow = document.createElement("tr");
      reportRow.classList.add("report__row");

      reportRow.innerHTML = `
      <td class="report__cell">${category}</td>
      <td class="report__cell">${amount.toLocaleString()}&nbsp;₽</td>
      <td class="report__cell">${description}</td>
      <td class="report__cell">${reformatDate(date)}</td>
      <td class="report__cell">${typesOperation[type]}</td>
      <td class="report__action-cell">
        <button
          class="report__button report__button_table">&#10006;</button>
      </td>
    `;

      return reportRow;
    }
  );

  reportOperationList.append(...reportRows);
};

financeReport.addEventListener("click", async () => {
  openReport();
  const data = await getData("/test");
  renderReport(data);
});

reportDates.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(reportDates));

  const searchParams = new URLSearchParams();

  if (formData.startDate) {
    searchParams.append("startDate", formData.startDate);
  }

  if (formData.endDate) {
    searchParams.append("endDate", formData.endDate);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/test?${queryString}` : "/test";

  const data = await getData(url);
  renderReport(data);
});
