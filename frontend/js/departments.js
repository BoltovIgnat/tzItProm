$(document).ready(function(){

    var dt = $('#myDepartmentsTable').DataTable({
        "ajax": "http://localhost:8087/departments/all",
        "serverSide": true,
        "dom": '<"toolbar">frtip',
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "parent" },
            { "data": "comment" },
            { "data": "buttons" }
        ]
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8087/departments/allforinput',
        success: function(data){
            console.log(data);
            $(".ibc-select-parent").empty();
            $(".ibc-create-select-parent").empty();
            data.forEach(function(item, i, data) {
                $(".ibc-select-parent").append( '<option value="'+item.id+'" ibc-mark="'+item.mark+'" ibc-number="'+item.numberCar+'">'+item.name+'</option>' );
                $(".ibc-create-select-parent").append( '<option value="'+item.id+'" ibc-mark="'+item.mark+'" ibc-number="'+item.numberCar+'">'+item.name+'</option>' );
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            console.log(thrownError);
        }
    });

    $("div.toolbar").html("<a role='button' class='ibcbtn-create btn btn-success' data-target='#newModal'>Добавить новsq департамент</a>");

    $("body").on("click", ".ibcbtn-edit", function (e) {
        e.preventDefault();

        $('.ibc-hidden-id').val($(this).attr("rowid"));
        $('#editModal').modal('show');
    });

    $("body").on("click", ".ibcbtn-update-department", function (e) {

        let id_job = $('.ibc-hidden-id').val();
        let name =$("#name").val();
        let comment = $("#comment").val();
        let parent = $("#parent").val();

        var JSONObject= {
            "id": $('.ibc-hidden-id').val(),
            "name":name,
            "parent":parent,
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/editDepartments/'+id_job,
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data:  JSON.stringify(JSONObject),
            success: function(data){

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(thrownError);
            }
        });
        $('#editModal').modal('hide');
    });

    $("body").on("click", ".ibcbtn-delete", function (e) {
        e.preventDefault();

        let url =  'http://localhost:8087/deleteJob/'+$(this).attr("rowid");
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data){
                if(data == 'Удалено'){

                    $('#deleteModal').modal('show');

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(thrownError);
            }
        });

    });

    $("body").on("click", ".ibcbtn-create", function (e) {
        e.preventDefault();
        $('#createModal').modal('show');

    });

    $("body").on("click", ".ibcbtn-create-department", function (e) {
        e.preventDefault();

        let name =$("#create_name").val();
        let comment = $("#create_comment").val();
        let parent = $("#create_parent").val();

        var JSONObject= {
            "name":name,
            "parent": parent,
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/createDepartments/',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data:  JSON.stringify(JSONObject),
            success: function(data){

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(thrownError);
            }
        });

        $('#createModal').modal('hide');

    });

});

setInterval( function () {
    console.log('reload');
    $('#myDepartmentsTable').DataTable().ajax.reload(null, false);
}, 5000  );
