
export const getStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? [];
};

export const setStorage = (key, contact) => {
    const dataFromStorage = getStorage(key);
    dataFromStorage.push(contact);
    localStorage.setItem(key, JSON.stringify(dataFromStorage));
};

export const removeStorage = (key, phone) => {
    const contacts = getStorage(key);
    const filteredContacts = contacts.filter(item => item.phone != phone);
    localStorage.setItem(key, JSON.stringify(filteredContacts));
};

export const addContactData = contact => {
    setStorage('contactKey', contact);
};