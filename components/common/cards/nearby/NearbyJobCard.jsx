import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import styles from './nearbyjobcard.style'
import {checkImageURL} from '../../../../utils'
import {DEFAULT_JOB_IMAGE} from "../../../../constants";

/**
 * The NearbyJobCard component renders a single job card in the nearby jobs list.
 *
 * @param {Object} job - The job data to be displayed on the card.
 * @param {Function} handleNavigate - The function to be called when the card is pressed.
 * @returns {JSX.Element} - A JSX Element representing the job card.
 */

const NearbyJobCard = ({job, handleNavigate}) => {
    const {employer_logo, job_title, job_employment_type} = job
    const logoSource = checkImageURL(employer_logo) ? employer_logo : DEFAULT_JOB_IMAGE

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <View style={styles.logoContainer}>
                <Image
                    source={{uri: logoSource}}
                    resizeMode="contain" style={styles.logoImage}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.jobName} numberOfLines={1}>{job_title}</Text>
                <Text style={styles.jobType}>{job_employment_type}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NearbyJobCard
