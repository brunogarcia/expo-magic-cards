import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Divider,
} from 'react-native-elements';

export default function CardDetail(props) {
  const { item, handleShowOverlay } = props;

  onPressCard = () => {
    handleShowOverlay(item.imageUrl);
  }

  return (
    <TouchableOpacity onPress={this.onPressCard}>
      <View style={styles.container}>
        { 
          item.color &&
          <View style={[styles.color, { backgroundColor: item.color }]} />
        }
        <Text key={item.type}>{item.type}</Text>
        <Text key={item.setName}>{item.setName}</Text>
        <Divider style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
}

CardDetail.propTypes = {
  handleShowOverlay: PropTypes.func.isRequired,
  item: PropTypes.shape({
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
    setName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  color: {
    width: 10,
    height: 10,
  },
  divider: {
    marginTop: 20,
  },
});
