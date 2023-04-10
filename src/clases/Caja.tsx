import axios from "axios";
import { configData } from "../../config";

class Caja{
    private nCajaId: number;
	private nUsuID: number;
	private dFechaApertura: string;
	private dFechaCierre: string;
	private nCajaEstado: number;
	private nMontoApertura: number;
	private nMontoCobradoEfectivo: number;
	private nMontoCredito: number;
	private nMontoFinal: number;

	constructor(
		nCajaId: number=0,
        nUsuID: number=0,
        dFechaApertura: string = "",
        dFechaCierre: string= "",
        nCajaEstado: number=0,
        nMontoApertura: number=0,
        nMontoCobradoEfectivo: number=0,
        nMontoCredito: number=0,
        nMontoFinal: number=0,
	) {
		this.nCajaId = nCajaId;
		this.nUsuID = nUsuID;
		this.dFechaApertura = dFechaApertura;
		this.dFechaCierre = dFechaCierre;
		this.nCajaEstado = nCajaEstado;
		this.nMontoApertura = nMontoApertura;
		this.nMontoCobradoEfectivo = nMontoCobradoEfectivo;
		this.nMontoCredito = nMontoCredito;
		this.nMontoFinal = nMontoFinal;
	}

	static url = `${configData.API_URL}/api/caja`;

	async ObtenerDatosCaja() {
		const BASE_URL = `${Caja.url}/ObtenerDatosCaja`;
		try {
			const response = await axios({
				method: "get",
				url: BASE_URL,
				params: {
					nUsuID: this.nUsuID
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
export {Caja}