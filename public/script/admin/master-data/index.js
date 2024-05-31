


$(document).ready(function () {
    displayData();

});





$('.input-price').mask('000.000.000.000');

function reset() {
    location.reload();
}


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

const getUrl = () => {
    var url = window.location.href;
    var arr = url.split("/");
    var data = arr[5];
    return data;
};

const data = getUrl();



function setCityLoc() {
    var store = $("#id_store").val();
    var province_material_section = document.getElementById("province_material_section");
    var city_material_section = document.getElementById("city_material_section");

    if (store !== "-1") {

        province_material_section.style.display = "none";
        city_material_section.style.display = "none"
        location_material_section.style.display = "block"

        $.ajax({
            url: '/admin/master-data/store/get-city',
            data: { store: store },
            type: "post",
            success: function (response) {
                // console.log(response.data.city.name);
                $("#location").val(response.data.city.name);
            }

        });
    } else {

        $("#select2-id_province-container").html("--Pilih Provinsi--");
        $("#select2-id_city-container").html("--Pilih Kota--");
        location_material_section.style.display = "none";
        province_material_section.style.display = "block";
        city_material_section.style.display = "block"

    }


}


function getFilterJob() {
    var filter_class_job = $("#filter-kelas-pekerjaan").val()
    var filter_group_job = $("#filter-group-pekerjaan").val()


    dataFilter = {
        class_job: filter_class_job,
        group_job: filter_group_job
    }

    $.ajax({
        url: '/admin/master-data/job/create',
        data: dataFilter,
        success: function (response) {
            console.log(response);
            $(`#data-${data}`).empty().html(response);
            $(`#table-${data}`).DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }

    });


}


function getFilterProject() {
    var filter_tipe = $("#filter-type-project").val();
    var filter_pemilik = $("#filter-owner-project").val();
    var filter_date = $("#filter-date-project").val();
    var filter_estimation = $("#filter-estimation-project").val();
    var filter_kota = $("#filter-kota-project").val();

    dataFilter = {
        tipe: filter_tipe,
        pemilik: filter_pemilik,
        date: filter_date,
        estimation: filter_estimation,
        kota: filter_kota
    };

    $.ajax({
        url: '/admin/master-data/project/create',
        data: dataFilter,
        success: function (response) {
            $(`#data-${data}`).empty().html(response);
            $(`#table-${data}`).DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }

    });


}

