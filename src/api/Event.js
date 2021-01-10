import Api from "./Api";
import XLSX from "xlsx";

export default {
    /**
     * Guardar evento.
     * @param {Object} Data -Objeto del dato a guardar.
     * @param {function} callback - respuesta sastifactoria
     * @param {function} callbackError - respuesta con error.
     */

    data: () => {
        return {
            exportTable:[]
        }  
    },
    
    store(data,callback,callbackError){
        Api.post('api/evento/store',data)
            .then((response) => {
                callback(response) 
            }) 
            .catch((error) => {
                callbackError(error);
            })
    },
    update(data,callback,callbackError){
        Api.post('api/evento/edit/'+data.id, data)
          .then(response=>{
            callback(response) 
          })
          .catch(error=>{
              console.log(error)
              callbackError(error);
          })
    },
    destroy(data, callback, callbackError){
        Api.post('api/evento/destroy',data)
        .then((res)=>{
            callback(res) 
        })
        .catch((error)=>{
            callbackError(error);
        })
    },
    getEvents(){
        try {
            return Api.get('api/evento');
        } catch (error) {
            return error;
        }
    },
    getEventsforDate(date){
        try {
            return Api.get('api/eventForDate/'+ date)
        } catch (error) {
            return error;
        }
    },
    exportarAlumnos(data, callback, callbackError){
        Api.get('api/event/reports/exportExcel/'+data)
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
    exportarEvents(data, callback, callbackError){
        Api.get('api/event/reports/exportExcelEvents/'+ data)
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
    exportarPeriodEvents(data, callback, callbackError){
        console.log("Aqui Igual", data.finalDate, "aui", data.initialDate)
        Api.get('api/event/reports/exportExcelPeriodEvents/'+ data.initialDate +'/'+ data.finalDate)
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
    getEventsForStudents(){
        try {
            return Api.get('api/eventoForStudents');
        } catch (error) {
            return error;
        }
    },
    
}