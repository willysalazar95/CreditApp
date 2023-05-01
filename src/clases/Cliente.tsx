import axios from "axios";
import { configData } from "../../config";
import { convertirFechaAAAAMMDD } from "../utils/utils";

class Cliente {
	private nClieID: number;
	private cClieDNI: string;
	private cClieNombres: string;

	get cClieNombresGet(): string {
		return this.cClieNombres;
	}

	set cClieNombresSet(value: string) {
		this.cClieNombres = value;
	}

	private cClieApellidos: string;
	private cClieDireccion: string;
	private cClieTelefono: string;
	private cClieFechNac: string;
	private dClieFechaCreacion: string;
	private nClieEstado: number;
	private cClieLatitud: string;
	private cClieLongitud: string;
	private cFechaAlta: string;

	constructor(
		nClieID: number = 0,
		cClieDNI: string = "",
		cClieNombres: string = "",
		cClieApellidos: string = "",
		cClieDireccion: string = "",
		cClieTelefono: string = "",
		cClieFechNac: string = "",
		dClieFechaCreacion: string = "",
		nClieEstado: number = 0,
		cClieLatitud: string = "",
		cClieLongitud: string = "",
		cFechaAlta: string = ""
	) {
		this.nClieID = nClieID;
		this.cClieDNI = cClieDNI;
		this.cClieNombres = cClieNombres;
		this.cClieApellidos = cClieApellidos;
		this.cClieDireccion = cClieDireccion;
		this.cClieTelefono = cClieTelefono;
		this.cClieFechNac = cClieFechNac;
		this.dClieFechaCreacion = dClieFechaCreacion;
		this.nClieEstado = nClieEstado;
		this.cClieLatitud = cClieLatitud;
		this.cClieLongitud = cClieLongitud;
		this.cFechaAlta = cFechaAlta;
	}

	static url = `${configData.API_URL}/api/clientes`;

	async ListarCliente() {
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
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async RegistrarCliente() {
		const BASE_URL = `${Cliente.url}/RegistrarClientes`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					cClieDNI: this.cClieDNI,
					cClieNombres: this.cClieNombres,
					cClieApellidos: this.cClieApellidos,
					cClieDireccion: this.cClieDireccion,
					cClieTelefono: this.cClieTelefono,
					cClieFechNac: this.cClieFechNac,
					cClieLatitud: this.cClieLatitud,
					cClieLongitud: this.cClieLongitud,
					dClieFechaAlta : this.cFechaAlta,
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

	async ActualizarCliente() {
		const BASE_URL = `${Cliente.url}/ActualizarCliente`;
		try {
			const response = await axios({
				method: "put",
				url: BASE_URL,
				params: {
					nClieID: this.nClieID,
					cClieDNI: this.cClieDNI,
					cClieNombres: this.cClieNombres,
					cClieApellidos: this.cClieApellidos,
					cClieDireccion: this.cClieDireccion,
					cClieTelefono: this.cClieTelefono,
					cClieFechNac: this.cClieFechNac,
					dClieFechaCreacion: convertirFechaAAAAMMDD(new Date()),
					nClieEstado: this.nClieEstado,
					cClieLatitud: this.cClieLatitud,
					cClieLongitud: this.cClieLongitud,
					dClieFechaAlta: this.cFechaAlta,
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

	async EliminarCliente() {
		const BASE_URL = `${Cliente.url}/EliminarCliente`;

		try {
			const response = await axios({
				method: "delete",
				url: BASE_URL,
				params: {
					codigo: this.nClieID,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			// const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: "OK" };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}

	async ReporteClienteRango(
		nUsuID: number,
		dFechaIni: string,
		dFechaFin: string
	) {
		const BASE_URL = `${Cliente.url}/ReporteClientesRango`;

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

export { Cliente };
