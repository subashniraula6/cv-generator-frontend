const toSentenceCase = camelCase => {
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, ' $1');
        return result[0].toUpperCase() + result.substring(1).toLowerCase();
    }
    return '';
};

export {toSentenceCase}