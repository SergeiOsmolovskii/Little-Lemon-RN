const URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export const getMenuData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.error(error);
  }
}