// var SERVER = 'http://' + document.getElementById('server').value;
var noise_index = 0
var OUTPUT_RES = 256

$("#text2json").click(function () { text2json() });

function text2json() {
    var N_SAMPLES = 1
    console.log('Convert text to image')
    console.log('http://' + document.getElementById('server').value)
    var form_data = new FormData();

    form_data.append("text_input", JSON.stringify(quill.getContents()))

    console.log("Submitted", form_data)
    console.log("text_input", JSON.stringify(quill.getContents()))

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = "arraybuffer";
    xhr.open("POST", 'http://' + document.getElementById('server').value + '/text2json', true);
    xhr.send(form_data)
    var output_image = new Image();

    // var output_video = document.createElement("video");
    var outputRegion = document.getElementById("preview-output-image");

    // https://jsfiddle.net/Jan_Miksovsky/yy7Zs/
    xhr.onload = function (e) {
        var arrayBufferView = new Uint8Array(this.response);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        output_image.src = imageUrl;
    };
    output_image.onload = function () {
        // new_height = SCALE * NROWS * IMAGE_HEIGHT * REG_AVG;
        // new_width = Math.round(N_SAMPLES * IMAGE_HEIGHT) * SCALE;
        // console.log(new_height)
        // console.log(new_width)
        // context.drawImage(output_image, 0, 0, 256, 256);
        console.log(output_image.width, output_image.height)

        var my_table = document.getElementById("my_table");
        my_table.innerHTML = "";
        var row = my_table.insertRow();

        for (let i = 0; i < N_SAMPLES; i++) {
            var canvas_cell = document.createElement('canvas');
            // canvas_cell.onclick = function() { console.log(id); }
            canvas_cell.addEventListener("click", handler, false);
            function handler() {
                context_jspaint.drawImage(this, 0, 0);
                //        current_output = this
                var myContext = current_output.getContext('2d'), rect = {}, drag = false;
                myContext.drawImage(this, 0, 0, current_output.width, current_output.height);
            }
            console.log(i)
            console.log(OUTPUT_RES)
            canvas_cell.id = `canvas_${i}`;
            canvas_cell.width = output_image.width;
            canvas_cell.height = output_image.height;
            context_cell = canvas_cell.getContext('2d'), rect = {}, drag = false;
            var INPUT_RES = output_image.width
            context_cell.drawImage(output_image, INPUT_RES * i, 0, output_image.width, output_image.height,
                0, 0, output_image.width / 2, output_image.height / 2);
            row.appendChild(canvas_cell)
        }
    };

}
