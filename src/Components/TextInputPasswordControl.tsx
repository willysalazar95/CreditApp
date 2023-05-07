import { Dispatch, SetStateAction } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

interface Props {
	title: string;
	placeholder: string;
	value: string;
	activePassword: boolean;
	functionChangeText: Dispatch<SetStateAction<string>>;
	functionActivePassword: () => void;
	style?: StyleProp<ViewStyle>;
}

export const TextInputPasswordControl = ({
	title,
	placeholder,
	value,
	activePassword,
	functionChangeText,
	functionActivePassword,
	style,
}: Props) => {
	return (
		<View style={style}>
			<Text style={styles.TextLabel}>{title}</Text>
			<TextInput
				style={styles.TextInput}
				value={value}
				placeholder={placeholder}
				onChangeText={functionChangeText}
				secureTextEntry={activePassword}
			/>
			<Icon
				style={styles.Icon}
				name={activePassword ? "eye-off-outline" : "eye-outline"}
				size={15}
				onPress={functionActivePassword}
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
	Icon: {
		position: "absolute",
		top: 40,
		right: 10,
		zIndex: 1,
		color: "#ccc",
	},
});
