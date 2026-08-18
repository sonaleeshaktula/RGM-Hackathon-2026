import { TechCategory } from '../types';

export interface TechDomain {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  coreConcepts: string[];
  adjacentDomains: string[];
  keywords: string[];
}

export const TECH_ONTOLOGY_DOMAINS: Record<string, TechDomain> = {
  'domain_swe_arch': {
    id: 'domain_swe_arch',
    name: 'Software Engineering & Architecture',
    category: 'HLD',
    description: 'System design, microservices, clean architecture, design patterns, and enterprise software engineering.',
    coreConcepts: ['System Design', 'Microservices', 'Clean Architecture', 'API Gateways', 'Load Balancing', 'Caching', 'Database Scaling'],
    adjacentDomains: ['domain_cloud_devops', 'domain_dsa', 'domain_career_growth', 'domain_hardware_systems'],
    keywords: ['architecture', 'microservices', 'system design', 'scalability', 'backend', 'distributed systems', 'clean code', 'engineering']
  },
  'domain_dsa_algos': {
    id: 'domain_dsa_algos',
    name: 'Data Structures & Algorithms',
    category: 'DSA',
    description: 'Problem solving, algorithmic complexity, tree traversals, dynamic programming, and interview challenges.',
    coreConcepts: ['Binary Trees', 'Graph Algorithms', 'Dynamic Programming', 'Time Complexity (Big-O)', 'Sorting & Searching'],
    adjacentDomains: ['domain_swe_arch', 'domain_career_growth'],
    keywords: ['dsa', 'leetcode', 'binary tree', 'algorithms', 'time complexity', 'hashmap', 'recursion', 'interview coding']
  },
  'domain_career_growth': {
    id: 'domain_career_growth',
    name: 'Developer Career & Tech Ecosystem',
    category: 'Career',
    description: 'Professional engineering habits, interview navigation, tech compensation, engineering culture, and engineering growth.',
    coreConcepts: ['Engineering Culture', 'Code Review Practices', 'Senior Engineer Mindset', 'Technical Communication', 'Compensation & Leveling'],
    adjacentDomains: ['domain_swe_arch', 'domain_dsa_algos'],
    keywords: ['faang', 'software engineer', 'tech career', 'day in the life', 'salary', 'junior to senior', 'developer lifestyle', 'coding interview']
  },
  'domain_hardware_systems': {
    id: 'domain_hardware_systems',
    name: 'Hardware, Tooling & Systems Performance',
    category: 'Hardware',
    description: 'Development workstations, CPU architecture, virtualization, terminal setups, memory management, and Linux tooling.',
    coreConcepts: ['Workstation Tooling', 'Virtualization & Docker', 'Memory Hierarchy', 'Terminal Productivity', 'Apple Silicon vs x86'],
    adjacentDomains: ['domain_swe_arch', 'domain_cloud_devops', 'domain_cybersecurity'],
    keywords: ['laptop', 'macbook', 'thinkpad', 'specs', 'ram', 'docker performance', 'linux', 'developer workstation', 'cpu benchmark']
  },
  'domain_ai_ml': {
    id: 'domain_ai_ml',
    name: 'Artificial Intelligence & Machine Learning',
    category: 'AI',
    description: 'Deep learning foundations, transformer architectures, neural networks, LLM agents, and math foundations.',
    coreConcepts: ['Attention Mechanism', 'Transformer Architecture', 'Backpropagation', 'Vector Databases', 'Model Inference'],
    adjacentDomains: ['domain_swe_arch', 'domain_dsa_algos'],
    keywords: ['transformers', 'neural network', 'llm', 'machine learning', 'deep learning', 'embeddings', 'ai engineering']
  },
  'domain_cloud_devops': {
    id: 'domain_cloud_devops',
    name: 'Cloud Infrastructure & DevOps',
    category: 'Cloud',
    description: 'Containerization, Kubernetes, CI/CD pipelines, AWS/GCP architecture, and infrastructure as code.',
    coreConcepts: ['Docker Containers', 'Kubernetes Clusters', 'CI/CD Pipelines', 'Infrastructure as Code', 'Serverless'],
    adjacentDomains: ['domain_swe_arch', 'domain_hardware_systems'],
    keywords: ['docker', 'kubernetes', 'aws', 'cloud', 'ci/cd', 'devops', 'terraform', 'containers']
  },
  'domain_cybersecurity': {
    id: 'domain_cybersecurity',
    name: 'Cybersecurity & Application Security',
    category: 'Cybersecurity',
    description: 'Vulnerability assessment, network defense, authentication security, cryptography, and secure coding.',
    coreConcepts: ['Authentication (OAuth/JWT)', 'SQL Injection & XSS', 'Public Key Cryptography', 'Zero Trust Architecture'],
    adjacentDomains: ['domain_swe_arch', 'domain_cloud_devops'],
    keywords: ['security', 'oauth', 'jwt', 'penetration testing', 'cryptography', 'cybersecurity', 'vulnerability']
  },
  'domain_java_jvm': {
    id: 'domain_java_jvm',
    name: 'Java & JVM Internals',
    category: 'Java',
    description: 'JVM garbage collection, multithreading, Spring Boot framework, and memory models.',
    coreConcepts: ['JVM Memory Model', 'Garbage Collection', 'Spring Boot Architecture', 'Concurrency & Virtual Threads'],
    adjacentDomains: ['domain_swe_arch', 'domain_dsa_algos'],
    keywords: ['java', 'jvm', 'spring boot', 'nullpointerexception', 'concurrency', 'virtual threads', 'garbage collector']
  }
};

export const HYPE_PATTERNS = [
  /\b(get hired in 24 hours|get a job overnight|no coding required|earn \$?200k in 1 month)\b/i,
  /\b(secret ai tools that will make you rich|replace all developers|make \$10000 with chatgpt)\b/i,
  /\b(guaranteed tech job|cheat code to faang|become senior in 7 days)\b/i,
  /\b(10 ai tools that will get you a job|secret prompt nobody tells you)\b/i,
];

export const SENSATIONALIST_INDICATORS = [
  'Sensationalist timeline claims ("Get hired in 24h")',
  'Unsubstantiated salary/wealth guarantees',
  'Zero technical substance / surface-level tool listing',
  'Promotes clickbait shortcuts over foundational engineering principles',
  'Misleading claims of replacing foundational software engineering skill'
];
