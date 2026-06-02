import { baseUrl } from '@/constants'
import { socials } from '@/constants/navigation'
import { description, owner, title } from '@/constants/site'
import { url } from '@/lib/url'

export function getAboutText() {
  return `# About 
Route: ${url('/about')}

${description}

## Overview

I'm Hưng (Hungbasil), a full-stack developer and student at Đại học Nguyễn Tất Thành passionate about building scalable solutions and solving complex system design problems.

## Background

Xin chào, I'm Hưng, a software developer who loves crafting solutions from robust backend systems to smooth user experiences. Currently studying Software Development at Nguyễn Tất Thành University in Ho Chi Minh City, I spend most of my time exploring and mastering full-stack technologies.

My journey started with curiosity about how systems work, and it's evolved into a passion for solving real-world problems through code. From architecting complex databases on PostgreSQL to optimizing APIs with Spring Boot and Node.js, to handling high-concurrency scenarios—each project has been a learning opportunity. I particularly enjoy tackling difficult problems like building ticket booking systems that handle thousands of concurrent users without breaking a sweat.

Beyond coding, I love gaming and have a special interest in watches. In my free time, I'm either exploring new technologies or relaxing with video games.

## What Drives Me

I'm driven by the challenge of building systems that work at scale. Whether it's preventing double-booking in a high-traffic system, optimizing database queries for millisecond response times, or designing microservices that can handle millions of requests—there's a thrill in seeing complex systems work flawlessly. The entire development journey fascinates me: from system design and architecture, through API optimization, to successful feature integration on GitHub.

## Goals & Vision

My long-term vision is to become a versatile software engineer capable of architecting and operating large-scale systems that serve thousands of users reliably. I believe software exists to optimize human life. Therefore, every line of code, every deployed container, and every database query must contribute to creating finished products of high practical value.

I'm committed to continuously diving deeper into modern software architecture, staying updated with emerging technologies, and maintaining the balance between creative innovation in the digital world and purposeful action in the real world.

## Personal Information

- Name: ${owner}
- Display Name: ${title}
- Website: ${baseUrl.toString()}
- Location: TP.HCM, Vietnam
- Resume: ${url('/resume.pdf')}

## Social Links

${socials.map((item) => `- [${item.name}](${item.url})${item.description ? ` - ${item.description}` : ''}`).join('\n')}
`
}
