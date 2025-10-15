# Photo Gallery App - Lorem Picsum

A modern, responsive React application that displays photos from the Lorem Picsum API with infinite scroll and detailed photo views.

## Features

✅ **API Integration** - Fetches photos from Lorem Picsum API with proper error handling  
✅ **Responsive Grid Layout** - Beautiful photo grid that adapts to all screen sizes  
✅ **Infinite Scroll** - Automatically loads more photos as you scroll  
✅ **Photo Details View** - Click any photo to see full-size image and details  
✅ **React Router Navigation** - Clean URLs for list (/photos) and detail views (/photos/:id)  
✅ **Tailwind CSS Styling** - Modern, professional design with smooth animations  
✅ **Loading States** - Clear loading indicators during data fetch  
✅ **Error Handling** - Graceful error messages for API failures  

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lorem Picsum API** - Free photo placeholder service

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
Tuan_2/
├── src/
│   ├── components/
│   │   ├── PhotoList.jsx      # Grid view with infinite scroll
│   │   └── PhotoDetail.jsx    # Detailed photo view
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx               # App entry point
│   └── styles.css             # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Key Features Explained

### 1. Infinite Scroll Implementation
- Uses Intersection Observer API for efficient scroll detection
- Automatically fetches next page when user reaches the bottom
- Shows loading indicator during fetch
- Handles end-of-list scenario

### 2. Photo List Component
- Displays photos in responsive grid (1-4 columns based on screen size)
- Shows author name and image dimensions
- Hover effects for better UX
- Lazy loading for images

### 3. Photo Detail Component
- Full-size image display
- Photo metadata (ID, dimensions, author)
- Generated title and description
- Download functionality
- Back navigation

### 4. Routing
- `/photos` - Photo grid with infinite scroll
- `/photos/:id` - Detailed view of specific photo
- `/` - Redirects to `/photos`

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy
5. Your app will be live at `your-app.vercel.app`

### Option 2: Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Or connect your GitHub repo for automatic deployments

### Option 3: GitHub Pages
1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Update `vite.config.js` with base path:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/'
   })
   ```
4. Run: `npm run deploy`

### Option 4: Render
1. Go to [render.com](https://render.com)
2. Create new Static Site
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## API Information

**Lorem Picsum API Endpoints:**
- List photos: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- Photo details: `https://picsum.photos/id/{id}/info`
- Image URL: `https://picsum.photos/id/{id}/{width}/{height}`

## Code Quality Features

- ✅ Well-organized components with clear responsibilities
- ✅ Comprehensive comments explaining functionality
- ✅ React best practices (hooks, useEffect cleanup, useCallback)
- ✅ Reusable and maintainable code structure
- ✅ Error boundaries and loading states
- ✅ Accessible HTML semantic structure
- ✅ Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

---

**Developed with ❤️ using React + Vite + Tailwind CSS**
