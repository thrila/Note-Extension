let myLeads = [];
const inputElement = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-l");
const deleteBtn = document.getElementById("input-btn1");
const tabBtn = document.getElementById("input-btn0");

// const tabs = [{ url: "www.github.com/thrila" }];

const renderLeads = (leads) => {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    listItems += `<li>  <a href=${leads[i]} target='_blank'>${leads[i]}</a>  </li>`;
  }
  ulEl.innerHTML = listItems;
};

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
} else {
  console.log("falsy");
}

//pushes input from field to array
inputBtn.addEventListener("click", function () {
  myLeads.push(inputElement.value);
  console.log(myLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  renderLeads(myLeads);
  inputElement.value = "";
  console.log(localStorage.getItem("myLeads"));
});

deleteBtn.addEventListener("click", (event) => {
  localStorage.clear(leadsFromLocalStorage);
  myLeads = [];
  renderLeads(myLeads);
});

tabBtn.addEventListener("click", (event) => {
  // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

  // });
  chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});
