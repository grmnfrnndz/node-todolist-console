require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/iniquirer');
const Tareas = require('./models/tareas');


const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB) {
        // establecer tareas desde el archivo JSON
        tareas.crearTareasFromArray(tareasDB);
    }

    do {
        // imprimiendo menu
        opt = await inquirerMenu();    
        // console.log({opt});

        switch (opt) {
            case '1':
                // crear tarea
                const desc = await leerInput('Descripcion tarea');
                tareas.crearTarea(desc);
                break;
            case '2':
                // imprimiendo tareas
                tareas.listadoCompleto();
                break;
            case '3':
                // imprimiendo tareas completadas
                tareas.listarPendienteCompletada();
                break;
            case '4':
                // imprimiendo tareas pendientes
                tareas.listarPendienteCompletada(false);
                break;
            case '5':
                // completar tarea
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                // borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const respuesta = await confirmar(`Desea borrar el id: ${id}`);
                    if (respuesta) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada.');
                    };
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}


main();
