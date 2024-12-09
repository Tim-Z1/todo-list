export const loadAboutContent = function () {
    const content = document.querySelector('#content');
    content.textContent = '';

    const p = document.createElement('p');
    p.append('About Ramen-ya');

    content.append(p);
}