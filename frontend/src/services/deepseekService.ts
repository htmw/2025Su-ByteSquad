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
    const prompt = `Generate a 1-week workout routine for a ${preferences.experienceLevel} level person.
    
    Preferences:
    - Goal: ${preferences.goal}
    - Focus Areas: ${preferences.focusAreas.join(', ')}
    - Available Equipment: ${preferences.equipment.join(', ')}
    - Workout Frequency: ${preferences.frequency} days per week
    
    The user will repeat this 1-week plan for ${preferences.duration}. Make sure to include every day of the week (Day 1 to Day 7) in the response, even if some days are rest or active recovery days. Each day should have a list of exercises or a note if it is a rest day.
    
    Respond ONLY with valid JSON in the following format. Do NOT include any explanations, Markdown, or extra text. The response must be valid JSON and nothing else.
    {
      "workoutPlan": {
        "name": "Workout Program Name",
        "description": "Brief description (mention that this week is repeated for the selected duration)",
        "duration": "1 week",
        "days": [
          {
            "day": 1,
            "exercises": [
              {
                "name": "Exercise Name or 'Rest'",
                "sets": Number,
                "reps": "Reps or ''",
                "notes": "Any notes or instructions"
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
    let content = response.data.choices[0].message.content;
    content = content.trim();
    if (content.startsWith('```')) {
      // Remove the first line (e.g., ```json or ```)
      content = content.replace(/^```[a-zA-Z]*\n?/, '');
      // Remove the last line (```)
      content = content.replace(/```$/, '');
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating workout routine:', error);
    throw error;
  }
};
