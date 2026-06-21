require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('../models/Resource');
const Video = require('../models/Video');

const resources = [
  {
    title: 'Complete DSA Notes — Arrays, Trees, Graphs',
    description: 'Comprehensive Data Structures & Algorithms notes covering all major topics with examples, complexity analysis, and practice problems. Perfect for placement interviews.',
    category: 'DSA',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example1',
    previewUrl: '',
    downloadCount: 1247,
    tags: ['DSA', 'Arrays', 'Trees', 'Graphs', 'Interview Prep'],
    isPublic: true,
  },
  {
    title: 'React.js Complete Guide — Hooks, Context, Router',
    description: 'Master React.js from basics to advanced patterns. Covers useState, useEffect, useContext, custom hooks, React Router v6, performance optimization, and real-world projects.',
    category: 'React',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example2',
    downloadCount: 2389,
    tags: ['React', 'Hooks', 'Context API', 'React Router', 'Frontend'],
    isPublic: true,
  },
  {
    title: 'DBMS Notes — Normalization, SQL, Transactions',
    description: 'Database Management Systems complete notes. Covers ER diagrams, normalization (1NF to BCNF), SQL queries, transactions, ACID properties, and indexing.',
    category: 'DBMS',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example3',
    downloadCount: 1876,
    tags: ['DBMS', 'SQL', 'Normalization', 'Transactions', 'Database'],
    isPublic: true,
  },
  {
    title: 'Python Programming — Complete Beginner to Advanced',
    description: 'Learn Python from scratch. OOP, file handling, decorators, generators, lambda, list comprehensions, and popular libraries like NumPy, Pandas, and Matplotlib.',
    category: 'Python',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example4',
    downloadCount: 3124,
    tags: ['Python', 'OOP', 'Machine Learning', 'Data Science'],
    isPublic: true,
  },
  {
    title: 'Node.js & Express.js API Development Guide',
    description: 'Build production-ready REST APIs with Node.js and Express. Covers routing, middleware, JWT auth, MongoDB integration, error handling, and deployment.',
    category: 'Node.js',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example5',
    downloadCount: 1543,
    tags: ['Node.js', 'Express', 'REST API', 'JWT', 'Backend'],
    isPublic: true,
  },
  {
    title: 'MongoDB Complete Notes — Aggregation, Indexing',
    description: 'Master MongoDB NoSQL database. Covers CRUD operations, aggregation pipeline, indexing strategies, schema design, Mongoose ODM, and Atlas setup.',
    category: 'MongoDB',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example6',
    downloadCount: 987,
    tags: ['MongoDB', 'NoSQL', 'Mongoose', 'Database', 'Aggregation'],
    isPublic: true,
  },
  {
    title: 'Operating Systems — Scheduling, Memory, Deadlock',
    description: 'OS concepts for university exams and GATE. Covers process scheduling, memory management, virtual memory, deadlock, semaphores, and file systems.',
    category: 'OS',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example7',
    downloadCount: 2156,
    tags: ['OS', 'Scheduling', 'Memory Management', 'GATE', 'Deadlock'],
    isPublic: true,
  },
  {
    title: 'Computer Networks — OSI, TCP/IP, Protocols',
    description: 'Computer Networks for GATE and university exams. Covers OSI model, TCP/IP, HTTP, DNS, routing algorithms, subnetting, and network security basics.',
    category: 'CN',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example8',
    downloadCount: 1789,
    tags: ['Computer Networks', 'OSI', 'TCP/IP', 'Routing', 'GATE'],
    isPublic: true,
  },
  {
    title: 'Web Development Roadmap 2024 — Full Stack',
    description: 'Complete full-stack web development roadmap. HTML, CSS, JavaScript, React, Node.js, databases, deployment, and best practices for getting hired in 2024.',
    category: 'Web Development',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example9',
    downloadCount: 4521,
    tags: ['Web Dev', 'Full Stack', 'Roadmap', 'HTML', 'CSS', 'JavaScript'],
    isPublic: true,
  },
  {
    title: 'JavaScript ES6+ Cheat Sheet',
    description: 'Quick reference for modern JavaScript. Arrow functions, destructuring, spread/rest, promises, async/await, modules, classes, and ES2023 features.',
    category: 'Programming',
    type: 'notes',
    fileUrl: 'https://drive.google.com/file/d/example10',
    downloadCount: 5234,
    tags: ['JavaScript', 'ES6', 'Cheat Sheet', 'Frontend'],
    isPublic: true,
  },
  {
    title: 'System Design Interview — Scalability & Architecture',
    description: 'Ace system design interviews. Covers load balancing, caching, databases (SQL vs NoSQL), microservices, message queues, CDN, and real case studies (Netflix, Twitter, Uber).',
    category: 'Programming',
    type: 'pdf',
    fileUrl: 'https://drive.google.com/file/d/example11',
    downloadCount: 6789,
    tags: ['System Design', 'Architecture', 'Scalability', 'Interview'],
    isPublic: true,
  },
  {
    title: 'Tailwind CSS + React UI Components Library',
    description: 'Production-ready UI components built with Tailwind CSS and React. Includes navigation, forms, cards, modals, dashboards, and responsive layouts with source code.',
    category: 'React',
    type: 'link',
    fileUrl: 'https://github.com/example/ui-library',
    downloadCount: 2341,
    tags: ['Tailwind', 'React', 'UI Components', 'Frontend'],
    isPublic: true,
  },
];

