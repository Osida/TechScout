import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import styles from './screenheader.style'

/**
 * The ScreenHeaderBtn component renders a button with an image icon.
 *
 * @param {string} iconSource - The source of the image icon to be displayed on the button.
 * @param {string} dimension - The dimension of the button.
 * @param {Function} handlePress - The function to be called when the button is pressed.
 * @returns {JSX.Element} - A JSX element representing the header button.
 */


const ScreenHeaderBtn = ({iconSource, dimension, handlePress}) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image
                source={iconSource}
                resizeMode={'cover'}
                style={styles.btnImg(dimension)}
            />
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn