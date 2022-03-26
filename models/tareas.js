const Tarea = require('./tarea');

class Tareas {

    _listado = {};


    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTareasFromArray = (tareas = []) => {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, indice) => {
            const {desc, completadoEn} = tarea;
            const estadoTarea = (completadoEn !== null)
                ? 'Completada'.green 
                : 'Pendiente'.red;
            const idx = `${indice + 1}.`.green;
            console.log(`${idx}  ${desc} :: ${estadoTarea}`);            
        });
    }

    listarPendienteCompletada(completadas = true) {
        console.log();
        let contador = 1;
        this.listadoArr.forEach( tarea => {
            const {desc, completadoEn} = tarea;
            const estadoTarea = (completadoEn)
                ? 'Completada'.green 
                : 'Pendiente'.red;
            const idx = `${contador}.`.green;

            if (completadas && completadoEn) {
                console.log(`${idx}  ${desc} :: ${completadoEn.green}`);            
                contador++;
            }
            else if (!completadas && !completadoEn) {
                console.log(`${idx}  ${desc} :: ${estadoTarea}`);
                contador++;
            }
            
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    } 

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;
