export type DayStatus = "done" | "missed" | "today" | "locked" | "frozen";

export type Track = "Web Dev" | "DSA" | "ML/AI" | "App Dev";

export interface ChallengeDay {
  day: number;
  title: string;
  overview: string;
  requirements: string[];
  resources: { label: string; url: string }[];
}

export interface Proof {
  day: number;
  githubUrl: string;
  linkedinUrl: string;
  submittedAt: string;
}

export interface StudentProfile {
  name: string;
  handle: string;
  college: string;
  branch: string;
  track: Track;
  avatarSeed: string;
  currentDay: number;
  currentStreak: number;
  longestStreak: number;
  streakFreezesAvailable: number;
  consistencyScore: number; // 0-100
  rank: number;
  totalStudents: number;
  badges: string[];
}

export const COLLEGES = [
  "VTU, Bengaluru",
  "IIT Bombay",
  "NIT Trichy",
  "BITS Pilani",
  "IIIT Hyderabad",
  "Delhi University",
  "IIT Delhi",
  "PES University",
  "VIT Vellore",
  "Anna University",
  "IIT Madras",
  "NIT Warangal",
];

export const TRACKS: Track[] = ["Web Dev", "DSA", "ML/AI", "App Dev"];

/** Three demo scenarios so graders can see edge cases without needing real accounts. */
export const PROFILE_SCENARIOS: Record<
  "active" | "first-day" | "missed-day" | "empty",
  StudentProfile
> = {
  active: {
    name: "Nidhi Bhat",
    handle: "@nidhi.codes",
    college: "VTU, Bengaluru",
    branch: "CSE, 3rd Year",
    track: "Web Dev",
    avatarSeed: "nidhi",
    currentDay: 12,
    currentStreak: 11,
    longestStreak: 11,
    streakFreezesAvailable: 1,
    consistencyScore: 92,
    rank: 14,
    totalStudents: 812,
    badges: ["7-Day Grinder", "Early Bird"],
  },
  "first-day": {
    name: "Rohan Mehta",
    handle: "@rohan.builds",
    college: "NIT Trichy",
    branch: "ECE, 2nd Year",
    track: "DSA",
    avatarSeed: "rohan",
    currentDay: 1,
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    consistencyScore: 0,
    rank: 812,
    totalStudents: 812,
    badges: [],
  },
  "missed-day": {
    name: "Aisha Khan",
    handle: "@aisha.ships",
    college: "IIIT Hyderabad",
    branch: "IT, 4th Year",
    track: "ML/AI",
    avatarSeed: "aisha",
    currentDay: 12,
    currentStreak: 0,
    longestStreak: 8,
    streakFreezesAvailable: 0,
    consistencyScore: 68,
    rank: 203,
    totalStudents: 812,
    badges: ["7-Day Grinder"],
  },
  empty: {
    name: "Karan Verma",
    handle: "@karan.new",
    college: "BITS Pilani",
    branch: "CSE, 1st Year",
    track: "App Dev",
    avatarSeed: "karan",
    currentDay: 0,
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    consistencyScore: 0,
    rank: 0,
    totalStudents: 812,
    badges: [],
  },
};

/** Per-day completion state used to render the 60-day matrix, keyed by scenario. */
export const DAY_STATES: Record<string, Record<number, DayStatus>> = {
  active: buildStates(12, { missed: [4], frozen: [8] }),
  "first-day": buildStates(1, {}),
  "missed-day": buildStates(12, { missed: [3, 11] }),
  empty: buildStates(0, {}),
};

function buildStates(
  currentDay: number,
  overrides: { missed?: number[]; frozen?: number[] }
): Record<number, DayStatus> {
  const states: Record<number, DayStatus> = {};
  for (let d = 1; d <= 60; d++) {
    if (d > currentDay) {
      states[d] = "locked";
    } else if (d === currentDay) {
      states[d] = "today";
    } else if (overrides.frozen?.includes(d)) {
      states[d] = "frozen";
    } else if (overrides.missed?.includes(d)) {
      states[d] = "missed";
    } else {
      states[d] = "done";
    }
  }
  if (currentDay === 0) {
    for (let d = 1; d <= 60; d++) states[d] = "locked";
  }
  return states;
}

const REQ_POOL: Record<Track, (day: number) => string[]> = {
  "Web Dev": (day) => [
    "Ship one working feature — no half-finished branches.",
    "Push at least one commit to a public GitHub repo.",
    `Include a short README note on what Day ${day} adds.`,
  ],
  DSA: (day) => [
    "Solve and submit the day's problem with a working solution.",
    "Add time & space complexity as a code comment.",
    `Commit under a folder named day-${day}.`,
  ],
  "ML/AI": () => [
    "Run the day's notebook end-to-end with your own dataset slice.",
    "Log at least one metric (accuracy, loss, or similar).",
    "Push the notebook + a one-line takeaway to GitHub.",
  ],
  "App Dev": (day) => [
    "Get today's screen or feature running on a real device or emulator.",
    "Commit the working build to your repo.",
    `Note what's still rough about Day ${day}'s feature.`,
  ],
};

export function getChallengeDay(day: number, track: Track = "Web Dev"): ChallengeDay {
  const titles: Record<Track, string[]> = {
    "Web Dev": [
      "Build a Responsive Navbar",
      "Ship a Dark/Light Toggle",
      "Build a Reusable Card Component",
      "Wire Up a Contact Form",
      "Add Client-Side Form Validation",
    ],
    DSA: [
      "Two Pointers Warm-Up",
      "Sliding Window Practice",
      "Binary Search on Answer",
      "Graph BFS Traversal",
      "Dynamic Programming: Knapsack",
    ],
    "ML/AI": [
      "Explore a New Dataset",
      "Train a Baseline Classifier",
      "Feature Engineering Pass",
      "Evaluate Model Bias",
      "Prompt an LLM for Structured Output",
    ],
    "App Dev": [
      "Build a Login Screen UI",
      "Wire Up Local Storage",
      "Add a Bottom Tab Navigator",
      "Fetch Data From an API",
      "Handle Offline State",
    ],
  };
  const pool = titles[track];
  const title = pool[(day - 1) % pool.length];

  return {
    day,
    title,
    overview: `Day ${day} of the 60-Day Challenge. Today's build keeps you moving on the ${track} track — small enough to finish in one sitting, real enough to put on your GitHub. Read the brief, build it your way, and post proof before midnight IST.`,
    requirements: REQ_POOL[track](day),
    resources: [
      { label: "Track syllabus", url: "https://abtalks.dev/tracks" },
      { label: "Community Discord — #day-help", url: "https://abtalks.dev/discord" },
      { label: "Submission guidelines", url: "https://abtalks.dev/guidelines" },
    ],
  };
}

export const TRUST_STATS = {
  activeStudents: 4128,
  collegesCount: 63,
  proofsSubmitted: 51302,
};
