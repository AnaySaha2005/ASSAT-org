function change(value) {
    $('#but1').text(value);
    $('#in1').removeClass('dis');
    $('#but2').removeClass('dis');

}

$(document).ready(function () {
    $('#but2').click(function (e) {
        $.ajax({
            type: "post",
            url: "/check",
            data: $('#in1').val()
        });

    });
});