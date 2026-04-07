<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span v-for="(letter, idx) in 'OPEN Maths'" :key="idx" class="letter">
              {{ letter }}
            </span>
          </h1>
          <p class="hero-subtitle">
            An A-level project dedicated to integrating machine learning into the everyday learning of mathematics
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="cta-section">
          <router-link to="/learn" class="cta-button primary-btn">
            Click here to begin!
          </router-link>
          <router-link to="/methodology" class="cta-button primary-btn">
            Click here to learn how this project works
          </router-link>
        </div>

        <!-- GitHub Link -->
        <a
          href="https://github.com/Jakub-Pelipe/OPEN-MATHS"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          aria-label="Visit GitHub repository"
        >
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="features-container">
        <h2>What's Inside</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.id" class="feature-card">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-final">
      <div class="cta-content">
        <h2>Ready to explore?</h2>
        <p>Start learning with AI-powered mathematics tools</p>
        <router-link to="/learn" class="primary-btn">
          Get Started Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    title: 'AI-Powered Learning',
    description: 'Machine learning algorithms personalize your learning experience'
  },
  {
    id: 2,
    title: 'Interactive Exercises',
    description: 'Engage with dynamic problems that adapt to your skill level'
  },
  {
    id: 3,
    title: 'Progress Tracking',
    description: 'Monitor your improvements with detailed analytics and insights'
  },
  {
    id: 4,
    title: 'Expert Content',
    description: 'Curated A-level mathematics curriculum from industry experts'
  }
]
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: radial-gradient(circle at center, #580707, #000000);
  overflow: hidden;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 900px;
  z-index: 1;
}

.hero-text {
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease-out;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-family: "Inter", sans-serif;
}

.letter {
  display: inline-block;
  transition: transform 0.2s ease, font-weight 0.2s ease;
}

.letter:hover {
  transform: translateY(-5px);
  animation: bounce 0.6s ease;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(238, 238, 238, 0.85);
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Inter", sans-serif;
}

.cta-section {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0 4rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.primary-btn {
  display: inline-block;
  padding: 15px 30px;
  font-size: 1.2em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  background-color: rgb(102, 112, 204);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  text-align: center;
  min-width: 220px;
  border: none;
}

.primary-btn:hover {
  background: rgb(73, 83, 171);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(-4px);
}

.cta-button {
  display: inline-block;
}

.github-link {
  display: inline-block;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  transition: transform 0.3s ease, filter 0.3s ease;
  animation: fadeIn 1s ease-out 0.5s both;
  color: rgba(238, 238, 238, 0.8);
}

.github-link:hover {
  transform: scale(1.15) rotate(5deg);
  filter: brightness(1.2);
  color: #ffffff;
}

.github-icon {
  width: 50px;
  height: 50px;
  opacity: 0.8;
}

.features {
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: "Inter", sans-serif;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(102, 112, 204, 0.08);
  border: 1px solid rgba(102, 112, 204, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(102, 112, 204, 0.15);
  border-color: rgba(102, 112, 204, 0.4);
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-family: "Inter", sans-serif;
}

.feature-card p {
  color: rgba(238, 238, 238, 0.75);
  line-height: 1.6;
  margin: 0;
  font-family: "Inter", sans-serif;
}

.cta-final {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(88, 7, 7, 0.2) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out;
}

.cta-final h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: "Inter", sans-serif;
}

.cta-final p {
  font-size: 1.1rem;
  color: rgba(238, 238, 238, 0.8);
  margin-bottom: 2rem;
  font-family: "Inter", sans-serif;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 3rem 1.5rem;
  }

  .cta-section {
    flex-direction: column;
    margin: 1.5rem 0;
  }

  .primary-btn {
    width: 100%;
  }

  .github-link {
    bottom: 1rem;
    left: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>