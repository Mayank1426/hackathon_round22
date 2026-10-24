export const exploreCategories = [
  { id: 'all', label: 'All practice', count: '06' },
  { id: 'company', label: 'Company journeys', count: '02' },
  { id: 'exam', label: 'Entrance exams', count: '01' },
  { id: 'package', label: 'By package', count: '01' },
  { id: 'coding', label: 'Coding & aptitude', count: '02' },
];

export const careerTracks = [
  { id: 'chip', name: 'Chip & systems engineer', count: 6 },
  { id: 'service', name: 'Service-company developer', count: 24, active: true },
  { id: 'digital', name: 'Digital & specialist roles', count: 12 },
  { id: 'product', name: 'Product-company SDE', count: 9 },
  { id: 'bigtech', name: 'Big Tech SDE', count: 25 },
];

export const prepBundles = [
  {
    name: 'Infosys Complete Prep',
    questions: '473 questions',
    price: '₹199',
    hiringRoles: ['Infosys DSE Trainee', 'Infosys SP'],
    difficulty: { easy: 781, medium: 771, hard: 317 }
  },
  {
    name: 'Accenture Complete Prep',
    questions: '446 questions',
    price: '₹199',
    hiringRoles: ['Associate Software Engineer ₹4.5–6.5L'],
    difficulty: { easy: 640, medium: 520, hard: 280 }
  },
  {
    name: 'TCS NQT Digital Prep',
    questions: '512 questions',
    price: '₹199',
    hiringRoles: ['TCS Digital ₹7–7.3L', 'TCS Prime'],
    difficulty: { easy: 810, medium: 690, hard: 340 }
  },
  {
    name: 'DIIPT Aptitude & Tech Pack',
    questions: '180 questions',
    price: '₹149',
    hiringRoles: ['DIIPT Institute Selection', 'Campus Tech Round'],
    difficulty: { easy: 90, medium: 70, hard: 20 }
  }
];

export const exploreCards = [
  {
    id: 'exp-1',
    kind: 'company',
    tag: 'COMPANY JOURNEYS',
    title: 'Know the round before you walk in.',
    description: 'Explore company-specific question sets, patterns, and past round experiences for top tech employers.',
    linkText: 'Browse company journeys',
    linkHref: '#question-bank',
    badge: '48+ Companies',
    accentColor: 'purple',
    coreBrand: 'TCS',
    chips: ['Cognizant', 'DIIPT', 'Wipro', 'Infosys', 'Accenture']
  },
  {
    id: 'exp-2',
    kind: 'exam',
    tag: 'ENTRANCE EXAMS',
    title: 'Prepare for the next test.',
    description: 'Organised practice for national qualifiers, aptitude rounds, logical reasoning, and exam-style questions.',
    linkText: 'Explore exam prep',
    linkHref: '#question-bank',
    badge: 'Mock Tests Live',
    accentColor: 'lilac',
    stamp: 'READY SET GO!'
  },
  {
    id: 'exp-3',
    kind: 'package',
    tag: 'BY PACKAGE',
    title: 'Make your target specific.',
    description: 'Focus on the specific role and salary band you are working toward, from foundation to super-dream tiers.',
    linkText: 'Compare preparation plans',
    linkHref: '#pricing',
    badge: 'Targeted Prep',
    accentColor: 'yellow',
    ranges: ['3–7 LPA', '7–12 LPA', '12–25+ LPA']
  },
  {
    id: 'exp-4',
    kind: 'coding',
    tag: 'CODING PRACTICE',
    title: 'Build skill through repetition.',
    description: 'Practise curated coding challenges with in-browser execution and strengthen problem-solving fundamentals.',
    linkText: 'Start coding practice',
    linkHref: '#question-bank',
    badge: 'Interactive IDE',
    accentColor: 'dark',
    languages: 'C++ • JAVA • PYTHON • JS'
  },
  {
    id: 'exp-5',
    kind: 'coding',
    tag: 'APTITUDE & REASONING',
    title: 'Think clearly under pressure.',
    description: 'Master quantitative aptitude, analytical reasoning, and verbal fluency under realistic round timers.',
    linkText: 'Practise aptitude',
    linkHref: '#question-bank',
    badge: '1,500+ Drills',
    accentColor: 'emerald',
    symbols: ['∑', '%', 'π', 'Δ']
  },
  {
    id: 'exp-6',
    kind: 'company',
    tag: 'MOCK INTERVIEWS',
    title: 'Make the real round feel familiar.',
    description: 'Rehearse technical and HR interview rounds with simulated roleplay prompts and AI guidance feedback.',
    linkText: 'Explore mock rounds',
    linkHref: '#leaderboard',
    badge: 'Live Simulations',
    accentColor: 'purple',
    subText: 'Tech + Behavioral'
  }
];

