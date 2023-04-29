import axios from "axios";
import { configData } from "../../config";

export class CreditosCronogramas {
	private nCredID: number;
	
	static url = `${configData.API_URL}/api/CreditoCronograma`;

	constructor(
		nCredID: number = 0,
	) {
		this.nCredID = nCredID;
	}

	async ListarCreditosCronogramas() {
		const BASE_URL = `${CreditosCronogramas.url}/ObtenerCronogramaXCredito`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nIdCredito: 42, //this.nCredID,
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