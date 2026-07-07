const mockData = {
  summary:
    "React is a JavaScript library for building user interfaces using reusable components. This lesson introduces components, props, state, hooks, and explains how React efficiently updates the UI using a virtual DOM.",

  notes: [
    {
      title: "What is React?",
      content:
        "React is an open-source JavaScript library developed by Meta for building fast, interactive user interfaces."
    },
    {
      title: "Components",
      content:
        "Everything in React is built using reusable components. Components can receive data through props."
    },
    {
      title: "State",
      content:
        "State stores dynamic data inside a component. Updating state automatically re-renders the UI."
    },
    {
      title: "Hooks",
      content:
        "Hooks like useState and useEffect let functional components manage state and side effects."
    }
  ],

  flashcards: [
    {
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces."
    },
    {
      question: "What are Components?",
      answer: "Reusable building blocks of a React application."
    },
    {
      question: "What is State?",
      answer: "Data that changes over time inside a component."
    },
    {
      question: "What does useState do?",
      answer: "Adds state to functional React components."
    },
    {
      question: "What are Props?",
      answer: "Inputs passed from parent components."
    }
  ],

  quiz: [
    {
      question: "Who developed React?",
      options: ["Google", "Meta", "Microsoft", "Apple"],
      correctAnswer: "Meta"
    },
    {
      question: "Which hook manages state?",
      options: ["useEffect", "useState", "useMemo", "useRef"],
      correctAnswer: "useState"
    },
    {
      question: "What is a Component?",
      options: [
        "A CSS file",
        "A reusable UI block",
        "A database",
        "A server"
      ],
      correctAnswer: "A reusable UI block"
    }
  ]
};

export default mockData;