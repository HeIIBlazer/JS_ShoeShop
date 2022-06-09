import {viewModule} from './ViewModule.js';
class PurchaseModule {
    getModels() {
        let promiseListModels = fetch('getListModels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListModels.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        let modelSelect = document.getElementById('purchase-list-models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "-SELECT MODEL-";
                        option.value = '';
                        modelSelect.add(option);
                        for (let i = 0; i < response.options.length; i++) {
                            option = document.createElement('option');
                            var formatedPrice = new Intl.NumberFormat().format(response.options[i].modelPrice);
                            var frPrice = formatedPrice.replace(",",".");
                            option.text = response.options[i].modelName + ' // ' 
                            + response.options[i].modelFirm + ' // ' 
                            + frPrice + '$ // ' 
                            + response.options[i].modelAmount + ' пар(а)';
                            option.value = response.options[i].id;
                            modelSelect.add(option);
                        }
                    }else {
                        let modelSelect = document.getElementById('purchase-list-models');
                        modelSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "LIST MODEL IS EMPTY..."
                        option.value = '';
                        modelSelect.add(option);
                    }
                })
                .catch(error => {
                    document.getElementById('info').innerHTML = "getModels" + " " + error.message;
                    document.getElementById('info').style.opacity = '1';
                });
    }
    insertPurchasePicture() {
        const modelId = document.getElementById('purchase-list-models').value;
        const model = {
            "id": modelId
        }
        let promiseGetPicture = fetch('getModelPicture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(model)
        });
        promiseGetPicture.then(response => response.json())
                .then(response => {
                    if(response.status) {
                        document.getElementById('modelImage').setAttribute('src', response.pictureSource);
                    }
                })
                .then(response => {
                    const modelImage = document.getElementById('modelImage');
                    viewModule.checkIfImageExists(modelImage.src, (exists) => {
                        if(exists) {
                            // console.log('Image exists. ')
                            document.getElementById('purchContainer').style.height = '670px';
                            document.getElementById('purchContainer').style.marginTop = '135px';
                            document.getElementById('modelImage-container').style.display = 'unset';
                        }else {
                            // console.error('Image does not exists')
                            document.getElementById('purchContainer').style.height = '270px';
                            document.getElementById('purchContainer').style.marginTop = '250px';
                            document.getElementById('modelImage-container').style.display = 'none';
                        }
                    });
                })
                .catch(error => {
                    document.getElementById('info').innerHTML = error.message;     
                    document.getElementById('info').style.opacity = '1';  
                });
    }
    buyModel() {
        const modelId = document.getElementById('purchase-list-models').value;
        const buyModel = {
            "id": modelId
        }
        let promisePurchase = fetch('buyModel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            },
            credentials: 'include',
            body: JSON.stringify(buyModel)
        });
        promisePurchase.then(response => response.json())
            .then(response => {
                if(response.status) {
                    if(sessionStorage.getItem('user') !== null) {
                        sessionStorage.setItem('user', JSON.stringify(response.user));
                        const userBank = document.getElementById('user-bank');
                        userBank.innerHTML = JSON.parse(sessionStorage.getItem('user')).money + "$";
                    }
                    const body = document.getElementsByTagName('body');
                    body[0].style.transition = 'ease all 0.4s';
                    body[0].style.transitionTimingFunction = 'cubic-bezier(.76,.08,.47,.79)';
                    body[0].style.backgroundColor = 'rgb(0, 255, 0)'
                    setTimeout(() => {
                        body[0].style.transition = 'ease all 0.7s';
                        body[0].style.backgroundColor = 'white'
                    }, 230);
                    document.getElementById('info').innerHTML = response.info;
                    document.getElementById('info').style.opacity = '1';
                    if(response.noMoney) {
                        const body = document.getElementsByTagName('body');
                        body[0].style.transition = 'ease all 0.4s';
                        body[0].style.transitionTimingFunction = 'cubic-bezier(.76,.08,.47,.79)';
                        body[0].style.backgroundColor = 'red'
                        setTimeout(() => {
                            body[0].style.transition = 'ease all 0.7s';
                            body[0].style.backgroundColor = 'white'
                        }, 230);
                        document.getElementById('info').innerHTML = response.info;
                        document.getElementById('info').style.opacity = '1';
                    }
                    if(response.empty) {
                        const body = document.getElementsByTagName('body');
                        body[0].style.transition = 'ease all 0.4s';
                        body[0].style.transitionTimingFunction = 'cubic-bezier(.76,.08,.47,.79)';
                        body[0].style.backgroundColor = 'red'
                        setTimeout(() => {
                            body[0].style.transition = 'ease all 0.7s';
                            body[0].style.backgroundColor = 'white'
                        }, 230);
                        document.getElementById('info').innerHTML = response.info;
                        document.getElementById('info').style.opacity = '1';
                    }
                }
            })
            .catch(error => {
                const body = document.getElementsByTagName('body');
                body[0].style.transition = 'ease all 0.4s';
                body[0].style.transitionTimingFunction = 'cubic-bezier(.76,.08,.47,.79)';
                body[0].style.backgroundColor = 'red'
                setTimeout(() => {
                    body[0].style.transition = 'ease all 0.7s';
                    body[0].style.backgroundColor = 'white'
                }, 230);
            });
    }
}
const purchaseModule = new PurchaseModule();
export{purchaseModule};