

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
 
  updateExchangeRate();
};
const updateFlagonly = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
 
  // updateExchangeRate();
};
const changepalce=()=>{
  const currfrom=document.getElementById('currfrom').value;
  const currto=document.getElementById('currto').value;
 
  const currfromchange= document.getElementById('currfrom');
  currfromchange.value=currto;
 const currtoplace= document.getElementById('currto');
 currtoplace.value=currfrom;
 updateFlag(currfromchange);
 updateFlagonly(currtoplace);
  
  // for (let select of dropdowns) {
  //   select.addEventListener("change", (evt) => {
  //     updateFlag(evt.target);
  //   });
  // }
};

const updateExchangeRate = async () => {

  let amount = document.querySelector(".fromamount input");
  const currfrom=document.getElementById('currfrom').value;
  const currto=document.getElementById('currto').value;
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 0;
    amount.value = "";
  }
  

  // const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?base=${currfrom}`;
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': '1f9cac2f68msh65bf00f464a306cp1cbca5jsnfa6a9098efa5',
  //     'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
  //   }
  // };

  const url=`https://api.exconvert.com/convert?from=${currfrom}&to=${currto}&amount=11.5&access_key=e09e1a16-df74b4ab-7ed7e1f3-7d65b18d`;

  try {
    // const response = await fetch(url, options);
    const response=await fetch(url);
    const result = await response.json();
    // console.log(result);
    console.log(result.result.rate);
    const rate=result.result.rate.toFixed(3);
    // const rate=5;
  
    const pricefrom=document.getElementById('pricefrom').innerHTML=1;
    const priceto=document.getElementById('priceto').innerHTML=rate;
 
    let finalAmount = (amtVal * rate).toFixed(3);
    if(finalAmount==0){
    const inputresult = document.getElementById('currresult').value = ``;}
    else{
      const inputresult = document.getElementById('currresult').value = `${finalAmount}`;}
    } 
  catch (error) {
    console.error(error);
  }

};



window.addEventListener("load", () => {
  updateExchangeRate();
});

// document.getElementById('currinput').addEventListener('keydown',  (event)=>{
//       keypress(event);
// });
// document.getElementById("currinput").addEventListener("input", updateExchangeRate());

// document.getElementById('currresult').addEventListener('keydown',(event)=>{
//   keypress(event);
// });
const keypress = (event) => {
  // console.log("present keypress");

  if (
    event.key === 'Backspace' || 
    event.key === 'Delete' || 
    event.key === 'Tab' || 
    event.key === 'Escape' || 
    event.key === 'Enter' || 
    event.key === '.' 
  ) {
    // Allow only one period (dot)
    if (event.key === '.' && this.value.includes('.')) {
      event.preventDefault();
    }
    return;
  }

  // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if (
    (event.ctrlKey === true || event.metaKey === true) &&
    (event.key === 'a' || event.key === 'c' || event.key === 'v' || event.key === 'x')
  ) {
    return;
  }

  // Ensure that it is a number and stop the keypress if not
  if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
    event.preventDefault();
  }
};

