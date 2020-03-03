
function retriveActivityReport(token, date) {

    var url = '../CrowdBI/ActivityReport';
    var para = {};
    para['date'] = date;
    para['token'] = token;
    getActiveCSVData(url, para).done(function (data) {
        if (data.result == 'success') {
            csv_data = data.csv_data;
            proccessCSVData(csv_data);
        } else {
            alert(data.result);
        }
    });
}

function proccessCSVData(csv_data) {
    var para = {};
    para['type'] = 'a_com_1';
    activeCSVDataMapping(
        csv_data, para
        , function (d) { return { a: d.a, b: d.b, c: parseInt(d.c, 10) } }
        , comA1DataIsReady
    );
    para['type'] = 'a_com_2';
    activeCSVDataMapping(
        csv_data, para
        , function (d) { return { 'a': d.a, 'b': parseInt(d.b, 10) } }
        , comA2DataIsReady
        );
    para['type'] = 'a_fig';
    activeCSVDataMapping(
        csv_data, para
        , function (d) { return { 'time_a': d.time_a, 'sinlog': d.sinlog, 'cnt': parseInt(d.cnt, 10) } }
        , figaDataIsReady
    );
    para['type'] = 'b_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': d.c, 'd': d.d, 'e': d.e } }
    , comB1DataIsReady
    );
    para['type'] = 'b_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'sinlog': d.sinlog, 'percent': parseFloat(d.percent) } }
    , figbDataIsReady
    );
    para['type'] = 'c_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': d.c, 'd': d.d, 'e': d.e } }
    , comC1DataIsReady
    );
    para['type'] = 'c_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'sinlog': d.sinlog, 'cnt': parseInt(d.cnt), 'avgTime': parseInt(d.avg_time) } }
    , figCDataIsReady
    );
    para['type'] = 'd_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseInt(d.c, 10), 'd': d.d, 'e': parseInt(d.e, 10), 'f': parseFloat(d.f) } }
    , comD1DataIsReady
    );
    para['type'] = 'd_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'time_a': d.time_a, 'county': d.county, 'cnt': parseInt(d.cnt, 10) } }
    , figDDataIsReady
    );
    para['type'] = 'e_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseInt(d.c, 10), 'd': d.d, 'e': parseInt(d.e, 10), 'f': parseInt(d.f) } }
    , comE1DataIsReady
    );
    para['type'] = 'e_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'time_a': d.time_a, 'town': d.town, 'cnt': parseInt(d.cnt, 10) } }
    , figEDataIsReady
    );
    para['type'] = 'f_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': parseInt(d.b), 'c': parseFloat(d.c) } }
    , comF1DataIsReady
    );
    para['type'] = 'f_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'otype': d.otype, 'percent': parseFloat(d.percent) } }
    , figFDataIsReady
    );
    para['type'] = 'f_table';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'otype': d.otype, 'percent': parseFloat(d.percent), 'cnt': parseInt(d.cnt) } }
    , tableF1DataIsReady
    );
    para['type'] = 'g_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': parseInt(d.b), 'c': d.c, 'd': parseFloat(d.d) } }
    , comG1DataIsReady
    );
    para['type'] = 'g_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'otype': d.otype, 'percent': parseFloat(d.percent) } }
    , figGDataIsReady
    );
    para['type'] = 'g_table';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'otype': d.otype, 'percent': parseFloat(d.percent), 'cnt': parseInt(d.cnt) } }
    , tableG1DataIsReady
    );
    para['type'] = 'h_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': d.c } }
    , comH1DataIsReady
    );
    para['type'] = 'h_com_2';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': d.c } }
    , comH2DataIsReady
    );
    para['type'] = 'h_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'time_a': d.time_a, 'age_type': d.age_type, 'cnt': parseInt(d.cnt, 10) } }
    , figHDataIsReady
    );
    para['type'] = 'i_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseFloat(d.c) } }
    , comI1DataIsReady
    );
    para['type'] = 'i_com_2';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseInt(d.c) } }
    , comI2DataIsReady
    );
    para['type'] = 'i_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'age_type': d.age_type, 'percent': parseFloat(d.percent), 'avg_stay': parseInt(d.avg_stay) } }
    , figIDataIsReady
    );
    para['type'] = 'j_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': parseInt(d.b), 'c': d.c, 'd': parseInt(d.d) } }
    , comJ1DataIsReady
    );
    para['type'] = 'j_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'county': d.county, 'avg_age': parseInt(d.avg_age), 'cnt': parseInt(d.cnt) } }
    , figJDataIsReady
    );
    para['type'] = 'k_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': parseInt(d.b), 'c': d.c, 'd': parseInt(d.d) } }
    , comK1DataIsReady
    );
    para['type'] = 'k_fig';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'town': d.town, 'avg_age': parseInt(d.avg_age), 'cnt': parseInt(d.cnt) } }
    , figKDataIsReady
    );

    // add 


    para['type'] = 'su_main_setting';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': parseInt(d.a), 'b': d.b, 'c': parseInt(d.c), 'd': d.d } }
    , comSu1DataIsReady
    );
    
    para['type'] = 'su_com_1';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': parseInt(d.a), 'b': d.b, 'c': parseInt(d.c), 'd': d.d } }
    , comSu1DataIsReady
    );
    
    para['type'] = 'su_com_2';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseFloat(d.c), 'd': d.d, 'e': d.e} }
    , comSu2DataIsReady
    );
    
    para['type'] = 'su_com_3';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': d.a, 'b': d.b, 'c': parseFloat(d.c) } }
    , comSu3DataIsReady
    );
    
    para['type'] = 'su_com_4';
    activeCSVDataMapping(
    csv_data, para
    , function (d) { return { 'a': parseFloat(d.a), 'b': parseInt(d.b)} }
    , comSu4DataIsReady
    );
}
    