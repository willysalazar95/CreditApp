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

	async RegistroPersona(cPersDNI, cPersNombres, cPersApellidos, cPersDireccion, 
							cPersTelefono, cPersFechNac) {
		const BASE_URL = "http://willy95.somee.com/api/personas/";
		try {
			const response = await axios({
				method: 'post',
				url: BASE_URL + "RegistrarPersona",
				params: {
				  cPersDNI : cPersDNI,
				  cPersNombres : cPersNombres,
				  cPersApellidos : cPersApellidos,
				  cPersDireccion : cPersDireccion,
				  cPersTelefono : cPersTelefono,
				  cPersFechNac : "20230101",
				},
				// params: {
				//   param1: 'value1',
				//   param2: 'value2'
				// },
				headers: {
				  'Content-Type': 'application/json'
				},
				timeout: 5000,
				withCredentials: true,
				responseType: 'json'
			  });

			const Resp = response.data.code;
			const Lista = response.data.data;
			console.log(response.data);
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