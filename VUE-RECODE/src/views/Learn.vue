<template>
  <div class="learn-container">
    <!-- Hero Section -->
    <section class="learn-hero">
      <div class="hero-content">
        <h1>Learn Mathematics with Machine Learning</h1>
        <p>Explore interactive lessons, tutorials, and exercises designed to help you master GCSE mathematics</p>

        <!-- Search and Filter -->
        <div class="controls">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search lessons..."
              class="search-input"
            />
          </div>
          <select v-model="selectedCategory" class="category-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Lessons Grid -->
    <section class="lessons-section">
      <div class="lessons-container">
        <div v-if="filteredLessons.length > 0" class="lessons-grid">
          <div
            v-for="lesson in filteredLessons"
            :key="lesson.id"
            class="lesson-card"
          >
            <div class="lesson-header">
              <span class="category-badge">{{ lesson.category }}</span>
              <span class="difficulty" :class="`difficulty-${lesson.difficulty.toLowerCase()}`">
                {{ lesson.difficulty }}
              </span>
            </div>

            <h3 class="lesson-title">{{ lesson.title }}</h3>
            <p class="lesson-description">{{ lesson.description }}</p>

            <div class="lesson-meta">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ lesson.duration }} min
              </span>
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {{ lesson.lessons }} lessons
              </span>
            </div>

            <div class="lesson-actions">
              <button class="btn-start" @click="startLesson(lesson.id)">
                Start Learning
              </button>
              <button
                class="btn-bookmark"
                :class="{ bookmarked: isBookmarked(lesson.id) }"
                @click="toggleBookmark(lesson.id)"
              >
                {{ isBookmarked(lesson.id) ? '★' : '☆' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">📚</div>
          <h3>No lessons found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <h2>Why Learn with Us?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🤖</div>
            <h3>AI-Personalized</h3>
            <p>Our machine learning algorithms adapt to your learning pace and style</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your improvements with detailed analytics and insights</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🎯</div>
            <h3>Targeted Practice</h3>
            <p>Focus on areas where you need the most help</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💡</div>
            <h3>Expert Content</h3>
            <p>Curated by mathematics educators and industry experts</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Lesson {
  id: number
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  lessons: number
}

const searchQuery = ref('')
const selectedCategory = ref('')
const bookmarks = ref<Set<number>>(new Set())

const allLessons: Lesson[] = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    description: 'Master the basics of algebraic equations, variables, and expressions',
    category: 'Algebra',
    difficulty: 'Beginner',
    duration: 45,
    lessons: 12
  },
  {
    id: 2,
    title: 'Quadratic Equations',
    description: 'Solve quadratic equations using various methods and techniques',
    category: 'Algebra',
    difficulty: 'Intermediate',
    duration: 60,
    lessons: 15
  },
  {
    id: 3,
    title: 'Trigonometry Basics',
    description: 'Learn sine, cosine, and tangent functions with real-world applications',
    category: 'Trigonometry',
    difficulty: 'Beginner',
    duration: 50,
    lessons: 14
  },
  {
    id: 4,
    title: 'Advanced Calculus',
    description: 'Explore differentiation, integration, and their applications',
    category: 'Calculus',
    difficulty: 'Advanced',
    duration: 90,
    lessons: 20
  },
  {
    id: 5,
    title: 'Statistics Essentials',
    description: 'Probability, distributions, and hypothesis testing fundamentals',
    category: 'Statistics',
    difficulty: 'Intermediate',
    duration: 55,
    lessons: 13
  },
  {
    id: 6,
    title: 'Geometry in Practice',
    description: 'Shapes, angles, and spatial reasoning with practical examples',
    category: 'Geometry',
    difficulty: 'Beginner',
    duration: 40,
    lessons: 11
  },
  {
    id: 7,
    title: 'Linear Algebra',
    description: 'Matrices, vectors, and systems of linear equations',
    category: 'Algebra',
    difficulty: 'Advanced',
    duration: 75,
    lessons: 18
  },
  {
    id: 8,
    title: 'Complex Numbers',
    description: 'Understanding imaginary numbers and complex arithmetic',
    category: 'Algebra',
    difficulty: 'Advanced',
    duration: 65,
    lessons: 16
  }
]