export const questionsData = [
  {
    id: 1,
    title: 'Extern Variables — Linkage and scope in multi-file C programs',
    company: 'Uber India SDE-1',
    companyType: 'Product-based',
    module: 'MCQ',
    language: 'C',
    salary: '25–40 LPA',
    salaryBand: '12+ LPA',
    difficulty: 'Hard',
    recency: 'Last 30 days',
    tags: ['Storage Classes', 'C Fundamentals', 'Linkage'],
    isLocked: true,
    description: 'Explain what happens when an extern variable is declared without initialization across compilation units in C.',
    starterCode: {
      cpp: `// file1.c\nint global_var = 100;\n\n// file2.c\n#include <stdio.h>\nextern int global_var;\n\nint main() {\n    printf("%d\\n", global_var);\n    return 0;\n}`,
      python: `# Equivalent module linkage\nimport config\nprint(config.GLOBAL_VAR)`
    },
    sampleInput: 'Multiple files declaring extern int global_var;',
    expectedOutput: 'Resolved at link-time without duplicate symbol conflict',
    explanation: 'extern declares a variable with external linkage, referring to a single definition defined in another translation unit.'
  },
  {
    id: 2,
    title: 'String Replacement & Transformation — In-place buffer formatting',
    company: 'Persistent Systems',
    companyType: 'Service-based',
    module: 'Coding',
    language: 'Java',
    salary: '4.5–7 LPA',
    salaryBand: '3–7 LPA',
    difficulty: 'Easy',
    recency: 'Last 30 days',
    tags: ['Strings', 'Algorithms', 'Arrays'],
    isLocked: true,
    description: 'Replace all spaces in a character array with "%20" with sufficient buffer space at the end.',
    starterCode: {
      java: `public class Solution {\n    public void replaceSpaces(char[] str, int trueLength) {\n        int spaceCount = 0;\n        for (int i = 0; i < trueLength; i++) if (str[i] == ' ') spaceCount++;\n        int index = trueLength + spaceCount * 2;\n        for (int i = trueLength - 1; i >= 0; i--) {\n            if (str[i] == ' ') {\n                str[--index] = '0'; str[--index] = '2'; str[--index] = '%';\n            } else {\n                str[--index] = str[i];\n            }\n        }\n    }\n}`
    },
    sampleInput: '"Mr John Smith    ", trueLength = 13',
    expectedOutput: '"Mr%20John%20Smith"',
    explanation: 'Scan from right to left to perform in-place replacement without overwriting unprocessed characters.'
  },
  {
    id: 3,
    title: 'Modified Binary Search — Search in Rotated Sorted Array',
    company: 'Infosys DSE Trainee',
    companyType: 'Service-based',
    module: 'Coding',
    language: 'Python',
    salary: '6.25 LPA',
    salaryBand: '3–7 LPA',
    difficulty: 'Medium',
    recency: 'Last 3 months',
    tags: ['Binary Search', 'Arrays', 'Divide & Conquer'],
    isLocked: true,
    description: 'Given a sorted array rotated at an unknown pivot, search for a target value in O(log N) time.',
    starterCode: {
      python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1\n\nprint(search([4,5,6,7,0,1,2], 0))`
    },
    sampleInput: 'nums = [4,5,6,7,0,1,2], target = 0',
    expectedOutput: '4',
    explanation: 'At least one half is always sorted; determine which half the target lies in and adjust binary search boundaries.'
  },
  {
    id: 4,
    title: 'Two Sum — Given a sorted array, find two elements that add up to a target sum.',
    company: 'Amazon — SDE-II',
    companyType: 'Product-based',
    module: 'Coding',
    language: 'Python',
    salary: '25–40 LPA',
    salaryBand: '12+ LPA',
    difficulty: 'Medium',
    recency: 'Last 30 days',
    tags: ['Two pointers', 'Array', 'Optimal O(N)'],
    description: 'Given an array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices (1-indexed).',
    starterCode: {
      python: `def two_sum(numbers, target):\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        current_sum = numbers[left] + numbers[right]\n        if current_sum == target:\n            return [left + 1, right + 1]\n        elif current_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []\n\n# Sample run:\nprint(two_sum([2, 7, 11, 15], 9))`,
      java: `public class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int left = 0, right = numbers.length - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) return new int[]{left + 1, right + 1};\n            if (sum < target) left++; else right--;\n        }\n        return new int[]{};\n    }\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& numbers, int target) {\n    int l = 0, r = numbers.size() - 1;\n    while (l < r) {\n        int s = numbers[l] + numbers[r];\n        if (s == target) return {l + 1, r + 1};\n        if (s < target) l++; else r--;\n    }\n    return {};\n}`
    },
    sampleInput: 'numbers = [2, 7, 11, 15], target = 9',
    expectedOutput: '[1, 2]',
    explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.'
  },
  {
    id: 5,
    title: 'A train crosses a 160m platform in 18 seconds and a signal post in 10 seconds. Find its speed in km/h.',
    company: 'TCS NQT — Quantitative',
    companyType: 'Service-based',
    module: 'Aptitude',
    language: 'Any',
    salary: '3–7 LPA',
    salaryBand: '3–7 LPA',
    difficulty: 'Easy',
    recency: 'Last 30 days',
    tags: ['Time & distance', 'Quant', 'Speed Formulas'],
    description: 'A standard speed, distance, and time problem testing relative motion across static obstacles of varying length.',
    starterCode: {
      python: `def train_speed(platform_len, t_platform, t_pole):\n    speed_mps = platform_len / (t_platform - t_pole)\n    speed_kmh = speed_mps * 3.6\n    return round(speed_kmh, 2)\n\nprint(f"Speed: {train_speed(160, 18, 10)} km/h")`
    },
    sampleInput: 'platform_len = 160m, t_platform = 18s, t_pole = 10s',
    expectedOutput: '72 km/h',
    explanation: 'Train covers its own length in 10s, and its own length + 160m in 18s. So it covers 160m in 8s = 20 m/s = 72 km/h.'
  },
  {
    id: 6,
    title: 'DIIPT Aptitude: Modular Arithmetic & Sequence Pattern Analysis',
    company: 'DIIPT Tech & Aptitude',
    companyType: 'Product-based',
    module: 'Aptitude',
    language: 'Python',
    salary: '7–12 LPA',
    salaryBand: '7–12 LPA',
    difficulty: 'Medium',
    recency: 'Last 30 days',
    tags: ['DIIPT', 'Number Theory', 'Aptitude Core'],
    description: 'Calculate the remainder when 7^105 is divided by 10 and determine the nth sequence term.',
    starterCode: {
      python: `def diipt_modular(base, exponent, modulus):\n    # Fast modular exponentiation for competitive aptitude\n    return pow(base, exponent, modulus)\n\nprint("DIIPT Unit Digit:", diipt_modular(7, 105, 10))`
    },
    sampleInput: 'base = 7, exp = 105, mod = 10',
    expectedOutput: 'DIIPT Unit Digit: 7',
    explanation: 'Powers of 7 follow cyclicity of 4: 7, 9, 3, 1. 105 % 4 = 1, hence remainder is 7.'
  }
];

