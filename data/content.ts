
import { Flashcard, CodingPrompt, Scenario, BlockType } from '../types';

export const BLOCKS = [
  { id: BlockType.Calibration, title: "Role Briefing & Calibration", duration: 10, description: "Align expectations and test foundational role knowledge." },
  { id: BlockType.Refresher, title: "Modern Tech Refresher", duration: 30, description: "Bootcamp: From Object Basics to Async Patterns." },
  { id: BlockType.Flashcards, title: "Flashcard Trainer: Foundations", duration: 20, description: "Master technical constraints and SDK patterns." },
  { id: BlockType.CoderPad, title: "CoderPad Simulation", duration: 30, description: "Algorithms and Partner-friendly SDK design." },
  { id: BlockType.Behavioral, title: "Partner & Behavioral Simulator", duration: 20, description: "High-stakes communication and STAR alignment." },
  { id: BlockType.Product, title: "Wearables Product Thinking", duration: 15, description: "Designing for the face: privacy, battery, and AI." },
  { id: BlockType.FinalBoss, title: "Final Boss Run", duration: 10, description: "Mixed review and final readiness calculation." }
];

export interface RefresherTopic {
  title: string;
  concept: string;
  anatomy: string[];
  analogy: string;
  example: string;
  tips: string[];
  practicePrompt: string;
  practiceCorrect: string;
  practicePlaceholder: string;
}

export const REFRESHER_TOPICS: RefresherTopic[] = [
  {
    title: "Lesson 1: Declaring Objects",
    concept: "An Object is a container for data. Use curly braces { } to start/end, and colons : to assign values.",
    anatomy: [
      "{} : The 'box' that holds data",
      "key : The name of the property (like 'name')",
      "value : The actual data (like 'Meta')",
      ", : Separates multiple properties"
    ],
    analogy: "A labeled filing cabinet. The drawer is the object, the folder label is the 'key', and the paper inside is the 'value'.",
    example: 'const device = {\n  brand: "Meta",\n  model: "Quest 3"\n};',
    tips: ["Keys don't usually need quotes in JS.", "Values that are text MUST have quotes.", "End the whole thing with a semicolon ;"],
    practicePrompt: "Declare a constant named 'glasses' that has a 'color' of 'black' and 'battery' of 85.",
    practicePlaceholder: "const glasses = ...",
    practiceCorrect: "const glasses = { color: 'black', battery: 85 };"
  },
  {
    title: "Lesson 2: Extracting Data (Destructuring)",
    concept: "Instead of writing 'object.key' multiple times, 'destructuring' pulls values out into their own variables immediately.",
    anatomy: [
      "const { } : The syntax to 'extract'",
      "inner name : Must match the key inside the object",
      "= source : The object you are pulling from"
    ],
    analogy: "Taking the milk and eggs out of the grocery bag (the object) so they are ready on the counter.",
    example: 'const { battery } = glasses;\nconsole.log(battery); // 85',
    tips: ["It's cleaner than writing 'glasses.battery' everywhere.", "You can pull multiple items: { color, battery }."],
    practicePrompt: "Extract the 'id' and 'type' from an object called 'sensor'.",
    practicePlaceholder: "const { ... } = sensor;",
    practiceCorrect: "const { id, type } = sensor;"
  },
  {
    title: "Lesson 3: The Standard Function",
    concept: "Functions are 'verbs'. They do work. The 'return' keyword is how the function gives an answer back.",
    anatomy: [
      "function : Keyword to start",
      "(params) : The inputs the function needs",
      "{ } : The code block where the work happens",
      "return : Sends the result back"
    ],
    analogy: "A calculator: You type numbers (params), it does math (body), and displays the result (return).",
    example: 'function getStatus(level) {\n  return level > 50 ? "OK" : "Low";\n}',
    tips: ["Always name your function clearly.", "Don't forget the return statement or it returns 'undefined'."],
    practicePrompt: "Write a function named 'isHot' that takes 'temp' and returns true if temp > 40.",
    practicePlaceholder: "function isHot(temp) { ... }",
    practiceCorrect: "function isHot(temp) { return temp > 40; }"
  },
  {
    title: "Lesson 4: Arrow Functions",
    concept: "A shorter way to write functions. Modern SDKs use these for 'event listeners' (actions that happen when you tap the glasses).",
    anatomy: [
      "=> : The 'arrow' that points to the code",
      "( ) : Holds the inputs",
      "Implicit return : If it's one line, you don't need '{ }' or 'return'"
    ],
    analogy: "The 'Express Lane' at a store. Faster to write, same result.",
    example: 'const add = (a, b) => a + b;',
    tips: ["Used heavily in React and Wearables SDKs.", "If there's only one input, you can omit ( )."],
    practicePrompt: "Write an arrow function called 'double' that takes 'x' and returns 'x * 2'.",
    practicePlaceholder: "const double = ...",
    practiceCorrect: "const double = (x) => x * 2;"
  },
  {
    title: "Lesson 5: JSON Validation",
    concept: "JSON is the global language for data. It is STRICT. Keys MUST have double quotes.",
    anatomy: [
      '"" : Double quotes required for ALL keys',
      "No trailing comma : The last item cannot have a comma after it"
    ],
    analogy: "Legal documents. One missing signature (quote) makes the whole thing void.",
    example: '{\n  "user": "dev",\n  "active": true\n}',
    tips: ["Single quotes '' are NOT allowed in JSON.", "Comments // are NOT allowed in JSON."],
    practicePrompt: "Fix this invalid JSON: { user: 'admin', age: 25, }",
    practicePlaceholder: '{ user: ... }',
    practiceCorrect: '{ "user": "admin", "age": 25 }'
  }
];

