import axios from "axios";
import { configData } from "../../config";

class Usuarios {
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
		this.nUsuID = nClieID;
		this.cUsuUsuario = cUsuUsuario;
		this.cUsuClave = cUsuClave;
		this.bUsuEstado = bUsuEstado;
		this.nUsuTipo = nUsuTipo;
		this.nClieID = nClieID;
		this.nConfiguracionID = nConfiguracionID;
		this.nCredRutasID = nCredRutasID;
	}

	static url = `${configData.API_URL}/api/usuarios`;

	async RegistrarUsuario_Config() {
		const BASE_URL = `${Usuarios.url}/RegistrarUsuario`;
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

}

export { Usuarios };
