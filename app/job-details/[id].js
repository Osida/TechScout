import {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import {COLORS, icons, SIZES, TABS} from '../../constants';
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import useFetch from '../../hooks/useFetch';
import tab from "../../components/home/welcome/Tab";

/**
 * The JobDetails component displays the details of a job and its respective information.
 * @returns {JSX.Element}
 */

const JobDetails = () => {
    const {back} = useRouter()
    const params = useSearchParams()
    const DEFAULT_QUERY_PARAMS = useMemo(() => ({job_id: params?.id}), [params?.id])
    const [activeTab, setActiveTab] = useState(TABS[0])
    const [refreshing, setRefreshing] = useState(false)
    const {data, error, isLoading, fetchData} = useFetch('job-details', DEFAULT_QUERY_PARAMS)

    const headerOptions = useMemo(() => {
        return {
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (<ScreenHeaderBtn iconSource={icons.left} dimension="60%" handlePress={() => back()}/>),
            headerRight: () => (<ScreenHeaderBtn iconSource={icons.share} dimension="60%"/>),
            headerTitle: '',
        };
    }, [back, icons.left, icons.share]);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchData()
        setRefreshing(false)
    }, [])

    const renderTabContent = (title, points) => (
        <Specifics title={title} points={points}/>
    )

    const displayTabsContent = () => {
        if (!data) return <Text>No data available.</Text>
        const {job_description, job_highlights} = data[0]

        const tabContentMap = {
            [TABS[0]]: <JobAbout info={job_description || "No data provided"}/>,
            [TABS[1]]: renderTabContent(TABS[1], job_highlights?.Qualifications ?? ["N/A"]),
            [TABS[2]]: renderTabContent(TABS[2], job_highlights?.Responsibilities ?? ["N/A"]),
        }

        return tabContentMap[activeTab] || null
    }

    const renderJobDetails = () => {
        if (isLoading) return <ActivityIndicator size="large" color={COLORS.primary}/>
        if (error) return <Text>Something went wrong: {error?.message}</Text>
        if (!data) return <Text>No data available.</Text>

        const {employer_logo, employer_name, job_title, job_country} = data[0]

        return (
            <View style={styles.companyContainer}>
                <Company logo={employer_logo} name={employer_name} jobTitle={job_title} location={job_country}/>
                <JobTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab}/>
                {displayTabsContent()}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Stack.Screen options={{headerStyle: styles.headerStyles, ...headerOptions}}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {renderJobDetails()}
            </ScrollView>
            {data && (<JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com'}/>)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, backgroundColor: COLORS.lightWhite},
    headerStyles: {backgroundColor: COLORS.lightWhite},
    companyContainer: {padding: SIZES.medium, paddingBottom: 100},
});

export default JobDetails;