// Exact Leaderboard Data from PDF Pages 7 & 8
export const podiumData = [
  {
    rank: '01',
    name: 'Ronia Rosario K',
    college: 'Non-Institutional Student',
    xp: '2739.53',
    avatar: 'R',
    medal: '01',
    badge: '#1',
    crown: '👑',
    avatarBg: 'bg-rose-500 text-white',
    blockColor: 'bg-gradient-to-t from-amber-200 to-amber-100 text-amber-950 border-t-2 border-amber-400'
  },
  {
    rank: '02',
    name: 'Srimathi',
    college: 'Non-Institutional Student',
    xp: '1749.03',
    avatar: 'S',
    medal: '02',
    badge: '#2',
    crown: '🥈',
    avatarBg: 'bg-teal-600 text-white',
    blockColor: 'bg-gradient-to-t from-purple-100 to-purple-50 text-purple-900 border-t-2 border-purple-400'
  },
  {
    rank: '03',
    name: 'PAVAN KUMAR',
    college: 'Non-Institutional Student',
    xp: '494.83',
    avatar: 'PK',
    medal: '03',
    badge: '#3',
    crown: '🥉',
    avatarBg: 'bg-indigo-600 text-white',
    blockColor: 'bg-gradient-to-t from-emerald-100 to-emerald-50 text-emerald-900 border-t-2 border-emerald-400'
  }
];

