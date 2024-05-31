$(document).ready(function () {
    displayData();
});
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ajaxStart(function () {
    $.LoadingOverlay("show");
});
$(document).ajaxStop(function () {
    $.LoadingOverlay("hide");
});
const getUrl = () => {
    var url = window.location.href;
    var arr = url.split("/");
    var data = arr[5];
    return data;
};

const data = getUrl();

function displayData(id = null, data_search = null, type = null) {
    $.ajax({
        url: `/admin/rancangan-anggaran-biaya/rab/create`,
        method: "get",
        success: function (response) {
            $(`#show-data-${data}`).html(response);
            $(`#row-${data}-${id}`).addClass("success-alert");
            setTimeout(() => {
                $(`#row-${data}-${id}`).removeClass("success-alert");
            }, 3000);
            $(`#table-${data}`).DataTable();
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function openModal(data, type, id = null) {
    if (type == "add") {
        $("#is_edit").val("N");
        $("#show-data-rab").hide();
        $("#btn-add-ahs").hide();
        $("#form-rab").show();
        $("#btn-back-ahs").show();
        $("#btn-save-ahs").show();
        $("#btn-update-ahs").hide();
        $("#show-data-detail-ahs").empty();

        $("#id_ahs").val("");
        $("#kode").val("RAB-YYMMXXX");
        $("#id_sub").val("");
        $("#id_job").val("");
        $("#total_equipment").val("");
        $("#overhead").val("10");
        $("#total_before_overhead").val("");
        $("#total_labor").val("");
        $("#total_material").val("");
        $("#total").val("");
        $("#total_before_overhead_title").val("");
        $("#total_title").val("");
    } else if (type == "back") {
        Swal.fire({
            title: "Yakin akan ingin kembali?",
            text: "Data anda akan hilang dan melakukan input kembali",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, saya yakin!",
        }).then((result) => {
            if (result.isConfirmed) {
                $("#form-rab").hide();
                $("#btn-back-ahs").hide();
                $("#btn-save-ahs").hide();
                $("#show-data-rab").show();
                $("#btn-add-ahs").show();
                $("#detail-rab").hide();
            }
        });
    } else if (type == "detail") {
        $("#show-data-rab").hide();
        $("#btn-add-ahs").hide();
        $("#detail-rab").show();
        $("#btn-back-ahs").show();
        $.ajax({
            type: "get",
            url: `/admin/rancangan-anggaran-biaya/rab/${id}`,
            success: function (response) {
                $("#detail-rab").html(response);

            },
            error: function (err) {
                console.log(err)
            }
        });
    }
}

const successResponse = (type, data, message, id = null) => {
    $(`#modal-${data}`).modal("hide");
    $(`#form-${data}`)[0].reset();
    $(`#form-${data}`).unbind("submit");
    displayData(id);

    if (data == "blog") {
        CKEDITOR.instances["blog_content"].setData("");
        $(`#form-data-${data}`).hide();
        $(`#show-data-${data}`).show();
        $(`#btn-add-${data}`).show();
        $(`#btn-back-${data}`).hide();
    }
    Toast.fire({
        icon: "success",
        title: message,
    });
    switch (type) {
        case "add":
            $(`#add-${data}`).removeAttr("disabled");
            break;
        default:
            break;
    }
};

function manageData(type, id = null) {
    switch (type) {
        case "save":
            if ($("#id_project").val() == "") {
                Toast.fire({
                    icon: "error",
                    title: "Silahkan pilih proyek terlebih dahulu.",
                });
                return;
            }
            var formData = $(`#form-data-rab`).serialize();
            Swal.fire({
                title: "Konfirmasi",
                text: "Yakin akan menambahkan data RAB?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, saya yakin!",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `/admin/rancangan-anggaran-biaya/rab`,
                        type: "post",
                        data: formData,
                        dataType: "json",
                        success: function (response) {
                            alert('Berhasil menambahkan data RAB')
                            window.location.reload();

                            return;
                            // successResponse(
                            //     "add",
                            //     data,
                            //     response.message,
                            //     response.data.id
                            // );
                        },
                        error: function (err) {
                            console.log(err);
                            let err_log = err.responseJSON.errors;
                            handleError(err, err_log, data);
                        },
                    });
                }
            });


        // $(`#form-${data}`).submit(function (e) {
        //     $(`#add-${data}`).attr("disabled", true);
        //     e.preventDefault();
        //     var formData = new FormData(this);
        //     $.ajax({
        //         url: `/admin/master-data/${data}`,
        //         type: "post",
        //         data: formData,
        //         dataType: "json",
        //         cache: false,
        //         contentType: false,
        //         processData: false,
        //         success: async function (response) {
        //             //
        //             // return;
        //             await successResponse(
        //                 "add",
        //                 data,
        //                 response.message,
        //                 response.data.id
        //             );
        //         },
        //         error: async function (err) {
        //             console.log(err);
        //             let err_log = err.responseJSON.errors;
        //             await handleError(err, err_log, data);
        //         },
        //     });
        // });
        // break;
        case "update":
            break;
        case "delete":
            Swal.fire({
                title: "Yakin akan menghapus data?",
                text: "Data yang di hapus tidak dapat dikembalikan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `/admin/rancangan-anggaran-biaya/rab/delete/${id}`,
                        method: "delete",
                        // dataType: "json",
                        success: function (response) {
                            window.location.reload();
                        },
                        error: function (err) {
                            console.log(err);
                        },
                    });
                }
            });
            break;
    }
}

