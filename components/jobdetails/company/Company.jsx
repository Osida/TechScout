import React from 'react'
import {Image, Text, View} from 'react-native'
import styles from './company.style'
import {checkImageURL} from "../../../utils"
import {DEFAULT_JOB_IMAGE as DEFAULT_COMPANY_IMAGE, icons} from "../../../constants"
import PropTypes from 'prop-types'

/**
 * Displays company information and job details.
 *
 * @param {object} props - Component props.
 * @param {string} props.logo - The URL of the company logo.
 * @param {string} props.jobTitle - The job title.
 * @param {string} props.name - The name of the company.
 * @param {string} props.location - The location of the job.
 * @returns {JSX.Element} - A JSX element representing the Company component.
 */

const Company = ({logo, jobTitle, name, location}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{uri: checkImageURL(logo) ? logo : DEFAULT_COMPANY_IMAGE}}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{jobTitle}</Text>
            </View>
            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{name} |</Text>
                <View style={styles.locationBox}>
                    <Image source={icons.location} resizeMode={'contain'} style={styles.locationImage}/>
                    <Text style={styles.locationName}>{location}</Text>
                </View>
            </View>
        </View>
    )
}

Company.propTypes = {
    logo: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default Company