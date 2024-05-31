$(document).ready(function () {
    displayData();
});


const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function displayData(id = null, type = null) {
    $.ajax({
        url: `/admin/rancangan-anggaran-biaya/rab/create`,
        method: "get",
        success: async function (response) {
            await $("#list-data-rab").html(response)
            await $("#table-rab").DataTable();
        },
        error: function (err) {
            console.log(err);
        }
    });

}


var masterData = [];

var master_ahsMaster = [];

function getMasterData() {
    $.ajax({
        url: `/admin/rancangan-anggaran-biaya/rab/get-data/master-data`,
        method: "get",
        success: async function (response) {
            var {
                structures,
                floors,
                task_subs,
                projects,
                ahs_masters
            } = masterData = response.data;

            master_ahsMaster = ahs_masters;
            // Project
            var html_project = `<option>--Silahkan Pilih Projek--</option>`;
            projects.forEach(project => {
                html_project +=
                    `<option value="${project.id_project}">${project.name}</option>`;
            })
            $("#id_project").html(html_project);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getDataList(id, array, type, id_2 = null, id_3 = null) {
    switch (type) {
        case 'structure':
            for (var i = 0; i < array.length; i++) {
                console.log(array[i])
                if (array[i].id_structure === id) {
                    return array[i];
                }
            }
            break;
        case 'floor':
            for (var i = 0; i < array.length; i++) {
                if (array[i].id_floor == id && array[i].id_structure == id_2) {
                    return array[i];
                }
            }
            break;
        case 'task':
            for (var i = 0; i < array.length; i++) {
                if (array[i].id_floor == id && array[i].id_structure == id_2 && array[i].id_task == id_3) {
                    return array[i];
                }
            }
            break;
        default:
            break;
    }

}

var structureData = [];
var floorData = [];
var taskData = [];
var ahsData = [];

function chooseData(type, id = null) {
    switch (type) {
        case 'structure':
            $(`#row-${type}-${id}`).remove();
            var resultObject = getDataList(id, masterData['structures'], 'structure');
            var html_structure_selected = `<tr id="row-${type}-${id}-selected">
                <td>${id}</td>
                <td>${resultObject.name}</td>
                <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteData('structure', ${id})"><span
                    class="fe fe-trash fe-16"></span></button></td>
            </tr>`;
            $("#show-data-detail-structure").append(html_structure_selected);
            var data = {
                id_structure: id,
                name: resultObject.name
            }
            structureData.push(data);
            break;

        case 'floor':
            var id_structure = $("#floor-structure-id_structure").val();
            var id_floor = $('#floor-id_floor').val();

            if (id_floor == "") {
                Toast.fire({
                    icon: "error",
                    title: `Silahkan pilih Lantai`
                });
                return;
            }

            var floor_name = $('#floor-id_floor').find(":selected").text();
            var resultObject = getDataList(parseInt(id_structure), masterData['structures'], 'structure');

            // Check Exist Building & Floor
            if (document.getElementById(`row-structure-${id_structure}-floor-${id_floor}-selected`)) {
                Toast.fire({
                    icon: "error",
                    title: `Data Gedung ${resultObject.name} dan Lantai ${floor_name} sudah terpilih`
                });
                return;
            }
            var html_floor_selected = `<tr id="row-structure-${id_structure}-floor-${id_floor}-selected" class="structure-${id_structure} floor-${id_floor}">
            <td>${id_floor}</td>
            <td>${resultObject.name}</td>
            <td>${floor_name}</td>
            <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteData('floor', ${id_floor}, ${id_structure})"><span
                class="fe fe-trash fe-16"></span></button></td>
        </tr>`;

            $("#show-data-detail-floor").append(html_floor_selected)
            $("#input-structure-floor").hide();

            var data = {
                id_structure: id_structure,
                name_structure: resultObject.name,
                id_floor: id_floor,
                name_floor: floor_name
            }
            floorData.push(data);
            $('#floor-id_floor').val('');

            break;

        case 'task':
            var id_structure = $("#task-floor-structure-id_structure").val();
            var id_floor = $('#task-floor-id_floor').val();
            var id_task = $('#task-id_sub').val();
            var resultObject = getDataList(id_floor, floorData, 'floor', id_structure);
            var structure_name = resultObject.name_structure
            var floor_name = resultObject.name_floor;
            var task_name = $('#task-id_sub').find(":selected").text();

            if (id_task == "") {
                Toast.fire({
                    icon: "error",
                    title: `Silahkan pilih Grup Pekerjaan`
                });
                return;
            }

            // Check Exist Building & Floor
            if (document.getElementById(`row-${type}-${id_task}-floor-${id_floor}-structure-${id_structure}-selected`)) {
                Toast.fire({
                    icon: "error",
                    title: `Data Gedung ${structure_name}, Lantai ${floor_name} dan Grup Pekerjaan ${task_name} sudah terpilih`
                });
                return;
            }

            var html_task_selected = `<tr id="row-${type}-${id_task}-floor-${id_floor}-structure-${id_structure}-selected" class="structure-${id_structure}-${id_floor} floor-${id_floor} task-${id_task}">
                <td>${id_task}</td>
                <td>${structure_name}</td>
                <td>${floor_name}</td>
                <td>${task_name}</td>
                <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteData('task', ${id_floor}, ${id_structure}, ${id_task})"><span
                    class="fe fe-trash fe-16"></span></button></td>
            </tr>`;



            $("#show-data-detail-task").append(html_task_selected)
            $("#input-floor-task").hide();

            var data = {
                id_structure: id_structure,
                name_structure: structure_name,
                id_floor: id_floor,
                name_floor: floor_name,
                id_task: id_task,
                name_task: task_name
            }
            taskData.push(data);
            $('#task-id_sub').val('');
            break;

        case 'ahs':
            var id_structure = $("#ahs-task-floor-structure-id_structure").val();
            var id_floor = $('#ahs-task-floor-id_floor').val();
            var id_task = $('#ahs-task-id_sub').val();
            var id_ahs = $('#data-ahs').val();
            if (id_ahs == "") {
                Toast.fire({
                    icon: "error",
                    title: `Silahkan pilih AHS terlebih dahulu`
                });
                return;
            }


            var structure_name = $("#ahs-task-floor-structure-name").val();
            var floor_name = $("#ahs-task-floor-name").val();
            var task_name = $('#ahs-task-name').val()
            var ahs_name = $('#data-ahs').find(":selected").text();
            var notes_ahs = $("#notes-ahs").val();

            // HP
            var hsp = $("#hsp_main").val()
            var volume = $("#volume_main").val()
            var penyesuaian = $("#penyesuaian_main").val()
            var hp = $("#hp_main").val()
            var hp_penyesuaian = $("#hp_penyesuaian_main").val()


            // Check Exist Building & Floor
            if (document.getElementById(`row-${type}-${id_ahs}-task-${id_task}-floor-${id_floor}-structure-${id_structure}-selected`)) {
                Toast.fire({
                    icon: "error",
                    title: `Data AHS ${ahs_name} telah terdapat pada Gedung ${structure_name}, Lantai ${floor_name} dan Grup Pekerjaan ${task_name} `
                });
                return;
            }

            var html_ahs_selected = `<tr id="row-${type}-${id_ahs}-task-${id_task}-floor-${id_floor}-structure-${id_structure}-selected"  class="structure-${id_structure}-${id_floor}-${id_task} floor-${id_floor} task-${id_task}">            
            <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteData('task', ${id_task})"><span
            class="fe fe-trash fe-16"></span></button></td>
            <td>${structure_name}</td>
            <td>${floor_name}</td>
            <td>${task_name}</td>
            <td>${ahs_name}</td>
            <td>${numberWithCommas(hsp)}</td>
            <td><input class="form-control form-control-sm px-1" style="font-size:12px" id="volume-${id_structure}-${id_floor}-${id_task}-${id_ahs}" onchange="calculateVolume('${id_structure}-${id_floor}-${id_task}-${id_ahs}')" value="${volume}"/></td>
            <td><input class="form-control form-control-sm px-1" style="font-size:12px" value="${penyesuaian}" /></td>
            <td><input class="form-control readonly form-control-sm" style="font-size:12px" value="${hp}"  /></td>
            <td><input class="form-control readonly form-control-sm" style="font-size:12px" value="${hp_penyesuaian}"  /></td>
            </tr>`;
            $("#show-data-detail-ahs").append(html_ahs_selected)
            $("#input-task-ahs").hide();

            var data = {
                id_structure: id_structure,
                name_structure: structure_name,
                id_floor: id_floor,
                name_floor: floor_name,
                id_task: id_task,
                name_task: task_name,
                id_ahs: id_ahs,
                name_ahs: ahs_name,
                notes_ahs: notes_ahs,
                hsp: hsp,
                volume: volume,
                penyesuaian: penyesuaian,
                hp: hp,
                hp_penyesuaian: hp_penyesuaian,
            }
            ahsData.push(data);
            break;

        default:
            break;

    }
}

function deleteData(type, id, id_2 = null, id_3 = null, id_4 = null) {

    switch (type) {
        case 'structure':
            Swal.fire({
                title: "Yakin akan menghapus data Gedung?",
                text: "Data gedung yang dihapus akan mempengaruhi penghapusan data pada Lantai, Grup Pekerjaan dan AHS",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, saya yakin!"
            }).then(result => {
                if (result.isConfirmed) {
                    $(`#row-${type}-${id}-selected`).remove();
                    var resultObject = getDataList(id, masterData['structures'], 'structure');
                    html_structure = `<tr id="row-structure-${id}">
                        <td>${id}</td>
                        <td>${resultObject.name}</td>
                        <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="chooseData('structure', ${id})"><span
                            class="fe fe-plus fe-16"></span></button></td>
                    </tr>`;
                    $("#show-data-structure").append(html_structure);
                    structureData = structureData.filter(data => !(data.id_structure == id));
                    // DELETE FLOOR, GRUP , AHS
                    $(`.structure-${id}`).remove();
                    floorData = floorData.filter(data => !(data.id_structure == id));
                    taskData = taskData.filter(data => !(data.id_structure == id));
                    ahsData = ahsData.filter(data => !(data.id_structure == id));
                }
            });

            break;

        case 'floor':
            Swal.fire({
                title: "Yakin akan menghapus data Lantai?",
                text: "Data lantai yang dihapus akan mempengaruhi penghapusan data pada Grup Pekerjaan dan AHS",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, saya yakin!"
            }).then(result => {
                if (result.isConfirmed) {
                    $(`#row-structure-${id_2}-floor-${id}-selected`).remove();
                    floorData = floorData.filter(data => !(data.id_floor == id && data.id_structure == id_2));
                    taskData = taskData.filter(data => !(data.id_floor == id && data.id_structure == id_2));
                    ahsData = ahsData.filter(data => !(data.id_floor == id && data.id_structure == id_2));

                    $(`.structure-${id_2}-${id}`).remove();

                }
            });

            break;

        case 'task':
            Swal.fire({
                title: "Yakin akan menghapus data Grup Pekerjaan?",
                text: "Data lantai yang dihapus akan mempengaruhi penghapusan data pada AHS",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, saya yakin!"
            }).then(result => {
                if (result.isConfirmed) {
                    $(`#row-task-${id_3}-floor-${id}-structure-${id_2}-selected`).remove();

                    
                    taskData = taskData.filter(data => !(data.id_floor == id && data.id_structure == id_2 && data.id_task == id_3));
                    ahsData = ahsData.filter(data => !(data.id_floor == id && data.id_structure == id_2 && data.id_task == id_3));
                    
                    $(`.structure-${id_2}-${id}-${id_3}`).remove();

                }
            });

            break;


        default:
            break;

    }
}


function openModal(data, type, id = null) {
    if (type == 'add') {
        $("#list-data-rab").hide();
        $("#btn-add-ahs").hide();
        $("#form-rab").show();
        $("#btn-back-ahs").show()
        $("#btn-save-ahs").show();
        // $.ajax({
        //     url: `/admin/analisis-harga-satuan/rab/generate/code`,
        //     type: "get",
        //     success: async function (response) {
        //         $("#kode").val(response)
        //     },
        //     error: async function (err) {
        //         console.log(err);
        //     }
        // });
        getMasterData()
    } else if (type == 'back') {
        $("#form-rab").hide();
        $("#btn-back-ahs").hide();
        $("#btn-save-ahs").hide();
        $("#list-data-rab").show();
        $("#btn-add-ahs").show();
    } else if (type == 'copy') {
        $("#modal-rab").modal('show')
    }
}

function getDataTab(type) {
    $(".form-input-data").hide();
    switch (type) {
        case 'structure':
            var html_structure = ``;
            if (structureData.length !== 0) {
                structureDataFilter = [];
                structureData.forEach(structureExist => {
                    id_structure_exist = structureExist.id_structure;
                    masterData.structures.forEach(structure => {
                        if (structure.id_structure !== id_structure_exist) {
                            var data = {
                                id_structure: structure.id_structure,
                                name: structure.name
                            }
                            structureDataFilter.push(data)
                        }
                    })
                })
                // console.log(structureDataFilter)
                structureDataFilter.forEach(structure => {
                    html_structure += `<tr id="row-structure-${structure.id_structure}">
                    <td>${structure.id_structure}</td>
                    <td>${structure.name}</td>
                    <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="chooseData('structure', ${structure.id_structure})"><span
                        class="fe fe-plus fe-16"></span></button></td>
                </tr>`;
                })
            } else {
                masterData.structures.forEach(structure => {
                    html_structure += `<tr id="row-structure-${structure.id_structure}">
                    <td>${structure.id_structure}</td>
                    <td>${structure.name}</td>
                    <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="chooseData('structure', ${structure.id_structure})"><span
                        class="fe fe-plus fe-16"></span></button></td>
                </tr>`;
                })
            }

            $("#show-data-structure").html(html_structure);
            break;
        case 'floor':
            var html_structure_detail = ``;
            structureData.forEach(structure => {
                html_structure_detail += `<tr id="row-structure-floor-${structure.id_structure}">
                <td>${structure.id_structure}</td>
                <td>${structure.name}</td>
                <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="addData('structure', ${structure.id_structure})"><span
                    class="fe fe-plus fe-16"></span></button></td>
            </tr>`;
            })
            $("#show-data-floor-structure").html(html_structure_detail);
            break;
        case 'task-sub':
            var html_floor_detail = ``;
            floorData.forEach(floor => {
                html_floor_detail += `<tr id="row-structure-${floor.id_structure}-floor-${floor.id_floor}-task">
                <td>${floor.id_floor}</td>
                <td>${floor.name_structure}</td>
                <td>${floor.name_floor}</td>
                <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="addData('floor', ${floor.id_floor},${floor.id_structure} )"><span
                    class="fe fe-plus fe-16"></span></button></td>
            </tr>`;
            })
            $("#show-data-task-floor").html(html_floor_detail);
            break;
        case 'ahs':
            console.log(taskData)
            var html_ahs_detail = ``;
            taskData.forEach(task => {
                console.log(task)
                html_ahs_detail += `<tr id="row-structure-floor-task-ahs-${task.id_task}">
                <td>${task.id_floor}</td>
                <td>${task.name_structure}</td>
                <td>${task.name_floor}</td>
                <td>${task.name_task}</td>
                <td><button type="button" class="btn btn-sm btn-outline-primary" onclick="addData('task', ${task.id_floor},${task.id_structure}, ${task.id_task} )"><span
                    class="fe fe-plus fe-16"></span></button></td>
            </tr>`;
            })
            $("#show-data-ahs-task").html(html_ahs_detail);
            break;
    }
}


function addData(type, id, id_2 = null, id_3 = null) {
    switch (type) {
        case 'structure':
            $("#input-structure-floor").show();
            var structure = getDataList(id, structureData, 'structure');
            $("#floor-structure-name").val(structure.name);
            $("#floor-structure-id_structure").val(structure.id_structure);
            break;
        case 'floor':
            $("#input-floor-task").show();
            var floor = getDataList(id, floorData, 'floor', id_2);
            $("#task-floor-structure-name").val(floor.name_structure);
            $("#task-floor-structure-id_structure").val(floor.id_structure);
            $("#task-floor-name").val(floor.name_floor);
            $("#task-floor-id_floor").val(floor.id_floor);
            break;
        case 'task':
            $("#input-task-ahs").show();
            var task = getDataList(id, taskData, 'task', id_2, id_3);
            $("#ahs-task-floor-structure-name").val(task.name_structure);
            $("#ahs-task-floor-name").val(task.name_floor);
            $("#ahs-task-name").val(task.name_task);

            $("#ahs-task-floor-structure-id_structure").val(id_2);
            $("#ahs-task-floor-id_floor").val(id);
            $("#ahs-task-id_sub").val(id_3);

            var html_ahs_master = `<option value="">--Pilih AHS--</option>`;
            var ahs_master_filter = []
            ahs_master_filter = masterData.ahs_masters.filter(data => (data.name_sub == task.name_task));
            console.log(ahs_master_filter)

            ahs_master_filter.forEach(ahs_master => {
                html_ahs_master += `<option value="${ahs_master.id_ahs}">${ahs_master.name_job}</option>`;
            })
            $("#data-ahs").html(html_ahs_master);

            $("#hsp_main").val('')
            $("#volume_main").val('')
            $("#penyesuaian_main").val('')
            $("#hp_main").val('')
            $("#hp_penyesuaian_main").val('')
            break;
    }
}

function cancelData(type) {
    switch (type) {
        case 'structure':
            $("#input-structure-floor").hide();
            break;
    }
}

function getDetailAHS() {
    var id_ahs = $('#data-ahs').val();
    master_ahsMaster.forEach(ahs_master => {
        var id_ahs_master = ahs_master.id_ahs;
        if (id_ahs_master == id_ahs) {
            var hsp = ahs_master.total;
            $("#hsp_main").val(numberWithCommas(hsp))
            return;
        }
    })
}

function submitRAB() {
    console.log(ahsData);
}

function calculateVolume(identity) {
    var arrIdentity = identity.split("-");
    var id_structure = arrIdentity[0];
    var id_floor = arrIdentity[1];
    var id_task = arrIdentity[2];
    var id_ahs = arrIdentity[3];
    ahsData.forEach(ahs => {
        if (ahs.id_structure == id_structure && ahs.id_floor == id_floor && ahs.id_task == id_task && ahs.id_ahs == id_ahs) {
            var volume = $(`#volume-${identity}`).val();
            ahs.volume = volume;
            return;
        }
    })
}
