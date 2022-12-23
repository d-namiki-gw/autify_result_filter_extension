window.onload = function () {
    const filterResult = () => {
        const sec = document.getElementById("result-fillter-input").value;
        if (Number.isInteger(sec)) { return; }
        Array.from(document.getElementsByClassName("d-none"))
            .forEach(v => v.classList.remove("d-none"));
        Array.from(document.getElementsByClassName("scenario-step"))
            .filter(v => (Number)(v.getElementsByClassName("scenario-step-time")[0].innerText.replace("秒", "")) < sec)
            .forEach(v => v.classList.add("d-none"));
    };

    const appendElem = () => {
        const span = document.createElement("span");
        span.appendChild(document.createTextNode("秒数でフィルタリング"));
        const span2 = document.createElement("span");
        span2.appendChild(document.createTextNode("秒以上"));

        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("name", "filter");
        input.setAttribute("id", "result-fillter-input");
        input.setAttribute("value", 0);
        input.onchange = filterResult;

        const div = document.createElement("div");
        div.style.cssText = "position: absolute;right: 0;margin-right: 50px;";

        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(span2);

        const targetElem = document.getElementsByClassName("result-meta-list")[0]
        targetElem.parentElement.insertBefore(div, targetElem.nextSibling)
    };

    const appendElemByTargetElem = (retryCount = 0) => {
        const elem = document.getElementsByClassName("result-meta-list")[0];
        if (!elem) {
            if (retryCount > 10) {
                console.log("要素が見つかりませんでした");
                return;
            }
            setTimeout(() => {
                appendElemByTargetElem(retryCount + 1);
            }, 500);
            return;
        }
        appendElem();
    };
    appendElemByTargetElem();
};
