import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { Divider } from 'react-native-elements';

export default function CardHeader(props) {
  const { name } = props;

  return (
    <Text style={styles.itemHeader}>{name}</Text>
  );
}

CardHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  itemHeader: {
    fontWeight: 'bold',
  },
});
