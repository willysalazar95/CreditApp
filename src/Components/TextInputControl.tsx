import { Dispatch, SetStateAction } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	StyleProp,
	ViewStyle,
	KeyboardTypeOptions,
} from "react-native";

interface Props {
	title: string;
	placeholder: string;
	value: string;
	keyboardType: KeyboardTypeOptions;
	functionChangeText: Dispatch<SetStateAction<string>>;
	style?: StyleProp<ViewStyle>;
	maxLength?: number;
}

export const TextInputControl = ({
	title,
	placeholder,
	value,
	functionChangeText,
	style,
	keyboardType,
	maxLength,
}: Props) => {
	return (
		<View style={style}>
			<Text style={styles.TextLabel}>{title}</Text>
			<TextInput
				style={styles.TextInput}
				value={value}
				placeholder={placeholder}
				onChangeText={functionChangeText}
				keyboardType={keyboardType}
				maxLength={maxLength}
			/>
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
