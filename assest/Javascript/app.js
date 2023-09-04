// product Page
let product_filter = document.querySelectorAll(".sanPham .filter");
if (product_filter) {
    product_filter.forEach((elm) => {
        elm.onclick = () => {
            product_filter.forEach((elm) => {
                elm.classList.remove("active");
            });
            elm.classList.add("active");
        };
    });
}

//Pagination
let thisPage = 1;
let limitItem = 9;
let limitPageShow = 5;
let nuocUongList = document.querySelector(".nuocUongList");
if (nuocUongList) {
    let allPage = Math.ceil(
        nuocUongList.querySelectorAll(".item").length / limitItem
    );

    function loadItem(mainPagigation, limitItem) {
        let list_pagination = mainPagigation.querySelectorAll(".item");
        let beginItem = limitItem * (thisPage - 1);
        let endItem = limitItem * thisPage - 1;
        list_pagination.forEach((item, key) => {
            if (key >= beginItem && key <= endItem) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
        listPage(nuocUongList, limitPageShow);
    }

    function listPage(mainPagigation, limitPageShow) {
        let parentNode = mainPagigation.parentNode;
        let listPageElm = parentNode.querySelector(".listPage");
        listPageElm.innerHTML = `
        <div class="btnPrev" >
            <img src="./assest/img/product_img/sanPham_prev.svg" alt="" class="icon">
        </div>
        <div class="btnNext" >
            <img src="./assest/img/product_img/sanPham_next.svg" alt="" class="icon">
        </div>`;
        if (thisPage !== allPage) {
            listPageElm.insertAdjacentHTML("afterbegin", `<p>...</p>`);
        } else {
            listPageElm.insertAdjacentHTML(
                "afterbegin",
                `<p>&nbsp;&nbsp;&nbsp;</p>`
            );
        }

        for (let i = allPage; i > 0; i--) {
            let newPage = document.createElement("div");
            newPage.textContent = i;
            newPage.setAttribute("onclick", `changePage(${i})`);
            if (i === thisPage) {
                newPage.classList.add("active");
            }
            if (
                thisPage <= Math.floor(limitPageShow / 2) &&
                i <= limitPageShow
            ) {
                listPageElm.insertAdjacentElement("afterbegin", newPage);
            } else if (
                thisPage > allPage - Math.floor(limitPageShow / 2) &&
                i > allPage - limitPageShow
            ) {
                listPageElm.insertAdjacentElement("afterbegin", newPage);
            } else if (
                i >= thisPage - Math.floor(limitPageShow / 2) &&
                i <= thisPage + Math.floor(limitPageShow / 2)
            ) {
                listPageElm.insertAdjacentElement("afterbegin", newPage);
            }
        }
        let next = parentNode.querySelector(".listPage .btnNext");
        next.setAttribute("onclick", `changePage(${thisPage + 1})`);
        let prev = parentNode.querySelector(".listPage .btnPrev");
        prev.setAttribute("onclick", `changePage(${thisPage - 1})`);
    }

    function changePage(i) {
        if (i < 1) {
            i = 1;
        }
        if (i > allPage) {
            i = allPage;
        }
        thisPage = i;
        loadItem(nuocUongList, limitItem);
    }

    loadItem(nuocUongList, limitItem);
}

const swiper = new Swiper(".slider", {
    // Optional parameters
    direction: "horizontal",
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
        nextEl: ".next",
        prevEl: ".prev",
    },
});
const swiper2 = new Swiper(".slider2", {
    // Optional parameters
    direction: "horizontal",
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
        nextEl: ".next2",
        prevEl: ".prev2",
    },
});

// =============
var x, i, j, l, ll, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;

    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y =
                        this.parentNode.getElementsByClassName(
                            "same-as-selected"
                        );
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);

// ====login====
let loginBtn = document.querySelector("#loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        //valid here
        localStorage.setItem("login", "true");
    });
}
//=====logOut=====
let logOut = document.querySelector("#logOut");
if (logOut) {
    logOut.addEventListener("click", () => {
        localStorage.setItem("login", "false");
    });
}

if (localStorage.getItem("login") === "true") {
    let loginIcon = document.querySelector("#loginIcon");
    if (loginIcon) {
        loginIcon.removeAttribute("data-bs-toggle");
        loginIcon.removeAttribute("data-bs-target");
    }
    document.body.classList.add("login");
}