export const rankingsData = [
  { rank: '4', name: 'Kavipriya E', college: 'Non-Institutional Student', xp: '475.64', avatar: 'K', color: 'bg-teal-500 text-white' },
  { rank: '5', name: 'A Sri Mathi', college: 'Non-Institutional Student', xp: '473.84', avatar: 'AS', color: 'bg-amber-500 text-white' },
  { rank: '7', name: 'SHAIK KARIMULLA', college: 'Non-Institutional Student', xp: '437.26', avatar: 'SK', color: 'bg-emerald-500 text-white' },
  { rank: '8', name: 'Rasul', college: 'Non-Institutional Student', xp: '420.38', avatar: 'R', color: 'bg-slate-800 text-white' },
  { rank: '9', name: 'Santhoshini C', college: 'Non-Institutional Student', xp: '387.03', avatar: 'S', color: 'bg-blue-600 text-white' },
  { rank: '10', name: 'Fawwaz Ahamed', college: 'Non-Institutional Student', xp: '381.83', avatar: 'F', color: 'bg-pink-600 text-white' },
  { rank: '11', name: 'Dinesh', college: 'Non-Institutional Student', xp: '380.98', avatar: 'D', color: 'bg-slate-600 text-white' },
  { rank: '12', name: 'Arfath', college: 'Non-Institutional Student', xp: '380.45', avatar: 'A', color: 'bg-purple-600 text-white' },
  { rank: '13', name: 'Magesh D', college: 'Dhaanish COE', xp: '373.19', avatar: 'MD', color: 'bg-indigo-700 text-white' }
];

// Exact Pricing Plans from PDF Pages 9, 10, 11, 12
export const pricingPlans = [
  {
    id: 'bronze',
    name: 'BRONZE',
    icon: '◒',
    price: '₹699',
    period: '/ year',
    dailyPrice: '₹2 a day',
    salaryBand: '0–3 LPA',
    description: 'Service Based Company Interview Questions',
    features: [
      'Daily challenges',
      'MCQ Practice',
      'Coding Questions'
    ],
    popular: false,
    badge: null
  },
  {
    id: 'silver',
    name: 'SILVER',
    icon: '◒',
    price: '₹999',
    period: '/ year',
    dailyPrice: '₹3 a day',
    salaryBand: '0–5 LPA',
    description: 'Service Based Company Interview Questions',
    features: [
      'Daily challenges',
      'MCQ Practice',
      'Coding Questions'
    ],
    popular: false,
    badge: null
  },
  {
    id: 'gold',
    name: 'GOLD',
    icon: '✦',
    price: '₹1,599',
    period: '/ year',
    dailyPrice: '₹5 a day',
    salaryBand: '0–7 LPA',
    description: 'Service & Product Based Interview Questions',
    features: [
      'Daily challenges',
      'MCQ Practice',
      'Coding Questions',
      'Advanced AI Report card',
      'Topic-wise and platform-wise filter enabled'
    ],
    popular: false,
    badge: null
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    icon: '✦',
    price: '₹1,999',
    period: '/ year',
    dailyPrice: '₹6 a day',
    salaryBand: '0–12 LPA',
    description: 'Higher-intensity placement preparation for high packages',
    features: [
      'Daily challenges',
      'MCQ Practice',
      'Coding Questions',
      'Advanced AI Report card',
      'Topic-wise and platform-wise filter enabled',
      'Company-wise filter',
      'Package-wise filter'
    ],
    popular: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'super-dream',
    name: 'SUPER DREAM PACK',
    icon: '✳',
    price: '₹2,999',
    period: '/ year',
    dailyPrice: '₹9 a day',
    salaryBand: '15+ LPA',
    description: 'Product & Service Interview Questions',
    features: [
      'Daily challenges',
      'MCQ Practice',
      'Coding Questions',
      'Advanced AI Report card',
      'Topic-wise and platform-wise filter enabled',
      'Company-wise filter',
      'Year-wise, quarter-wise filter',
      'All Bundles will be unlocked',
      'Early Access to all Exam series & notifications'
    ],
    popular: false,
    badge: 'BEST VALUE'
  }
];

