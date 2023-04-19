import {useMemo, useState} from 'react'
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native'
import {useRouter} from 'expo-router'
import styles from './popularjobs.style'
import {COLORS, SIZES} from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import {useFetch} from '../../../hooks'

/**
 * The PopularJobs component displays a list of popular job cards.
 *
 * @returns {JSX.Element} The JSX code representing the popular jobs list.
 */

const DEFAULT_QUERY_PARAMS = {
    query: 'React developer',
    num_pages: 1,
};

const PopularJobs = () => {
    const {push} = useRouter()
    const [selectedJob, setSelectedJob] = useState(null)
    // Memorizing query parameters using useMemo
    const queryParams = useMemo(() => DEFAULT_QUERY_PARAMS, []);
    const {data, error, isLoading} = useFetch('search', queryParams);

    const handleCardPress = (job) => {
        setSelectedJob(job?.job_id)
        push(`/job-details/${job?.job_id}`)
    }

    const renderJobList = () => {
        if (isLoading) return <ActivityIndicator size="large" color={COLORS.primary}/>
        if (error) return <Text>Something went wrong: {error?.message}</Text>
        if (!data) return <Text>No data available.</Text>

        return (
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <PopularJobCard
                        job={item}
                        selectedJob={selectedJob}
                        onCardPress={() => handleCardPress(item)}
                    />
                )}
                keyExtractor={(item) => item?.job_id.toString()}
                contentContainerStyle={{columnGap: SIZES.medium}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>{renderJobList()}</View>
        </View>
    )
}

export default PopularJobs