import Api from "./Api";
import XLSX from "xlsx";

export default{

    getAcomData(){
        try {
            return Api.get('api/acom/configuration');
        } catch (error) {
            return error;
        }
    },
    getAcoms(){
        try {
            return Api.get('api/acom/index');
        } catch (error) {
            return error;
        }
    },
    updateacom(data,callback,callbackError){
        Api.post('api/acom/configuration/'+data.id, data)
            .then(response=>{
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    },
    crear(data,callback,callbackError){
        console.log(data.alumno_id)
        Api.post('api/acom/store/'+data.alumno_id, data)
            .then(response=>{
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    },
    deliver(data, callback, callbackError){
        Api.post('api/acom/deliver/'+data.id)
        .then((res)=>{
            callback(res) 
        })
        .catch((error)=>{
            callbackError(error);
        })
    },
    exportarAcomLiberados(data, callback, callbackError){
        Api.get('api/acom/reports/exportarAcomLiberados/'+ data.initialDate +'/'+ data.finalDate)
            .then(response=>{
                this.exportTable = response.data
                const workbook = XLSX.utils.book_new()
                const filename = 'Reporte'
                let data = XLSX.utils.json_to_sheet(this.exportTable)
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    },
    exportarAcomsPendientes(callback, callbackError){
        Api.get('api/acom/reports/exportarAcomsPendientes')
            .then(response=>{
                this.exportTable = response.data
                const workbook = XLSX.utils.book_new()
                const filename = 'Reporte'
                let data = XLSX.utils.json_to_sheet(this.exportTable)
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    },

}