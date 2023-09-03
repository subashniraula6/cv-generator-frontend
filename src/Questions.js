const questions = {
  basicInfo: {
    title: {
      en: "Basic info",
      sv: "Grundläggande information"
    },
    removed: false,
    repeatable: false,
    auto_generated_questions: [
      {
        index: 1,
        question: {
          en: "How are your {{language}} skills?",
          sv: "Hur är dina {{language}} kunskaper?"
        },
        isLanguageRating: true,
        type: "select",
        options: {
          en: "Mother tongue, Fluid, Good knowledge of speech and writing, Very good skills in speaking and writing, Basic skills in speaking and writing",
          sv: "Modersmål, Flytande, Goda kunskaper i tal och skrift, Mycket goda färdigheter i tal och skrift, Grundläggande färdigheter i tal och skrift"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5,
        question: {
          en: "Select your picture",
          sv: "Välj din bild"
        },
        type: "file",
        answer: {
          en: "",
          sv: ""
        },
        removed: false
      },
    ],
    questions: [
      {
        index: 1,
        question: {
          en: "What is your first name?",
          sv: "Vad är ditt förnamn?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2,
        question: {
          en: "What is your last name?",
          sv: "Vad är ditt efternamn?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 3,
        question: {
          en: "What is your job title?",
          sv: "Vad är din yrkestitel?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4,
        question: {
          en: "Do you want to include a picture of yourself in your application documents?",
          sv: "Vill du inkludera en bild av dig själv i dina ansökningshandlingar?"
        },
        type: "boolean",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 6,
        question: {
          en: "Which area(s) do you have the most experience in? Write your own answers or choose one or more of the suggestions below.",
          sv: "I vilket/vilka område(n) har du mest erfarenhet? Skriv dina egna svar eller välj en eller flera av de föreslagna nedan."
        },
        type: "textSelect",
        options: {
          en: "Administration, Analysis, Digital marketing, Economics, Finance, Communication, Creative work, Leadership, Logistics, Marketing, Pedagogy, Project management, Service, Siukvard, Eternal One",
          sv: "Administration, Analys, Digital marknadsföring, Ekonomi, Finans, Kommunikation, Kreativt arbete, Ledarskap, Logistik, Marknadsföring, Pedagogik, Projektledning, Service, Siukvard, Evig En"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 7,
        question: {
          en: "What are your main personal qualities?",
          sv: "Vad är dina främsta personliga egenskaper?"
        },
        type: "textSelect",
        options: {
          en: "Ambitious, Analytical, Responsible, Driven, Efficient, Committed, Flexible, Initiative-taking, Innovative, Communicative, Creative, Solution-focused, Methodical, Thorough, Curious, Organized, Prestigious, Professional, Relationship-building, Results-oriented, Service-oriented, Self-motivated, Socially competent, Strategic, Persuasive",
          sv: "Ambitiös, Analytisk, Ansvarsfull, Driven, Effektiv, Engagerad, Flexibel, Initiativtagande, Innovativ, Kommunikativ, Kreativ, Lösning-orienterad, Metodisk, Grundlig, Nyfiken, Organiserad, Prestigefylld, Professionell, Relationsbyggande, Resultatorienterad, Serviceinriktad, Självgående, Socialt kompetent, Strategisk, Övertygande"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 8,
        question: {
          en: "Enter the phone number you want to be included in your application documents. You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
          sv: "Ange det telefonnummer du vill inkludera i dina ansökningshandlingar. Du behöver inte svara på den här frågan om du inte vill, men dina ansökningshandlingar blir bättre om du gör det."
        },
        removed: false,
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 9,
        question: {
          en: "Enter your Email",
          sv: "Ange din e-post"
        },
        removed: false,
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 10,
        question: {
          en: "Enter your linkedin if you have any",
          sv: "Ange din LinkedIn om du har någon"
        },
        removed: false,
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 11,
        question: {
          en: "Enter your Website if you have any",
          sv: "Ange din webbplats om du har någon"
        },
        removed: false,
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 12,
        question: {
          en: "Which city do you work in or want a job in? You don't have to answer this question if you don't want to, but your application documents will be better if you do.",
          sv: "Vilken stad arbetar du i eller vill ha ett jobb i? Du behöver inte svara på den här frågan om du inte vill, men dina ansökningshandlingar blir bättre om du gör det."
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 13,
        question: {
          en: "What skills do you want to highlight in your CV?",
          sv: "Vilka färdigheter vill du framhäva i ditt CV?"
        },
        removed: false,
        type: "textSelect",
        options: {
          en: "Business development, Accounting, Copywriting, Economics, Excel, Facebook Business Manager, Google AdWords, Google Analytics, Crafts, Cooking, Microsoft Office, Pedagogy, Powerpoint, Programming, Project management, Service, Writing, Slack, Training, Digital marketing, les, Photoshop, SAP, SEO, Words",
          sv: "Affärsutveckling, Redovisning, Textskrivning, Ekonomi, Excel, Facebook Business Manager, Google AdWords, Google Analytics, Hantverk, Matlagning, Microsoft Office, Pedagogik, Powerpoint, Programmering, Projektledning, Service, Skrivande, Slack, Utbildning, Digital marknadsföring, Les, Photoshop, SAP, SEO, Ord"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 14,
        question: {
          en: "Which language(s) do you have knowledge of? If you want, you can indicate how good you are in each language in a later question.",
          sv: "Vilka språk har du kunskap om? Om du vill kan du ange hur bra du är på varje språk i en senare fråga."
        },
        removed: false,
        type: "textSelect",
        options: {
          en: "Arabic, Danish, French, Greek, Chinese (Cantonese), Persian, Polish, Swedish, Swahili, Ukrainian, English, Farsi, Finnish, Italian, Japanese, Chinese (Mandarin), Korean, Norwegian, Russian, Somali, Spanish, Thai, Tigrinya, German",
          sv: "Arabiska, Danska, Franska, Grekiska, Kinesiska (Kantonesiska), Persiska, Polska, Svenska, Swahili, Ukrainska, Engelska, Farsi, Finska, Italienska, Japanska, Kinesiska (Mandarin), Koreanska, Norska, Ryska, Somaliska, Spanska, Thailändska, Tigrinja, Tyska"
        },
        required: true,
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 15,
        question: {
          en: "Do you want to indicate how good you are in each language?",
          sv: "Vill du ange hur bra du är på varje språk?"
        },
        type: "boolean",
        answer: {
          en: "no",
          sv: "no"
        },
      },
      {
        index: 50,
        question: {
          en: "What are your interests?",
          sv: "Vilka är dina intressen?"
        },
        removed: false,
        type: "textSelect",
        options: {
          en: "Architecture, Camping, Facebook, History, Baking, Child care, Computers, Computer games, Family activities, Movie, Throat, IT, Cars, Design, Golf, Construction, Digitization, Home remedies, Reading, Marketing, Journalism, Cooking, Art, Fashion, Literature, Politics, Renovation, Writing, Spreak, Styling, TV game, Hiking, Travels, Acting, Song, Tech, Performing arts, Beauty, Textile work, Sailing, Social Media, Tiktok, Skiing, Garden work, Sports",
          sv: "Arkitektur, Camping, Facebook, Historia, Bakning, Barnomsorg, Datorer, Datorspel, Familjeaktiviteter, Film, Hals, IT, Bilar, Design, Golf, Byggande, Digitalisering, Huskurer, Läsning, Marknadsföring, Journalistik, Matlagning, Konst, Mode, Litteratur, Politik, Renovering, Skrivande, Tal, Styling, TV-spel, Vandring, Resor, Skådespel, Sång, Teknik, Scenkonst, Skönhet, Textilarbete, Segling, Sociala medier, Tiktok, Skidåkning, Trädgårdsarbete, Sport"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 51,
        question: {
          en: "Which certification(s) do you want to include in your CV? Remember to only include certifications that are relevant to the jobs you are applying for.",
          sv: "Vilka certifikat vill du inkludera i ditt CV? Kom ihåg att bara inkludera certifikat som är relevanta för de jobb du söker."
        },
        removed: false,
        type: "textSelect",
        options: {
          en: "driver's license, Forklift driving license, Google Ads certification, Meta-certification",
          sv: "körkort, Truckkörkort, Google Ads-certifiering, Meta-certifiering"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 52,
        question: {
          en: "What prizes or awards do you want to include in your CV?",
          sv: "Vilka priser eller utmärkelser vill du inkludera i ditt CV?"
        },
        removed: false,
        type: "textSelect",
        options: {
          en: "Teacher of the year, Salesperson of the year, Gold at the Swedish Content Awards, Aret's newcomer, Employee of the month",
          sv: "Årets lärare, Årets försäljare, Guld på Swedish Content Awards, Årets nykomling på Aret, Månadens medarbetare"
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 53,
        question: {
          en: "Wanna include your profile summary? (For best AI experience mention some of it)",
          sv: "Vill du inkludera en sammanfattning av din profil? (För bästa AI-upplevelse, nämna en del av det)"
        },
        removed: false,
        type: "textArea",
        answer: {
          en: "",
          sv: ""
        },
      }
    ],
  },
  targetCompany: {
    title: {
      en: "Target Company",
      sv: "Målkurs Företag"
    },
    removed: false,
    questions: [
      {
        index: 1001,
        question: {
          en: "Name of company/employer you are looking for a job with:",
          sv: "Namn på företag/arbetsgivare du söker jobb hos:"
        },
        type: "text",
        update: {
          key: "company",
          noOfQues: 4,
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 1002,
        template: {
          en: "What is the address of {{company}}?",
          sv: "Vad är adressen till {{company}}?"
        },
        question: {
          en: "What is the address of {{company}}?",
          sv: "Vad är adressen till {{company}}?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 1003,
        template: {
          en: "Which position are you applying for at {{company}}?",
          sv: "Vilken position söker du på {{company}}?"
        },
        question: {
          en: "Which position are you applying for at {{company}}?",
          sv: "Vilken position söker du på {{company}}?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 1004,
        template: {
          en: "What made you want to apply for this job as mentioned position at {{company}}?",
          sv: "Vad fick dig att vilja söka detta jobb som nämnd position på {{company}}?"
        },
        question: {
          en: "What made you want to apply for this job as mentioned position at {{company}}?",
          sv: "Vad fick dig att vilja söka detta jobb som nämnd position på {{company}}?"
        },
        type: "textArea",
        answer: {
          en: "",
          sv: ""
        },
      },
    ],
  },
  workExperience: {
    title: {
      en: "Work Experience",
      sv: "Arbetslivserfarenhet"
    },
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 2000,
        question: {
          en: "Where did you previously work at?",
          sv: "Var har du tidigare arbetat?"
        },
        removed: false,
        type: "text",
        update: {
          key: "company",
          noOfQues: 4,
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2000,
        template: {
          en: "Your title/position at {{company}}: Type any text. You don't need to scroll through the list.",
          sv: "Din titel/position på {{company}}: Skriv in valfri text. Du behöver inte bläddra i listan."
        },
        question: {
          en: "",
          sv: ""
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2000,
        template: {
          en: "When did you join {{company}}?",
          sv: "När började du på {{company}}?"
        },
        question: {
          en: "",
          sv: ""
        },
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2000,
        template: {
          en: "When did you leave {{company}}?",
          sv: "När lämnade du {{company}}?"
        },
        question: {
          en: "",
          sv: ""
        },
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2000,
        template: {
          en: "What were your achievements at {{company}}?",
          sv: "Vilka var dina prestationer på {{company}}?"
        },
        question: {
          en: "",
          sv: ""
        },
        type: "textArea",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 2000,
        question: {
          en: "Do you want to add more experiences?",
          sv: "Vill du lägga till fler erfarenheter?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "",
          sv: ""
        },
      },
    ],
    questions: [
      {
        index: 2000,
        question: {
          en: "Do you want to add your work experience?",
          sv: "Vill du lägga till din arbetslivserfarenhet?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "no",
          sv: "no"
        },
      },
    ],
  },
  education: {
    title: {
      en: "Education",
      sv: "Utbildning"
    },
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 4000,
        question: {
          en: "Where did you previously study? (Location)",
          sv: "Var studerade du tidigare? (Plats)"
        },
        removed: false,
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4001,
        question: {
          en: "What kind of degree did you earn?",
          sv: "Vilken typ av examen fick du?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4002,
        question: {
          en: "Which field of study did you pursue?",
          sv: "Vilket studieområde följde du?"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4003,
        question: {
          en: "Which university or college did you attend?",
          sv: "Vilket universitet eller högskola gick du på?"
        },
        type: "text",
        update: {
          key: "institution",
          noOfQues: 2,
        },
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4004,
        template: {
          en: "When did you start your studies at {{institution}}?",
          sv: "När började du dina studier vid {{institution}}?"
        },
        question: {
          en: "",
          sv: ""
        },
        questionTemplate: "When did you start your studies at {{institution}}?",
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4005,
        template: {
          en: "When did you complete your studies at {{institution}}?",
          sv: "När avslutade du dina studier vid {{institution}}?"
        },
        question: {
          en: "",
          sv: ""
        },
        questionTemplate: "When did you complete your studies at {{institution}}?",
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 4006,
        question: {
          en: "Do you want to add more education experiences?",
          sv: "Vill du lägga till fler utbildningserfarenheter?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "",
          sv: ""
        },
      },
    ],
    questions: [
      {
        index: 4000,
        question: {
          en: "Do you want to add your education experience?",
          sv: "Vill du lägga till din utbildning?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "no",
          sv: "no"
        },
      },
    ],
  },
  projects: {
    title: {
      en: "Projects",
      sv: "Projekt"
    },
    removed: false,
    noOfItems: 0,
    auto_generated_questions: [
      {
        index: 5000,
        question: {
          en: "Project name",
          sv: "Projektnamn"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5001,
        question: {
          en: "Project link",
          sv: "Projektlänk"
        },
        type: "text",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5002,
        question: {
          en: "Project description",
          sv: "Projektbeskrivning"
        },
        type: "textArea",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5003,
        question: {
          en: "Project start date",
          sv: "Projektets startdatum"
        },
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5004,
        question: {
          en: "Project end date",
          sv: "Projektets slutdatum"
        },
        type: "date",
        answer: {
          en: "",
          sv: ""
        },
      },
      {
        index: 5005,
        question: {
          en: "Do you want to add more projects?",
          sv: "Vill du lägga till fler projekt?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "",
          sv: ""
        },
      },
    ],
    questions: [
      {
        index: 5000,
        question: {
          en: "Do you want to add your projects?",
          sv: "Vill du lägga till dina projekt?"
        },
        type: "boolean",
        repeatable: true,
        answer: {
          en: "no",
          sv: "no"
        },
      },
    ],
  },
  others: {
    title: {
      en: "Others",
      sv: "Övrigt"
    },
    removed: false,
    questions: [
      {
        index: 6000,
        question: {
          en: "What other information would you like to include in your application?",
          sv: "Vilken annan information vill du inkludera i din ansökan?"
        },
        removed: false,
        type: "textArea",
        answer: {
          en: "",
          sv: ""
        },
      },
    ],
  },
  isNext: false,
};

export default questions;