const categories = computed(() => {
  const cats = new Set(allLessons.map(l => l.category))
  return Array.from(cats).sort()
})

const filteredLessons = computed(() => {
  return allLessons.filter(lesson => {
    const matchesSearch =
      searchQuery.value === '' ||
      lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = selectedCategory.value === '' || lesson.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

const isBookmarked = (id: number) => bookmarks.value.has(id)

const toggleBookmark = (id: number) => {
  if (bookmarks.value.has(id)) {
    bookmarks.value.delete(id)
  } else {
    bookmarks.value.add(id)
  }
}

const startLesson = (id: number) => {
  console.log(`Starting lesson ${id}`)
  // TODO: Navigate to lesson detail page
}
</script>

<style scoped>
.learn-container {
  min-height: 100vh;
  background: radial-gradient(circle at center, #580707, #000000);
  color: #eee;
  font-family: 'Inter', sans-serif;
}

/* Hero Section */
.learn-hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(88, 7, 7, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.learn-hero h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.learn-hero p {
  font-size: 1.1rem;
  color: rgba(238, 238, 238, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Search and Filter Controls */
.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.search-box {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 2px solid rgba(102, 112, 204, 0.3);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  color: #eee;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(238, 238, 238, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: rgb(102, 112, 204);
  background: rgba(102, 112, 204, 0.1);
}

.category-select {
  padding: 0.8rem 1.2rem;
  border: 2px solid rgba(102, 112, 204, 0.3);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  color: #eee;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-select:focus {
  outline: none;
  border-color: rgb(102, 112, 204);
  background: rgba(102, 112, 204, 0.1);
}

.category-select option {
  background: #1f2b48;
  color: #eee;
}

/* Lessons Section */
.lessons-section {
  padding: 4rem 2rem;
}

.lessons-container {
  max-width: 1200px;
  margin: 0 auto;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Lesson Card */
.lesson-card {
  background: rgba(102, 112, 204, 0.08);
  border: 1px solid rgba(102, 112, 204, 0.2);
  border-radius: 1.2rem;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lesson-card:hover {
  background: rgba(102, 112, 204, 0.15);
  border-color: rgba(102, 112, 204, 0.4);
  transform: translateY(-5px);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.category-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: rgba(102, 112, 204, 0.3);
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgb(102, 112, 204);
}

.difficulty {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty-beginner {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.difficulty-intermediate {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.difficulty-advanced {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.lesson-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #ffffff;
  line-height: 1.4;
}

.lesson-description {
  color: rgba(238, 238, 238, 0.75);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.lesson-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(102, 112, 204, 0.1);
  font-size: 0.9rem;
  color: rgba(238, 238, 238, 0.6);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.meta-item svg {
  opacity: 0.7;
}

.lesson-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-start {
  flex: 1;
  padding: 0.7rem 1rem;
  background: rgb(102, 112, 204);
  border: none;
  border-radius: 0.6rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.btn-start:hover {
  background: rgb(73, 83, 171);
  transform: translateY(-2px);
}

.btn-bookmark {
  padding: 0.7rem 1rem;
  background: transparent;
  border: 1px solid rgba(102, 112, 204, 0.3);
  border-radius: 0.6rem;
  color: #eee;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: 1;
}

.btn-bookmark:hover {
  border-color: rgba(102, 112, 204, 0.6);
  background: rgba(102, 112, 204, 0.1);
}

.btn-bookmark.bookmarked {
  color: rgb(102, 112, 204);
  border-color: rgb(102, 112, 204);
  background: rgba(102, 112, 204, 0.1);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.empty-state p {
  color: rgba(238, 238, 238, 0.6);
  font-size: 1rem;
}

/* Features Section */
.features-section {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(88, 7, 7, 0.2) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #d0d0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: rgba(102, 112, 204, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(102, 112, 204, 0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  background: rgba(102, 112, 204, 0.1);
  border-color: rgba(102, 112, 204, 0.3);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.feature p {
  color: rgba(238, 238, 238, 0.7);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .learn-hero {
    padding: 2rem 1.5rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }

  .category-select {
    width: 100%;
  }

  .lessons-grid {
    grid-template-columns: 1fr;
  }

  .lesson-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
