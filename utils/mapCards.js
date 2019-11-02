/**
 * Get card color
 *
 * @param {Array<string>} colors
 * @returns {string} The color value to lowercase
 */
function getCardColor(colors) {
  if (colors.length > 0) {
    const [color] = colors;
    return color.toLowerCase();
  }

  return null;
}

/**
 * Map cards
 *
 * @param {Array<object>} cards - The card list
 * @returns {Array<object>} The cards mapped
 */
export default function mapCards(cards) {
  return cards.map((card) => {
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
          color: getCardColor(colors),
          type,
          setName,
          imageUrl,
        },
      ],
    };
  });
}