function handleError(err, err_log, type) {
    $(`#add-${data}`).removeAttr("disabled");
    $(`#form-${data}`).unbind("submit");
    switch (type) {
        case "status":
            if (err.status == 422) {
                if (typeof err_log.status_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.status_name[0],
                    });
                }
                if (typeof err_log.status_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.status_code[0],
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem",
                });
            }
            break;
    }
}


function chooseProject() {
    var url = window.location.href;
    var arr = url.split("/");
    resetForm();
    $("#detail-project").hide();
    var kodeRab = $("#kode").val();
    var id_project = $("#id_project").val();
    if (id_project !== "") {
        $("#detail-project tbody tr").remove();
        $("#detail-project").show();
        $.ajax({
            url: `/admin/master-data/project/${id_project}/edit`,
            method: "get",
            dataType: "json",
            success: function (response) {
                var data = response.data;
                let html = "<tr>";
                html += "<td class=\"w-12p\">" + kodeRab + "</td>";
                html += "<td class=\"w-20p\">" + data.type + "</td>";
                html += "<td class=\"\">" + data.name + "</td>";
                html += "<td class=\"w-12p\">" + data.owner + "</td>";
                html += "<td class=\"w-15p text-right\">" + data.nominal + "</td>";
                html += "<td class=\"w-15p\">" + data.status + "</td>";
                html += "<td class=\"w-12p\">\n";
                if (arr.length <8) {
                    html += "                        <div class=\"btn-group btn-group-sm\" role=\"group\" aria-label=\"Basic example\">\n" +
                        "                            <button type=\"button\" class=\"btn p5x btn-sm btn-outline-success\"\n" +
                        "                                    onclick=\"showBodyRAB()\"><i class=\"fe fe-plus\"></i> Tambah AHS</button>\n" +
                        // "                            <button type=\"button\" class=\"btn p5x btn-sm btn-outline-warning\"\n" +
                        // "                                    onclick=\"openModal('rab','edit')\"><span\n" +
                        // "                                        class=\"fe fe-16 fe-edit\"></span></button>\n" +
                        "<input id=\"total_rab\" type='hidden' value=\"" + data.nominal + "\" />" +
                        "                        </div>\n" +
                        "                    </td>";
                }
                html += "</tr>";
                $("#detail-project tbody").append(html);
            },
        });
    }
}


function exportDataRab(type) {
    if (type == 'main') {

        var tab_text = "<table border='2px'><tr bgcolor=''>";
        var textRange;
        var j = 0;
        tab = document.getElementById('table-main-rab'); // id of table

        row = tab.rows.length

        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        }

        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        } else //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

        return (sa);

    }
}


function printPDF(type) {
    if (type == 'main') {
        var id_rab = $("#id_rab_master").val();
        window.open(`http://127.0.0.1:8000/admin/rancangan-anggaran-biaya/rab/print-pdf/${id_rab}`);

    }
}
