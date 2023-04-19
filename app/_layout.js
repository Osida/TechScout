import React, {useEffect, useCallback} from 'react';
import {Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

/*
* Overview: The main purpose is to load custom fonts, prevent the splash screen from automatically hiding, and hide the splash screen once the fonts have been loaded.
*/

// Define the fonts to be loaded
const FONTS = {
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
}

const Layout = () => {
    const [fontsLoaded] = useFonts(FONTS)

    useEffect(() => {
        // Prevent the splash screen from hiding automatically
        SplashScreen.preventAutoHideAsync();
        // Once the fonts have loaded, hide the splash screen
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(() => {
        // If the fonts are already loaded, hide the splash screen
        if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded]);

    // If the fonts haven't loaded yet, return null to prevent rendering anything
    if (!fontsLoaded) return null;

    // Otherwise, return the Stack component and attach the onLayoutRootView callback to it
    return <Stack onLayout={onLayoutRootView}/>;
};

export default Layout;