function getFilterMaterial() {
    var filter_klasifikasi = $("#filter-klasifikasi-material").val();
    var filter_nama = $("#filter-nama-material").val();
    var filter_spesifikasi = $("#filter-spesifikasi-material").val();
    var filter_tipe = $("#filter-tipe-material").val();
    var filter_merk = $("#filter-merk-material").val();
    var filter_kota = $("#filter-kota-material").val();

    dataFilter = {
        klasifikasi: filter_klasifikasi,
        nama: filter_nama,
        spesifikasi: filter_spesifikasi,
        tipe: filter_tipe,
        merk: filter_merk,
        kota: filter_kota
    };


    $.ajax({
        url: '/admin/master-data/material/create',
        data: dataFilter,
        success: function (response) {
            console.log(response);
            $(`#data-${data}`).empty().html(response);
            $(`#table-${data}`).DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}




function getFilterStore() {
    var filter_bahan = $("#filter-bahan-store").val();
    var filter_pemilik_store = $("#filter-pemilik-store").val();
    var filter_kota_store = $("#filter-kota-store").val();
    var filter_no_telp_store = $("#filter-no_telp-store").val();

    var dataFilter = {
        bahan: filter_bahan,
        pemilik: filter_pemilik_store,
        kota: filter_kota_store,
        no_telp: filter_no_telp_store
    }
    $.ajax({
        url: `/admin/master-data/store/create`,
        data: dataFilter,
        success: function (response) {
            // $(`#table-${data}`).DataTable().clear().destroy();
            $(`#data-${data}`).empty().html(response);
            $(`#table-${data}`).DataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

}

function clearSelectOption(data, placeholder, type) {
    document.getElementById(`${data}`).selectedIndex = 0;
    $(`#select2-${data}-container`).html(`${placeholder}`);

    switch (type) {
        case 'store':
            getFilterStore();
            break;
        case 'material':
            getFilterMaterial();
            break;
        case 'project':
            getFilterProject();
            break;
        case 'job':
            getFilterJob();
            break;

    }

}

function clearInput(data, type) {
    document.getElementById(`${data}`).value = " ";


    switch (type) {
        case 'store':
            getFilterStore();
            break;
        case 'material':
            getFilterMaterial();
            break;
        case 'project':
            getFilterProject();
            break;

    }
}



function getCities(id_pro, id_city, name_city) {

    var id_province = "";
    id_pro == null ? id_province = $("#id_province").val() : id_province = id_pro;


    $.ajax({
        url: '/admin/master-data/city/get-cities',
        method: 'get',
        data: { id_province: id_province },
        dataType: 'json',
        success: function (response) {

            var html = "";
            select = "<option selected disabled>--Pilih Kota--</option>";
            response.data.forEach(element => {
                html += "<option value=" + element.id + ">" + element.name + "</option>";
            });

            if (id_pro == null) {
                $("#id_city").html(select + html);
            } else {
                $("#id_city").html(select + html);
                $("#id_city").val(id_city);
                $("#select2-id_city-container").html(name_city);
            }
        }
    });
}



function displayData(id = null, data_search = null, type = null) {
    $.ajax({
        url: `/admin/master-data/${data}/create`,
        method: "get",
        success: async function (response) {
            console.log(response)
            await $(`#data-${data}`).html(response);
            let table = await $(`#table-${data}`).DataTable();
            $(`#row-${data}-${id}`).addClass("success-alert");
            setTimeout(() => {
                $(`#row-${data}-${id}`).removeClass("success-alert");
            }, 3000);
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function setKlasifikasi(id_classification, name_classification, cat) {

    var category = "";
    id_classification == null ? category = $("#category").val() : category = cat;


    $.ajax({
        url: `/admin/master-data/${data}/get-klasifikasi`,
        type: "post",
        data: { category: category },


        success: async function (response) {
            html = "";
            select = "<option selected value='' disabled>--Pilih Klasifikasi Bahan/Tenaga--</option>";

            response.data.forEach(element => {
                html += "<option value=" + element.id + " >" + element.name + "</option>";
            });


            if (id_classification == null) {

                $("#id_classification").html(select + html);
            } else {

                $("#id_classification").html(select + html);
                $("#id_classification").val(id_classification);
                $("#select2-id_classification-container").html(name_classification);
            }

        }
    });
}

function getProjectTypeCode() {
    var option = document.getElementById("type_project_group");
    var project_type = option.value;
    var project_type_code = $("#type_project_group").find('option:selected').attr('data-code');


    $.ajax({
        url: `/admin/master-data/${data}/get-code`,
        type: "post",
        data: {
            project_type: project_type,
            code: project_type_code
        },
        dataType: "json",

        success: async function (response) {
            $("#type_project_code").val(response.data);

        },
        error: async function (err) {
            console.log(err);
            let err_log = err.responseJSON.errors;
            await handleError(err, err_log, data);
        }
    });
}


function openModal(data, type, id = null) {
    console.log("Test");
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
            if (data == 'store') {
                $("#id_city_error").text("");
                $("#select2-type-container").html('--Pilih Tipe Bahan--');
                $("#select2-id_province-container").html('--Pilih Provinsi--');
                $("#select2-id_city-container").html('--Pilih Kota--');
            } else if (data == 'material') {
                $("#id_city_error").text("");
                document.getElementById("province_material_section").style.display = "none";
                document.getElementById("location_material_section").style.display = "none";
                document.getElementById("city_material_section").style.display = "none";
                $("#select2-id_province-container").html("--Pilih Provinsi--");
                $("#select2-id_city-container").html("--Pilih Kota--");
                $("#select2-id_store-container").html('--Silahkan Pilih Toko--');
                $("#select2-id_satuan-container").html('----');
                $("#select2-id_classification-container").html('--Pilih Klasifikasi Bahan/Tenaga--');
            } else if (data == 'job') {
                $("#select2-type_job-container").html('-Silahkan Pilih Tipe Pekerjaan--');
                $("#select2-id_group_job-container").html('--Silahkan Pilih Group Pekerjaan--');
                $("#select2-id_unit-container").html('--Pilih Satuan Pekerjaan--');
            } else if (data == 'project') {
                $("#select2-id_province-container").html('--Pilih Provinsi--');
                $("#select2-id_city-container").html('--Pilih Kota--');
                $("#id_city_error").text("");
            } else if (data == 'klasifikasi-bahan') {
                $("#select2-category-container").html('--Silahkan Pilih Kategori Klasifikasi--');
            }

            $.ajax({
                url: `/admin/master-data/${data}/code`,
                method: "get",
                dataType: "json",
                success: async function (response) {
                    console.log("Code: "+response);
                    if (data == 'store' || data == 'material' || data == 'project') {
                        await $(`#kode`).val(response.data);
                    } else if (data == 'job') {
                        await $('#job_code').val(response.data);
                    } else if (data == 'class-job') {
                        await $('#cj_code').val(response.data);
                    } else if (data == 'group-job') {
                        await $('#gj_code').val(response.data);
                    } else if (data == 'grid') {
                        await $('#grid_code').val(response.data);
                    } else if (data == 'departemen') {
                        await $('#departemen_code').val(response.data);
                    } else if (data == 'jabatan') {
                        await $('#jabatan_code').val(response.data);
                    } else if (data == 'dokumen') {
                        await $('#dokumen_code').val(response.data);
                    }else if (data == 'account') {
                        await $('#account_code').val(response.data);
                    }else if (data == 'akun') {
                        await $('#code').val(response.data);
                    }else if (data == 'sub-account') {
                        await $('#sub_account_code').val(response.data);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
            break;
        case "edit":
            $(`#edit-${data}`).show();
            $(`#add-${data}`).hide();

            if(data == 'project' || data == 'store' || data == 'material'){
                $("#id_city_error").text("");
            }

            $.ajax({
                url: `/admin/master-data/${data}/${id}/edit`,
                method: "get",
                dataType: "json",
                success: async function (response) {
                    // console.log(response.data);
                    await fetchData(data, response.data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
            break;
        case "detail":
            $.ajax({
                url: `/admin/master-data/${data}/${id}/edit`,
                method: "get",
                dataType: "json",
                success: async function (response) {
                    await fetchData(data, response.data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
            $(`#modal-detail-${data}`).LoadingOverlay("hide");
            break;
        default:
            break;
    }
}

const successResponse = (type, data, message, id = null) => {
    $(`#modal-${data}`).modal("hide");
    $(`#form-${data}`).unbind("submit");
    displayData(id);
    switch (type) {
        case "add":
            $(`#add-${data}`).attr("disabled", false);
            $(`#form-${data}`)[0].reset();
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

function manageData(type, id = null) {
    switch (type) {
        case "save":
            let form = $(`#form-${data}`);
            if (form.valid()) {

                $(`#form-${data}`).submit(function (e) {
                    $(`#add-${data}`).attr("disabled", true);
                    e.preventDefault();
                    if (data == 'job') {
                        var id_class = $("#id_group_job").find('option:selected').attr('data-id-class');
                        var unit_alias = $('#id_unit option:selected').text();
                        var group_job_name = $('#id_group_job option:selected').text();
                        $('#unit_alias').val(unit_alias);
                        $('#id_class').val(id_class);
                        $('#gj_name').val(group_job_name);
                    }
                    var formData = new FormData(this);
                    $.ajax({
                        url: `/admin/master-data/${data}`,
                        type: "post",
                        data: formData,
                        dataType: "json",
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: async function (response) {
                            console.log(response)
                            await successResponse(
                                "add",
                                data,
                                response.message,
                                response.data.id
                            );
                            // clgg
                        },
                        error: async function (err) {
                            console.log(err);
                            let err_log = err.responseJSON.errors;
                            await handleError(err, err_log, data);
                        }
                    });
                });
            }
            break;
        case "update":
            var id;
            if (data == 'building') {
                id = $("#id_structure").val()
            } else if (data == 'floor') {
                id = $("#id_groups").val()
            } else if (data == 'group-job') {
                id = $("#id").val()
            } else if (data == 'unit') {
                id = $("#id_satuan").val()
            } else if (data == 'store') {
                id = $("#id_store").val()
            } else if (data == 'material') {
                id = $("#id_material").val()
            } else if (data == 'project') {
                id = $("#id_project").val()
            } else if (data == 'job') {
                id = $("#id").val()
            } else if (data == 'class-job') {
                id = $("#id").val();
            } else if (data == 'grid') {
                id = $("#id").val();
            } else if (data == 'departemen') {
                id = $("#id").val();
            } else if (data == 'jabatan') {
                id = $("#id").val();
            } else if (data == 'dokumen') {
                id = $("#id").val();
            } else if (data == 'account') {
                id = $("#id").val();
            } else if (data == 'akun') {
                id = $("#id").val();
            } else if (data == 'sub-account') {
                id = $("#id").val();
            } else if (data == 'group-job') {
                id = $("#id").val();
            } else if (data == 'type-project') {
                id = $("#id").val();
            } else if (data == 'type-bahan') {
                id = $("#id").val();
            } else if (data == "ahs-profile") {
                id = $("#id").val();
            } else if (data == 'klasifikasi-bahan') {
                id = $("#id").val();
            } else if (data == 'besi-tulangan') {
                id = $("#id").val();
            }
            let formUpdate = $(`#form-${data}`);
            if (formUpdate.valid()) {
            $(`#form-${data}`).submit(function (e) {
                e.preventDefault();


                if (data == 'job') {
                    var id_class = $("#id_group_job").find('option:selected').attr('data-id-class');
                    var unit_alias = $('#id_unit option:selected').text();
                    var group_job_name = $('#id_group_job option:selected').text();
                    $('#unit_alias').val(unit_alias);
                    $('#id_class').val(id_class);
                    $('#gj_name').val(group_job_name);
                }

                var formData = $(`#form-${data}`).serialize();


                $.ajax({
                    url: `/admin/master-data/${data}/${id}`,
                    type: "patch",
                    data: formData,
                    dataType: "json",
                    success: async function (response) {

                        $(`#form-${data}`).unbind("submit");
                        await successResponse(
                            "edit",
                            data,
                            response.message,
                            response.data
                        );
                    },
                    error: async function (err) {
                        $(`#form-${data}`).unbind("submit");
                        console.log(err)
                        let err_log = err.responseJSON.errors;
                        await handleError(err, err_log, data);
                    }
                });
            });
        }
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
                    $.ajax({
                        url: `/admin/master-data/${data}/${id}`,
                        method: "delete",
                        // dataType: "json",
                        success: function (response) {
                            console.log(response);
                            if (response.status == 300) {
                                Toast.fire({
                                    icon: "error",
                                    title: response.message
                                });
                                return;
                            }

                            successResponse(
                                "delete",
                                data,
                                response.message,
                                response.data
                            );
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            });
            break;
        default:
            break;
    }
}


function handleError(err, err_log, type) {
    $(`#add-${type}`).attr("disabled", false);
    $(`#form-${type}`).unbind("submit");
    switch (type) {
        case "unit":
            if (err.status == 422) {
                if (typeof err_log.unit_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.unit_name[0]
                    });
                }
                if (typeof err_log.unit_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.unit_code[0]
                    });
                }
                if (typeof err_log.unit_alias !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.unit_alias[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "bank-account":
            if (err.status == 422) {
                if (typeof err_log.bank_account_holder !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_account_holder[0]
                    });
                }
                if (typeof err_log.bank_account !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_account[0]
                    });
                }
                if (typeof err_log.bank_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_name[0]
                    });
                }
                if (typeof err_log.bank_account_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_account_code[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "bank":
            if (err.status == 422) {

                if (typeof err_log.bank_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_name[0]
                    });
                }
                if (typeof err_log.bank_status !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_status[0]
                    });
                }
                if (typeof err_log.bank_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.bank_code[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "account":
            if (err.status == 422) {

                if (typeof err_log.account_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.account_name[0]
                    });
                }
                if (typeof err_log.account_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.account_code[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "sub-account":
            if (err.status == 422) {

                if (typeof err_log.sub_account_name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.sub_account_name[0]
                    });
                }
                if (typeof err_log.sub_account_code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.sub_account_code[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "akun":
            if (err.status == 422) {

                if (typeof err_log.name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.name[0]
                    });
                }
                if (typeof err_log.code !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.code[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "floor":
            if (err.status == 422) {

                if (typeof err_log.name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.name[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        case "group-job":
            if (err.status == 422) {

                if (typeof err_log.name !== "undefined") {
                    Toast.fire({
                        icon: "error",
                        title: err_log.name[0]
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan Pada Sistem"
                });
            }
            break;
        default:
            break;
    }
}

function fetchData(data, response, type = null) {
    switch (data) {
        case "building":
            $("#id_structure").val(response.id_structure);
            $("#name").val(response.name);
            break;
        case "floor":
            $("#id_groups").val(response.id_groups);
            $("#name").val(response.name);
            break;
        case "group-job":
            $("#id").val(response.id);
            $("#gj_code").val(response.gj_code);
            $("#gj_name").val(response.gj_name);
            $("#id_class").val(response.id_class);
            break;
        case "class-job":
            $("#id").val(response.id);
            $("#cj_code").val(response.cj_code);
            $("#cj_name").val(response.cj_name);
            $("#cj_description").val(response.cj_description);
            break;
        case "grid":
            $("#id").val(response.id);
            $("#grid_code").val(response.grid_code);
            $("#grid_name").val(response.grid_name);
            $("#grid_description").val(response.grid_description);
            break;
        case "departemen":
            $("#id").val(response.id);
            $("#departemen_code").val(response.departemen_code);
            $("#departemen_name").val(response.departemen_name);
            $("#departemen_description").val(response.departemen_description);
            break;
        case "jabatan":
            $("#id").val(response.id);
            $("#jabatan_code").val(response.jabatan_code);
            $("#jabatan_name").val(response.jabatan_name);
            $("#jabatan_description").val(response.jabatan_description);
            break;
        case "dokumen":
            $("#id").val(response.id);
            $("#dokumen_code").val(response.dokumen_code);
            $("#dokumen_name").val(response.dokumen_name);
            $("#dokumen_description").val(response.dokumen_description);
            break;
        case "account":
            $("#id").val(response.id);
            $("#account_code").val(response.account_code);
            $("#account_name").val(response.account_name);
            $("#account_description").val(response.account_description);
            break;
        case "akun":
            $("#id").val(response.id);
            $("#code").val(response.code);
            $("#name").val(response.name);
            $("#parents").val(response.parents);
            $("#description").val(response.description);
            break;
        case "sub-account":
            $("#id").val(response.id);
            $("#sub_account_code").val(response.sub_account_code);
            $("#account_id").val(response.account_id);
            $("#sub_account_name").val(response.sub_account_name);
            $("#sub_account_description").val(response.sub_account_description);
            break;
        case "unit":
            $("#id_satuan").val(response.id_satuan);
            $("#name").val(response.name);
            break;
        case "store":
            $("#id_store").val(response.id_store);
            $("#kode").val(response.kode);
            $("#name").val(response.name);
            $("#address").val(response.address);
            $("#id_type").val(response.id_type);
            $("#select2-id_type-container").html(response.type.name)
            $("#no_telp").val(response.no_telp);
            $("#phone").val(response.phone);
            $("#owner").val(response.owner);
            getCities(response.id_province, response.id_city, response.city.name);
            $("#id_province").val(response.id_province);
            $("#select2-id_province-container").html(response.province.name);
            break;
        case "material":
            console.log(response);
            $("#id_material").val(response.id_material);
            if (response.store != null) {
                document.getElementById("location_material_section").style.display = "block";
                document.getElementById("province_material_section").style.display = "none";
                document.getElementById("city_material_section").style.display = "none";
                $("#select2-id_store-container").html(response.store.name)
                $("#id_store").val(response.store.id_store);
                $("#location").val(response.store.city.name);
            }
            if (response.store == null) {
                document.getElementById("location_material_section").style.display = "none";
                document.getElementById("province_material_section").style.display = "block";
                document.getElementById("city_material_section").style.display = "block";
                getCities(response.id_province, response.id_city, response.city.name);
                $("#id_province").val(response.id_province);
                $("#select2-id_province-container").html(response.province.name);
                $("#select2-id_store-container").html('Tidak Ada Toko')
                $("#id_store").val(-1);
            }
            $("#kode").val(response.kode);
            $("#name").val(response.name);
            $("#category").val(response.category);
            $("#select2-category-container").html(response.category);
            $("#type").val(response.type);
            setKlasifikasi(response.id_classification, response.classification, response.category);
            // $("#id_classification").val(response.id_classification);
            // $("#select2-id_classification-container").html(response.classification);
            $("#id_satuan").val(response.unit.id_satuan);
            $("#select2-id_satuan-container").html(response.unit.name);
            $("#price").val(response.price);
            $("#spesification").val(response.spesification);
            $("#merk").val(response.merk);
            break;
        case "project":
            console.log(response);
            $("#id_project").val(response.id_project);
            $("#kode").val(response.kode);
            $("#name").val(response.name);
            $("#type").val(response.type);
            $("#owner").val(response.owner);
            $("#date").val(response.date);
            $("#nominal").val(response.nominal);
            $("#address").val(response.address);
            $("#no_telp").val(response.no_telp);
            $("#estimation_time").val(response.estimation_time);
            $("#phone").val(response.phone);
            $("#end_date").val(response.end_date);
            $("#status").val(response.status);
            getCities(response.id_province, response.id_city, response.city.name);
            $("#id_province").val(response.id_province);
            $("#select2-id_province-container").html(response.province.name);
            $("#description").val(response.description);
            break;
        case "job":
            $("#id").val(response.id);
            $("#job_code").val(response.job_code);
            $("#job_name").val(response.job_name);
            $("#id_group_job").val(response.id_group_job);
            $("#select2-id_group_job-container").html(response.gj_name);
            $("#status").val(response.status);
            $("#id_unit").val(response.id_unit);
            $("#select2-id_unit-container").html(response.unit_alias)
            $("#details").val(response.details);
            $("#type_job").val(response.type_job);
            $("#select2-type_job-container").html(response.type_job);
            break;
        case "status":
            $("#id").val(response.id);
            $("#status_code").val(response.status_code);
            $("#status_name").val(response.status_name);
            $("#status_description").val(
                response.status_description
            );
            break;
        case "type-project":
            $("#type_project_group").val(response.type_project_group);
            $("#select2-type_project_group-container").html(response.type_project_group);
            $("#id").val(response.id);
            $("#type_project_code").val(response.type_project_code);
            $("#type_project_name").val(response.type_project_name);
            $("#type_project_description").val(
                response.type_project_description
            );
            break;
        case "type-bahan":
            $("#id").val(response.id);
            $("#name").val(response.name);
            break;
        case "ahs-profile":
            $("#id").val(response.id);
            $("#name").val(response.name);
            break;
        case "klasifikasi-bahan":
            $("#id").val(response.id);
            $("#category").val(response.category);
            $("#select2-category-container").html(response.category);
            $("#name").val(response.name);
            break;
        case "besi-tulangan":
            $("#id").val(response.id);
            $("#type").val(response.type).trigger('change');
            $("#code").val(response.code);
            $("#name").val(response.name);
            $("#diameter").val(response.diameter);
            $("#penampang_or_dimensi").val(response.penampang_or_dimensi);
            $("#berat_btg_or_lbr").val(response.berat_btg_or_lbr);
            $("#r-berat-m2").val(response.berat_m2);

            //For Detail
            $("#rtype").val(response.type).trigger('change');
            $("#rcode").val(response.code);
            $("#rname").val(response.name);
            $("#rdiameter").val(response.diameter);
            $("#rpenampang_or_dimensi").val(response.penampang_or_dimensi);
            $("#rberat_btg_or_lbr").val(response.berat_btg_or_lbr);
            $("#rberat_m2").val(response.berat_m2);
            break;
        default:
            break;
    }
}
