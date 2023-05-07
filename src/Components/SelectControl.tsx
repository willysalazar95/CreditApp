import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dispatch, SetStateAction } from "react";

interface Props {
	title: string;
	options: Option[];
	value: number;
	functionValueChange: Dispatch<SetStateAction<number>>;
	style?: StyleProp<ViewStyle>;
}
export interface Option {
	label: string;
	value: any;
}

export const SelectControl = ({
	title,
	options,
	value,
	functionValueChange,
	style,
}: Props) => {
	return (
		<View style={style}>
			<Text style={styles.TextPiker}>{title}</Text>
			<Picker
				style={styles.Picker}
				selectedValue={value}
				onValueChange={functionValueChange}
			>
				{options.map((option: Option, index: number) => {
					return (
						<Picker.Item
							style={styles.PickerItem}
							label={option.label}
							value={option.value}
							key={index}
						/>
					);
				})}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	TextPiker: {
		color: "#426E4F",
		fontWeight: "bold",
	},
	Picker: {
		width: "100%",
		marginTop: 5,
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		fontSize: 14,
		color: "#808080",
		overflow: "hidden",
	},
	PickerItem: {
		fontSize: 14,
		color: "#808080",
	},
});
