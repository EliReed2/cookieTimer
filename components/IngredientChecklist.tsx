import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'

export default function IngredientChecklist() {
    //List of Ingredients 
    const items = ['2 and 1/4 cups all-purpose flour', '1 teaspoon baking soda', '1 and 1/2 teaspoons cornstarch', '1/2 teaspoon salt', '3/4 cup unsalted butter, melted and cooled','3/4 cup brown sugar','1/2 cup granulated sugar','1 large egg + 1 egg yolk', '2 teaspoons pure vanilla extract', '1 and 1/4 cups semi-sweet chocolate chips'];

    //State to store already gathered ingredients
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    //Function to handle when an item is selected
    const handleCheckboxChange = (item: string) => {
        //Function taking previous selected items
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(item)) {
                return prevSelected.filter((selectedItem) => selectedItem !== item);
            } else {
                return [...prevSelected, item];
            }
        });
    }
    return (
        <View style={styles.listContainer}>
            <Text> Track Ingredients: </Text>
            {items.map((item => (
                <View key={item} style={styles.listingContainer}>
                    <Checkbox status={selectedItems.includes(item) ? 'checked' : 'unchecked'} onPress={() => handleCheckboxChange(item)}/>
                    <Text style={styles.listingText}>{item}</Text>
                </View>
            )))}
        </View>
    );
}

const styles=StyleSheet.create({
    listContainer: {
        paddingTop: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderColor: "black",
    },
    listingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    listingText: {
        color: "#6B4F4F",
    }
})