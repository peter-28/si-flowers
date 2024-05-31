
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
});

const getUrl = () => {
    var url = window.location.href;
    var arr = url.split("/");
    var data = arr[5];
    return data;
};

const data = getUrl();

$(document).ready(function () {
    displayData()
});

function displayData(id = null, data_search = null, type = null) {
    $.ajax({
        url: `/admin/management-transaction/${data}/create`,
        method: "get",
        success: async function (response) {
            console.log(response)
            await $(`#show-data-${data}`).html(response);
            $(`#row-${data}-${id}`).addClass("success-alert");
            setTimeout(() => {
                $(`#row-${data}-${id}`).removeClass("success-alert");
            }, 3000);
            await $(`#table-${data}`).DataTable();
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function openModal(data, type, id = null) {
    if (type == "add" || type == "edit") {
        $(`#modal-${data}`).modal("show");
    } else {
        $(`#modal-content-${data}`).LoadingOverlay("show");
        $(`#modal-detail-${data}`).modal("show");
    }
    switch (type) {
        case "add":
            $(`#form-${data}`)[0].reset();
            $(`#add-${data}`).show();
            $(`#edit-${data}`).hide();
            // $.ajax({
            //     url: `/admin/management-transaction/${data}/code`,
            //     method: "get",
            //     dataType: "json",
            //     success: async function (response) {
            //         // console.log(response)
            //         await $(`#${data}_code`).val(response.data)
            //     },
            //     error: function (err) {
            //         console.log(err);
            //     }
            // });
            break;
        case "edit":
            $(`#edit-${data}`).show();
            $(`#add-${data}`).hide();
            $.ajax({
                url: `/admin/management-transaction/${data}/${id}/edit`,
                method: "get",
                dataType: "json",
                success: async function (response) {
                    await fetchData(data, response.data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
            break;
        case "detail":
            $(`#modal-detail-${data}`).LoadingOverlay("hide");
            break;
        default:
            break;
    }
}
