export class CreditosPeriodos {
	private nPerID: number;
	private cPerDescripcion: string;
	private nPerDias: number;
	private bPerEstado: number;

	constructor(
		nPerID: number = 0,
		cPerDescripcion: string = "",
		nPerDias: number = 0,
		bPerEstado: number = 0
	) {
		this.nPerID = nPerID;
		this.cPerDescripcion = cPerDescripcion;
		this.nPerDias = nPerDias;
		this.bPerEstado = bPerEstado;
	}
}
