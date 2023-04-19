import {useState} from 'react'
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useRouter} from 'expo-router'
import styles from './welcome.style'
import {icons, JOB_TYPES, SIZES} from "../../../constants";
import {JobTypeTab} from "../../../components";

const searchPlaceholderText = 'What are you looking for?'

const Welcome = ({searchTerm, setSearchTerm, handleSearchPress}) => {
    const {push} = useRouter()
    const [selectedJobType, setSelectedJobType] = useState(JOB_TYPES[0])

    const handleTabPress = (jobType) => {
        setSelectedJobType(jobType)
        push(`/search/${jobType}`)
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello User</Text>
                <Text style={styles.welcomeMessage}>Find your perfect job</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={searchPlaceholderText}
                        value={searchTerm}
                        onChangeText={setSearchTerm}/>
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
                    <Image source={icons.search} resizeMode={'contain'} style={styles.searchBtnImage}/>
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList
                    data={JOB_TYPES}
                    renderItem={({item}) => (
                        <JobTypeTab item={item}
                                    selectedJobType={selectedJobType}
                                    handleTabPress={handleTabPress}
                        />
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{columnGap: SIZES.small}}
                    horizontal={true}
                />
            </View>
        </View>
    )
}

export default Welcome