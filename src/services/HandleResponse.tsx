export const handleResponse = (response: Response) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      
      return data;
    });
  };