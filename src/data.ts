// EDIT THIS FILE to update site content. Every section reads from here.

export const profile = {
  name: 'Katharine Ringo',
  role: 'Computer Science Student',
  year: 'Junior',
  school: 'Florida Gulf Coast University',
  tagline: 'I build curious, friendly software — and I take my debugging advice from cats.',
  about: [
    "I'm a junior studying Computer Science at Florida Gulf Coast University.",
    // EDIT: replace with your real interests and goals
    "I'm interested in web development, interactive graphics, and building tools people enjoy using. I'm currently looking for internships and research opportunities.",
  ],
  // EDIT: your public contact email
  email: 'you@example.com',
  links: {
    github: 'https://github.com/KatharineRingo',
    linkedin: '', // EDIT: e.g. https://www.linkedin.com/in/your-handle
  },
  // EDIT: drop a photo in /public (e.g. public/photo.jpg) and set '/photo.jpg'
  photo: '',
}

export const skills = [
  'TypeScript', 'JavaScript', 'React', 'Three.js', 'Python', 'Java', 'HTML', 'CSS', 'Git', 'Vitest', 'Playwright',
]

export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
}

// EDIT: add, remove, or reorder projects
export const projects: Project[] = [
  {
    title: 'Cat-Themed Portfolio',
    description:
      'This site. A React + Vite single-page app with an interactive Three.js cat, light/dark themes, and full unit + end-to-end tests.',
    tags: ['React', 'TypeScript', 'Three.js'],
    link: 'https://github.com/KatharineRingo/KatharineRingo.github.io',
  },
  {
    title: 'Project Name',
    description: 'A short description of what it does and what you worked on.',
    tags: ['Python'],
  },
  {
    title: 'Project Name',
    description: 'A short description of what it does and what you worked on.',
    tags: ['Java'],
  },
]

export type Experience = {
  title: string
  org: string
  dates: string
  description: string
}

// EDIT: jobs, internships, research, clubs
export const experience: Experience[] = [
  {
    title: 'Member',
    org: 'INIT FGCU',
    dates: '2026 – Present',
    description: 'Attend technical workshops and events focused on building projects and growing in tech.',
  },
]
