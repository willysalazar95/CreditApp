import axios from "axios";
import { configData } from "../../config";

class CreditoPago {
	private nPagID: number;
	private nCredID: number;
	private nPagCuotas: number;
	private dPagFecha: string;
	private nPagMonto: number;
	private nPagEstado: number;
	private cPagComentario: string;

	constructor(
		nPagID: number = 0,
		nCredID: number = 0,
		nPagCuotas: number = 0,
		dPagFecha: string = new Date().toString(),
		nPagMonto: number = 0,
		nPagEstado: number = 0,
		cPagComentario: string = ""
	) {
		this.nPagID = nPagID;
		this.nCredID = nCredID;
		this.nPagCuotas = nPagCuotas;
		this.dPagFecha = dPagFecha;
		this.nPagMonto = nPagMonto;
		this.nPagEstado = nPagEstado;
		this.cPagComentario = cPagComentario;
	}

	static url = `${configData.API_URL}/api/CreditoPago`;

	async ReporteCreditoPagoRango(
		nUsuID: number,
		dFechaIni: string,
		dFechaFin: string
	) {
		const BASE_URL = `${CreditoPago.url}/ReporteCreditoPagoRango`;

		try {
			const response = await axios({
				method: "get",
				url: BASE_URL,
				params: {
					nUsuID,
					dFechaInicio: dFechaIni,
					dFechaFin: dFechaFin,
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

export { CreditoPago };
