import axios from "axios";
import { configData } from "../../config";

export class Usuario {
	private nUsuID: number;
	private cUsuUsuario: string;
	private cUsuClave: string;
	private bUsuEstado: number;
	private nUsuTipo: number;
	private nClieID: number;
	private nConfiguracionID: number;
	private nCredRutasID: number;

	constructor(
		nUsuID: number = 0,
		cUsuUsuario: string = "",
		cUsuClave: string = "",
		bUsuEstado: number = 0,
		nUsuTipo: number = 0,
		nClieID: number = 0,
		nConfiguracionID: number = 0,
		nCredRutasID: number = 0
	) {
		this.nUsuID = nUsuID;
		this.cUsuUsuario = cUsuUsuario;
		this.cUsuClave = cUsuClave;
		this.bUsuEstado = bUsuEstado;
		this.nUsuTipo = nUsuTipo;
		this.nClieID = nClieID;
		this.nConfiguracionID = nConfiguracionID;
		this.nCredRutasID = nCredRutasID;
	}

	static url = `${configData.API_URL}/api/Usuarios`;

	async loginUser() {
		const BASE_URL = `${Usuario.url}/Login`;

		try {
			// console.log(BASE_URL);
			const response = await axios.get(BASE_URL, {
				params: {
					cUsuario: this.cUsuUsuario,
					cClave: this.cUsuClave,
				},
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async RegistrarUsuario_Config() {
		const BASE_URL = `${Usuario.url}/RegistrarUsuario`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					cUsuUsuario: this.cUsuUsuario,
					cUsuClave: this.cUsuClave,
					nUsuTipo: this.nUsuTipo,
					nClieID: this.nClieID,
					nConfiguracionID: this.nConfiguracionID,
					nCredRutasID: this.nCredRutasID,
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
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async ListarUsuario(nUsuID: number) {
		const BASE_URL = `${Usuario.url}/ListarUsuarios`;

		try {
			const response = await axios({
				method: "get",
				url: BASE_URL,
				params: {
					nUsuID,
				},
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
	async EliminarUsuario(usuario_id: string) {
		const BASE_URL = `${Usuario.url}/EliminarUsuario`;

		try {
			const response = await axios({
				method: "delete",
				url: BASE_URL,
				params: {
					usuarios: usuario_id,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;

			if (Resp === 200) {
				return { success: true, data: "OK" };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async ActualizarUsuario() {
		const BASE_URL = `${Usuario.url}/ActualizarUsuario`;
		try {
			const response = await axios({
				method: "put",
				url: BASE_URL,
				params: {
					nUsuID: this.nUsuID,
					cUsuUsuario: this.cUsuUsuario,
					cUsuClave: this.cUsuClave,
					nUsuTipo: this.nUsuTipo,
					nClieID: this.nClieID,
					bUsuEstado: this.bUsuEstado,
					nConfiguracionID: this.nConfiguracionID,
					nCredRutasID: this.nCredRutasID,
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
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}
	async CambiarClave(nUsuID: number, cUsuClave: string) {
		const BASE_URL = `${Usuario.url}/CambiarClave`;

		try {
			const response = await axios({
				method: "put",
				url: BASE_URL,
				params: {
					nUsuID,
					cUsuClave,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;

			if (Resp === 200) {
				return { success: true, data: "OK" };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}
}
