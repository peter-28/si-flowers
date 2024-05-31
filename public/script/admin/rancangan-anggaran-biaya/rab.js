$(document).ready(function () {
    displayData();
    // getLOVMaster();
    getDataFloor();
    getDataGroupJob();
    $("#cal_umum_precalculation").hide();
});
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});
const getUrl = () => {
    var url = window.location.href;
    var arr = url.split("/");
    var data = arr[5];
    return data;
};




function calculateUmumVolumeFootplate(table_id) {
    var deskripsi = document.getElementById("input_umum_v_footplate_deskripsi").value;
    var vol = parseFloat(document.getElementById("input_umum_v_footplate_volume").value);
    var u = parseFloat(document.getElementById("input_umum_v_footplate_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_v_footplate_satuan_pekerjaan").value;
    var volume = u * vol;

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_volume_footplate");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    console.log(table_id);
    umumInputTable(data_umum, table_id);
}


function getVolumeFootplate() {
    var a = parseFloat(document.getElementById("input_umum_v_footplate_a").value) || 1;
    var b = parseFloat(document.getElementById("input_umum_v_footplate_b").value) || 1;
    var c = parseFloat(document.getElementById("input_umum_v_footplate_c").value) || 1;
    var d = parseFloat(document.getElementById("input_umum_v_footplate_d").value) || 1;
    var t1 = parseFloat(document.getElementById("input_umum_v_footplate_t1").value) || 1;
    var t2 = parseFloat(document.getElementById("input_umum_v_footplate_t2").value) || 1;

    var vol1 = (1 / 6) * (t1 - t2) * ((a * b) + (a + b) + (c + d) + (a * b));
    var vol2 = a * b * t2;
    var volTotal = vol1 + vol2;
    document.getElementById("input_umum_v_footplate_volume").value = volTotal;

}


function changeVolumeFootplateImg() {
    var imgOption = document.getElementById("input_umum_v_fooplate_img_change").value;
    var imgTengah = document.getElementById("img_tengah");
    var imgTepi = document.getElementById("img_tepi");
    var imgSudut = document.getElementById("img_sudut");

    switch (imgOption) {
        case "tengah":
            imgTengah.style.display = "block";
            imgTepi.style.display = "none";
            imgSudut.style.display = "none";
            break;
        case "tepi":
            imgTengah.style.display = "none";
            imgTepi.style.display = "block";
            imgSudut.style.display = "none";
            break;
        case "sudut":
            imgTengah.style.display = "none";
            imgTepi.style.display = "none";
            imgSudut.style.display = "block";
            break;

    }
}


//Calculate umum volume limasan
function calculateUmumVolumeLimasan(table_id) {
    var deskripsi = document.getElementById("input_umum_v_limasan_deskripsi").value;
    var vol = parseFloat(document.getElementById("input_umum_v_limasan_volume").value);
    var u = parseFloat(document.getElementById("input_umum_v_limasan_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_v_limasan_satuan_pekerjaan").value;
    var volume = u * vol;

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_volume_limasan");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);

}



//getVolume volume limasan
function getVolumeLimasan() {
    var p = parseFloat(document.getElementById("input_umum_v_limasan_p").value) || 1;
    var l = parseFloat(document.getElementById("input_umum_v_limasan_l").value) || 1;
    var cos = parseFloat(document.getElementById("input_umum_v_limasan_cos").value) || 0;
    var volume = (p * l) * Math.cos(cos);
    document.getElementById("input_umum_v_limasan_volume").value = volume;
}

//Calculate umum m3c
function calculateUmumM3c(table_id) {
    var deskripsi = document.getElementById("input_umum_m3c_deskripsi").value;
    var luas = document.getElementById("input_umum_m3c_luas").value;
    var u = parseFloat(document.getElementById("input_umum_m3c_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_m3c_satuan_pekerjaan").value;
    var t = parseFloat(document.getElementById("input_umum_m3c_t").value);
    var volume = luas * u * t;

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_m3c");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);
}

//getLuas m3c
function getLuasM3c() {
    var r = parseFloat(document.getElementById("input_umum_m3c_r").value) || 1;
    var luas = (22 / 7) * (r * r);
    document.getElementById("input_umum_m3c_luas").value = luas.toFixed(3);
}


//Calculate umum m3b
function calculateUmumM3b(table_id) {
    var deskripsi = document.getElementById("input_umum_m3b_deskripsi").value;
    var luas = document.getElementById("input_umum_m3b_luas").value;
    var u = parseFloat(document.getElementById("input_umum_m3b_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_m3b_satuan_pekerjaan").value;
    var p = parseFloat(document.getElementById("input_umum_m3b_p").value);
    var volume = luas * u * p;

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_m3b");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);


}

//getLuas m3b
function getLuasM3b() {
    var inputb = parseFloat(document.getElementById("input_umum_m3b_b").value) || 1;
    var inputA = parseFloat(document.getElementById("input_umum_m3b_a").value) || 1;
    var inputT = parseFloat(document.getElementById("input_umum_m3b_t").value) || 1;
    document.getElementById("input_umum_m3b_luas").value = ((inputA + inputb) / 2) * inputT;

}


//Calculate umum m3a
function calculateUmumM3a(table_id) {
    var deskripsi = document.getElementById("input_umum_m3a_deskripsi").value;
    var p = parseFloat(document.getElementById("input_umum_m3a_p").value);
    var l = parseFloat(document.getElementById("input_umum_m3a_l").value);
    var t = parseFloat(document.getElementById("input_umum_m3a_t").value);
    var u = parseFloat(document.getElementById("input_umum_m3a_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_m3a_satuan_pekerjaan").value;
    var volume = p * l * t * u;


    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_m3a");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);


}

//getLuas m2c
function getLuasM2c() {
    var inputP = parseFloat(document.getElementById("input_umum_m2c_p").value) || 1;
    var inputL = parseFloat(document.getElementById("input_umum_m2c_l").value) || 1;
    var luas = inputP * inputL;
    document.getElementById("input_umum_m2c_luas").value = luas;

}


//Calculate umum m2c
function calculateUmumM2c(table_id) {
    var deskripsi = document.getElementById("input_umum_m2c_deskripsi").value;
    var luas = document.getElementById("input_umum_m2c_luas").value;
    var u = parseFloat(document.getElementById("input_umum_m2c_u").value) || 1;
    var satuan_pekerjaan = document.getElementById("input_umum_m2c_satuan_pekerjaan").value;
    var volume = luas * u;


    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_m2c");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);

}

//Calculate umum m2b
function calculateUmumM2b(table_id) {
    var deskripsi = document.getElementById("input_umum_m2b_deskripsi").value;
    var l = parseFloat(document.getElementById("input_umum_m2b_l").value);
    var t = parseFloat(document.getElementById("input_umum_m2b_t").value);
    var u = (document.getElementById("input_umum_m2b_u").value == "") ? 1 : document.getElementById("input_umum_m2b_u").value;
    var satuan_pekerjaan = document.getElementById("input_umum_m2b_satuan_pekerjaan").value;
    var volume = l * t * parseFloat(u);


    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi

    };

    var form = document.getElementById("umum_m2b");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);

}



//Calculate umum m2a
function calculateUmumM2a(table_id) {


    var deskripsi = document.getElementById("input_umum_m2a_deskripsi").value;
    var p = parseFloat(document.getElementById("input_umum_m2a_p").value);
    var l = parseFloat(document.getElementById("input_umum_m2a_l").value);
    var u = (document.getElementById("input_umum_m2a_u").value == "") ? 1 : document.getElementById("input_umum_m2a_u").value;
    var satuan_pekerjaan = document.getElementById("input_umum_m2a_satuan_pekerjaan").value;
    var volume = p * l * parseFloat(u);

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi

    };

    console.log(data_umum);

    var form = document.getElementById("umum_m2a");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);


}


//Calculate umum m'
function calculateUmumM(table_id) {

    var deskripsi = document.getElementById("input_umum_m_deskripsi").value;
    var p = parseFloat(document.getElementById("input_umum_m_p").value);
    var u = (document.getElementById("input_umum_m_unit").value == "") ? 1 : document.getElementById("input_umum_m_unit").value;
    var satuan_pekerjaan = document.getElementById("input_umum_m_satuan_pekerjaan").value;
    var volume = p * parseFloat(u);

    data_umum = {
        volume: volume,
        sp: satuan_pekerjaan,
        desk: deskripsi

    };

    var form = document.getElementById("umum_m");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);


}

//Calculate umum ls
function calculateUmumLs(table_id) {
    var u = document.getElementById("input_umum_ls_unit").value;
    var satuan_pekerjaan = document.getElementById("input_umum_ls_satuan_pekerjaan").value;
    var deskripsi = document.getElementById("input_umum_ls_deskripsi").value;

    data_umum = {
        volume: u,
        sp: satuan_pekerjaan,
        desk: deskripsi
    };

    var form = document.getElementById("umum_ls");
    var requiredInputs = form.querySelectorAll("input[required]");
    var requiredSelects = form.querySelectorAll("select[required]");


    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }


    for (var i = 0; i < requiredSelects.length; i++) {
        if (requiredSelects[i].value === "") {
            return;
        }
    }

    umumInputTable(data_umum, table_id);
}


//Input table
function umumInputTable(data_umum, table_id) {

    var html_row;
    var data = data_umum;

    var table = document.getElementById(`${table_id}`);

    html_row += "<tr>";
    html_row += "<td>" + (table.rows.length++ - 1) + "</td>"
    html_row += "<td>" + data.desk + "</td>"
    html_row += "<td>" + data.volume + "</td>"
    html_row += "<td>" + data.sp + "</td>"
    html_row += "</tr>"

    $(`#${table_id}_data`).append(html_row);

    updateFooter(table_id, data.sp);

}


function updateFooter(table_id, satuan) {
    var table = document.getElementById(`${table_id}`);
    var footerRow = table.tFoot.rows[0];
    var total = 0;
    for (var i = 1; i < table.rows.length - 1; i++) {
        total += parseFloat(table.rows[i].cells[2].innerHTML);
        console.log(parseFloat(table.rows[i].cells[2].innerHTML))
    }


    footerRow.cells[1].innerHTML = total.toFixed(2);
    footerRow.cells[2].innerHTML = satuan;
}



function changeSatuanUmum() {


    var satuan_umum = document.getElementById("cal_umum_satuan").value;
    var ls_page = document.getElementById("calculator_umum_page_ls");
    var m_page = document.getElementById("calculator_umum_page_m");
    var m2_a = document.getElementById("calculator_umum_page_m2_a");
    var m2_b = document.getElementById("calculator_umum_page_m2_b");
    var m2_c = document.getElementById("calculator_umum_page_m2_c");
    var m3_a = document.getElementById("calculator_umum_page_m3_a");
    var m3_b = document.getElementById("calculator_umum_page_m3_b");
    var m3_c = document.getElementById("calculator_umum_page_m3_c");
    var volume_limasan = document.getElementById("calculator_umum_page_volume_limasan");
    var volume_footplate = document.getElementById("calculator_umum_page_volume_footplate");



    switch (satuan_umum) {

        case "ls":
            document.getElementById("cal_umum_satuan_type_text").value = "Precalculation";
            ls_page.style.display = "block"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m'":
            document.getElementById("cal_umum_satuan_type_text").value = "Precalculation";
            ls_page.style.display = "none"
            m_page.style.display = "block"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m2-a":
            document.getElementById("cal_umum_satuan_type_text").value = "Precalculation";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "block"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m2-b":
            document.getElementById("cal_umum_satuan_type_text").value = "Precalculation";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "block"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m2-c":
            document.getElementById("cal_umum_satuan_type_text").value = "Atap Pelana";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "block"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m3-a'":
            document.getElementById("cal_umum_satuan_type_text").value = "Precalculation";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "block"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m3-b'":
            document.getElementById("cal_umum_satuan_type_text").value = "Trapesium";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "block"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "m3-c'":
            document.getElementById("cal_umum_satuan_type_text").value = "Lingkaran";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "block"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "none"
            break;

        case "volume_limasan":
            document.getElementById("cal_umum_satuan_type_text").value = "Atap Pelana";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "block"
            volume_footplate.style.display = "none"
            break;

        case "volume_footplate":
            document.getElementById("cal_umum_satuan_type_text").value = "Footplate";
            ls_page.style.display = "none"
            m_page.style.display = "none"
            m2_a.style.display = "none"
            m2_b.style.display = "none"
            m2_c.style.display = "none"
            m3_a.style.display = "none"
            m3_b.style.display = "none"
            m3_c.style.display = "none"
            volume_limasan.style.display = "none"
            volume_footplate.style.display = "block"
            break;



    }
}




function setBesiPage(pageType) {



    switch (pageType) {
        case 'footplate':
            document.getElementById('besi-page-footplate').style.display = "block";
            break;

        case 'balok':
            document.getElementById('besi-page-balok').style.display = "block";
            break;

        case 'kolom':
            document.getElementById('besi-page-kolom').style.display = "block";
            break;

        case 'pelat':
            document.getElementById('besi-page-pelat').style.display = "block";
            break;
    }

}


function setIllustrationVisibility() {


    var illustrationCard = document.getElementById('cb_ilustrasi');
    var sectionSeparator = document.getElementById('section_separator');
    if (illustrationCard.style.display === 'none') {

        illustrationCard.style.display = 'block';
        sectionSeparator.style.display = 'block';
    } else {
        sectionSeparator.style.display = 'none';
        illustrationCard.style.display = 'none';
    }

}

function balokTypeChange() {
    var balokTypeSelect = document.getElementById("balok_db_tipe");
    var typeVal = balokTypeSelect.value;
    document.getElementById("balok_db_uj2").value = "";

    if (typeVal == "normal") {
        document.getElementById("balok_db_uj2").setAttribute("required", true);
        document.getElementById("uj1_label").style.display = 'block';
        document.getElementById("uj1_input").style.display = 'block';
        document.getElementById("uj2_label").style.display = 'block';
        document.getElementById("uj2_input").style.display = 'block';
    } else {
        document.getElementById("balok_db_uj2").removeAttribute("required");
        document.getElementById("uj2_input").value = "";
        document.getElementById("uj1_label").style.display = 'block';
        document.getElementById("uj1_input").style.display = 'block';
        document.getElementById("uj2_label").style.display = 'none';
        document.getElementById("uj2_input").style.display = 'none';
    }
}




