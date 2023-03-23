import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const html = `
<html>
   <head>
      <style>
         @page {
            margin: 20px;
         }
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
   </head>
   <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
         Hello Expo!
      </h1>
      <img
         src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
         style="width: 90vw;" />

      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
         Hello Expo!
      </h1>
      <img
         src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
         style="width: 90vw;" />
      </body>
</html>
`;

export const ReporteCreditos = () => {
	const [selectedPrinter, setSelectedPrinter] = React.useState();

	const print = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		await Print.printAsync({
			html,
			printerUrl: selectedPrinter?.url, // iOS only
		});
	};

	const printToFile = async () => {
		// On iOS/android prints the given html. On web prints the HTML from the current page.
		const { uri } = await Print.printToFileAsync({ html });
		console.log("File has been saved to:", uri);
		await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	};

	return (
		<View style={styles.container}>
			<Button title="Print" onPress={print} />
			<View style={styles.spacer} />
			<Button title="Print to PDF file" onPress={printToFile} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
