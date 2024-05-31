$(document).ready(function () {
    displayData();
    $(`#table-data-material`).DataTable();


});

function clearSelectOption(data, placeholder) {
    document.getElementById(`${data}`).selectedIndex = 0;
    $(`#select2-${data}-container`).html(`${placeholder}`);
    getFilterAhs();
}


$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
});

function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}

function displayData(id = null, type = null) {
    $.ajax({
        url: `/admin/ahs-lokal/create`,
        method: "get",
        success: async function (response) {
            await $("#list-data-ahs-master").html(response)
            await $("#table-ahs-master").DataTable();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function clearFilterMaterial(id) {
    $(`#${id}`).val('').trigger('change');
    getFilterMaterials();
}

function getFilterMaterials() {
    let filter_material_clasification = $('#filter_material_clasification').val();
    let filter_material_city = $('#filter_material_city').val();

    let dataFilter = {
        'id_classification': filter_material_clasification,
        'id_city': filter_material_city
    }
    $.ajax({
        url: '/admin/ahs-lokal/filter/material',
        data: dataFilter,
        success: function (data) {
            console.log(data);
            $("#list-data-material").empty().html(data)
            $("#table-data-material").DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
}


function getFilterAhs() {

    var filter_type = $("#filter-type-ahs").val();
    var filter_class_job = $("#filter-class-job-ahs").val();
    var filter_group_job = $("#filter-group-job-ahs").val();
    var filter_job = $("#filter-job-ahs").val();
    var filter_profile_ahs = $("#filter-profile-ahs").val();

    dataFilter = {
        type: filter_type,
        group_job: filter_group_job,
        ahs_profile: filter_profile_ahs,
        job: filter_job,
    };

    $.ajax({
        url: '/admin/ahs-lokal/create',
        data: dataFilter,
        success: function (response) {
            console.log(response);

            $("#list-data-ahs-master").empty().html(response)
            $("#table-ahs-master").DataTable();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function openModal(data, type, id) {
    if (type == 'add') {


        $("#list-material-ahs-master").insertBefore($("#detail-material-ahs-master"));
        $("#modal-title-ahs").html("Tambah AHS Master");
        $("#filter-ahs").hide();
        $("#is_edit").val('N');
        $("#list-data-ahs-master").hide();
        $("#btn-add-ahs").hide();
        $("#form-ahs-master").show();
        $("#btn-back-ahs").show()
        $("#btn-save-ahs").show();
        $("#btn-update-ahs").hide();
        $("#show-data-detail-ahs").empty();

        $.ajax({
            url: `/admin/ahs-lokal/generate/code`,
            type: "get",
            success: async function (response) {
                console.log(response)
                $("#kode").val(response);
            }
        });

        $("#id_ahs").val('');

        $("#id_sub").val('');
        $("#id_job").val('');
        $("#total_equipment").val('');
        $("#overhead").val('10');
        $("#total_before_overhead").val('');
        $("#total_labor").val('');
        $("#total_material").val('');
        $("#total").val('');
        $("#total_before_overhead_title").val('');
        $("#total_title").val('');
    } else if (type == 'back') {

        $("#filter-ahs").show();
        $("#form-ahs-master").hide();
        $("#btn-back-ahs").hide();
        $("#btn-save-ahs").hide();
        $("#list-data-ahs-master").show();
        $("#btn-add-ahs").show();
    } else if (type == 'copy') {
        $("#modal-ahs-master").modal('show')
        $.ajax({
            url: `/admin/ahs-lokal/generate/code`,
            type: "get",
            success: async function (response) {

                $("#kode-copy").val(response)
                $.ajax({
                    url: `/admin/ahs-lokal/${id}`,
                    method: "get",
                    success: function (response) {

                        var data_ahs_master = response.data.ahs_master;
                        var data_ahs_details = response.data.ahs_details;

                        $("#kode-copy").val("AUTO GENERATED");
                        $("#type_ahs-copy").val(data_ahs_master.type);
                        $("#select2-type_ahs-copy-container").html(data_ahs_master.type);
                        $("#id_sub-copy").val(data_ahs_master.id_groupjob);
                        $("#id_job-copy").val(data_ahs_master.id_job);
                        $("#name_sub-copy").val(data_ahs_master.name_sub);
                        $("#name_job-copy").val(data_ahs_master.name_job);
                        $("#id_ahs_profile-copy").val(data_ahs_master.id_ahs_profile);
                        $("#name_profile-copy").val(data_ahs_master.name_profile);
                        let overHeadPrice = (data_ahs_master.overhead * response.data.hp / 100) + response.data.hp;
                        // $("#select2-id_sub-copy-container").html(data_ahs_master.name_sub);
                        chooseGroupJobCopy(data_ahs_master.id_groupjob, data_ahs_master.type, data_ahs_master.id_job, data_ahs_master.name_job);
                        $("#total_before_overhead_title-copy").val(formatRibuan(response.data.hp));
                        $("#total_before_overhead-copy").val(response.data.hp);
                        $("#overhead-copy").val(data_ahs_master.overhead);
                        $("#total_title-copy").val(formatRibuan(overHeadPrice));
                        $("#total-copy").val(overHeadPrice);
                        // $("#total_labor-copy").val(data_ahs_master.total_labor);
                        // $("#total_material-copy").val(data_ahs_master.total_material);
                        var html_detail_copy;
                        data_ahs_details.forEach(data => {
                            let subTotal = data.price * data.coefficient;
                            html_detail_copy += `<tr>`;
                            html_detail_copy += `<td>${data.m_category}</td>`
                            html_detail_copy += `<td>${data.name}<input hidden value="${data.id_material}" id="id-material-copy-${data.id_material}" name="id_material[]"/></td>`
                            html_detail_copy += `<td class="text-right">Rp ${formatRibuan(data.price)}</td>`
                            html_detail_copy += `<td class="text-right">${data.coefficient}<input hidden id="coefficient-copy-${data.id_material}" value="${data.coefficient}" name="coefficient[]"></td>`
                            html_detail_copy += `<td class="text-right">Rp ${formatRibuan(subTotal)}<input hidden id="sub_total_${data.id_material}" value="${subTotal}" name="sub_total[]" class="sub-total-value sub-total-${data.status}"/></td>`
                            html_detail_copy += `</tr>`;
                        })
                        $("#show-data-detail-ahs-copy").html(html_detail_copy)
                    }
                });
            },
            error: async function (err) {

            }
        })

    } else if (type == 'edit') {
        $('#btn-report').hide();
        $("#detail-material-ahs-master").insertBefore($("#list-material-ahs-master"));
        $("#modal-title-ahs").html("Edit AHS Master");
        $("#filter-ahs").hide();
        $("#is_edit").val('Y');
        $("#list-data-ahs-master").hide();
        $("#btn-add-ahs").hide();
        $("#form-ahs-master").show();
        $("#btn-back-ahs").show()
        $("#btn-update-ahs").show();
        $("#show-data-detail-ahs").empty();
        $("#btn-save-ahs").hide();

        $("#kode").val('');
        $("#id_sub").val('');
        $("#id_job").val('');
        $("#total_equipment").val('');
        $("#overhead").val('10');
        $("#total_before_overhead").val('');
        $("#total_labor").val('');
        $("#total_material").val('');
        $("#total").val('');
        $("#total_before_overhead_title").val('');
        $("#total_title").val('');

        $("#id_ahs").val(id)
        $.ajax({
            url: `/admin/analisis-harga-satuan/${data}/${id}`,
            method: "get",
            dataType: "json",
            success: function (response) {
                console.log(response);
                fetchData(data, response.data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

var dataMaterial = [];


// const numberWithCommas = x => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };


function addMaterial(id_material, name, status, price, unit) {
    var is_edit = $("#is_edit").val();
    if (is_edit == 'N') {
        console.log("Add Material, not in edit mode");
        var existingRow = document.getElementById(`row-detail-${id_material}`);
        if (existingRow) {
            Toast.fire({
                icon: "error",
                title: `Data ${name} sudah masuk dalam detail list AHS Master`
            });
            return;
        }
        var data = {
            id_material,
            name,
            status,
            price,
            unit,
            coefficient: 0,
            sub_total: 0,
        };
        createListDetailsMaterial(data);
    } else {
        console.log("Add Material, in edit mode");
        var existingRow = document.getElementById(`row-detail-${id_material}`);
        if (existingRow) {
            Toast.fire({
                icon: "error",
                title: `Data Material/Labor sudah masuk dalam detail list AHS Master`
            });
            return;
        }
        var data = {
            id_material,
            name,
            status,
            price,
            unit,
            coefficient: 0,
            sub_total: 0,
        };
        createListDetailsMaterial(data);
    }
}

function createListDetailsMaterial(data) {
    var html_row;
    var html_row;
    var {
        id_material,
        status,
        name,
        price,
        unit
    } = data;


    html_row += `<tr id="row-detail-${id_material}">`;
    html_row += `<td>${status}</td>`;
    html_row += `<td>${name}<input hidden value="${id_material}" id="id-material-${id_material}" name="id_material[]"/></td>`;
    html_row += `<td>${unit}</td>`;
    html_row += `<td data-price="${price}" class="text-right">Rp. <label>${formatRibuan(price)}</label>
            <input hidden value="${price}" id="price-${id_material}" />
        </td>`;
    html_row +=
        `<td><input required type="text" class="form-control input-coefficient text-right form-control-sm" style="height:25px;font-size:12px" id="coefficient-${id_material}" onchange="calculateCoef(${id_material})" name="coefficient[]"></td>`;
    html_row += `<td class="text-right">Rp. <label id="sub-total-${id_material}" class="text-right"></label>
        <input hidden value="" id="sub_total_${id_material}" name="sub_total[]" class="sub-total-value sub-total-${status}"/>
        </td>`;
    html_row += `<td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteMaterial(${id_material})"><span
                        class="fe fe-trash-2"></span></button></td>`;
    html_row += `</tr>`;
    $("#show-data-detail-ahs").append(html_row)
}


function deleteMaterial(id_material) {
    $(`#coefficient-${id_material}`).val(0);
    $(`#price-${id_material}`).val(0);
    calculateCoef(id_material);
    var row = document.getElementById(`row-detail-${id_material}`);
    row.remove();

    for (var i = 0; i < dataMaterial.length; i++) {
        if (dataMaterial[i].id_material == id_material) {
            dataMaterial.splice(i, 1);
            break;
        }
    }
}


function calculateCoef(id_material) {

    var coefficient = $(`#coefficient-${id_material}`).val();
    var price = $(`#price-${id_material}`).val();
    var sub_total = parseFloat(coefficient) * parseFloat(price);
    $(`#sub-total-${id_material}`).html(formatRibuan(sub_total));
    $(`#sub_total_${id_material}`).val(sub_total);
    calculateHSP();
}

function calculateHSP() {
    var total_sub_total = 0;
    $(`.sub-total-value`).each(function () {
        var inputValItem = $(this).val();
        if ($.isNumeric(inputValItem)) {
            total_sub_total += parseFloat(inputValItem);
        }
    });

    $("#total_before_overhead_title").val(formatRibuan(total_sub_total))
    $("#total_before_overhead").val(total_sub_total)

    // OVERHEAD
    var overhead = $("#overhead").val();
    if (overhead !== '') {
        var total = parseFloat(total_sub_total) + (parseFloat(overhead) / 100) * parseFloat(total_sub_total);
        $("#total_title").val(formatRibuan(total))
        $("#total").val(total)
    }
    calculateLaborMaterial();
}

function calculateLaborMaterial() {
    var sub_total_labor = 0;
    var sub_total_material = 0;

    $(`.sub-total-labor`).each(function () {
        var inputValLabor = $(this).val();
        if ($.isNumeric(inputValLabor)) {
            sub_total_labor += parseFloat(inputValLabor);
        }
    });

    $(`.sub-total-material`).each(function () {
        var inputValMaterial = $(this).val();
        if ($.isNumeric(inputValMaterial)) {
            sub_total_material += parseFloat(inputValMaterial);
        }
    });

    $("#total_labor").val(sub_total_labor)
    $("#total_material").val(sub_total_material)
}

function calculateOverhead() {
    var overhead = $("#overhead").val();
    if (overhead == '') {
        $("#overhead").val('0');
        overhead = 0;
    }
    var total_sub_total = 0;
    $(`.sub-total-value`).each(function () {
        var inputValItem = $(this).val();
        if ($.isNumeric(inputValItem)) {
            total_sub_total += parseFloat(inputValItem);
        }
    });

    var total = parseFloat(total_sub_total) + (parseFloat(overhead) / 100) * parseFloat(total_sub_total);
    $("#total_title").val(formatRibuan(total))
    $("#total").val(total)
}

function manageData(type, action, id = null) {
    switch (action) {
        case "save":
            if ($(`#form-data-ahs-master`).valid()) {
                $(`#form-data-ahs-master`).submit(function (e) {
                    e.preventDefault();
                    var formData = new FormData(this);
                    $.ajax({
                        url: `/admin/ahs-lokal`,
                        type: "post",
                        data: formData,
                        dataType: "json",
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            console.log(response)
                            $("#show-data-ahs-master").LoadingOverlay("hide");
                            $(`#form-data-ahs-master`).unbind("submit");
                            // return;
                            successResponse(
                                "add",
                                "ahs-master",
                                response.message,
                                response.data
                            );
                        },
                        error: async function (err) {
                            console.log(err);
                            let err_log = err.responseJSON.errors;
                            $(`#form-data-ahs-master`).unbind("submit");
                        }
                    });
                });
            } else {
                Swal.fire('Error', 'Ada data yang belum diisi', 'error');
            }
            break;
        case "update":
            var id = $("#id_ahs").val();

            $(`#form-data-ahs-master`).submit(function (e) {
                e.preventDefault();
                var formData = $(`#form-data-ahs-master`).serialize();
                $.ajax({
                    url: `/admin/ahs-lokal/${id}`,
                    type: "patch",
                    data: formData,
                    dataType: "json",
                    success: async function (response) {
                        console.log(response);
                        $(`#form-data-ahs-master`).unbind("submit");
                        await successResponse(
                            "edit",
                            "ahs-master",
                            response.message,
                            response.data
                        );
                    },
                    error: async function (err) {
                        console.log(err);
                        let err_log = err.responseJSON.errors;
                        $(`#form-data-ahs-master`).unbind("submit");
                    }
                })
            })
            break;
        case "delete":
            Swal.fire({
                title: "Yakin akan menghapus data?",
                text: "Data yang di hapus tidak dapat dikembalikan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!"
            }).then(result => {
                if (result.isConfirmed) {
                    $("#show-data-ahs-master").LoadingOverlay("show");
                    $.ajax({
                        url: `/admin/ahs-lokal/${id}`,
                        method: "delete",
                        dataType: "json",
                        success: async function (response) {
                            $("#show-data-ahs-master").LoadingOverlay("hide");
                            await displayData();
                            Toast.fire({
                                icon: "success",
                                title: response.message
                            });
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            });
            break;
        case "copy":
            $(`#form-copy-ahs-master`).submit(function (e) {
                e.preventDefault();
                var formData = new FormData(this);
                $.ajax({
                    url: `/admin/ahs-lokal`,
                    type: "post",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: async function (response) {
                        console.log(response.data);
                        $("#modal-ahs-master").modal('hide')
                        $(`#form-copy-ahs-master`).unbind("submit");
                        $("#show-data-ahs-master").LoadingOverlay("hide");
                        await displayData();
                        Toast.fire({
                            icon: "success",
                            title: response.message
                        });
                    },
                    error: async function (err) {
                        console.log(err);
                        let err_log = err.responseJSON.errors;
                        $(`#form-copy-ahs-master`).unbind("submit");
                    }
                });
            });

            break;
    }
}


function expandRow(id_ahs) {
    var html_expand;
    if (document.getElementById(`row-expand-material-${id_ahs}`)) {
        $(`#row-expand-material-${id_ahs}`).remove();
        return;
    }
    $.ajax({
        url: `/admin/ahs-lokal/${id_ahs}`,
        method: "get",
        success: function (response) {
            console.log(response)
            var ahs_master = response.data.ahs_master;
            var ahs_details = response.data.ahs_details;
            var total_labor = response.data.total_labor;
            var total_material = response.data.total_material;
            var total_equipment = response.data.total_equipment;
            html_expand += `<tr id="row-expand-material-${id_ahs}">`;
            html_expand += `<td colspan="6">`;
            html_expand += `<div>`;
            html_expand += `<div class="row">`;
            html_expand += `<div class="col-md-4">`;
            html_expand += `<div class="form-group mb-0 row">
            <h6 class="col-sm-5 pr-0 col-form-label">Total Tenaga Kerja :</h6>
            <h6 class="col-sm-7 col-form-label font-weight-bold">Rp. <label id="total-labor-${id_ahs}">${total_labor ? formatRibuan(total_labor) : 0}</label></h6>
          </div>`;
            html_expand += `</div>`;
            html_expand += `<div class="col-md-4">`;
            html_expand += `<div class="form-group mb-0 row">
            <h6 class="col-sm-5 pr-0 col-form-label">Total Bahan :</h6>
            <h6 class="col-sm-7 col-form-label font-weight-bold">Rp. <label id="total-material-${id_ahs}">${total_material ? formatRibuan(total_material) : 0}</label></h6>
          </div>`;
            html_expand += `</div>`;
            html_expand += `<div class="col-md-4">`;
            html_expand += `<div class="form-group mb-0 row">
            <h6 class="col-sm-5 pr-0 col-form-label">Total Peralatan :</h6>
            <h6 class="col-sm-7 col-form-label font-weight-bold">Rp. <label id="total-equipment-${id_ahs}">${total_equipment ? formatRibuan(total_equipment) : 0}</label></h6>
          </div>`;
            html_expand += `</div>`;
            html_expand += `</div>`;
            html_expand += `<div>`;
            html_expand += `<table class="table datatables table-bordered table-hover table-details-ahs" id="table-details-${id_ahs}">`;
            html_expand += `<thead>`;
            html_expand += `<tr>`;
            html_expand += `<th>Kode</th><th>Kategori</th><th>Nama</th><th class="text-right">Harga</th><th class="text-center">Koefisien</th><th class="text-center">Satuan</th><th class="text-right">Sub Total</th>`;
            html_expand += `</tr>`;
            html_expand += `</thead>`;
            html_expand += `<tbody>`;
            ahs_details.forEach(data => {
                // console.log(data)
                html_expand += `<tr>`;
                html_expand += `<td>${data.kode}</td><td>${data.m_category}</td><td>${data.name}</td><td class="text-right">Rp. ${data.price ? formatRibuan(data.price) : 0}</td><td class="text-center">${data.coefficient}</td><td class="text-center">${data.unit_name}</td><td class="text-right">Rp. ${formatRibuan(data.price * data.coefficient)}</td>`;
                html_expand += `</tr>`;
            })
            html_expand += `</tbody>`;
            html_expand += `</table>`;
            html_expand += `</div>`;
            html_expand += `</td>`;
            html_expand += `</tr>`;

            $(`#tr-ahs-master-${id_ahs}`).after(html_expand)
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function fetchData(data, response, type = null) {
    switch (data) {
        case "ahs-master":
            $("#kode").val(response.ahs_master.ahs_code);
            $("#id_sub").val(response.ahs_master.id_groupjob).trigger('change');
            // $("#select2-id_sub-container").html(response.ahs_master.name_sub);
            // if (response.ahs_master.type == "VCP") {
            //     $("#type_ahs").val('BPS VCP')
            // } else if (response.ahs_master.type == "JOG") {
            //     $("#type_ahs").val('BPS Pemkot Kota')
            // } else {
            //     $("#type_ahs").val('SNI')
            //
            // }
            $("#type_ahs").val(response.ahs_master.id_ahs_profile).trigger('change');
            // $("#select2-type_ahs-container").html(response.ahs_master.type);
            //
            chooseGroupJob(true, response.ahs_master.id_job, response.ahs_master.name_job)
            let overHeadPrice = (response.ahs_master.overhead * response.hp / 100) + response.hp;
            $("#total_equipment").val(response.ahs_master.total_equipment);
            $("#total_labor").val(response.ahs_master.total_labor);
            $("#total_material").val(response.ahs_master.total_material);
            $("#overhead").val(response.ahs_master.overhead);
            $("#total_before_overhead").val(response.hp);
            $("#total_before_overhead_title").val(formatRibuan(response.hp));
            $("#total").val(overHeadPrice);
            $("#total_title").val(formatRibuan(overHeadPrice));


            var ahs_details = response.ahs_details;
            var html_row;
            ahs_details.forEach(data => {
                console.log(data)

                html_row += `<tr id="row-detail-${data.id_material}">`;
                html_row += `<td>${data.m_category}</td>`;
                html_row += `<td>${data.name}<input hidden value="${data.id_material}" id="id-material-${data.id_material}" name="id_material[]"/></td>`;
                html_row += `<td>${data.unit_name}</td>`;
                html_row += `<td data-price="${data.price}"  class="text-right">Rp. <label>${formatRibuan(data.price)}</label>
                        <input hidden value="${data.price}" id="price-${data.id_material}" />
                    </td>`;
                html_row +=
                    `<td><input type="text" class="form-control form-control-sm" style="height:25px;font-size:12px" id="coefficient-${data.id_material}" onchange="calculateCoef(${data.id_material})" name="coefficient[]" value="${data.coefficient}"></td>`;
                html_row += `<td>Rp. <label id="sub-total-${data.id_material}" class="text-right">${formatRibuan(data.price * data.coefficient)}</label>
                    <input hidden id="sub_total_${data.id_material}" name="sub_total[]" value="${(data.price * data.coefficient)}" class="sub-total-value sub-total-${data.status}" />
                    </td>`;
                html_row += `<td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteMaterial(${data.id_material})"><span
                                    class="fe fe-trash-2"></span></button></td>`;
                html_row += `</tr>`;
            })
            $("#show-data-detail-ahs").append(html_row)
            break;
        default:
            break;
    }
}


const successResponse = (type, data, message, id = null) => {
    $("#form-ahs-master").hide();
    $("#btn-back-ahs").hide();
    $("#btn-update-ahs").hide();
    $("#list-data-ahs-master").show();
    $("#btn-add-ahs").show();
    displayData(id);
    switch (type) {
        case "add":
            Toast.fire({
                icon: "success",
                title: message
            });

            if (data == 'store') {
                $("#select2-type-container").html('--Pilih Tipe Bahan--')
            }
            break;
        case "edit":
            Toast.fire({
                icon: "success",
                title: message
            });
            break;
        case "delete":
            Toast.fire({
                icon: "success",
                title: message
            });
            break;
        case "activate":
            Toast.fire({
                icon: "success",
                title: message
            });
            break;
        default:
            break;
    }
};

function chooseGroupJob(is_edit = null, id_job = null, name_job = null) {

    var id_group_job = $("#id_sub").val();
    // var type_ahs = $("#type_ahs").val();

    $.ajax({
        url: `/admin/master-data/job/get-data-job`,
        method: "post",
        data: {id_group_job},
        success: function (response) {
            console.log(response)
            var data = response.data;
            var htmlJob = `<option value="">Pilih Pekerjaan</option>`;
            data.forEach(job => {
                let selected = '';
                if (job.id == id_job) {
                    selected = 'selected';
                }
                console.log([job.id, id_job])
                htmlJob += `<option ${selected} value="${job.id}">${job.job_name}</option>`;
            })
            $("#id_job").html(htmlJob)
            if (is_edit) {
                $("#id_job").val(id_job).trigger('change');
                // $("#select2-id_job-container").html(name_job);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });


}

function chooseGroupJobCopy(id, type, id_job, name_job) {


    if (id == null) {
        var id_group_job = $("#id_sub-copy").val();
        var type_ahs = $("#type_ahs-copy").val();

    } else {
        var id_group_job = id;
        var type_ahs = type;
    }

    $.ajax({
        url: `/admin/master-data/job/get-data-job`,
        method: "post",
        data: {id_group_job, type_ahs},
        success: function (response) {
            console.log(response)
            var data = response.data;
            var htmlJob = `<option value="">Pilih Pekerjaan`;
            data.forEach(job => {
                htmlJob += `<option value="${job.id}">${job.job_name}</option>`
            })
            htmlJob += `</option>`;

            $("#id_job-copy").html(htmlJob)
            $("#id_job-copy").val(id_job);
            $("#select2-id_job-copy-container").html(name_job);

        },
        error: function (err) {
            console.log(err);
        }
    });
}

function openPreviewAhsDetail() {
    let data = $('#show-data-detail-ahs');
    let previews = [];

    $.each(data.children(), function (i, obj) {
        $(this).children().eq(0).text();
        let item = {
            tipe: $(this).children().eq(0).text(),
            tipe_id: tipeId($(this).children().eq(0).text()),
            nama: $(this).children().eq(1).text(),
            satuan: $(this).children().eq(2).text(),
            harga_text: $(this).children().eq(3).text(),
            harga_real: $(this).children().eq(3).data('price'),
            koefisien: $(this).children().eq(4).children().eq(0).val(),
        }
        previews.push(item);
    });
    let sortedData = _.sortBy(previews, 'tipe_id');
    let groupedData = _.groupBy(sortedData, 'tipe_id');
    console.log(groupedData);
    let html = '';
    let firstId = -1;
    let grandTotal = 0;
    $.each(groupedData, function (ia, oa) {
        let subtotal = 0;
        if (ia == 1) {
            html += previewHeader('A', 'BAHAN');
        }
        if (ia == 2) {
            html += previewHeader('B', 'TENAGA');
        }
        if (ia == 3) {
            html += previewHeader('C', 'PERALATAN');
        }
        $.each(oa, function (ib, ob) {
            let jumlahHarga = parseFloat(ob.harga_real) * parseFloat(ob.koefisien);
            subtotal += jumlahHarga;
            grandTotal += jumlahHarga;
            html += "<tr>";
            html += `<td>-</td>`;
            html += `<td>${ob.nama}</td>`;
            html += `<td>${ob.satuan}</td>`;
            html += `<td class="text-right">${ob.koefisien}</td>`;
            html += `<td class="text-right">Rp. ${formatRibuan(ob.harga_real)}</td>`;
            html += `<td class="text-right">Rp. ${formatRibuan(jumlahHarga)}</td>`;
            html += "</tr>";
        });
        if (ia == 1) {
            html += previewFooter('JUMLAH HARGA BAHAN', subtotal);
        }
        if (ia == 2) {
            html += previewFooter('JUMLAH TENAGA KERJA', subtotal);
        }
        if (ia == 3) {
            html += previewFooter('JUMLAH HARGA ALAT', subtotal);
        }
    });
    html += "<tr class='bg-dark text-white'>";
    html += `<td colspan="5" class="text-center"><b>JUMLAH</b></td>`;
    html += `<td class="text-right"><b>${formatRibuan(grandTotal)}</b></td>`;
    html += "</tr>";
    $('#body-preview-detail-ahs').empty().html(html);
    $('#modal-detail-ahs').modal('show');
}

function previewHeader(order, title) {
    let html = "<tr class='bg-dark text-white'>";
    html += `<td><b>${order}</b></td>`;
    html += `<td colspan="5"><b>${title}</b></td>`;
    html += "</tr>";
    return html;
}

function previewFooter(title, subtotal) {
    let html = `<tr>`;
    html += `<td></td>`;
    html += `<td></td>`;
    html += `<td></td>`;
    html += `<td colspan="2"><b>${title}</b></td>`;
    html += `<td class="text-right">Rp. ${formatRibuan(subtotal)}</td>`;
    html += `</tr>`;
    return html;
}

function tipeId(type) {
    let result = 1;
    if (type == "Tenaga") {
        result = 2;
    } else if (type == "Alat") {
        result = 3;
    }
    return result;

}
