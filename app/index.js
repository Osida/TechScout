import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import {Stack, useRouter} from 'expo-router'
import {COLORS, icons, images, SIZES} from '../constants'
import {NearbyJobs, PopularJobs, ScreenHeaderBtn, Welcome} from '../components'
import {useState} from "react";

/**
 The HomeScreen component is the main screen of the application, displaying popular and nearby job lists and a search bar.
 @returns {JSX.Element} - A JSX Element representing the home screen of the application.
 */

const HomeScreen = () => {
    const {push} = useRouter()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchPress = () => {
        if (searchTerm) push(`/search/${searchTerm}`)
    }

    // Define header options for the Stack.Screen component
    const headerOptions = {
        headerStyle: styles.headerStyles,
        headerShadowVisible: false,
        headerLeft: () => <ScreenHeaderBtn iconSource={icons.menu} dimension={'60%'}/>,
        headerRight: () => <ScreenHeaderBtn iconSource={images.profile} dimension={'100%'}/>,
        headerTitle: '',
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Stack.Screen options={headerOptions}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchPress={handleSearchPress}/>
                    <PopularJobs/>
                    <NearbyJobs/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, backgroundColor: COLORS.lightWhite},
    container: {flex: 1, padding: SIZES.medium},
    headerStyles: {backgroundColor: COLORS.lightWhite}
})

export default HomeScreen;