//Free input
function isFreeInput(id, type) {
    var select = document.getElementById(id);
    var selectedOption = select.options[select.selectedIndex];
    var txt = selectedOption.text;

    var ujung_bawah = document.getElementById("kolom_db_ujung_bawah");
    var ujung_bawah_dimensi = document.getElementById("kolom_db_ujung_bawah_diameter");

    var pokok_diameter = parseFloat($("#kolom_dbesi_tulanganpokok").find("option:selected").attr("one-value"));
    var begel_diameter = parseFloat($("#kolom_dbesi_tulanganbegel").find("option:selected").attr("one-value"));





    var db_dimensi_ujung_bawah = (ujung_bawah.value == "kolom_sama" || ujung_bawah.value == "bebas") ? 0 : ujung_bawah_dimensi.value;

    switch (type) {
        case "k1":
            if (txt == "Pilih Sendiri") {
                document.getElementById("k1_free_input_name").style.display = "block"
                document.getElementById("k1_free_input_input").style.display = "block"
                selectedOption.value = "free";
            } else {
                document.getElementById("k1_free_input_name").style.display = "none"
                document.getElementById("k1_free_input_input").style.display = "none"

                if (txt == "75") { selectedOption.value = "75" }
                if (txt == "6db") { selectedOption.value = (6 * begel_diameter).toString() }
            }
            break;

        case "k2":
            if (txt == "Pilih Sendiri") {
                document.getElementById("k2_free_input_name").style.display = "block"
                document.getElementById("k2_free_input_input").style.display = "block"
                selectedOption.value = "free";
            } else {
                document.getElementById("k2_free_input_name").style.display = "none"
                document.getElementById("k2_free_input_input").style.display = "none"

                if (txt == "12db") { selectedOption.value = (12 * pokok_diameter).toString() }
            }
            break;

        case "k3":
            if (txt == "Pilih Sendiri") {
                document.getElementById("k3_free_input_name").style.display = "block"
                document.getElementById("k3_free_input_input").style.display = "block"
                selectedOption.value = "free";
            } else {
                document.getElementById("k3_free_input_name").style.display = "none"
                document.getElementById("k3_free_input_input").style.display = "none"

                if (txt == "12db") { selectedOption.value = (12 * pokok_diameter).toString() }
            }
            break;

        case "k4":
            if (txt == "Pilih Sendiri") {
                document.getElementById("k4_free_input_name").style.display = "block"
                document.getElementById("k4_free_input_input").style.display = "block"
                selectedOption.value = "free";
            } else {
                document.getElementById("k4_free_input_name").style.display = "none"
                document.getElementById("k4_free_input_input").style.display = "none"

                if (txt == "40db") { selectedOption.value = ((db_dimensi_ujung_bawah * 1000) - 50 + (40 * pokok_diameter)).toString() }
            }
            break;

        case "k5":
            if (txt == "Pilih Sendiri") {
                document.getElementById("k5_free_input_name").style.display = "block"
                document.getElementById("k5_free_input_input").style.display = "block"
                selectedOption.value = "free";
            } else {
                document.getElementById("k5_free_input_name").style.display = "none"
                document.getElementById("k5_free_input_input").style.display = "none"

                if (txt == "40db") { selectedOption.value = (40 * pokok_diameter).toString() }
            }
            break;
    }

}

//Function to change value k1 - k5 Besi Pelat
function changeValuePelat(id, type) {
    var select = document.getElementById(id);

    var selectedOption = select.options[select.selectedIndex];
    var txt = selectedOption.text;

    var tipe_besi = document.getElementById("pelat_dbesi_tipe_besi").value;
    var tinggi = parseFloat(document.getElementById("pelat_ud_tinggi").value);
    var tp1 = parseFloat(document.getElementById("pelat_db_tp1").value);
    var tp2 = parseFloat(document.getElementById("pelat_db_tp2").value);
    var tp3 = parseFloat(document.getElementById("pelat_db_tp3").value);
    var tp4 = parseFloat(document.getElementById("pelat_db_tp4").value);


    var option = (tipe_besi == "besi_tulangan") ? parseFloat($("#pelat_dbesi_tulangan_pokok_bx").find("option:selected").attr("one-value")) : parseFloat($("#pelat_dbesi_tipe_wiremesh").find("option:selected").attr("one-value"));
    
 
    if (type == "k1") {
        if (txt == "0") { selectedOption.value = "0" }
        if (txt == "6db") { selectedOption.value = (6 * option).toString() }
        if (txt == "12db") { selectedOption.value = (12 * option).toString() }
        if (txt == "75mm") { selectedOption.value = "75" }
        if (txt == "TP") { selectedOption.value = (tinggi * 1000).toString() }
        
    } else if(type == "k2") {
        if (txt == "1/2xTP") { selectedOption.value = (0.5 * tp1 * 1000).toString() }
        if (txt == "2/3xTP") { selectedOption.value = ((2 / 3) * tp1 * 1000).toString() }
        if (txt == "TP-5cm") { selectedOption.value = ((tp1 - 0.05) * 1000).toString() }
    }else if(type == "k3") {
        if (txt == "1/2xTP") { selectedOption.value = (0.5 * tp2 * 1000).toString() }
        if (txt == "2/3xTP") { selectedOption.value = ((2 / 3) * tp2 * 1000).toString() }
        if (txt == "TP-5cm") { selectedOption.value = ((tp2 - 0.05) * 1000).toString() }
    }else if(type == "k4") {
        if (txt == "1/2xTP") { selectedOption.value = (0.5 * tp3 * 1000).toString() }
        if (txt == "2/3xTP") { selectedOption.value = ((2 / 3) * tp3 * 1000).toString() }
        if (txt == "TP-5cm") { selectedOption.value = ((tp3 - 0.05) * 1000).toString() }
    }else if(type == "k5") {
        if (txt == "1/2xTP") { selectedOption.value = (0.5 * tp4 * 1000).toString() }
        if (txt == "2/3xTP") { selectedOption.value = ((2 / 3) * tp4 * 1000).toString() }
        if (txt == "TP-5cm") { selectedOption.value = ((tp4 - 0.05) * 1000).toString() }
    }
    
    

}



//Function to change thevalue K1 -K5 Besi Balok
function changeValue(id, type) {

    var select = document.getElementById(id);

    var selectedOption = select.options[select.selectedIndex];
    var txt = selectedOption.text;


    var pokok_diameter = parseFloat($("#balok_dbesi_tulanganpokok").find('option:selected').attr('one-value'));
    var begel_diameter = parseFloat($("#balok_dbesi_tulanganbegel").find('option:selected').attr('one-value'));

    var t = document.getElementById("balok_ud_tinggi").value;
    var sb = document.getElementById("balok_db_selimut").value;
    var uj1 = document.getElementById("balok_db_uj1").value;
    var uj2 = document.getElementById("balok_db_uj2").value;



    switch (type) {
        case "k1":
            if (txt == "0") { selectedOption.value = "0"; };
            if (txt == "75") { selectedOption.value = "75" };
            if (txt == "6db") { selectedOption.value = (6 * pokok_diameter).toString() };
            if (txt == "8db") { selectedOption.value = (8 * pokok_diameter).toString() };
            if (txt == "12db") { selectedOption.value = (12 * pokok_diameter).toString() };
            break;

        case "k2":
            if (txt == "75") { selectedOption.value = "75" };
            if (txt == "6db") { selectedOption.value = (6 * begel_diameter).toString() };
            if (txt == "12db") { selectedOption.value = (12 * begel_diameter).toString() };
            break;

        case "k3":
            if (txt == "12db") { selectedOption.value = (12 * pokok_diameter).toString() };
            if (txt == "TB-2sp") { selectedOption.value = (t - (2 * sb / 100)).toString() };
            break;

        case "k4":
            if (txt == "1/2 UJ.1") { selectedOption.value = (uj1 * (1 / 2) * 1000).toString() };
            if (txt == "2/3 UJ.1") { selectedOption.value = (uj1 * (2 / 3) * 1000).toString() };
            break;


        case "k5":
            if (txt == "1/2 UJ.2") { selectedOption.value = ((1 / 2) * (uj2 * 1000)).toString() };
            if (txt == "2/3 UJ.2") { selectedOption.value = ((2 / 3) * (uj2 * 1000)).toString() };
            break;

    }


}

function roundUp(num) {
    return (Math.ceil(num * 100) / 100).toFixed(2)
}





//Get footplate H
function getFootplateH(h_type) {

    var tipe_footplate = document.getElementById("footplate_db_tipe").value;
    var p = parseFloat(document.getElementById("footplate_ud_panjang").value);
    var dimensi_kolom_ph = parseFloat(document.getElementById("footplate_db_p_h").value);


    if (tipe_footplate == "as" || tipe_footplate == "tepi") {
        var h1 = (p - dimensi_kolom_ph) / 2;
        var h1 = parseFloat(document.getElementById("footplate_db_h1").value);
        if (h_type == "h2") {
            var h2 = p - dimensi_kolom_ph - h1;
            document.getElementById("footplate_db_h2").value = h2.toFixed(2);
        }
    } else if (tipe_footplate == "sudut") {
        var h1 = 0;
        var h2 = p - dimensi_kolom_ph;
        if (h_type == "h1") {
            document.getElementById("footplate_db_h1").value = h1;
        } else {
            document.getElementById("footplate_db_h2").value = h2;
        }
    }

}


//Get footplate B
function getFootplateB(b_type) {

    var tipe_footplate = document.getElementById("footplate_db_tipe").value;
    var l = parseFloat(document.getElementById("footplate_ud_lebar").value);
    var dimensi_kolom_lb = parseFloat(document.getElementById("footplate_db_l_b").value);

    if (tipe_footplate == "as") {
        var b1 = (l - dimensi_kolom_lb) / 2;
        if (b_type == "b1") {
            document.getElementById("footplate_db_b1").value = b1.toFixed(2);
        } else {
            //b2 = b1
            document.getElementById("footplate_db_b2").value = b1.toFixed(2);
        }
    } else if (tipe_footplate == "asimetris") {
        var b1 = document.getElementById("footplate_db_b1").value;
        if (b_type == "b2") {
            var b2 = l - dimensi_kolom_lb - b1;
            document.getElementById("footplate_db_b2").value = b2.toFixed(2);
        }
    } else if (tipe_footplate == "tepi" || tipe_footplate == "sudut") {
        var b1 = 0;
        var b2 = l - dimensi_kolom_lb;
        if (b_type == "b1") {
            document.getElementById("footplate_db_b1").value = b1.toFixed(2);
        } else {
            document.getElementById("footplate_db_b2").value = b2.toFixed(2);
        }
    }

}


function changeSistemTulFootplate() {

    var sistem_footplate = document.getElementById("footplate_dbesi_tipe_besi").value;


    if (sistem_footplate == "1l") {
        $("#footplate_dbesi_tulangan_bagi_x_p2").val("0");
        $("#select2-footplate_dbesi_tulangan_bagi_x_p2-container").html("0");
        $("#footplate_dbesi_tulangan_bagi_x_p2_jarak").val("0");

        $("#footplate_dbesi_tulangan_bagi_y_l2").val("0");
        $("#select2-footplate_dbesi_tulangan_bagi_y_l2-container").html("0");
        $("#footplate_dbesi_tulangan_bagi_y_l2_jarak").val("0");
    } else {
        $("#footplate_dbesi_tulangan_bagi_x_p2").val("");
        $("#select2-footplate_dbesi_tulangan_bagi_x_p2-container").html("Pilih");
        $("#footplate_dbesi_tulangan_bagi_x_p2_jarak").val("");

        $("#footplate_dbesi_tulangan_bagi_y_l2").val("");
        $("#select2-footplate_dbesi_tulangan_bagi_y_l2-container").html("Pilih");
        $("#footplate_dbesi_tulangan_bagi_y_l2_jarak").val("");
    }
}



//Used in footplate and pelat 
function changeTulangXY(idTulX, idTulY) {
    var tul_x = document.getElementById(idTulX);
    var tul_x_value = tul_x.value;
    var tul_x_text = tul_x.options[tul_x.selectedIndex].text;

    $(`#${idTulY}`).val(tul_x);
    $(`#select2-${idTulY}-container`).html(tul_x_text);
}



function changeFootplateK1() {
    var k1 = document.getElementById("footplate_konstanta_k1");
    var k1Selected = k1.options[k1.selectedIndex];
    var text = k1Selected.text;

    var tul_pokok_diameter = parseFloat($("#footplate_dbesi_tulangan_pokok_x_p1").find("option:selected").attr("one-value"));
    var t1 = parseFloat(document.getElementById("footplate_ud_tinggi1").value);
    var t2 = parseFloat(document.getElementById("footplate_ud_tinggi2").value);
    var tf = document.getElementById("footplate_db_tipe");
    var tipe_footplate = tf.value;
    var sb = parseFloat(document.getElementById("footplate_db_selimut").value);

    if (text == "0mm") { k1Selected.value = "0" }
    if (text == "6db") { k1Selected.value = (6 * tul_pokok_diameter).toString() }
    if (text == "8db") { k1Selected.value = (8 * tul_pokok_diameter).toString() }
    if (text == "12db") { k1Selected.value = (12 * tul_pokok_diameter).toString() }
    if (text == "75mm") { k1Selected.value = "75" }


    document.getElementById("footplate_konstanta_k2").value = ((t1 * 1000) - (2 * sb)).toString();
    document.getElementById("footplate_konstanta_k3").value = ((tipe_footplate === "tepi" || tipe_footplate === "sudut") ? (t2 * 1000) - (2 * sb) : 0).toString();

}



