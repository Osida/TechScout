import React from 'react'
import {Text, View} from 'react-native'
import styles from './about.style'

/**
 * Displays information about the job.
 *
 * @param {object} props - Component props.
 * @param {string} props.info - Information to display.
 */

const About = ({info}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>About the job:</Text>
            <View style={styles.contentBox}>
                <Text style={styles.contextText}>{info}</Text>
            </View>
        </View>
    )
}

export default About
