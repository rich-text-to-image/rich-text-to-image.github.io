$("#text2json").click(function () { text2json() });

function text2json() {
    var jsonString = JSON.stringify(quill.getContents(), null, 2)
    var jsonContainer = document.getElementById("json-container");
    jsonContainer.textContent = jsonString;
};
