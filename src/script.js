import render from './phonebook/script/render.js';
import { getStorage } from './phonebook/script/serviceStorage.js';
import * as controls from './phonebook/script/control.js';

{
    const { renderPhoneBook, renderContacts } = render;
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const { list, logo, btnAdd, formOverlay, form, btnDel, table } = renderPhoneBook(app, title);
        const allRow = renderContacts(list, getStorage('contactKey'));
        const { closeModal } = controls.modalControl(btnAdd, formOverlay);

        controls.hoverRow(allRow, logo);
        controls.deleteControl(btnDel, list);
        controls.formControl(form, list, closeModal);

        const closeElem = document.querySelector('.close');
        closeElem.addEventListener('click', () => {
            formOverlay.classList.remove('is-visible');
        });

        const sortInfo = localStorage.getItem('sortColumnInfo');
        if (sortInfo !== null) {
            var tbl = document.querySelector('.table');
            controls.sortTable(tbl, sortInfo);
        }

        table.addEventListener('click', e => {
            const target = e.target;

            if (target.textContent === 'Имя0') {
                var table = document.querySelector('.table');
                controls.sortTable(table, 1);
            }
            if (target.textContent === 'Фамилия') {
                var table = document.querySelector('.table');
                controls.sortTable(table, 2);
            }
        });
    };

    window.phoneBookInit = init;
}