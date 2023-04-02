    // Write All JS Here
    let arr = JSON.parse(localStorage.getItem("visited"));
    if (arr === null) {
      arr = [];
    }
    let tbody = document.querySelector("tbody");
    let totalSpan = document.querySelector("#visited-total");
    display(arr);
    countVisited(arr);
  
    function display(data) {
      tbody.innerHTML = null;
      data.forEach((element, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
  
        let td6 = document.createElement("button");
        td1.innerText = element.id;
        td2.innerText = element.country;
        td3.innerText = element.Rank;
        td4.innerText = element.population;
  
        td6.innerText = "Remove";
        td6.addEventListener("click", () => {
          arr = arr.filter((ele, i) => {
            if (index === i) {
              return false;
            } else {
              return true;
            }
          });
          display(arr);
          countVisited(arr);
          localStorage.setItem("visited", JSON.stringify(arr));
        });
        tr.append(td1, td2, td3, td4, td6);
        tbody.append(tr);
      });
    }
  
    function countVisited(data) {
      totalSpan.innerText = data.length;
    }