export const dailyTasksList = [
  { id: 't1', title: 'Solve two array questions', category: 'Coding · 8 minutes', xp: 20, completed: false },
  { id: 't2', title: 'Review one SQL query', category: 'Core fundamentals · 4 minutes', xp: 10, completed: false },
  { id: 't3', title: 'Try five aptitude questions', category: 'Quantitative · 4 minutes', xp: 15, completed: false },
  { id: 't4', title: 'Review one coding solution', category: 'Interview prep · 2 minutes', xp: 10, completed: false }
];

export const placementLevels = {
  1: {
    level: 1,
    city: 'CHENNAI',
    tag: 'LEVEL 01 · FOUNDATION DRIVE',
    title: 'Service MNC Placement Hub',
    description: 'Master core coding algorithms, quantitative aptitude, verbal reasoning, and foundational mock-round practice.',
    xp: '+1,200 XP',
    coreQs: '90+',
    clearRate: '94%',
    mappedQs: '3,100+',
    recruiters: ['TCS NQT', 'Wipro NLTH', 'Cognizant GenC', 'HCLTech GET'],
    briefing: 'Focuses on foundational data structures, time-constrained quantitative tests, and basic syntax mastery for mass recruitment drives.'
  },
  2: {
    level: 2,
    city: 'PUNE',
    tag: 'LEVEL 02 · SKILL BUILD',
    title: 'Product & FinTech Preparation',
    description: 'Strengthen problem-solving patterns, hash tables, sliding windows, and timed coding practice under pressure.',
    xp: '+1,500 XP',
    coreQs: '120+',
    clearRate: '88%',
    mappedQs: '4,200+',
    recruiters: ['Barclays', 'Persistent', 'LTI Mindtree', 'Birlasoft'],
    briefing: 'Deep dives into intermediate data structures, recursion, binary search, and OOPs concepts frequently evaluated in product tests.'
  },
  3: {
    level: 3,
    city: 'HYDERABAD',
    tag: 'LEVEL 03 · SPECIALIST',
    title: 'Advanced Engineering Route',
    description: 'Focus on graphs, trees, dynamic programming, database internal queries, and rigorous technical interviews.',
    xp: '+1,800 XP',
    coreQs: '150+',
    clearRate: '79%',
    mappedQs: '5,600+',
    recruiters: ['Infosys Power Programmer', 'TCS Digital', 'Deloitte USI', 'Virtusa'],
    briefing: 'High-intensity coding track for specialist roles offering 7-12 LPA packages with algorithmic rigor.'
  },
  4: {
    level: 4,
    city: 'DELHI',
    tag: 'LEVEL 04 · INTERVIEW READY',
    title: 'Technical & Leadership Rounds',
    description: 'Practise system breakdowns, live coding walkthroughs, behavioural STAR framework, and communication clarity.',
    xp: '+2,000 XP',
    coreQs: '80+',
    clearRate: '72%',
    mappedQs: '2,800+',
    recruiters: ['Paytm', 'MakeMyTrip', 'Urban Company', 'Zomato'],
    briefing: 'Prepares candidates to speak with engineering managers, walk through design trade-offs, and tackle situational rounds.'
  },
  5: {
    level: 5,
    city: 'BENGALURU',
    tag: 'LEVEL 05 · DREAM OFFER',
    title: 'Tier-1 Product & Unicorn Track',
    description: 'Bring low-level design, distributed cache patterns, concurrent algorithms, and premium coding challenges together.',
    xp: '+2,500 XP',
    coreQs: '200+',
    clearRate: '61%',
    mappedQs: '6,500+',
    recruiters: ['Amazon', 'Microsoft', 'Atlassian', 'Razorpay', 'Flipkart'],
    briefing: 'The pinnacle placement tier for SDE-1 roles commanding 20+ LPA with distributed system logic and FAANG-style tests.'
  }
};

