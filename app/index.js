import {View, Text, ScrollView, SafeAreaView} from 'react-native'
import {useState} from 'react'
import {Stack, useRouter} from 'expo-router'

import {COLORS, icons, images, SIZES} from '../constants'
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components'

const Home = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Stack.Screen
                options={{
                    headerStyle: option.headerStyles,
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension={'60%'}/>,
                    headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension={'100%'}/>,
                    headerTitle: ''
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.scrollView_view}>
                    <Welcome/>
                    <Popularjobs/>
                    <Nearbyjobs/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = {
    safeAreaView: {flex: 1, backgroundColor: COLORS.lightWhite},
    scrollView_view: {flex: 1, padding: SIZES.medium}
}

const option = {
    headerStyles: {backgroundColor: COLORS.lightWhite}
}
export default Home;