/**
 * Created by twtrubiks on 2016/11/5.
 */
$(document).ready(function () {
    $('#summernote').summernote({
        height: 200
    });
    /*** nestable START  ***/
    var updateOutput = function (e) {
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            // output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
            var send_data = {
                document_data: list.nestable('serialize'),
            }
            var data_json = JSON.stringify(send_data);
            $.ajax({
                url: '/API_update_Sequence',
                type: "POST",
                data: data_json,
                dataType: "json",
                contentType: "application/json",
                success: function (data, textStatus, jqXHR) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error:" + jqXHR);
                }
            });

        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

    // activate Nestable
    $('#nestable').nestable({
        group: 1,
        maxDepth: 1
    }).on('change', updateOutput);

    // output initial serialised data
    updateOutput($('#nestable').data('output', $('#nestable-output')));

    $('#nestable-menu').on('click', function (e) {
        var target = $(e.target),
            action = target.data('action');
        if (action === 'expand-all') {
            $('.dd').nestable('expandAll');
        }
        if (action === 'collapse-all') {
            $('.dd').nestable('collapseAll');
        }
    });
    /*** nestable END  ***/

    $('#datatables').DataTable();
    $('#addRow').on('click', function () {
        var document_title = $('#title').val();
        var document_sequence = $('#sequence').val();
        var document_content = $('#summernote').summernote('code');
        var document_data = {
            document_title: document_title,
            document_sequence : document_sequence,
            document_content: document_content,
        }
        var data_json = JSON.stringify(document_data);
        $.ajax({
            url: '/API_new_document',
            type: "POST",
            data: data_json,
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                location.replace("/");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error:" + jqXHR);
            }
        });
    });
    $('#editCheck').on('click', function () {
        var document_id = $("#title_id").val();
        var document_sequence = $('#sequence').val();
        var document_title = $('#title').val();
        var document_content = $('#summernote').summernote('code');
        var document_data = {
            document_id: document_id,
            document_sequence: document_sequence,
            document_title: document_title,
            document_content: document_content,
        }
        var data_json = JSON.stringify(document_data);
        $.ajax({
            url: '/API_edit_document',
            type: "POST",
            data: data_json,
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                location.replace("/");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error:" + jqXHR);
            }
        });
    });
    $('#datatables tbody').on('click', 'a', function () {
        var t = $('#datatables').DataTable();
        var id = $(this).parent().parent().children().eq(0).html();
        var title = $(this).parent().parent().children().eq(1).html();
        var content = $(this).parent().parent().children().eq(2).html();
        var sequence = $(this).parent().parent().children().eq(3).text();
        var send_data = {
            id: id,
            title: title,
            content: content,
            sequence: sequence
        };
        var data_json = JSON.stringify(send_data);

        if ($(this).children().hasClass('fa-minus-circle') == true) {
            console.log("delete");
            t.row($(this).parents('tr')).remove().draw();
            $.ajax({
                url: '/API_delete_documentTitle',
                type: "POST",
                data: data_json,
                dataType: "json",
                contentType: "application/json",
                success: function (data, textStatus, jqXHR) {
                    location.replace("/");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error:" + jqXHR);
                }
            });
        }
        else {
            console.log("edit");
            $('#summernote').summernote('code', content);
            $('#summernote').summernote({
                height: 200
            });

            $("#editCheck").parent().show();
            $("#addRow").parent().hide();
            $("#title").val(title);
            $("#title_id").val(id);
            $("#sequence").val(sequence);
        }
    });

});