export const FLASHCARDS: Flashcard[] = [
  { id: 'f1', deck: 'A', question: "What is 'SLAM' and why is it expensive?", answer: "Simultaneous Localization and Mapping. It uses cameras/IMUs to map the environment. It's expensive because it requires high-frequency NPU/CPU compute, causing thermal build-up.", tags: ['cv', 'hardware'] },
  { id: 'f2', deck: 'C', question: "Name 3 primary hardware constraints for AI glasses.", answer: "Thermal limits (heat on face), Battery capacity (volume constraints), and Weight/Ergonomics.", tags: ['hardware', 'wearables'] },
  { id: 'f6', deck: 'A', question: "What is 'Bluetooth MTU' and how does it affect PEs?", answer: "Maximum Transmission Unit. It defines the largest data packet. If a partner sends a 1MB image over a standard 23-byte MTU without negotiation, the app will crawl or disconnect.", tags: ['connectivity', 'ble'] },
  { id: 'f7', deck: 'D', question: "What is '6DOF' vs '3DOF'?", answer: "3 Degrees of Freedom (Rotation only: look left/right/up/down). 6 Degrees of Freedom (Rotation + Translation: you can walk around objects). 6DOF is required for 'world-locked' AR.", tags: ['optics', 'cv'] },
  { id: 'f8', deck: 'B', question: "What is 'Spatial Audio' in wearables?", answer: "Simulating sound coming from a specific 3D point in space. Uses HRTF (Head Related Transfer Function) to trick the brain into 'locating' sound.", tags: ['audio', 'ux'] },
  { id: 'f9', deck: 'C', question: "How do 'Waveguides' work in AR glasses?", answer: "Thin glass/plastic optics that use internal reflection to 'steer' light from a tiny projector into the user's eye, allowing for transparent displays.", tags: ['optics', 'hardware'] },
  { id: 'f10', deck: 'A', question: "What is 'Sensor Fusion'?", answer: "Combining data from multiple sensors (IMU + GPS + Camera) to get a more accurate estimate of position/state than any single sensor could provide.", tags: ['cv', 'hardware'] }
];

export const CODING_PROMPTS: CodingPrompt[] = [
  { 
    id: 'c1', 
    title: "JSON Event Parser", 
    description: "Write a function to parse a stream of sensor events from the glasses and group them by type within a time window.", 
    difficulty: 'Easy', 
    hints: ["Use a Map for grouping.", "Windowing can be done by simple timestamp math."], 
    checklist: ["Handles malformed JSON", "Time-complexity is O(N)", "Memory efficient"],
    modelSolution: `function parseAndGroup(jsonStream, windowSizeMs) {
  try {
    const events = JSON.parse(jsonStream);
    const groups = new Map();
    const now = Date.now();

    events.forEach(event => {
      if (now - event.timestamp <= windowSizeMs) {
        if (!groups.has(event.type)) groups.set(event.type, []);
        groups.get(event.type).push(event);
      }
    });
    return Object.fromEntries(groups);
  } catch (e) {
    console.error("Invalid JSON Stream", e);
    return null;
  }
}`
  },
  { 
    id: 'c2', 
    title: "Exponential Backoff Logic", 
    description: "Implement a function that retries a Bluetooth connection. Each fail should double the wait time (1s, 2s, 4s, 8s).", 
    difficulty: 'Medium', 
    hints: ["Use a multiplier variable.", "Set a maximum retry limit to avoid infinite loops."], 
    checklist: ["Doubles interval correctly", "Includes a 'Max Retries' exit", "Clean console logging"],
    modelSolution: `async function retryConnection(connectFn, maxRetries = 5) {
  let delay = 1000; // Start with 1s
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await connectFn();
    } catch (err) {
      console.log(\`Attempt \${i + 1} failed. Retrying in \${delay}ms...\`);
      await new Promise(res => setTimeout(res, delay));
      delay *= 2; // Double the wait
    }
  }
  throw new Error("Max retries reached.");
}`
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: "The Broken Integration",
    description: "A major partner's app keeps crashing on the new firmware. They claim it's a Meta bug. Engineering says the partner is using private APIs.",
    approaches: [
      { label: 'A', text: "Immediately tell the partner they are using unsupported APIs and to stop.", feedback: "Too aggressive. Might damage relationship.", isBest: false },
      { label: 'B', text: "Debug the crash yourself, find the offending line, and present a migration path to a public API.", feedback: "Perfect. High-value partner engineering.", isBest: true },
      { label: 'C', text: "File a task for engineering to make the private API public.", feedback: "Inefficient and unlikely to be approved quickly.", isBest: false }
    ],
    modelStar: "S: Partner crash on firmware v2. T: Stabilize integration. A: Analyzed crash logs, identified private API usage, provided sample code for official SDK. R: Partner fixed in 24h."
  }
];
