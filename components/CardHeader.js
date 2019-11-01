import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function CardHeader(props) {
  const { name } = props;

  return (
    <Text
      h4
      style={styles.itemHeader}
    >
      {name}
    </Text>
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
