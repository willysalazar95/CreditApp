import axios from "axios";
import { configData } from "../../config";

export class CreditosCronogramas {
	private nCredID: number;

	static url = `${configData.API_URL}/api/CreditoCronograma`;

	constructor(nCredID: number = 0) {
		this.nCredID = nCredID;
	}

	async ListarCreditosCronogramas(nCredID: number) {
		const BASE_URL = `${CreditosCronogramas.url}/ObtenerCronogramaXCredito`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nIdCredito: nCredID,
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

	async simularCronogramas(nCuotas: number, nPeriodo: number, FechaPago: string, nMonto: number, nIdConfig: number,) {
		const BASE_URL = `${CreditosCronogramas.url}/GenerarCronogramaPagos`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nCuotas: nCuotas,
					nPeriodo: nPeriodo,
					FechaPago: FechaPago,
					nMonto: nMonto,
					nIdConfig: nIdConfig,
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

	async ObtenerPago(nCredID: number) {
		const BASE_URL = `${CreditosCronogramas.url}/ObtenerPago`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nCredId: nCredID,
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
}
