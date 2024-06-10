
export const register = async (userData) => {
  try {
    // Sending a POST request to the registration endpoint
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Check if response is not OK (i.e., status code is not in the 200 range)
    if (!response.ok) {
      // Try to extract error message from response body
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Return the parsed JSON response
    return response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};