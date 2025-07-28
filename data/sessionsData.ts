// Generate all 330 sessions programmatically
const cities = [
  "Dallas",
  "Miami",
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "San Diego",
  "Austin",
  "Seattle",
  "Portland",
  "Denver",
]

const categories = [
  "Yoga",
  "Pilates",
  "Tennis",
  "Personal Training",
  "Boxing",
  "Dance",
  "Swimming",
  "Martial Arts",
  "HIIT",
  "CrossFit",
]

const sessionPrefixes = [
  "Elite",
  "Summit",
  "Prime",
  "Golden",
  "Zen",
  "Urban",
  "Signature",
  "Prestige",
  "Opulent",
  "Pro",
]

const categoryActions = {
  Yoga: ["Flow", "Balance", "Asana", "Zen", "Power"],
  Pilates: ["Form", "Body", "Alignment", "Core", "Balance"],
  Tennis: ["Serve", "Rally", "Match", "Court", "Ace"],
  "Personal Training": ["Strength", "Performance", "Conditioning", "Power", "Endurance"],
  Boxing: ["Knockout", "Fight", "Punch", "Warrior", "Combat"],
  Dance: ["Rhythm", "Move", "Groove", "Expression", "Flow"],
  Swimming: ["Stroke", "Aqua", "Swim", "Water", "Pool"],
  "Martial Arts": ["Discipline", "Combat", "Warrior", "Dojo", "Fight"],
  HIIT: ["Burn", "Power", "Pulse", "Intensity", "Energy"],
  CrossFit: ["WOD", "Athlete", "Power", "Endurance", "Beast"],
}

function generateSessions() {
  const sessions = []
  let sessionId = 1

  for (const city of cities) {
    for (const category of categories) {
      // Generate 3 sessions per category per city
      for (let i = 0; i < 3; i++) {
        const prefix = sessionPrefixes[Math.floor(Math.random() * sessionPrefixes.length)]
        const action = categoryActions[category][Math.floor(Math.random() * categoryActions[category].length)]

        const session = {
          session_id: sessionId,
          title: `${prefix} ${action} - ${category} Session in ${city}`,
          city: city,
          category: category,
          description: `Exclusive ${category.toLowerCase()} session designed for travelers seeking premium training in ${city}.`,
          price: Math.round((Math.random() * 200 + 80) * 100) / 100,
          rating: Math.round((Math.random() * 1 + 4) * 10) / 10,
          reviews_count: Math.floor(Math.random() * 500) + 1,
          images: [
            `https://dummyimage.com/600x400/000/fff&text=${category.replace(" ", "+")}+in+${city.replace(" ", "+")}`,
          ],
          availability: generateAvailability(),
        }

        sessions.push(session)
        sessionId++
      }
    }
  }

  return sessions
}

function generateAvailability() {
  const times = [
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ]
  const shuffled = times.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 6)
}

export const sessionsData = generateSessions()
