exports.handler = async (event) => {
    // Ensure OPENAI_API_KEY is set in Netlify environment variables
    const API_KEY = process.env.OPENAI_API_KEY; 
    if (!API_KEY) {
        console.error('OPENAI_API_KEY is not set in environment variables.');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error: Missing API Key.' }),
        };
    }

    // Parse the incoming request
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (parseError) {
        console.error('Failed to parse request body:', parseError);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid JSON in request body.' }),
        };
    }

    const { action, stories, teamMembers } = body;

    // Validate required fields
    if (!action || !stories || !Array.isArray(stories)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing or invalid fields: action and stories are required.' }),
        };
    }

    // Depending on the action, build a different prompt
    let userRequest, promptContext;
    switch (action) {
        case 'sprintGoal':
            promptContext = buildSprintGoalContext(stories);
            userRequest = "Generate a SMART Sprint Goal:";
            break;

        case 'workSummary':
            if (!teamMembers || !Array.isArray(teamMembers)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Missing or invalid teamMembers field for workSummary action.' }),
                };
            }
            promptContext = buildWorkSummaryContext(stories, teamMembers);
            userRequest = "Generate a Work Summary:";
            break;

        case 'sprintReview':
            promptContext = buildSprintReviewContext(stories);
            userRequest = "Generate a 2-min Sprint Review (bullet points):";
            break;

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid action. Must be sprintGoal, workSummary, or sprintReview.' }),
            };
    }

    // Construct the messages for the OpenAI API
    const messages = [
        {
            role: 'system',
            content: "You are a professional assistant that helps with agile practices and sprint planning."
        },
        { role: 'user', content: `${userRequest}\n${promptContext}` },
    ];

    try {
        // OpenAI Chat Completions endpoint
        const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Adjust model if desired
                messages: messages,
                stream: false,
                temperature: 0.1, 
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API request failed:', response.status, errorText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `OpenAI API request failed: ${errorText}` }),
            };
        }

        const data = await response.json();

        // Extract the assistant's message content from the OpenAI API response
        let completion = "No response returned from API.";
        if (data && data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
            if (data.choices[0].message && data.choices[0].message.content) {
                completion = data.choices[0].message.content;
            }
        }

        // Return the extracted content wrapped in a 'result' field
        return {
            statusCode: 200,
            body: JSON.stringify({ result: completion }),
        };
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from OpenAI API' }),
        };
    }
};

// -------------------
// Helper functions to build context prompts
// -------------------

function buildSprintGoalContext(stories) {
    let context = "User Stories:\n";
    stories.forEach(story => {
        context += `- ${story.title} (${story.points} pts): ${story.description}\n`;
    });
    context += "\nPlease provide a single, cohesive sprint goal that aligns with these stories. Examples for context: Reduce bugs by 50%; Implement the Diff Viewer functionality for Editor; Increase test coverage to 80%. You don't need to provide an explanation how you came up with the Sprint Goal, simply spell it out.";
    return context;
}

function buildWorkSummaryContext(stories, teamMembers) {
    let context = "Team Members and Capacities:\n";
    teamMembers.forEach(m => {
        context += `- ${m.name}: ${m.capacity} pts capacity\n`;
    });

    context += "\nUser Stories:\n";
    stories.forEach(story => {
        context += `- ${story.title} (${story.points} pts) assigned to ${story.assignee}\n`;
    });

    context += "\nPlease provide a short non-technical summary of what each team member is working on.";
    return context;
}

function buildSprintReviewContext(stories) {
    let context = "User Stories completed/being worked on:\n";
    stories.forEach(story => {
        context += `- ${story.title}: ${story.description}\n`;
    });
    context += "\nGenerate a non-technical sprint review as bullet points, don't go too much into detail, stay at a higher level of abstraction (approx. 2 minutes).";
    return context;
}
