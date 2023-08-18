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
