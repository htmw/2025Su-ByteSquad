import axios from 'axios';

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface WorkoutPreferences {
  goal: string;
  experienceLevel: string;
  duration: string;
  equipment: string[];
  focusAreas: string[];
  frequency: number;
}

interface WorkoutResponse {
  workoutPlan: {
    name: string;
    description: string;
    duration: string;
    days: Array<{
      day: number;
      exercises: Array<{
        name: string;
        sets: number;
        reps: string;
        notes: string;
      }>;
    }>;
    tips: string[];
  };
}

export const generateWorkoutRoutine = async (preferences: WorkoutPreferences): Promise<WorkoutResponse> => {
  try {
    const prompt = `Generate a ${preferences.duration} workout routine for a ${preferences.experienceLevel} level person.
    
    Preferences:
    - Goal: ${preferences.goal}
    - Focus Areas: ${preferences.focusAreas.join(', ')}
    - Available Equipment: ${preferences.equipment.join(', ')}
    - Workout Frequency: ${preferences.frequency} days per week
    
    Format the response as JSON with the following structure:
    {
      "workoutPlan": {
        "name": "Workout Program Name",
        "description": "Brief description",
        "duration": "Program duration",
        "days": [
          {
            "day": 1,
            "exercises": [
              {
                "name": "Exercise Name",
                "sets": Number,
                "reps": "Reps",
                "notes": "Any notes"
              }
            ]
          }
        ],
        "tips": ["Training tips"]
      }
    }`;

    const response = await axios.post(API_URL, {
      messages: [{
        role: "user",
        content: prompt
      }],
      model: "deepseek-chat",
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Parse the response content
    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating workout routine:', error);
    throw error;
  }
};
