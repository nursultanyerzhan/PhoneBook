import elements from './createElements.js';

const { createHeader,
    createLogo,
    createLogoFooter,
    createMain,
    createButtonGroup,
    createTable,
    createForm,
    createFooter,
    createRow } = elements;

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
    const { form, overlay } = createForm();
    const footer = createFooter();

    header.headerContainer.append(logo);
    footer.footerContainer.append(logoFooter);

    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);

    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        formOverlay: overlay,
        form: form,
        table: table,
    }
};



const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

export default {
    renderPhoneBook,
    renderContacts,
}