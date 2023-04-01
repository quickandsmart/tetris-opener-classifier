Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let formData = new FormData();
        formData.append("file", file);
        var url = "http://127.0.0.1:5000/predict";
    
        $.post({
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, status) {
                console.log(data);
                if (!data || data.length == 0) {
                    $("#resultHolder").hide();
                    $("#divClassTable").hide();
                    $("#error").show();
                    return;
                }
                console.log(data.class_dictionary)
                let match = data;
                let bestScore = Math.max(...data.class_probability);
                if (match) {
                    $("#error").hide();
                    $("#resultHolder").show();
                    $("#divClassTable").show();
                    $("#resultHolder").html($(`[data-opener="${match.class}"`).html());
                    let classDictionary = match.class_dictionary;
                    for (let index in classDictionary) {
                        let probabilityScore = match.class_probability[index];
                        let elementName = "#score_" + classDictionary[index];
                        $(elementName).html(probabilityScore + '%');
                    }
                }
            }
        });
    });
    

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});