import ramenLogo from './images/homeImages/ramen-logo.png';
import ramenPic from './images/homeImages/ramen-picture.jpg';

export const loadHomePageContent = function() {
    const content = document.querySelector('#content');
    content.textContent = '';

    //top section
        const topSection = document.createElement('div');
        topSection.className = 'top-section';
    
        const h1 = document.createElement('h1');
        h1.append('ラーメン屋');
    
        const logo = document.createElement('img');
        logo.src = ramenLogo;
        logo.width = 300;


    //middle section
    const middleSection = document.createElement('div');
    middleSection.className = 'middle-section';

    const textContainer = document.createElement('text-container');
    textContainer.className = 'text-container';

    const p = document.createElement('p');
    p.append('美味しいラーメン');
    const headerText = document.createElement('h1');
    headerText.append('Delicious Ramen'); 
    const p2 = document.createElement('p');
    p2.append('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat culpa asperiores architecto nobis aperiam animi debitis? Beatae architecto sit at nisi in, itaque asperiores. Quidem enim itaque quod vero dolorem.');
    const p3 = document.createElement('p');
    p3.append('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, provident.');
 
    const ramenPicture = document.createElement('img');
    ramenPicture.className = 'ramen-pic';
    ramenPicture.src = ramenPic;
    ramenPicture.width = 400;
    ramenPicture.height = 400;

    //bottomsection
    const bottomSection = document.createElement('div');
    const text = document.createElement('p');
    text.append('Placeholder text');


    topSection.append(h1, logo);

    middleSection.append(textContainer, ramenPicture);
    textContainer.append(p, headerText, p2, p3);

    bottomSection.append(text)


    content.append(topSection);
    content.append(middleSection);
    content.append(bottomSection)

};