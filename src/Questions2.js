const questions = {
  basicInfo: {
    title: "Basic info",
    removed: false,
    repeatable: false,
    auto_generated_questions: [
      {
        index: 5,
        question: "Select your picture",
        type: "file",
        answer: "",
        removed: false,
      },
    ],
    questions: [
      {
        index: 1,
        question: "What is your first name?",
        type: "text",
        answer: "",
      },
      {
        index: 2,
        question: "What is your last name?",
        type: "text",
        answer: "",
      },
      {
        index: 3,
        question: "What is your job title?",
        type: "text",
        answer: "",
      },
      {
        index: 4,
        question:
          "Do you want to include a picture of yourself in your application documents?",
        type: "boolean",
        answer: "",
      },
      {
        index: 6,
        question: "Which area(s) do you have the most experience in ?",
        hint: "Write your own answers or choose one or more of the suggestions below.",
        type: "textSelect",
        options:
          "Administration, Analysis, Digital marketing, Economics, Finance, Communication, Creative work, Leadership, Logistics, Marketing, Pedagogy, Project management, Service, Siukvard, Eternal One",
        answer: "",
      },
      {
        index: 7,
        question: "What are your main personal qualities?",
        type: "textSelect",
        options:
          "Ambitious, Analytical, Responsible, Driven, Efficient, Committed, Flexible, Initiative-taking, Innovative, Communicative, Creative, Solution-focused, Methodical, Thorough, Curious, Organized, Prestigious, Professional, Relationship-building, Results-oriented, Service-oriented, Self-motivated, Socially competent, Strategic, Persuasive",
        answer: "",
      },
      {
        index: 8,
        question: "What is your address ?",
        type: "textArea",
        answer: "",
      },
      {
        index: 9,
        question:
          "Enter the phone number you want to be included in your application documents",
        hint: "You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 10,
        question: "Enter your Email",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 11,
        question: "Enter your linkedin if you have any",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 12,
        question: "Enter your Website if you have any",
        removed: false,
        type: "text",
        answer: "",
      },
    ],
  },
  skills: {
    title: "Skills",
    removed: false,
    repeatable: false,
    questions: [
      {
        index: 1000,
        question: "What skills do you want to highlight in your CV?",
        removed: false,
        type: "textSelect",
        options:
          "Business development, Accounting, Copywriting, Economics, Excel, Facebook Business Manager, Google AdWords, Google Analytics, Crafts, Cooking, Microsoft Office, Pedagogy, Powerpoint, Programming, Project management, Service, Writing, Slack, Training, Digital marketing, les, Photoshop, SAP, SEO, Words",
        answer: "",
      },
    ]
  },
  languages: {
    title: "Languages",
    removed: false,
    repeatable: false,
    auto_generated_questions: [
      {
        index: 2001,
        question: "Do you want to indicate how good you are in each language?",
        type: "boolean",
        answer: "no",
      },
      {
        index: 2002,
        question: "How are your {{language}} skills?",
        isLanguageRating: true,
        type: "select",
        options:
          "Mother tongue, Fluid, Good knowledge of speech and writing, Very good skills in speaking and writing, Basic skills in speaking and writing",
        answer: "",
      },
    ],
    questions: [
      {
        index: 2000,
        question: "Which language(s) do you have knowledge of ?",
        hint: "If you want, you can indicate how good you are in each language in a later question.",
        removed: false,
        type: "textSelect",
        options:
          "Arabic, Danish, French, Greek, Chinese (Cantonese), Persian, Polish, Swedish, Swahili, Ukrainian, English, Farsi, Finnish, Italian, Japanese, Chinese (Mandarin), Korean, Norwegian, Russian, Somali, Spanish, Thai, Tigrinya, German",
        required: true,
        answer: "",
      },
    ],
  },
  interests: {
    title: "Interests",
    removed: false,
    repeatable: false,
    questions: [
      {
        index: 3000,
        question: "What are your interests?",
        removed: false,
        type: "textSelect",
        options:
          "Architecture, Camping, Facebook, History, Baking, Child care, Computers, Computer games, Family activities, Movie, Throat, IT, Cars, Design, Golf, Construction, Digitization, Home remedies, Reading, Marketing, Journalism, Cooking, Art, Fashion, Literature, Politics, Renovation, Writing, Spreak, Styling, TV game, Hiking, Travels, Acting, Song, Tech, Performing arts, Beauty, Textile work, Sailing, Social Media, Tiktok, Skiing, Garden work, Sports",
        answer: "",
      },
    ],
  },
  awards: {
    title: "Awards",
    removed: false,
    repeatable: false,
    questions: [
      {
        index: 4000,
        question: "What prizes or awards do you want to include in your CV?",
        removed: false,
        type: "textSelect",
        options:
          "Teacher of the year, Salesperson of the year, Gold at the Swedish Content Awards, Aret's newcomer, Employee of the month",
        answer: "",
      },
    ],
  },
  certifications: {
    title: "Certifications",
    removed: false,
    repeatable: false,
    questions: [
      {
        index: 5000,
        question: "Which certification(s) do you want to include in your CV?",
        hint: "Remember to only include certifications that are relevant to the jobs you are applying for.",
        removed: false,
        type: "textSelect",
        options:
          "driver's license, Forklift driving license, Google Ads certification, Meta-certification",
        answer: "",
      },
    ],
  },
  targetCompany: {
    title: "Target Company",
    removed: false,
    questions: [
      {
        index: 6000,
        question: "What is your first name?",
        type: "text",
        answer: "",
      },
      {
        index: 6001,
        question: "What is your last name?",
        type: "text",
        answer: "",
      },
      {
        index: 6002,
        question: "What is your job title?",
        type: "text",
        answer: "",
      },
      {
        index: 6003,
        question: "What is your address ?",
        type: "textArea",
        answer: "",
      },
      {
        index: 6004,
        question:
          "Enter the phone number you want to be included in your application documents",
        hint: "You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 6005,
        question: "Enter your Email",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 6006,
        question: "Enter your linkedin if you have any",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 6007,
        question: "Enter your Website if you have any",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 6008,
        question: "Name of company/employer you are looking for a job with:",
        type: "text",
        update: {
          key: "company",
          noOfQues: 4,
        },
        answer: "",
      },
      {
        index: 6009,
        template: "What is the address of {{company}}?",
        question: "What is the address of {{company}}?",
        type: "text",
        answer: "",
      },
      {
        index: 6010,
        template: "Which position are you applying for at {{company}}?",
        question: "Which position are you applying for at {{company}}?",
        type: "text",
        answer: "",
      },
      {
        index: 6011,
        template:
          "What made you want to apply for this job as mentioned position at {{company}}?",
        question:
          "What made you want to apply for this job as mentioned position at {{company}}?",
        type: "textArea",
        answer: "",
      },
    ],
  },
  workExperience: {
    title: "Work Experience",
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 7001,
        question: "Where did you previously work at?",
        removed: false,
        type: "text",
        update: {
          key: "company",
          noOfQues: 5,
        },
        answer: "",
      },
      {
        index: 7002,
        template: "What is the address of {{company}}?",
        question: "",
        removed: false,
        type: "text",
        answer: "",
      },
      {
        index: 7003,
        template:
          "Your title/position at {{company}}: Type any text. You don't need to scroll through the list.",
        question: "",
        type: "text",
        answer: "",
      },
      {
        index: 7004,
        template: "When did you join {{company}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 7005,
        template: "When did you leave {{company}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 7006,
        template: "What were your achievements at {{company}}?",
        question: "",
        type: "textArea",
        answer: "",
      },
      {
        index: 7007,
        question: "Do you want to add more experiences?",
        type: "boolean",
        repeatable: true,
        answer: "",
      },
    ],
    questions: [
      {
        index: 7000,
        question: "Do you want to add your work experience?",
        type: "boolean",
        repeatable: true,
        answer: "no",
      },
    ],
  },
  profileSummary: {
    title: "Profile Summary",
    removed: false,
    questions: [
      {
        index: 8000,
        question:
          "Wanna include your profile summary? (For best AI experience mention some of it)",
        removed: false,
        type: "textArea",
        answer: "",
      },
    ],
  },
  education: {
    title: "Education",
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 9001,
        question: "Where did you previously study? (Location)",
        type: "text",
        answer: "",
      },
      {
        index: 9002,
        question: "What kind of degree did you earn ?",
        type: "text",
        answer: "",
      },
      {
        index: 9003,
        question: "Which field of study did you pursue ?",
        type: "text",
        answer: "",
      },
      {
        index: 9004,
        question: "Which university or college did you attend?",
        type: "text",
        update: {
          key: "institution",
          noOfQues: 2,
        },
        answer: "",
      },
      {
        index: 9005,
        template: "When did you start your studies at {{institution}}?",
        question: "When did you start your studies at {{institution}}?",
        type: "date",
        answer: "",
      },
      {
        index: 9006,
        template: "When did you complete your studies at {{institution}}?",
        question: "When did you complete your studies at {{institution}}?",
        type: "date",
        answer: "",
      },
      {
        index: 9007,
        question: "Do you want to add more education experiences?",
        type: "boolean",
        repeatable: true,
        answer: "",
      },
    ],
    questions: [
      {
        index: 9000,
        question: "Do you want to add your education experience?",
        type: "boolean",
        repeatable: true,
        answer: "no",
      },
    ],
  },
  projects: {
    title: "Projects",
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 10001,
        question: "Project name",
        type: "text",
        answer: "",
      },
      {
        index: 10002,
        question: "Project link",
        type: "text",
        answer: "",
      },
      {
        index: 10003,
        question: "Project description",
        type: "textArea",
        answer: "",
      },
      {
        index: 10004,
        question: "Project start date",
        type: "date",
        answer: "",
      },
      {
        index: 10005,
        question: "Project end date",
        type: "date",
        answer: "",
      },
      {
        index: 10006,
        question: "Do you want to add more projects?",
        type: "boolean",
        repeatable: true,
        answer: "",
      },
    ],
    questions: [
      {
        index: 10000,
        question: "Do you want to add your projects?",
        type: "boolean",
        repeatable: true,
        answer: "no",
      },
    ],
  },
  others: {
    title: "Others",
    removed: false,
    questions: [
      {
        index: 11000,
        question:
          "What other information would you like to include in your application?",
        type: "textArea",
        answer: "",
      },
    ],
  },
  isNext: false,
  lang: "en",
};

export default questions;
