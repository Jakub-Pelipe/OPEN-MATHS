<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-container">
        <div class="header-brand">
          <h1 class="brand-title">OPEN Maths</h1>
          <p class="brand-subtitle">Integrating ML into Mathematics Learning</p>
        </div>
        <nav class="header-nav">
          <slot name="nav">
            <a href="/" class="nav-link">Home</a>
            <a href="/learn" class="nav-link">Learn</a>
            <a href="/methodology" class="nav-link">Methodology</a>
          </slot>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-content">
          <p class="footer-text">&copy; 2024 OPEN Maths. All rights reserved.</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <span class="footer-divider">•</span>
            <a href="#" class="footer-link">Terms</a>
            <span class="footer-divider">•</span>
            <a href="https://github.com/Jakub-Pelipe/OPEN-MATHS" class="footer-link">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout component - no state needed
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: radial-gradient(circle at center, #580707, #000000);
  color: #eee;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Header */
.app-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(238, 238, 238, 0.1);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-brand {
  flex: 1;
}

.brand-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #ffffff, #a0aec0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0.25rem 0 0;
  opacity: 0.9;
}

/* Navigation */
.header-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #eee;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: rgb(102, 112, 204);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(102, 112, 204);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Main Content */
.app-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
}

/* Footer */
.app-footer {
  margin-top: auto;
  padding: 2rem 0;
  border-top: 1px solid rgba(238, 238, 238, 0.1);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-link {
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: rgb(102, 112, 204);
}

.footer-divider {
  color: rgba(238, 238, 238, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-nav {
    width: 100%;
    gap: 1rem;
  }

  .brand-title {
    font-size: 1.5rem;
  }

  .brand-subtitle {
    font-size: 0.8rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .app-main {
    padding: 1.5rem 1rem;
  }

  .app-footer {
    padding: 1.5rem 0;
  }

  .footer-container {
    padding: 0 1rem;
  }

  .footer-content {
    gap: 0.75rem;
  }

  .footer-text {
    font-size: 0.8rem;
  }

  .footer-links {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .brand-title {
    font-size: 1.25rem;
  }

  .header-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .app-main {
    padding: 1rem;
  }
}
</style>