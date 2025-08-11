# My Internship Blog

A minimal, modern, single-page blog ready for static hosting. Built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

## ✨ Features

- **Modern Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- **State Management**: Zustand for lightweight state management
- **Responsive Design**: Auto-adjusting grid that works on any screen size
- **Dark Mode**: Toggle between light and dark themes
- **Search & Filtering**: Search posts by content and filter by tags
- **Modal Posts**: Click any post to view full content in a modal
- **Static Ready**: Builds to static files for deployment anywhere

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   cd internship-blog
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   npm run preview  # Test the production build
   ```

## 📁 Project Structure

```
internship-blog/
├── public/
│   └── photos/          # Blog post cover images
├── src/
│   ├── components/      # React components
│   │   ├── Filters.tsx      # Search and tag filtering
│   │   ├── PostCard.tsx     # Individual post display
│   │   └── ThemeToggle.tsx  # Dark/light mode toggle
│   ├── data/
│   │   └── posts.ts         # Blog post data
│   ├── stores/
│   │   └── useBlogStore.ts  # Zustand state management
│   ├── types.ts             # TypeScript type definitions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Customization

### Adding New Posts

Edit `src/data/posts.ts` to add new blog posts:

```typescript
{
  id: 'unique-id',
  title: 'Your Post Title',
  date: '2025-01-15', // YYYY-MM-DD format
  tags: ['tag1', 'tag2'],
  cover: '/photos/your-image.jpg',
  excerpt: 'Brief description of the post',
  body: [
    'First paragraph of your post content.',
    'Second paragraph with more details.'
  ]
}
```

### Adding Cover Images

1. Place your images in `public/photos/`
2. Reference them in your post data as `/photos/filename.jpg`
3. Supported formats: JPG, PNG, SVG, WebP

### Styling

The app uses Tailwind CSS with a custom stone color palette. Modify `src/index.css` to change:
- Color scheme variables
- Global styles
- Custom CSS

## 🛠️ Tech Stack Details

- **React 18**: Latest React with concurrent features
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful, consistent icons
- **PostCSS**: CSS processing with Tailwind

## 📱 Responsive Design

The blog automatically adapts to different screen sizes:
- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Three column grid
- **Large screens**: Centered with max-width

## 🌙 Dark Mode

- Toggle between light and dark themes
- Theme preference persists across sessions
- Smooth transitions between themes
- Uses CSS custom properties for consistent theming

## 🚀 Deployment

This app builds to static files that can be deployed anywhere:

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy with Vercel CLI or GitHub integration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (if configured)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using modern web technologies. Perfect for documenting your internship journey or any other blog needs.
