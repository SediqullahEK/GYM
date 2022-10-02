
//$(function () {
//    $("#loaderbody").addClass('hide');

//    $(document).bind('ajaxStart', function () {
//        $("#loaderbody").removeClass('hide');
//    }).bind('ajaxStop', function () {
//        $("#loaderbody").addClass('hide');
//    });


//});

//showInPopup = (url, title) => {
//    $.ajax({
//        type: "GET",
//        url: url,
//        success: function (res) {
//            $("#form-modal .modal-body").html(res);
//            $("#form-modal .modal-title").html(title);
//            $("#form-modal ").modal('show');
//        }
//    })
//}

//jQueryAjaxPost = form => {

//    try {
//        $.ajax({
//            type: "POST",
//            url: form.action,
//            data: new FormData(form),
//            contentType: false,
//            processData: false,
//            success: function (res) {
//                if (res.isValid) {
//                    $("#View-all").html(res);
//                    $("#form-modal .modal-body").html('');
//                    $("#form-modal .modal-title").html('');
//                    $("#form-modal ").modal('hide');
//                //    $.notify('Successfully Added!', { globalPosition: 'top center', className:'sucess' });

//                }
//                else
//                    $("#form-modal .modal-body").html(res.html);

//            },
//            error: function (err) {
//                console.log(err);
//            }
//        })
//    }
//    catch (e) {
//        console.log(e);
//    }


//    //To prevent default form submit
//    return fals;
//}
//jQueryAjaxDelete = form => {
//    if (confirm('Are you sure to DELETE this record permanently?')) {
//        try {
//            $.ajax({
//                type: "POST",
//                url: form.action,
//                data: new FormData(form),
//                contentType: false,
//                processData: false,
//                success: function (res) {

//                    $("#View-all").html(res);
//                 //   $.notify('Successfully Deleted!', { globalPosition: 'top center', className:'success' });

//                },
//                error: function (err) {
//                    console.log(err);
//                }

//            })
//        }
//        catch (e) {
//            console.log(e);
//        }
//    }

//    return false;
//}