import axios from "axios";

export class Usuario {
	nIdUsers;
	nIdPers;
	cUsuario;
	cClave;
	bEstado;
	nTipoUsuario;

	async loginUser(username, password) {
		const BASE_URL = "http://willy95.somee.com/api/Usuarios/";

		try {
			const response = await axios.get(BASE_URL + "Login", {
				params: {
					cUsuario: username,
					cClave: password,
				},
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
}
