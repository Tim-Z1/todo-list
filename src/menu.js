import shoyuRamenImg from './images/menuImages/shoyu-ramen.jpg'
import misoRamenImg from './images/menuImages/miso-ramen.jpg'
import tonkotsuRamenImg from './images/menuImages/tonkotsu-ramen.jpg'
import chashuRamenImg from './images/menuImages/chashu-ramen.webp'
import spicyMisoRamenImg from './images/menuImages/spicy-miso-ramen.jpg'
import chickenRamenImg from './images/menuImages/chicken-ramen.jpg'


export const loadMenuContent = function() {
    const content = document.querySelector('#content');
    content.textContent = '';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    const gridItem1 = document.createElement('div');
    const shoyuRamen = document.createElement('img');
    shoyuRamen.src = shoyuRamenImg;
    const p1 = document.createElement('p');
    p1.append('Shoyu Ramen');
    gridItem1.append(shoyuRamen, p1);

    const gridItem2 = document.createElement('div');
    const misoRamen = document.createElement('img');
    misoRamen.src = misoRamenImg;
    const p2 = document.createElement('p');
    p2.append('Miso Ramen');
    gridItem2.append(misoRamen, p2);

    const gridItem3 = document.createElement('div');
    const tonkotsuRamen = document.createElement('img');
    tonkotsuRamen.src = tonkotsuRamenImg;
    const p3 = document.createElement('p');
    p3.append('Tonkotsu Ramen');
    gridItem3.append(tonkotsuRamen, p3);

    const gridItem4 = document.createElement('div');
    const chashuRamen = document.createElement('img');
    chashuRamen.src = chashuRamenImg;
    const p4 = document.createElement('p');
    p4.append('Chashu Ramen');
    gridItem4.append(chashuRamen, p4);

    const gridItem5 = document.createElement('div');
    const spicyMisoRamen = document.createElement('img');
    spicyMisoRamen.src = spicyMisoRamenImg;
    const p5 = document.createElement('p');
    p5.append('Spicy Miso Ramen');
    gridItem5.append(spicyMisoRamen, p5);

    const gridItem6 = document.createElement('div');
    const chickenRamen = document.createElement('img');
    chickenRamen.src = chickenRamenImg;
    const p6 = document.createElement('p');
    p6.append('Chicken Ramen');
    gridItem6.append(chickenRamen, p6);

    gridContainer.append(gridItem1, gridItem2, gridItem3, gridItem4, gridItem5, gridItem6);
    content.append(gridContainer);

}

/* <div class="grid-container">
<div>
    <img src="./images/menuImages/shoyu-ramen.jpg">
    <p>Shoyu Ramen</p>
</div>
<div>
    <img src="./images/menuImages/miso-ramen.jpg">
    <p>Miso Ramen</p>
</div>
<div>
    <img src="./images/menuImages/tonkotsu-ramen.jpg">
    <p>Tonkotsu Ramen</p>
</div>
<div>
    <img src="./images/menuImages/chashu-ramen.webp">
    <p>Chashu Ramen</p>
</div>
<div>
    <img src="./images/menuImages/spicy-miso-ramen.jpg">
    <p>Spicy Miso Ramen</p>
</div>
<div>
    <img src="./images/menuImages/chicken-ramen.jpg">
    <p>Chicken Ramen</p>
</div>
</div> */