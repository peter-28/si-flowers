function chooseTipeBahan() {
    const id_type = $("#type").val();
    console.log(id_type);
    if (id_type === "1" || id_type === "3") {
        this.typeBesiTulangan();
    } else if (id_type === "2") {
        this.typeKawatBaja();
    }
}

function changeHeaderName(id_type) {
    let header = [
        {
            title: 'Penampang/Dimensi',
            targets: 4
        },
        {
            title: 'Berat (kg/btg)/(kg/lbr)',
            targets: 5
        }
    ];
    if (id_type === "1") {
        header = [
            {
                title: 'Penampang',
                targets: 4
            },
            {
                title: 'Berat (kg/btg)',
                targets: 5
            }
        ];
    } else if (id_type === "2") {
        header = [
            {
                title: 'Dimensi',
                targets: 4
            },
            {
                title: 'Berat (kg/lbr)',
                targets: 5
            }
        ];
    }
    return header;
}


function filterTipeBahan() {
    const id_type = $("#ftype").val();
    let url = `/admin/master-data/besi-tulangan/create`;
    if (id_type === "1" || id_type === "2" || id_type === "3") {
        url = `/admin/master-data/besi-tulangan/create?q=` + id_type;
    }
    // let header = changeHeaderName(id_type);
    $.ajax({
        url: url,
        method: "get",
        success: async function (response) {
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


function clearSelectOptionBesi(data, placeholder, type) {
    document.getElementById(`${data}`).selectedIndex = 0;
    $(`#select2-${data}-container`).html(`${placeholder}`);
    filterTipeBahan();

}

function typeBesiTulangan() {
    $("#f-name").hide();
    $("#name").removeAttr("required");
    $("#l-penampang-or-dimensi").html("Penampang (mm) <sup style='color:red'>*</sup>");
    $("#penampang_or_dimensi").attr("placeholder", "Penampang produk");
    $("#l-berat-btg-or-lbr").html("Berat kg/btg <sup style='color:red'>*</sup>");
    $("#berat_btg_or_lbr").attr("placeholder", "Berat kg/btg");
    $("#l-berat-m2").html("Berat kg/m' <sup style='color:red'>*</sup>");
    $("#r-berat-m2").attr("placeholder", "Berat kg/m'");
}

function typeKawatBaja() {
    $("#f-name").hide();
    $("#name").removeAttr("required");
    $("#l-penampang-or-dimensi").html("Dimensi (m x m) <sup style='color:red'>*</sup>");
    $("#penampang_or_dimensi").attr("placeholder", "Dimensi produk");
    $("#l-berat-btg-or-lbr").html("Berat kg/lbr <sup style='color:red'>*</sup>");
    $("#berat_btg_or_lbr").attr("placeholder", "Berat kg/lbr");
    $("#l-berat-m2").html("Berat kg/m<sup>2</sup> <sup style='color:red'>*</sup>");
    $("#r-berat-m2").attr("placeholder", "Berat kg/m2");
}

$('#modal-besi-tulangan').on('shown.bs.modal', function (e) {
    $('#type').trigger('change');
})
