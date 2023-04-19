import {useMemo} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {useFetch} from '../../../hooks';
import {COLORS} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import styles from './nearbyjobs.style';

/**
 * The NearbyJobs component renders a list of jobs that are located nearby.
 *
 * @returns {JSX.Element} - A JSX element representing the component.
 */

const DEFAULT_QUERY_PARAMS = {
    query: 'React developer',
    num_pages: 1,
}

const NearbyJobs = () => {
    const {push} = useRouter()
    // Memorize the default query parameters using useMemo
    const queryParams = useMemo(() => DEFAULT_QUERY_PARAMS, [])
    const {data, error, isLoading} = useFetch('search', queryParams)

    // Function to handle job navigation
    const handleJobNavigation = (job) => {
        push(`/job-details/${job?.job_id}`)
    }

    const renderJobList = () => {
        if (isLoading) return <ActivityIndicator size="large" color={COLORS.primary}/>
        if (error) return <Text>Something went wrong: {error?.message}</Text>
        if (!data) return <Text>No data available.</Text>
        return data.map((job) => (
            <NearbyJobCard
                key={`nearby-job-${job?.job_id}`}
                job={job}
                handleNavigate={() => handleJobNavigation(job)}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>{renderJobList()}</View>
        </View>
    );
};

export default NearbyJobs;
