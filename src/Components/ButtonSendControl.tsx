import {
	TouchableOpacity,
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from "react-native";

interface Props {
	title: string;
	functionSend: () => void;
	style?: StyleProp<ViewStyle>;
}

export const ButtonSendControl = ({ title, functionSend, style }: Props) => {
	return (
		<TouchableOpacity
			style={[styles.Button, style]}
			onPress={functionSend}
			// disabled={isLoading}
		>
			<Text style={styles.ButtonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	Button: {
		backgroundColor: "#386640",
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		height: 50,
	},
	ButtonText: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
	},
});
