import React from 'react'
import {Text, View} from 'react-native'
import styles from './specifics.style.js'
import PropTypes from 'prop-types'

/**
 * The Specifics component displays a title and a list of points.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the section.
 * @param {array} props.points - An array of strings representing each point.
 * @returns {JSX.Element} - A JSX element representing the Specifics component.
 */

const Specifics = ({title, points}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}:</Text>

            <View style={styles.pointsContainer}>
                {points.map((point, index) => (
                    <View key={point + index.toString()} style={styles.pointWrapper}>
                        <Text style={styles.pointDot}/>
                        <Text style={styles.pointText}>{point}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

Specifics.propTypes = {
    title: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Specifics