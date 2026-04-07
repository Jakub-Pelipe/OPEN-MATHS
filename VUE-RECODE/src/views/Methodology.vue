<template>
  <div class="methodology-page">
    <!-- Hero Section -->
    <section class="methodology-hero">
      <div class="hero-content">
        <h1>Our Methodology</h1>
        <p>How OPEN-MATHS integrates machine learning into mathematical education</p>
      </div>
    </section>

    <!-- Core Principles Section -->
    <section class="principles-section">
      <div class="principles-container">
        <h2>Core Principles</h2>
        <div class="principles-grid">
          <div v-for="principle in principles" :key="principle.id" class="principle-card">
            <div class="principle-icon">{{ principle.icon }}</div>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="how-it-works-container">
        <h2>How It Works</h2>
        <div class="steps-grid">
          <div v-for="(step, index) in steps" :key="index" class="step-card">
            <div class="step-number">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ML Integration Section -->
    <section class="ML-integration">
      <div class="ai-container">
        <h2>Machine Learning Integration</h2>
        <div class="ai-content">
          <div class="ai-text">
            <h3>Personalized Learning Paths</h3>
            <p>
              Our machine learning algorithms analyze student interactions, performance patterns, and learning styles
              to create personalized educational paths. Each student receives tailored recommendations based on their
              unique needs and progress.
            </p>
            <ul class="feature-list">
              <li>Adaptive difficulty adjustment</li>
              <li>Personalized exercise selection</li>
              <li>Predictive performance analytics</li>
              <li>Smart content recommendations</li>
            </ul>
          </div>
          <div class="ai-visual">
            <div class="ai-card">
              <div class="ai-badge">🤖 ML-Powered</div>
              <div class="ai-feature">
                <span class="ai-label">Personalization</span>
                <div class="ai-bar">
                  <div class="ai-fill" style="width: 95%;"></div>
                </div>
              </div>
              <div class="ai-feature">
                <span class="ai-label">Adaptability</span>
                <div class="ai-bar">
                  <div class="ai-fill" style="width: 88%;"></div>
                </div>
              </div>
              <div class="ai-feature">
                <span class="ai-label">Accuracy</span>
                <div class="ai-bar">
                  <div class="ai-fill" style="width: 92%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Outcomes Section -->
    <section class="outcomes-section">
      <div class="outcomes-container">
        <h2>Expected Learning Outcomes</h2>
        <div class="outcomes-grid">
          <div v-for="outcome in outcomes" :key="outcome.id" class="outcome-card">
            <div class="outcome-number">{{ outcome.percentage }}%</div>
            <h3>{{ outcome.title }}</h3>
            <p>{{ outcome.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="methodology-cta">
      <div class="cta-container">
        <h2>Ready to Experience ML-Powered Learning?</h2>
        <p>Join thousands of students using OPEN-MATHS to master mathematics</p>
        <div class="cta-buttons">
          <router-link to="/learn" class="btn-primary">Start Learning</router-link>
          <router-link to="/" class="btn-secondary">Back Home</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const principles = [
  {
    id: 1,
    icon: '🎯',
    title: 'Personalization',
    description: 'Every student learns at their own pace with content tailored to their abilities and goals'
  },
  {
    id: 2,
    icon: '📊',
    title: 'Data-Driven',
    description: 'Our algorithms use learning analytics to optimize educational outcomes for each student'
  },
  {
    id: 3,
    icon: '🔄',
    title: 'Continuous Improvement',
    description: 'The system continuously learns and adapts to provide better learning experiences'
  },
  {
    id: 4,
    icon: '💡',
    title: 'Interactive Learning',
    description: 'Engaging exercises and real-world applications help students understand mathematical concepts'
  }
]

const steps = [
  {
    title: 'Assessment',
    description: 'Initial assessment determines your current knowledge level and learning style'
  },
  {
    title: 'Personalization',
    description: 'Our machine learning algorithm creates a custom learning path based on your strengths and areas for improvement'
  },
  {
    title: 'Learning',
    description: 'Engage with interactive lessons, exercises, and real-world applications'
  },
  {
    title: 'Analysis',
    description: 'Machine learning analyzes your progress and adjusts difficulty and content'
  },
  {
    title: 'Feedback',
    description: 'Receive detailed insights and recommendations to accelerate your learning'
  },
  {
    title: 'Mastery',
    description: 'Achieve proficiency with machine learning-verified skill confirmation'
  }
]
// UPDATE FOR WHEN DATA ARE AVAILABLE
// const outcomes = [
//   {
//     id: 1,
//     percentage: 85,
//     title: 'Improved Performance',
//     description: 'Average improvement in test scores for students using our platform'
//   },
//   {
//     id: 2,
//     percentage: 70,
//     title: 'Time Efficiency',
//     description: 'Reduction in study time needed to achieve the same learning outcomes'
//   },
//   {
//     id: 3,
//     percentage: 92,
//     title: 'Student Satisfaction',
//     description: 'Students report higher engagement and understanding with machine learning-personalized learning'
//   },
//   {
//     id: 4,
//     percentage: 88,
//     title: 'Concept Retention',
//     description: 'Improved long-term retention of mathematical concepts and skills'
//   }
// ]
</script>

<style scoped>
.methodology-page {
  min-height: 100vh;
  background: radial-gradient(circle at center, #580707, #000000);
  color: #eee;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* Hero Section */
.methodology-hero {
  padding: 5rem 2rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(88, 7, 7, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInDown 0.8s ease-out;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.methodology-hero h1 {
  font-size: clamp(2rem, 7vw, 3.5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
}

.methodology-hero p {
  font-size: 1.2rem;
  color: rgba(238, 238, 238, 0.8);
  line-height: 1.6;
}

/* Principles Section */
.principles-section {
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.3);
}

.principles-container {
  max-width: 1200px;
  margin: 0 auto;
}

.principles-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.principle-card {
  background: rgba(102, 112, 204, 0.08);
  border: 1px solid rgba(102, 112, 204, 0.2);
  border-radius: 1.2rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.principle-card:hover {
  background: rgba(102, 112, 204, 0.15);
  border-color: rgba(102, 112, 204, 0.4);
  transform: translateY(-5px);
}

.principle-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.principle-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.principle-card p {
  color: rgba(238, 238, 238, 0.75);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* How It Works Section */
.how-it-works {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(88, 7, 7, 0.15) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
}

.how-it-works h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.step-card {
  background: rgba(102, 112, 204, 0.08);
  border: 1px solid rgba(102, 112, 204, 0.2);
  border-radius: 1.2rem;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.step-card:hover {
  background: rgba(102, 112, 204, 0.15);
  border-color: rgba(102, 112, 204, 0.4);
  transform: translateY(-5px);
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgb(102, 112, 204), rgb(73, 83, 171));
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.step-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.step-card p {
  color: rgba(238, 238, 238, 0.75);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* AI Integration Section */
.ai-integration {
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.ai-container {
  max-width: 1200px;
  margin: 0 auto;
}

.ai-integration h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ai-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.ai-text h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.ai-text p {
  color: rgba(238, 238, 238, 0.8);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  color: rgba(238, 238, 238, 0.75);
  position: relative;
  font-size: 0.95rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: rgb(102, 112, 204);
  font-weight: 700;
}

.ai-card {
  background: rgba(102, 112, 204, 0.1);
  border: 1px solid rgba(102, 112, 204, 0.3);
  border-radius: 1.2rem;
  padding: 2rem;
}

.ai-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(102, 112, 204, 0.2);
  border-radius: 0.5rem;
  color: rgb(102, 112, 204);
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.ai-feature {
  margin-bottom: 1.5rem;
}

.ai-label {
  display: block;
  color: rgba(238, 238, 238, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.ai-bar {
  width: 100%;
  height: 8px;
  background: rgba(102, 112, 204, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.ai-fill {
  height: 100%;
  background: linear-gradient(90deg, rgb(102, 112, 204), rgb(73, 83, 171));
  border-radius: 4px;
  transition: width 1s ease-out;
}

/* Outcomes Section */
.outcomes-section {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(88, 7, 7, 0.15) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.outcomes-container {
  max-width: 1200px;
  margin: 0 auto;
}

.outcomes-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.outcome-card {
  background: rgba(102, 112, 204, 0.08);
  border: 1px solid rgba(102, 112, 204, 0.2);
  border-radius: 1.2rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.outcome-card:hover {
  background: rgba(102, 112, 204, 0.15);
  border-color: rgba(102, 112, 204, 0.4);
  transform: translateY(-5px);
}

.outcome-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(102, 112, 204);
  margin-bottom: 0.5rem;
}

.outcome-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.outcome-card p {
  color: rgba(238, 238, 238, 0.75);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* CTA Section */
.methodology-cta {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(88, 7, 7, 0.3) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.cta-container {
  max-width: 600px;
  margin: 0 auto;
}

.methodology-cta h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.methodology-cta p {
  font-size: 1.1rem;
  color: rgba(238, 238, 238, 0.8);
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: inline-block;
}

.btn-primary {
  background: rgb(102, 112, 204);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: rgb(73, 83, 171);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #eee;
  border: 2px solid rgb(102, 112, 204);
}

.btn-secondary:hover {
  background: rgba(102, 112, 204, 0.1);
  border-color: rgba(102, 112, 204, 0.6);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .methodology-hero {
    padding: 3rem 1.5rem;
  }

  .principles-grid,
  .steps-grid,
  .outcomes-grid {
    grid-template-columns: 1fr;
  }

  .ai-content {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
