let data = [];
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
  .then(function (response) {
    data = response.data.data;
    init();
  })
  .catch(function (error) {
    alert(error.message);
  })

let showData = [];
const ticketAddForm = document.querySelectorAll(".ticketAddForm input,.ticketAddForm select,.ticketAddForm textarea");
const imgLinkInput = document.querySelector("#imgUrl");
const areaInput = document.querySelector("#area");
const cardList = document.querySelector(".cardlist");
const ticketAddBtn = document.querySelector(".ticketadd-btn");
const dataSearchNum = document.querySelector(".search-count");
const dataFilter = document.querySelector(".filter");

// 新增資料

const dataPush = () => {
  let obj = {};
  let isFormFinish = true;
  ticketAddForm.forEach((item) => {
    if (item.value === "") {
      isFormFinish = false;
    };
    obj.id = data.length;
    obj[item.id] = item.value;
    item.value = "";
  });
  if (!isFormFinish) {
    alert("尚有欄位未填寫");
    return;
  };
  if (obj.rate < 1 || obj.rate > 10) {
    alert("套票星級範圍為1-10");
    return;
  };
  data.push(obj);
  alert("新增成功！")
};

// 資料筆數
const dataSearchCalc = (data) => {
  dataSearchNum.innerHTML = data.length;
};

// 渲染網頁
const renderData = (data) => {
  let str = "";
  data.forEach((item) => {
    str += `<div class="card-wrap"><div class="product-card"><div class="card_img"><img src="${item.imgUrl}" alt="img"><div class="rate-badge">${item.rate}</div></div><div class="area-badge">${item.area}</div><div class="card_text"><h2>${item.name}</h2><p>${item.description}</p><div class="card_price"><p><i class="bi bi-exclamation-circle-fill"></i>剩下最後${item.group}組</p><div class="price-wrap"><p>TWD</p><span class="price-sign">$</span><span class="price">${item.price}</span></div></div></div></div></div>`
  });
  cardList.innerHTML = str;
};

// 資料篩選
dataFilter.addEventListener("change", (e) => {
  if (e.target.value === "全部地區") {
    renderData(data);
    dataSearchCalc(data);
    return;
  }
  showData = data.filter((item) => item.area === e.target.value);
  renderData(showData);
  dataSearchCalc(showData);
});

// 輸入框初始化
const inputReset = () => {
  imgLinkInput.value = "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80";
  areaInput.value = "請選擇景點地區";
}

// 新增按鈕監聽
ticketAddBtn.addEventListener("click", (e) => {
  dataPush();
  renderData(data);
  inputReset();
});

// 初始化
const init = () => {
  inputReset();
  dataSearchCalc(data);
  renderData(data);
};