function calculateBesiFootplate() {
    var project = document.getElementById("footplate_project").value;
    var building = document.getElementById("footplate_building").value;
    var floor = document.getElementById("footplate_floor").value;


    var footplate_name = document.getElementById("footplate_name").value;
    var p = parseFloat(document.getElementById("footplate_ud_panjang").value);
    var l = parseFloat(document.getElementById("footplate_ud_lebar").value);
    var t1 = parseFloat(document.getElementById("footplate_ud_tinggi1").value);
    var t2 = parseFloat(document.getElementById("footplate_ud_tinggi2").value);
    var unit = parseFloat(document.getElementById("footplate_ud_unit").value);
    //Calculate volume
    var volume = (p * l * t1) + (p * l * (t2 - t1) * 0.6);

    var tf = document.getElementById("footplate_db_tipe");
    var tipe_footplate = tf.value;
    var tipe_footplate_text = tf.options[tf.selectedIndex].text;
    var sb = parseFloat(document.getElementById("footplate_db_selimut").value);
    var dimensi_kolom_ph = parseFloat(document.getElementById("footplate_db_p_h").value);
    var dimensi_kolom_lb = parseFloat(document.getElementById("footplate_db_l_b").value);

    //Posisi Kolom
    var h1 = parseFloat(document.getElementById("footplate_db_h1").value);
    var h2 = parseFloat(document.getElementById("footplate_db_h2").value);
    var b1 = parseFloat(document.getElementById("footplate_db_b1").value);
    var b2 = parseFloat(document.getElementById("footplate_db_b2").value);

    var sf = document.getElementById("footplate_dbesi_tipe_besi");
    var sistem_footplate = sf.value;
    var sistem_footplate_text = sf.options[sf.selectedIndex].text;


    //Tulangan Pokok - X P1
    var tul_pokok_x_p1 = document.getElementById("footplate_dbesi_tulangan_pokok_x_p1").value;
    var tul_pokok_x_p1_jarak = parseFloat(document.getElementById("footplate_dbesi_tulangan_pokok_x_p1_jarak").value);

    //Tulangan Bagi - X P2
    var tul_bagi_x_p2 = document.getElementById("footplate_dbesi_tulangan_bagi_x_p2").value;
    var tul_bagi_x_p2_jarak = parseFloat(document.getElementById("footplate_dbesi_tulangan_bagi_x_p2_jarak").value);

    //Tulangan Pokok - Y L1
    var tul_pokok_y_l1 = document.getElementById("footplate_dbesi_tulangan_pokok_y_l1").value;
    var tul_pokok_y_l1_jarak = parseFloat(document.getElementById("footplate_dbesi_tulangan_pokok_y_l1_jarak").value);

    //Tulangan Bagi - Y L2
    var tul_bagi_y_l2 = document.getElementById("footplate_dbesi_tulangan_bagi_y_l2").value;
    var tul_bagi_y_l2_jarak = parseFloat(document.getElementById("footplate_dbesi_tulangan_bagi_y_l2_jarak").value);

    // TUlangan Extra Tepi L3
    var tul_extra_tepi_l3 = document.getElementById("footplate_dbesi_tulangan_extra_l3").value;
    var tul_extra_tepi_l3_jarak = parseFloat(document.getElementById("footplate_dbesi_tulangan_extra_l3_jarak").value);


    //Tulang Pokok X/Y - Option
    var tul_pokok_diameter = parseFloat($("#footplate_dbesi_tulangan_pokok_x_p1").find("option:selected").attr("one-value"));
    var tul_pokok_berat = parseFloat($("#footplate_dbesi_tulangan_pokok_x_p1").find("option:selected").attr("two-value"));


    //Tulang Bagi X/Y - Option
    var tul_bagi_diameter = parseFloat($("#footplate_dbesi_tulangan_bagi_x_p2").find("option:selected").attr("one-value"));
    var tul_bagi_berat = parseFloat($("#footplate_dbesi_tulangan_bagi_x_p2").find("option:selected").attr("two-value"));


    //Tulang Extra - Option
    var tul_extra_diameter = parseFloat($("#footplate_dbesi_tulangan_extra_l3").find("option:selected").attr("one-value"));
    var tul_extra_berat = parseFloat($("#footplate_dbesi_tulangan_extra_l3").find("option:selected").attr("two-value"));


    //Jumlah
    var jumlah_pokok_x_p1 = roundUp((l * 1000 / tul_pokok_x_p1_jarak) + 1);
    var jumlah_pokok_y_l1 = roundUp((p * 1000 / tul_pokok_y_l1_jarak) + 1);




    if (sistem_footplate == "1l") {
        var jumlah_bagi_x_p2 = 0;
        var jumlah_bagi_y_l2 = 0;
    } else {
        var jumlah_bagi_x_p2 = roundUp((l * 1000 / tul_bagi_x_p2_jarak) + 1);
        var jumlah_bagi_y_l2 = roundUp((p * 1000 / tul_bagi_y_l2_jarak) + 1);
    }

    if (tul_extra_tepi_l3_jarak != 0) {
        var jumlah_extra_tepi_l3 = roundUp((((p * l) / 2 * 1000) / tul_extra_tepi_l3_jarak) * 2);
    } else {
        var jumlah_extra_tepi_l3 = 0;
    }


    //K1-K3
    var k1 = parseFloat(document.getElementById("footplate_konstanta_k1").value);
    var k2 = parseFloat(document.getElementById("footplate_konstanta_k2").value);
    var k3 = parseFloat(document.getElementById("footplate_konstanta_k3").value);

    var koefisien_kubikasi = 1 / volume;


    //Variable Pembesian
    var variable_pembesian_tul_pokok_x_p1 = (p - (2 * sb / 1000)) + (2 * (k1 + k2) / 1000);
    var variable_pembesian_tul_pokok_x_p1b = (tipe_footplate == "asimetris") ? (Math.max(h1, h2) + (0.5 * dimensi_kolom_ph) - (sb / 1000) + ((k1 + k2) / 1000) + (30 * tul_pokok_diameter)) : 0;

    if (tipe_footplate === "tepi" || tipe_footplate === "sudut") {
        var variable_pembesian_tul_pokok_y_l1 = (l - (2 * sb / 1000)) + (((2 * k1) + k2 + k3) / 1000);
    } else {
        var variable_pembesian_tul_pokok_y_l1 = (l - (2 * sb / 1000)) + (2 * (k1 + k2) / 1000);
    }

    if (tipe_footplate === "sudut") {
        var variable_pembesian_tul_bagi_x_p2 = (dimensi_kolom_ph - (sb / 1000)) + Math.sqrt(Math.pow(h2 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + (2 * k1 / 1000);
    } else {
        var variable_pembesian_tul_bagi_x_p2 = dimensi_kolom_ph + Math.sqrt(Math.pow(h1 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + Math.sqrt(Math.pow(h2 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + (2 * k1 / 1000);
    }


    if (tipe_footplate === "tepi" || tipe_footplate === "sudut") {
        var variable_pembesian_tul_bagi_l2 = (dimensi_kolom_lb - (sb / 1000)) + Math.sqrt(Math.pow(b2 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + (2 * k1 / 1000);
    } else {
        var variable_pembesian_tul_bagi_l2 = dimensi_kolom_lb + Math.sqrt(Math.pow(b1 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + Math.sqrt(Math.pow(b2 - (sb / 1000), 2) + Math.pow(t2 - t1, 2)) + (2 * k1 / 1000);
    }


    var variable_pembesian_tul_extra_l3 = (tipe_footplate === "tepi") ? variable_pembesian_tul_pokok_y_l1 : 0;

    //Kebutuhan Besi per Unit
    var tulang_pokok_panjang_besi_unit = tipe_footplate === "asimetris" ? (variable_pembesian_tul_pokok_x_p1 * jumlah_pokok_x_p1 * 0.5) + (b1 * jumlah_pokok_x_p1 * 0.5) + (b2 * jumlah_pokok_y_l1) : (variable_pembesian_tul_pokok_x_p1 * jumlah_pokok_x_p1) + (variable_pembesian_tul_pokok_y_l1 * jumlah_pokok_y_l1);
    var tulang_bagi_panjang_besi_unit = (variable_pembesian_tul_bagi_x_p2 * jumlah_bagi_x_p2) + (variable_pembesian_tul_bagi_l2 * jumlah_bagi_y_l2);
    var tul_extra_panjang_besi_unit = (variable_pembesian_tul_extra_l3 * jumlah_extra_tepi_l3);

    var tul_pokok_berat_besi_unit = tulang_pokok_panjang_besi_unit * tul_pokok_berat;
    var tul_bagi_berat_besi_unit = tulang_bagi_panjang_besi_unit * tul_bagi_berat;
    var tul_extra_berat_besi_unit = tul_extra_panjang_besi_unit * tul_extra_berat;

    // Kebutuhan Besi per m3
    var tulang_pokok_panjang_besi_m3 = tulang_pokok_panjang_besi_unit * koefisien_kubikasi;
    var tulang_bagi_panjang_besi_m3 = tulang_bagi_panjang_besi_unit * koefisien_kubikasi;
    var tul_extra_panjang_besi_m3 = tul_extra_panjang_besi_unit * koefisien_kubikasi;

    var tul_pokok_berat_besi_m3 = tul_pokok_berat_besi_unit * koefisien_kubikasi;
    var tul_bagi_berat_besi_m3 = tulang_bagi_panjang_besi_m3 * koefisien_kubikasi;
    var tul_extra_berat_besi_m3 = tul_extra_panjang_besi_m3 * koefisien_kubikasi;



    data_footplate = {
        project: project,
        building: building,
        floor: floor,
        footplate_name: footplate_name,
        panjang: p,
        lebar: l,
        tinggi1: t1,
        tinggi2: t2,
        unit: unit,
        volume: volume.toFixed(3),
        tipe_footplate: tipe_footplate,
        tipe_footplate_text: tipe_footplate_text,
        selimut_beton: sb,
        dimensi_kolom_ph: dimensi_kolom_ph,
        dimensi_kolom_lb: dimensi_kolom_lb,
        h1: h1,
        h2: h2,
        b1: b1,
        b2: b2,
        sistem_footplate: sistem_footplate,
        sistem_footplate_text: sistem_footplate_text,
        tul_pokok_x_p1: tul_pokok_x_p1,
        tul_pokok_diameter: tul_pokok_diameter,
        tul_pokok_berat: tul_pokok_berat,
        tul_pokok_x_p1_jarak: tul_pokok_x_p1_jarak,
        tul_bagi_x_p2: tul_bagi_x_p2,
        tul_bagi_x_p2_jarak: tul_bagi_x_p2_jarak,
        tul_pokok_y_l1: tul_pokok_y_l1,
        tul_bagi_diameter: tul_bagi_diameter,
        tul_bagi_berat: tul_bagi_berat,
        tul_pokok_y_l1_jarak: tul_pokok_y_l1_jarak,
        tul_bagi_y_l2: tul_bagi_y_l2,
        tul_bagi_y_l2_jarak: tul_bagi_y_l2_jarak,
        tul_extra_tepi_l3: tul_extra_tepi_l3,
        tul_extra_tepi_l3_jarak: tul_extra_tepi_l3_jarak,
        jumlah_pokok_x_p1: jumlah_pokok_x_p1,
        jumlah_pokok_y_l1: jumlah_pokok_y_l1,
        jumlah_bagi_x_p2: jumlah_bagi_x_p2,
        jumlah_bagi_y_l2: jumlah_bagi_y_l2,
        jumlah_extra_tepi_l3: jumlah_extra_tepi_l3,
        tul_extra_diameter: tul_extra_diameter,
        tul_extra_berat: tul_extra_berat,
        k1: k1,
        k2: k2,
        k3: k3,
        koefisien_kubikasi: koefisien_kubikasi,
        variable_pembesian_tul_pokok_x_p1: variable_pembesian_tul_pokok_x_p1,
        variable_pembesian_tul_pokok_x_p1b: variable_pembesian_tul_pokok_x_p1b,
        variable_pembesian_tul_pokok_y_l1: variable_pembesian_tul_pokok_y_l1,
        variable_pembesian_tul_bagi_x_p2: variable_pembesian_tul_bagi_x_p2,
        variable_pembesian_tul_bagi_l2: variable_pembesian_tul_bagi_l2,
        variable_pembesian_tul_extra_l3: variable_pembesian_tul_extra_l3,

        tulang_pokok_panjang_besi_unit: tulang_pokok_panjang_besi_unit.toFixed(3),
        tulang_bagi_panjang_besi_unit: tulang_bagi_panjang_besi_unit.toFixed(3),
        tul_extra_panjang_besi_unit: tul_extra_panjang_besi_unit.toFixed(3),
        tul_pokok_berat_besi_unit: tul_pokok_berat_besi_unit.toFixed(3),
        tul_bagi_berat_besi_unit: tul_bagi_berat_besi_unit.toFixed(3),
        tul_extra_berat_besi_unit: tul_extra_berat_besi_unit.toFixed(3),

        tulang_pokok_panjang_besi_m3: tulang_pokok_panjang_besi_m3.toFixed(3),
        tulang_bagi_panjang_besi_m3: tulang_bagi_panjang_besi_m3.toFixed(3),
        tul_extra_panjang_besi_m3: tul_extra_panjang_besi_m3.toFixed(3),
        tul_pokok_berat_besi_m3: tul_pokok_berat_besi_m3.toFixed(3),
        tul_bagi_berat_besi_m3: tul_bagi_berat_besi_m3.toFixed(3),
        tul_extra_berat_besi_m3: tul_extra_berat_besi_m3.toFixed(3)

    }


    console.log(data_footplate)


    var form = document.getElementById("form_cal_besi_footplate");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }
    addRowTableBesiFootplate(data_footplate);

}





function addRowTableBesiFootplate(data_footplate) {
    var html_row;
    var data = data_footplate;



    //     tipe_footplate: tipe_footplate,
    //     selimut_beton: sb,
    //     dimensi_kolom_ph: dimensi_kolom_ph,
    //     dimensi_kolom_lb: dimensi_kolom_lb,
    //     h1: h1,
    //     h2: h2,
    //     b1: b1,
    //     b2: b2,
    //     sistem_footplate: sistem_footplate,
    //     tul_pokok_x_p1: tul_pokok_x_p1,
    //     tul_pokok_diameter: tul_pokok_diameter,
    //     tul_pokok_berat: tul_pokok_berat,
    //     tul_pokok_x_p1_jarak: tul_pokok_x_p1_jarak,
    //     tul_bagi_x_p2: tul_bagi_x_p2,
    //     tul_bagi_x_p2_jarak: tul_bagi_x_p2_jarak,
    //     tul_pokok_y_l1: tul_pokok_y_l1,
    //     tul_bagi_diameter: tul_bagi_diameter,
    //     tul_bagi_berat: tul_bagi_berat,
    //     tul_pokok_y_l1_jarak: tul_pokok_y_l1_jarak,
    //     tul_bagi_y_l2: tul_bagi_y_l2,
    //     tul_bagi_y_l2_jarak: tul_bagi_y_l2_jarak,
    //     tul_extra_tepi_l3: tul_extra_tepi_l3,
    //     tul_extra_tepi_l3_jarak: tul_extra_tepi_l3_jarak,
    //     jumlah_pokok_x_p1: jumlah_pokok_x_p1,
    //     jumlah_pokok_y_l1: jumlah_pokok_y_l1,
    //     jumlah_bagi_x_p2: jumlah_bagi_x_p2,
    //     jumlah_bagi_y_l2: jumlah_bagi_y_l2,
    //     jumlah_extra_tepi_l3: jumlah_extra_tepi_l3,
    //     tul_extra_diameter: tul_extra_diameter,
    //     k1: k1,
    //     k2: k2,
    //     k3: k3,
    //     koefisien_kubikasi: koefisien_kubikasi,
    //     variable_pembesian_tul_pokok_x_p1: variable_pembesian_tul_pokok_x_p1,
    //     variable_pembesian_tul_pokok_x_p1b: variable_pembesian_tul_pokok_x_p1b,
    //     variable_pembesian_tul_pokok_y_l1: variable_pembesian_tul_pokok_y_l1,
    //     variable_pembesian_tul_bagi_x_p2: variable_pembesian_tul_bagi_x_p2,
    //     variable_pembesian_tul_bagi_l2: variable_pembesian_tul_bagi_l2,
    //     variable_pembesian_tul_extra_l3: variable_pembesian_tul_extra_l3,
    //     tulang_pokok_panjang_besi_unit: tulang_pokok_panjang_besi_unit,
    //     tulang_bagi_panjang_besi_unit: tulang_bagi_panjang_besi_unit,

    //     tul_extra_panjang_besi_unit: tul_extra_panjang_besi_unit,
    //     tul_pokok_berat_besi_unit: tul_pokok_berat_besi_unit,
    //     tul_bagi_berat_besi_unit: tul_bagi_berat_besi_unit,
    //     tul_extra_berat_besi_unit: tul_extra_berat_besi_unit,

    //     tulang_pokok_panjang_besi_m3: tulang_pokok_panjang_besi_m3,
    //     tulang_bagi_panjang_besi_m3: tulang_bagi_panjang_besi_m3,
    //     tul_extra_panjang_besi_m3: tul_extra_panjang_besi_m3,
    //     tul_pokok_berat_besi_m3: tul_pokok_berat_besi_m3,
    //     tul_bagi_berat_besi_m3: tul_bagi_berat_besi_m3,
    //     tul_extra_berat_besi_m3: tul_extra_berat_besi_m3

    // }


    var table = document.getElementById('cal_besi_table_footplate');
    html_row += '<tr>';
    html_row += '<td>' + (table.rows.length - 2) + '</td>';
    html_row += '<td>' + data.footplate_name + '</td>';
    html_row += '<td>' + data.panjang + '</td>';
    html_row += '<td>' + data.lebar + '</td>';
    html_row += '<td>' + data.tinggi1 + '</td>';
    html_row += '<td>' + data.tinggi2 + '</td>';
    html_row += '<td>' + data.unit + '</td>';
    html_row += '<td>' + data.volume + '</td>';
    html_row += '<td> </td>';
    html_row += '<td>' + data.tipe_footplate_text + '</td>';
    html_row += '<td>' + data.sistem_footplate_text + '</td>';
    html_row += '<td>' + data.tulang_pokok_panjang_besi_unit + '</td>';
    html_row += '<td>' + data.tulang_bagi_panjang_besi_unit + '</td>';
    html_row += '<td>' + data.tul_extra_panjang_besi_unit + '</td>';
    html_row += '<td>' + data.tul_pokok_berat_besi_unit + '</td>';
    html_row += '<td>' + data.tul_bagi_berat_besi_unit + '</td>';
    html_row += '<td>' + data.tul_extra_berat_besi_unit + '</td>';
    html_row += '<td>' + data.tulang_pokok_panjang_besi_m3 + '</td>';
    html_row += '<td>' + data.tulang_bagi_panjang_besi_m3 + '</td>';
    html_row += '<td>' + data.tul_extra_panjang_besi_m3 + '</td>';
    html_row += '<td>' + data.tul_pokok_berat_besi_m3 + '</td>';
    html_row += '<td>' + data.tul_bagi_berat_besi_m3 + '</td>';
    html_row += '<td>' + data.tul_extra_berat_besi_m3 + '</td>';

    html_row += '<td><button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>';
    html_row += '</tr>';

    $("#cal_besi_footplate_data").append(html_row)
}





function calculateBesiKolom() {

    var project = document.getElementById("balok_project").value;
    var building = document.getElementById("balok_building").value;
    var floor = document.getElementById("balok_floor").value; 
    var kolom_name = document.getElementById("kolom_name").value;
    var p = parseFloat(document.getElementById("kolom_ud_panjang").value);
    var l = parseFloat(document.getElementById("kolom_ud_lebar").value);
    var t = parseFloat(document.getElementById("kolom_ud_tinggi").value);
    var unit = parseFloat(document.getElementById("kolom_ud_unit").value);


    //hitung input volume
    // var v = parseFloat(p) * parseFloat(l) * parseFloat(t) * parseFloat(unit);
    var v = p * l * t * unit;
    var kolom_type = document.getElementById("kolom_db_tipe").value;
    var kolom_type_text = document.getElementById("kolom_db_tipe");
    kolom_type_text = kolom_type_text.options[kolom_type_text.selectedIndex].text

    var sb = parseFloat(document.getElementById("kolom_db_selimut").value);

    //ujung bawah value
    var ujung_bawah_type = document.getElementById("kolom_db_ujung_bawah").value;
    var ujung_bawah_diameter = (ujung_bawah_type == "kolom_sama") ? 0 : parseFloat(document.getElementById("kolom_db_ujung_bawah_diameter").value);

    //ujung atas value
    var ujung_atas_type = document.getElementById("kolom_db_ujung_atas").value;
    var ujung_atas_diameter = (ujung_atas_type == "kolom_sama" || ujung_atas_type == "bebas") ? 0 : parseFloat(document.getElementById("kolom_db_ujung_atas_diameter").value);


    //Data besi 1_Tulangan Pokok
    var pokok = document.getElementById("kolom_dbesi_tulanganpokok");
    //Id/Kode? besi pokok
    var pokok_value = pokok.value;
    var pokok_diameter = parseFloat($("#kolom_dbesi_tulanganpokok").find("option:selected").attr("one-value"));
    var pokok_berat = parseFloat($("#kolom_dbesi_tulanganpokok").find("option:selected").attr("two-value"));
    var pokok_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganpokok_jumlah").value);
    var pokok_text = pokok.options[pokok.selectedIndex].text;


    //Data besi 2_Tulangan Begel
    var begel = document.getElementById("kolom_dbesi_tulanganbegel");
    //Id/Kode? besi begel
    var begel_value = begel.value;
    var begel_diameter = parseFloat($("#kolom_dbesi_tulanganbegel").find("option:selected").attr("one-value"));
    var begel_berat = parseFloat($("#kolom_dbesi_tulanganbegel").find("option:selected").attr("two-value"));
    var begel_text = begel.options[begel.selectedIndex].text;

    //Inputan Tulangan sengkang begel
    var begel_sengkang_ujung_bawah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_ujung_bawah").value);
    var begel_sengkang_lapangan = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_lapangan").value);
    var begel_sengkang_ujung_atas = parseFloat(document.getElementById("balok_dbesi_tulanganbegel_ujung_atas").value);

    //Inputan Tulangan sengkang begel vertikal
    var begel_sengkang_vertikal_ujung_bawah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_ujung_bawah").value);
    var begel_sengkang_vertikal_ujung_bawah_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_ujung_bawah_jumlah").value);
    var begel_sengkang_vertikal_lapangan = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_lapangan").value);
    var begel_sengkang_vertikal_lapangan_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_lapangan_jumlah").value);
    var begel_sengkang_vertikal_ujung_atas = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_ujung_atas").value);
    var begel_sengkang_vertikal_ujung_atas_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_vertikal_ujung_atas_jumlah").value);


    //Inputan Tulangan sengkang begel horizontal
    var begel_sengkang_horizontal_ujung_bawah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_ujung_bawah").value);
    var begel_sengkang_horizontal_ujung_bawah_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_ujung_bawah_jumlah").value);
    var begel_sengkang_horizontal_lapangan = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_lapangan").value);
    var begel_sengkang_horizontal_lapangan_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_lapangan_jumlah").value);
    var begel_sengkang_horizontal_ujung_atas = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_ujung_atas").value);
    var begel_sengkang_horizontal_ujung_atas_jumlah = parseFloat(document.getElementById("kolom_dbesi_tulanganbegel_horizontal_ujung_atas_jumlah").value);

    //Inputan Konstanta
    var k1 = document.getElementById("kolom_konstanta_kait_begel");
    var k2 = document.getElementById("kolom_konstanta_siku_bawah");
    var k3 = document.getElementById("kolom_konstanta_siku_atas");
    var k4 = document.getElementById("kolom_konstanta_lewatan_bawah");
    var k5 = document.getElementById("kolom_konstanta_sambungan");

    var k1_free = document.getElementById("kolom_konstanta_kait_begel_bebas");
    var k2_free = document.getElementById("kolom_konstanta_siku_bawah_bebas");
    var k3_free = document.getElementById("kolom_konstanta_siku_atas_bebas");
    var k4_free = document.getElementById("kolom_konstanta_lewatan_bawah_bebas");
    var k5_free = document.getElementById("kolom_konstanta_sambungan_bebas");


    var k1_val = (k1.value == "free") ? parseFloat(k1_free.value) : parseFloat(k1.value);
    var k2_val = (k2.value == "free") ? parseFloat(k2_free.value) : parseFloat(k2.value);
    var k3_val = (k3.value == "free") ? parseFloat(k3_free.value) : parseFloat(k3.value);
    var k4_val = (k4.value == "free") ? parseFloat(k4_free.value) : parseFloat(k4.value);
    var k5_val = (k5.value == "free") ? parseFloat(k5_free.value) : parseFloat(k5.value);

    //Kalkulasi Jumlah sengkang begel
    var jumlah_sengkang_begel_ujung_bawah = parseFloat(roundUp((0.25 * t) / (begel_sengkang_ujung_bawah / 1000)));
    var jumlah_sengkang_begel_lapangan = parseFloat(roundUp(((0.5 * t) / (begel_sengkang_lapangan / 1000)) + 1));
    var jumlah_sengkang_begel_ujung_atas = parseFloat(roundUp((0.25 * t) / (begel_sengkang_ujung_atas / 1000)));

    var koef_kubikasi = (1 / (p * l * t));

    var form1 = (t - ujung_atas_diameter) + (ujung_bawah_diameter - 0.05) + (ujung_atas_diameter * 1.1) + ((k2_val + k3_val + k4_val + k5_val) / 1000);
    var form2 = (t - ujung_atas_diameter) + (ujung_atas_diameter * 1.1) + ((k2_val + k3_val + k4_val + k5_val) / 1000);
    var variable_pembesian_tul_pokok = (kolom_type == "pedestal" || kolom_type == "tumbuh") ? form1 : form2;
    var variable_pembesian_tul_normal_bg2 = 2 * ((p - (2 * sb / 1000)) + (l - (2 * sb / 1000)) + (k1_val / 1000));


    //Kalkulasi Kebutuhan besi per unit 
    var besi_unit_panjang_besi_pokok = variable_pembesian_tul_pokok * pokok_jumlah;
    var besi_unit_panjang_besi_begel = variable_pembesian_tul_normal_bg2 * (jumlah_sengkang_begel_ujung_bawah + jumlah_sengkang_begel_lapangan + jumlah_sengkang_begel_ujung_atas);
    var besi_unit_berat_besi_pokok = besi_unit_panjang_besi_pokok * pokok_berat;
    var besi_unit_berat_besi_begel = besi_unit_panjang_besi_begel * begel_berat;

    //Kalkulasi Kebutuhan besi per m3
    var besi_m3_panjang_besi_pokok = besi_unit_panjang_besi_pokok * koef_kubikasi;
    var besi_m3_panjang_besi_begel = besi_unit_panjang_besi_begel * koef_kubikasi;
    var besi_m3_berat_besi_pokok = besi_unit_berat_besi_pokok * koef_kubikasi;
    var besi_m3_berat_besi_begel = besi_unit_berat_besi_begel * koef_kubikasi;






    dataCalculation = {
        project : project,
        building : building,
        floor : floor,
        kolom_name: kolom_name,
        panjang: p,
        lebar: l,
        tinggi: t,
        unit: unit,
        volume: v.toFixed(3),
        selimut_beton: sb,
        tipe_kolom: kolom_type,
        tipe_kolom_text: kolom_type_text,
        pokok_text: pokok_text,
        begel_text: begel_text,
        ujung_bawah_type: ujung_bawah_type,
        ujung_bawah_diameter: ujung_bawah_diameter,
        ujung_atas_type: ujung_atas_type,
        ujung_atas_diameter: ujung_atas_diameter,
        tulangan_besi_pokok_value: pokok_value,
        tulangan_besi_pokok_diameter: pokok_diameter,
        tulangan_besi_pokok_berat: pokok_berat,
        tulangan_besi_pokok_jumlah: pokok_jumlah,
        tulangan_besi_begel_value: begel_value,
        tulangan_besi_begel_diameter: begel_diameter,
        tulangan_besi_begel_berat: begel_berat,
        tulangan_sengkang_begel_ujung_bawah: begel_sengkang_ujung_bawah,
        tulangan_sengkang_begel_lapangan: begel_sengkang_lapangan,
        tulangan_sengkang_begel_ujung_atas: begel_sengkang_ujung_atas,

        tulangan_sengkang_begel_v_ujung_bawah: begel_sengkang_vertikal_ujung_bawah,
        tulangan_sengkang_begel_v_ujung_bawah_jumlah: begel_sengkang_vertikal_ujung_bawah_jumlah,
        tulangan_sengkang_begel_v_lapangan: begel_sengkang_vertikal_lapangan,
        tulangan_sengkang_begel_v_lapangan_jumlah: begel_sengkang_vertikal_lapangan_jumlah,
        tulangan_sengkang_begel_v_ujung_atas: begel_sengkang_vertikal_ujung_atas,
        tulangan_sengkang_begel_v_ujung_atas_jumlah: begel_sengkang_vertikal_ujung_atas_jumlah,

        tulangan_sengkang_begel_h_ujung_bawah: begel_sengkang_horizontal_ujung_bawah,
        tulangan_sengkang_begel_h_ujung_bawah_jumlah: begel_sengkang_horizontal_ujung_bawah_jumlah,
        tulangan_sengkang_begel_h_lapangan: begel_sengkang_horizontal_lapangan,
        tulangan_sengkang_begel_h_lapangan_jumlah: begel_sengkang_horizontal_lapangan_jumlah,
        tulangan_sengkang_begel_h_ujung_atas: begel_sengkang_horizontal_ujung_atas,
        tulangan_sengkang_begel_h_ujung_atas_jumlah: begel_sengkang_horizontal_ujung_atas_jumlah,

        k1: k1_val,
        k2: k2_val,
        k3: k3_val,
        k4: k4_val,
        k5: k5_val,

        //Jumlah Sengkang begel
        jumlah_sengkang_begel_ujung_bawah: jumlah_sengkang_begel_ujung_bawah,
        jumlah_sengkang_begel_lapangan: jumlah_sengkang_begel_lapangan,
        jumlah_sengkang_begel_ujung_atas: jumlah_sengkang_begel_ujung_atas,

        koef_kubikasi: koef_kubikasi,
        variable_pembesian_tul_pokok: variable_pembesian_tul_pokok,
        variable_pembesian_tul_normal_bg2: variable_pembesian_tul_normal_bg2,

        besi_unit_panjang_besi_pokok: besi_unit_panjang_besi_pokok.toFixed(3),
        besi_unit_panjang_besi_begel: besi_unit_panjang_besi_begel.toFixed(2),
        besi_unit_berat_besi_pokok: besi_unit_berat_besi_pokok.toFixed(2),
        besi_unit_berat_besi_begel: besi_unit_berat_besi_begel.toFixed(2),

        besi_m3_panjang_besi_pokok: besi_m3_panjang_besi_pokok.toFixed(2),
        besi_m3_panjang_besi_begel: besi_m3_panjang_besi_begel.toFixed(2),
        besi_m3_berat_besi_pokok: besi_m3_berat_besi_pokok.toFixed(2),
        besi_m3_berat_besi_begel: besi_m3_berat_besi_begel.toFixed(2)


    };

    console.log(dataCalculation)


    var form = document.getElementById("form_cal_besi_kolom");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }
    addRowTableBesiKolom(dataCalculation);

}




//Changing Diameter Ujung Bawah
function kolomUjungBawahChange() {
    var ujung_bawah = document.getElementById("kolom_db_ujung_bawah");
    var ujung_bawah_name = document.getElementById("kolom_db_ujung_bawah_diameter_name");
    var ujung_bawah_input = document.getElementById("kolom_db_ujung_bawah_diameter_input");

    if (ujung_bawah.value == "kolom_sama") {
        document.getElementById("kolom_db_ujung_bawah_diameter").value = "";
        document.getElementById("kolom_db_ujung_bawah_diameter").removeAttribute("required");
        ujung_bawah_name.style.display = "none";
        ujung_bawah_input.style.display = "none";
    } else {
        document.getElementById("kolom_db_ujung_bawah_diameter").setAttribute("required", "");
        ujung_bawah_name.style.display = "block";
        ujung_bawah_input.style.display = "block";

    }
}

//Changing Diameter Ujung Atas
function kolomUjungAtasChange() {

    var ujung_atas = document.getElementById("kolom_db_ujung_atas");
    var ujung_atas_name = document.getElementById("kolom_db_ujung_atas_diameter_name");
    var ujung_atas_input = document.getElementById("kolom_db_ujung_atas_diameter_input");

    if (ujung_atas.value == "kolom_sama" || ujung_atas.value == "bebas") {
        document.getElementById("kolom_db_ujung_atas_diameter").value = "";
        document.getElementById("kolom_db_ujung_atas_diameter").removeAttribute("required");
        ujung_atas_input.style.display = "none";
        ujung_atas_name.style.display = "none"
    } else {
        document.getElementById("kolom_db_ujung_atas_diameter").setAttribute("required", "");
        ujung_atas_input.style.display = "block";
        ujung_atas_name.style.display = "block"
    }
}

//Changing K2 based on Kolom Type
function kolomTypeChange() {

    //k2 disable : normal, akhir/bebas
    //k2 enable : pedestal, tumbuh
    var kolom_type = document.getElementById("kolom_db_tipe");
    var k2_name = document.getElementById("kolom_konstanta_k2_row_name");
    var k2_input = document.getElementById("kolom_konstanta_k2_row_input");
    var k2 = document.getElementById("kolom_konstanta_siku_bawah");

    if (kolom_type.value == "normal" || kolom_type.value == "akhir_bebas") {
        console.log("disable");
        k2_name.style.display = "none";
        k2_input.style.display = "none";
        k2.selectedIndex = 0;
        document.getElementById("kolom_konstanta_siku_bawah_bebas").value = "";
        document.getElementById("k2_free_input_name").style.display = "none";
        document.getElementById("k2_free_input_input").style.display = "none";

    } else {
        k2_name.style.display = "block";
        k2_input.style.display = "block";
    }

}


 


function calculateBesiPelat() {

    var project = document.getElementById("pelat_project").value;
    var building = document.getElementById("pelat_building").value;
    var floor = document.getElementById("pelat_floor").value; 

    var pelat_name = document.getElementById("pelat_name").value;
    var p = parseFloat(document.getElementById("pelat_ud_panjang").value);
    var l = parseFloat(document.getElementById("pelat_ud_lebar").value);
    var t = parseFloat(document.getElementById("pelat_ud_tinggi").value);
    var u = parseFloat(document.getElementById("pelat_ud_unit").value);

    //Calculate Volume
    var volume = p * l * t * u;

    var tipe_pelat = document.getElementById("pelat_db_tipe").value;
    var sb = parseFloat(document.getElementById("pelat_db_selimut").value);

    //Dimensi lebar balok tepi
    var tp1 = parseFloat(document.getElementById("pelat_db_tp1").value);
    var tp2 = parseFloat(document.getElementById("pelat_db_tp2").value);
    var tp3 = parseFloat(document.getElementById("pelat_db_tp3").value);
    var tp4 = parseFloat(document.getElementById("pelat_db_tp4").value);

    //Data besi
    var tipe_besi_pelat = document.getElementById("pelat_dbesi_tipe_besi").value;


    var k1 = parseFloat(document.getElementById("pelat_konstanta_k1").value);
    var k2 = parseFloat(document.getElementById("pelat_konstanta_k2").value);
    var k3 = parseFloat(document.getElementById("pelat_konstanta_k3").value);
    var k4 = parseFloat(document.getElementById("pelat_konstanta_k4").value);
    var k5 = parseFloat(document.getElementById("pelat_konstanta_k5").value);

    var koefisien_kubikasi = (1 / (p * l * t)).toFixed(2);


    if (tipe_besi_pelat == "besi_tulangan") {
        var tulangan_pokok_x_bx = document.getElementById("pelat_dbesi_tulangan_pokok_bx").value;
        var tulangan_pokok_x_bx_diameter = parseFloat($("#pelat_dbesi_tulangan_pokok_bx").find("option:selected").attr("one-value"));
        var tulangan_pokok_x_bx_berat    = parseFloat($("#pelat_dbesi_tulangan_pokok_bx").find("option:selected").attr("two-value"));
        var tulangan_pokok_x_rx_jarak = parseFloat(document.getElementById("pelat_dbesi_tulangan_pokok_rx").value);

        var jumlah_besi_pokok_x = Math.ceil((l * 1000 / tulangan_pokok_x_rx_jarak) + 1);


        var tulangan_pokok_y_by = document.getElementById("pelat_dbesi_tulangan_pokok_bx").value;
        var tulangan_pokok_y_by_diameter = parseFloat($("#pelat_dbesi_tulangan_pokok_bx").find("option:selected").attr("one-value"));
        var tulangan_pokok_y_by_berat = parseFloat($("#pelat_dbesi_tulangan_pokok_bx").find("option:selected").attr("two-value"));
        var tulangan_pokok_y_ry_jarak = parseFloat(document.getElementById("pelat_dbesi_tulangan_pokok_ry").value);

        var jumlah_besi_pokok_y = Math.ceil((p * 1000 / tulangan_pokok_y_ry_jarak) + 1);

        //variable pembesian

        var variable_pembesian_tul_pokok_x_atas =  (tipe_pelat == "n1l" || tipe_pelat == "k1l") ? 0 : Math.round((p + ((2 * k1) + k2 + k3) / 1000) * 100) / 100;
        var variable_pembesian_tul_pokok_x_bawah = variable_pembesian_tul_pokok_x_atas;
        var variable_pembesian_tul_pokok_y_atas = (tipe_pelat == "n1l" || tipe_pelat == "k1l") ? 0 : Math.round((l + ((2 * k1) + k4 + k5) / 1000) * 100) / 100;
        var variable_pembesian_tul_pokok_y_bawah =variable_pembesian_tul_pokok_y_atas;

        //Kebutuhan besi per unit
        var tul_x_panjang_unit = (jumlah_besi_pokok_x * (variable_pembesian_tul_pokok_x_atas + variable_pembesian_tul_pokok_x_bawah));
        var tul_y_panjang_unit = (jumlah_besi_pokok_y * (variable_pembesian_tul_pokok_y_atas + variable_pembesian_tul_pokok_y_bawah));
        var tul_x_berat_unit = tulangan_pokok_x_bx_berat * tul_x_panjang_unit;
        var tul_y_berat_unit = tulangan_pokok_y_by_berat * tul_y_panjang_unit;

        //Kebutuhan besi per m3
        var tul_x_panjang_m3 = tul_x_panjang_unit * koefisien_kubikasi;
        var tul_y_panjang_m3 = tul_y_panjang_unit * koefisien_kubikasi;
        var tul_x_berat_m3 = tul_x_berat_unit * koefisien_kubikasi;
        var tul_y_berat_m3 = tul_y_berat_unit * koefisien_kubikasi;


    } else {
        var wiremesh = document.getElementById("pelat_dbesi_tipe_wiremesh").value;
        var wiremesh_diameter = parseFloat($("#pelat_dbesi_tipe_wiremesh").find("option:selected").attr("one-value"));
        var wiremesh_berat = parseFloat($("#pelat_dbesi_tipe_wiremesh").find("option:selected").attr("two-value"));

        //Variable pembesian
         var variable_pembesian_wiremesh_bawah = Math.round(((p + (p * ((2 * k1) + k2 + k3) / 1000)) + (l + (l * ((2 * k1) + k4 + k5) / 1000))) * 100) / 100;
         var variable_pembesian_wiremesh_tumpuan_atas = (tipe_pelat == "ex2l") ? Math.round((1 / 4 * 2) * (p + (p * ((k2 + k3) / 1000)))) + ((1 / 4 * 2) * (l + (l * ((k4 + k5) / 1000)))) : 0
         var variable_pembesian_wiremesh_atas = (tipe_pelat == "n2l" || tipe_pelat == "k2l") ? variable_pembesian_wiremesh_bawah : 0;

        //Kebutuhan wiremesh per unit
        var luas_wiremesh_unit = variable_pembesian_wiremesh_bawah + variable_pembesian_wiremesh_tumpuan_atas + variable_pembesian_wiremesh_atas;
        var berat_wiremesh_unit = wiremesh_berat * luas_wiremesh_unit;

        //Kebutuhan wiremesh per m3
        var luas_wiremesh_m3 = luas_wiremesh_unit * koefisien_kubikasi;
        var berat_wiremesh_m3 = berat_wiremesh_unit * koefisien_kubikasi;

    }



    dataPelat = {

        project : project,
        building : building,
        floor : floor,
        pelat_name: pelat_name,
        panjang: p,
        lebar: l,
        tinggi: t,
        unit: u,
        volume: volume.toFixed(3),
        tipe_pelat: tipe_pelat,
        sb: sb,
        tp1: tp1,
        tp2: tp2,
        tp3: tp3,
        tp4: tp4,
        tipe_besi_pelat: tipe_besi_pelat,


        tulangan_pokok_x_bx: tulangan_pokok_x_bx,
        tulangan_pokok_x_bx_diameter: tulangan_pokok_x_bx_diameter,
        tulangan_pokok_x_bx_berat: tulangan_pokok_x_bx_berat,
        tulangan_pokok_x_rx_jarak: tulangan_pokok_x_rx_jarak,
        jumlah_besi_pokok_x: jumlah_besi_pokok_x,

        tulangan_pokok_y_by: tulangan_pokok_y_by,
        tulangan_pokok_y_by_diameter: tulangan_pokok_y_by_diameter,
        tulangan_pokok_y_by_berat: tulangan_pokok_y_by_berat,
        tulangan_pokok_y_ry_jarak: tulangan_pokok_y_ry_jarak,
        jumlah_besi_pokok_y,

        wiremesh: wiremesh,
        wiremesh_diameter: wiremesh_diameter,
        wiremesh_berat: wiremesh_berat,

        k1 : k1,
        k2 : k2,
        k3 : k3,
        k4 : k4,
        k5 : k5,
        koefisien_kubikasi: koefisien_kubikasi,

        variable_pembesian_tul_pokok_x_atas :variable_pembesian_tul_pokok_x_atas,
        variable_pembesian_tul_pokok_x_bawah : variable_pembesian_tul_pokok_x_bawah,
        variable_pembesian_tul_pokok_y_atas : variable_pembesian_tul_pokok_y_atas,
        variable_pembesian_tul_pokok_y_bawah : variable_pembesian_tul_pokok_y_bawah,

        tul_x_panjang_unit : tul_x_panjang_unit.toFixed(3),
        tul_y_panjang_unit : tul_y_panjang_unit.toFixed(3),
        tul_x_berat_unit : tul_x_berat_unit.toFixed(3),
        tul_y_berat_unit : tul_y_berat_unit.toFixed(3),

        tul_x_panjang_m3 : tul_x_panjang_m3.toFixed(3),
        tul_y_panjang_m3 : tul_y_panjang_m3.toFixed(3),
        tul_x_berat_m3 :tul_x_berat_m3.toFixed(3),
        tul_y_berat_m3 : tul_y_berat_m3.toFixed(3),


        variable_pembesian_wiremesh_bawah : variable_pembesian_wiremesh_bawah,
        variable_pembesian_wiremesh_tumpuan_atas : variable_pembesian_wiremesh_tumpuan_atas,
        variable_pembesian_wiremesh_atas : variable_pembesian_wiremesh_atas,
        luas_wiremesh_unit : luas_wiremesh_unit.toFixed(3),
        berat_wiremesh_unit : berat_wiremesh_unit.toFixed(3),
        luas_wiremesh_m3 : luas_wiremesh_m3.toFixed(3),
        berat_wiremesh_m3 : berat_wiremesh_m3.toFixed(3)


    }

    console.log(dataPelat);

    var form = document.getElementById("form_cal_besi_pelat");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }

    if(tipe_besi_pelat == "besi_tulangan"){
        addRowTableBesiPelatTulangan(dataPelat);
    }
    else{
        addRowTableBesiPelatWiremesh(dataPelat);
    }


}

function addRowTableBesiPelatWiremesh(dataPelat){
    var html_row;
    var data = dataPelat;

    var table = document.getElementById('cal_besi_table_pelat_wiremesh');
    html_row += '<tr>';
    html_row += '<td>' + (table.rows.length - 2) + '</td>';
    html_row += '<td>' + data.pelat_name + '</td>';
    html_row += '<td>' + data.panjang + '</td>';
    html_row += '<td>' + data.lebar + '</td>';
    html_row += '<td>' + data.tinggi + '</td>';
    html_row += '<td>' + data.unit + '</td>';
    html_row += '<td>' + data.volume + '</td>';
    html_row += '<td> </td>';
    html_row += '<td>' + data.tipe_besi_pelat + '</td>';
    html_row += '<td>' + data.wiremesh + '</td>';
    html_row += '<td>' + data.luas_wiremesh_unit + '</td>';
    html_row += '<td>' + data.berat_wiremesh_unit + '</td>';
    html_row += '<td>' + data.luas_wiremesh_m3 + '</td>';
    html_row += '<td>' + data.berat_wiremesh_m3 + '</td>';
    html_row += '<td><button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>';
    html_row += '</tr>';

    $("#cal_besi_pelat_data_wiremesh").append(html_row)
}
    
    




function addRowTableBesiPelatTulangan(dataPelat){
    var html_row;
    var data = dataPelat;

    var table = document.getElementById('cal_besi_table_pelat');
    html_row += '<tr>';
    html_row += '<td>' + (table.rows.length - 2) + '</td>';
    html_row += '<td>' + data.pelat_name + '</td>';
    html_row += '<td>' + data.panjang + '</td>';
    html_row += '<td>' + data.lebar + '</td>';
    html_row += '<td>' + data.tinggi + '</td>';
    html_row += '<td>' + data.unit + '</td>';
    html_row += '<td>' + data.volume + '</td>';
    html_row += '<td> </td>';
    html_row += '<td>' + data.tipe_besi_pelat + '</td>';
    html_row += '<td>' + data.tulangan_pokok_x_bx_diameter + '</td>';
    html_row += '<td>' + data.tulangan_pokok_y_by_diameter + '</td>';
    html_row += '<td>' + data.tul_x_panjang_unit + '</td>';
    html_row += '<td>' + data.tul_y_panjang_unit + '</td>';
    html_row += '<td>' + data.tul_x_berat_unit + '</td>';
    html_row += '<td>' + data.tul_y_berat_unit + '</td>';
    html_row += '<td>' + data.tul_x_panjang_m3 + '</td>';
    html_row += '<td>' + data.tul_y_panjang_m3 + '</td>';
    html_row += '<td>' + data.tul_x_berat_m3 + '</td>';
    html_row += '<td>' + data.tul_y_berat_m3 + '</td>';
    html_row += '<td><button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>';
    html_row += '</tr>';

    $("#cal_besi_pelat_data").append(html_row)
}



function calculateBesiBalok() {

    var project = document.getElementById("balok_project").value;
    var building = document.getElementById("balok_building").value;
    var floor = document.getElementById("balok_floor").value; 

    var balok_name = document.getElementById("balok_name").value;
    var p = parseFloat(document.getElementById("balok_ud_panjang").value);
    var l = parseFloat(document.getElementById("balok_ud_lebar").value);
    var t = parseFloat(document.getElementById("balok_ud_tinggi").value);
    var unit = parseFloat(document.getElementById("balok_ud_unit").value);

    //hitung input volume
    // var v = parseFloat(p) * parseFloat(l) * parseFloat(t) * parseFloat(unit);
    var v = p * l * t * unit;


    var tipe_balok = document.getElementById("balok_db_tipe").value;
    var sb = parseFloat(document.getElementById("balok_db_selimut").value);


    //Not used?
    // var uj1 = document.getElementById("balok_db_uj1").value;
    // if (tipe_balok == "normal") {
    //     var uj2 = document.getElementById("balok_db_uj2").value;
    // }

    var pokok = document.getElementById("balok_dbesi_tulanganpokok");

    //input tulangan pokok
    var pokok_value = pokok.value;
    var pokok_diameter = parseFloat($("#balok_dbesi_tulanganpokok").find('option:selected').attr('one-value'));
    var pokok_berat = parseFloat($("#balok_dbesi_tulanganpokok").find('option:selected').attr('two-value'));


    var pokok_atas_tump_kiri = parseFloat(document.getElementById("balok_dbesi_tpa_tump_kiri").value);
    var pokok_atas_lapangan = parseFloat(document.getElementById("balok_dbesi_tpa_lapangan").value);
    var pokok_atas_tump_kanan = parseFloat(document.getElementById("balok_dbesi_tpa_tump_kiri").value);

    var pokok_bawah_tump_kiri = parseFloat(document.getElementById("balok_dbesi_tpb_tump_kiri").value);
    var pokok_bawah_lapangan = parseFloat(document.getElementById("balok_dbesi_tpb_lapangan").value);
    var pokok_bawah_tump_kanan = parseFloat(document.getElementById("balok_dbesi_tpb_tump_kanan").value);


    var begel = document.getElementById("balok_dbesi_tulanganbegel");

    //input tulangan begel
    var begel_value = begel.value;
    var begel_diameter = parseFloat($("#balok_dbesi_tulanganbegel").find('option:selected').attr('one-value'));
    var begel_berat = parseFloat($("#balok_dbesi_tulanganbegel").find('option:selected').attr('two-value'));

    var begel_tump_kiri = parseFloat(document.getElementById("balok_dbesi_tulanganbegel_tump_kiri").value);
    var begel_lapangan = parseFloat(document.getElementById("balok_dbesi_tulanganbegel_lapangan").value);
    var begel_tump_kanan = parseFloat(document.getElementById("balok_dbesi_tulanganbegel_tump_kanan").value);

    var begel_h_tump_kiri = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_tump_kiri").value);
    var begel_h_lapangan = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_lapangan").value);
    var begel_h_tump_kanan = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_tump_kanan").value);

    var begel_v_tump_kiri = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_tump_kiri").value);
    var begel_v_lapangan = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_lapangan").value);
    var begel_v_tump_kanan = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_tump_kanan").value);


    var begel_v_tump_kiri_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_tump_kiri_jumlah").value);
    var begel_v_lapangan_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_lapangan_jumlah").value);
    var begel_v_tump_kanan_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelv_tump_kanan_jumlah").value);


    var begel_h_tump_kiri_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_tump_kiri_jumlah").value);
    var begel_h_lapangan_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_lapangan_jumlah").value);
    var begel_h_tump_kanan_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbegelh_tump_kanan_jumlah").value);


    var badan = document.getElementById("balok_dbesi_tulanganbahan");

    //input tulangan bahan
    var badan_value = badan.value;
    var badan_diameter = parseFloat($("#balok_dbesi_tulanganbahan").find('option:selected').attr('one-value'));
    var badan_berat = parseFloat($("#balok_dbesi_tulanganbahan").find('option:selected').attr('two-value'));

    var badan_jumlah = parseFloat(document.getElementById("balok_dbesi_tulanganbahan_jumlah").value);

    //Menghitung JML. SENGKANG/BEGEL
    //Tumpuan kiri
    var jmlh_begel_tump_kiri = Math.ceil((0.25 * p) / (begel_tump_kiri / 1000));

    //Lapangan
    var jmlh_begel_lapangan = Math.ceil(((0.5 * p) / (begel_lapangan / 1000)) + 1);

    //Tumpuan kanan
    var jumlh_begel_tump_kanan = Math.ceil((0.25 * p) / (begel_tump_kanan / 1000));



    //Input Konstanta Kait Pokok (K1-K5)
    var k1_val = parseFloat(document.getElementById("balok_konstanta_kait_pokok").value);
    var k2_val = parseFloat(document.getElementById("balok_konstanta_kait_begel").value);
    var k3_val = parseFloat(document.getElementById("balok_konstanta_siku").value);
    var k4_val = parseFloat(document.getElementById("balok_konstanta_lewatan_uj1").value);
    var k5_val = parseFloat(document.getElementById("balok_konstanta_lewatan_uj2").value);



    //Menghitung koefisien kubikasi
    var koef_kubikasi = (1 / (l * t)) / p;
    //Menghitung Variable Pembesian Tulang Pokok Atas

    var tul_pokok_atas = roundUp(p + (((2 * k1_val) + (2 * k3_val) + k4_val + k5_val) / 1000));
    //Menghitung Variable Pembesian Tulang Pokok Bawah
    var tul_pokok_bawah = roundUp(p + (((2 * k1_val) + k4_val + k5_val) / 1000));
    //Menghitung Variable Pembesian Tulang Ekstra Atas Kiri
    var tul_extra_atas_kiri = roundUp((0.25 * p) + (0.5 * t) + (((2 * k1_val) + k3_val + k4_val) / 1000));
    //Menghitung Variable Pembesian Tulang Ekstra Atas Kanan
    var tul_extra_atas_kanan = roundUp((0.25 * p) + (0.5 * t) + (((2 * k1_val) + k3_val + k5_val) / 1000));
    //Menghitung Variable Pembesian Tulang Ekstra Tumpuan Bawah
    var tul_extra_tump_bawah = roundUp((0.25 * p) + (0.5 * t) + (((2 * k1_val) + k3_val + k5_val) / 1000));
    //Menghitung Variable Pembesian Tulang Ekstra Lapangan Bawah
    var tul_extra_lap_bawah = roundUp((0.5 * p) + t + (2 * k1_val / 1000));
    //Menghitung Variable Pembesian Tulang Badan
    var tul_badan = roundUp(p + (((2 * k1_val) + (2 * k3_val) + k4_val + k5_val) / 1000));
    //Menghitung Variable Pembesian Tulang BG-2
    var tul_bg_2 = roundUp(2 * ((l - (2 * sb / 1000)) + (t - (2 * sb / 1000)) + k2_val / 1000));




    //Menghitung Kebutuhan Besi Per Unit
    //Panjang Besi
    var panjang_besi_tulang_pokok_unit = (Math.min(pokok_atas_tump_kiri, pokok_atas_lapangan, pokok_atas_tump_kanan) * tul_pokok_atas) + (Math.min(pokok_bawah_tump_kiri, pokok_bawah_lapangan, pokok_bawah_tump_kanan) * tul_pokok_bawah);

    var panjang_besi_tulang_ekstra_unit = (Math.abs(pokok_atas_tump_kiri - pokok_atas_lapangan) * tul_extra_atas_kiri) + (Math.abs(pokok_atas_tump_kanan - pokok_atas_lapangan) * tul_extra_atas_kanan) + (Math.abs(pokok_bawah_tump_kiri - pokok_bawah_tump_kanan) * tul_extra_tump_bawah) + (Math.abs(pokok_bawah_lapangan - Math.min(pokok_bawah_lapangan, pokok_bawah_tump_kanan, pokok_bawah_tump_kiri)) * tul_extra_lap_bawah);
    var panjang_besi_tulang_badan_unit = (badan_jumlah * tul_badan);
    var panjang_besi_tulang_begel_unit = (tul_bg_2 * (jmlh_begel_tump_kiri + jumlh_begel_tump_kanan + jmlh_begel_lapangan) + (begel_h_tump_kiri * jmlh_begel_lapangan));

    dataTest = {
        test1: (Math.abs(pokok_atas_tump_kiri - pokok_atas_lapangan) * tul_extra_atas_kiri),
        test2: (Math.abs(pokok_atas_tump_kanan - pokok_atas_lapangan) * tul_extra_atas_kanan),
        test3: (Math.abs(pokok_bawah_tump_kiri - pokok_bawah_tump_kanan) * tul_extra_tump_bawah),
        test4: (Math.abs(pokok_bawah_lapangan - Math.min(pokok_bawah_lapangan, pokok_bawah_tump_kanan, pokok_bawah_tump_kiri)) * tul_extra_lap_bawah)
    };

    console.log(dataTest);

    //Berat Besi
    var berat_besi_tulang_pokok_unit = pokok_berat * panjang_besi_tulang_pokok_unit;
    var berat_besi_tulang_ekstra_unit = pokok_berat * panjang_besi_tulang_ekstra_unit;
    var berat_besi_tulang_badan_unit = badan_berat * panjang_besi_tulang_badan_unit;
    var berat_besi_tulang_begel_unit = begel_berat * panjang_besi_tulang_begel_unit;


    //Menghitung Kebutuhan Besi Per m3
    //Panjang Besi
    var panjang_besi_tulang_pokok_ekstra_m3 = koef_kubikasi * (panjang_besi_tulang_pokok_unit + panjang_besi_tulang_ekstra_unit);
    var panjang_besi_tulang_badan_m3 = koef_kubikasi * panjang_besi_tulang_badan_unit;
    var panjang_besi_tulang_begel_m3 = koef_kubikasi * panjang_besi_tulang_begel_unit;


    //Berat Besi
    var berat_besi_tulang_pokok_ekstra_m3 = pokok_berat * panjang_besi_tulang_pokok_ekstra_m3;
    var berat_besi_tulang_badan_m3 = badan_berat * panjang_besi_tulang_badan_m3;
    var berat_besi_tulang_begel_m3 = begel_berat * panjang_besi_tulang_begel_m3;



    dataCalculation = {


        project : project,
        building : building,
        floor : floor,
        balok_name: balok_name,
        panjang: p,
        lebar: l,
        tinggi: t,
        unit: unit,
        volume: v.toFixed(3),
        tipe_balok: tipe_balok,

        selimut_beton: sb,

        //Pokok
        pokok_id: pokok_value,
        pokok_berat: pokok_berat,

        pokok_atas_tump_kiri: pokok_atas_tump_kiri,
        pokok_atas_lapangan: pokok_atas_lapangan,
        pokok_atas_tump_kanan: pokok_atas_tump_kanan,

        pokok_bawah_tump_kiri: pokok_bawah_tump_kiri,
        pokok_bawah_lapangan: pokok_bawah_lapangan,
        pokok_bawah_tump_kanan: pokok_bawah_tump_kanan,


        //Begel
        begel_id: begel_value,
        begel_berat: begel_berat,


        begel_tump_kiri: begel_tump_kiri,
        begel_lapangan: begel_lapangan,
        begel_tump_kanan: begel_tump_kanan,

        begel_h_tump_kiri: begel_h_tump_kiri,
        begel_h_lapangan: begel_h_lapangan,
        begel_h_tump_kanan: begel_h_tump_kanan,

        begel_v_tump_kiri: begel_v_tump_kiri,
        begel_v_lapangan: begel_v_lapangan,
        begel_v_tump_kanan: begel_v_tump_kanan,

        begel_v_tump_kiri_jumlah: begel_v_tump_kiri_jumlah,
        begel_v_lapangan_jumlah: begel_v_lapangan_jumlah,
        begel_v_tump_kanan_jumlah: begel_v_tump_kanan_jumlah,

        begel_h_tump_kiri_jumlah: begel_h_tump_kiri_jumlah,
        begel_h_lapangan_jumlah: begel_h_lapangan_jumlah,
        begel_h_tump_kanan_jumlah: begel_h_tump_kanan_jumlah,


        //Badan
        badan_id: badan_value,
        badan_berat: badan_berat,
        badan_jumlah: badan_jumlah,



        jmlh_begel_tump_kiri: jmlh_begel_tump_kiri,
        jmlh_begel_lapangan: jmlh_begel_lapangan,
        jumlh_begel_tump_kanan: jumlh_begel_tump_kanan,



        //K value
        k1_val: k1_val,
        k2_val: k2_val,
        k3_val: k3_val,
        k4_val: k4_val,
        k5_val: k5_val,


        //Perhitungan
        koef_kubikasi: koef_kubikasi,
        tul_pokok_atas: tul_pokok_atas,
        tul_pokok_bawah: tul_pokok_bawah,
        tul_extra_atas_kiri: tul_extra_atas_kiri,
        tul_extra_atas_kanan: tul_extra_atas_kanan,
        tul_extra_tump_bawah: tul_extra_tump_bawah,
        tul_extra_lap_bawah: tul_extra_lap_bawah,
        tul_badan: tul_badan,
        tul_bg_2: tul_bg_2,


        pokok_diameter: pokok_diameter,
        begel_diameter: begel_diameter,
        badan_diameter: badan_diameter,
        extra_diameter: pokok_diameter,

        unit_panjang_besi_pokok: panjang_besi_tulang_pokok_unit.toFixed(2),
        unit_panjang_besi_ekstra: panjang_besi_tulang_ekstra_unit.toFixed(2),
        unit_panjang_besi_badan: panjang_besi_tulang_badan_unit.toFixed(2),
        unit_panjang_besi_begel: panjang_besi_tulang_begel_unit.toFixed(2),

        unit_berat_besi_pokok: berat_besi_tulang_pokok_unit.toFixed(2),
        unit_berat_besi_ekstra: berat_besi_tulang_ekstra_unit.toFixed(2),
        unit_berat_besi_badan: berat_besi_tulang_badan_unit.toFixed(2),
        unit_berat_besi_begel: berat_besi_tulang_begel_unit.toFixed(2),


        m3_panjang_pokok_ekstra: panjang_besi_tulang_pokok_ekstra_m3.toFixed(2),
        m3_panjang_badan: panjang_besi_tulang_badan_m3.toFixed(2),
        m3_panjang_begel: panjang_besi_tulang_begel_m3.toFixed(2),

        m3_berat_pokok_ekstra: berat_besi_tulang_pokok_ekstra_m3.toFixed(2),
        m3_berat_badan: berat_besi_tulang_badan_m3.toFixed(2),
        m3_berat_begel: berat_besi_tulang_begel_m3.toFixed(2),



    };

    console.log(dataCalculation);

    var form = document.getElementById("form_cal_besi_balok");
    var requiredInputs = form.querySelectorAll("input[required]");

    for (var i = 0; i < requiredInputs.length; i++) {
        if (requiredInputs[i].value === "") {
            return;
        }
    }
    addRowTableBesiBalok(dataCalculation);
}


function addRowTableBesiKolom(dataCalculation) {
    var html_row;
    var data = dataCalculation;

    var table = document.getElementById('cal_besi_table_kolom');
    html_row += '<tr>';
    html_row += '<td>' + (table.rows.length - 2) + '</td>';
    html_row += '<td>' + data.kolom_name + '</td>';
    html_row += '<td>' + data.panjang + '</td>';
    html_row += '<td>' + data.lebar + '</td>';
    html_row += '<td>' + data.tinggi + '</td>';
    html_row += '<td>' + data.unit + '</td>';
    html_row += '<td>' + data.volume + '</td>';
    html_row += '<td> </td>';
    html_row += '<td>' + data.tipe_kolom_text + '</td>';
    html_row += '<td>' + data.pokok_text + '</td>';
    html_row += '<td>' + data.begel_text + '</td>';
    html_row += '<td>' + data.besi_unit_panjang_besi_pokok + '</td>';
    html_row += '<td>' + data.besi_unit_panjang_besi_begel + '</td>';
    html_row += '<td>' + data.besi_unit_berat_besi_pokok + '</td>';
    html_row += '<td>' + data.besi_unit_berat_besi_begel + '</td>';
    html_row += '<td>' + data.besi_m3_panjang_besi_pokok + '</td>';
    html_row += '<td>' + data.besi_m3_panjang_besi_begel + '</td>';
    html_row += '<td>' + data.besi_m3_berat_besi_pokok + '</td>';
    html_row += '<td>' + data.besi_m3_berat_besi_begel + '</td>';


    html_row += '<td><button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>';
    html_row += '</tr>';

    $("#cal_besi_kolom_data").append(html_row)
}


function changePelatBesiType() {
    var pelat_besi_type = document.getElementById("pelat_dbesi_tipe_besi").value;

    if (pelat_besi_type == "besi_tulangan") {
        document.getElementById("besi_tulangan").style.display = "block";
        document.getElementById("wiremesh").style.display = "none";
        document.getElementById("table_tulangan").style.display = "block";
        document.getElementById("table_wiremesh").style.display = "none";
    } else {
        document.getElementById("besi_tulangan").style.display = "none"
        document.getElementById("wiremesh").style.display = "block"
        document.getElementById("table_tulangan").style.display = "none";
        document.getElementById("table_wiremesh").style.display = "block";
    }
}




function addRowTableBesiBalok(dataCalculation) {

    var html_row;
    var data = dataCalculation

    var table = document.getElementById('cal_besi_table_balok');

    html_row += '<tr>';
    html_row += '<td>' + (table.rows.length - 2) + '</td>';
    html_row += '<td>' + data.balok_name + '</td>';
    html_row += '<td>' + data.panjang + '</td>';
    html_row += '<td>' + data.lebar + '</td>';
    html_row += '<td>' + data.tinggi + '</td>';
    html_row += '<td>' + data.unit + '</td>';
    html_row += '<td>' + data.volume + '</td>';
    html_row += '<td>m3</td>';
    html_row += '<td>' + data.tipe_balok + '</td>';
    html_row += '<td>' + data.pokok_diameter + '</td>';
    html_row += '<td>' + data.extra_diameter + '</td>';
    html_row += '<td>' + data.badan_diameter + '</td>';
    html_row += '<td>' + data.begel_diameter + '</td>';
    html_row += '<td>' + data.unit_panjang_besi_pokok + '</td>';
    html_row += '<td>' + data.unit_panjang_besi_ekstra + '</td>';
    html_row += '<td>' + data.unit_panjang_besi_badan + '</td>';
    html_row += '<td>' + data.unit_panjang_besi_begel + '</td>';
    html_row += '<td>' + data.unit_berat_besi_pokok + '</td>';
    html_row += '<td>' + data.unit_berat_besi_ekstra + '</td>';
    html_row += '<td>' + data.unit_berat_besi_badan + '</td>';
    html_row += '<td>' + data.unit_berat_besi_begel + '</td>';
    html_row += '<td>' + data.m3_panjang_pokok_ekstra + '</td>';
    html_row += '<td>' + data.m3_panjang_badan + '</td>';
    html_row += '<td>' + data.m3_panjang_begel + '</td>';
    html_row += '<td>' + data.m3_berat_pokok_ekstra + '</td>';
    html_row += '<td>' + data.m3_berat_badan + '</td>';
    html_row += '<td>' + data.m3_berat_begel + '</td>';
    html_row += '<td><button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button></td>';
    html_row += '</tr>';

    $("#cal_besi_balok_data").append(html_row)

}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function clearFormBesiBalok() {

    Swal.fire({
        title: "Yakin akan membersihkan data?",
        text: "Data yang di hapus tidak dapat dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!"
    }).then((result) => {
        if (result.isConfirmed) {
            var form = document.getElementById("form_cal_besi_balok");
            inputs = form.getElementsByTagName("input");
            selects = form.getElementsByTagName("select");

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }

            for (var i = 0; i < selects.length; i++) {
                $(`#${selects[i].id}`).val("");
                $(`#select2-${selects[i].id}-container`).html("Pilih");
            }
        }
    });

}

function clearFormBesi(id) {

    Swal.fire({
        title: "Yakin akan membersihkan data?",
        text: "Data yang di hapus tidak dapat dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!"
    }).then((result) => {
        if (result.isConfirmed) {
            var form = document.getElementById(id);
            inputs = form.getElementsByTagName("input");
            selects = form.getElementsByTagName("select");

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }

            for (var i = 0; i < selects.length; i++) {
                $(`#${selects[i].id}`).val("");
                $(`#select2-${selects[i].id}-container`).html("Pilih");
            }
        }
    });

}




const floor_data = [];
const group_job_data = [];
function getDataGroupJob() {
    $.ajax({
        url: `/admin/master-data/group-job/data/all`,
        method: "get",
        success: function (response) {
            var data = response.data;
            data.forEach(group_job => {
                group_job_data.push(group_job)
            });
            console.log(group_job_data)
        },
        error: function (err) {
            console.log(err);
        },
    });
}
function getDataFloor() {
    $.ajax({
        url: `/admin/master-data/floor/data/all`,
        method: "get",
        success: function (response) {
            var data = response.data;
            data.forEach(floor => {
                floor_data.push(floor)
            });
            console.log(floor_data)
        },
        error: function (err) {
            console.log(err);
        },
    });


}
const data = getUrl();
function displayData(id = null, data_search = null, type = null) {
    $.ajax({
        url: `/admin/rancangan-anggaran-biaya/rab/create`,
        method: "get",
        success: function (response) {
            console.log(response)
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

let masterBuilding = "";
let masterFloor = "";
let masterJob = "";
let masterAHS = "";

// function getLOVMaster() {
//     $.ajax({
//         url: `/admin/master-data/building/data/all`,
//         method: "get",
//         success: function (response) {
//             const buildings = response.data;
//             for (let building of buildings) {
//                 masterBuilding += `<option value='${building.id}'>${building.building_name}</option>`;
//             }
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     });

//     $.ajax({
//         url: `/admin/master-data/floor/data/all`,
//         method: "get",
//         success: function (response) {
//             const floors = response.data;
//             for (let floor of floors) {
//                 masterFloor += `<option value='${floor.id_groups}'>${floor.name}</option>`;
//             }
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     });

//     $.ajax({
//         url: `/admin/master-data/job/data/all`,
//         method: "get",
//         success: function (response) {
//             const jobs = response.data;
//             for (let job of jobs) {
//                 masterJob += `<option value='${job.id}'>${job.job_name}</option>`;
//             }
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     });

//     $.ajax({
//         url: `/admin/project-management/ahs/ahs-master/data/all`,
//         method: "get",
//         success: function (response) {
//             const ahss = response.data;
//             for (let ahs of ahss) {
//                 masterAHS += `<option value='${ahs.id}'>${ahs.ahs_master_description}</option>`;
//             }
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     });
// }

function openModal(data, type, id = null) {
    if (type == "add") {
        $("#is_edit").val("N");
        $("#show-data-rab").hide();
        $("#btn-add-ahs").hide();
        $("#form-rab").show();
        $("#btn-back-ahs").show();
        $("#btn-save-ahs").show();
        $("#btn-update-ahs").hide();
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
        $("#show-data-detail-ahs").empty();

        $("#id_ahs").val("");
        $("#kode").val("");
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
                console.log(response)
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
                            console.log(response);
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
        //             // console.log(response);
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
            console.log("Delete");
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
                            console.log(response);
                            if (response.status == 300) {
                                Toast.fire({
                                    icon: "error",
                                    title: response.message,
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
    $("#detail-project").hide();
    var id_project = $("#id_project").val();
    if (id_project !== "") {
        $("#detail-project").show();
        $.ajax({
            url: `/admin/master-data/project/${id_project}/edit`,
            method: "get",
            dataType: "json",
            success: function (response) {
                var data = response.data;
                console.log(data)
                $("#project-phone").val(data.no_telp)
                $("#project-customer").val(data.owner)
                $("#project-address").text(data.name)
            },
        });
    }
}


function addDataRab() {
    const totalDetailRabData = $("#total-rab-data").val();
    $("#manage-data-rab").append(`<div id="detail-rab-${totalDetailRabData}">
                                    <table class="table table-bordered table-hover table-data">
                                        <tbody id="tbody-rab-${totalDetailRabData}">
                                            <tr class="font-weight-bold">
                                                <td colspan="3">
                                                    <select name="" id="" class="form-control form-control-sm">
                                                        <option value="">--Pilih Gedung--</option>
                                                        ${masterBuilding}
                                                    </select>
                                                </td>
                                                <td colspan="3">
                                                    <select name="" id="" class="form-control form-control-sm">
                                                        <option value="">--Pilih Lantai--</option>
                                                        ${masterFloor}
                                                    </select>
                                                </td>
                                                <td>
                                                    <button class="btn btn-outline-danger w-100">Delete</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="7">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <select name="" id="" class="form-control form-control-sm">
                                                                <option value="">--Pilih Pekerjaan--</option>
                                                                ${masterJob}
                                                            </select>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <select name="" id="" class="form-control form-control-sm">
                                                                <option value="">Master</option>
                                                                <option value="">Local</option>
                                                                <option value="">Custom</option>
                                                            </select>
                                                        </div>

                                                        <div class="col-md-5">
                                                            <select name="" id="" class="form-control form-control-sm">
                                                                <option value="">--Pilih AHS--</option>
                                                                ${masterAHS}
                                                            </select>
                                                        </div>
                                                        <div class="col-md-1">
                                                            <button class="btn btn-sm btn-outline-success p5x p3y"
                                                                onclick="addRABDetail()"><i class="fe fe-plus"></i></button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="font-weight-bold">
                                                <td>Pekerjaan</td>
                                                <td>Group Pekerjaan</td>
                                                <td>HSP</td>
                                                <td class="w-5p">Vol</td>
                                                <td>Unit</td>
                                                <td>HP</td>
                                                <td>Aksi</td>
                                            </tr>
                                            <tr id="rab-${totalDetailRabData}-1">
                                                <td>Pekerjaan Galian Lubang</td>
                                                <td>Pekerjaan Galian</td>
                                                <td>500.000</td>
                                                <td class="w-5p"><input type="text"
                                                        class="form-control form-control-sm" style="width: 50px"></td>
                                                <td>m3</td>
                                                <td>1.500.000</td>
                                                <td> <button class="btn btn-sm btn-outline-danger p5x p3y"
                                                        onclick="removeDetailRAB(1)"><i class="fe fe-trash"></i></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                </div>`);
}

function addBuilding(id = null, building_name = "") {
    var rowBuilding = addRowBuilding(id, building_name);
    if (document.getElementById(`row-building-${id}`)) {
        Toast.fire({
            icon: "error",
            title: `Data Gedung sudah di pilih`,
        });
        return;
    }
    $("#data-floor-ahs").append(rowBuilding)
    Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data Gedung`,
    });
    createBuildingJob(id, building_name);

    // $(`#gedung-${id}`).hide();
    // $("#gedung-terpilih")
    //     .append(`<div id="gedung-terpilih-${id}" class="col-12">
    //     <div class="input-group mb-1">
    //         <input type="text" name="gedung[]" class="form-control" value="${nama_gedung}" readonly>
    //         <div class="input-group-append">
    //             <button class="btn btn-sm btn-outline-danger" type="button" onclick="removeBuilding(${id})">
    //                 <i class="fe fe-trash"></i>
    //             </button>
    //         </div>
    //     </div>
    // </div>`);
}
// function htmlBuildingJob() {
//     var html_building_job = `<tbody> <tr id="row-job-building-${id_building}" class="font-weight-bold"> <td colspan="7"> <label for="">${building_name}</label> </td> </tr> </tbody>`;
//     return html_building_job;
// }

function createBuildingJob(id_building, building_name) {
    var html_building_job = `<tbody> <tr style="background: #c4d8ff;" id="row-job-building-${id_building}" class="font-weight-bold"> <td colspan="10"> <label for="">${building_name}</label> </td> </tr> </tbody>`;
    $("#table-master-ahs").append(html_building_job);
}

function removeBuilding(id = null) {
    console.log(id);
    $(`#gedung-${id}`).show();
    $(`#gedung-terpilih-${id}`).remove();
}


function addRowBuilding(id_building, building_name) {
    var htmlRowBuilding = `<tr id="row-building-${id_building}" class="font-weight-bold"> <td colspan="3"> <div class="row"> <div class="col-md-5"> <label for="">${building_name}</label> </div> <div class="col-md-6"> <div class="form-group mb-0 row align-items-center"> <div class="col-lg-2 col-3"> <label class="col-form-label">Lantai</label> </div> <div class="col-lg-10 col-9"> <select name="floor-building-${id_building}" id="floor-building-${id_building}" class="form-control form-control-sm"> <option value="">--Pilih Lantai--</option>`;
    floor_data.forEach(floor => {
        htmlRowBuilding += `<option value="${floor.id_groups}">${floor.name}</option>`;
    });

    htmlRowBuilding += `</select> </div> </div> </div> <div class="col-md-1"> <button class="btn btn-sm btn-outline-success p5x p3y" onclick="addFloor(${id_building})"><i class="fe fe-plus"></i></button> </div> </div> </td> </tr> <tr>`;
    return htmlRowBuilding;
}

function addRowFloor(id_building, id_floor, name_floor) {
    var htmlRowFloor = `<tr id="floor-building-${id_floor}-${id_building}"> <td>${name_floor}</td> <td class=""><span class="">Notes:</span> <input class="form-control form-control-sm" type="text" id="notes-floor-${id_floor}-${id_building}" onchange="changeNotesFloor()" /></td> <td style="width: 65px"> <button class="btn btn-sm btn-outline-danger p5x p3y" onclick="removeFloor(${id_building}, ${id_floor})"><i class="fe fe-trash"></i></button></td> </tr>`;
    return htmlRowFloor;
}

function changeNotesFloor() {

}

function addFloor(id_building) {
    var id_floor = $(`#floor-building-${id_building}`).val();
    if (id_floor == "") {
        Toast.fire({
            icon: "error",
            title: `Silahkan pilih lantai`,
        });
        return;
    }
    var name_floor = $(`#floor-building-${id_building} option:selected`).text();
    if (document.getElementById(`floor-building-${id_floor}-${id_building}`)) {
        Toast.fire({
            icon: "error",
            title: `Data Lantai sudah di pilih`,
        });
        return;
    }

    var rowFloor = addRowFloor(id_building, id_floor, name_floor);
    $(`#row-building-${id_building}`).after(rowFloor)
    Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data Lantai`,
    });
    $(`#floor-building-${id_building}`).val('')
    createFloorJob(id_building, id_floor, name_floor);
}

function createFloorJob(id_building, id_floor, name_floor) {
    var html_floor_job = `<tr id="row-building-floor-${id_building}-${id_floor}" class="font-weight-bold">
    <td colspan="10"> 
        <div class="row">
            <div class="col-md-2"> <label for="">${name_floor}</label> </div>
            <div class="col-md-4 d-flex justify-content-between">
            <label class="col-form-label mr-2">AHS</label> 
                <select onchange="chooseTypeAhs(${id_building}, ${id_floor})"
                id="ahs-type-${id_building}-${id_floor}" class="form-control form-control-sm">
                <option value="">--Pilih AHS--</option>
                <option value="MASTER">AHS Master</option>
                <option value="LOKAL">AHS Lokal</option>
                <option value="CUSTOM">AHS Custom</option>
            </select>
        </div>
            <div class="col-md-6 d-flex justify-content-between">
                <label class="col-form-label mr-2">Tipe AHS</label> 
                <select style="width:350px" onchange="chooseCategoryAhs(${id_building}, ${id_floor})"
                id="ahs-category-${id_building}-${id_floor}" class="form-control form-control-sm">
                <option value="">--Pilih Tipe AHS--</option>
                <option value="VCP">VCP</option>
                <option value="YOG">Yogyakarta</option>
                <option value="SNI">SNI</option>
            </select>
        
            </div>
        </div>
     </td>
</tr>
<tr>
    <td colspan="10">
        <div class="row">
            <div class="col-md-5">
                <div class="form-group mb-0 row align-items-center">
                    <div class="col-md-4"> <label class="col-form-label">Group Pekerjaan</label> </div>
                    <div class="col-md-8 pr-1"> <select onchange="chooseGroupAhs(${id_building}, ${id_floor})"
                            id="ahs-group-${id_building}-${id_floor}" class="form-control form-control-sm">
                            <option value="">--Pilih Group AHS--</option>`;
    group_job_data.forEach(gj => {
        html_floor_job += `<option value="${gj.id}">${gj.gj_name}</option>`;
    })
    html_floor_job += `</select></div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-0 row align-items-center">
                    <div class="col-lg-2 col-4 pr-2"> <label class="col-form-label">Pekerjaan</label> </div>
                    <div class="col-lg-10 col-9 pl-2"> 
                    <select id="job-${id_building}-${id_floor}"
                            class="form-control form-control-sm select2">
                            <option value="">--Pilih Pekerjaan--</option>
                        </select> </div>
                </div>
            </div>
            <div class="col-md-1"> <button class="btn btn-sm btn-outline-success p5x p3y"
                    onclick="addAHS(${id_building},${id_floor})"><i class="fe fe-plus"></i></button> </div>
        </div>
    </td>
</tr>
<tr class="font-weight-bold" id="header-building-floor-${id_building}-${id_floor}">
    <td class="w-20p">Pekerjaan</td>
    <td>Group Pekerjaan</td>
    <td>HSP</td>
    <td class="w-5p">Vol</td>
    <td class="w-8p">Unit</td>
    <td class="w-5p">Ov(%)</td>
    <td class="w-8p">Koef</td>
    <td class="w-15p">HP</td>
    <td class="w-15p">HP Ov.</td>
    <td class="w-5p">Aksi</td>
</tr> `;
    $(`#row-job-building-${id_building}`).after(html_floor_job)
}

function chooseGroupAhs(id_building, id_floor) {
    var type_ahs = $(`#ahs-type-${id_building}-${id_floor}`).val();
    var category_ahs = $(`#ahs-category-${id_building}-${id_floor}`).val();
    var id_group_job = $(`#ahs-group-${id_building}-${id_floor}`).val();
    // $(`#job-${id_building}-${id_floor}`).html('htmlAhsMaster');
    if (type_ahs == "" || category_ahs == "") {
        Toast.fire({
            icon: "error",
            title: `Silahkan Lengkapi Tipe dan Kategori AHS`,
        });
        $(`#ahs-group-${id_building}-${id_floor}`).val('');
        return;
    }
    $.ajax({
        url: `/admin/analisis-harga-satuan/ahs-master/get-data`,
        method: "post",
        data: {
            type_ahs,
            category_ahs,
            id_group_job
        },
        success: function (response) {
            var data = response.data;
            var htmlAhsMaster = `<option value="">--Pilih Pekerjaan--</option>`;
            if (data.length == 0) {
                Toast.fire({
                    icon: "error",
                    title: `Tidak terdapat data pekerjaan`,
                });
                return;
            }
            data.forEach(ahs_masters => {
                htmlAhsMaster += `<option value="${ahs_masters.id}">${ahs_masters.name_job}</option>`;
            });
            $(`#job-${id_building}-${id_floor}`).html(htmlAhsMaster);
        },
        error: function (err) {
            console.log(err);
        },
    });

}

function chooseTypeAhs(id_building, id_floor) {
    var valueAhsType = $(`#ahs-type-${id_building}-${id_floor}`).val();
    if (valueAhsType == "LOKAL") {
        $(`#location-${id_building}-${id_floor}`).show();
    } else {
        $(`#location-${id_building}-${id_floor}`).hide();
        // $.ajax({
        //     url: `/admin/analisis-harga-satuan/ahs-master/data/all`,
        //     method: "get",
        //     success: function (response) {
        //         var data = response.data;
        //         console.log(data)
        //         // var htmlAhsMaster = `<option value="">--Pilih Pekerjaan--</option>`;
        //         // data.forEach(ahs_masters => {
        //         //     htmlAhsMaster += `<option value="${ahs_masters.id}">${ahs_masters.name_job}</option>`;
        //         // });
        //         // $(`#job-${id_building}-${id_floor}`).html(htmlAhsMaster);
        //     },
        //     error: function (err) {
        //         console.log(err);
        //     },
        // });
    }
}


function calculateAhs(id_building, id_floor, id_ahs) {
    var ahsValue = $(`#ahs-total-${id_building}-${id_floor}-${id_ahs}`).val()
    var ahsVolume = $(`#volume-${id_building}-${id_floor}-${id_ahs}`).val()
    var ahsCoef = $(`#ahs-coef-${id_building}-${id_floor}-${id_ahs}`).val()
    var ahsHP = parseFloat(ahsValue) * parseFloat(ahsVolume) * parseFloat(ahsCoef);
    $(`#ahs-hp-${id_building}-${id_floor}-${id_ahs}`).val(ahsHP)

    var ahsOv = $(`#ahs-ov-${id_building}-${id_floor}-${id_ahs}`).val()
    var ahsHPover = ahsHP + ((parseFloat(ahsHP) * (ahsOv / 100)));
    // OVERHEAD
    $(`#ahs-hp-${id_building}-${id_floor}-${id_ahs}`).val(ahsHP)
    $(`#ahs-hp-ov-${id_building}-${id_floor}-${id_ahs}`).val(ahsHPover)

}

function createAhs(id_building, id_floor, id_ahs, ahs_type, name_job) {
    console.log(id_building, id_floor, id_ahs, ahs_type, name_job);
    $.ajax({
        // url: `/admin/project-management/ahs/ahs-master/data/${id_ahs}`,
        url: `/admin/analisis-harga-satuan/ahs-master/data/${id_ahs}`,
        method: "get",
        success: function (response) {
            var data = response.data;
            console.log(data)

            var htmlAhs = `<tr id="row-ahs-${ahs_type}-${id_building}-${id_floor}-${id_ahs}"> <td>${name_job}</td> <td>${data.name_sub}</td> <td>${data.hp_ahs}<input type="hidden" name="id_building[]" value="${id_building}" /> <input type="hidden" name="id_floor[]" value="${id_floor}" /> <input type="hidden" name="id_ahs[]" value="${id_ahs}" /><input type="hidden" name="id_class[]" value="${data.id_classjob}" /> <input type="hidden" name="id_group[]" value="${data.id_groupjob}" /> <input type="hidden" name="ahs_type[]" value="${ahs_type}" /> <input type="hidden" name="ahs_value[]" value="${data.hp_ahs}" id="ahs-total-${id_building}-${id_floor}-${id_ahs}" /> </td> <td class="w-5p"><input type="text" class="form-control form-control-sm" style="width: 50px" name="volume[]" id="volume-${id_building}-${id_floor}-${id_ahs}" onchange="calculateAhs(${id_building}, ${id_floor}, ${id_ahs})"></td> <td>${data.unit_name}</td> <td><input name="ahs_ov[]" id="ahs-ov-${id_building}-${id_floor}-${id_ahs}" type="text" class="form-control form-control-sm bg-transparent" value="10" onchange="calculateAhs(${id_building}, ${id_floor}, ${id_ahs})"></td> <td><input onchange="calculateAhs(${id_building}, ${id_floor}, ${id_ahs})" name="ahs_coef[]" id="ahs-coef-${id_building}-${id_floor}-${id_ahs}" type="text" class="form-control form-control-sm bg-transparent" value="1"></td> <td><input style="width:90px" name="ahs_hp[]" id="ahs-hp-${id_building}-${id_floor}-${id_ahs}" type="text" class="form-control form-control-sm bg-transparent" readonly></td> <td><input name="ahs_hp_ov[]" style="width:90px" id="ahs-hp-ov-${id_building}-${id_floor}-${id_ahs}" type="text" class="form-control form-control-sm bg-transparent" readonly></td> <td> <button class="btn btn-sm btn-outline-danger p5x p3y" onclick="removeAhs(${id_building}, ${id_floor}, ${id_ahs}, ${ahs_type})"><i class="fe fe-trash"></i></button></td> </tr>`;

            $(`#header-building-floor-${id_building}-${id_floor}`).after(htmlAhs)
            Toast.fire({
                icon: "success",
                title: `Berhasil menambahkan data AHS`,
            });
            $(`#job-${id_building}-${id_floor}`).val('')
        },
        error: function (err) {
            console.log(err);
        },
    });



    // var rowFloor = addRowFloor(id_building, id_floor, name_floor);
}

function addAHS(id_building, id_floor) {
    var id_ahs = $(`#job-${id_building}-${id_floor}`).val();
    if (id_ahs == "") {
        Toast.fire({
            icon: "error",
            title: `Silahkan pilih data AHS`,
        });
        return;
    }
    var name_job = $(`#job-${id_building}-${id_floor} option:selected`).text();
    var ahs_type = $(`#ahs-type-${id_building}-${id_floor}`).val();
    if (document.getElementById(`row-ahs-${ahs_type}-${id_building}-${id_floor}-${id_ahs}`)) {
        Toast.fire({
            icon: "error",
            title: `Data AHS sudah terpilih`,
        });
        return;
    }
    createAhs(id_building, id_floor, id_ahs, ahs_type, name_job)
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
