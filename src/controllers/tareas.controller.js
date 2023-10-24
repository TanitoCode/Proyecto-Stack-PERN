import {pool} from '../db.js';

export const listarTareas = (req, res) => res.send('obteniendo tareas');
export const listarTarea = (req, res) => res.send('Obteniendo tarea unica');

export const crearTarea = async(req, res, next) => {
    const { titulo, descripcion } = req.body;
    

    try { 
        throw new Error('Algo salio mal')
        const {rows} = await pool.query('INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)', [titulo, descripcion]);
        console.log(rows);
        res.send('creando tarea');
    } catch (error){
        if (error.code === '23505') {
            return res.send('Ya existe una tarea con ese titulo');
        }
        console.log(error);
        next(error);
        
    }


}

export const actualizarTarea = (req, res) => res.send('Actualizando tarea unica');

export const eliminarTarea = (req, res) => res.send('Eliminando tarea unica');