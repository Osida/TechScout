import React from 'react'
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native'
import styles from './footer.style'
import {icons} from "../../../constants"
import PropTypes from 'prop-types'

/**
 * The Footer component displays buttons for liking and applying to a job.
 *
 * @param {object} props - Component props.
 * @param {string} props.url - The URL to apply to the job.
 * @returns {JSX.Element} - A JSX element representing the Footer component.
 */

const Footer = ({url}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image source={icons.heartOutline} resizeMode={'contain'} style={styles.likeBtnImage}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
                <Text style={styles.applyBtnText}>Apply Now</Text>
            </TouchableOpacity>
        </View>
    )
}

Footer.propTypes = {
    url: PropTypes.string.isRequired,
}

export default Footer