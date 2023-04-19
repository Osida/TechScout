import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import styles from './popularjobcard.style'
import {checkImageURL} from '../../../../utils'
import {DEFAULT_JOB_IMAGE} from "../../../../constants";

/**
 * The PopularJobCard component renders a single job card in the popular jobs list.
 *
 * @param {Object} job - The job data to be displayed on the card.
 * @param {string} selectedJob - The job ID of the currently selected job.
 * @param {Function} onCardPress - The function to be called when the card is pressed.
 * @returns {JSX.Element} - A JSX Element representing the job card.
 */

const PopularJobCard = ({job, selectedJob, onCardPress}) => {
    const {employer_logo, employer_name, job_title, job_country} = job
    const logoSource = checkImageURL(employer_logo) ? employer_logo : DEFAULT_JOB_IMAGE

    return (
        <TouchableOpacity style={styles.container(selectedJob, job)} onPress={onCardPress}>
            <View style={styles.logoContainer(selectedJob, job)}>
                <Image
                    source={{uri: logoSource}}
                    resizeMode="contain" style={styles.logoImage}
                />
            </View>
            <Text style={styles.companyName} numberOfLines={1}>{employer_name}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedJob, job)} numberOfLines={1}>{job_title}</Text>
                <Text style={styles.location}>{job_country}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PopularJobCard
