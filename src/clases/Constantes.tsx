import axios from "axios";
import { configData } from "../../config";

class Constantes {
	private nConsCod: string;

	get nConsCodGet(): string {
		return this.nConsCod;
	}

	constructor(
		nConsCod: string = ""
	) {
		this.nConsCod = nConsCod;
	}

	static url = `${configData.API_URL}/api/configuracion`;

	async ObtenerConstante() {
		const BASE_URL = `${Constantes.url}/ObtenerConstante`;
		try {
			// const response = await axios.get(BASE_URL);

			const response = await axios({
				method: "get",
				url: BASE_URL,
				params: {
					nConsCod: this.nConsCod,
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
				return { success: true, data: Lista };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

}

export { Constantes };
