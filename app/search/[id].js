import React, {useEffect, useMemo, useState} from 'react'
import {Stack, useRouter, useSearchParams} from "expo-router";
import {useSearch} from "../../hooks";
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import {ListFooter, ListHeader, NearbyJobCard, ScreenHeaderBtn} from "../../components";

/**
 * JobSearch component for displaying job search results.
 * @returns {JSX.Element}
 */

const JobSearch = () => {
    const params = useSearchParams()
    const {push, back} = useRouter()
    const [page, setPage] = useState(1)
    const QUERY_PARAMS = useMemo(() => ({query: params?.id, page: page.toString()}), [params?.id, page])
    const {searchResult, searchError, searchLoader, handleSearch} = useSearch('search', QUERY_PARAMS)

    // Moved the headerOptions object into the useMemo hook to ensure that it's only recalculated when necessary
    const headerOptions = useMemo(() => {
        return {
            headerStyle: customStyles.headerStyle,
            headerShadowVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn
                    iconSource={icons.left}
                    dimension="60%"
                    handlePress={() => back()}
                />
            ),
        };
    }, []);

    /**
     * Handle pagination based on the selected direction.
     * @param {string} direction - 'left' or 'right'
     */
    const handlePagination = direction => {
        if (direction === 'left' && page > 1) {
            setPage(prevPage => prevPage - 1);
        } else if (direction === 'right') {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleJobNavigation = (job) => {
        push(`/job-details/${job?.job_id}`)
    }

    const renderItem = item => {
        if (searchLoader) return <ActivityIndicator size="large" color={COLORS.primary}/>;
        if (searchError) return <Text>Something went wrong: {searchError?.message}</Text>;
        if (!searchResult) return <Text>No data available.</Text>;
        return <NearbyJobCard job={item} handleNavigate={() => handleJobNavigation(item)}/>;
    }

    useEffect(() => {
        handleSearch();
    }, [params?.id, page])

    return (
        <SafeAreaView style={customStyles.container}>
            <Stack.Screen options={{headerTitle: '', ...headerOptions}}/>

            <FlatList
                data={searchResult}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item) => item?.job_id.toString()}
                contentContainerStyle={customStyles.contentContainerStyle}
                ListHeaderComponent={
                    <ListHeader
                        params={params}
                        searchLoader={searchLoader}
                        searchError={searchError}
                    />}
                ListFooterComponent={
                    <ListFooter
                        handlePagination={handlePagination}
                        page={page}
                    />}
            />

        </SafeAreaView>
    )

}

const customStyles = StyleSheet.create({
    container: {flex: 1, backgroundColor: COLORS.lightWhite},
    contentContainerStyle: {columnGap: SIZES.medium},
    headerStyle: {backgroundColor: COLORS.lightWhite},
})

export default JobSearch