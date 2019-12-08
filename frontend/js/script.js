$(document).ready(function(){

    var dt = $('#myEmployesTable').DataTable({
        "ajax": "http://localhost:8087/",
        "serverSide": true,
        "dom": '<"toolbar">frtip',
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "job" },
            { "data": "department" },
            { "data": "comment" },
            { "data": "buttons" }
        ]
    });

    //Загрузка работ
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8087/jobs/allforinput',
        success: function(data){
            console.log(data);
            $(".ibc-select-jobs").empty();
            $(".ibc-create-select-jobs").empty();
            data.forEach(function(item, i, data) {
                $(".ibc-select-jobs").append( '<option value="'+item.id+'" ibc-mark="'+item.mark+'" ibc-number="'+item.numberCar+'">'+item.name+'</option>' );
                $(".ibc-create-select-jobs").append( '<option value="'+item.id+'" ibc-mark="'+item.mark+'" ibc-number="'+item.numberCar+'">'+item.name+'</option>' );
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            console.log(thrownError);
        }
    });

    //Загрузка департаментов
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8087/departments/allforinput',
        success: function(data){
            console.log(data);
            $(".ibc-select-departments").empty();
            $(".ibc-create-select-departments").empty();
            data.forEach(function(item, i, data) {
                $(".ibc-select-departments").append( '<option value="'+item.id+'">'+item.name+'</option>' );
                $(".ibc-create-select-departments").append( '<option value="'+item.id+'">'+item.name+'</option>' );
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            console.log(thrownError);
        }
    });


    $("div.toolbar").html("<a role='button' class='ibcbtn-create btn btn-success' data-target='#newModal'>Добавить нового сотрудника</a>");

    $("body").on("click", ".ibcbtn-edit", function (e) {
        e.preventDefault();

        $('.ibc-hidden-id').val($(this).attr("rowid"));
        $('#editModal').modal('show');
    });

    $("body").on("click", ".ibcbtn-update-order", function (e) {

        let id = $('.ibc-hidden-id').val();
        let name = $('#name').val();
        let id_jobs = $('.ibc-select-jobs').val();
        let name_jobs = $('.ibc-select-jobs option:selected').html();

        let id_departments = $('.ibc-select-departments').val();
        let name_departments = $('.ibc-select-departments option:selected').html();
        let comment = $('#comment').val();

        var JSONObject= {
            "id": $('.ibc-hidden-id').val(),
            "name": name,
            "jobs":{"id":Number(id_jobs),"name":name_jobs},
            "departments":{"id":Number(id_departments),"name":name_departments},
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/editEmployes/'+id,
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

        let url =  'http://localhost:8087/deleteEmployes/'+$(this).attr("rowid");
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

    $("body").on("click", ".ibcbtn-create-order", function (e) {
        e.preventDefault();

        let name = $('#create_name').val();
        let id_jobs = $('.ibc-create-select-jobs').val();
        let name_jobs = $('.ibc-create-select-jobs option:selected').html();

        let id_departments = $('.ibc-create-select-departments').val();
        let name_departments = $('.ibc-create-select-departments option:selected').html();
        let comment = $('#create_comment').val();

        var JSONObject= {
            "name": name,
            "jobs":{"id":Number(id_jobs),"name":name_jobs},
            "departments":{"id":Number(id_departments),"name":name_departments},
            "comment":comment};

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8087/createEmployes/',
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
    $('#myEmployesTable').DataTable().ajax.reload(null, false);
}, 5000  );

