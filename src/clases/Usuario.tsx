import axios from "axios";
import { configData } from "../../config";

export class Usuario {
	private nUsuID: number;
	private cUsuUsuario: string;
	private cUsuClave: string;
	private bUsuEstado: number;
	private nUsuTipo: number;
	private nClieID: number;

	constructor(
		nUsuID: number = 0,
		cUsuUsuario: string = "",
		cUsuClave: string = "",
		bUsuEstado: number = 0,
		nUsuTipo: number = 0,
		nClieID: number = 0
	) {
		this.nUsuID = nUsuID;
		this.cUsuUsuario = cUsuUsuario;
		this.cUsuClave = cUsuClave;
		this.bUsuEstado = bUsuEstado;
		this.nUsuTipo = nUsuTipo;
		this.nClieID = nClieID;
	}

	static url = `${configData.API_URL}/api/Usuarios`;

	async loginUser() {
		const BASE_URL = `${Usuario.url}/Login`;

		try {
			console.log(BASE_URL);
			const response = await axios.get(BASE_URL, {
				params: {
					cUsuario: this.cUsuUsuario,
					cClave: this.cUsuClave,
				},
			});
			// console.log(response);
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
}
