import axios from "axios";
import { configData } from "../../config";

class Cliente {
	static url = `${configData.API_URL}/api/clientes`;

	async ListarPersonas() {
		const BASE_URL = `${Cliente.url}/ListarClientes`;
		try {
			const response = await axios.get(BASE_URL);

			const Resp = response.data.code;
			const Lista = response.data.data;
			if (Resp === 200) {
				return { success: true, data: Lista };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async RegistroPersona(
		cPersDNI,
		cPersNombres,
		cPersApellidos,
		cPersDireccion,
		cPersTelefono,
		cPersFechNac
	) {
		const BASE_URL = `${Cliente.url}/RegistrarClientes`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					cPersDNI: cPersDNI,
					cPersNombres: cPersNombres,
					cPersApellidos: cPersApellidos,
					cPersDireccion: cPersDireccion,
					cPersTelefono: cPersTelefono,
					cPersFechNac: "20230101",
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async ActualizarPersona(
		nIdPers,
		cPersDNI,
		cPersNombres,
		cPersApellidos,
		cPersDireccion,
		cPersTelefono,
		cPersFechNac
	) {
		const BASE_URL = `${Cliente.url}/ActualizarClientes`;
		try {
			const response = await axios({
				method: "put",
				url: BASE_URL,
				params: {
					nIdPers: nIdPers,
					cPersDNI: cPersDNI,
					cPersNombres: cPersNombres,
					cPersApellidos: cPersApellidos,
					cPersDireccion: cPersDireccion,
					cPersTelefono: cPersTelefono,
					cPersFechNac: "2023-01-01",
					nEstado: 1,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async EliminarPersona(nIdPers) {
		const BASE_URL = `${Cliente.url}/EliminarCliente`;

		try {
			const response = await axios({
				method: "delete",
				url: BASE_URL,
				params: {
					codigo: nIdPers,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: "OK" };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
}

export { Cliente };
