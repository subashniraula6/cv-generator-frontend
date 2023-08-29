const toSentenceCase = camelCase => {
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, ' $1');
        return result[0].toUpperCase() + result.substring(1).toLowerCase();
    }
    return '';
};

const toCamelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

export {toSentenceCase, toCamelCase}