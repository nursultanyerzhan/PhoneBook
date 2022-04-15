'use strict';

const data = [
    {
        name: 'қИван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'аМария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;
        return h1;
    };

    const createLogoFooter = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logoFooter');
        h1.textContent = `Все права защищены ©${title}`;
        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;
        return main;
    };

    const createButtonGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({ className, type, text }) => {
            const button = document.createElement('button');
            button.type = type;
            button.className = className;
            button.textContent = text;
            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper, btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Операции</th>
            </tr>
        `);

        const tbody = document.createElement('tbody');
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контент</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя: </label>
                <input class="form-input" name="name" type="text" id="name" required />
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия: </label>
                <input class="form-input" name="surname" type="text" id="surname" required />
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон: </label>
                <input class="form-input" name="phone" type="text" id="phone" required />
            </div>
        `);

        const buttonGroup = createButtonGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);

        form.append(...buttonGroup.btns);
        overlay.append(form);
        return {
            overlay, form,
        };
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const logoFooter = createLogoFooter(title);
        const main = createMain();
        const buttonGroup = createButtonGroup([
            {
                className: 'btn btn-primary mr-3 js-add',
                type: 'button',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            },
        ]);
        const table = createTable();
        const form = createForm();
        const footer = createFooter();

        header.headerContainer.append(logo);
        footer.footerContainer.append(logoFooter);

        main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);

        app.append(header, main, footer);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDel: buttonGroup.btns[1],
            formOverlay: form.overlay,
            form: form.form,
            table: table,
        }
    };

    const createRow = ({ name: firstName, surname, phone }) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurName = document.createElement('td');
        tdSurName.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        const tdEdit = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-warning');
        editButton.textContent = 'редактировать';
        tdEdit.append(editButton);

        tr.append(tdDel, tdName, tdSurName, tdPhone, tdEdit);
        return tr;
    }

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
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

    const sortTable = (table, column) => {
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
    }

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const phoneBook = renderPhoneBook(app, title);

        const { list, logo, btnAdd, formOverlay, form, btnDel, table } = phoneBook;
        const allRow = renderContacts(list, data);

        hoverRow(allRow, logo);

        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible');
        });

        form.addEventListener('click', event => {
            event.stopPropagation();
        });

        formOverlay.addEventListener('click', e => {
            const target = e.target;
            if (target === formOverlay || target.closest('.close')) {
                formOverlay.classList.remove('is-visible');
            }
            formOverlay.classList.remove('is-visible');
        });

        document.addEventListener('touchstart', e => {
            console.log(e.type);
        });
        document.addEventListener('touchmove', e => {
            console.log(e.type);
        });
        document.addEventListener('touchend', e => {
            console.log(e.type);
        });

        const closeElem = document.querySelector('.close');
        closeElem.addEventListener('click', () => {
            formOverlay.classList.remove('is-visible');
        });

        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });

        list.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.del-icon')) {
                target.closest('.contact').remove();
            }
        });

        table.addEventListener('click', e => {
            const target = e.target;

            if (target.textContent === 'Имя') {
                var table = document.querySelector('.table');
                sortTable(table, 1);
            }
            if (target.textContent === 'Фамилия') {
                var table = document.querySelector('.table');
                sortTable(table, 2);
            }
        });
    };

    window.phoneBookInit = init;
}