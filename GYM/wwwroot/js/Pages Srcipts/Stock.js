
   
//Get for Stock Data
function loadData() {
    $.ajax({
        type: "GET",
        url: '/Inventory/GetItems',
        contentType: "application/json",
        success: function (data) {
            let Option = '';
            data.forEach(item => {
                 Option = Option
                    + "<tr >" +
                    "<td>" + item.barcode + " </td>" +
                    "<td>" + item.name + " </td>" +
                    "<td> " + item.unitPrice + "</td >" +
                    "<td>" + item.currency + " </td>" +
                    "<td>" + item.quantity + " </td>" +
                     "<td>" + item.category + " </td>" +
                     
                     "<td><a onclick='DeleteItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); text - decoration: none; cursor: pointer; ' > <i class='fa fa-trash '></i></a ><a onclick='EditItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); cursor:pointer; text - decoration: none;' class='btn-edit ml-3 ' > <i class='fa fa-edit '></i></a > </td > "
                     +
                     +"<td><a>More Info</a> </td>" +
                    "<td> </td > " +
                    + "</tr > ";
            });
            $("#tableBody").html(Option);

        }
    });
}

$(document).ready(function () {

    loadData();

    $('[data-toggle="popover"]').popover();

    var PlaceHolderitem = $('.PlaceHolderHere');
    $('button[data-toggle="Add-modal"]').click(function (event) {
      
        var url = $(this).data('url');
        $.get(url).done(function (data) {
            PlaceHolderitem.html(data);
            PlaceHolderitem.find('.modal').modal('show');

        })
    });
});
//Get for Stock Search
function Search(name) {

    $.ajax({
        type: "GET",
        url: "/Inventory/Search",
        data: { 'Name': name },
        contentType: "application/json",
        success: function (data) {
            let Option = '';
            data.forEach(item => {
                Option = Option
                    + "<tr >" +
                    "<td>" + item.barcode + " </td>" +
                    "<td>" + item.name + " </td>" +
                    "<td> " + item.unitPrice + "</td >" +
                    "<td>" + item.currency + " </td>" +
                    "<td>" + item.quantity + " </td>" +
                    "<td>" + item.category + " </td>" +
                    "<td><a onclick='DeleteItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); text - decoration: none; cursor: pointer; ' > <i class='fa fa-trash '></i></a ><a onclick='EditItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); cursor:pointer; text - decoration: none;' class='btn-edit ml-3 ' > <i class='fa fa-edit '></i></a > </td > " +
                    +
                    "<td> </td > " +
                    + "</tr > ";

            });
          
            $("#tableBody").html(Option);

        }
    });
}
//Post for Stock Save 
$("#btnSave").click(function (a) {
    debugger;
    a.preventDefault();
    var Barcode = $("#Barcode").val();
    var Name = $("#Name").val();
    var UnitPrice = $("#UnitPrice").val();
    var Quantity = $("#Quantity").val();
    var Currency = $("#Currency").val();
    var Category = $("#Category").val();
    var Image = $("#ImageFile").get(0);
    var validImage = $("#ImageFile").val();

    var files = Image.files;

    
  
    var flag = false;
    if (Barcode && Name && UnitPrice && Quantity && Currency && Category) {
        flag = true;

    }

    else {


        if (!Barcode) {
            $('#Barcode').css('border-color', 'red');
        }
        if (!Name) {
            $('#Name').css('border-color', 'red');
        }
        if (!UnitPrice) {
            $('#UnitPrice').css('border-color', 'red');
        }
        if (!Quantity) {
            $('#Quantity').css('border-color', 'red');
        }
        if (Currency == 0) {
            $('#Currency').css('border-color', 'red');
        }
        if (Category == 0) {
            $('#Category').css('border-color', 'red');
        }
        if (!validImage) {
            $('#ImageFile').css('border-color', 'red');
        }
    }

    if (flag) {
        var formData = new FormData();
        formData.append('Barcode', Barcode);
        formData.append('Name', Name);
        formData.append('UnitPrice', UnitPrice);
        formData.append('Quantity', Quantity);
        formData.append('Currency', Currency);
        formData.append('Category', Category);
        formData.append('ImageFile', files[0]);


        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            type: "POST",        
            url: "/Inventory/AddToStock",
            data: formData,
            contentType: false,
            processData: false,
  
            success: function (result) {
                $(".success").html("<div class='alert alert-success' style=' width:200px; height:80px;'><i class='fa fa-check-circle'></i> Successfully Added!</div>");
                loadData();
            },
            error: function () {
                alert("not successfull");
            },
            complete: function () {

                $('.modal').modal('hide');
                $("#Barcode").val("");
                $("#Name").val("");
                $("#UnitPrice").val("");
                $("#Quantity").val("");
                $("#Currency").val(0);
                $("#Category").val(0);


            }
        });

    }
    setInterval(close, 5000);

});