// ===========
let urlParam = new URLSearchParams(window.location.search);
let tabs = document.querySelectorAll(".tab");
let tabContents = document.querySelectorAll(".tab-pane");
let fillHeading = document.querySelector("#fillHeading");
let fillDesc = document.querySelector("#fillDesc");

const tabID = urlParam.get("t");

if (tabID) {
    let tabElm = document.querySelector(`#tab-${tabID}`);
    let tabContent = document.querySelector(`#${tabID}`);

    tabs.forEach((elm) => {
        elm.classList.remove("active");
    });
    tabContents.forEach((elm) => {
        elm.classList.remove("active");
        elm.classList.remove("show");
    });
    tabElm.classList.add("active");
    tabContent.classList.add("active");
    tabContent.classList.add("show");
}

function changeContent() {
    tabs.forEach((tab) => {
        if (Array.from(tab.classList).includes("active")) {
            let text =
                tab.textContent.trim() === "Tài khoản"
                    ? `Thông tin ${tab.textContent.trim()}`
                    : tab.textContent.trim();
            fillHeading.textContent = text;
            fillDesc.textContent = text;
        }
    });
}

changeContent();

tabs.forEach((elm) => {
    elm.addEventListener("click", changeContent);
});

// =====Donhang filter
function renderItemGroup() {
    if (!cate) return;
    let itemGroupList = document.querySelectorAll(".itemGroup");
    if (itemGroupList) {
        itemGroupList.forEach((itemGroup) => {
            let cateOfitemGroup = itemGroup.dataset.cate;
            if (cateOfitemGroup !== cate) {
                itemGroup.style.display = "none";
            } else {
                itemGroup.style.display = "block";
            }
        });
    }
}

const cate = urlParam.get("cate");
if (cate) {
    let filter = document.querySelector(`#${cate}`);
    filter.classList.add("active");
    console.log(filter);
    renderItemGroup();
} else {
    let filter = document.querySelector(`#all`);
    if (filter) {
        filter.classList.add("active");
        renderItemGroup();
    }
}

// ======= tinh tien
function tinhTienItem() {
    let itemInCartList = document.querySelectorAll(".itemInCart");
    let totalCost = 0;
    let countTotal = 1;
    itemInCartList.forEach((itemInCart) => {
        let itemPrice_discount = itemInCart.querySelector(
            ".itemPrice_discount"
        );
        let checkBoxItem = itemInCart.querySelector(".checkBoxItem");
        let price = Number(itemPrice_discount.textContent.trim());
        let num = itemInCart.querySelector(".num");
        let amount = Number(num.textContent.trim());
        let costElm = itemInCart.querySelector(".cost");
        stringCost = (price * amount * 1000).toString();
        let count = 1;
        let trueFormatCost = stringCost
            .split("")
            .reverse()
            .map((item, key, array) => {
                if (count === 3) {
                    if (item !== array[array.length - 1]) {
                        item = "." + item;
                    }
                    count = 0;
                }
                count++;
                return item;
            })
            .reverse()
            .join("");
        costElm.textContent = trueFormatCost;
        //Tổng tiền
        if (checkBoxItem.checked) {
            totalCost += price * amount * 1000;
        }
    });
    let trueFormatTotalCost = totalCost
        .toString()
        .split("")
        .reverse()
        .map((item, key, array) => {
            if (countTotal === 3) {
                if (item !== array[array.length - 1]) {
                    item = "." + item;
                }
                countTotal = 0;
            }
            countTotal++;
            return item;
        })
        .reverse()
        .join("");
    let totalCostElm1 = document.querySelector("#totalCost1");
    let totalCostElm2 = document.querySelector("#totalCost2");
    totalCostElm1.textContent = trueFormatTotalCost;
    totalCostElm2.textContent = trueFormatTotalCost;
    console.log(trueFormatTotalCost);
}

tinhTienItem();

function changeAmount(elm) {
    let parentElement = elm.parentNode;
    let num = parentElement.querySelector(".num");
    if (Array.from(elm.classList).includes("increase")) {
        num.textContent = 1 + Number(num.textContent);
    } else {
        num.textContent = -1 + Number(num.textContent);
    }
}
