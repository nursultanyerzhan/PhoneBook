import { removeStorage, addContactData } from './serviceStorage.js';
import elements from './createElements.js';
const { createRow } = elements;

export const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
        contact.addEventListener('mouseenter', () => {
            logo.textContent = contact.phoneLink.textContent;
        });
        contact.addEventListener('mouseleave', () => {
            logo.textContent = text;
        });
    });
};

export const sortTable = (table, column) => {
    localStorage.setItem('sortColumnInfo', column);
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};

export const modalControl = (btnAdd, formOverlay) => {

    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
        const target = e.target;
        if (target === formOverlay || target.closest('.close')) {
            closeModal();
        }
    });

    return {
        closeModal,
    };
};

export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        });
    });

    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.del-icon')) {
            const phoneNumber = target.closest('.contact').children[3].textContent
            removeStorage('contactKey', phoneNumber);
            target.closest('.contact').remove();
        }
    });
};

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);

        addContactData(newContact);
        addContactPage(newContact, list);
        form.reset();
        closeModal();
    });
};