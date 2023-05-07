import axios from "axios";
import { configData } from "../../config";

class Configuracion {
	private cEmpresaRuc: string;
	private cEmpresaRazonSocial: string;
	private cDireccion: string;
	private cTelefono: string;
	private nTipoInteres : number;
	private nTasaCredito: number;
    private nTasaMora: number;

	constructor(
		cEmpresaRuc: string = "",
		cEmpresaRazonSocial: string = "",
		cDireccion: string = "",
		cTelefono: string = "",
		nTipoInteres: number = 1,
		nTasaCredito: number = 0,
        nTasaMora: number = 0,
	) {
		this.cEmpresaRuc = cEmpresaRuc;
		this.cEmpresaRazonSocial = cEmpresaRazonSocial;
		this.cDireccion = cDireccion;
		this.cTelefono = cTelefono;
		this.nTipoInteres = nTipoInteres;
        this.nTasaCredito = nTasaCredito;
		this.nTasaMora = nTasaMora;
	}

	static url = `${configData.API_URL}/api/configuracion`;

	async RegistrarConfiguracion() {
		const BASE_URL = `${Configuracion.url}/RegistrarConfiguracion`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					cEmpresaRuc: this.cEmpresaRuc,
					cEmpresaRazonSocial: this.cEmpresaRazonSocial,
					cDireccion: this.cDireccion,
					cTelefono: this.cTelefono,
					nTipoInteres: this.nTipoInteres,
					nTasaCredito: this.nTasaCredito,
					nTasaMora: this.nTasaMora,
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

export { Configuracion };
