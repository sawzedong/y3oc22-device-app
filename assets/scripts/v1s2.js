let currStage = 0;
let timeouts = []
const textToType = "Planet Earth has met its doom.\n\nI stood there, and watched as huge orange flames engulfed every corner of the planet. This was the end, I thought. Indeed, it was. Not long after, I fainted. I can’t remember what happened after that, but when I woke up, I was in a completely unfamiliar environment.";
let error = false

let allowedFullAnimation = false

let skipAnimationError = true // this should be true for prod, false for dev
let skipFullTextError = true // this should be true for prod, false for dev

let completedFullRun = false

prevIncrement = -1
currWidth = 0
firstRun = true

function throwError(e, ecode) {
    $('.cut').addClass('d-none')
    $('#errormessage').removeClass('d-none')
    error = true
    $('#ecode').text(ecode)
    $('#edesc').text(e)
    throw e
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function changeScene() {
    if (currStage != 4 && !(currStage == 3 && !allowedFullAnimation && skipAnimationError) && !error) {
        if (currStage == 0) {
            $('#body').removeClass('vh-200');
        }
        currScene = "#cut" + currStage;
        nextStage = currStage + 1;
        nextScene = "#cut" + nextStage;
        $(currScene).addClass('d-none')
        $(nextScene).removeClass('d-none')
        if(currStage == 1) {
            $('#body').removeClass('gray-background')
        }
        if (currStage == 2) {
            $('#body').addClass('gray-background')
            $('#cut3').addClass('magictime puffIn');
            setTimeout(function(){
                $('#cut3').addClass('magictime puffOut');
            }, 2500);
            setTimeout(function(){
                $('#cut3').addClass('d-none');
                allowedFullAnimation = true;
                changeScene()
            }, 3550);
        } 
        currStage += 1;
    } else if (currStage == 3 && !allowedFullAnimation && skipAnimationError) {
        throwError('Clicked to next screen before animation finished', 400)
    }
        
}
function changeProgressBar(id) {
    // id with a hash in front 
    setInterval(() => {
        rng = Math.random()
        if (currWidth >= 100 && firstRun && !completedFullRun) {
            $(window).on("click", function() {
                if(firstRun) {
                    $(id).attr('aria-valuenow', 0).css('width', 0+'%');
                    setTimeout(function() {
                        currWidth = 0;
                        k = 0;
                        prevIncrement = -1;
                        firstRun = false;
                        // clearInterval(newInterval)
                    }, 500)
                }
                
            });
        } else if (currWidth < 100 && !completedFullRun) {
            if (prevIncrement === -1) {
                k = getRndInteger(2, 5);
                prevIncrement = k;
                currWidth += k;
                $(id).attr('aria-valuenow', currWidth).css('width', currWidth+'%');
            } else if (rng > 0.9) {
                k = getRndInteger(2, 5);
                prevIncrement = k;
                currWidth += k;
                $(id).attr('aria-valuenow', currWidth).css('width', currWidth+'%');
            } else {
                k = prevIncrement
                currWidth += k;
                $(id).attr('aria-valuenow', currWidth).css('width', currWidth+'%');
            }
        }

        if (currWidth >= 100 && !firstRun) {
            completedFullRun = true;
            $('#cut5').addClass('disappear');
            $('#body').addClass('turnOff');
            $('#body').removeClass('gray-background')
            setTimeout(function() {
                $('.cut').addClass('d-none')
            }, 1050)
        }
    }, 100);
}
$("#textarea").on('input',function(e){
    k = e.target.value.length;
    if (k <= textToType.length) {
        e.target.value = textToType.slice(0, k);
    } else {
        e.target.value = textToType;
    }
  });
$(window).on("click", changeScene)
$('#enter').on("click", function() {
    if ($("#textarea").val().length < textToType.length && skipFullTextError) {
        throwError('Submitted text before full text was input', 400)
    } else if ($("#textarea").val().length > textToType.length && skipFullTextError) {
        throwError('Textarea length larger than possible text length', 500)
    } else {
        $('#textarea').addClass('magictime vanishOut')
        $('#enter').addClass('disappear')
        setTimeout(function(){
            $('#cut4').addClass('d-none')
            $('#cut5').removeClass('d-none')
        }, 1050);
        setTimeout(function() {
            changeProgressBar('#realProgBar');
        }, 1550)
        
    }
    
})