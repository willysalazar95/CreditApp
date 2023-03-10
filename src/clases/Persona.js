import axios from "axios";

export class Persona {
  nIdPers;
  cPersDNI;
  cPersNombres;
  cPersApellidos;
  cPersDireccion;
  cPersTelefono;
  cPersFechNac;
  nEstado;

  async registerPersona(
    DNI,
    NOMBRE,
    APELLIDO,
    DIRECCION,
    TELEFONO,
    FECHANACIMIENTO
  ) {
    const BASE_URL = "http://aagc.somee.com/api/personas/RegistrarPersona";
    try {
      const response = await axios.post(BASE_URL, {
        cPersDNI: DNI,
        cPersNombres: NOMBRE,
        cPersApellidos: APELLIDO,
        cPersDireccion: DIRECCION,
        cPersTelefono: TELEFONO,
        cPersFechNac: FECHANACIMIENTO,
      });

      const Resp = response.data.code;

      if (Resp == 200) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: "No se pudo registrar el usuario" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default Persona;
