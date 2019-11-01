import constants from '../utils/constants';
import React from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import CardHeader from './CardHeader';
import CardDetail from './CardDetail';

const { API } = constants;

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isLoading: true
    };
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
    .then(response => {
      this.setState(
        {
          isLoading: false,
          cards: this.mapCards(response.cards),
        },
        function() {}
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  /**
   * Get color
   * 
   * @param {Array<string>} colors
   * @returns {string} The color value to lowercase
   */
  getColor(colors) {
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
        id,
        name,
        colors,
        type,
        setName,
        imageUrl,
      } = card;

      return {
        id,
        name,
        data: [
          {
            color: this.getColor(colors),
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
          renderItem={({ item }) => <CardDetail item={item} />}
          renderSectionHeader={({ section: { name } }) => <CardHeader name={name} />}
          sections={this.state.cards}
          keyExtractor={({ id }) => id}
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
