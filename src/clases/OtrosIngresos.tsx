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
		const BASE_URL = `${OtrosIngresos.url}/RegistrarOtrosIngresos`;
		try {

			console.log("fecha: " + this.dFecha);
			console.log("cliente id: " + this.nClienID);
			console.log("Tipo Ingreso: " + this.nTipoIngreso);
			console.log("Monto: " + this.nMonto);
			const response = await axios({
				method: "post",
				url: BASE_URL,
				/* params: {
					dFecha: this.dFecha,
					nClieId: this.nClienID,
					nTipoIngreso: this.nTipoIngreso,
					nMonto: this.nMonto,
				}, */
				params: {
					dFecha: '20230606',
					nClieId: 24,
					nTipoIngreso: 12,
					nMonto: 600,
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
			console.log(Resp)
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