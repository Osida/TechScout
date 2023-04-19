import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import styles from "../../../styles/search";
import {COLORS, SIZES} from "../../../constants";
import PropTypes from 'prop-types'

/**
 * Renders the header of the job search list with search title, job opportunities title and loader.
 *
 * @param {object} props - Component props.
 * @param {object} props.params - The search parameters.
 * @param {boolean} props.searchLoader - Flag that indicates if the search is loading or not.
 * @param {Error} props.searchError - The error that occurred during the search.
 * @returns {JSX.Element} - The JSX element containing the list header.
 */

const ListHeader = ({params, searchLoader, searchError}) => {
    return (
        <>
            <View style={{paddingHorizontal: SIZES.medium, paddingVertical: SIZES.medium, ...styles.container}}>
                <Text style={styles.searchTitle}>{params?.id}</Text>
                <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>

            <View style={styles.loaderContainer}>
                {searchLoader ? (
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                ) : (
                    searchError ? <Text>Oops something went wrong</Text> : null
                )}
            </View>
        </>
    );
};

ListHeader.propTypes = {
    params: PropTypes.object.isRequired,
    searchLoader: PropTypes.bool.isRequired,
    searchError: PropTypes.instanceOf(Error),
}

export default ListHeader;
