const toSentenceCase = (camelCase) => {
  if (camelCase) {
    const result = camelCase.replace(/([A-Z])/g, " $1");
    return result[0].toUpperCase() + result.substring(1).toLowerCase();
  }
  return "";
};

const toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

const removeLocalUserProfiles = () => {
  localStorage.removeItem("questions");
  localStorage.removeItem("currentQuestionIdx");
  localStorage.removeItem("currentCoverQuestionIdx");
  localStorage.removeItem("currentCoverQuestionIdx");
  localStorage.removeItem("activeColor");
  localStorage.removeItem("template");
  localStorage.removeItem("currentQuestion");
  localStorage.removeItem("resumeOptionModalShown");
};

const orderQuestions = (originalQuestions) => {
  let orderedKeys = [
    "basicInfo",
    "skills",
    "languages",
    "interests",
    "awards",
    "certifications",
    "targetCompany",
    "workExperience",
    "profileSummary",
    "education",
    "projects",
    "others",
  ];
  const orderedQuestions = {};
  orderedKeys.forEach(key => {
    if (originalQuestions.hasOwnProperty(key)) {
      orderedQuestions[key] = originalQuestions[key];
    }
  });

  // for custom questions to be added at last
  let sections = Object.keys(originalQuestions);
  sections.forEach(section => {
    if (!orderedKeys.includes(section)) {
      orderedQuestions[section] = originalQuestions[section];
    };
  });

  return orderedQuestions;
};

const extractQuestionsAndAnswers = (questions) => {
  const extracted  = {
    // Extract questions and answers from each section
    sections: Object.keys(questions).map(sectionKey => {
      const section = questions[sectionKey];
      if (section.questions && Array.isArray(section.questions)) {
        // Filter questions with non-empty answers
        const filteredQuestions = section.questions.filter(question => {
          const answer = question.answer;
          // Check if the answer is not empty
          return answer
        });
  
        // Map the filtered questions to only contain question and answer
        const extractedQuestions = filteredQuestions.map(question => ({
          question: question.question,
          answer: question.answer,
        }));
  
        return {
          title: section.title,
          questions: extractedQuestions,
        };
      } else {
        return null;
      }
    }).filter(section => section !== null), // Remove sections without questions
  };
  return extracted;  
}

export { toSentenceCase, toCamelCase, removeLocalUserProfiles, orderQuestions, extractQuestionsAndAnswers };
