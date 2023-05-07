import { Dispatch, SetStateAction, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { formatoFecha } from "../utils/utils";

interface Props {
	title: string;
	value: Date;
	functionChange: Dispatch<SetStateAction<Date>>;
	style?: StyleProp<ViewStyle>;
}

export const TextInputDateControl = ({
	title,
	value,
	functionChange,
	style,
}: Props) => {
	const [showDatePicker, setShowDatePicker] = useState<Boolean>(false);
	return (
		<View style={style}>
			<Text style={styles.TextLabel}>{title}</Text>
			<TouchableOpacity
				style={styles.TextInput}
				onPress={() => setShowDatePicker(true)}
			>
				<Text style={{ color: "#808080" }}>{formatoFecha(value.toString())}</Text>
				{showDatePicker && (
					<DateTimePicker
						value={value}
						// mode="date"
						// display="default"

						onChange={(event, selectedDate) => {
							const currentDate = selectedDate || value;
							setShowDatePicker(false);
							functionChange(currentDate);
						}}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	TextLabel: {
		color: "#426E4F",
		fontWeight: "bold",
	},
	TextInput: {
		width: "100%",
		marginTop: 5,
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		fontSize: 14,
		color: "#808080",
	},
});
