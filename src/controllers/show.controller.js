const { request, response } = require("express");

const Show = require("../models/show");

// Controlador entidad shows CRUD completo
const getShows = async (req = request, res = response) => {
  // Como tenemos que hacer una consulta a BBDD
  // declaramos un try/catch para manejar el error en caso
  // de que falle nuestra conexion con la BBDD
  // o cualquier error que tengamos con los datos requeridos para la consulta
  try {
    // Consulta BBDD
    const shows = await Show.find();

    // Validacion para mostrar al usuario en caso
    // de que no tengamos ningun shows en BBDD
    if (shows.length === 0) {
      return res.status(400).json({ msg: "No shows" });
    }

    // Respuesta a el usuario si la consuta ha ido bien
    // Status 200 success
    res.status(200).json({ data: shows });
  } catch (error) {
    // Respuesta a el usuario si obtenemos un error
    // Status 500 server error
    res.status(500).json({ error: "internal.error" });
  }
};

const createShow = async (req = request, res = response) => {
  const show = new Show(req.body);

  // Validar title y category del modelo show

  try {
    await show.save();
    // Status 204 No Content
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal.error" });
  }
};

const updateShow = async (req = request, res = response) => {
  const { idShow } = req.params;
  const body = req.body;

  if (!idShow) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const showUpdated = await Show.findByIdAndUpdate(idShow, body);
    res.status(200).json(showUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal.error" });
  }
};

const deleteShow = async (req = request, res = response) => {
  const { idShow } = req.params;

  if (!idShow) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    await Show.findByIdAndRemove(idShow);
    res.status(200).json({ msg: "Show has been removed" });
  } catch (error) {
    res.status(500).send({ error: "internal.error" });
  }
};

module.exports = {
  getShows,
  createShow,
  updateShow,
  deleteShow,
};
