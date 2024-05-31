const saveData = (grup = NULL, type) => {
    if (grup == 'opname') {
        switch (type) {
            case 'main':
                $("#work-plan-form-main-opname").hide();
                $("#work-plan-form-detail-opname").show();
                break;
        }
    } else {
        switch (type) {
            case 'main':
                $("#work-plan-form-main").hide();
                $("#work-plan-form-detail").show();
                break;
            case 'detail':
                $("#work-plan-form-detail").hide();
                $("#work-plan-form-detail-job").show();
                break;
            case 'detail-job':
                $("#work-plan-form-detail-job").hide();
                $("#work-plan-form-cashflow").show();
            case 'cashflow':
                $("#work-plan-form-cashflow").hide();
                $("#work-plan-form-cashflow-detail").show();
                break;
        }
    }
}

const backAction = (grup = NULL, type) => {
    if (grup == 'opname') {
        switch (type) {
            case 'main':
                $("#work-plan-form-main-opname").show();
                $("#work-plan-form-detail-opname").hide();
                break;
        }
    } else {
        switch (type) {
            case 'main':
                $("#work-plan-form-main").show();
                $("#work-plan-form-detail").hide();
                break;
            case 'detail':
                $("#work-plan-form-detail").show();
                $("#work-plan-form-detail-job").hide();
                break;
            case 'detail-job':
                $("#work-plan-form-detail-job").show();
                $("#work-plan-form-cashflow").hide();
                break;
            case 'cashflow':
                $("#work-plan-form-cashflow").show();
                $("#work-plan-form-cashflow-detail").hide();
                // $("#work-plan-form-cashflow").show();
                break;
        }
    }

}
