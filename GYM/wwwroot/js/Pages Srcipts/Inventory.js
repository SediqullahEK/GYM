
    function f() {
        return confirm("Are you sure to delete this record permanently???");
        id 
    }
// Show Items
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
                     "<td><a onclick='DeleteItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); text - decoration: none; cursor: pointer; ' > <i class='fa fa-trash '></i></a ><a onclick='EditItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); cursor:pointer; text - decoration: none;' class='btn-edit ml-3 ' > <i class='fa fa-edit '></i></a > </td > " +
                      +
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
        debugger;
        var url = $(this).data('url');
        $.get(url).done(function (data) {
            PlaceHolderitem.html(data);
            PlaceHolderitem.find('.modal').modal('show');

        })
    });
});


    //Post for Save 
$("#btnSave").click(function (a) {
    debugger;
    a.preventDefault();
    var Barcode = $("#Barcode").val();
    var Name = $("#Name").val();
    var UnitPrice = $("#UnitPrice").val();
    var Quantity = $("#Quantity").val();
    var Currency = $("#Currency").val();
    var Category = $("#Category").val();
    var Image = $("#ImageFile").val();
    
    
    alert(Image);
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
    }
    if (flag) {


        var jsonData = {
            Barcode: Barcode,
            Name: Name,
            UnitPrice: UnitPrice,
            Quantity: Quantity,
            Currency: Currency,
            Category: Category,
            Image: Image,
        
          
        };


        $.ajax({
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            url: "/Inventory/AddToStock",
            data: JSON.stringify(jsonData),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                alert("Insertion Successful!");
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

    });


    //Edit Button cLicked
//("#tableBody").on('click', 'a.btn-edit',
function EditItem(ID) {
       
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
                $('#editModal #uId').val(Item.id);

                $('#editModal').modal();
            }
        })

    };

    //Post for Update
    $("#updateBtn").click(function (a){


        var Barcode = $("#uBarcode").val();
        var Id = $("#uId").val();
        var Name = $("#uName").val();
        var UnitPrice = $("#uUnitPrice").val();
        var Quantity = $("#uQuantity").val();
        var Currency = $("#uCurrency").val();
        var Category = $("#uCategory").val();

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
        }
        if (flag) {


            var jsonData = {
                Barcode: Barcode,
                Name: Name,
                UnitPrice: UnitPrice,
                Quantity: Quantity,
                Currency: Currency,
                Category: Category,
                ID: Id


            };


            $.ajax({
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                url: "/Inventory/EditItem",
                data: JSON.stringify(jsonData),
                dataType: "json",
                contentType: "application/json",

                success: function () {

                    alert(" Successfully Updated!");
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

    });

    //Get for Delete
   function DeleteItem (ID){
 
        if (confirm("Are you Sure to delete this record?"))
        {

            $.ajax({
                type: "GET",
                url: '/Inventory/DeleteItem?ID=' + ID,
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