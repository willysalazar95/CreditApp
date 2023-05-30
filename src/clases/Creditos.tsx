import axios from "axios";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { configData } from "../../config";
import { convertirFechaAAAAMMDD } from "../utils/utils";

export class Creditos {
	private nCredID: number;
	private nClienID: number;
	private dCredFechaPrest: string;
	private nPerID: number;
	private nCredMonto: Double;
	private nCredTasaInteres: Double;
	private nCredMontoInteres: Double;
	private nCredNroCuotas: Double;
	private dCredFechaFin: string;
	private nCredMontoPagado: Double;
	private nCredMontoDeuda: Double;
	private nCredPorcentajeDeuda: Double;
	private nEstID: number;
	private nUsuID: number;
	private nCredRutasID: number;
	private dFecIni: string;
	private dFecFin: string;

	static url = `${configData.API_URL}/api/Credito`;

	constructor(
		nCredID: number = 0,
		nClieID: number = 0,
		dCredFechaPrest: string = "",
		nPerID: number = 0,
		nCredMonto: number = 0,
		nCredTasaInteres: number = 0,
		nCredMontoInteres: number = 0,
		nCredNroCuotas: number = 0,
		dCredFechaFin: string = "",
		nCredMontoPagado: Double = 0,
		nCredMontoDeuda: Double = 0,
		nCredPorcentajeDeuda: Double = 0,
		nEstID: number = 0,
		nUsuID: number = 0,
		nCredRutasID: number = 0,
		dFecIni: string = "",
		dFecFin: string = ""
	) {
		this.nCredID = nCredID;
		this.nClienID = nClieID;
		this.dCredFechaPrest = dCredFechaPrest;
		this.nPerID = nPerID;
		this.nCredMonto = nCredMonto;
		this.nCredTasaInteres = nCredTasaInteres;
		this.nCredMontoInteres = nCredMontoInteres;
		this.nCredNroCuotas = nCredNroCuotas;
		this.dCredFechaFin = dCredFechaFin;
		this.nCredMontoPagado = nCredMontoPagado;
		this.nCredMontoDeuda = nCredMontoDeuda;
		this.nCredPorcentajeDeuda = nCredPorcentajeDeuda;
		this.nEstID = nEstID;
		this.nUsuID = nUsuID;
		this.nCredRutasID = nCredRutasID;
		this.dFecIni = dFecIni;
		this.dFecFin = dFecFin;
	}

	async ListarCreditos() {
		const BASE_URL = `${Creditos.url}/ListarCreditos`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nIdPers: this.nClienID,
					nUsuId: this.nUsuID,
					dFecIni: this.dFecIni,
					dFecFin: this.dFecFin,
				},
			});

			console.log(this.nClienID, this.nUsuID, this.dFecIni, this.dFecFin);

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

	async RegistroCredito() {
		const BASE_URL = `${Creditos.url}/RegistrarCredito`;
		try {
			// console.log(this.dCredFechaPrest); //2023015
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					nClienId: this.nClienID,
					dFechaCred: this.dCredFechaPrest,
					nIdPeriodo: this.nPerID,
					nMonto: this.nCredMonto,
					nInteres: 0,
					nCuotas: this.nCredNroCuotas,
					nUsuId: this.nUsuID,
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
			// console.log(Lista);
			if (Resp == 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error: any) {
			console.log(error);

			return { success: false, error: error.message };
		}
	}

	async RegistroCreditoPago() {
		const BASE_URL = `${Creditos.url}/RegistrarCreditoPago`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					nIdCredigo: this.nCredID,
					nMonto: this.nCredMonto,
					nCajaId: configData.nCajaId,
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
			// console.log(Lista);
			if (Resp == 200) {
				return { success: true, data: Lista };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async ListarCreditosPeriodos() {
		const BASE_URL = `${Creditos.url}/ListarCreditosPeriodo`;
		try {
			const response = await axios.get(BASE_URL);

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

	async ReporteCreditoRango(
		nUsuID: number,
		dFechaIni: string,
		dFechaFin: string
	) {
		const BASE_URL = `${Creditos.url}/ReporteCreditoRango`;

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
