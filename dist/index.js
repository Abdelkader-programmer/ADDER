// toggle btn
const toggle = document.getElementById('toggle');
toggle?.addEventListener('click', function () {
    const icon = document.getElementById('icon');
    //* icon chang {<i class="fa-solid fa-x"></i>}
    if (icon?.classList.contains('fa-bars')) {
        icon?.classList.add('fa-x');
        icon?.classList.remove('fa-bars');
        icon?.classList.add('change-icon');
    }
    else {
        icon?.classList.add('fa-bars');
        icon?.classList.remove('fa-x');
        icon?.classList.add('change-icon');
    }
    ;
    // show links
    //! show and hide k=links and btn
    const toggleSlide = document.querySelector('.toggle-slide');
    if (toggleSlide.style.display === 'block') {
        toggleSlide.style.display = 'none';
    }
    else {
        toggleSlide.style.display = 'block';
    }
});
// -------------------------------------------------------------------------------
// to add product to cart
let count = 0;
let num = document.querySelectorAll('.num');
const placeProduct = document.getElementById('PlaceProduct');
placeProduct?.addEventListener('click', function (e) {
    const target = e.target;
    const button = target.closest('.addCart');
    if (button) {
        let cart = document.getElementById('cart');
        count += 1;
        num.forEach((NumAdd) => {
            NumAdd.innerHTML = count.toString();
        });
        if (count > 0) {
            cart?.classList.add('chang-mode');
        }
        else {
            cart?.classList.remove('chang-mode');
        }
    }
});
// to add love 
let countLove = 0;
let numLove = document.querySelectorAll('.numLove');
placeProduct?.addEventListener('click', function (e) {
    const target = e.target;
    const button = target.closest('.lovePro');
    if (button) {
        let heart = document.getElementById('heart');
        countLove += 1;
        numLove.forEach((NumLover) => {
            NumLover.innerHTML = countLove.toString();
        });
        if (countLove > 0) {
            heart?.classList.add('chang-mode-heart');
        }
        else {
            heart?.classList.remove('chang-mode-heart');
        }
    }
});
// add to save 
let countSave = 0;
let numSave = document.querySelectorAll('.numSave');
placeProduct?.addEventListener('click', function (e) {
    const target = e.target;
    const button = target.closest('.savePro');
    if (button) {
        let saved = document.getElementById('saved');
        countSave += 1;
        numSave.forEach((NumSave) => {
            NumSave.innerHTML = countSave.toString();
        });
        if (countSave > 0) {
            saved?.classList.add('chang-mode-save');
        }
        else {
            saved?.classList.remove('chang-mode-save');
        }
    }
});
// -------------------------------------------------------------------------------
// open & close adding form 
const openForm = document.getElementById('openForm');
const closeForm = document.getElementById('closeForm');
const SicPas = document.getElementById('SicPas');
openForm?.addEventListener('click', function () {
    SicPas?.classList.add('open-password');
    SicPas?.classList.remove('cloth-password');
    SicPas?.classList.remove('animate-close');
    SicPas?.classList.add('animate-Open');
});
closeForm?.addEventListener('click', function () {
    SicForm?.classList.add('cloth-Form');
    SicForm?.classList.remove('open-Form');
    SicForm?.classList.add('animate-close');
    SicForm?.classList.remove('animate-Open');
});
// -------------------------------------------------------------------------------
// get password to Add
const changeMode = document.getElementById('changeMode');
const lpPass = document.getElementById('lpPass');
changeMode.addEventListener('click', function () {
    let iconEye = document.getElementById('iconEye');
    // * <i class="fa-solid fa-eye-slash"></i>
    if (lpPass.type === 'password') {
        lpPass.type = 'text';
        iconEye.classList.add('fa-eye');
        iconEye.classList.remove('fa-eye-slash');
    }
    else {
        lpPass.type = 'password';
        iconEye.classList.remove('fa-eye');
        iconEye.classList.add('fa-eye-slash');
    }
});
const btnGo = document.getElementById('btnGo');
const SicForm = document.getElementById('SicForm');
btnGo.addEventListener('click', function () {
    let pass = 123;
    let passValue = Number(lpPass.value.trim());
    if (passValue === pass) {
        SicForm?.classList.add('open-Form');
        SicForm?.classList.remove('cloth-Form');
        SicForm?.classList.add('animate-Open');
        SicForm?.classList.remove('animate-close');
        SicPas?.classList.remove('open-password');
        SicPas?.classList.add('cloth-password');
        SicPas?.classList.add('animate-close');
        SicPas?.classList.remove('animate-Open');
    }
    else {
        alert('Wrong Password ❌');
    }
});
// -------------------------------------------------------------------------------
// to add products
// img
const img = document.getElementById('img');
// brandName
const brandName = document.getElementById('brandName');
// type
const type = document.getElementById('type');
// model
const model = document.getElementById('model');
// description
const description = document.getElementById('description');
// color
const color = document.getElementById('color');
// amount
const amount = document.getElementById('amount');
// price
const price = document.getElementById('price');
// add btn
const btnAddProduct = document.getElementById('btnAddProduct');
// place added
const PlaceProduct = document.getElementById('PlaceProduct');
// Array
let arrayProduct = [];
// localStorage
if (localStorage.getItem('Product')) {
    arrayProduct = JSON.parse(localStorage.getItem('Product') || '[]');
    AddProducts();
}
// save img
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
btnAddProduct.addEventListener('click', async function (e) {
    e.preventDefault();
    if (!img?.files || img.files.length === 0 ||
        !brandName?.value || brandName.value.trim() === '' ||
        !type?.value || type.value.trim() === '' ||
        !model?.value || model.value.trim() === '' ||
        !description?.value || description.value.trim() === '' ||
        !color?.value || color.value.trim() === '' ||
        !amount?.value || amount.value.trim() === '' ||
        !price?.value || price.value.trim() === '') {
        alert('Empty Input ⚠️');
        return;
    }
    else {
        alert('Added Successfully ✅');
    }
    let imageSrc = '';
    if (img?.files && img.files[0]) {
        imageSrc = await convertToBase64(img.files[0]);
    }
    let Products = {
        Imgs: imageSrc,
        Name: brandName?.value ?? '',
        Type: type?.value ?? '',
        Model: Number(model?.value ?? 0),
        Description: description?.value ?? '',
        Color: color?.value ?? '',
        Amount: Number(amount?.value ?? 0),
        Price: price?.value ?? ''
    };
    arrayProduct.push(Products);
    localStorage.setItem('Product', JSON.stringify(arrayProduct));
    AddProducts();
    if (img)
        img.value = '';
    if (brandName)
        brandName.value = '';
    if (type)
        type.value = '';
    if (model)
        model.value = '';
    if (description)
        description.value = '';
    if (color)
        color.value = '';
    if (amount)
        amount.value = '';
    if (price)
        price.value = '';
});
function AddProducts() {
    let container = '';
    for (let i = 0; i < arrayProduct.length; i++) {
        container += `
                <div class="w-full p-2">
                    <div class="w-full border-4 border-[#d0b57d] overflow-hidden rounded-xl">
                        <img src="${arrayProduct[i]?.Imgs}" alt="jpg" class="w-full h-[280px] object-cover hover:scale-105 duration-200">
                        <div class="w-full p-3 mt-3">
                            <div>
                                <p class="text-2xl text-[#d0b57d] font-semibold">Name : <span class="text-white capital-letter">${arrayProduct[i]?.Name}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Type : <span class="text-white capital-letter">${arrayProduct[i]?.Type}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Model : <span class="text-white">${arrayProduct[i]?.Model}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Description : <span class="text-white text-xl capital-letter">${arrayProduct[i]?.Description}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Color : <span class="text-white capital-letter">${arrayProduct[i]?.Color}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Amount : <span class="text-white">${arrayProduct[i]?.Amount}</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <p class="text-2xl text-[#d0b57d] font-semibold">Price : <span class="text-white">${arrayProduct[i]?.Price}$</span></p>
                            </div>
                            <div class="w-full mt-3">
                                <div class="w-full text-center">
                                    <i class="fa-solid fa-star w-8 h-8 text-yellow-400"></i>
                                    <i class="fa-solid fa-star w-8 h-8 text-yellow-400"></i>
                                    <i class="fa-solid fa-star w-8 h-8 text-yellow-400"></i>
                                    <i class="fa-solid fa-star w-8 h-8 text-yellow-400"></i>
                                    <i class="fa-solid fa-star w-8 h-8 text-yellow-400"></i>
                                </div>
                            </div>
                            <div class="w-[90%] flex justify-center gap-2 m-auto mt-5">
                                <button class="w-full p-2 border-2 border-white text-white rounded-xl font-semibold active:translate-y-1 active:bg-white active:text-black duration-300 addCart">Buy Now <i class="fa-solid fa-cart-arrow-down"></i></button>
                            </div>
                            <div class="w-[90%] flex justify-center gap-2 m-auto mt-3">
                                <button class="w-full p-2 border-2 border-red-500 text-red-500 rounded-xl font-semibold active:translate-y-1 active:bg-red-500 active:text-white duration-300 lovePro">Favorite <i class="fa-solid fa-heart"></i></button>
                            </div>
                            <div class="w-[90%] flex justify-center gap-2 m-auto mt-3">
                                <button class="w-full p-2 border-2 border-green-500 text-green-500 rounded-xl font-semibold active:translate-y-1 active:bg-green-500 active:text-white duration-300 savePro">Saved <i class="fa-solid fa-bookmark"></i></button>
                            </div>
                            <div class="w-[90%] flex justify-end gap-2 m-auto mt-3">
                                <button onclick="deleted(${i})" class="p-2 px-5 border-2 border-blue-700 text-blue-700 rounded-xl font-semibold active:translate-y-1 active:bg-blue-700 active:text-white duration-300" id='deleted'>Delete <i class="fa-solid fa-trash-can"></i></i></button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }
    ;
    if (PlaceProduct) {
        PlaceProduct.innerHTML = container;
    }
    ;
    num = document.querySelectorAll('.num');
    numLove = document.querySelectorAll('.numLove');
    numSave = document.querySelectorAll('.numSave');
}
;
// delete product
function deleted(index) {
    arrayProduct.splice(index, 1);
    localStorage.setItem('Product', JSON.stringify(arrayProduct));
    AddProducts();
}
window.deleted = deleted;
// -------------------------------------------------------------------------------
const sending = document.getElementById('sending');
const SendMsg = document.getElementById('SendMsg');
sending.addEventListener('click', function () {
    let testMsg = SendMsg.value;
    if (testMsg === '') {
        alert('Empty Message ⚠️');
    }
    else {
        SendMsg.value = '';
        alert('Sending successfully ✅');
    }
});
export {};
//# sourceMappingURL=index.js.map