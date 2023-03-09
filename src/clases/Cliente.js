import axios from "axios";

export class Cliente {

	async ListarPersonas() {
		const BASE_URL = "http://aagc.somee.com/api/personas/";

		try {
			const response = await axios.get(BASE_URL + "ListarPersonas", {});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
//http://aagc.somee.com/api/personas/RegistrarPersona?nIdPers=1&cPersDNI=1&cPersNombres=1&cPersApellidos=1&cPersDireccion=1&cPersTelefono=1&cPersFechNac=1&nEstado=1
	async RegistroPersona(nIdPers, cPersDNI, cPersNombres, cPersApellidos, cPersDireccion, 
							cPersTelefono, cPersFechNac, nEstado) {
		const BASE_URL = "http://aagc.somee.com/api/personas/";
		try {
			const response = await axios.post(BASE_URL + "RegistrarPersona", {
				params: {
					nIdPers : '1',
					cPersDNI : '1',
					cPersNombres : '1',
					cPersApellidos : '1',
					cPersDireccion : '1',
					cPersTelefono : '1',
					cPersFechNac : '1',
					nEstado : '1',
				},
			});

			const Resp = response.data.code;
			const Lista = response.data.data;
			console.log(response.data.error);
			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: Resp + ' ' +  response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
}