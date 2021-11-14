let currStage = 0;
const textToType = "";

$(window).on("click", function() {
    if (currStage == 0) {
        $('#body').removeClass('vh-200');
    }
    currScene = "#cut" + currStage;
    nextStage = currStage + 1;
    nextScene = "#cut" + nextStage;
    $(currScene).addClass('d-none')
    $(nextScene).removeClass('d-none')
    currStage += 1;
})