export const audienceData = {
  students: {
    eyebrow: 'FOR STUDENTS',
    title: "Everything you need.<br/><span class='text-purple-700'>Nothing you don't.</span>",
    text: 'Stop grinding random problems in isolation. Filter to the exact round you are walking into, practise with clear intention, and watch your progress become visible every single day.',
    points: [
      'Company-specific hiring patterns & salary band filters',
      'Curated coding, aptitude, and verbal mock practice with IDE',
      'Campus leaderboards, streaks, badges, and progress milestones'
    ],
    cta: 'Start a practice route ↗',
    ctaLink: '#destination',
    avatar: 'MK',
    role: 'STUDENT PRACTICE VIEW',
    name: 'Your placement workspace',
    desc: 'Today’s progress at a glance',
    statLabel1: 'PRACTICE STREAK',
    statValue1: '07',
    statSub1: 'days',
    statTrend1: '↗ Building momentum',
    statLabel2: 'QUESTIONS SOLVED',
    statValue2: '128',
    statSub2: '',
    statTrend2: 'Across your selected tracks',
    chartTitle: 'Weekly practice questions',
    chartData: [32, 58, 43, 78, 62, 94, 52]
  },
  hods: {
    eyebrow: 'FOR FACULTY & PLACEMENT TEAMS',
    title: "Now imagine seeing<br/><span class='text-purple-700'>the whole batch.</span>",
    text: 'Get real-time departmental visibility into student practice volume, skill proficiency, and readiness across various company tiers before recruitment drives commence.',
    points: [
      'Who is practising consistently?',
      'Where is the batch getting stuck?',
      'Which cohort needs attention now?'
    ],
    cta: 'Explore campus insights ↗',
    ctaLink: '#institutions',
    avatar: 'HD',
    role: 'HOD / DEPARTMENT VIEW',
    name: 'Department readiness overview',
    desc: 'Cohort engagement & performance at a glance',
    statLabel1: 'ACTIVE LEARNERS',
    statValue1: '248',
    statSub1: 'students',
    statTrend1: '↗ 88% weekly cohort activity',
    statLabel2: 'PRACTICE COMPLETION',
    statValue2: '76%',
    statSub2: '',
    statTrend2: 'Across target company tracks',
    chartTitle: 'Batch completion trends (L01–L05)',
    chartData: [45, 62, 70, 85, 91, 76, 88]
  },
  admins: {
    eyebrow: 'FOR INSTITUTION ADMINS',
    title: "One centralized view of the<br/><span class='text-purple-700'>entire campus program.</span>",
    text: 'Seamlessly administer university-scale mock placement drives, audit assessment integrity, configure institutional licenses, and generate executive placement reports in minutes.',
    points: [
      'Multi-college & multi-department unified administration',
      'Proctored assessment console with audit trail & integrity scores',
      'Accreditation and placement outcome compliance reports'
    ],
    cta: 'Schedule an institutional demo ↗',
    ctaLink: '#start',
    avatar: 'AD',
    role: 'ADMINISTRATOR VIEW',
    name: 'Institutional oversight console',
    desc: 'Campus-wide signals & integrity health',
    statLabel1: 'ACTIVE CAMPUSES',
    statValue1: '12',
    statSub1: 'colleges',
    statTrend1: '↗ 14,200 enrolled candidates',
    statLabel2: 'TOTAL ASSESSMENTS',
    statValue2: '84',
    statSub2: '',
    statTrend2: '100% integrity audit logs generated',
    chartTitle: 'Monthly assessment sessions',
    chartData: [20, 35, 50, 68, 74, 82, 84]
  }
};

export const testimonialsData = [
  {
    quote: 'Our students preparing for IT product and service drives used DKoder for mock technical rounds. The structured question bank helped students master actual hiring patterns before company drives, resulting in a 42% jump in Day-1 offers.',
    name: 'Dr. Mohamed Riaz',
    role: 'Placement Director & HOD CSE · Government Engineering College',
    avatar: 'MR',
    tag: 'TPO VERIFIED · INSTITUTIONAL IMPACT'
  },
  {
    quote: 'Rather than grinding 500 disconnected LeetCode problems, DKoder gave me the exact 24 questions TCS Digital and Cognizant GenC asked last semester. I cracked my dream 9 LPA offer within 3 weeks of targeted practice!',
    name: 'Priya Sharma',
    role: 'Final Year CSE · Placed at Cognizant GenC Next',
    avatar: 'PS',
    tag: 'STUDENT SUCCESS STORY'
  },
  {
    quote: 'The assessment integrity command center and real-time student leaderboard gave our placement cell an unprecedented view of genuine student capability. A game changer for campus recruitment teams.',
    name: 'Prof. Ramesh Kulkarni',
    role: 'Dean of Training & Placement · State University',
    avatar: 'RK',
    tag: 'ADMINISTRATOR ENDORSEMENT'
  }
];

