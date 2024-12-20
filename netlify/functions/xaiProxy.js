exports.handler = async (event, context) => {
  // Now just use fetch directly:
  const response = await fetch("https://your-xai-api-endpoint.com", {
    method: 'POST',
    // ...rest of your fetch code...
  });

  // ...rest of your code...
}

    // Parse the request body
    const { prompt, userRequest } = JSON.parse(event.body || '{}');

    if (!prompt || !userRequest) {
      return {
        statusCode: 400,
        body: 'Missing required fields: prompt or userRequest.'
      };
    }

    const XAI_API_ENDPOINT = "https://api.xai.example.com/generate"; // Replace with actual endpoint
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error('XAI_API_KEY not set in environment variables.');
      return {
        statusCode: 500,
        body: 'Internal Server Error: API key not configured.'
      };
    }

    const response = await fetch(XAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `${userRequest}\n${prompt}`
        // Add any additional parameters required by your API here
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('xAI API request failed:', response.status, text);
      return {
        statusCode: response.status,
        body: text
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ result: data.result || "No result returned from xAI API." })
    };
  } catch (error) {
    console.error('Error in xaiProxy function:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};
