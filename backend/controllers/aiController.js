const AIHistory = require('../models/AIHistory');
const User = require('../models/User');

// Intelligent mock responses for study topics
const getMockResponse = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes('dbms') || lower.includes('normalization') || lower.includes('database')) {
    return `## 📚 DBMS Normalization

**Normalization** is the process of organizing a relational database to reduce data redundancy and improve data integrity.

### Normal Forms:

**1NF (First Normal Form)**
- Each column contains atomic values
- No repeating groups
- Each row is unique

**2NF (Second Normal Form)**
- Must be in 1NF
- No partial dependencies (non-key attributes depend on the whole primary key)

**3NF (Third Normal Form)**
- Must be in 2NF
- No transitive dependencies (non-key attributes depend only on the primary key)

**BCNF (Boyce-Codd Normal Form)**
- Stronger version of 3NF
- For every dependency X → Y, X must be a superkey

### Example:
\`\`\`
Student(StudentID, StudentName, CourseID, CourseName, InstructorID, InstructorName)
\`\`\`
This violates 3NF because CourseName depends on CourseID (not StudentID).

**Solution:** Split into:
- \`Student(StudentID, StudentName)\`
- \`Course(CourseID, CourseName, InstructorID)\`
- \`Instructor(InstructorID, InstructorName)\`
- \`Enrollment(StudentID, CourseID)\`

> 💡 **Pro Tip:** Aim for BCNF in production databases to minimize anomalies.`;
  }

  if (lower.includes('react') && lower.includes('hook')) {
    return `## ⚛️ React Hooks — Complete Guide

React Hooks let you use state and lifecycle features in functional components.

### Core Hooks:

**useState**
\`\`\`jsx
const [count, setCount] = useState(0);
// Update: setCount(count + 1) or setCount(prev => prev + 1)
\`\`\`

**useEffect**
\`\`\`jsx
useEffect(() => {
  // Runs after every render
  fetchData();
  return () => cleanup(); // cleanup on unmount
}, [dependency]); // [] = run once on mount
\`\`\`

**useContext**
\`\`\`jsx
const theme = useContext(ThemeContext);
\`\`\`

**useRef**
\`\`\`jsx
const inputRef = useRef(null);
inputRef.current.focus();
\`\`\`

**useMemo & useCallback**
\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedFn = useCallback(() => handleClick(id), [id]);
\`\`\`

### Custom Hooks:
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
}
\`\`\`

> 💡 **Rules of Hooks:** Only call at the top level, only call from React functions.`;
  }

  if (lower.includes('dsa') || lower.includes('data structure') || lower.includes('algorithm')) {
    return `## 🔢 Data Structures & Algorithms — Study Plan

### Core Data Structures:

| Structure | Insert | Delete | Search | Space |
|-----------|--------|--------|--------|-------|
| Array | O(n) | O(n) | O(n) | O(n) |
| LinkedList | O(1) | O(1) | O(n) | O(n) |
| Stack | O(1) | O(1) | O(n) | O(n) |
| Queue | O(1) | O(1) | O(n) | O(n) |
| HashMap | O(1) avg | O(1) avg | O(1) avg | O(n) |
| BST | O(log n) | O(log n) | O(log n) | O(n) |
| Heap | O(log n) | O(log n) | O(n) | O(n) |

### Essential Algorithms:

**Sorting:**
- Bubble Sort: O(n²)
- Merge Sort: O(n log n) ← Best for stability
- Quick Sort: O(n log n) avg ← Best in practice
- Heap Sort: O(n log n)

**Searching:**
- Linear Search: O(n)
- Binary Search: O(log n)

### Study Roadmap:
1. Arrays & Strings
2. Linked Lists
3. Stacks & Queues
4. Trees & Graphs
5. Dynamic Programming
6. Greedy Algorithms

> 💡 **Practice:** LeetCode 150 problems for interview prep!`;
  }

  if (lower.includes('study plan') || lower.includes('schedule') || lower.includes('preparation')) {
    return `## 📅 Personalized Study Plan

### Weekly Study Schedule (4-Week Plan):

**Week 1: Fundamentals**
- Mon-Tue: Programming basics (Python/Java)
- Wed-Thu: Data Structures (Arrays, LinkedList)
- Fri: Review + Practice Problems
- Weekend: Mini project

**Week 2: Core CS Subjects**
- Mon-Tue: DBMS (ER Diagrams, Normalization)
- Wed-Thu: OS (Processes, Scheduling, Memory)
- Fri: Review + Practice
- Weekend: Mock Quiz

**Week 3: Web Development**
- Mon-Tue: HTML/CSS + JavaScript
- Wed-Thu: React.js + Node.js
- Fri: MongoDB + REST APIs
- Weekend: Full-Stack Mini Project

**Week 4: Algorithms + Interview Prep**
- Mon-Tue: Sorting & Searching
- Wed-Thu: Dynamic Programming
- Fri: System Design Basics
- Weekend: Mock Interviews

### Daily Study Routine:
\`\`\`
06:00 - 07:00  Morning revision
09:00 - 12:00  Deep focus study
14:00 - 16:00  Practice problems
19:00 - 20:00  Review & notes
\`\`\`

> 💡 **Pomodoro Technique:** 25 min study + 5 min break = 1 Pomodoro. Do 4 Pomodoros then take a 30-min break.`;
  }

  if (lower.includes('python')) {
    return `## 🐍 Python — Key Concepts

### Core Features:
\`\`\`python
# List Comprehension
squares = [x**2 for x in range(10)]

# Dictionary Comprehension
word_len = {word: len(word) for word in ['hello', 'world']}

# Lambda Functions
double = lambda x: x * 2

# Decorators
def timer(func):
    import time
    def wrapper(*args):
        start = time.time()
        result = func(*args)
        print(f"Time: {time.time() - start:.2f}s")
        return result
    return wrapper

# Generators
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Context Managers
with open('file.txt', 'r') as f:
    content = f.read()
\`\`\`

### OOP in Python:
\`\`\`python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __repr__(self):
        return f"Student({self.name}, {self.grade})"
    
    @property
    def is_pass(self):
        return self.grade >= 50
\`\`\`

> 💡 **Tip:** Python is great for ML/AI, automation, web dev (Django/Flask), and scripting.`;
  }

  if (lower.includes('os') || lower.includes('operating system')) {
    return `## 🖥️ Operating Systems — Core Concepts

### Process Management:

**Process States:**
New → Ready → Running → Waiting → Terminated

**CPU Scheduling Algorithms:**
| Algorithm | Type | Advantages |
|-----------|------|------------|
| FCFS | Non-preemptive | Simple |
| SJF | Non-preemptive | Optimal avg waiting time |
| Round Robin | Preemptive | Fair, good for time-sharing |
| Priority | Both | Important tasks first |

**Deadlock Conditions (All 4 must hold):**
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

### Memory Management:
- **Paging:** Fixed-size blocks (frames)
- **Segmentation:** Variable-size logical blocks
- **Virtual Memory:** Uses disk as extended RAM
- **Page Replacement:** FIFO, LRU, Optimal

### Synchronization:
\`\`\`
Semaphore, Mutex, Monitor
Producer-Consumer, Reader-Writer, Dining Philosophers
\`\`\`

> 💡 **GATE Tip:** Focus on Scheduling (numericals), Deadlock, and Memory Management for exams.`;
  }

  if (lower.includes('node') || lower.includes('express') || lower.includes('backend')) {
    return `## 🚀 Node.js & Express.js — Backend Development

### Express.js Setup:
\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

// Middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
\`\`\`

### RESTful API Design:
| Method | Route | Action |
|--------|-------|--------|
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get one user |
| POST | /api/users | Create user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

### JWT Authentication:
\`\`\`javascript
// Generate token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
\`\`\`

> 💡 **Best Practices:** Use async/await, proper error handling, input validation, and helmet for security.`;
  }

  // Default intelligent response
  const topic = message.length > 50 ? message.substring(0, 50) + '...' : message;
  return `## 🤖 EduConnect AI Study Assistant

I understand you're asking about: **"${topic}"**

Here's what I can help you with:

### 📚 Study Topics I Excel At:
- **DBMS** — Normalization, ER Diagrams, SQL, Transactions
- **DSA** — Arrays, Trees, Graphs, Sorting, DP
- **React.js** — Hooks, Context, Performance, Patterns
- **Node.js** — Express, APIs, Authentication, MongoDB
- **Python** — OOP, Algorithms, Libraries
- **OS** — Scheduling, Memory, Deadlock, Synchronization
- **CN** — OSI Model, TCP/IP, Protocols, Routing

### 💡 Try These Prompts:
- "Explain DBMS normalization with examples"
- "Explain all React hooks with code"
- "Create a DSA study plan for interviews"
- "Explain OS scheduling algorithms"
- "What is the difference between TCP and UDP?"
- "Generate a Python cheat sheet"

### 📖 Study Tips:
1. **Active Recall** — Test yourself instead of re-reading
2. **Spaced Repetition** — Review at increasing intervals
3. **Feynman Technique** — Explain concepts in simple terms
4. **Practice Daily** — Consistency beats intensity

*Ask me anything about your studies — I'm here to help you succeed! 🎓*`;
};