const videos = [
  {
    title: 'Complete DSA Course — Data Structures & Algorithms',
    description: 'Master Data Structures and Algorithms from scratch. This comprehensive course covers arrays, linked lists, trees, graphs, sorting, and dynamic programming.',
    category: 'DSA',
    youtubeId: 'bum_19loj9A',
    duration: '8:30:00',
    instructor: 'Abdul Bari',
    views: 45678,
    trending: true,
    tags: ['DSA', 'Algorithms', 'Data Structures', 'Interview'],
  },
  {
    title: 'React JS Full Course 2024 — Beginner to Advanced',
    description: 'Complete React.js tutorial for 2024. Learn hooks, context API, React Router, state management, and build real-world projects.',
    category: 'React',
    youtubeId: 'SqcY0GlETPk',
    duration: '11:55:00',
    instructor: 'Dave Gray',
    views: 89234,
    trending: true,
    tags: ['React', 'Frontend', 'JavaScript', 'Web Dev'],
  },
  {
    title: 'Node.js & Express Full Course — REST API',
    description: 'Build REST APIs with Node.js, Express, and MongoDB. Learn authentication, middleware, error handling, and deployment to production.',
    category: 'Node.js',
    youtubeId: 'f2EqECiTBL8',
    duration: '8:00:00',
    instructor: 'Dave Gray',
    views: 67543,
    trending: true,
    tags: ['Node.js', 'Express', 'API', 'Backend'],
  },
  {
    title: 'Python Programming Full Course for Beginners',
    description: 'Learn Python from zero to hero. Variables, loops, functions, OOP, file handling, and popular libraries. Perfect for beginners.',
    category: 'Python',
    youtubeId: '_uQrJ0TkZlc',
    duration: '6:14:00',
    instructor: 'CS Dojo',
    views: 123456,
    trending: true,
    tags: ['Python', 'Beginner', 'Programming'],
  },
  {
    title: 'MongoDB Tutorial for Beginners — Full Course',
    description: 'Learn MongoDB from scratch. CRUD operations, aggregation, indexing, Mongoose with Node.js, and MongoDB Atlas setup.',
    category: 'MongoDB',
    youtubeId: 'ExcRbA7fy_A',
    duration: '3:24:00',
    instructor: 'Traversy Media',
    views: 34521,
    trending: false,
    tags: ['MongoDB', 'NoSQL', 'Database'],
  },
  {
    title: 'DBMS Complete Course — Gate Smashers',
    description: 'Database Management Systems complete video series. ER diagrams, relational algebra, normalization, SQL, transactions for university exams and GATE.',
    category: 'DBMS',
    youtubeId: 'eYpXCdvKwEQ',
    duration: '12:00:00',
    instructor: 'Gate Smashers',
    views: 56789,
    trending: false,
    tags: ['DBMS', 'SQL', 'GATE', 'University'],
  },
  {
    title: 'Operating Systems Full Course — Neso Academy',
    description: 'OS concepts for GATE and university. Processes, threads, scheduling, memory management, file systems, and I/O systems with solved problems.',
    category: 'OS',
    youtubeId: 'vBURTt97EkA',
    duration: '15:30:00',
    instructor: 'Neso Academy',
    views: 78932,
    trending: false,
    tags: ['OS', 'GATE', 'University', 'Processes'],
  },
  {
    title: 'Computer Networks Full Course — Neso Academy',
    description: 'Computer Networks from basics. OSI model, TCP/IP, application layer protocols, transport layer, network layer, and data link layer explained clearly.',
    category: 'CN',
    youtubeId: 'IPvYjXCsTg8',
    duration: '10:45:00',
    instructor: 'Neso Academy',
    views: 54321,
    trending: false,
    tags: ['Computer Networks', 'OSI', 'TCP/IP', 'GATE'],
  },
  {
    title: 'Web Development Full Course 2024 — Zero to Mastery',
    description: 'Complete web development bootcamp. HTML, CSS, JavaScript, React, Node.js, SQL, and deployment. Build 20+ real projects.',
    category: 'Web Development',
    youtubeId: 'ysEN5RaKOlA',
    duration: '40:00:00',
    instructor: 'Zero to Mastery',
    views: 234567,
    trending: true,
    tags: ['Web Dev', 'Full Stack', 'Bootcamp'],
  },
  {
    title: 'JavaScript Complete Course — Namaste JavaScript',
    description: 'Deep dive into JavaScript. Closures, event loop, prototypes, async/await, hoisting, and engine internals explained with beautiful visualizations.',
    category: 'Programming',
    youtubeId: 'pN6jk0uUrD8',
    duration: '6:00:00',
    instructor: 'Akshay Saini',
    views: 345678,
    trending: true,
    tags: ['JavaScript', 'Advanced', 'Closures', 'Event Loop'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Resource.deleteMany({});
    await Video.deleteMany({});

    await Resource.insertMany(resources);
    await Video.insertMany(videos);

    console.log('✅ Database seeded successfully!');
    console.log(`📚 ${resources.length} resources added`);
    console.log(`🎥 ${videos.length} videos added`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
