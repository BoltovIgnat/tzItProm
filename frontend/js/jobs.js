$(document).ready(function(){

    var dt = $('#myJobsTable').DataTable({
        "ajax": "http://localhost:8087/jobs/all",
        "serverSide": true,
        "dom": '<"toolbar">frtip',
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "comment" },
            { "data": "buttons" }
        ]
    });

    $("div.toolbar").html("<a role='button' class='ibcbtn-create btn btn-success' data-target='#newModal'>Добавить новую работу</a>");

    $("body").on("click", ".ibcbtn-edit", function (e) {
        e.preventDefault();

        $('.ibc-hidden-id').val($(this).attr("rowid"));
        $('#editModal').modal('show');
    });

    $("body").on("click", ".ibcbtn-update-job", function (e) {

        let id_job = $('.ibc-hidden-id').val();
        let name =$("#name").val();
        let comment = $("#comment").val();

        var JSONObject= {
            "id": $('.ibc-hidden-id').val(),
            "name":name,
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/editJob/'+id_job,
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

    $("body").on("click", ".ibcbtn-create-job", function (e) {
        e.preventDefault();

        let name =$("#create_name").val();
        let comment = $("#create_comment").val();

        var JSONObject= {
            "name":name,
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/createJob/',
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
    $('#myJobsTable').DataTable().ajax.reload(null, false);
}, 5000  );