function close() {
    $(".success").html("");
}
//Get for Stock Update 
function EditItem(ID) {
    debugger;
        $.ajax({
            type: "GET",
            url: '/Inventory/GetItem?ID=' + ID,
            contentType: "application/json",

            success: function (Item) {
                $('#editModal #id').val(Item.id);
                $('#editModal #uBarcode').val(Item.barcode);
                $('#editModal #uName').val(Item.name);
                $('#editModal #uUnitPrice').val(Item.unitPrice);
                $('#editModal #uCurrency').val(Item.currency);
                $('#editModal #uCategory').val(Item.category);
                $('#editModal #uQuantity').val(Item.quantity);
               
              
                $('#editModal #targetEditImage').attr('src', '~/ItemsImages/' + Item.image);
                $('#editModal #uId').val(Item.id);
               
                $('#editModal').modal();
            }
        })

    };

//Post for Stock Update
$("#updateBtn").click(function (a){

        debugger;
        var Barcode = $("#uBarcode").val();
        var Id = $("#uId").val();
        var Name = $("#uName").val();
        var UnitPrice = $("#uUnitPrice").val();
        var Quantity = $("#uQuantity").val();
        var Currency = $("#uCurrency").val();
        var Category = $("#uCategory").val();
        var Image = $("#ImageFile").get(0);
        var validImage = $("#ImageFile").val();

        var files = Image.files;
        var flag = false;
        if (Barcode && Name && UnitPrice && Quantity && Currency && Category) {
            flag = true;

        }

        else {


            if (!Barcode) {
                $('#Barcode').css('border-color', 'red');
            }
            if (!Name) {
                $('#Name').css('border-color', 'red');
            }
            if (!UnitPrice) {
                $('#UnitPrice').css('border-color', 'red');
            }
            if (!Quantity) {
                $('#Quantity').css('border-color', 'red');
            }
            if (Currency == null) {
                $('#Currency').css('border-color', 'red');
            }
            if (Category == null) {
                $('#Category').css('border-color', 'red');
            }
            if (!validImage) {
                $('#ImageFile').css('border-color', 'red');
            }
        }
        if (flag) {

            var formData = new FormData();
            formData.append('Barcode', Barcode);
            formData.append('Name', Name);
            formData.append('UnitPrice', UnitPrice);
            formData.append('Quantity', Quantity);
            formData.append('Currency', Currency);
            formData.append('Category', Category);
            formData.append('ID', Id);
            formData.append('ImageFile', files[0]);


            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                type: "POST",
                url: "/Inventory/EditItem",
                data: formData,
                contentType: false,
                processData: false,

                success: function () {

                    $(".success").html("<div class='alert alert-success' style=' width:200px; height:80px;'><i class='fa fa-check-circle'></i> Successfully Updated!</div>");
                    loadData();
                },

                error: function (e) {
                    console.log(e);
                    alert("Not Successfull");
                },
                complete: function (resp) {

                    $('.editModal').modal('hide');
                    $("#uBarcode").val("");
                    $("#uName").val("");
                    $("#uUnitPrice").val("");
                    $("#uQuantity").val("");
                    $("#uCurrency").val(0);
                    $("#uCategory").val(0);

                }
            });
    }
    setInterval(close, 5000);
    });

//Get for Stock Delete
function DeleteItem (ID){
 
        if (confirm("Are you Sure to delete this record?"))
        {

            $.ajax({
                type: "GET",
                url: '/Inventory/DeleteStockItem?ID=' + ID,
                contentType: "application/json",
                success: function () {
                  
                    loadData();
                },
                error: function (e) {
                    Console.log(e);
                    alert("Not Successfull")
                }
            });
       
        }
  

};

function BarcodeCheck(barcode) {
   
    debugger;
    $.ajax({
        type: "Get",
        data: { 'Barcode': barcode },
        url: "/Inventory/GetItemByBarcode",
        success: function (resp) {
            Disable(resp);
        },
        error: function (e) {
            console.log(e);
            alert("Failed!!! plz try again...")
        }

    });
    
}
function Disable(result) {
    debugger;
    if (result != null) {

        $("#Name").attr('disabled', true);
        $("#Name").val(result.name);
        $("#UnitPrice").attr('disabled', true);
        $("#UnitPrice").val(result.unitPrice);
        $("#Currency").attr('disabled', true);
        $("#Currency").val(result.currency);
        $("#Quantity").attr('disabled', true);
        $("#Quantity").val(result.quantity);
        $("#Category").attr('disabled', true);
        $("#Category").val(result.category);
        $("#ImageFile").attr('disabled', true);
        $(".warning").html("<div class='alert alert-warning'><i class='fa fa-exclamation-triangle'></i> Caution: The item is already added with the same barcode; you either edit its quantity in the table  or add them here one by one :))</p></div>")
    }
    else {
        $("#Name").attr('disabled', false);
        $("#UnitPrice").attr('disabled', false);
        $("#Currency").attr('disabled', false);
        $("#Quantity").attr('disabled', false);
        $("#Category").attr('disabled', false);
        $("#ImageFile").attr('disabled', false);
        $("#Name").val('');
        $("#UnitPrice").val('');
        $("#Currency").val(0);
        $("#Quantity").val('');
        $("#Category").val(0);
        $("#ImageFile").val('');
        $(".warning").html("");
    }
  
}