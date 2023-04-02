 // Write all JS here
 let arr2 = JSON.parse(localStorage.getItem("visited"));
 if (arr2 === null) {
   arr2 = [];
 }
 const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`;
 let tbody = document.querySelector("tbody");
 let arr = [];
 movieName();
 async function movieName() {
   try {
     let request = await fetch(url);
     let data = await request.json();
     console.log(data);
     arr = data.data;
     console.log(arr);
     display(arr);
   } catch (error) {
     console.log(error);
   }
 }
 function display(data) {
   tbody.innerHTML = null;
   data.forEach((element, index) => {
     let tr = document.createElement("tr");
     let td1 = document.createElement("td");
     td1.innerText = element.id;
     let td2 = document.createElement("td");
     td2.innerText = element.country;
     let td3 = document.createElement("td");
     td3.innerText = element.Rank;
     let td4 = document.createElement("td");
     td4.innerText = element.population;
     let td5 = document.createElement("button");
     td5.innerText = "Visit";
     td5.addEventListener("click", () => {
       arr2.push(arr[index]);
       localStorage.setItem("visited", JSON.stringify(arr2));
     });
     tr.append(td1, td2, td3, td4, td5);
     tbody.append(tr);
   });
 }
 let formInp = document.querySelector("form");

 formInp.addEventListener("submit", (e) => {
   e.preventDefault();
   let input = document.getElementById("search").value;
   let filtered = arr.filter((ele) => {
     if (ele.country.toUpperCase().includes(input.toUpperCase()) === true) {
       return true;
     } else {
       return false;
     }
   });
   display(filtered);
 });
 let select = document.getElementById("sort");
 select.addEventListener("change", () => {
   if (select.value == "") {
     display(arr);
   } else if (select.value == "asc") {
     fetch(
       "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=asc"
     )
       .then((req) => {
         return req.json();
       })
       .then((data) => {
         console.log(data.data);
         display(data.data);
       });
   } else if (select.value == "desc") {
     fetch(
       "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=desc"
     )
       .then((req) => {
         return req.json();
       })
       .then((data) => {
         console.log(data.data);
         display(data.data);
       });
   }
 });