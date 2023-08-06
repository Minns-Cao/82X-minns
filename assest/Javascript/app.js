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
let limitItem = 1;
let limitPageShow = 5;
let list_pagination = document.querySelectorAll(".pagination .item");
let allPage = Math.ceil(list_pagination.length / limitItem);

function loadItem() {
    let beginItem = limitItem * (thisPage - 1);
    let endItem = limitItem * thisPage - 1;
    list_pagination.forEach((item, key) => {
        if (key >= beginItem && key <= endItem) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
    listPage();
}

function listPage() {
    let listPageElm = document.querySelector(".listPage");
    listPageElm.innerHTML = `
    <div class="btnPrev" onclick="changePage(i-1)">
        <img src="./assest/img/product_img/sanPham_prev.svg" alt="" class="icon">
    </div>
    <div class="btnNext" onclick="changePage(i+1)">
        <img src="./assest/img/product_img/sanPham_next.svg" alt="" class="icon">
    </div>`;
    if (thisPage !== allPage) {
        listPageElm.insertAdjacentHTML("afterbegin", `<p>...</p>`);
    } else {
        listPageElm.insertAdjacentHTML("afterbegin", `<p>&nbsp;&nbsp;&nbsp;</p>`);
    }

    let countPage = 1;
    for (let i = allPage; i > 0; i--) {
        let newPage = document.createElement("div");
        newPage.textContent = i;
        newPage.setAttribute("onclick", `changePage(${i})`);
        if (i === thisPage) {
            newPage.classList.add("active");
        }
        if (thisPage <= Math.floor(limitPageShow / 2) && i <= limitPageShow) {
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
    let next = document.querySelector(".listPage .btnNext");
    next.setAttribute("onclick", `changePage(${thisPage + 1})`);
    let prev = document.querySelector(".listPage .btnPrev");
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
    loadItem();
}
loadItem();