// @desc    AI Chat
// @route   POST /api/assistant/chat
// @access  Private
const chat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Update user AI query stats
    await require('../models/User').findByIdAndUpdate(
      req.user._id,
      { $inc: { 'stats.aiQueries': 1, 'stats.aiSessions': 1 } }
    );

    // Try OpenAI if key exists, else use mock
    let response;
    if (process.env.OPENAI_API_KEY) {
      try {
        // OpenAI integration placeholder
        response = getMockResponse(message);
      } catch {
        response = getMockResponse(message);
      }
    } else {
      // Simulate thinking delay
      await new Promise(resolve => setTimeout(resolve, 800));
      response = getMockResponse(message);
    }

    // Save to AI History
    try {
      let history = sessionId ? await AIHistory.findById(sessionId) : null;

      if (!history) {
        history = new AIHistory({
          userId: req.user._id,
          sessionTitle: message.substring(0, 50),
          messages: [],
        });
      }

      history.messages.push({ role: 'user', content: message });
      history.messages.push({ role: 'assistant', content: response });
      history.updatedAt = Date.now();
      await history.save();

      res.json({ success: true, response, sessionId: history._id });
    } catch (dbError) {
      // If DB fails, still return response
      res.json({ success: true, response });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const AIHistory = require('../models/AIHistory');

// @desc    Get AI history
// @route   GET /api/assistant/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await AIHistory.find({ userId: req.user._id })
      .select('sessionTitle createdAt messages')
      .sort('-updatedAt')
      .limit(20);

    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { chat, getHistory };
