import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ResultCalculations(props) {
    const { userCuotas, userValorCuota, SaldoPago, NumeroCuotaPagada, InteresReal, MontPagar, errorMessage, userInteresCuota } = props;
    console.log(props)

    return (
        <View style={styles.content}>
            {SaldoPago == null || SaldoPago.monthyFee == 0 ?
                (
                    <View>
                        <Text style={styles.tilecancelado}>EL PRESTAMO FUE CANCELADO</Text>
                    </View>
                )

                :
                (
                    SaldoPago && (
                        <View style={styles.boxResult}>
                            <Text style={styles.tile}>Cronograma</Text>
                            <DataResult title='Monto prestado:' value={`S/.${userCuotas}`} />
                            <DataResult title='Saldo anterior:' value={`S/.${SaldoPago}`} />
                            <DataResult title='Nuevo saldo :' value={`S/.${InteresReal}`} />
                            <DataResult title='Número de cuota :' value={`${NumeroCuotaPagada}` + ` de ` + `${userValorCuota}`} />
                            <DataResult title='Modalidad de cobro :' value={`${userInteresCuota}`} />
                        </View>
                    )
                )

            }
            <View>
                <Text style={styles.error}>{errorMessage}</Text>
            </View>

        </View>
    )
}

function DataResult(props) {
    const { title, value } = props;
    return (
        <View style={styles.value}>
            <Text style={styles.dato}>{title}</Text>
            <Text style={styles.dato}>{value}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        marginHorizontal: 13
    },
    error: {
        textAlign: 'center',
        color: 'black'
    },
    boxResult: {
        backgroundColor: '#ebebeb',
        padding: 20,
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tile: {
        color: "black",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    }
    ,

    tilecancelado: {
        top: 20,
        color: "black",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        bottom: 20
    },

    dato: {
        color: "black",
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    }
    ,


    value: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})