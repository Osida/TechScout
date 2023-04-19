import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import styles from './tabs.style'
import {SIZES} from "../../../constants"
import PropTypes from 'prop-types'

/**ß
 * The Tabs component displays a horizontal list of tabs with an active tab indicator.
 *
 * @param {object} props - Component props.
 * @param {array} props.tabs - An array of strings representing the names of each tab.
 * @param {string} props.activeTab - The name of the active tab.
 * @param {function} props.setActiveTab - A function to set the active tab.
 * @returns {JSX.Element} - A JSX element representing the Tabs component.
 */

const Tabs = ({tabs, activeTab, setActiveTab}) => {

    const TabButton = ({name, activeTab, onPress}) => (
        <TouchableOpacity style={styles.btn(name, activeTab)} onPress={onPress}>
            <Text style={styles.btnText(name, activeTab)}>{name}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={tabs}
                renderItem={({item}) => (
                    <TabButton name={item} activeTab={activeTab} onPress={() => setActiveTab(item)}/>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{paddingHorizontal: SIZES.small / 2}}
            />
        </View>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
}
export default Tabs