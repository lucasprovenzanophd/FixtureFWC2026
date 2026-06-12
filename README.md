# 🏆 Fixture FWC 2026

An interactive, mobile-responsive fixture and standings tracker for the FIFA World Cup 2026™. Designed with modern web technologies, glassmorphism UI, and optimized for performance on any device.

## ✨ Features

- **Interactive Group Stage**: Enter match scores and watch the group standings calculate automatically in real-time.
- **Dynamic Knockout Bracket**: The bracket unlocks sequentially. As group stage matches finish, teams automatically advance to the Round of 32, complete with third-place qualifier logic!
- **Dual Themes**: Switch seamlessly between a gorgeous Midnight Navy (Dark) and a clean Sky Blue (Light) theme.
- **Bilingual Interface**: Support for both English and Spanish (ES/EN) out of the box.
- **Local Storage Persistence**: Close the browser, refresh the page—your scores and theme preferences are saved locally on your device.
- **Mobile First**: Built with responsive grids and large touch targets designed specifically for mobile use, including numeric keypad support on smartphones.

## 🛠 Tech Stack

This project is built purely with vanilla web technologies to remain lightweight and blazingly fast:
- **HTML5**: Semantic markup with SVG icons.
- **CSS3**: CSS Custom Properties (Variables) for theming, Flexbox/Grid for layout, and advanced backdrop-filters for the glassmorphism effect.
- **Vanilla JavaScript (ES6)**: Event delegation, local storage state management, and real-time standings calculations.

## 🚀 How to Run Locally

You don't need any complex build tools to run this application!

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lucasprovenzanophd/FixtureFWC2026.git
   cd FixtureFWC2026
   ```

2. **Open the project**:
   - Simply double-click `index.html` to open it in your browser.
   - Alternatively, you can serve it via any local HTTP server (e.g., using python, live server, or the one you are running on port 5173). Be aware of the port you're using to avoid conflicts.

### Testing Tip (Mock Data)
Want to skip typing in 72 group stage matches to test the knockout bracket? 
Append `?mock=true` to the URL.
- Example: `http://localhost:5173/?mock=true` (adjust the port to your local server)
This will instantly populate all group matches with a generic 2-1 score and unlock the Round of 32.

## 📂 Project Structure

- `index.html`: The main markup file, including the SVG icons and skeleton layout.
- `style.css`: The styling engine, containing all responsive logic, light/dark mode variables, and animations.
- `app.js`: The application logic handling DOM manipulation, score validation, state caching, and the knockout advancement algorithm.
- `data.js`: The central data store containing the 12 groups, match schedules, knockout formats, and flag emoji codes.

## 📝 License
This project is open-source. Feel free to fork, modify, and share!