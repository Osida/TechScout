import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import styles from "./welcome.style";

const Tab = ({item, selectedJobType, handleTabPress}) => (
    <TouchableOpacity style={styles.tab(selectedJobType, item)} onPress={() => handleTabPress(item)}>
        <Text style={styles.tabText(selectedJobType, item)}>{item}</Text>
    </TouchableOpacity>
)

export default Tab;