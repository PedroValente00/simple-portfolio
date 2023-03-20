document.querySelector("button").addEventListener("click", function () {
    let task = document.querySelector("#task");
    if (task.value) {
        let theUl = document.querySelector("ul");
        let newLi = document.createElement("li");
        let newSpan = document.createElement("span");
        theUl.appendChild(newLi);
        newLi.appendChild(newSpan);
        newSpan.innerText = task.value;
        task.value = "";
        task.focus();
        let del = document.createElement("img");
        newLi.appendChild(del);
        del.src = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";
        del.classList.add("del");
        deleteParent();
    }
})

function deleteParent() {
    const dels = document.querySelectorAll(".del");
    if (dels) { // = array not empty
        dels.forEach((each) => {
            each.addEventListener("click", function () {
                each.parentElement.remove();
                each.style.backgroundColor = "red"
            })
        })

    }
}