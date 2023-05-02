import ManagerUsuarios from "./managers/ManagerUsuarios.js";

const manager = new ManagerUsuarios();


const env = async () => {

    let usuario = {
        nombre: 'Roman',
        apellido: 'Piacquadio',
        edad: 31,
        curso: 'Backend'
    }

    let usuario2 = {
        nombre: 'Nicolas',
        apellido: 'Varveri',
        edad: 36,
        curso: 'Backend'
    }

    await manager.crearUsuario(usuario)
    await manager.crearUsuario(usuario2)

    let result = await manager.consultarUsuarios()

    console.log(result)

};


env();
