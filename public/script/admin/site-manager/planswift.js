$(document).ready(function () {
    // displayData();
});

$('.input-price').mask('000.000.000.000');

function formatAmount(target_id) {
    var value = $(`#${target_id}`).val();
    var arrValue = value.split(".")
    var res = '';
    arrValue.map(value => {
        res += value;
    })
    var targetValueId = target_id.replace("_view", "");
    $(`#${targetValueId}`).val(res)
}
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
});

function uploadExcel() {

    var element = document.getElementById('planswift_upload_excel').files[0];    
    if ($("#planswift_upload_excel").val() == '') {
        Toast.fire({
            icon: "error",
            title: 'Silahkan melakukan input pada file excel.'
        });
        return
    }
    if(element.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        Toast.fire({
            icon: "error",
            title: 'Ekstensi file wajib xlsx dan sesuai dengan format'
        });
        return;
    }

    $(`#form-upload-planswift`).submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $(`#result-upload-excel`).LoadingOverlay("show", {
            text: "Please wait to generate excel into data table."
        });
        console.log(formData)
        $.ajax({
            url: `/admin/site-manager/planswift/upload-excel`,
            type: "post",
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response)
                $("#result-upload-excel").html(response.output)
                $(`#result-upload-excel`).LoadingOverlay("hide");
                $("#planswift_upload_excel").val('');
                $(`#form-upload-planswift`).unbind("submit");
            },
            error: function (err) {
                console.log(err);
                let err_log = err.responseJSON.errors;
                // handleError(err, err_log, data);
            }
        });
    });
}


const getUrl = () => {
    var url = window.location.href;
    var arr = url.split("/");
    var data = arr[5];
    return data;
};

const data = getUrl();

function displayData(id = null, data_search = null, type = null) {
    $.ajax({
        url: `/admin/site-manager/${data}/create`,
        method: "get",
        success: async function (response) {
            await console.log(response)
            // console.log(response)
            // await $(`#show-data-${data}`).html(response);
            // $(`#row-${data}-${id}`).addClass("success-alert");
            // setTimeout(() => {
            //     $(`#row-${data}-${id}`).removeClass("success-alert");
            // }, 3000);
            // await $(`#table-${data}`).DataTable();
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function openForm(data, type, id = null) {
    switch (type) {
        case "add":
            // $(`#form-${data}`)[0].reset();
            $(`#data-planswift`).hide();
            $(`#form-data-planswift`).show();
            $(`#btn-add-planswift`).hide();
            $(`#btn-back-planswift`).show();
            break;
        case "back":
            console.log($("#result-upload-excel").html())

            function backForm() {
                $(`#data-planswift`).show();
                $(`#form-data-planswift`).hide();
                $(`#btn-add-planswift`).show();
                $(`#btn-back-planswift`).hide();
            }
            if ($("#result-upload-excel").html() == '') {
                backForm()
            } else {
                Swal.fire({
                    title: "Apakah anda yakin ingin kembali?",
                    text: "Data hasil upload Planswift akan hilang dan silahkan melakukan upload kembali",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya, saya yakin!"
                }).then(result => {
                    if (result.isConfirmed) {
                        backForm()
                        $("#result-upload-excel").html('')
                    }
                });
            }
            break;
        default:
            break;
    }
}

function submitData() {
    Swal.fire({
        title: "Yakin akan menyimpan data Planswift?",
        text: "Data akan membentuk master data Planswift untuk di proses ke Site Manager",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, saya yakin!"
    }).then(result => {
        if (result.isConfirmed) {
            $(`#data-planswift`).show();
            $(`#form-data-planswift`).hide();
            $(`#btn-add-planswift`).show();
            $(`#btn-back-planswift`).hide();
            $("#result-upload-excel").html('')
        }
    });
}
