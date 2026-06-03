import { Icons } from '@/components/icons/icons'
import type { ExperienceItemType } from '@/types/experience'

export const experiences: ExperienceItemType[] = [
  {
    id: 'crm-chat-services',
    companyName: 'CRM Chat Services',
    companyWebsite: 'https://github.com/Hungbasil/crm-chat-services',
    positions: [
      {
        id: '1',
        title: 'Full Stack Developer',
        employmentPeriod: { start: '2026' },
        employmentType: 'Personal Project',
        icon: <Icons.codeXml />,
        description:
          'Hệ thống quản lý quan hệ khách hàng (CRM) tích hợp tính năng nhắn tin thời gian thực. Hệ thống tích hợp WebSocket cho tin nhắn instant, multi-user support với role-based access, và lưu trữ hội thoại persistent.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Real-time'],
        isExpanded: true,
      },
    ],
  },
  {
    id: 'high-concurrency-ticket-booking',
    companyName: 'High Concurrency Ticket Booking',
    companyWebsite:
      'https://github.com/Hungbasil/High-Concurrency-Ticket-Booking',
    positions: [
      {
        id: '1',
        title: 'Full Stack Developer',
        employmentPeriod: { start: '2026' },
        employmentType: 'Personal Project',
        icon: <Icons.codeXml />,
        description:
          'Hệ thống đặt vé tiên tiến xử lý lưu lượng truy cập khổng lồ. Giải quyết các thách thức như anti double-booking, multi-timezone support, real-time updates, data consistency, và auto-scaling.',
        skills: [
          'Node.js',
          'PostgreSQL',
          'Redis',
          'WebSocket',
          'Distributed Systems',
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: 'learning-web',
    companyName: 'Learning Web',
    companyWebsite: 'https://github.com/Hungbasil/Learning-Web',
    positions: [
      {
        id: '1',
        title: 'Full Stack Developer',
        employmentPeriod: { start: '2026' },
        employmentType: 'Personal Project',
        icon: <Icons.codeXml />,
        description:
          'Nền tảng học tập trực tuyến toàn diện cung cấp công cụ quản lý khóa học, theo dõi tiến độ học viên, tích hợp lưu trữ đám mây, multi-role system, analytics dashboard, và automatic certificate generation.',
        skills: ['Node.js', 'Java', 'PostgreSQL', 'Docker', 'Spring Boot'],
        isExpanded: true,
      },
    ],
  },
]
