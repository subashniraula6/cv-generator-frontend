const questions = {
  basicInfo: {
    title: "Basic info",
    removed: false,
    repeatable: false,
    auto_generated_questions: [
      {
        index: 1,
        question: "How are your {{language}} skills?",
        type: "select",
        options:
          "Mother tongue, Fluid, Good knowledge of speech and writing, Very good skills in speaking and writing, Basic skills in speaking and writing",
        answer: "",
      },
      {
        index: 5,
        question:
          "Select your picture",
        type: "file",
        answer: "",
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
        question:
          "Which area(s) do you have the most experience in? Write your own answers or choose one or more of the suggestions below.",
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
        question:
          "Enter the phone number you want to be included in your application documents. You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
        type: "text",
        answer: "",
      },
      {
        index: 9,
        question: "Enter your Email",
        type: "text",
        answer: "",
      },
      {
        index: 10,
        question: "Enter your linkedin if you have any",
        type: "text",
        answer: "",
      },
      {
        index: 11,
        question: "Enter your Website if you have any",
        type: "text",
        answer: "",
      },
      {
        index: 12,
        question:
          "Which city do you work in or want a job in? You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
        type: "text",
        answer: "",
      },
      {
        index: 13,
        question: "What skills do you want to highlight in your CV?",
        type: "textSelect",
        options:
          "Business development, Accounting, Copywriting, Economics, Excel, Facebook Business Manager, Google AdWords, Google Analytics, Crafts, Cooking, Microsoft Office, Pedagogy, Powerpoint, Programming, Project management, Service, Writing, Slack, Training, Digital marketing, les, Photoshop, SAP, SEO, Words",
        answer: "",
      },
      {
        index: 14,
        question:
          "Which language(s) do you have knowledge of? If you want, you can indicate how good you are in each language in a later question.",
        type: "textSelect",
        options:
          "Arabic, Danish, French, Greek, Chinese (Cantonese), Persian, Polish, Swedish, Swahili, Ukrainian, English, Farsi, Finnish, Italian, Japanese, Chinese (Mandarin), Korean, Norwegian, Russian, Somali, Spanish, Thai, Tigrinya, German",
        required: true,
        answer: "",
      },
      {
        index: 15,
        question: "Do you want to indicate how good you are in each language?",
        type: "boolean",
        answer: "no",
      },
      {
        index: 50,
        question: "What are your interests?",
        type: "textSelect",
        options:
          "Architecture, Camping, Facebook, History, Baking, Child care, Computers, Computer games, Family activities, Movie, Throat, IT, Cars, Design, Golf, Construction, Digitization, Home remedies, Reading, Marketing, Journalism, Cooking, Art, Fashion, Literature, Politics, Renovation, Writing, Spreak, Styling, TV game, Hiking, Travels, Acting, Song, Tech, Performing arts, Beauty, Textile work, Sailing, Social Media, Tiktok, Skiing, Garden work, Sports",
        answer: "",
      },
      {
        index: 51,
        question:
          "Which certification(s) do you want to include in your CV? Remember to only include certifications that are relevant to the jobs you are applying for.",
        type: "textSelect",
        options:
          "driver's license, Forklift driving license, Google Ads certification, Meta-certification",
        answer: "",
      },
      {
        index: 52,
        question: "What prizes or awards do you want to include in your CV ?",
        type: "textSelect",
        options:
          "Teacher of the year, Salesperson of the year, Gold at the Swedish Content Awards, Aret's newcomer, Employee of the montyh",
        answer:
          "",
      },
      {
        index: 53,
        question:
          "Wanna include your profile summary ? (For best AI experience mention some of it)",
        type: "textArea",
        answer:
          "",
      },
    ],
  },
  targetCompany: {
    title: "Target Company",
    removed: false,
    questions: [
      {
        index: 1001,
        question: "Name of company/employer you are looking for a job with:",
        type: "text",
        update: {
          key: "company",
          noOfQues: 4,
        },
        answer: "",
      },
      {
        index: 1002,
        template: "What is the address of {{company}}?",
        question: "",
        type: "text",
        answer: "",
      },
      {
        index: 1003,
        template: "Which position are you applying for at {{company}}?",
        question: "",
        type: "text",
        answer: "",
      },
      {
        index: 1004,
        template:
          "What made you want to apply for this job as mentioned position at {{company}}?",
        question: "",
        type: "text",
        answer: "",
      },
    ],
  },
  workExperience: {
    title: "Work Experience",
    removed: false,
    noOfItems: 2,
    auto_generated_questions: [
      {
        index: 2000,
        question: "Where did you previously work at?",
        type: "text",
        update: {
          key: "company",
          noOfQues: 4,
        },
        answer: "",
      },
      {
        index: 2000,
        template:
          "Your title/position at {{company}}: Type any text. You don't need to scroll through the list.",
        question: "",
        type: "text",
        answer: "",
      },
      {
        index: 2000,
        template: "When did you join {{company}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 2000,
        template: "When did you leave {{company}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 2000,
        template: "What were you achievements in {{company}}?",
        question: "",
        type: "textArea",
        answer: "",
      },
      {
        index: 2000,
        question: "Do you want to add more experiences?",
        type: "boolean",
        repeatable: true,
        answer: "",
      },
    ],
    questions: [
      {
        index: 2000,
        question: "Do you want to add your work experience?",
        type: "boolean",
        repeatable: true,
        answer: "no",
      },
    ],
  },
  education: {
    title: "Education",
    removed: false,
    noOfItems: 2,
    auto_generated_questions: [
      {
        index: 4000,
        question: "Where did you previously study? (Location)",
        type: "text",
        answer: "",
      },
      {
        index: 4000,
        question: "What kind of degree did you earn?",
        type: "text",
        answer: "",
      },
      {
        index: 4000,
        question: "Which field of study did you pursue?",
        type: "text",
        answer: "",
      },
      {
        index: 4000,
        question: "Which university or college did you attend?",
        type: "text",
        update: {
          key: "institution",
          noOfQues: 2,
        },
        answer: "",
      },
      {
        index: 4000,
        template: "When did you start your studies at {{institution}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 4000,
        template: "When did you complete your studies at {{institution}}?",
        question: "",
        type: "date",
        answer: "",
      },
      {
        index: 4000,
        question: "Do you want to add more education experiences?",
        type: "boolean",
        repeatable: true,
        answer: "",
      },
    ],
    questions: [
      {
        index: 4000,
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
    questions: [],
  },
  careerGoals: {
    title: "Career Goals",
    removed: false,
    questions: [],
  },
  others: {
    title: "Others",
    removed: false,
    questions: [],
  },
  isNext: false,
};

export default questions;
