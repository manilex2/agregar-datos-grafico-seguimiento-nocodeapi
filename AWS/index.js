require('./keys');
require('dotenv').config()
const mysql = require('mysql2');
const fetch = require('node-fetch');
const { database } = require('./keys');
    
exports.handler = async function (event) {

    const conexion = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        port: database.port,
        database: database.database
    });

    const promise = new Promise(function() {
        fetch(`${process.env.URL_NOCODEAPI}`).then((res)=>{
            return res.json();
        }).then((json)=>{
            var recogerDatos = json;
            mostrarDatos(recogerDatos);
        })
    })

    function mostrarDatos(recogerDatos) {

        for (let i = 0; i < recogerDatos.data.length; i++) {
            if (recogerDatos.data[i].PreOp == '' || recogerDatos.data[i].PreOp === undefined) {
                recogerDatos.data[i].PreOp = 0;
            }
            if (recogerDatos.data[i].ProPost == '' || recogerDatos.data[i].ProPost === undefined){
                recogerDatos.data[i].ProPost = 0;
            }
            if (recogerDatos.data[i].P1 == '' || recogerDatos.data[i].P1 === undefined){
                recogerDatos.data[i].P1 = 0;
                p1Num = recogerDatos.data[i].P1;
            }else {
                let p1 = recogerDatos.data[i].P1;
                var p1Num = p1.replace(/[$]/g, "");
                p1Num = Number(p1Num);
            }
            if (recogerDatos.data[i].P2 == '' || recogerDatos.data[i].P2 === undefined){
                recogerDatos.data[i].P2 = 0;
                p2Num = recogerDatos.data[i].P2;
            }else {
                let p2 = recogerDatos.data[i].P2;
                var p2Num = p2.replace(/[$]/g, "");
                p2Num = Number(p2Num);
            }
            if (recogerDatos.data[i].P3 == '' || recogerDatos.data[i].P3 === undefined){
                recogerDatos.data[i].P3 = 0;
                p3Num = recogerDatos.data[i].P3;
            }else {
                let p3 = recogerDatos.data[i].P3;
                var p3Num = p3.replace(/[$]/g, "");
                p3Num = Number(p3Num);
            }
            if (recogerDatos.data[i].P4 == '' || recogerDatos.data[i].P4 === undefined){
                recogerDatos.data[i].P4 = 0;
                p4Num = recogerDatos.data[i].P4;
            }else {
                let p4 = recogerDatos.data[i].P4;
                var p4Num = p4.replace(/[$]/g, "");
                p4Num = Number(p4Num);
            }
            if (recogerDatos.data[i].PM == '' || recogerDatos.data[i].PM === undefined){
                recogerDatos.data[i].PM = 0;
                pmNum = recogerDatos.data[i].PM;
            }else {
                let pm = recogerDatos.data[i].PM;
                var pmNum = pm.replace(/[$]/g, "");
                pmNum = Number(pmNum);
            }
            if (recogerDatos.data[i].PM2 == '' || recogerDatos.data[i].PM2 === undefined){
                recogerDatos.data[i].PM2 = 0;
                pm2Num = recogerDatos.data[i].PM2;
            }else {
                let pm2 = recogerDatos.data[i].PM2;
                var pm2Num = pm2.replace(/[$]/g, "");
                pm2Num = Number(pm2Num);
            }
            if (recogerDatos.data[i].SL == '' || recogerDatos.data[i].SL === undefined){
                recogerDatos.data[i].SL = 0;
                slNum = recogerDatos.data[i].SL;
            }else {
                let sl = recogerDatos.data[i].SL;
                var slNum = sl.replace(/[$]/g, "");
                slNum = Number(slNum);
            }
            if (recogerDatos.data[i].SL2 == '' || recogerDatos.data[i].SL2 === undefined){
                recogerDatos.data[i].SL2 = 0;
                sl2Num = recogerDatos.data[i].SL2;
            }else {
                let sl2 = recogerDatos.data[i].SL2;
                var sl2Num = sl2.replace(/[$]/g, "");
                sl2Num = Number(sl2Num);
            }
            var sql = `INSERT INTO datos (ticker, indice, fecha, preop, propost, p1, p2, p3, p4, pm, pm2, sl, sl2) VALUES ('${recogerDatos.data[i].Ticker}', '${recogerDatos.data[i].Index}', '${recogerDatos.data[i].Fecha}', ${recogerDatos.data[i].PreOp}, ${recogerDatos.data[i].ProPost}, ${p1Num}, ${p2Num}, ${p3Num}, ${p4Num}, ${pmNum}, ${pm2Num}, ${slNum}, ${sl2Num})`;
            conexion.query(sql, function (err, resultado) {
                if (err) throw err;
                console.log(resultado);
            });
        }
    }
    return promise
}