import { Link } from '../../../shared/Types/Link';

const getLinksFromLocalStorage = (): Link[] => {
  return JSON.parse(localStorage.getItem('links') || '[]');
};

const saveLinksToLocalStorage = (categories: Link[]): void => {
  localStorage.setItem('links', JSON.stringify(categories));
};

const getNextId = (): number => {
  const links = getLinksFromLocalStorage();
  if (links.length === 0) {
    return 0;
  }
  const ids = links.map((category) => category.id);
  return Math.max(...ids) + 1;
};

const fetchLinks = async (categoryId: number | null): Promise<Link[]> => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const response = await fetch(
      `http://localhost:3000/links/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } else {
    return getLinksFromLocalStorage().filter(
      (x) => x.categoryId === categoryId
    );
  }

  return [];
};

const createLink = async (
  categoryId: number | null,
  url: string,
  title: string | null
): Promise<Link | null> => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const response = await fetch('http://localhost:3000/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        url,
        category: categoryId,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
  } else {
    const link = { id: getNextId(), title, url, categoryId };
    const links = getLinksFromLocalStorage();
    links.push(link);
    saveLinksToLocalStorage(links);
    return link;
  }

  return null;
};

const deleteLink = async (id: number) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    await fetch(`http://localhost:3000/links/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } else {
    const links = getLinksFromLocalStorage();
    saveLinksToLocalStorage(links.filter((x) => x.id !== id));
  }
};

const updateLink = async (id: number, title: string, url: string) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    await fetch(`http://localhost:3000/links/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, url }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  } else {
    const links = getLinksFromLocalStorage();
    saveLinksToLocalStorage(
      links.map((x) =>
        x.id === id ? { id, title, url, categoryId: x.categoryId } : x
      )
    );
  }
};

export { fetchLinks, createLink, deleteLink, updateLink };
