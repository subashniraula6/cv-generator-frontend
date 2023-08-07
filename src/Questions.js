const Questions = {
    basicInfo: {
      title: "Basic info",
      questions: [
        {
          index: 1,
          question: "What is your name?",
          type: "text",
          answer: ""
        },
        {
          index: 2,
          question: "What is your age in years?",
          type: "text",
          answer: ""
        },
        {
          index: 3,
          question: "Do you want to include a picture of yourself in your application documents?",
          type: "boolean",
          answer: ""
        },
        {
          index: 4,
          question: "Which area(s) do you have the most experience in? Write your own answers or choose one or more of the suggestions below.",
          type: "select",
          options: "Administration, Analysis, Digital marketing, Economics, Finance, Communication, Creative work, Leadership, Logistics, Marketing, Pedagogy, Project management, Service, Siukvard, Eternal One",
          answer: ""
        },
        {
          index: 5,
          question: "What are your main personal qualities?",
          type: "select",
          options: "Ambitious, Analytical, Responsible, Driven, Efficient, Committed, Flexible, Initiative-taking, Innovative, Communicative, Creative, Solution-focused, Methodical, Thorough, Curious, Organized, Prestigious, Professional, Relationship-building, Results-oriented, Service-oriented, Self-motivated, Socially competent, Strategic, Persuasive",
          answer: ""
        },
        {
          index: 6,
          question: "Enter the phone number you want to be included in your application documents. You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
          type: "text",
          answer: ""
        },
        {
          index: 7,
          question: "Which city do you work in or want a job in? You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
          type:"text",
          answer: ""
        },
        {
          index: 8,
          question: "What skills do you want to highlight in your CV?",
          type: "select",
          options:"Business development, Accounting, Copywriting, Economics, Excel, Facebook Business Manager, Google AdWords, Google Analytics, Crafts, Cooking, Microsoft Office, Pedagogy, Powerpoint, Programming, Project management, Service, Writing, Slack, Training, Digital marketing, les, Photoshop, SAP, SEO, Words",
          answer: ""
        },
        {
          index: 9,
          question: "Which language(s) do you have knowledge of? If you want, you can indicate how good you are in each language in a later question.",
          type: "select",
          options:"Arabic, Danish, French, Greek, Chinese (Cantonese), Persian, Polish, Swedish, Swahili, Ukrainian, English, Farsi, Finnish, Italian, Japanese, Chinese (Mandarin), Korean, Norwegian, Russian, Somali, Spanish, Thai, Tigrinya, German",
          answer: ""
        },
        {
          index: 10,
          question: "Do you want to indicate how good you are in each language?",
          type:"boolean",
          answer: ""
        },
        {
          index: 11,
          question: "How are your Arabic skills?",
          type:"select",
          options: "Mother tongue, Fluid, Good knowledge of speech and writing, Very good skills in speaking and writing, Basic skills in speaking and writing",
          answer: ""
        },
        {
          index: 12,
          question: "What are your interests?",
          type:"select",
          options: "Architecture, Camping, Facebook, History, Baking, Child care, Computers, Computer games, Family activities, Movie, Throat, IT, Cars, Design, Golf, Construction, Digitization, Home remedies, Reading, Marketing, Journalism, Cooking, Art, Fashion, Literature, Politics, Renovation, Writing, Spreak, Styling, TV game, Hiking, Travels, Acting, Song, Tech, Performing arts, Beauty, Textile work, Sailing, Social Media, Tiktok, Skiing, Garden work, Sports",
          answer: ""
        },
        {
          index: 13,
          question: "Which certification(s) do you want to include in your CV? Remember to only include certifications that are relevant to the jobs you are applying for.",
          type: "select",
          options: "driver's license, Forklift driving license, Google Ads certification, Meta-certification",
          answer: ""
        },
        {
          index: 14,
          question: "What prizes or awards do you want to include in your CV?",
          type: "textSelect",
          options: "Teacher of the year, Salesperson of the year, Gold at the Swedish Content Awards, Aret's newcomer",
          answer: ""
        },
        {
          index: 15,
          question: "Which area(s) do you have the most experience in? Write your own answers or choose one or more of the suggestions below.",
          type: "textSelect",
          options: "Administration, Analysis, Digital marketing, Economics, Finance, Communication, Creative work, Leadership, gistics, Marketing, Pedagogy, Project management, Service, Healthcare, Aldrevard",
          answer: ""
        },
        {
          index: 16,
          question: "What are your main personal qualities?",
          type: "textSelect",
          options: "Ambition, Analytical, Responsible, Driven, Efficient, Committed, Flexible, Taking initiative, Innovative, Communicative, Creative, Solution-focused, Methodical, Accurate, Curious, Organized, Prestige loss, Professional, Relationship building, Results oriented, Service oriented, Self-propelled, Socially competent, Strategic, Convincing",          
          answer: ""
        },
        {
          index: 17,
          question: "Do you want a general summary or tailor your summary for a specific job/company? You increase your chances of getting an interview if you tailor your summary to each job you apply for.",
          type: "textSelect",
          options: "Summary for a specific job, General summary",
          answer: ""
        }
      ]
    },
    workExp: {
      title: "Work Experience",
      questions: [
        {
          index: 1000,
          question: "What is your company title?",
          type: "text",
          answer: ""
        },
        {
          index: 1001,
          question: "What is your company address?",
          type: "text",
          answer: ""
        },
        {
          index: 1002,
          question: "Name of company/employer you are looking for a job with:",
          type: "text",
          answer: ""
        },
        {
          index: 1003,
          question: "Which position should you apply for?",
          type: "text",
          answer: ""
        },
        {
          index: 1004,
          question: "What made you want to apply for the job as CEO at Tesla?",
          type: "text",
          answer: ""
        },
        {
          index: 1005,
          question: "Your current situation",
          type: "text",
          answer: ""
        },
        {
          index: 1006,
          question: "Where did you last work?",
          type: "text",
          answer: ""
        },
        {
          index: 1007,
          question: "Your title/position at Microsoft: Type any text. You don't need to scroll through the list.",
          type: "text",
          answer: ""
        },
        {
          index: 1008,
          question: "When did you stop working as a database administrator at Microsoft? Write either just the year (2023) or month and year (April 2023). Preferably then use the same format on the remaining date questions.",
          type: "text",
          answer: ""
        },
        {
          index: 1009,
          question: "Do you want to add information about something important you did or achieved in the role of database administrator at Microsoft?",
          type: "text",
          answer: ""
        },
        {
          index: 1010,
          question: "Describe the most important thing you did or achieved in the role of database administrator. You must answer this question in English.",
          type: "text",
          answer: ""
        }
      ]
    },
    education: {
      title: "Education",
      questions: [
        {
          index: 2001,
          question: "What kind of degree will you have when you finish your studies?",
          type: "text",
          answer: ""
        },
        {
          index: 2002,
          question: "Which education (subject, specialization or program) are you studying? Type any text. You don't need to scroll.",
          type: "text",
          answer: ""
        },
        {
          index: 2003,
          question: "Which university or college do you study at? Type any text. You don't need to scroll through the list.",
          type: "text",
          answer: ""
        },
        {
          index: 2004,
          question: "When did you start studying at Beckmans School of Design?",
          type: "text",
          answer: ""
        }
      ]
    },
    projects: {
      title: "Projects",
      questions: []
    },
    skills: {
      title: "Skills",
      questions: []
    },
    languages: {
      title: "languages",
      questions: []
    },
    interests: {
      title: "Interests",
      questions: []
    },
    certificates: {
      title: "Certificates",
      questions: []
    },
    awards: {
      title: "Awards",
      questions: []
    },
    careerGoals: {
      title: "Career Goals",
      questions: []
    },
    volunteerWork: {
      title: "Volunteer Work",
      questions: []
    },
    boardWork: {
      title: "Board Work",
      questions: []
    },
    others: {
      title: "Others",
      questions: []
    }
  };
  
  export default Questions;
  