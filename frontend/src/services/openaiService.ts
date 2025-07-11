import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Type definitions
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

interface OpenAIError {
  message: string;
  type: string;
  param: string | null;
  code: string;
}

export const generateWorkoutRoutine = async (preferences: WorkoutPreferences): Promise<WorkoutResponse> => {
  if (!API_KEY) {
    throw new Error('OpenAI API key not configured. Please set REACT_APP_OPENAI_API_KEY in your environment variables.');
  }

  try {
    const prompt = `You are a professional fitness trainer. Generate a ${preferences.duration} workout routine for a ${preferences.experienceLevel} level person.
    
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
      model: "gpt-3.5-turbo",
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
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      const openAIError = error.response.data.error as OpenAIError;
      throw new Error(`OpenAI API Error: ${openAIError.message}`);
    }
    throw error;
  }
};
