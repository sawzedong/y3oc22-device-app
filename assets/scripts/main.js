$(window).on( "click", function() {
    
    $('#body').removeClass('vh-200');
    $('#initialMessage').addClass('d-none');
    $('#titlewrapper').removeClass('d-none');
    $('#titlewrapper').addClass('magictime puffIn');
    setTimeout(function(){
        $('#titlewrapper').addClass('magictime puffOut');
    }, 2500);
    setTimeout(function() {
        $('#titlewrapper').addClass('d-none')
        $('#scenewrapper').removeClass('d-none')
    }, 3550)
})

$('#v1s2link').on("click", function() {
    window.location.href = "./v1s2.html";
})

$('#v8s1link').on("click", function() {
    window.location.href = "./v8s1.html";
})
