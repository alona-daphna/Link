const setItemAsync = (key: string, value: string): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
};

export default async (username: string, password: string) => {
  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    await setItemAsync('token', await response.json());
  }
};
