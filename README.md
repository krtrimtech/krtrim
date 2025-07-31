<div align="center">
  <img src="public/images/logo.png" alt="KRTRIM Logo" width="100" height="100">
  
  # KRTRIM
  
  **Unleash AI. Accelerate Growth.**
  
  [![Deploy Status](https://github.com/krtrimtech/krtrim/workflows/Deploy%20to%20Google%20Cloud%20Storage/badge.svg)](https://github.com/krtrimtech/krtrim/actions)
  [![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-orange)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev/)
</div>

---

## 🚀 About KRTRIM

KRTRIM is a cutting-edge AI solutions company that helps businesses accelerate growth through intelligent automation. We specialize in building **AI Chatbots**, **Voice Agents**, and **Full-Stack SaaS Applications** that deliver measurable ROI.

### 🎯 Our Mission
Transform businesses with AI-powered solutions that increase efficiency, reduce costs, and enhance customer experience.

### 📊 Proven Results
- **300% ROI** in the first quarter
- **85% increase** in customer satisfaction  
- **90% automation** of customer inquiries

---

## 🤖 Our Services

### 🔥 Alpha Team - AI Chatbot Specialists
- **Smart Automation**: Handle 90% of customer inquiries automatically
- **Natural Conversations**: Advanced NLP for human-like interactions
- **24/7 Support**: Never miss a customer query
- **Easy Integration**: Seamless setup with existing systems
- **Analytics Dashboard**: Track performance and optimize responses

### 🎤 Meta Team - Voice AI Specialists  
- **Voice Assistants**: Natural speech recognition and response
- **Appointment Booking**: Automated scheduling with human-like conversations
- **Call Center Automation**: Reduce call handling time by 70%
- **Multi-language Support**: Serve customers in their preferred language
- **Real-time Analytics**: Monitor call performance and satisfaction

### 💻 Sigma Team - Full-Stack SaaS Specialists
- **Full-Stack Development**: Frontend, backend, and database design
- **AI Integration**: Embed smart features throughout your platform
- **Scalable Architecture**: Built to grow with your business
- **Modern Tech Stack**: React, Node.js, PostgreSQL, and more
- **DevOps & Deployment**: Automated CI/CD and cloud infrastructure

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **shadcn/ui** - Re-usable components built on Radix UI
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant forms with easy validation

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **GitHub Actions** - Automated CI/CD pipeline
- **Google Cloud Storage** - Static hosting and CDN

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krtrimtech/krtrim.git
   cd krtrim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Type checking
npm run type-check
```

---

## 🎨 Features

### ✨ Interactive Landing Page
- **Hero Section** with animated gradient logo
- **Services Overview** with detailed team information
- **Client Testimonials** with 5-star ratings
- **FAQ Section** with common questions
- **Call-to-Action** with direct consultation booking

### 🤖 AI-Powered Chatbot (Kram)
- **Intelligent Responses** about services and teams
- **Team-Specific Information** for Alpha, Meta, and Sigma teams
- **Direct Booking Integration** with Cal.com
- **Dark/Light Mode Support** with proper contrast
- **Smooth Animations** and professional UI

### 🌙 Theme Support
- **Light/Dark Mode** toggle with system preference detection
- **Consistent Branding** across all themes
- **Accessible Colors** meeting WCAG standards
- **Smooth Transitions** between theme switches

### 📱 Responsive Design
- **Mobile-First** approach for all screen sizes
- **Touch-Friendly** interactions on mobile devices
- **Optimized Performance** on all platforms
- **Progressive Enhancement** for better UX

---

## 🚀 Deployment

### Automated Deployment (Recommended)

The project includes automated CI/CD pipeline for Google Cloud Platform:

1. **Setup GCP Environment**
   ```bash
   chmod +x setup-gcp.sh
   ./setup-gcp.sh
   ```

2. **Configure GitHub Secrets**
   - `GCP_PROJECT_ID`: Your Google Cloud project ID
   - `GCS_BUCKET_NAME`: Your storage bucket name
   - `GCP_SA_KEY`: Service account key JSON

3. **Deploy Automatically**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Google Cloud Storage
gsutil -m rsync -r -d dist/ gs://your-bucket-name

# Set cache headers
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" gs://your-bucket-name/**
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🤖 Chatbot Integration

The KRTRIM website features **Kram**, an intelligent AI assistant that helps visitors:

### Capabilities
- ✅ Learn about our services and teams
- ✅ Get pricing information
- ✅ Book consultations with specific teams
- ✅ Understand our development process
- ✅ Access company information

### Team-Specific Booking
- **Alpha Team**: AI Chatbot consultations
- **Meta Team**: Voice AI consultations  
- **Sigma Team**: Full-Stack SaaS consultations
- **General**: Free initial consultations

### Smart Responses
The chatbot recognizes natural language queries like:
- "What is Alpha Team?"
- "Book a meeting with Meta Team"
- "How much does it cost?"
- "Tell me about your services"

---

## 📁 Project Structure

```
krtrim/
├── public/                 # Static assets
│   ├── images/            # Logo and images
│   └── robots.txt         # SEO configuration
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── landing/      # Landing page sections
│   │   ├── workflow/     # Workflow diagram
│   │   └── Chatbot.tsx   # AI assistant component
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── utils/           # Helper utilities
├── .github/workflows/   # CI/CD pipeline
├── DEPLOYMENT.md       # Deployment guide
└── setup-gcp.sh       # GCP setup script
```

---

## 🎯 Performance

### Optimization Features
- **Code Splitting** - Lazy loading for better performance
- **Image Optimization** - Compressed assets for faster loading
- **Caching Strategy** - Optimized cache headers for static assets
- **Bundle Analysis** - Tree shaking and dead code elimination
- **CDN Integration** - Global content delivery network

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

---

## 🤝 Contributing

We welcome contributions to improve the KRTRIM website!

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for clear history

---

## 📞 Contact & Support

### 🚀 Ready to Transform Your Business?

**Book a Free Consultation:**
- 🤖 [Alpha Team - AI Chatbots](https://cal.com/krtrim/alpha-team)
- 🎤 [Meta Team - Voice AI](https://cal.com/krtrim/meta-team)  
- 💻 [Sigma Team - Full-Stack SaaS](https://cal.com/krtrim/sigma-team)
- 📅 [General Consultation](https://cal.com/krtrim/consultation)

### 📧 Get in Touch
- **Website**: [krtrim.com](https://krtrim.com)
- **Email**: hello@krtrim.com
- **LinkedIn**: [@krtrimtech](https://linkedin.com/company/krtrimtech)
- **GitHub**: [@krtrimtech](https://github.com/krtrimtech)

---

## 📄 License

This project is proprietary and confidential. All rights reserved by KRTRIM Technologies.

---

## 🙏 Acknowledgments

Built with ❤️ by the KRTRIM team using:
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Radix UI](https://radix-ui.com/) - Accessible components
- [Lucide](https://lucide.dev/) - Beautiful icons

---

<div align="center">
  <p><strong>Transform your business with AI today! 🚀</strong></p>
  
  [![Book Consultation](https://img.shields.io/badge/Book%20Free%20Consultation-orange?style=for-the-badge&logo=calendar)](https://cal.com/krtrim/consultation)
</div>