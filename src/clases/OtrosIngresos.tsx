import axios from "axios";
import { configData } from "../../config";

class OtrosIngresos {


	private nID: number;
	private nClienID: number;
	private dFecha: string;
	private nTipoIngreso: number;
	private nMonto: number;


	constructor(
		nID: number = 0,
		nClieID: number = 0,
		dFecha: string = "",
		nTipoIngreso: number = 0,
		nMonto: number = 0,
	) {
		this.nID = nID;
		this.nClienID = nClieID;
		this.dFecha = dFecha;
		this.nTipoIngreso = nTipoIngreso;
		this.nMonto = nMonto;
	}

	static url = `${configData.API_URL}/api/OtrosIngresos`;

	async grabarOtrosIngresos() {
		const BASE_URL = `${OtrosIngresos.url}/OtrosIngresos`;
		try {

			console.log(this.dFecha);
			console.log(this.nClienID);
			console.log(this.nTipoIngreso);
			console.log(this.nMonto);
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					dFecha: this.dFecha,
					nClieId: this.nClienID,
					nTipoIngreso: this.nTipoIngreso,
					nMonto: this.nMonto,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			console.log(response);

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

export { OtrosIngresos }