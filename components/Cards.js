import constants from '../utils/constants';
import React from 'react';
import {
  StyleSheet,
  SectionList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import CardHeader from './CardHeader';
import CardDetail from './CardDetail';

const { API } = constants;

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.fetchCards();
  }

  /**
   * Get the cards from the Magic API and
   * save them into the component state
   */
  async fetchCards() {
    return fetch(`${API}cards?page=0&pageSize=5&contains=imageUrl`)
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSource: this.mapCards(responseJson.cards),
        },
        function() {}
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  /**
   * Get colors
   * 
   * @param {Array<string>} colors
   * @returns {string} The color value to lowercase
   */
  getColors(colors) {
    if (colors.length > 0) {
      const [color] = colors;
      return color.toLowerCase();
    }
  }

  /**
   * Map cards
   * 
   * @param {Array<object>} cards - The card list
   * @returns {Array<object>} The cards mapped
   */
  mapCards(cards) {
    return cards.map(card => {
      const {
        name,
        colors,
        type,
        setName,
        imageUrl,
      } = card;

      return {
        name,
        data: [
          {
            colors: this.getColors(colors),
            type,
            setName,
            imageUrl,
          }
        ],
      };
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item, index }) => <CardDetail item={item} index={index} />}
          renderSectionHeader={({ section: { name } }) => <CardHeader name={name} />}
          sections={this.state.dataSource}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
