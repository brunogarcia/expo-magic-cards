import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { Divider } from 'react-native-elements';

export default function CardDetail(props) {
  const { item, index } = props;

  onPressItem = () => {
    console.log(item.imageUrl);
  };

  return (
    <TouchableOpacity
      onPress={this.onPressItem}
    >
      <View style={styles.itemData}>
        <View style={[styles.itemColor, { backgroundColor: item.colors }]} />
        <Text key={item.type + index}>{item.type}</Text>
        <Text key={item.setName + index}>{item.setName}</Text>
        <Divider style={styles.itemDivider} />
      </View>
    </TouchableOpacity>
  );
}

CardDetail.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  itemData: {
    paddingBottom: 20,
  },
  itemColor: {
    width: 10,
    height: 10,
  },
  itemDivider: {
    marginTop: 20,
  },
});
