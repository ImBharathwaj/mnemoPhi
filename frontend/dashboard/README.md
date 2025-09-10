# MnemoPhi Dashboard

A modern, responsive business dashboard for the MnemoPhi data protection compliance platform. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## 🚀 Features

### Core Functionality
- **User Management**: Complete user lifecycle management with detailed profiles
- **Analytics Dashboard**: Comprehensive analytics with trends, geographic distribution, and compliance metrics
- **Consent Management**: Track and manage user consent across different categories
- **Reporting System**: Generate and export compliance reports
- **System Configuration**: Manage API keys, settings, and system preferences

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Code splitting, lazy loading, and vendor chunking
- **Type Safety**: Full TypeScript implementation
- **Testing**: Unit, integration, and E2E testing with Jest and Playwright
- **Accessibility**: WCAG 2.1 AA compliant components
- **Security**: JWT authentication, protected routes, and security best practices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React icons
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library, Playwright
- **Build Tools**: Vite, Terser
- **Linting**: ESLint, Prettier

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/mnemophi.git
cd mnemophi/frontend/dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## 🏗️ Build & Deployment

### Development Build
```bash
npm run build
```

### Production Build
```bash
# Set production environment variables
export VITE_API_BASE_URL=https://api.mnemophi.com
export VITE_APP_ENV=production

# Build for production
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccessibleButton.tsx
│   ├── AccessibleFormField.tsx
│   ├── DashboardLayout.tsx
│   ├── LoadingSpinner.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── AdvancedAnalyticsPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── SettingsPage.tsx
│   ├── SystemConfigPage.tsx
│   ├── UserDetailPage.tsx
│   └── UsersPage.tsx
├── utils/              # Utility functions
│   └── accessibility.ts
├── lib/                # Library configurations
├── hooks/              # Custom React hooks
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Application Environment
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=true
```

### Vite Configuration
The project uses Vite with optimized build configuration:
- Code splitting with manual chunks
- Terser minification
- Tree shaking
- Asset optimization

## 🎨 Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configuration:
- Custom color palette
- Responsive design utilities
- Component-based styling
- Dark mode support

### Component Styling
```tsx
// Example component with Tailwind classes
<div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
</div>
```

## 🔐 Security

### Authentication
- JWT token-based authentication
- Secure token storage
- Automatic token refresh
- Protected route implementation

### Security Features
- XSS protection
- CSRF protection
- Content Security Policy
- Secure HTTP headers
- Input validation and sanitization

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Lazy-loaded routes and components
- **Vendor Chunking**: Separate chunks for dependencies
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser optimization
- **Asset Optimization**: Compressed images and fonts

### Performance Metrics
- **Initial Bundle**: ~14KB (3.85KB gzipped)
- **Vendor Chunks**: Optimized dependency loading
- **Lazy Loading**: On-demand component loading
- **Caching**: Efficient browser caching strategy

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Touch-friendly interface
- Responsive navigation
- Optimized forms
- Mobile-specific interactions

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

### Accessibility Features
- Accessible form components
- Screen reader announcements
- Keyboard shortcuts
- High contrast mode support
- Reduced motion preferences

## 🔄 State Management

### Zustand Stores
- **Auth Store**: User authentication state
- **Analytics Store**: Analytics data management
- **UI Store**: UI state management
- **Consent Store**: Consent management state

### Store Usage
```tsx
import { useAuthStore } from '@mnemophi/shared'

function MyComponent() {
  const { user, isAuthenticated, login } = useAuthStore()
  
  return (
    <div>
      {isAuthenticated ? `Welcome ${user?.name}` : 'Please login'}
    </div>
  )
}
```

## 📊 Analytics

### Analytics Features
- Consent trend analysis
- Geographic distribution
- Compliance metrics
- User engagement tracking
- Report generation
- Predictive analytics

### Data Visualization
- Interactive charts
- Real-time updates
- Export capabilities
- Custom date ranges
- Filtering and sorting

## 🧪 Testing Strategy

### Test Types
1. **Unit Tests**: Component and utility testing
2. **Integration Tests**: API and state management testing
3. **E2E Tests**: Complete user journey testing
4. **Accessibility Tests**: WCAG compliance testing

### Test Coverage
- Component rendering
- User interactions
- API integrations
- Authentication flows
- Error handling
- Performance metrics

## 🚀 Deployment

### Deployment Options
- **Static Hosting**: Vercel, Netlify, AWS S3
- **Traditional Servers**: Nginx, Apache
- **CDN**: CloudFront, Cloudflare

### CI/CD Pipeline
- Automated testing
- Build optimization
- Security scanning
- Performance monitoring

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Run the test suite
6. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits
- Test coverage requirements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](../docs/API_Endpoints.md)
- [Security Guide](./SECURITY.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Testing Guide](./TESTING.md)

### Contact
- **Issues**: [GitHub Issues](https://github.com/your-org/mnemophi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/mnemophi/discussions)
- **Email**: support@mnemophi.com

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app
- [ ] API documentation
- [ ] Webhook integrations

### Performance Improvements
- [ ] Service worker implementation
- [ ] Advanced caching strategies
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Core Web Vitals improvements

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Maintained By**: MnemoPhi Development Team