export const faqList = [
  {
    question: 'What does it cost, and how does student vs institutional licensing work?',
    answer: 'Individual student subscriptions range from ₹699/year (Bronze) to ₹2,999/year (Super Dream Pack). For colleges and universities, we offer institution-wide enterprise packages with custom seat allocations, proctoring consoles, and LMS integrations. Contact our institutional team for campus discounts.'
  },
  {
    question: 'How much work is onboarding? Do colleges need weeks of technical setup?',
    answer: 'Zero technical installation or dedicated servers are required. DKoder runs entirely in modern web browsers. Students and faculty can sign in via Google SSO or institutional email rosters, and full batch onboarding typically takes under 15 minutes.'
  },
  {
    question: "Is our students' data safe, and who can access their practice reports?",
    answer: 'DKoder enforces strict role-based access control (RBAC), end-to-end TLS encryption, and SOC-2 compliant cloud infrastructure. Student assessment results and code submissions are only accessible by authorized institutional coordinators and the students themselves.'
  },
  {
    question: 'Where do the questions come from, and are they kept current with recent drives?',
    answer: 'Our question bank is updated weekly by verified campus alumni and industry technical interviewers. Questions reflect real patterns from recent 2025/2026 hiring drives across companies like TCS, Infosys, Amazon, Microsoft, and Cognizant.'
  },
  {
    question: 'How does the secure assessment & proctoring integrity system work?',
    answer: 'Our assessment integrity command center provides automated multi-factor monitoring, including tab-switch detection, dual-monitor checks, paste-event auditing, and web-cam snapshot verification for official campus placement tests.'
  },
  {
    question: 'What support and training does the campus training & placement cell get?',
    answer: 'Campus partners receive a dedicated Placement Success Manager, live faculty orientation workshops, weekly cohort progress briefings, and 24/7 technical support during live campus assessment days.'
  },
  {
    question: 'How is DKoder different from general platforms like LeetCode or HackerRank?',
    answer: 'General coding platforms are geared toward generic algorithmic puzzles. DKoder is specifically designed around Indian campus placement rounds—pairing exact company tracks, aptitude drills, verbal tests, mock interviews, and departmental TPO dashboards in one unified experience.'
  },
  {
    question: 'Do students need to install any heavy software or compilers on their laptops?',
    answer: 'No local installation is needed. DKoder includes a cloud-based in-browser coding playground supporting Python, Java, C++, and JavaScript with instant test-case execution.'
  }
];

export const platformFeatures = [
  {
    num: '01',
    symbol: '⌕',
    color: 'text-purple-700 border-purple-200 bg-purple-50',
    title: 'Aptitude & MCQs',
    desc: 'Build speed and accuracy for screening rounds with timed problem sets.',
    link: '#question-bank'
  },
  {
    num: '02',
    symbol: '{ }',
    color: 'text-amber-700 border-amber-200 bg-amber-50',
    title: 'Coding practice',
    desc: 'Work through real challenges and execute code in the browser with instant testcases.',
    link: '#question-bank'
  },
  {
    num: '03',
    symbol: '↗',
    color: 'text-emerald-700 border-emerald-200 bg-emerald-50',
    title: 'Mock exams',
    desc: 'Practise timed, test-like rounds under realistic conditions and review comprehensive scorecards.',
    link: '#leaderboard'
  },
  {
    num: '04',
    symbol: '▤',
    color: 'text-pink-700 border-pink-200 bg-pink-50',
    title: 'Courses & sets',
    desc: 'Use curated problem sets, company bundles, and the course library where included.',
    link: '#explore'
  },
  {
    num: '05',
    symbol: '◎',
    color: 'text-blue-700 border-blue-200 bg-blue-50',
    title: 'Progress & scores',
    desc: 'Track activity, XP, strengths, and analytics as your performance improves day by day.',
    link: '#institutions'
  }
];
