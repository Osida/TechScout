import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/search";
import {icons} from "../../../constants";
import PropTypes from 'prop-types'

/**
 * A component that displays pagination controls for a list.
 *
 * @param {object} props - Component props.
 * @param {function} props.handlePagination - The function to handle pagination.
 * @param {number} props.page - The current page number.
 * @returns {JSX.Element} - A JSX Element representing the ListFooter component.
 */

const ListFooter = ({handlePagination, page}) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('left')}
                              disabled={page <= 1}>
                <Image
                    source={icons.chevronLeft}
                    style={styles.paginationImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('right')}>
                <Image
                    source={icons.chevronRight}
                    style={styles.paginationImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

ListFooter.propTypes = {
    handlePagination: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
}

export default ListFooter;
